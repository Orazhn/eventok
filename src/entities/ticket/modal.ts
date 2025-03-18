import { Ticket } from "@prisma/client";

export type ITicket = Ticket & {
  event: {
    start_time: Date;
    location: string;
    ticketsSold: number;
    date: Date;
  };
};
