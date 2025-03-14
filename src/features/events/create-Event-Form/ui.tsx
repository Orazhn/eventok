"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { CardContent } from "@/shared/ui/card";
import { useRouter } from "next/navigation";
import {
  Pencil,
  Tag,
  Info,
  Calendar,
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
import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import { Label } from "@/shared/ui/label";
import MultipleSelector, { Option } from "@/shared/ui/multi-select";
import { FormField } from "@/shared/ui/form";
import { FormProvider } from "react-hook-form";
import { createEvent } from "../actions/createEvent";

const CreateEventForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(eventSchema),
  });
  const inputFieds: InputFieldType[] = [
    {
      id: "title",
      label: "Event Title",
      type: "text",
      Icon: Pencil,
      placeholder: "Your Event title",
    },
    {
      id: "category",
      Icon: Tag,
      label: "Category",
      type: "text",
      placeholder: "IT, Business...",
    },
    {
      id: "description",
      Icon: Info,
      label: "Description",
      type: "text",
      placeholder: "Your event description",
      InputVariant: Textarea,
    },
    { id: "date", label: "Date", Icon: Calendar, type: "date" },
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
  const router = useRouter();

  const onSubmit = async (data: EventFormValues) => {
    setIsLoading(true);

    const image =
      data.image instanceof FileList && data.image.length > 0
        ? data.image[0]
        : null;

    const result = await createEvent(data, image);

    if (result.success) {
      toast.success("Event created successfully!");
    } else {
      toast.error(result.error || "Could not create event.");
    }
    router.push("/dashboard");

    setIsLoading(false);
  };

  return (
    <CardContent>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            toast.promise(onSubmit(data), {
              loading: "Saving...",
              success: <b>Event created successfully!</b>,
              error: <b>Could not create the event.</b>,
            })
          )}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFieds.map((input) => {
              if (input.id == "category")
                return (
                  <div className="space-y-2 " key={input.id}>
                    <Label
                      htmlFor={input.id}
                      className="flex items-center gap-2"
                    >
                      <Tag className={"size-4"} />
                      {input.label}
                    </Label>
                    <FormField
                      control={form.control}
                      name={input.id}
                      render={({ field }) => (
                        <MultipleSelector
                          {...form.register(input.id)}
                          {...field}
                          defaultOptions={OPTIONS}
                          placeholder="Select catogory for event..."
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      )}
                    />
                    {form.formState.errors.category?.message && (
                      <p className="text-red-500">
                        {String(form.formState.errors.category?.message)}
                      </p>
                    )}
                  </div>
                );
              return (
                <EventInput
                  key={input.id}
                  id={input.id}
                  label={input.label}
                  Icon={input.Icon}
                  type={input.type}
                  register={form.register}
                  errors={form.formState.errors}
                  InputVariant={input.InputVariant}
                  defaultValue={input.defaultValue}
                  placeholder={input.placeholder}
                />
              );
            })}

            <div className="md:col-span-2 flex justify-end gap-4">
              <Button type="reset" variant="outline">
                Reset
              </Button>
              <Button
                type="submit"
                variant={"secondary"}
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

const OPTIONS: Option[] = [
  { label: "Technology", value: "Technology" },
  { label: "Business", value: "Business" },
  { label: "Health & Wellness", value: "Health & Wellness" },
  { label: "Education", value: "Education" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Sports", value: "Sports" },
  { label: "Art & Culture", value: "Art & Culture" },
  { label: "Science", value: "Science" },
  { label: "Finance", value: "Finance" },
  { label: "Networking", value: "Networking" },
];
