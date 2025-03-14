import Header from "@/widgets/Header";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Toaster />
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default layout;
