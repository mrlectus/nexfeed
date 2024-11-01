"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function SignInPage() {
  console.log("use account", useAccount().address);
  return (
    <>
      <main className="flex flex-col justify-center items-center min-w-screen h-screen">
        <ConnectButton label="Sign In" />
      </main>
    </>
  );
}
