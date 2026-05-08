import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.TROPTIONS_BASE_URL || "https://troptions.unykorn.org";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TROPTIONS Exchange OS",
  description: "Trade, launch, and verify XRPL assets on the TROPTIONS decentralized exchange.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/assets/troptions/logos/troptions-tt-gold.jpg", type: "image/jpeg" },
    ],
    apple: [
      { url: "/assets/troptions/logos/troptions-tt-gold.jpg", type: "image/jpeg" },
    ],
    shortcut: "/assets/troptions/logos/troptions-tt-gold.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
