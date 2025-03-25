"use client";
import React, { Suspense } from "react";
import NavigateCreateEvent from "./navigate-create-event";
import { TabsContent } from "@/shared/ui/tabs";
import dynamic from "next/dynamic";

const InfiniteEventsList = dynamic(
  () => import("@/features/events/ui/infiniteEvents"),
  {
    ssr: false,
  }
);

const EventsTab = () => {
  return (
    <TabsContent value="events" className="space-y-4">
      <div className="flex justify-between items-center max-sm:px-2">
        <h2 className="text-xl font-semibold">My Events</h2>
        <NavigateCreateEvent />
      </div>
      <Suspense fallback={<p>Loading events...</p>}>
        <InfiniteEventsList userType="creator" />
      </Suspense>
    </TabsContent>
  );
};

export default EventsTab;
