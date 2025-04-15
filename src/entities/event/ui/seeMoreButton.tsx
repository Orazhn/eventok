import React from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { TicketsIcon } from "lucide-react";

const SeeMoreButton = ({ id }: { id: number }) => {
  return (
    <Link href={`/events/details/${id}`}>
      <Button
        variant="buy"
        effect={"expandIcon"}
        icon={TicketsIcon}
        iconPlacement="right"
        className="px-4 py-2 text-sm font-medium"
      >
        See more
      </Button>
    </Link>
  );
};

export default SeeMoreButton;
