import React from "react";
import { getTickets } from "../getFunctions/getTickets";
import { getUserId } from "@/shared/lib/getUserId";
import TicketCard from "@/entities/ticket/ui/ticket-card";
import EmptyTickets from "@/entities/ticket/ui/emptyTickets";

const TicketsList = async () => {
  const userId = await getUserId();
  const tickets = await getTickets(userId as string);

  if (!tickets.length) return <EmptyTickets />;
  return (
    <div className="space-y-4 flex gap-4 flex-wrap ">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};
export default TicketsList;
