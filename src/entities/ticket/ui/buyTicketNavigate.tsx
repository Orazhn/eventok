import React from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { TicketsIcon } from "lucide-react";

const BuyTicketNavigate = ({ id }: { id: number }) => {
  return (
    <Link href={`/events/details/${id}`}>
      <Button
        variant="buy"
        effect={"expandIcon"}
        icon={TicketsIcon}
        iconPlacement="right"
        className="px-4 py-2 text-sm font-medium"
      >
        Buy Ticket
      </Button>
    </Link>
  );
};

export default BuyTicketNavigate;
