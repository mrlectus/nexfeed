import { NavBar } from "@/components/navbar";
import { ReactNode } from "react";

export default function SplashPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavBar />
      {children}
    </div>
  );
}
