import { EventFormValues } from "@/entities/event/eventTypes";
import { Label } from "@/shared/ui/label";
import MultipleSelector from "@/shared/ui/multi-select";
import { Tag } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "./form";
import { OPTIONS } from "@/entities/event/eventCategories";

export const FormMultiSelector = ({
  form,
  isLoading,
}: {
  form: UseFormReturn<EventFormValues>;
  isLoading?: boolean;
}) => {
  return (
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
  );
};
