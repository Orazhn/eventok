"use server";

import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/shared/lib/prisma";
import { randomUUID } from "crypto";
import { getUserId } from "@/shared/lib/auth";
import { EventFormValues } from "@/entities/event/eventTypes";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const createEvent = async (
  data: EventFormValues,
  image?: File | null
) => {
  try {
    const startDateTime = new Date(`${data.date}T${data.startTime}:00`);
    const endDateTime = new Date(`${data.date}T${data.endTime}:00`);

    if (startDateTime >= endDateTime) {
      return {
        success: false,
        error: "Start time must be earlier than end time",
      };
    }

    const formattedStartTime = startDateTime.toISOString();
    const formattedEndTime = endDateTime.toISOString();

    let imageUrl = "";
    if (image) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${randomUUID()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("events")
        .upload(`events/${fileName}`, image, {
          contentType: image.type,
        });

      if (error) throw error;
      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/events/events/${fileName}`;
    }

    const userId = await getUserId();
    const newEvent = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category.map((item) => item.value),
        date: data.date,
        location: data.location,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        ticket_price: data.ticketPrice,
        totalTickets: data.totalTickets,
        website_url: data.websiteUrl,
        image_url: imageUrl,
        userId: userId as string,
      },
    });

    return { success: true, event: newEvent };
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, error: error.message };
  }
};
