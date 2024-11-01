import { ReactNode } from "react";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen w-full">{children}</div>;
}
