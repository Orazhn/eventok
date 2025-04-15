"use client";
import { TabsContent } from "@/shared/ui/tabs";
import InfiniteTicketsList from "@/features/tickets/ui/infiniteTickets";
import { useIsHydrated } from "@/shared/hooks/useIsHydrated";

export default function TicketsTab() {
  const isHydrated = useIsHydrated();
  if (!isHydrated) return null;
  return (
    <TabsContent value="tickets" className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tickets</h2>
      </div>
      <InfiniteTicketsList />
    </TabsContent>
  );
}
