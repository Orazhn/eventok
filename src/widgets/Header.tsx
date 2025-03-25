import Image from "next/image";
import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import UserControl from "@/shared/ui/userControl";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"], weight: ["400", "800"] });

const Header = () => {
  return (
    <header className="flex gap-4 items-center px-6 shadow-2xl py-3 rounded-2xl w-screen justify-between bg-gray-200">
      <Link href={"/"}>
        <div className="flex gap-2 items-center bg-gray-200 p-1 px-2 rounded-md">
          <Image
            src={"/logo.png"}
            width={35}
            height={35}
            alt="logo"
            className="rounded-md"
          />
          <h1 className={cn(rubik.className, "font-semibold text-primary")}>
            Eventok
          </h1>
        </div>
      </Link>
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserControl />
      </SignedIn>
    </header>
  );
};

export default Header;
