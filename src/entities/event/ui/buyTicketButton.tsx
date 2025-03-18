"use client";
import { Button } from "@/shared/ui/button";
import { TicketIcon } from "lucide-react";
import { IEvent } from "../modal";
import { DialogTrigger } from "@/shared/ui/dialog";

export function BuyTicketButton({ event }: { event: IEvent }) {
  const isEventFinished = new Date() > new Date(event.date);
  const isDisabled =
    event.ticketsSold === event.totalTickets || isEventFinished;

  return (
    <DialogTrigger asChild disabled={isDisabled}>
      <Button
        effect="expandIcon"
        icon={TicketIcon}
        iconPlacement="right"
        disabled={isDisabled}
      >
        {isEventFinished ? "Event has finished" : "Get Your Ticket"}
      </Button>
    </DialogTrigger>
  );
}
