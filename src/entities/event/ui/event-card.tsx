import { IEvent } from "../model";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
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
import { Button } from "@/shared/ui/button";
import { formatTime } from "@/shared/lib/utils";
import Price from "./price";
import { type userType } from "../eventTypes";
import { cn } from "@/shared/lib/utils";
import { Rubik } from "next/font/google";
import { formatDate } from "date-fns";
import { getUser } from "@/features/user/getUser";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import BuyTicket from "./buy-ticket";

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
  return (
    <Card
      className={cn(
        "py-0 w-full max-w-sm transition-shadow hover:shadow-2xl rounded-lg overflow-hidden",
        rubik.className
      )}
    >
      <Link href={`events/buy/${id}`} className="cursor-pointer">
        <div className="relative w-full">
          <Image
            src={image_url}
            alt={title}
            className="w-full h-56 object-cover"
            width={400}
            height={200}
          />
          {userType === "creator" && (
            <div className="absolute top-3 right-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white/90 rounded-full shadow-md"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </Link>
      <CardHeader className="p-4 pt-0 border-b">
        <CardTitle className="text-lg font-semibold truncate">
          {title}
        </CardTitle>
        <CardDescription className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {formatDate(date, "dd MMM yyyy")}
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <User className="h-4 w-4" /> {user?.username}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2 text-sm">
        {new Date() > new Date(event.date) && (
          <p className="text-gray-500">note: Event is finished</p>
        )}

        <div className="flex gap-1">
          {category.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" /> {location}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" /> {formatTime(start_time)} -{" "}
          {formatTime(end_time)}
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
        <div className="flex justify-between items-center mt-4">
          <Price price={ticket_price} />
          {userType == "customer" && <BuyTicket id={id} />}
        </div>
      </CardContent>
    </Card>
  );
}
