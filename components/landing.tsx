"use client";

import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  MessageSquare,
  Shield,
  Cpu,
  Users,
  BarChart,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useAccount } from "wagmi";

export function LandingPage() {
  const address = useAccount()?.address;
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Decentralized Product Feedback on the Blockchain
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  NexFeed revolutionizes product development with
                  blockchain-powered feedback management and smart
                  contract-driven feature prioritization.
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 flex-col">
                {address === undefined ? (
                  <Button
                    className="bg-white text-indigo-600 hover:bg-gray-100"
                    asChild
                  >
                    <ConnectButton label="Connect Wallet" />
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="bg-white text-indigo-600 hover:bg-gray-100"
                  >
                    <Link href="/products">Get Started</Link>
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white/20"
                  asChild
                >
                  <Link
                    target="_blank"
                    href={
                      "https://s2.tokeninsight.com/static/content/whitepaper/arbitrum.pdf"
                    }
                  >
                    Read Whitepaper
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-indigo-700 dark:text-indigo-300">
              Why Choose NexFeed?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white shadow-lg dark:bg-gray-800">
                <Shield className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Immutable Feedback
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Store user feedback securely on the blockchain, ensuring
                  transparency and preventing tampering.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white shadow-lg dark:bg-gray-800">
                <Cpu className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Smart Contract Voting
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Leverage smart contracts for fair and transparent feature
                  prioritization through token-based voting.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white shadow-lg dark:bg-gray-800">
                <Users className="h-10 w-10 text-pink-500 dark:text-pink-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Decentralized Governance
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Empower your community to participate in product decisions
                  through decentralized governance mechanisms.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white shadow-lg dark:bg-gray-800">
                <BarChart className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Tokenized Incentives
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Reward valuable feedback and contributions with NexFeed
                  tokens, fostering an engaged community.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white shadow-lg dark:bg-gray-800">
                <Lock className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Encrypted Communications
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Ensure privacy with end-to-end encrypted messaging for
                  sensitive product feedback and discussions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white shadow-lg dark:bg-gray-800">
                <MessageSquare className="h-10 w-10 text-pink-500 dark:text-pink-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Cross-chain Compatibility
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Integrate with multiple blockchain networks for wider
                  accessibility and interoperability.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-indigo-100 dark:bg-indigo-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-indigo-700 dark:text-indigo-300">
                  Join the NexFeed Ecosystem
                </h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  Be part of the future of decentralized product development.
                  {/* Connect your Arbitrum for early access and receive bonus */}
                  {/* NexFeed tokens. */}
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2"></div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-700 dark:text-indigo-300">
                  Trusted by Blockchain Innovators
                </h2>
                <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  See how leading blockchain projects are using NexFeed to
                  revolutionize their product development process.
                </p>
                {/* <Button */}
                {/*   variant="outline" */}
                {/*   className="border-indigo-600 text-indigo-600 hover:bg-indigo-100 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950" */}
                {/* > */}
                {/*   Explore Case Studies */}
                {/* </Button> */}
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    DeFi Project
                  </span>
                </div>
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    NFT Platform
                  </span>
                </div>
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <span className="text-xl font-bold text-pink-600 dark:text-pink-400">
                    DAO Tool
                  </span>
                </div>
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    Layer 2 Solution
                  </span>
                </div>
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    Crypto Wallet
                  </span>
                </div>
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <span className="text-xl font-bold text-pink-600 dark:text-pink-400">
                    GameFi Project
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <p className="text-xs text-gray-700 dark:text-gray-400">
          © 2024 NexFeed. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-700 dark:text-gray-400"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-700 dark:text-gray-400"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-700 dark:text-gray-400"
            href="#"
          >
            Tokenomics
          </Link>
        </nav>
      </footer>
    </div>
  );
}
