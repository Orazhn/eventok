import { Button } from "@/shared/ui/button";
import { TicketIcon } from "lucide-react";
import React from "react";
import { IEvent } from "../model";

const GetTicket = ({ event }: { event: IEvent }) => {
  const isEventFinished = new Date() > new Date(event.date);
  return (
    <Button
      variant={"secondary"}
      className="max-sm:w-1/2 w-1/4 px-6 py-6 "
      effect={"expandIcon"}
      icon={TicketIcon}
      iconPlacement="right"
      disabled={isEventFinished}
    >
      {isEventFinished ? "Event Has Finished :(" : "Get Your Ticket"}
    </Button>
  );
};

export default GetTicket;
