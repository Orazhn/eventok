import React from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";

const EventsListSkeleton = ({ cards = 8 }: { cards?: number }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            className={cn(
              "py-0 min-w-[320px] max-sm:w-full sm:w-[48%] md:w-[31%] lg:w-[24%] transition-shadow hover:shadow-2xl rounded-lg overflow-hidden"
            )}
          >
            <div className="relative w-full">
              <Skeleton className="w-full h-40" />
            </div>
            <CardHeader className="p-4 pt-0 border-b-gray-300 border-b">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2 text-sm flex flex-col h-full">
              <div className="flex-grow space-y-2">
                <div className="flex gap-1">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-12" />
                </div>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-2/5" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default EventsListSkeleton;
