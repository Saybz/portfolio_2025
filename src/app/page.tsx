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
  const [refsReady, setRefsReady] = useState(false);

  const contentRefs = useRef<Array<Array<HTMLDivElement | null>>>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null); // Référence pour le titre
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
            delay: 0.1,
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
            <p>I’m a 25-year-old French web developer based in Tours.</p>
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
            delay: 0.1,
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
            <p>I’m a 25-year-old French web developer based in Tours.</p>
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
            delay: 0.1,
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
      if (
        contentRefs.current.every(
          (refs) => refs.length > 0 && refs.every((ref) => ref !== null)
        )
      ) {
        setRefsReady(true);
      }
    },
    []
  );

  const animateTitle = (direction: number) => {
    if (titleRef.current) {
      const yOffset = direction > 0 ? 100 : -100; // Déterminer la direction
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: yOffset },
        { opacity: 1, y: 0, duration: 0.5, ease: "slow" }
      );
    }
  };

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
            duration: 0.8,
            delay: item.animation.delay,
            ease: "expo",
          },
          "<"
        );
      } else {
        console.error(`Reference for item ${idx} in index ${index} is null.`);
      }
    });
  };

  const animateSectionChange = (newIndex: number, direction: number) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
        // Assurer que les éléments sont bien montés avant de lancer l'animation

        animateTitle(direction); // Animer le titre avec direction
        requestAnimationFrame(() => {
          animateSectionEntry(newIndex);
        });
      },
    });

    // Animation de la sortie de la section actuelle
    sections[currentIndex].elements.forEach((item, idx) => {
      const ref = contentRefs.current[currentIndex]?.[idx];
      if (ref) {
        tl.to(
          ref,
          { ...item.animation.hidden, duration: 0.5, ease: "circ" },
          0
        );
      }
    });

    // Sortie du titre avec direction
    if (titleRef.current) {
      const yExitOffset = direction > 0 ? -200 : 200; // Direction vers le haut ou le bas
      tl.to(
        titleRef.current,
        { opacity: 0, y: yExitOffset, duration: 0.5, ease: "slow" },
        0
      );
    }
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isAnimating) return;

      const direction = event.deltaY > 0 ? 1 : -1; // 1 pour le bas, -1 pour le haut
      const newIndex = currentIndex + direction;

      if (newIndex >= 0 && newIndex < sections.length) {
        setIsAnimating(true);
        animateSectionChange(newIndex, direction);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentIndex, isAnimating]);

  // Lancer l'animation de la première section au chargement si les références sont prêtes
  useEffect(() => {
    if (refsReady) {
      requestAnimationFrame(() => animateSectionEntry(0));
      animateTitle(1);
    }
  }, [refsReady]);

  return (
    <main className="min-h-screen overflow-hidden text-dark max-w-main bg-light">
      <div className="relative w-full h-screen pt-12 md:pt-16">
        <div className="z-10 flex flex-col items-start justify-start xl:px-8">
          <div className="relative flex items-center justify-between py-1 px-5 mb-8 overflow-hidden font-bold transition-all duration-500 ease-in-out md:rounded-r-3xl rounded-r-xl w-fit md:px-12 text-xxl font-head bg-secondary text-primary before:absolute before:content-* before:-left-0 before:top-0 before:w-2 md:before:w-4 before:h-full before:bg-primary md:text-big">
            <h2 ref={titleRef} className="font-bold ">
              {sections[currentIndex].title}
            </h2>
          </div>
          <div className="max-w-md px-4 xl:p-x-0">
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
        </div>
        <div className="fixed top-0 left-0 z-0 w-screen h-screen">
          <Scene />
        </div>
      </div>
    </main>
  );
}
