import Image from "next/image";
import { Card, CardContent } from "@/shared/ui/card";
import { CalendarIcon, MapPinIcon, UsersIcon, TicketIcon } from "lucide-react";
import React from "react";
import { redirect } from "next/navigation";
import { formatDate } from "date-fns";
import { formatTime } from "@/shared/lib/utils";
import { getEventById } from "@/features/events/getEventById";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Banknote } from "lucide-react";
import GetTicket from "@/entities/event/ui/getTicket";

const EventDetailPage = async ({ params }: { params: { id: string } }) => {
  const event = await getEventById(+params.id);

  if (!event) {
    redirect("/events/buy/not-found");
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">{event.title}</h1>
      </div>

      <div className="w-full rounded-xl overflow-hidden shadow-lg">
        <Image
          src={event.image_url || "/not-found.png"}
          alt="Event Banner"
          layout="responsive"
          width={800}
          height={600}
        />
      </div>

      <Card className="shadow-xl overflow-hidden">
        <CardContent className="p-8 space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="border-b-2 pb-4">
              <div className="flex gap-2 items-center">
                <h1 className="font-bold text-lg">Creator: </h1>
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

              <p className="text-lg text-gray-600 mt-3">{event.description}</p>
            </div>
            <div className="flex gap-2">
              {event.category.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <div className="flex items-center space-x-3 text-gray-800 text-lg">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
              <span>
                {formatDate(event.date, "dd-MM-yyyy")} |{" "}
                {formatTime(event.start_time)} - {formatTime(event.end_time)}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-gray-800 text-lg">
              <MapPinIcon className="w-6 h-6 text-blue-600" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-800 text-lg">
              <TicketIcon className="w-6 h-6 text-blue-600" />
              <span>
                {event.ticketsSold} / {event.totalTickets} Tickets Sold
              </span>
            </div>
            <div className="flex items-center space-x-3 text-gray-800 text-lg">
              <UsersIcon className="w-6 h-6 text-blue-600" />
              <span>{event.ticketsSold} Attendees</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-800 text-lg">
              <Banknote className="w-6 h-6 text-blue-600" />
              <span>{event.ticket_price} $</span>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <GetTicket event={event} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailPage;
