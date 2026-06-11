import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devanshsahu.dev"),
  title: "Devansh Sahu | AI Engineer",
  description:
    "AI-focused software engineer building distributed systems, AI-powered SaaS products, and cloud-native applications.",
  keywords: [
    "Devansh Sahu",
    "AI Engineer",
    "Software Engineer",
    "Distributed Systems",
    "Bhopal",
  ],
  openGraph: {
    title: "Devansh Sahu | AI Engineer",
    description:
      "Distributed systems, AI-powered products, and cloud-native infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
