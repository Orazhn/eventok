import LoadingSpinner from "@/shared/ui/loadingSpinner";
import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br px-4">
      <ClerkLoading>
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <div className="flex flex-col items-center space-y-6 p-6 bg-white/10 rounded-2xl shadow-xl text-center max-w-lg">
          <h1 className="text-white text-3xl font-extrabold leading-tight">
            Hi there 👋, Ready to <span className="text-blue-300">Create</span>{" "}
            <span className="text-purple-300">Your Event?</span>
          </h1>
          <p className="text-white text-lg font-medium">
            Start by creating an account and bring your ideas to life!
          </p>
          <SignUp />
        </div>
      </ClerkLoaded>
    </div>
  );
}
