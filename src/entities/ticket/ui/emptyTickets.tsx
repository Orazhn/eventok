import React from "react";
import { Ticket } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

const EmptyTickets = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <Ticket className="size-16 text-gray-400" />
      <h2 className="mt-4 text-xl font-semibold text-gray-700">
        No Tickets Found
      </h2>
      <p className="text-gray-500">You haven&apos;t booked any tickets yet.</p>
      <Link href={"/events"}>
        <Button className="mt-4" variant="default">
          Browse Events
        </Button>
      </Link>
    </div>
  );
};

export default EmptyTickets;
