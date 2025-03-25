import Image from "next/image";
import { Card, CardContent, CardTitle, CardHeader } from "@/shared/ui/card";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  TicketIcon,
  LinkIcon,
} from "lucide-react";
import React from "react";
import { redirect } from "next/navigation";
import { formatEventDate, formatTime } from "@/shared/lib/utils";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Banknote } from "lucide-react";
import { getUserId } from "@/shared/lib/getUserId";
import { BuyTicketDialog } from "@/features/tickets/ui/buyTicketDialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/shared/ui/table";
import { prisma } from "@/shared/lib/prisma";

const EventDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const userId = await getUserId();
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id: +id },
    include: {
      tickets: true,
      user: true,
    },
  });

  if (!event) {
    redirect("/events/details/not-found");
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-4">
      <div className="flex justify-center">
        <Image
          src={event.image_url || "/not-found.png"}
          alt="Event Banner"
          width={700}
          height={0}
          className="h-auto max-w-[90%] rounded-lg shadow-md"
        />
      </div>
      <Card className="shadow-xl overflow-hidden">
        <CardContent className="space-y-3">
          <div className="flex flex-col space-y-4">
            <div className="border-b-2 border-b-secondary items-start flex flex-wrap gap-3 justify-between pb-4">
              <div className=" flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900">
                  {event.title}
                </h1>
                <p className="text-gray-600 mt-3">{event.description}</p>
              </div>
              <Link href={`/users/${event.user.id}`}>
                <div className="flex gap-2 items-center bg-gray-200 rounded-md p-2 px-4 cursor-pointer">
                  <Image
                    src={event.user.profile_image_url}
                    width={30}
                    height={30}
                    className="rounded-full"
                    alt="user image"
                  />
                  <h1 className="font-bold text-lg">{event.user.username}</h1>
                </div>
              </Link>
            </div>
            <div className="flex gap-2">
              {event.category.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <div className="flex items-center space-x-3 text-gray-800 ">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
              <span>
                {formatEventDate(event.date)} | {formatTime(event.start_time)} -{" "}
                {formatTime(event.end_time)}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-gray-800 ">
              <MapPinIcon className="w-6 h-6 text-blue-600" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-800 ">
              <TicketIcon className="w-6 h-6 text-blue-600" />
              <span>
                {event.ticketsSold} / {event.totalTickets} Tickets Sold
              </span>
            </div>
            <div className="flex items-center space-x-3 text-gray-800 ">
              <UsersIcon className="w-6 h-6 text-blue-600" />
              <span>{event.ticketsSold} Attendees</span>
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-6 h-6 text-blue-600" />
              <Link
                href={event.website_url}
                target="_blank"
                className="text-blue-600 hover:underline truncate"
              >
                {event.website_url}
              </Link>
            </div>
            <div className="flex items-center space-x-3 text-gray-800 ">
              <Banknote className="w-6 h-6 text-blue-600" />
              <span
                className={
                  !event.ticket_price ? "text-green-600 font-semibold" : ""
                }
              >
                {event.ticket_price > 0 ? event.ticket_price + "$" : "FREE"}
              </span>
            </div>
          </div>
          {userId !== event.userId && <BuyTicketDialog event={event} />}
        </CardContent>
      </Card>
      {userId === event.userId && (
        <Card className="w-full mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Attendees</CardTitle>
          </CardHeader>
          <CardContent>
            {event.tickets.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Ticket Code</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {event.tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">
                        {ticket.fullName}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {ticket.code}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-gray-500">No attendees yet.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventDetailPage;

export const revalidate = 60;
