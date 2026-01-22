"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { projects } from "@/app/components/data/projects";
import Button from "@/app/components/Button";

type ProjectPreviewsProps = {
  currentIndex: number;
};

const ProjectPreviews: React.FC<ProjectPreviewsProps> = ({ currentIndex }) => {
  const cardRefs = useRef<HTMLAnchorElement[]>([]);
  const scrollRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLParagraphElement | null>(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

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
      // Animation d'entrée du titre
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { x: "-30px", opacity: 0, y: "0px" },
          {
            x: "0px",
            y: "0px",
            opacity: 1,
            delay: 0.3,
            duration: 0.8,
            ease: "expo",
          }
        );
      }

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
            ease: "expo",
          }
        );

        const combined = gsap.timeline();
        combined.add(entranceTl, 0);

        timelines.push(combined);
      });
    } else {
      // Animation de sortie du titre
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: "-30px",
          opacity: 0,
          duration: 0.8,
          ease: "expo",
        });
      }

      // Sortie quand on quitte l'index 1
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.to(card, {
          y: "80%",
          opacity: 0,
          delay: 0.3 + index * -0.1,
          duration: 0.5,
          ease: "expo",
        });
      });
    }

    return () => {
      timelines.forEach((tl) => tl.kill());
    };
  }, [currentIndex]);

  // Animation d'ouverture de la modale (slide depuis le haut en mobile, depuis la droite en desktop)
  useEffect(() => {
    if (!selectedProjectId || !modalRef.current) return;

    if (isDesktop) {
      // Desktop : animation depuis la droite
      gsap.fromTo(
        modalRef.current,
        { x: "20%" },
        { x: "-30%", opacity: 1, duration: 0.6, ease: "expo" }
      );
    } else {
      // Mobile : animation depuis le bas
      gsap.fromTo(
        modalRef.current,
        { y: "-20%" },
        { y: "5%", opacity: 1, duration: 0.6, ease: "expo" }
      );
    }
  }, [selectedProjectId, isDesktop]);

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
        ease: "expo",
      })
      // Pause milieu
      .to(scroller, {
        scrollTop: midScroll,
        duration: 1,
        ease: "expo",
      })
      // Milieu -> bas
      .to(scroller, {
        scrollTop: maxScroll,
        duration: 2.1,
        ease: "expo",
      })
      // Pause bas
      .to(scroller, {
        scrollTop: maxScroll,
        duration: 1,
        ease: "expo",
      })
      // Bas -> haut
      .to(scroller, {
        scrollTop: 0,
        duration: 2.1,
        ease: "expo",
      })
      // Pause haut
      .to(scroller, {
        scrollTop: 0,
        duration: 1,
        ease: "expo",
      });

    return () => {
      tl.kill();
    };
  }, [selectedProjectId]);

  const handleCloseModal = useCallback(() => {
    if (modalRef.current) {
      if (isDesktop) {
        // Desktop : sortie vers la droite
        gsap.to(modalRef.current, {
          x: "10%",
          opacity: 0,
          duration: 0.4,
          ease: "expo3.in",
          onComplete: () => setSelectedProjectId(null),
        });
      } else {
        // Mobile : sortie vers le haut
        gsap.to(modalRef.current, {
          y: "-20%",
          opacity: 0,
          duration: 0.4,
          ease: "expo3.in",
          onComplete: () => setSelectedProjectId(null),
        });
      }
    } else {
      setSelectedProjectId(null);
    }
  }, [isDesktop]);

  // Fermer la modale si on change d'index
  useEffect(() => {
    if (selectedProjectId && currentIndex !== 1) {
      handleCloseModal();
    }
  }, [currentIndex, selectedProjectId, handleCloseModal, isDesktop]);

  // Empêcher la propagation du scroll de la modale vers la page principale
  useEffect(() => {
    const modalContent = modalContentRef.current;
    if (!modalContent || !selectedProjectId) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.stopPropagation();
    };

    modalContent.addEventListener("wheel", handleWheel, { passive: false });
    modalContent.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      modalContent.removeEventListener("wheel", handleWheel);
      modalContent.removeEventListener("touchmove", handleTouchMove);
    };
  }, [selectedProjectId]);

  // Layout commun : liste horizontale centrée en bas (desktop et mobile)
  const containerClass = `flex-col fixed  py-2 bottom-28 left-1/2 z-40 flex w-full max-w-main -translate-x-1/2 gap-4 justify-start xl:px-8 ${
    currentIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
  }`;
  
  const cardsContainerClass = `flex flex-row gap-4 overflow-x-auto hide-scrollbar px-4 ${
    currentIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
  }`;

  const getCardClass = (projectId: string, isDesktop: boolean) => {
    const baseClass = isDesktop
      ? "group relative overflow-hidden rounded-md w-[220px] h-[120px]"
      : "group relative overflow-hidden rounded-md w-[160px] h-[88px]";
    
    return baseClass;
  };

  return (
    <>
      <div className={containerClass}>
        <p ref={titleRef} className="text-md text-light/70 opacity-0 px-4">
          Some projects :
        </p>
        <div className={cardsContainerClass}>
        {projects.map((project, index) => {
          const isSelected = selectedProjectId === project.id;
          return (
            <a
              key={project.id}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              onClick={(e) => {
                e.preventDefault();
                setSelectedProjectId(project.id);
              }}
              className={`pushable-card pushable-card-secondary flex-shrink-0 ${isSelected ? 'ring-4 ring-secondary/90' : ''}`}
            >
              <div className={`front ${getCardClass(project.id, isDesktop)}`}>
                <div
                  ref={(el) => {
                    if (el) scrollRefs.current[index] = el;
                  }}
                  className="relative h-full w-full overflow-hidden rounded-md"
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
              </div>
              <span className="sr-only">{`Ouvrir le projet ${project.name}`}</span>
            </a>
          );
        })}
        </div>
      </div>


      {/* Carte détaillée légèrement plus haute que le centre */}
      {selectedProject && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center md:justify-end md:pr-4">
          {/* Carte */}
          <div
            ref={modalRef}
            className="pointer-events-auto relative z-10 w-[90vw] max-w-md h-[80vh] max-h-[580px] md:max-h-[600px] flex flex-col overflow-hidden bg-primaryDark rounded-md shadow-2xl md:max-w-sm md:translate-y-[10%] md:translate-x-[30%] border border-secondary/10 opacity-0"
          >

            {/* Image au-dessus avec scroll animé */}
            <div
              ref={modalScrollRef}
              className="relative h-48 w-full flex-shrink-0 overflow-hidden"
            >
              <Image
                src={selectedProject.imageSrc}
                alt={selectedProject.name}
                className="block w-full"
                width={selectedProject.imageWidth}
                height={selectedProject.imageHeight}
              />
            </div>

            {/* Contenu texte scrollable */}
            <div
              ref={modalContentRef}
              className="flex-1 overflow-y-auto hide-scrollbar space-y-3 p-4 py-8 text-light"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                    
                  <h3 className="mb-2 text-gray-400">
                   Client : <span className="font-semibold text-lg text-secondary">{selectedProject.name}</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Context : <span className="font-regular text-light">{selectedProject.cadre}</span>
                  </p>
                </div>
                <Button
                  variant="pushable"
                  color="red"
                  size="sm"
                  onClick={handleCloseModal}
                  iconPosition="left"
                >
                  Close
                </Button>
              </div>

              <p className="text-base text-gray-300">{selectedProject.description}</p>

              <div>
                <p className="mb-1 text-xs opacity-60">
                  Stack used :
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md text-sm border border-secondary/10 bg-primary/80 px-2 py-1 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="pushable"
                  href={selectedProject.url}
                  color="secondary"
                  external
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Go to project
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectPreviews;

