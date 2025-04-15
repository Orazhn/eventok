import { prisma } from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const page = parseInt(searchParams.get("page") || "1");
  const timeline = searchParams.get("timeline");
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const sortAttendees = searchParams.get("sortAttendees");
  const priceRangeParam = searchParams.get("priceRange");

  const pageSize = 8;
  const { userId } = await auth();

  const where: Prisma.EventWhereInput = {};

  if (userId) {
    where.NOT = { userId };
  }

  if (timeline === "past") {
    where.date = { lt: new Date() };
  } else if (timeline === "upcoming") {
    where.date = { gt: new Date() };
  }

  if (category?.length) {
    where.category = { has: category };
  }

  if (location?.length) {
    where.location = {
      contains: location,
      mode: Prisma.QueryMode.insensitive,
    };
  }

  if (name?.length) {
    where.title = {
      contains: name,
      mode: Prisma.QueryMode.insensitive,
    };
  }

  if (priceRangeParam) {
    try {
      const [min, max] = JSON.parse(priceRangeParam) as [number, number];
      where.ticket_price = {
        gte: min,
        lte: max,
      };
    } catch (err) {
      console.error("Invalid priceRange format", err);
    }
  }

  const [events, eventsCount] = await Promise.all([
    prisma.event.findMany({
      where: where ?? undefined,
      orderBy: sortAttendees
        ? { ticketsSold: sortAttendees === "most" ? "desc" : "asc" }
        : { date: "desc" },
      skip: pageSize * (page - 1),
      take: pageSize,
      include: { user: { select: { username: true } } },
    }),
    prisma.event.count({ where }),
  ]);

  return NextResponse.json({ events, eventsCount });
}
