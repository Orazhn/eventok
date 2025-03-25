"use client";
import React from "react";
import { userType } from "@/entities/event/eventTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Users,
  Link as LinkIcon,
  User,
} from "lucide-react";
import { cn, formatTime } from "@/shared/lib/utils";
import { Rubik } from "next/font/google";
import Link from "next/link";
import Price from "@/entities/event/ui/price";
import BuyTicketNavigate from "@/entities/ticket/ui/buyTicketNavigate";
import EventOptionsMenu from "@/entities/event/ui/eventOptionsMenu";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const rubik = Rubik({ subsets: ["latin"], weight: ["400", "800"] });

interface Event {
  id: number;
  title: string;
  image_url: string;
  userId: string;
  date: string;
  start_time: string;
  end_time: string;
  category: string[];
  location: string;
  ticket_price: number;
  ticketsSold: number;
  totalTickets: number;
  website_url: string;
}

interface ClientEventCardProps {
  event: Event;
  userType: userType;
}

export default function ClientEventCard({
  event,
  userType,
}: ClientEventCardProps) {
  const isEventFinished = new Date() > new Date(event.date);
  const { user } = useUser();
  return (
    <Card
      className={cn(
        "py-0 w-full transition-shadow hover:shadow-2xl rounded-lg overflow-hidden",
        rubik.className
      )}
    >
      <div className="relative w-full">
        <Image
          src={event.image_url}
          alt={event.title}
          className="w-full h-40 object-fill"
          width={400}
          height={200}
        />
        {userType === "creator" && <EventOptionsMenu id={event.id} />}
      </div>

      <CardHeader className="p-4 pt-0 border-b-gray-300 border-b">
        <Link
          href={`events/details/${event.id}`}
          className="cursor-pointer flex justify-between items-center"
        >
          <CardTitle className="text-lg font-semibold truncate">
            {event.title}
          </CardTitle>
          {isEventFinished && (
            <Badge variant="secondary">
              <Clock /> finished
            </Badge>
          )}
        </Link>
        <CardDescription className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />{" "}
            {format(new Date(event.date), "PPP")}
          </div>

          <div className="flex items-center gap-2 font-semibold cursor-pointer">
            <User className="h-4 w-4" />
            <h3 className="text-sm">{user?.username}</h3>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-2 text-sm flex flex-col h-full">
        <div className="flex-grow space-y-2">
          <div className="flex gap-1">
            {event.category.slice(0, 2).map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" /> {event.location}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />{" "}
            {formatTime(new Date(event.start_time))} -{" "}
            {formatTime(new Date(event.end_time))}
          </div>
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-gray-500" /> {event.ticketsSold} /{" "}
            {event.totalTickets} tickets sold
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" /> {event.ticketsSold}{" "}
            attendees
          </div>
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-gray-500" />
            <a
              href={event.website_url}
              target="_blank"
              className="text-blue-600 hover:underline truncate"
            >
              {event.website_url}
            </a>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2">
          <Price price={event.ticket_price} />
          {userType === "customer" && <BuyTicketNavigate id={event.id} />}
        </div>
      </CardContent>
    </Card>
  );
}
