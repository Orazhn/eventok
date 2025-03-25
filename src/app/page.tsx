import { Button } from "@/shared/ui/button";
import Link from "next/link";
import Image from "next/image";
import Header from "@/widgets/Header";
import { Rubik } from "next/font/google";
import { FlipWords } from "@/shared/ui/flip-words";
import { PageCount } from "@/shared/ui/counterAnimation";
import { getUserId } from "@/shared/lib/getUserId";
import Footer from "@/widgets/Footer";
import { prisma } from "@/shared/lib/prisma";
import EventCard from "@/entities/event/ui/event-card";
import EmptyEvents from "@/entities/event/ui/emptyEvents";

const rubik = Rubik({ subsets: ["latin"], weight: ["400", "800"] });

export default async function Home() {
  const userId = await getUserId();
  const events = await prisma.event.findMany({
    where: { NOT: { userId: userId as string } },
    orderBy: { date: "desc" },
    take: 8,
  });
  const words = ["Host :", "Connect :", "Celebrate :", "Share :"];
  return (
    <div className="min-h-screen">
      <Header />
      <main className={rubik.className}>
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                <FlipWords words={words} className="text-primary" /> <br /> Your
                Events, Our Platform!
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-lg">
                Book and learn helpful tips from{" "}
                <PageCount
                  end={1168}
                  duration={4}
                  className="text-primary text-lg"
                />
                <br /> mentors in world-class companies with our global
                community.
              </p>
              <Button size={"lg"} asChild>
                <Link href="/events">Explore Now </Link>
              </Button>
            </div>
            <div className="relative h-[400px] md:h-[500px] w-full">
              <Image
                src="/hero.png"
                alt="hero collage"
                fill
                sizes="400px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>
        <div className="p-8 flex flex-col gap-4">
          <h1 className="text-2xl text-center mb-8 font-semibold">
            Our Upcoming Events 🎉
          </h1>
          {events.length ? (
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {events.map((event) => (
                <EventCard key={event.id} event={event} userType={"customer"} />
              ))}
            </div>
          ) : (
            <EmptyEvents userType="customer" />
          )}
          <Button size={"lg"} className="text-md" variant={"link"} asChild>
            <Link href="/events">See more </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
