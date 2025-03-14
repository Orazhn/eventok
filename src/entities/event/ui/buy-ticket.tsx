import React from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

const BuyTicket = ({ id }: { id: number }) => {
  return (
    <Link href={`/events/buy/${id}`}>
      <Button variant="secondary" className="px-4 py-2 text-sm font-medium">
        Buy Ticket
      </Button>
    </Link>
  );
};

export default BuyTicket;
