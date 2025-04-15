import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/shared/lib/utils";

type SliderProps = {
  className?: string;
  min: number;
  max: number;
  minStepsBetweenThumbs: number;
  step: number;
  showValueLabel?: boolean;
  formatLabel?: (value: number) => string;
  value?: number[] | readonly number[];
  onValueChange?: (values: number[]) => void;
};

const RangeSlider = React.forwardRef(
  (
    {
      className,
      min,
      showValueLabel = true,
      max,
      step,
      formatLabel,
      value = [min, max],
      onValueChange,
      ...props
    }: SliderProps,
    ref
  ) => {
    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={max}
        step={step}
        value={value as number[]}
        onValueChange={onValueChange}
        className={cn(
          "relative flex w-full touch-none select-none mb-6 items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {value.map((val, index) => (
          <React.Fragment key={index}>
            {showValueLabel && (
              <div
                className="absolute text-center"
                style={{
                  left: `calc(${((val - min) / (max - min)) * 100}% + 0px)`,
                  top: `10px`,
                }}
              >
                <span className="text-sm">
                  {formatLabel ? formatLabel(val) : val}
                </span>
              </div>
            )}
            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  }
);
RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
