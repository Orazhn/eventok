"use client";

import EmptyEvents from "@/entities/event/ui/emptyEvents";
import ClientEventCard from "@/entities/event/ui/clientEventCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/shared/ui/pagination";
import { cn } from "@/shared/lib/utils";
import LoadingSpinner from "@/shared/ui/loadingSpinner";
import { useIsHydrated } from "@/shared/hooks/useIsHydrated";
import { usePaginationEvents } from "@/features/events/hooks/usePaginationEvents";
import { useRouter } from "next/navigation";
import { useEventsFilterStore } from "@/shared/store/eventsFilterStore/store";

const PaginationEvents = () => {
  const isHydrated = useIsHydrated();
  const { page, setFilters } = useEventsFilterStore();
  const { data, isLoading } = usePaginationEvents(page);
  const { push } = useRouter();

  if (!isHydrated) return null;

  if (isLoading)
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );

  if (!data?.events?.length) return <EmptyEvents userType="customer" />;
  const totalPages = Math.ceil(data.eventsCount / 8);

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start ">
        {data.events.map((event) => (
          <ClientEventCard
            key={event.id}
            event={event}
            userType="customer"
            className="min-w-[320px] max-sm:w-full sm:w-[48%] md:w-[31%] lg:w-[24%]"
          />
        ))}
      </div>
      <Pagination className="mt-8">
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem
              key={index}
              className={cn(
                index + 1 === page && "bg-primary text-primary-foreground ",
                "rounded-md"
              )}
            >
              <PaginationLink
                disabled={index + 1 === page}
                className={cn(
                  index + 1 === page && "bg-primary text-primary-foreground",
                  "rounded-md"
                )}
                onClick={() => {
                  setFilters({ page: index + 1 });
                  push(`/events?page=${index + 1}`);
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationEvents;
