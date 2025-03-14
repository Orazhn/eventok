import { FC } from "react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { EventFormValues } from "../eventTypes";
import { InputFieldType } from "../eventTypes";

type EventInputProps = InputFieldType &
  React.ComponentPropsWithoutRef<"input"> & {
    register: UseFormRegister<EventFormValues>;
    errors: FieldErrors<EventFormValues>;
  };

const EventInput: FC<EventInputProps> = ({
  id,
  label,
  Icon,
  type,
  register,
  errors,
  defaultValue,
  placeholder,
  InputVariant = Input,
  customError,
  ...props
}) => {
  return (
    <div className="space-y-2 ">
      <Label htmlFor={id} className="flex items-center gap-2">
        <Icon className={"size-4"} />
        {label}
      </Label>
      <InputVariant
        id={id}
        {...register(id)}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...props}
      />
      {customError ??
        (errors[id]?.message && (
          <p className="text-red-500">{String(errors[id]?.message)}</p>
        ))}
    </div>
  );
};

export default EventInput;
