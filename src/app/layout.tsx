import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { neobrutalism } from "@clerk/themes";
import NextTopLoader from "nextjs-toploader";
import ReactQueryProvider from "./providers/reactQueryProvider";
import PersistQueryClient from "@/app/providers/PersistQueryClient";

export const metadata: Metadata = {
  title: "Event Management",
  description: "Web App for creating, editing and booking Events",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en">
        <body>
          <NextTopLoader showSpinner={false} color="#7043D8" />
          <ReactQueryProvider>
            <PersistQueryClient />
            {children}
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
