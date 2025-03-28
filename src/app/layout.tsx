import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Posts",
  description: "Simple posts app with Xata and Clerk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full flex flex-col bg-[radial-gradient(ellipse_at_center,_#1a1a2e_0%,_#000000_100%)] text-white`}
      >
        <Nav />
        <main className="flex-1 overflow-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
