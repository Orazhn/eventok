import React from "react";
import { prisma } from "@/shared/lib/prisma";
import { getUserId } from "@/shared/lib/getUserId";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/shared/ui/pagination";
import EventCard from "@/entities/event/ui/event-card";
import EmptyEvents from "@/entities/event/ui/emptyEvents";
import { cn } from "@/shared/lib/utils";

interface PaginationEventsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PaginationEvents = async ({ searchParams }: PaginationEventsProps) => {
  const { page, timeline, category, location, sortAttendees } =
    await searchParams;

  const pageSize = 8;
  const pageNum = Number(page) || 1;
  const userId = await getUserId();

  const filters = {
    timeline: timeline || "undefined",
    category: (category as string) || undefined,
    location: (location as string) || undefined,
    sortAttendees: (sortAttendees as string) || undefined,
  };

  const [events, eventsCount] = await Promise.all([
    prisma.event.findMany({
      where: {
        NOT: { userId: userId as string },
        ...(filters.timeline === "past"
          ? { date: { lt: new Date() } }
          : filters.timeline === "upcoming"
          ? { date: { gt: new Date() } }
          : {}),
        ...(filters.category && { category: { has: filters.category } }),
        ...(filters.location && {
          location: { contains: filters.location, mode: "insensitive" },
        }),
      },
      orderBy: filters.sortAttendees
        ? { ticketsSold: filters.sortAttendees === "most" ? "desc" : "asc" }
        : { date: "desc" },
      skip: pageSize * (pageNum - 1),
      take: pageSize,
    }),

    prisma.event.count({
      where: {
        NOT: { userId: userId as string },
        ...(filters.timeline === "past"
          ? { date: { lt: new Date() } }
          : filters.timeline === "upcoming"
          ? { date: { gt: new Date() } }
          : {}),
        ...(filters.category && { category: { has: filters.category } }),
        ...(filters.location && {
          location: { contains: filters.location, mode: "insensitive" },
        }),
      },
    }),
  ]);

  const totalPages = Math.ceil(eventsCount / pageSize);

  if (!events.length) return <EmptyEvents userType="customer" />;

  const getPageLink = (pageNumber: number) => {
    const params = new URLSearchParams();
    params.set("page", pageNumber.toString());
    if (filters.timeline) params.set("timeline", filters.timeline as string);
    if (filters.category) params.set("category", filters.category as string);
    if (filters.location) params.set("location", filters.location as string);
    if (filters.sortAttendees)
      params.set("sortAttendees", filters.sortAttendees as string);

    return `?${params.toString()}`;
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full">
        {events.map((event) => (
          <EventCard key={event.id} event={event} userType="customer" />
        ))}
      </div>
      <Pagination className="mt-8">
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem
              key={index}
              className={cn(
                index === pageNum - 1 && "bg-primary text-primary-foreground",
                "rounded-md"
              )}
            >
              <PaginationLink
                disabled={index + 1 === pageNum}
                href={getPageLink(index + 1)}
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
