"use client";
import React from "react";
import NavigateCreateEvent from "./navigate-create-event";
import { TabsContent } from "@/shared/ui/tabs";
import InfiniteEventsList from "@/features/events/ui/infiniteEvents";
import { useIsHydrated } from "@/shared/hooks/useIsHydrated";

const EventsTab = () => {
  const isHydrated = useIsHydrated();
  if (!isHydrated) return null;
  return (
    <TabsContent value="events" className="space-y-4">
      <div className="flex justify-between items-center max-sm:px-2">
        <h2 className="text-xl font-semibold">My Events</h2>
        <NavigateCreateEvent />
      </div>
      <InfiniteEventsList userType="creator" />
    </TabsContent>
  );
};

export default EventsTab;
