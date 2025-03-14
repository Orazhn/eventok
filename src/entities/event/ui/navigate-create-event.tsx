import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import Link from "next/link";

const NavigateCreateEvent = () => {
  return (
    <Link href={"/dashboard/create"}>
      <Button variant={"secondary"}>
        <Plus className=" h-4 w-4" /> Create Event
      </Button>
    </Link>
  );
};

export default NavigateCreateEvent;
