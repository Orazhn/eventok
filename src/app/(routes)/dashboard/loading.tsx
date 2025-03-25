import { Skeleton } from "@/shared/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import EventsListSkeleton from "@/entities/event/ui/eventsListSkeleton";

export default function DashboardLoading() {
  return (
    <div className=" flex flex-col py-6 space-y-6 px-4">
      <div className="flex justify-start items-start gap-4">
        <div>
          <Skeleton className="h-10 w-40 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
      </div>

      <Tabs defaultValue={"events"} className="space-y-4">
        <TabsList className="flex w-full">
          <TabsTrigger value="events" disabled>
            My Events
          </TabsTrigger>
          <TabsTrigger value="tickets" disabled>
            Tickets
          </TabsTrigger>
          <TabsTrigger value="schedule" disabled>
            Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-9 w-36" />
          </div>
          <EventsListSkeleton cards={8} />
        </TabsContent>
        <TabsContent value="schedule">
          <div className="sx-react-calendar-wrapper flex items-center justify-center bg-gray-200 rounded-lg">
            <div className="w-full h-full flex flex-col gap-4 p-4">
              <div className="h-12 bg-gray-300 rounded w-1/3"></div>
              <div className="grid grid-cols-7 gap-2 flex-grow">
                {Array.from({ length: 42 }).map((_, index) => (
                  <div key={index} className="h-20 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
