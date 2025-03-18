"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { BuyTicketButton } from "../../../entities/ticket/ui/buyTicketButton";
import { IEvent } from "@/entities/event/modal";
import { buyTicketAction } from "@/features/tickets/actions/buyTicketAction";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { cn, formatEventDate } from "@/shared/lib/utils";
import { MapPin, Banknote, Calendar } from "lucide-react";

const TicketSchema = z.object({
  name: z.string().min(2, "Name is required"),
  surname: z.string().min(3, "Surname must be at least 3 characters"),
});
type TicketFormValues = z.infer<typeof TicketSchema>;

export function BuyTicketDialog({ event }: { event: IEvent }) {
  const { userId } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormValues>({
    resolver: zodResolver(TicketSchema),
  });

  const onSubmit = async (data: TicketFormValues) => {
    await toast.promise(
      buyTicketAction({
        fullName: `${data.name} ${data.surname}`,
        payed: event.ticket_price,
        eventId: event.id,
        userId: userId as string,
      }),
      {
        loading: "Buying...",
        success: "You got your ticket!",
        error: "Could not buy a ticket.",
      }
    );
    redirect("/dashboard?tab=tickets");
  };

  return (
    <Dialog>
      <BuyTicketButton event={event} />
      <DialogContent className="sm:max-w-[480px] p-6 rounded-2xl shadow-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold">
            {event.title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {event.ticket_price
              ? "Buy a ticket for the upcoming event"
              : "Get a free ticket for this event"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="font-medium">{formatEventDate(event.date)}</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <MapPin className="w-5 h-5 text-red-600" />
            <span className="font-medium">{event.location}</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <Banknote className="w-5 h-5 text-green-600" />
            <span
              className={cn(
                "font-medium",
                !event.ticket_price && "text-green-700"
              )}
            >
              {event.ticket_price ? `$${event.ticket_price}` : "FREE"}
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input id="name" {...register("name")} autoComplete="off" />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="surname" className="mb-2">
                Surname
              </Label>
              <Input id="surname" {...register("surname")} autoComplete="off" />
              {errors.surname && (
                <p className="text-red-500 text-sm">{errors.surname.message}</p>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <Button type="submit" className=" py-2 " disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Buy Ticket"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
