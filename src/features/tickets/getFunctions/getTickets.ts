import { prisma } from "@/shared/lib/prisma";

export async function getTickets(userId: string) {
  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId },
      include: {
        event: {
          select: {
            start_time: true,
            end_time: true,
            description: true,
            totalTickets: true,
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
