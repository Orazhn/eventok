"use client";
import { Schedule } from "@/shared/ui/schedule";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IEvent } from "@/entities/event/modal";
import { ITicket } from "@/entities/ticket/modal";
import LoadingSpinner from "./loadingSpinner";
import { useIsHydrated } from "@/shared/hooks/useIsHydrated";
import { TabsContent } from "@radix-ui/react-tabs";

interface Schedule {
  events: IEvent[];
  tickets: ITicket[];
}

const fetchSchedule = async (): Promise<Schedule> => {
  const { data } = await axios.get<Schedule>("/api/schedule");
  return data;
};

const ScheduleTab = () => {
  const isHydrated = useIsHydrated();
  const { data: schedule, isLoading } = useQuery({
    queryKey: ["schedule"],
    queryFn: fetchSchedule,
  });

  if (!isHydrated) return null;

  if (isLoading)
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );

  if (!schedule)
    return <div className="flex justify-center mt-5">No schedule found</div>;

  return (
    <TabsContent value="schedule">
      <h1 className="text-xl font-bold mb-6">Schedule</h1>
      <Schedule
        events={schedule?.events ?? []}
        tickets={schedule?.tickets ?? []}
      />
    </TabsContent>
  );
};

export default ScheduleTab;
