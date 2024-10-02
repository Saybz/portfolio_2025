import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Enregistrer ScrollTrigger dans GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ScrollSections() {
  // Référence des sections

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray(".section") as HTMLElement[];

    let currentSection = 0;
    let isAnimating = false;

    // Function to handle manual scrolling
    const goToSection = (index: number) => {
      if (isAnimating || index < 0 || index >= sections.length) return;

      isAnimating = true;
      currentSection = index;

      // Smoothly scroll to the selected section
      gsap.to(container, {
        scrollTo: { y: sections[index], autoKill: false },
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimating = false; // Re-enable scrolling once animation is complete
        },
      });
    };

    const handleScroll = (event: WheelEvent) => {
      if (isAnimating) return;

      const delta = event.deltaY;

      if (delta > 0 && currentSection < sections.length - 1) {
        // Scroll down
        goToSection(currentSection + 1);
      } else if (delta < 0 && currentSection > 0) {
        // Scroll up
        goToSection(currentSection - 1);
      }
    };

    // Attacher l'événement wheel à window pour détecter le scroll depuis n'importe où
    window.addEventListener("wheel", handleScroll);

    // Nettoyage lors du démontage du composant
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 h-screen overflow-hidden snap-y snap-mandatory left"
    >
      <section className="flex flex-col justify-center h-screen px-12 section snap-start py-vmain intro">
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
      <section className="flex flex-col justify-center h-screen px-12 section snap-start py-vmain intro">
        <div className="flex items-center mb-4 font-head">
          <h2 className="relative mb-2 leading-none before:block before:absolute before:-left-12 before:top-0 before:w-2 before:h-full before:bg-primary text-big text-primary">
            Skills
          </h2>
        </div>
        <div className="max-w-md desc text-lightbody">
          Even developping web sites can process with green behaviors.
        </div>
      </section>

      <section className="flex flex-col justify-center h-screen px-12 section al snap-start sectionflex py-vmain intro">
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
  );
}
