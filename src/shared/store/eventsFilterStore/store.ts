import { create } from "zustand";
import { Category, SortAttendees, Timeline } from "./types";
import { maxTicketPrice } from "@/entities/event/modal";

interface EventsFilterStore {
  page: number;
  name: string;
  timeline?: Timeline;
  priceRange?: number[];
  category?: Category;
  location: string;
  sortAttendees?: SortAttendees;
  setFilters: (filters: Partial<EventsFilterStore>) => void;
  clearFilters: () => void;
}

export const useEventsFilterStore = create<EventsFilterStore>((set) => ({
  page: 1,
  name: "",
  location: "",

  setFilters: (filters) =>
    set((state) => ({
      ...state,
      ...filters,
    })),

  clearFilters: () =>
    set({
      name: "",
      priceRange: [0, maxTicketPrice],
      timeline: undefined,
      category: undefined,
      location: "",
      sortAttendees: undefined,
    }),
}));
