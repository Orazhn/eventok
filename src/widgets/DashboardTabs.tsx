"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import TicketsTab from "@/entities/ticket/ui/ticketsTab";
import EventsTab from "@/entities/event/ui/eventsTab";
import ScheduleTab from "@/shared/ui/scheduleTab";

const DashboardTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "events";

  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newUrl = `/dashboard?tab=${value}`;
    router.push(newUrl);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="space-y-4 px-3"
    >
      <TabsList className="flex w-full">
        <TabsTrigger value="events">My Events</TabsTrigger>
        <TabsTrigger value="tickets">Tickets</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>
      <EventsTab />
      <TicketsTab />
      <ScheduleTab />
    </Tabs>
  );
};

export default DashboardTabs;
