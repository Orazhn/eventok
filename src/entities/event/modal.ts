import { Event } from "@prisma/client";

export type IEvent = Event;

export interface DBEvent {
  id: number;
  title: string;
  image_url: string;
  userId: string;
  date: string;
  start_time: string;
  end_time: string;
  category: string[];
  location: string;
  ticket_price: number;
  ticketsSold: number;
  totalTickets: number;
  website_url: string;
  user: {
    username: string;
  };
}

export const maxTicketPrice = 100000;
