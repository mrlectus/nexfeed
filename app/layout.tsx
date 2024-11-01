import type { Metadata } from "next";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "next-themes";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import RainbowProvider from "./providers/rainbow";
import QueryProvider from "./providers/query";
import { Toaster } from "@/components/ui/toaster";
import ProgressProvider from "./providers/progress";
import { NuqsProvider } from "./providers/nuqs";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexFeed",
  description: "Decentralized product feedback social dapp",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <QueryProvider>
            <RainbowProvider>
              <ProgressProvider>
                <NuqsProvider>{children}</NuqsProvider>
              </ProgressProvider>
            </RainbowProvider>
          </QueryProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
