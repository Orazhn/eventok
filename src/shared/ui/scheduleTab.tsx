import React from "react";
import { prisma } from "@/shared/lib/prisma";
import { Schedule } from "@/shared/ui/schedule";
import { auth } from "@clerk/nextjs/server";

const ScheduleTab = async () => {
  const { userId } = await auth();
  const [events, tickets] = await Promise.all([
    prisma.event.findMany({
      where: { userId: userId as string },
    }),
    prisma.ticket.findMany({
      where: { userId: userId as string },
      include: {
        event: {
          select: {
            start_time: true,
            end_time: true,
            title: true,
            ticketsSold: true,
            totalTickets: true,
            location: true,
          },
        },
      },
    }),
  ]);
  return <Schedule events={events} tickets={tickets} />;
};

export default ScheduleTab;
