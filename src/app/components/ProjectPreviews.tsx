"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { projects } from "@/app/components/data/projects";

type ProjectPreviewsProps = {
  currentIndex: number;
};

const ProjectPreviews: React.FC<ProjectPreviewsProps> = ({ currentIndex }) => {
  const cardRefs = useRef<HTMLAnchorElement[]>([]);
  const scrollRefs = useRef<HTMLDivElement[]>([]);

  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);

  // Détection simple du breakpoint pour ne rendre qu'une seule variante (desktop ou mobile)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || null;

  useEffect(() => {
    const timelines: gsap.core.Timeline[] = [];

    if (currentIndex === 1) {
      // Entrée des cartes (sans scroll auto en preview)
      projects.forEach((project, index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const entranceTl = gsap.fromTo(
          card,
          { y: "50%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            delay: 0.3 + index * 0.15,
            duration: 0.7,
            ease: "power3.out",
          }
        );

        const combined = gsap.timeline();
        combined.add(entranceTl, 0);

        timelines.push(combined);
      });
    } else {
      // Sortie quand on quitte l'index 1
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.to(card, {
          y: "50%",
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
        });
      });
    }

    return () => {
      timelines.forEach((tl) => tl.kill());
    };
  }, [currentIndex]);

  // Animation d'ouverture de la modale (slide depuis le haut)
  useEffect(() => {
    if (!selectedProjectId || !modalRef.current) return;

    gsap.fromTo(
      modalRef.current,
      { y: "-100%" },
      { y: "0%", duration: 0.6, ease: "power3.out" }
    );
  }, [selectedProjectId]);

  // Animation de scroll de l'image dans la modale uniquement
  useEffect(() => {
    if (!selectedProjectId || !modalScrollRef.current) return;

    const scroller = modalScrollRef.current;
    const maxScroll = scroller.scrollHeight - scroller.clientHeight;
    const midScroll = maxScroll * 0.5;

    const tl = gsap
      .timeline({ repeat: -1, repeatDelay: 0 })
      // Haut -> milieu
      .to(scroller, {
        scrollTop: midScroll,
        duration: 2.1,
        delay: 1,
        ease: "none",
      })
      // Pause milieu
      .to(scroller, {
        scrollTop: midScroll,
        duration: 1,
        ease: "none",
      })
      // Milieu -> bas
      .to(scroller, {
        scrollTop: maxScroll,
        duration: 2.1,
        ease: "none",
      })
      // Pause bas
      .to(scroller, {
        scrollTop: maxScroll,
        duration: 1,
        ease: "none",
      })
      // Bas -> haut
      .to(scroller, {
        scrollTop: 0,
        duration: 2.1,
        ease: "none",
      })
      // Pause haut
      .to(scroller, {
        scrollTop: 0,
        duration: 1,
        ease: "none",
      });

    return () => {
      tl.kill();
    };
  }, [selectedProjectId]);

  const handleCloseModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        y: "-100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setSelectedProjectId(null),
      });
    } else {
      setSelectedProjectId(null);
    }
  };

  // Layout commun : liste horizontale centrée en bas (desktop et mobile)
  const containerClass =
    "pointer-events-auto fixed bottom-24 left-1/2 z-20 flex w-[90vw] -translate-x-1/2 gap-4 overflow-x-auto px-2 justify-center hide-scrollbar";

  const cardClassDesktop =
    "group relative flex-shrink-0 overflow-hidden rounded-md border border-secondary/60 bg-primary/5 shadow-lg w-[220px] h-[140px]";
  const cardClassMobile =
    "group relative flex-shrink-0 overflow-hidden rounded-md border border-secondary/60 bg-primary/5 shadow-lg w-[180px] h-[120px]";

  return (
    <>
      <div className={containerClass}>
        {projects.map((project, index) => (
          <a
            key={project.id}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            href={project.url}
            onClick={(e) => {
              e.preventDefault();
              setSelectedProjectId(project.id);
            }}
            className={isDesktop ? cardClassDesktop : cardClassMobile}
          >
            <div
              ref={(el) => {
                if (el) scrollRefs.current[index] = el;
              }}
              className="relative h-full w-full overflow-hidden"
            >
              <Image
                src={project.imageSrc}
                alt={project.name}
                className="block w-full"
                width={project.imageWidth}
                height={project.imageHeight}
              />

              {/* Overlay de hover avec nom du projet */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="px-3 py-1 text-md font-semibold text-light">
                  {project.name}
                </span>
              </div>
            </div>
            <span className="sr-only">{`Ouvrir le projet ${project.name}`}</span>
          </a>
        ))}
      </div>

      {/* Carte détaillée légèrement plus haute que le centre */}
      {selectedProject && (
        <div className="pointer-events-none fixed inset-0 z-30 flex items-start justify-center pt-12 md:pt-10">
          {/* Overlay */}
          <div
            className="pointer-events-auto absolute inset-0 bg-black/40"
            onClick={handleCloseModal}
          />

          {/* Carte */}
          <div
            ref={modalRef}
            className="pointer-events-auto relative z-10 w-[100vw] max-w-xl py-10 overflow-hidden bg-primaryDark rounded-sm shadow-2xl -translate-y-full"
          >
            {/* Image au-dessus avec scroll animé */}
            <div
              ref={modalScrollRef}
              className="relative h-64 w-full overflow-hidden"
            >
              <Image
                src={selectedProject.imageSrc}
                alt={selectedProject.name}
                className="block w-full"
                width={selectedProject.imageWidth}
                height={selectedProject.imageHeight}
              />
            </div>

            {/* Contenu texte */}
            <div className="space-y-3 p-4 text-light">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedProject.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wide opacity-70">
                    {selectedProject.cadre}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-xs uppercase tracking-wide opacity-70 hover:opacity-100"
                >
                  Fermer
                </button>
              </div>

              <p className="text-sm">{selectedProject.description}</p>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-70">
                  Stack utilisée
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-secondary/10 px-2 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-secondary/30 bg-secondary/20 backdrop-blur-md px-4 py-2 text-xs font-semibold uppercase tracking-wide text-light shadow hover:bg-secondary/30 transition-colors"
                >
                  Voir le site
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectPreviews;

