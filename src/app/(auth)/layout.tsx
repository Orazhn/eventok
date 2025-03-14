import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gradient-to-r from-[#21D4FD] to-[#B721FF] flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  );
};

export default Layout;
