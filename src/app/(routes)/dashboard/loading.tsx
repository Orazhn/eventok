import { Skeleton } from "@/shared/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import EventsListSkeleton from "@/entities/event/ui/eventsListSkeleton";

export default function DashboardLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6 px-4">
      {/* Page Title */}
      <div className="flex justify-start items-start gap-4">
        <div>
          <Skeleton className="h-10 w-40 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="events" className="space-y-4">
        <TabsList className="flex w-full">
          <TabsTrigger value="events" disabled>
            My Events
          </TabsTrigger>
          <TabsTrigger value="tickets" disabled>
            Tickets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          {/* Header Controls */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-9 w-36" />
          </div>

          {/* Cards Grid */}
          <EventsListSkeleton />
        </TabsContent>
      </Tabs>
    </div>
  );
}
