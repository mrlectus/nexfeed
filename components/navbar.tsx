"use client";
import { Cpu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();
  console.log("path", pathname);
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
      <Link className="flex items-center justify-center" href="/">
        <Cpu className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        <span className="ml-2 text-2xl font-bold text-indigo-700 dark:text-indigo-300">
          NexFeed
        </span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {pathname === "/" && (
          <Link
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            href="#features"
          >
            Features
          </Link>
        )}
        <Link
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          href="/products"
        >
          Products
        </Link>
        {pathname === "/" && (
          <Link
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            href="https://s2.tokeninsight.com/static/content/whitepaper/arbitrum.pdf"
            target="_blank"
          >
            Whitepaper
          </Link>
        )}
        <Button className="bg-white text-indigo-600 hover:bg-gray-100" asChild>
          <ConnectButton label="Connect Wallet" />
        </Button>
      </nav>
    </header>
  );
};
