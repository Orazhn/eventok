import { userType } from "@/entities/event/eventTypes";
import { prisma } from "@/shared/lib/prisma";

export async function getEventById(id: number, userType?: userType) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          profile_image_url: true,
          email: true,
          id: true,
        },
      },
    },
  });

  return event;
}
