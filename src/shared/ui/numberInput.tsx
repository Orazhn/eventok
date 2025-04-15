"use client";

import { useState, type ChangeEvent } from "react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

interface NumberInputProps {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  className?: string;
  min?: number;
  max?: number;
  required?: boolean;
}

export default function NumberInput({
  disabled,
  label,
  placeholder = "Enter a number",
  value: propValue,
  onChange,
  className = "",
  min,
  max,
  required = false,
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(
    propValue?.toString() || ""
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9.]/g, "");

    const parts = newValue.split(".");
    const sanitizedValue =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : newValue;

    setInternalValue(sanitizedValue);

    if (onChange) {
      onChange(sanitizedValue);
    }
  };

  const displayValue =
    propValue !== undefined ? propValue.toString() : internalValue;

  return (
    <div className="space-y-1">
      {label && (
        <Label className="text-gray-400 font-light text-xs">{label}</Label>
      )}
      <Input
        disabled={disabled}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
        min={min}
        max={max}
        required={required}
      />
    </div>
  );
}
