import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`antialiased`}>
        <div id="animatedBackground">
          <div className="flex justify-center h-dvh font-Inter">
            {children}
            <footer className="flex h-5%"></footer>
          </div>
        </div>
      </body>
    </html>
  );
}
