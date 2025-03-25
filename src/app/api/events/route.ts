import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { getUserId } from "@/shared/lib/getUserId";

export async function GET(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "4", 10);
    const skip = (page - 1) * limit;
    const userType = searchParams.get("userType") || "customer";

    const where = userType === "creator" ? { userId } : { NOT: { userId } };

    const events = await prisma.event.findMany({
      where,
      skip,
      take: limit,
      orderBy: { date: "desc" },
    });

    const totalCount = await prisma.event.count({ where });

    return NextResponse.json({
      events,
      hasMore: skip + limit < totalCount,
    });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
