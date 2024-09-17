"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import Scene from "@/Scene";
import ScrollSections from "./ScrollSections";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen px-24 text-white max-w-main bg-dark">
      <div className="fixed top-0 left-0 w-full h-full mx-auto strokes">
        <div className="z-0 flex justify-between h-screen px-24 mx-auto max-w-main">
          <div className="w-px h-full stroke bg-light opacity-10"></div>
        </div>
      </div>

      <div className="relative z-0 flex w-full">
        <ScrollSections />

        <div className="sticky top-0 w-1/2 h-screen right">
          <section className="flex flex-col justify-center flex-1 h-full px-12 py-vmain">
            <Scene />
          </section>
        </div>
      </div>
    </main>
  );
}
