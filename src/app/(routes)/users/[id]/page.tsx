import { notFound } from "next/navigation";
import { prisma } from "@/shared/lib/prisma";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import EventCard from "@/entities/event/ui/event-card";

interface Props {
  params: Promise<{ id: string }>;
}

const UserProfilePage = async ({ params }: Props) => {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: { events: true },
  });

  if (!user) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <Card className="w-full p-6 shadow-lg border border-gray-200 rounded-2xl bg-white">
        <CardHeader className="flex flex-col items-center gap-4">
          <Image
            src={user.profile_image_url}
            alt={user.username}
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-300 shadow-md"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </CardHeader>

        <CardContent>
          <h2 className="mt-6 mb-4 text-2xl font-semibold text-gray-800 text-center">
            {user.username}&apos;s Events
          </h2>

          {user.events.length > 0 ? (
            <div className="flex gap-4 flex-wrap">
              {user.events.map((event) => (
                <EventCard event={event} key={event.id} userType="customer" />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-600 text-center">
              No events created yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;
