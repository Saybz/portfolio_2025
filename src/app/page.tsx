"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Scene from "@/Scene";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  /*  useEffect(() => {
    const textWrappers = document.querySelectorAll(".");
    const pinTrigger = ScrollTrigger.create();
  }); */

  return (
    <main className="flex flex-col items-center justify-between min-h-screen px-24 text-white max-w-main bg-dark">
      <div className="relative z-0 flex w-full ">
        <div className="flex-1 w-1/2 left">
          <section className="flex flex-col justify-center h-screen px-12 py-vmain intro">
            <div className="flex items-center mb-4 font-head">
              <span className="relative leading-none before:block before:absolute before:-left-12 before:top-0 before:w-2 before:h-full before:bg-primary text-big text-primary">
                Hey
              </span>
              <h1 className="ml-4 text-3xl">
                {" "}
                My name is <br /> Shailash Bhati
              </h1>
            </div>
            <div className="max-w-md desc text-lightbody">
              I’m actually 25 years old and i’m a french web developer based at
              Tours in France.
            </div>
          </section>
          <section className="flex flex-col justify-center h-screen px-12 py-vmain intro">
            <div className="flex items-center mb-4 font-head">
              <h2 className="relative mb-2 leading-none before:block before:absolute before:-left-12 before:top-0 before:w-2 before:h-full before:bg-primary text-big text-primary">
                Skills
              </h2>
            </div>
            <div className="max-w-md desc text-lightbody">
              Even developping web sites can process with green behaviors.
            </div>
          </section>

          <section className="flex flex-col justify-center h-screen px-12 py-vmain intro">
            <div className="flex items-center mb-4 font-head">
              <h2 className="relative mb-2 leading-none before:block before:absolute before:-left-12 before:top-0 before:w-2 before:h-full before:bg-primary text-big text-primary">
                Education
              </h2>
            </div>
            <div className="max-w-md desc text-lightbody">
              Even developping web sites can process with green behaviors.
            </div>
          </section>
        </div>

        <div className="sticky top-0 w-1/2 h-screen right">
          <section className="flex flex-col justify-center flex-1 h-full px-12 py-vmain">
            <Scene />
          </section>
        </div>
        <div className="fixed top-0 left-0 w-full h-full mx-auto strokes ">
          <div className="z-0 flex justify-between h-screen px-24 mx-auto max-w-main">
            <div className="w-px h-full stroke bg-light opacity-10"></div>
            {/* <div className="w-px h-full stroke bg-light opacity-10"></div>
            <div className="w-px h-full stroke bg-light opacity-10"></div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
