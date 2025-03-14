import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center mt-6">
        <div className="w-full max-w-[600px] mx-auto mb-20">
          <div className="relative h-[300px]">
            <Image
              src="/not-found.png"
              alt="404 Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold mt-8 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-8">
            We can&apos;t seem to find the Event you are looking for
          </p>
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9]" asChild>
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
