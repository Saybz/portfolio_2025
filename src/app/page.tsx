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
// import SplineScene from "@/app/components/SplineScene";
import { sections } from "@/app/components/data/Sections";
import dynamic from "next/dynamic";

import { Suspense } from "react";

const SplineScene = dynamic(() => import("./components/SplineScene"), {
  ssr: false,
});

const isClient = typeof window !== "undefined";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [refsReady, setRefsReady] = useState(false);

  const contentRefs = useRef<Array<Array<HTMLDivElement | null>>>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null); // Référence pour le titre
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const isMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 768; // Limite à ajuster si nécessaire
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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
  // Animation du Dot dans le menu de navigation
  const animateDot = (index: number) => {
    if (typeof window !== "undefined" && dotRef.current) {
      const target = document.querySelector(`#nav-item-${index}`);
      if (target) {
        const { top, height, left, width } = target.getBoundingClientRect();
        const position = isMobile()
          ? { left: index * (width + 16) + width / 2 } // Animation horizontale pour mobile
          : { top: index * (height + 16) + height / 2 }; // Animation verticale pour desktop

        gsap.to(dotRef.current, {
          ...position,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    }
  };

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
          animateDot(newIndex); // Animer le dot vers la nouvelle position
        });
      },
    });

    // Animation de la sortie de la section actuelle
    sections[currentIndex].elements.forEach((item, idx) => {
      const ref = contentRefs.current[currentIndex]?.[idx];
      if (ref) {
        tl.to(
          ref,
          {
            ...item.animation.hidden,
            duration: 0.5,
            delay: item.animation.delay,
            ease: "circ",
          },
          "<"
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

  const handleNavClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    const direction = index > currentIndex ? 1 : -1;
    setIsAnimating(true);
    animateSectionChange(index, direction);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleTouchStart = (event: TouchEvent) => {
        setTouchStart(event.touches[0].clientY);
      };

      const handleTouchEnd = (event: TouchEvent) => {
        setTouchEnd(event.changedTouches[0].clientY);
      };

      const handleSwipe = () => {
        if (touchStart !== null && touchEnd !== null) {
          const direction = touchEnd < touchStart ? 1 : -1;
          const newIndex = currentIndex + direction;

          if (newIndex >= 0 && newIndex < sections.length) {
            setIsAnimating(true);
            animateSectionChange(newIndex, direction);
          }
        }
        setTouchStart(null);
        setTouchEnd(null);
      };
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);
      handleSwipe();

      return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [touchStart, touchEnd, currentIndex, isAnimating]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = (event: WheelEvent) => {
        if (isAnimating) return;

        const direction = event.deltaY > 0 ? 1 : -1;
        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < sections.length) {
          setIsAnimating(true);
          animateSectionChange(newIndex, direction);
        }
      };
      window.addEventListener("wheel", handleScroll);
      return () => window.removeEventListener("wheel", handleScroll);
    }
  }, [currentIndex, isAnimating]);

  // Lancer l'animation de la première section au chargement si les références sont prêtes
  useEffect(() => {
    if (typeof window !== "undefined" && refsReady) {
      requestAnimationFrame(() => animateSectionEntry(0));
      animateDot(currentIndex);
      animateTitle(1);
    }
  }, [refsReady]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        animateDot(currentIndex); // Met à jour la position du dot lors du redimensionnement
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [currentIndex]);

  return (
    <>
      <header className="fixed z-50 transform -translate-x-1/2 bottom-4 left-1/2 md:bottom-auto md-translate-x-0 md:-translate-y-1/2 md:right-12 md:left-auto md:top-1/2">
        <span
          ref={dotRef}
          id="dot"
          className="absolute left-0 w-3 h-3 transition-transform duration-500 rounded-full md:left-auto -bottom-2 md:bottom-auto md:top-0 md:-right-4 bg-primary"
        ></span>
        <nav>
          <ul className="relative flex items-center md:flex-col">
            {sections.map((section, index) => (
              <li
                key={index}
                id={`nav-item-${index}`}
                onClick={() => handleNavClick(index)}
                className={`flex items-center justify-center  m-2 w-14 h-14 rounded-xl border-4 transition-all duration-500 cursor-pointer ${
                  currentIndex === index
                    ? "bg-secondary text-primary border-primary"
                    : "border-secondary text-secondary"
                }`}
              >
                {section.title[0]}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="z-10 min-h-screen overflow-hidden text-dark max-w-main bg-light">
        <div className="relative w-full h-screen pt-12 md:pt-16">
          <div className="flex flex-col items-start justify-start xl:px-8">
            <div className="relative flex items-center justify-between py-1 px-5 mb-8 overflow-hidden font-bold transition-all duration-500 ease-in-out md:rounded-r-3xl rounded-r-xl w-fit md:px-12 text-xxl font-head bg-secondary text-primary before:absolute before:content-* before:-left-0 before:top-0 before:w-2 md:before:w-4 before:h-full before:bg-primary md:text-big">
              <h2 ref={titleRef} className="font-bold">
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

          <Suspense fallback={null}>
            {/* Ma scène */}
            <div className="fixed inset-0 z-0 w-screen h-screen pointer-events-none">
              {isClient && <SplineScene currentIndex={currentIndex} />}
            </div>
          </Suspense>
        </div>
      </main>
    </>
  );
}
