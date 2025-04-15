import { Ticket } from "@prisma/client";
import { IEvent } from "../event/modal";

export type ITicket = Ticket & {
  event: IEvent;
};
