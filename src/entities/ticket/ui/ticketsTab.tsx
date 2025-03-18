"use client";

import { TabsContent } from "@/shared/ui/tabs";
import { Button } from "@/shared/ui/button";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TicketsList = dynamic(
  () => import("@/features/tickets/tickets-list/ui"),
  { ssr: false }
);

export default function TicketsTab() {
  return (
    <TabsContent value="tickets" className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tickets</h2>
        <Button variant="outline">Filter</Button>
      </div>
      <Suspense fallback={<p>Loading tickets...</p>}>
        <TicketsList />
      </Suspense>
    </TabsContent>
  );
}
