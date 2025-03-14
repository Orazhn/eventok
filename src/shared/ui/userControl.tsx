"use client";
import { LayoutDashboard } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import LoadingSpinner from "./loadingSpinner";

const UserControl = () => {
  const { isLoaded } = useAuth();
  if (!isLoaded) return <LoadingSpinner />;
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Dashboard"
          labelIcon={<LayoutDashboard size={17} />}
          href="/dashboard"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserControl;
