import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Enregistrer ScrollTrigger et ScrollPlugin dans GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ScrollSections() {
  // Référence des sections

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray(".section") as HTMLElement[];

    let currentSection = 0;
    let isAnimating = false;

    // Fonction pour gérer le scroll manuel
    const goToSection = (index: number) => {
      if (isAnimating || index < 0 || index >= sections.length) return;

      isAnimating = true;
      currentSection = index;

      // Smooth scroll vers la section actuelle
      gsap.to(container, {
        scrollTo: { y: sections[index], autoKill: false },
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimating = false; // Ré-activer le scroll lorque l'animation est complète
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
      className="flex-1 h-screen overflow-hidden snap-y snap-mandatory"
    >
      <section className="flex flex-col justify-start h-screen px-12 pt-60 section snap-start py-vmain intro">
        <h2 className="fixed px-8 py-8 pr-12 mb-10 font-bold leading-none rounded-r-full top-20 w-fit font-head before:block before:absolute before:-left-6 before:top-0 before:w-6 before:h-full before:bg-primary text-big text-primary bg-secondary">
          Hey
        </h2>
        <div className="max-w-md desc text-dark">
          <div className="font-light text-xxl text-primary"> My name is</div>
          <div className="text-3xl font-bold text-primary">Shailash Bhati</div>
          <p>
            I’m actually 25 years old and i’m a french web developer based at
            Tours in France.
          </p>
        </div>
      </section>
      <section className="flex flex-col justify-start h-screen px-12 section snap-start py-vmain intro">
        <h2 className="relative px-8 py-8 pr-12 mb-10 font-bold leading-none rounded-r-full w-fit font-head before:block before:absolute before:-left-6 before:top-0 before:w-6 before:h-full before:bg-primary text-big text-primary bg-secondary">
          Skills
        </h2>

        <div className="max-w-md desc text-lightbody"></div>
      </section>

      <section className="flex flex-col justify-start h-screen px-12 section al snap-start sectionflex py-vmain intro">
        <h2 className="relative px-8 py-8 pr-12 mb-10 font-bold leading-none rounded-r-full w-fit font-head before:block before:absolute before:-left-6 before:top-0 before:w-6 before:h-full before:bg-primary text-big text-primary bg-secondary">
          Game
        </h2>
        <div className="max-w-md desc text-lightbody">
          Have some fun with this little game
        </div>
      </section>
    </div>
  );
}
