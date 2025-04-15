import { useQuery } from "@tanstack/react-query";
import { useEventsFilterStore } from "@/shared/store/eventsFilterStore/store";
import { DBEvent } from "@/entities/event/modal";
import axios from "axios";

export function usePaginationEvents(page: number) {
  const { timeline, category, location, sortAttendees, name, priceRange } =
    useEventsFilterStore();

  return useQuery({
    queryKey: [
      "paginationEvents",
      page,
      name,
      priceRange ?? [0, 1000000000],
      timeline ?? "all",
      category ?? "",
      location ?? "",
      sortAttendees ?? "most",
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      if (timeline && timeline !== "all") params.set("timeline", timeline);
      params.set("name", name);
      if (priceRange?.length) {
        params.set("priceRange", JSON.stringify(priceRange));
      }
      if (category) params.set("category", category);
      if (location) params.set("location", location);
      if (sortAttendees) params.set("sortAttendees", sortAttendees);

      const res = await axios.get(`/api/paginationEvents?${params.toString()}`);
      return {
        events: res.data.events as DBEvent[],
        eventsCount: res.data.eventsCount as number,
      };
    },
  });
}
