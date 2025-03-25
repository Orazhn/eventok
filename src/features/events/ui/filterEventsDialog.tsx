"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { ListFilter, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { OPTIONS } from "@/entities/event/eventCategories";

export function FilterEventsDialog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [timeline, setTimeline] = useState(
    searchParams.get("timeline") || undefined
  );
  const [category, setCategory] = useState(
    searchParams.get("category") || undefined
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [sortAttendees, setSortAttendees] = useState(
    searchParams.get("sortAttendees") || undefined
  );

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    const filters = {
      timeline: timeline === "all" ? "" : timeline,
      category,
      location,
      sortAttendees,
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    router.push(`?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push("?");
    router.refresh();
    setTimeline(undefined);
    setCategory(undefined);
    setLocation("");
    setSortAttendees(undefined);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ListFilter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Filter Events
            <DialogClose asChild>
              <X className="cursor-pointer" />
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="text-start">
            Customize your event search with filters.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Label className="block font-bold">Timeline</Label>
          <RadioGroup
            value={timeline}
            onValueChange={setTimeline}
            className="flex flex-col space-y-2 mt-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Events</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upcoming" id="upcoming" />
              <Label htmlFor="upcoming">Upcoming Events</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="past" id="past" />
              <Label htmlFor="past">Past Events</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between gap-2">
          <div className="py-2 w-full">
            <Label htmlFor="category" className="block mb-2 font-bold">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="py-2 w-full">
            <Label htmlFor="sort-attendees" className="block mb-2 font-bold">
              Sort by Attendees
            </Label>
            <Select value={sortAttendees} onValueChange={setSortAttendees}>
              <SelectTrigger id="sort-attendees" className="w-full">
                <SelectValue placeholder="Sort by attendees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most">Most Attended</SelectItem>
                <SelectItem value="least">Least Attended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="py-2">
          <Label htmlFor="location" className="block mb-2 font-bold">
            Location
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="event location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button
              onClick={handleClearFilters}
              variant="link"
              className="text-destructive hover:text-destructive"
            >
              Clear Filters
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
