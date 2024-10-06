import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter} antialiased`}>
        <div className="flex justify-center h-dvh font-[family-name:var(--font-geist-mono)]">
          <div className="w-90% ">
            {children}
            <footer className="flex h-5%"></footer>
          </div>
        </div>
      </body>
    </html>
  );
}
