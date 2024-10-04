import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
        <div className="flex justify-center h-dvh font-[family-name:var(--font-geist-mono)]">
          <div className="w-90% ">
            <header className="flex h-10%"></header>
            {children}
            <footer className="flex h-5%"></footer>
          </div>
        </div>
      </body>
    </html>
  );
}
