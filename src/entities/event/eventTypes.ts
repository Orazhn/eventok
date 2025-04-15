import * as z from "zod";
import { LucideIcon } from "lucide-react";
import { ElementType, ReactNode } from "react";
import { ControllerRenderProps, Path } from "react-hook-form";

export type userType = "customer" | "creator" | undefined;

export type InputFieldType = {
  id: keyof EventFormValues;
  label: string;
  Icon: LucideIcon;
  type: string;
  placeholder?: string;
  defaultValue?: number;
  InputVariant?: ElementType;
  customError?: ReactNode;
};

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});
export const eventSchema = z
  .object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    category: z.array(optionSchema).min(1, "At least one category"),
    date: z.coerce.date(),
    location: z.string().min(2, "Event location is required"),
    startTime: z.string().nonempty("Start time is required"),
    endTime: z.string().nonempty("End time is required"),
    ticketPrice: z.coerce.number().nonnegative("Ticket price must be positive"),
    totalTickets: z.coerce
      .number()
      .int()
      .positive("Total tickets must be a positive integer"),
    websiteUrl: z.string().url("Invalid URL"),
    image: z
      .custom<FileList>((val) => val instanceof FileList, "Image is required")
      .refine((files) => files.length > 0, "Please upload an image"),
  })
  .refine(
    (data) => {
      const eventDate = new Date(data.date);
      const startTime = new Date(eventDate);
      const endTime = new Date(eventDate);

      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);

      startTime.setHours(startHours, startMinutes, 0, 0);
      endTime.setHours(endHours, endMinutes, 0, 0);

      return endTime > startTime;
    },
    { message: "End time must be after start time", path: ["endTime"] }
  );

export type EventFormValues = z.infer<typeof eventSchema>;

export type FieldProps<
  T extends EventFormValues,
  K extends Path<T>
> = ControllerRenderProps<T, K>;
