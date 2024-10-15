"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";
import "tailwindcss/tailwind.css";
import Scene from "@/Scene";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const contentRefs = useRef<Array<Array<HTMLDivElement | null>>>([]);

  const sections = [
    {
      title: "Hey",
      elements: [
        {
          content: (
            <div className="font-light text-xxl text-primary">My name is</div>
          ),
          animation: {
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
            delay: 0,
          },
        },
        {
          content: (
            <div className="text-3xl font-bold text-primary">
              Shailash Bhati
            </div>
          ),
          animation: {
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
            delay: 0.1,
          },
        },
        {
          content: (
            <p>I’m a 25-year-old French web developer based in Tours.</p>
          ),
          animation: {
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
            delay: 0.2,
          },
        },
      ],
    },
    {
      title: "Skills",
      elements: [
        {
          content: <p>La 3D dans le web m’a toujours fascinée.</p>,
          animation: {
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
            delay: 0,
          },
        },
        {
          content: (
            <p>I’m a 25-year-old French web developer based in dsfTours.</p>
          ),
          animation: {
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
            delay: 0.1,
          },
        },
        {
          content: (
            <p>I’m a 25-year-old French web developer based in sdfTours.</p>
          ),
          animation: {
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
            delay: 0.2,
          },
        },
      ],
    },
    {
      title: "Game",
      elements: [
        {
          content: <p>Explorez le potentiel infini de la 3D.</p>,
          animation: {
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
            delay: 0,
          },
        },
        {
          content: (
            <p>I’m a 25-year-old French web developer based in dsfTousdf.</p>
          ),
          animation: {
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
            delay: 0.1,
          },
        },
        {
          content: (
            <p>
              I’m a 25-year-old French web developer based in sdfTousdgfzerrs.
            </p>
          ),
          animation: {
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
            delay: 0.2,
          },
        },
      ],
    },
  ];

  // Initialisation des références
  useLayoutEffect(() => {
    contentRefs.current = sections.map(() => []);
  }, [sections.length]);

  const setRef = useCallback(
    (index: number, elIndex: number, el: HTMLDivElement | null) => {
      if (el) {
        if (!contentRefs.current[index]) {
          contentRefs.current[index] = [];
        }
        contentRefs.current[index][elIndex] = el;
      }
    },
    []
  );

  const animateSectionEntry = (index: number) => {
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    sections[index].elements.forEach((item, idx) => {
      const ref = contentRefs.current[index]?.[idx];
      if (ref) {
        tl.fromTo(
          ref,
          { ...item.animation.hidden },
          {
            ...item.animation.visible,
            duration: 0.5,
            delay: item.animation.delay,
            ease: "power2.inOut",
          },
          "<"
        );
      } else {
        console.error(`Reference for item ${idx} in index ${index} is null.`);
      }
    });
  };

  const animateSectionChange = (newIndex: number) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);

        // Utilisation de requestAnimationFrame pour garantir la disponibilité des éléments
        requestAnimationFrame(() => {
          animateSectionEntry(newIndex);
        });
      },
    });

    sections[currentIndex].elements.forEach((item, idx) => {
      const ref = contentRefs.current[currentIndex]?.[idx];
      if (ref) {
        tl.to(
          ref,
          { ...item.animation.hidden, duration: 0.5, ease: "power2.inOut" },
          0
        );
      }
    });
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isAnimating) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const newIndex = currentIndex + direction;

      if (newIndex >= 0 && newIndex < sections.length) {
        setIsAnimating(true);
        animateSectionChange(newIndex);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentIndex, isAnimating]);

  useEffect(() => {
    requestAnimationFrame(() => animateSectionEntry(0));
  }, []);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen text-dark max-w-main bg-light">
      <div className="relative flex flex-col w-full md:flex-row">
        <div className="flex-1 h-screen overflow-hidden">
          <section className="flex flex-col items-center justify-center h-screen">
            <div className="fixed px-8 py-4 font-bold rounded-r-full top-20 bg-secondary text-primary">
              <h2>{sections[currentIndex].title}</h2>
            </div>
            <div className="max-w-md">
              {sections[currentIndex].elements.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => setRef(currentIndex, index, el)}
                  className="section-item"
                >
                  {item.content}
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="fixed top-0 left-0 w-screen h-screen -z-10">
          <Scene />
        </div>
      </div>
    </main>
  );
}
