import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer ScrollTrigger dans GSAP
gsap.registerPlugin(ScrollTrigger);

export default function ScrollSections() {
  // Référence des sections
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // GSAP ScrollTrigger configuration
      gsap.to(container, {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Synchronise l'animation avec le scroll
          pin: true, // Pin le container pour éviter que d'autres contenus ne scrollent
          snap: {
            snapTo: 1 / 3, // Snap scroll à chaque section (3 sections ici)
            duration: { min: 0.2, max: 1 }, // Durée de l'animation de snap
            ease: "power1.inOut",
          },
        },
      });
    }

    return () => {
      // Nettoyer les triggers pour éviter des comportements indésirables lors du démontage
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="container flex-1 w-1/2 left">
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

      <section className="flex-col justify-center h-screen px-12 sectionflex py-vmain intro">
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
