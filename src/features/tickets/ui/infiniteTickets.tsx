"use client";
import { motion } from "framer-motion";
import TicketCard from "@/entities/ticket/ui/ticket-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ITicket } from "@/entities/ticket/modal";
import LoadingSpinner from "@/shared/ui/loadingSpinner";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import EmptyTickets from "@/entities/ticket/ui/emptyTickets";

const fetchTickets = async ({ pageParam = 1 }) => {
  const res = await axios.get(`/api/tickets?page=${pageParam}&limit=4`);
  return res.data;
};

export default function InfiniteTicketsList() {
  const query = useInfiniteQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const { lastItemRef, isLoading, status } = useInfiniteScroll({
    query,
    hasNextPage: query.hasNextPage,
    data: query.data?.pages,
  });

  if (status === "pending")
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  if (status === "error") return <p>Error fetching events</p>;

  if (!query.data?.pages.flatMap((page) => page.tickets).length)
    return <EmptyTickets />;

  return (
    <div className="space-y-4">
      {query.data?.pages.map((page, i) => (
        <div key={i} className="space-y-4 flex justify-center gap-4 flex-wrap">
          {page.tickets.map((ticket: ITicket, index: number) => (
            <motion.div
              ref={index === page.tickets.length - 1 ? lastItemRef : null}
              key={ticket.id}
              className="max-sm:w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <TicketCard ticket={ticket} />
            </motion.div>
          ))}
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
