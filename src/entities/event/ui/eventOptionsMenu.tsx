"use client";
import { deleteEventAction } from "@/features/events/actions/deleteEventAction";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const EventOptionsMenu = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await toast.promise(deleteEventAction(id), {
        loading: "Deleting...",
        success: "Event deleted!",
        error: "Error deleting event",
      });

      queryClient.setQueryData(["events"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: (
            oldData as { pages: Array<{ events: Array<{ id: number }> }> }
          ).pages.map((page) => ({
            ...page,
            events: page.events.filter((event) => event.id !== id),
          })),
        };
      });

      queryClient.invalidateQueries({ queryKey: ["events"] });
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="absolute top-3 right-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white/90 rounded-full shadow-md"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-0">
          <Link href={`/dashboard/event/attendees/${id}`}>
            <DropdownMenuItem>View attendees</DropdownMenuItem>
          </Link>
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EventOptionsMenu;
