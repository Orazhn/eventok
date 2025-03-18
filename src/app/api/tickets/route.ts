import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "1", 10);
    const skip = (page - 1) * limit;

    const tickets = await prisma.ticket.findMany({
      where: { userId },
      skip,
      take: limit,
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
      orderBy: { event: { date: "desc" } },
    });

    const totalCount = await prisma.ticket.count({ where: { userId } });

    return NextResponse.json({
      tickets,
      hasMore: skip + limit < totalCount,
    });
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
