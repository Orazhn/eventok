import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import TicketsTab from "@/entities/ticket/ui/ticketsTab";
import EventsTab from "@/entities/event/ui/eventsTab";
import Link from "next/link";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/shared/ui/loadingSpinner";

const DynamicScheduleTab = dynamic(() => import("@/shared/ui/scheduleTab"), {
  ssr: true,
  loading: () => (
    <div className="w-full flex justify-center items-center">
      <LoadingSpinner />
    </div>
  ),
});

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function Dashboard({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeTab = params.tab || "events";

  return (
    <div className="py-6 px-4 space-y-6 min-h-screen">
      <div className="flex justify-start items-start gap-4">
        <div className="px-3">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your events and orders</p>
        </div>
      </div>
      <Tabs defaultValue={activeTab} className="space-y-4 px-3">
        <TabsList className="flex w-full">
          <TabsTrigger value="events">
            <Link href="/dashboard?tab=events" className="w-full">
              My Events
            </Link>
          </TabsTrigger>
          <TabsTrigger value="tickets">
            <Link href="/dashboard?tab=tickets" className="w-full">
              Tickets
            </Link>
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Link href="/dashboard?tab=schedule" className="w-full">
              Schedule
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <EventsTab />
        </TabsContent>
        <TabsContent value="tickets">
          <TicketsTab />
        </TabsContent>
        <TabsContent value="schedule">
          {params.tab == "schedule" && <DynamicScheduleTab />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
