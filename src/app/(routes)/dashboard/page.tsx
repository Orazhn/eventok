import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Button } from "@/shared/ui/button";
import NavigateCreateEvent from "@/entities/event/ui/navigate-create-event";
import { getUserId } from "@/shared/lib/getUserId";
import EventsList from "@/features/events/events-list/ui";
import TicketsList from "@/features/tickets/tickets-list/ui";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const userId = await getUserId();
  const activeTab = searchParams.tab || "events";

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-start items-start gap-4">
        <div className="px-3">
          <h1 className="text-3xl font-bold ">Dashboard</h1>
          <p className="text-muted-foreground">Manage your events and orders</p>
        </div>
      </div>
      <Tabs defaultValue={activeTab} className="space-y-4 px-3">
        <TabsList className="flex w-full">
          <TabsTrigger value="events">My Events</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center max-sm:px-2">
            <h2 className="text-xl font-semibold">My Events</h2>
            <NavigateCreateEvent />
          </div>
          <EventsList userType="creator" userId={userId} />
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Tickets</h2>
            <Button variant="outline">Filter</Button>
          </div>
          <TicketsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
