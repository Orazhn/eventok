import EventsList from "@/features/events/events-list/ui";
import { getUserId } from "@/shared/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Search } from "lucide-react";

export default async function EventsPage() {
  const userId = await getUserId();

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground mt-1">
            Explore Upcoming and Past events
          </p>
        </div>
        <div className="flex w-full md:w-auto gap-2 items-center">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="w-full pl-8"
            />
          </div>
          <Button type="submit">
            <Search className="size-4" />
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="mb-8 w-full">
        <TabsList className="w-full">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <EventsList userType="customer" userId={userId} />
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <EventsList userType="customer" userId={userId} past />
        </TabsContent>
      </Tabs>
    </div>
  );
}
