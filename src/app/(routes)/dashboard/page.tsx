import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Button } from "@/shared/ui/button";
import OrderCard from "@/entities/order/ui/order-card";
import NavigateCreateEvent from "@/entities/event/ui/navigate-create-event";
import { getUserId } from "@/shared/lib/auth";
import EventsList from "@/features/events/events-list/ui";

export default async function Dashboard() {
  const userId = await getUserId();

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-start items-start gap-4">
        <div className="px-3">
          <h1 className="text-3xl font-bold ">Dashboard</h1>
          <p className="text-muted-foreground">Manage your events and orders</p>
        </div>
      </div>
      <Tabs defaultValue={"events"} className="space-y-4 px-3">
        <TabsList className="flex w-full">
          <TabsTrigger value="events">My Events</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center max-sm:px-2">
            <h2 className="text-xl font-semibold">My Events</h2>
            <NavigateCreateEvent />
          </div>
          <EventsList userType="creator" userId={userId} />
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Orders</h2>
            <Button variant="outline">Filter</Button>
          </div>
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sample data

const orders = [
  {
    id: "ORD-1234",
    eventName: "Tech Conference 2023",
    date: "Sep 30, 2023",
    quantity: 2,
    total: 199.98,
    status: "Completed",
  },
  {
    id: "ORD-1235",
    eventName: "Workshop: UI Design",
    date: "Oct 5, 2023",
    quantity: 1,
    total: 49.99,
    status: "Pending",
  },
  {
    id: "ORD-1236",
    eventName: "Networking Mixer",
    date: "Oct 12, 2023",
    quantity: 3,
    total: 89.97,
    status: "Cancelled",
  },
];
