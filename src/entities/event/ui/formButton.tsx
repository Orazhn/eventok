"use client";
import { Button } from "@/shared/ui/button";
import { PartyPopper } from "lucide-react";
const FormButton = ({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (data: boolean) => void;
}) => {
  return (
    <Button
      type="submit"
      onClick={() => setIsLoading(true)}
      variant={"secondary"}
      effect={"expandIcon"}
      icon={PartyPopper}
      iconPlacement="right"
      disabled={isLoading}
    >
      {isLoading ? "Creating Event..." : "Create Event"}
    </Button>
  );
};

export default FormButton;
