"use client";
import ClientEventCard from "../../../entities/event/ui/clientEventCard";
import { userType } from "@/entities/event/eventTypes";
import EmptyEvents from "@/entities/event/ui/emptyEvents";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import LoadingSpinner from "@/shared/ui/loadingSpinner";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import EventsListSkeleton from "@/entities/event/ui/eventsListSkeleton";
const fetchEvents = async ({
  pageParam = 1,
  userType,
}: {
  pageParam?: number;
  userType: userType;
}) => {
  const res = await axios.get(
    `/api/infiniteEvents?page=${pageParam}&limit=4&userType=${userType}`
  );
  return res.data;
};

export default function InfiniteEventsList({
  userType,
}: {
  userType: userType;
}) {
  const query = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: ({ pageParam }) => fetchEvents({ pageParam, userType }),
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

  if (status === "pending") return <EventsListSkeleton cards={4} />;
  if (status === "error") return <p>Error fetching events</p>;

  const allEvents = query.data?.pages.flatMap((page) => page.events) || [];

  if (!allEvents.length) return <EmptyEvents userType={userType} />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center md:justify-start ">
        {allEvents.map((event, index) => (
          <motion.div
            ref={index === allEvents.length - 1 ? lastItemRef : null}
            key={event.id}
            className="min-w-[330px] max-sm:w-full sm:w-[48%] md:w-[34%] lg:w-[24%]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ClientEventCard event={event} userType={userType} />
          </motion.div>
        ))}
      </div>
      {isLoading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
