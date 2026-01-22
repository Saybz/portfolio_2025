import { FC, PropsWithChildren } from "react";
import { Comfortaa, Poppins } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
export const metadata = {
  title: "Shailash Bhati | Frontend Developer",
  description: "Portfolio de Shailash Bhati, Frontend Developer",
};

const comfortaa = Comfortaa({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-head",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${comfortaa.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
