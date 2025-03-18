import LoadingSpinner from "@/shared/ui/loadingSpinner";
import React from "react";

const loading = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <LoadingSpinner size={14} border={6} />
    </div>
  );
};

export default loading;
