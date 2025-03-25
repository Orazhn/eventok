import PaginationEvents from "@/features/events/ui/paginationEvents";
import { FilterEventsDialog } from "@/features/events/ui/filterEventsDialog";
import { Suspense } from "react";
import EventsListSkeleton from "@/entities/event/ui/eventsListSkeleton";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const paginationParams = await searchParams;
  return (
    <div className="py-8 px-4 md:px-8">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground mt-1">
            Explore Upcoming and Past events
          </p>
        </div>
        <FilterEventsDialog />
      </div>
      <div className="mb-8 w-full">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-full">
              <EventsListSkeleton />
            </div>
          }
        >
          <PaginationEvents searchParams={paginationParams} />
        </Suspense>
      </div>
    </div>
  );
}
export const revalidate = 60;
