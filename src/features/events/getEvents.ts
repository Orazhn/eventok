import { userType } from "@/entities/event/eventTypes";
import { prisma } from "../../shared/lib/prisma";

export async function getEvents(
  take?: number,
  userId?: string | null,
  userType?: userType,
  searchQuery?: string
) {
  try {
    const events = await prisma.event.findMany({
      take: take || undefined,
      where: {
        ...(userId && userType === "customer"
          ? { NOT: { userId } }
          : userId && userType === "creator"
          ? { userId }
          : {}),
        ...(searchQuery
          ? {
              title: {
                contains: searchQuery,
                mode: "insensitive",
              },
            }
          : {}),
      },
      orderBy: { date: "desc" },
    });

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
