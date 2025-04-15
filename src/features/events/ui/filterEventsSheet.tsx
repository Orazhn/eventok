"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Filter, Minus } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { useEventsFilterStore } from "@/shared/store/eventsFilterStore/store";
import type {
  SortAttendees,
  Timeline,
} from "@/shared/store/eventsFilterStore/types";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { OPTIONS } from "@/entities/event/eventCategories";
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/ui/multi-select";
import { RangeSlider } from "@/shared/ui/rangeSlider";
import NumberInput from "@/shared/ui/numberInput";
import { maxTicketPrice } from "@/entities/event/modal";
import { useRouter } from "next/navigation";

export function FilterEventsSheet() {
  const { push } = useRouter();
  const { setFilters, timeline, category, sortAttendees, clearFilters } =
    useEventsFilterStore();

  const [searchLocation, setSearchLocation] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, maxTicketPrice]);
  const [searchName, setSearchName] = useState("");

  const debouncedPriceRange = useDebounce(priceRange, 500);
  const debouncedSearchLocation = useDebounce(searchLocation, 500);
  const debouncedSearchName = useDebounce(searchName, 500);

  useEffect(() => {
    setFilters({ page: 1 });
    push("events?page=1");
  }, [
    setFilters,
    push,
    clearFilters,
    debouncedPriceRange,
    debouncedSearchLocation,
    debouncedSearchName,
  ]);

  useEffect(() => {
    setFilters({ priceRange: debouncedPriceRange });
  }, [debouncedPriceRange, setFilters]);

  useEffect(() => {
    if (debouncedSearchLocation.trim()) {
      setFilters({ location: debouncedSearchLocation });
    } else {
      setFilters({ location: "" });
    }
  }, [debouncedSearchLocation, setFilters]);

  useEffect(() => {
    if (debouncedSearchName.trim()) {
      setFilters({ name: debouncedSearchName });
    } else {
      setFilters({ name: "" });
    }
  }, [debouncedSearchName, setFilters]);

  const handleClearFilters = () => {
    clearFilters();
    setPriceRange([0, maxTicketPrice]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4">
        <SheetHeader className="pl-0">
          <SheetTitle>Filter Events</SheetTitle>
          <SheetDescription>
            Find events you need by category, date and location
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6  ">
          <div className="py-2">
            <Label htmlFor="search" className="block mb-2 font-bold">
              Search
            </Label>
            <Input
              id="search"
              type="text"
              placeholder="search event by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <Label className="block font-bold">Price</Label>
            <div className="flex gap-3 items-center">
              <NumberInput
                label="From"
                value={priceRange[0]}
                onChange={(newValue) => {
                  const min = Number(newValue);
                  const max = priceRange[1];
                  const updated = [min, Math.max(min + 10, max)];
                  setPriceRange([...updated]);
                }}
              />
              <Minus className="size-3 mt-6" strokeWidth={5} />
              <NumberInput
                label="To"
                value={priceRange[1]}
                onChange={(newValue) => {
                  const max = Number(newValue);
                  const min = priceRange[0];
                  const updated = [
                    Math.min(max - 10 > 0 ? max - 10 : 0, min),
                    max,
                  ];
                  setPriceRange([...updated]);
                }}
              />
            </div>
            <RangeSlider
              value={priceRange}
              showValueLabel={false}
              onValueChange={setPriceRange}
              min={0}
              max={maxTicketPrice}
              step={1}
              minStepsBetweenThumbs={1}
            />
          </div>
          <div>
            <Label className="block font-bold">Timeline</Label>
            <RadioGroup
              value={timeline}
              onValueChange={(val) => setFilters({ timeline: val as Timeline })}
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
          <div className="flex flex-row gap-2 max-sm:flex-wrap sm:flex-wrap md:flex-nowrap">
            <div className="py-2 w-full">
              <Label htmlFor="category" className="block mb-2 font-bold">
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(val) => setFilters({ category: val })}
              >
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
              <Select
                value={sortAttendees}
                onValueChange={(val) =>
                  setFilters({ sortAttendees: val as SortAttendees })
                }
              >
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
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button onClick={handleClearFilters} variant={"destructive"}>
            Clear Filters
          </Button>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
