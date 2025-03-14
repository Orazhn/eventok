"use client";
import CountUp from "react-countup";

export function PageCount({
  start,
  end,
  duration,
  className,
}: {
  start?: number;
  end: number;
  duration: number;
  className?: string;
}) {
  return (
    <CountUp
      start={start}
      end={end}
      duration={duration}
      className={`font-bold ${className}`}
    />
  );
}
