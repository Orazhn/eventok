"use client";

import { TabsContent } from "@/shared/ui/tabs";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const InfiniteTicketsList = dynamic(
  () => import("@/features/tickets/ui/infiniteTickets"),
  {
    ssr: false,
  }
);

export default function TicketsTab() {
  return (
    <TabsContent value="tickets" className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tickets</h2>
      </div>

      <Suspense fallback={<p>Loading tickets...</p>}>
        <InfiniteTicketsList />
      </Suspense>
    </TabsContent>
  );
}
//Added Suspense and dynamic to avoid hydration errors
