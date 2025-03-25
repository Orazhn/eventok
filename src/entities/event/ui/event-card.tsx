import { IEvent } from "../modal";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Users,
  Link as LinkIcon,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { formatEventDate, formatTime } from "@/shared/lib/utils";
import Price from "./price";
import { type userType } from "../eventTypes";
import { cn } from "@/shared/lib/utils";
import { Rubik } from "next/font/google";
import { getUser } from "@/features/user/getUser";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import BuyTicketNavigate from "@/entities/ticket/ui/buyTicketNavigate";
import EventOptionsMenu from "./eventOptionsMenu";

const rubik = Rubik({ subsets: ["latin"], weight: ["400", "800"] });

export default async function EventCard({
  event,
  userType,
}: {
  event: IEvent;
  userType: userType;
}) {
  const {
    id,
    title,
    image_url,
    userId,
    date,
    start_time,
    end_time,
    category,
    location,
    ticket_price,
    ticketsSold,
    totalTickets,
    website_url,
  } = event;
  const user = await getUser(userId);
  const isEventFinished = new Date() > new Date(event.date);

  return (
    <Card
      className={cn(
        "py-0 min-w-[320px] max-sm:w-full sm:w-[48%] md:w-[31%] lg:w-[24%] transition-shadow hover:shadow-2xl rounded-lg overflow-hidden",
        rubik.className
      )}
    >
      <div className="relative w-full">
        <Image
          src={image_url}
          alt={title}
          className="w-full h-40 object-fill"
          width={400}
          height={200}
        />
        {userType === "creator" && <EventOptionsMenu id={event.id} />}
      </div>

      <CardHeader className="p-4 pt-0 border-b-gray-300 border-b">
        <Link
          href={`events/details/${id}`}
          className="cursor-pointer flex justify-between items-center"
        >
          <CardTitle className="text-lg font-semibold truncate">
            {title}
          </CardTitle>
          {isEventFinished && (
            <Badge variant="secondary">
              <Clock /> finished
            </Badge>
          )}
        </Link>
        <CardDescription className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {formatEventDate(date)}
          </div>
          <Link href={`/users/${user?.id}`}>
            <div className="flex items-center gap-2 font-semibold cursor-pointer">
              <User className="h-4 w-4" /> {user?.username}
            </div>
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2 text-sm flex flex-col h-full">
        <div className="flex-grow space-y-2">
          <div className="flex gap-1">
            {category.slice(0, 2).map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" /> {location}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" /> {formatTime(start_time)}{" "}
            - {formatTime(end_time)}
          </div>
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-gray-500" /> {ticketsSold} /{" "}
            {totalTickets} tickets sold
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" /> {ticketsSold} attendees
          </div>
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-gray-500" />
            <a
              href={website_url}
              target="_blank"
              className="text-blue-600 hover:underline truncate"
            >
              {website_url}
            </a>
          </div>
        </div>
        <div className="flex justify-between items-end pt-2">
          <Price price={ticket_price} />
          {userType == "customer" && <BuyTicketNavigate id={id} />}
        </div>
      </CardContent>
    </Card>
  );
}
