"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { CardContent } from "@/shared/ui/card";
import { redirect } from "next/navigation";
import {
  Pencil,
  Tag,
  Info,
  Calendar as CalendarIcon,
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
import { FormField, FormControl, FormItem, FormLabel } from "@/shared/ui/form";
import { createEventAction } from "../actions/createEventAction";
import { cn } from "@/shared/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/shared/ui/calendar";

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
      redirect("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContent>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFieds.map((input) => {
              return (
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
              );
            })}
            <div className="space-y-2 ">
              <Label
                htmlFor={"category"}
                id={"category"}
                className="flex items-center gap-2"
              >
                <Tag className={"size-4"} />
                Category
              </Label>
              <FormField
                control={form.control}
                name={"category"}
                render={({ field }) => (
                  <MultipleSelector
                    disabled={isLoading}
                    {...form.register("category")}
                    {...field}
                    defaultOptions={OPTIONS}
                    placeholder="Select category for event..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-purple-700 dark:text-purple-800">
                        no categories found.
                      </p>
                    }
                  />
                )}
              />
              {form.formState.errors.category?.message && (
                <p className="text-red-500">Category is required</p>
              )}
            </div>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CalendarIcon className={"size-4"} />
                    Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild id="date">
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick event date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        id="date"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.date?.message && (
                    <p className="text-red-500">Select Event Date </p>
                  )}
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex justify-end gap-4">
              <Button
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
