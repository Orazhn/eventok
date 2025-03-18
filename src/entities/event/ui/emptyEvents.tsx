import React from "react";
import { CalendarX } from "lucide-react";
import { userType } from "../eventTypes";

const EmptyEvents = ({ userType }: { userType: userType }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center border-0 dark:bg-gray-900 rounded-2xl">
      <div className="flex flex-col items-center border-0">
        <CalendarX className="w-16 h-16 text-gray-400 dark:text-gray-500" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          No Events Found
        </h2>
        {userType == "creator" && (
          <p className="text-gray-500 dark:text-gray-400">
            You haven’t created any events yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmptyEvents;
