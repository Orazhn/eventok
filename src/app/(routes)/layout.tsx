import Header from "@/widgets/Header";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "@/widgets/Footer";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Toaster />
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
