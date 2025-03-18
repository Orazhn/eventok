import { prisma } from "@/shared/lib/prisma";

export async function getTickets(userId: string) {
  try {
    const tickets = await prisma.ticket.findMany({
      take: 5,
      where: { userId },
      include: {
        event: {
          select: {
            start_time: true,
            location: true,
            ticketsSold: true,
            date: true,
          },
        },
      },
    });
    return tickets;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
}
