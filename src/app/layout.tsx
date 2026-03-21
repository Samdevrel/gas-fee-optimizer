import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gas Fee Optimizer | Compare L1 & L2 Costs | @samdevrel",
  description: "Real-time gas fee comparison across Ethereum L1 and L2s. Find the cheapest chain for your transaction - swaps, transfers, mints, and more.",
  keywords: ["gas fees", "Ethereum", "L2", "Arbitrum", "Base", "Optimism", "DeFi", "blockchain"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
  openGraph: {
    title: "Gas Fee Optimizer",
    description: "Compare transaction costs across L1 and L2s in real-time",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@samdevrel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
