"use server";
import crypto from "crypto";

import { prisma } from "@/shared/lib/prisma";

type buyTicketActionType = {
  payed: number;
  eventId: number;
  userId: string;
  fullName: string;
};

export async function buyTicketAction(data: buyTicketActionType) {
  await prisma.ticket.create({
    data: {
      ...data,
      code: crypto.randomBytes(6).toString("hex"),
    },
  });
  await prisma.event.update({
    data: {
      ticketsSold: {
        increment: 1,
      },
    },
    where: {
      id: data.eventId,
    },
  });
}
