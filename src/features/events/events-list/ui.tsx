import React from "react";
import { getEvents } from "../getFunctions/getEvents";
import EventCard from "@/entities/event/ui/event-card";
import { userType } from "@/entities/event/eventTypes";
import EmptyEvents from "@/entities/event/ui/emptyEvents";

const EventsList = async ({
  userType,
  take,
  userId,
  timeline,
}: {
  userType: userType;
  take?: number;
  userId?: string | null;
  timeline?: "past" | "upcoming";
}) => {
  let events = await getEvents(take, userId, userType);

  if (timeline === "upcoming") {
    events = events.filter((event) => new Date() < new Date(event.date));
  } else if (timeline == "past") {
    events = events.filter((event) => new Date() > new Date(event.date));
  }

  if (!events.length) return <EmptyEvents userType={userType} />;

  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      {events.map((event) => (
        <EventCard key={event.id} event={event} userType={userType} />
      ))}
    </div>
  );
};

export default EventsList;
