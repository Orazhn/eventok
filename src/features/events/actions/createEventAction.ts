"use server";

import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/shared/lib/prisma";
import { randomUUID } from "crypto";
import { getUserId } from "@/shared/lib/getUserId";
import { EventFormValues } from "@/entities/event/eventTypes";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const createEventAction = async (
  data: EventFormValues,
  image?: File | null
) => {
  let fileName = "";
  try {
    const startDateTime = new Date(data.date);
    startDateTime.setHours(Number(data.startTime.split(":")[0]));
    startDateTime.setMinutes(Number(data.startTime.split(":")[1]));

    const endDateTime = new Date(data.date);
    endDateTime.setHours(Number(data.endTime.split(":")[0]));
    endDateTime.setMinutes(Number(data.endTime.split(":")[1]));

    let imageUrl = "";

    if (image) {
      const fileExt = image.name.split(".").pop();
      fileName = `${randomUUID()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("events")
        .upload(`events/${fileName}`, image, {
          contentType: image.type,
        });

      if (error) throw error;
      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/events/events/${fileName}`;
    }

    const userId = await getUserId();
    await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category.map((item) => item.value),
        date: data.date,
        location: data.location,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        ticket_price: data.ticketPrice,
        totalTickets: data.totalTickets,
        website_url: data.websiteUrl,
        image_url: imageUrl,
        userId: userId as string,
      },
    });
  } catch (error) {
    console.error("Error creating event:", error);

    if (image) {
      await supabase.storage.from("events").remove([`events/${fileName}`]);
    }

    throw new Error("Failed to create event. Please try again.");
  }
};
