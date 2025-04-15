import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [events, tickets] = await Promise.all([
      prisma.event.findMany({
        where: { userId: userId as string },
      }),
      prisma.ticket.findMany({
        where: { userId: userId as string },
        include: {
          event: {
            select: {
              start_time: true,
              end_time: true,
              title: true,
              ticketsSold: true,
              totalTickets: true,
              location: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      events,
      tickets,
    });
  } catch (error) {
    console.error("Failed to fetch schedule:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
      { status: 500 }
    );
  }
}
