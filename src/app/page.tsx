"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import "tailwindcss/tailwind.css";
// import SplineScene from "@/app/components/SplineScene";
import { scenes } from "@/app/components/data/sceneConfig";
import dynamic from "next/dynamic";

import { Suspense } from "react";
import Image from "next/image";
import ProjectPreviews from "./components/ProjectPreviews";
import Navigation from "./components/Navigation";

const SplineScene = dynamic(() => import("./components/SplineScene"), {
  ssr: false,
});
const SplineSceneTeaser = dynamic(() => import("./components/SplineSceneTeaser"), {
  ssr: false,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [refsReady, setRefsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Ajout de l'état de chargement
  const [isSceneMounted, setIsSceneMounted] = useState(false);
  const contentRefs = useRef<Array<Array<HTMLDivElement | null>>>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null); // Référence pour le titre
  const isMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 768; // Limite à ajuster si nécessaire
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isClientW = () => typeof window !== "undefined";
  const totalScenes = scenes.length;
  // Initialisation des références
  useLayoutEffect(() => {
    contentRefs.current = scenes.map(() => []);
  }, []);

  // Mise à jour de l'état de chargement lorsque la scène est prête
  const handleSceneLoaded = () => {
    setTimeout(() => {
      setIsLoading(false); // Mise à jour de l'état pour indiquer que la scène est chargée
    }, 600);
  };

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
  const animateDot = useCallback((index: number) => {
    if (isClientW()) {
      const dot = document.querySelector("#dot");
      const target = document.querySelector(`#nav-item-${index}`);
      if (dot && target) {
        const targetRect = target.getBoundingClientRect();
        const dotRect = dot.getBoundingClientRect();
        const navRect = target.closest('nav')?.getBoundingClientRect();
        
        if (navRect) {
          // Calculer la position relative au nav
          const targetCenterX = targetRect.left + targetRect.width / 2 - navRect.left;
          const dotWidth = dotRect.width;
          
          // Centrer le dot par rapport au centre du bouton
          const position = { left: targetCenterX - dotWidth / 2 };

          gsap.to(dot, {
            ...position,
            duration: 0.5,
            ease: "power3.out",
          });
        }
      }
    }
  }, []);

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

    scenes[index].elements.forEach((item, idx) => {
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
    scenes[currentIndex].elements.forEach((item, idx) => {
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

  // Lancer l'animation de la première section au chargement si les références sont prêtes
  useEffect(() => {
    if (isClientW() && refsReady && !isLoading) {
      setTimeout(() => {
        requestAnimationFrame(() => animateSectionEntry(0));
      }, 500);
      animateDot(currentIndex);
      animateTitle(1);
    }
    setIsClient(true);
  }, [refsReady, isLoading]);

  // Changement d'index au scroll
  useEffect(() => {
    if (isClientW()) {
      const handleScroll = (event: WheelEvent) => {
        if (isAnimating || isLoading) {
          return;
        }

        const direction = event.deltaY > 0 ? 1 : -1;
        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < totalScenes) {
          setIsAnimating(true);
          animateSectionChange(newIndex, direction);
        }
      };
      window.addEventListener("wheel", handleScroll);
      return () => window.removeEventListener("wheel", handleScroll);
    }
    setIsClient(true);
  }, [currentIndex, isAnimating, isLoading]);

  // Changement d'index au click dans la nav
  const handleNavClick = (index: number) => {
    if (isAnimating || isLoading || index === currentIndex) return;
    const direction = index > currentIndex ? 1 : -1;
    setIsAnimating(true);
    animateSectionChange(index, direction);
  };

  // Changement d'index au swipe sur mobile, tablette...
  useEffect(() => {
    if (isClientW()) {
      const handleTouchStart = (event: TouchEvent) => {
        if (isAnimating || isLoading) {
          return;
        }
        setTouchStart(event.touches[0].clientY);
      };

      const handleTouchEnd = (event: TouchEvent) => {
        if (isAnimating || isLoading) {
          return;
        }
        setTouchEnd(event.changedTouches[0].clientY);
      };

      const handleSwipe = () => {
        if (touchStart !== null && touchEnd !== null && isLoading !== true) {
          const direction = touchEnd < touchStart ? 1 : -1;
          const newIndex = currentIndex + direction;

          if (newIndex >= 0 && newIndex < totalScenes) {
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
    setIsClient(true);
  }, [touchStart, touchEnd, currentIndex, isAnimating, isLoading]);


  // Monter la scène 3D légèrement après le premier rendu pour accélérer le paint initial
  useEffect(() => {
    if (isClientW()) {
      const timer = setTimeout(() => {
        setIsSceneMounted(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Animation de chargement */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-primaryDark">
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg font-semibold text-light">Loading...</p>
            <div className="arcade-progress-bar">
              {Array.from({ length: 16 }).map((_, index) => (
                <div
                  key={index}
                  className="arcade-progress-block"
                  style={{
                    animationDelay: `${index * 0.125}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <Navigation
        currentIndex={currentIndex}
        onNavClick={handleNavClick}
        isLoading={isLoading}
        animateDot={animateDot}
      />
      <main className="z-10 h-screen text-light max-w-main bg-primaryDark">
        <div className="w-full h-full">
          <Suspense fallback={null}>

            {/* Ma scène */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              {isClient && isSceneMounted && (
                <SplineScene
                  currentIndex={currentIndex}
                  splineConfig={scenes[currentIndex].spline}
                  onLoad={handleSceneLoaded}
                />
              )}
            </div>
          </Suspense>
          <div className="relative z-10 flex flex-col items-start justify-between h-full md:flex-row md:justify-start xl:px-8">
            <div className="flex flex-col items-start justify-between pt-8 md:justify-start md:pt-16">
              <div className="relative flex items-center justify-between py-1 px-4 mb-6 overflow-hidden font-bold transition-all duration-500 ease-in-out md:rounded-r-md rounded-r-md w-fit md:px-8 text-xl font-head bg-secondary text-primary before:absolute before:content-* before:-left-0 before:top-0 before:w-2 md:before:w-4 before:h-full before:bg-primary  md:text-xxl">
                <h2 ref={titleRef} className="font-bold">
                  {scenes[currentIndex].title}
                </h2>
              </div>
              <div className="max-w-md px-4 xl:p-x-0 text-light">
                {scenes[currentIndex].elements.map((item, index) => (
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

            <ProjectPreviews currentIndex={currentIndex} />
          </div>
        </div>
      </main>
    </>
  );
}
