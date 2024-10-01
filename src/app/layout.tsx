import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Clubs from "./assets/clubs";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BlackJack",
  description: "Quick and free blackjack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <div className="container mx-auto items-center justify-items-center h-dvh font-[family-name:var(--font-geist-mono)]">
          <header className="flex h-10%"></header>
          {children}
          <footer className=" flex h-5%"></footer>
        </div>
      </body>
    </html>
  );
}
