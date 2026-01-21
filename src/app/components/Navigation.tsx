"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { scenes } from "@/app/components/data/sceneConfig";

const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
    <path d="M4 20a8 8 0 0 1 16 0" />
  </svg>
);

const ProjectsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="7" height="7" rx="1.5" />
    <rect x="14" y="4" width="7" height="7" rx="1.5" />
    <rect x="3" y="13" width="7" height="7" rx="1.5" />
    <rect x="14" y="13" width="7" height="7" rx="1.5" />
  </svg>
);

type NavigationProps = {
  currentIndex: number;
  onNavClick: (index: number) => void;
  isLoading: boolean;
  animateDot: (index: number) => void;
};

const Navigation: React.FC<NavigationProps> = ({
  currentIndex,
  onNavClick,
  isLoading,
  animateDot,
}) => {
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const isClientW = () => typeof window !== "undefined";
  const isMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 768;

  // Repositionnement du dot du menu en fonction du device (mobile, desktop, etc)
  useEffect(() => {
    if (isClientW()) {
      const handleResize = () => {
        animateDot(currentIndex);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [animateDot, currentIndex]);

  return (
    <header
      className={`fixed z-50 transform -translate-x-1/2 ${
        isLoading ? "opacity-0 md:-right-12" : "opacity-1 md:right-0"
      } ransition-all duration-500 bottom-4 delay-1000 left-1/2 md:bottom-auto md-translate-x-0 md:-translate-y-1/2 md:left-auto md:top-1/2`}
    >
      <span
        ref={dotRef}
        id="dot"
        className="absolute left-0 w-3 h-3 transition-transform duration-500 ease-in rounded-full md:left-auto -bottom-2 md:bottom-auto md:top-0 md:-right-4 bg-secondary"
      ></span>
      <nav>
        <ul className="relative flex items-center md:flex-col">
          {scenes.map((scene, index) => (
            <li
              key={index}
              id={`nav-item-${index}`}
              onClick={() => onNavClick(index)}
              className={`flex items-center justify-center m-2 w-14 h-14 rounded-xl border transition-all duration-500 cursor-pointer ${
                currentIndex === index
                  ? "bg-secondary border-secondary text-primaryDark shadow-xl"
                  : "border-[1px] border-secondary/30 bg-secondary/20 backdrop-blur-md text-secondary shadow-md hover:bg-secondary/30"
              }`}
            >
              {index === 0 ? <ProfileIcon /> : <ProjectsIcon />}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
