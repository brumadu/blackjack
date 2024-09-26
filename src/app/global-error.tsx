"use client";

import "./globals.css";
import localFont from "next/font/local";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function GlobalError() {
  return (
    <html lang="en">
      <body className={geistMono.className}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}
