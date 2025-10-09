import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audionix: XM5 — Premium Noise Canceling Headphones | 3D Showcase",
  description:
    "Explore Sony WH‑1000XM5 in an immersive 3D showcase. Advanced noise canceling, Hi‑Res Audio with LDAC, DSEE Extreme, and all‑day comfort.",
  keywords: [
    "Sony",
    "WH-1000XM5",
    "noise canceling",
    "LDAC",
    "Hi-Res Audio",
    "DSEE Extreme",
    "headphones",
    "3D",
  ],
  openGraph: {
    title: "Audionix: XM5 — Premium Noise Canceling Headphones",
    description:
      "Explore Sony WH‑1000XM5 in an immersive 3D showcase. Advanced noise canceling, Hi‑Res Audio with LDAC, DSEE Extreme, and all‑day comfort.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audionix: XM5 — Premium Noise Canceling Headphones",
    description:
      "Explore Sony WH‑1000XM5 in an immersive 3D showcase. Advanced noise canceling, Hi‑Res Audio with LDAC, DSEE Extreme, and all‑day comfort.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
