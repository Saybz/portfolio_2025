import { FC, PropsWithChildren } from "react";
import { Comfortaa, Poppins } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Shailash Bhati",
  description: "My portfolio, my rules",
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
      <body className="bg-light">{children}</body>
    </html>
  );
}
