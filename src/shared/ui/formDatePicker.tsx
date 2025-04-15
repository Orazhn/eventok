import { cn } from "@/shared/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/shared/ui/calendar";
import { EventFormValues } from "@/entities/event/eventTypes";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";

export const FormDatePicker = ({
  form,
}: {
  form: UseFormReturn<EventFormValues>;
}) => {
  return (
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
  );
};
