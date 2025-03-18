import { prisma } from "@/shared/lib/prisma";

export async function getEventById(id: number) {
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
