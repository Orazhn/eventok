"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { CardContent } from "@/shared/ui/card";
import {
  Pencil,
  Info,
  Clock,
  DollarSign,
  TicketIcon,
  Globe,
  ImageIcon,
  MapPin,
  PartyPopper,
} from "lucide-react";
import EventInput from "@/entities/event/ui/event-input";
import { InputFieldType } from "@/entities/event/eventTypes";
import { eventSchema, EventFormValues } from "@/entities/event/eventTypes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import { createEventAction } from "../actions/createEventAction";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormDatePicker } from "@/shared/ui/formDatePicker";
import { FormMultiSelector } from "@/shared/ui/formMultiSelector";

const CreateEventForm = () => {
  const storageName = "createEventStorage";
  const form = useForm({
    resolver: zodResolver(eventSchema),
  });

  useEffect(() => {
    const storedData = sessionStorage.getItem(storageName);
    if (storedData) {
      form.reset(JSON.parse(storedData));
    }
  }, [form]);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const inputFieds: InputFieldType[] = [
    {
      id: "title",
      label: "Event Title",
      type: "text",
      Icon: Pencil,
      placeholder: "Your Event title",
    },
    {
      id: "description",
      Icon: Info,
      label: "Description",
      type: "text",
      placeholder: "Your event description",
      InputVariant: Textarea,
    },
    {
      id: "startTime",
      label: "Start Time",
      Icon: Clock,
      type: "time",
    },

    { id: "endTime", label: "End Time", Icon: Clock, type: "time" },
    {
      id: "location",
      label: "Location",
      Icon: MapPin,
      type: "text",
      placeholder: "event location",
    },
    {
      id: "ticketPrice",
      label: "Ticket Price",
      Icon: DollarSign,
      type: "number",
      defaultValue: 5,
      placeholder: "ticket price $",
    },
    {
      id: "totalTickets",
      label: "Total Tickets",
      Icon: TicketIcon,
      type: "number",
      defaultValue: 100,
      placeholder: "number of tickets",
    },
    {
      id: "websiteUrl",
      label: "Website URL",
      Icon: Globe,
      type: "url",
      placeholder: "https://example.com",
    },
    {
      id: "image",
      label: "Picture",
      Icon: ImageIcon,
      type: "file",
      customError: form.formState.errors.image ? (
        <p className="text-red-500">
          {String(form.formState.errors.image.message)}
        </p>
      ) : null,
    },
  ];

  const handleReset = () => {
    form.reset();
    form.reset({ category: [] });
    sessionStorage.removeItem(storageName);
  };

  const onSubmit = async (data: EventFormValues) => {
    setIsLoading(true);

    try {
      const image =
        data.image instanceof FileList && data.image.length > 0
          ? data.image[0]
          : null;

      await toast.promise(createEventAction(data, image), {
        loading: "Creating...",
        success: <b>Event created successfully! </b>,
        error: <b>Could not create event</b>,
      });
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      localStorage.removeItem(storageName);
      router.push("/dashboard?tab=events");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      sessionStorage.setItem(storageName, JSON.stringify(form.watch()));
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch(), form]);

  return (
    <CardContent>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFieds.map((input) => (
              <EventInput
                key={input.id}
                id={input.id}
                disabled={isLoading}
                label={input.label}
                Icon={input.Icon}
                type={input.type}
                register={form.register}
                errors={form.formState.errors}
                InputVariant={input.InputVariant}
                defaultValue={input.defaultValue}
                placeholder={input.placeholder}
              />
            ))}
            <FormMultiSelector form={form} />
            <FormDatePicker form={form} />
            <div className="md:col-span-2 flex justify-end gap-4">
              <Button
                type="reset"
                onClick={handleReset}
                variant="outline"
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button
                type="submit"
                effect={"expandIcon"}
                icon={PartyPopper}
                iconPlacement="right"
                disabled={isLoading}
              >
                {isLoading ? "Creating Event..." : "Create Event"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </CardContent>
  );
};

export default CreateEventForm;
