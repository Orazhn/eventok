"use client";
import React from "react";
import TicketCard from "@/entities/ticket/ui/ticket-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";
import { ITicket } from "@/entities/ticket/modal";
import LoadingSpinner from "@/shared/ui/loadingSpinner";

const fetchTickets = async ({ pageParam = 1 }) => {
  const res = await axios.get(`/api/tickets?page=${pageParam}&limit=2`, {});
  return res.data;
};

export default function TicketsList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["tickets"],
      queryFn: fetchTickets,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? pages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const lastTicketRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lastTicketRef.current || !hasNextPage) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    };

    const observerInstance = new IntersectionObserver(handleObserver);
    observerInstance.observe(lastTicketRef.current);

    if (
      lastTicketRef.current.getBoundingClientRect().top < window.innerHeight
    ) {
      fetchNextPage();
    }

    return () => observerInstance.disconnect();
  }, [hasNextPage, data]);

  if (status === "pending")
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  if (status === "error") return <p>Error fetching events</p>;

  return (
    <div className="space-y-4">
      {data?.pages.map((page, i) => (
        <div key={i} className="space-y-4 flex gap-4 flex-wrap">
          {page.tickets.map((ticket: ITicket, index: number) => (
            <div
              ref={index === page.tickets.length - 1 ? lastTicketRef : null}
              key={ticket.id}
            >
              <TicketCard ticket={ticket} />
            </div>
          ))}
        </div>
      ))}

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
