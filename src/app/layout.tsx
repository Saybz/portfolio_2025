import { FC, PropsWithChildren } from "react";
import { Cantata_One, Poppins } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Shailash Bhati",
  description: "My portfolio, my rules",
};

const cantata = Cantata_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-head",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cantata.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
