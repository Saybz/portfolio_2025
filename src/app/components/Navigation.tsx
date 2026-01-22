"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { User, LayoutGrid } from "lucide-react";
import { scenes } from "@/app/components/data/sceneConfig";
import Button from "@/app/components/Button";

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
        isLoading ? "opacity-0" : "opacity-1"
      } transition-all duration-500 bottom-2 md:bottom-[5%] delay-1000 left-1/2`}
    >
      <span
        ref={dotRef}
        id="dot"
        className="absolute left-0 w-2 h-2 transition-transform duration-500 ease-in rounded-full -bottom-2 bg-secondary"
      ></span>
      <nav>
        <ul className="relative flex items-center">
          {scenes.map((scene, index) => (
            <li
              key={index}
              id={`nav-item-${index}`}
              className="m-2"
            >
              <Button
                variant={currentIndex === index ? "pushable" : "pushable-inactive"}
                icon={index === 0 ? User : LayoutGrid}
                onClick={() => onNavClick(index)}
              >
                <span className="sr-only">
                  {index === 0 ? "Profil" : "Projets"}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
