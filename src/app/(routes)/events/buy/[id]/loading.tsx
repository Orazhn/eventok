import React from "react";
import { Card, CardContent } from "@/shared/ui/card";
import { CalendarIcon, MapPinIcon, UsersIcon, TicketIcon } from "lucide-react";
import { Banknote } from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton";

const EventDetailSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-4">
      <div className="flex justify-center">
        <Skeleton className="w-[700px] h-[400px] rounded-lg" />
      </div>

      <Card className="shadow-xl overflow-hidden">
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="border-b-2 border-b-secondary items-start flex flex-wrap gap-3 justify-between pb-4">
              <div className="flex flex-col">
                <Skeleton className="w-48 h-6 mb-2" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4 mt-2" />
              </div>
              <div className="flex gap-2 items-center bg-gray-200 rounded-md p-2 px-4">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-24 h-6" />
              </div>
            </div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="w-16 h-6" />
              ))}
            </div>
            <div className="flex items-center space-x-3 text-gray-800">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
              <Skeleton className="w-40 h-6" />
            </div>
            <div className="flex items-center space-x-3 text-gray-800">
              <MapPinIcon className="w-6 h-6 text-blue-600" />
              <Skeleton className="w-48 h-6" />
            </div>
            <div className="flex items-center space-x-3 text-gray-800">
              <TicketIcon className="w-6 h-6 text-blue-600" />
              <Skeleton className="w-32 h-6" />
            </div>
            <div className="flex items-center space-x-3 text-gray-800">
              <UsersIcon className="w-6 h-6 text-blue-600" />
              <Skeleton className="w-20 h-6" />
            </div>
            <div className="flex items-center space-x-3 text-gray-800">
              <Banknote className="w-6 h-6 text-blue-600" />
              <Skeleton className="w-16 h-6" />
            </div>
          </div>
          <Skeleton className="w-full h-12 mt-6" />
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailSkeleton;
