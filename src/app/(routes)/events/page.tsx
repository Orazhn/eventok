import EventsList from "@/features/events/events-list/ui";
import { getUserId } from "@/shared/lib/getUserId";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
export default async function EventsPage() {
  const userId = await getUserId();

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground mt-1">
            Explore Upcoming and Past events
          </p>
        </div>
      </div>
      <Tabs defaultValue="all" className="mb-8 w-full">
        <TabsList className="w-full">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <EventsList userType="customer" userId={userId} />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          <EventsList
            userType="customer"
            userId={userId}
            timeline={"upcoming"}
          />
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <EventsList userType="customer" userId={userId} timeline="past" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
export const revalidate = 60;
