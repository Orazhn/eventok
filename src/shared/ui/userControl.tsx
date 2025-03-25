"use client";
import { LayoutDashboard } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import LoadingSpinner from "./loadingSpinner";
import { PlusCircle } from "lucide-react";

const UserControl = () => {
  return (
    <UserButton fallback={<LoadingSpinner />}>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Dashboard"
          labelIcon={<LayoutDashboard size={17} />}
          href="/dashboard"
        />
        <UserButton.Link
          label="Create Event"
          labelIcon={<PlusCircle size={17} />}
          href="/dashboard/create"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserControl;
