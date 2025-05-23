"use client";

import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  viewMonthGrid,
  CalendarEventExternal,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { IEvent } from "@/entities/event/modal";
import { formatDate } from "date-fns";
import "@schedule-x/theme-shadcn";
import { ITicket } from "@/entities/ticket/modal";

interface props {
  events: IEvent[];
  tickets: ITicket[];
}
export const Schedule = ({ events, tickets }: props) => {
  const parseDate = (date: string | Date): Date => {
    if (typeof date === "string") {
      return new Date(date);
    }
    return date;
  };

  const scheduleEvents: CalendarEventExternal[] = events.map((event) => ({
    id: event.id,
    title: event.title,
    description: `${event.ticketsSold} / ${event.totalTickets} attendees`,
    location: event.location,
    start: parseDate(event.start_time)
      .toISOString()
      .slice(0, 16)
      .replace("T", " "),
    end: parseDate(event.end_time).toISOString().slice(0, 16).replace("T", " "),
    calendarId: "event",
  }));

  const scheduleTickets: CalendarEventExternal[] = tickets.map((ticket) => ({
    id: ticket.id,
    title: ticket.event.title,
    description: `${ticket.event.ticketsSold} / ${ticket.event.totalTickets} attendees`,
    location: ticket.event.location,
    start: parseDate(ticket.event.start_time)
      .toISOString()
      .slice(0, 16)
      .replace("T", " "),
    end: parseDate(ticket.event.end_time)
      .toISOString()
      .slice(0, 16)
      .replace("T", " "),
    calendarId: "ticket",
  }));

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    theme: "shadcn",
    defaultView: viewMonthGrid.name,
    monthGridOptions: {
      nEventsPerDay: 3,
    },
    calendars: {
      event: {
        colorName: "event",
        lightColors: {
          main: "hsl(220, 90%, 50%)",
          container: "hsl(220, 40%, 85%)",
          onContainer: "hsl(220, 90%, 20%)",
        },
        darkColors: {
          main: "hsl(220, 100%, 75%)",
          container: "hsl(220, 50%, 30%)",
          onContainer: "hsl(220, 100%, 90%)",
        },
      },
      ticket: {
        colorName: "ticket",
        lightColors: {
          main: "hsl(265, 90%, 50%)",
          container: "hsl(260, 40%, 85%)",
          onContainer: "hsl(260, 90%, 20%)",
        },
        darkColors: {
          main: "hsl(270, 100%, 75%)",
          container: "hsl(260, 50%, 30%)",
          onContainer: "hsl(260, 100%, 90%)",
        },
      },
    },
    events: [...scheduleEvents, ...scheduleTickets],
    selectedDate: formatDate(new Date(), "yyyy-MM-dd"),
    plugins: [createEventModalPlugin()],
  });

  return (
    <div className="w-full h-full">
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[hsl(220,90%,50%)]"></span>
          <span className="text-sm">Your Events</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[hsl(265,90%,50%)]"></span>
          <span className="text-sm">Your Tickets</span>
        </div>
      </div>

      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};
