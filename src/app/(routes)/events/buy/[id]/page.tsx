import Image from "next/image";
import { Card, CardContent } from "@/shared/ui/card";
import { CalendarIcon, MapPinIcon, UsersIcon, TicketIcon } from "lucide-react";
import React from "react";
import { redirect } from "next/navigation";
import { formatEventDate, formatTime } from "@/shared/lib/utils";
import { getEventById } from "@/features/events/getFunctions/getEventById";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Banknote } from "lucide-react";
import { getUserId } from "@/shared/lib/getUserId";
import { BuyTicketDialog } from "@/entities/event/ui/buyTicketDialog";

const EventDetailPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const event = await getEventById(+params.id);

  if (!event) {
    redirect("/events/buy/not-found");
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
    </div>
  );
};

export default EventDetailPage;
export const revalidate = 120;
