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

const EventOptionsMenu = ({ id }: { id: number }) => {
  const handleDelete = () => {
    toast.promise(deleteEventAction(id), {
      loading: "deleting... 🧹",
      error: "error deleting Event",
      success: "event was deleted! 🗑️",
    });
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EventOptionsMenu;
