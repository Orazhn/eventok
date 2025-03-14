import React from "react";
import { getEvents } from "../getEvents";
import EventCard from "@/entities/event/ui/event-card";
import { CardContent, Card } from "@/shared/ui/card";
import { CalendarX } from "lucide-react";
import { userType } from "@/entities/event/eventTypes";

const EventsList = async ({
  userType,
  take,
  userId,
  past,
}: {
  userType: userType;
  take?: number;
  userId?: string | null;
  past?: true;
}) => {
  const events = await getEvents(take, userId, userType);
  if (!events.length)
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center shadow-md bg-gray-50 dark:bg-gray-900 rounded-2xl">
        <CardContent className="flex flex-col items-center">
          <CalendarX className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
            No Events Found
          </h2>
          {userType == "creator" && (
            <p className="text-gray-500 dark:text-gray-400">
              You haven’t created any events yet.
            </p>
          )}
        </CardContent>
      </Card>
    );
  return (
    <div className="flex gap-3 flex-wrap max-sm:justify-center sm:justify-center md:justify-start space-y-4 ">
      {events
        .filter((event) => !past || new Date() > new Date(event.date))
        .map((event) => (
          <EventCard key={event.id} event={event} userType={userType} />
        ))}
    </div>
  );
};

export default EventsList;
