"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import Scene from "@/Scene";
import ScrollSections from "./ScrollSections";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen text-dark max-w-main bg-light">
      <div className="relative flex flex-col w-full z-1 md:flex-row">
        <ScrollSections />

        <div className="fixed top-0 left-0 z-0 w-screen h-screen">
          <Scene />
        </div>
      </div>
    </main>
  );
}
