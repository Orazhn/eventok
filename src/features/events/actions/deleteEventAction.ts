"use server";
import { prisma } from "@/shared/lib/prisma";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const deleteEventAction = async (eventId: number) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) throw new Error("Event not found");

    await prisma.event.delete({ where: { id: eventId } });
    await prisma.ticket.deleteMany({ where: { eventId } });

    if (event.image_url) {
      const fileName = event.image_url.split("/").pop();
      if (fileName) {
        await supabase.storage.from("events").remove([`events/${fileName}`]);
      }
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event");
  }
};
