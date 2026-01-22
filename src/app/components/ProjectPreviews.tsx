"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ArrowRight, MoveRight, X } from "lucide-react";
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
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const modalImageRef = useRef<HTMLDivElement | null>(null);
  const previousProjectIdRef = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
    if (!selectedProjectId) return;

    const isFirstOpen = previousProjectIdRef.current === null;
    const isProjectChange = previousProjectIdRef.current !== null && previousProjectIdRef.current !== selectedProjectId;

    // Animation de l'overlay uniquement à l'ouverture initiale
    if (isFirstOpen && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }

    // Animation de la modale uniquement à l'ouverture initiale
    if (isFirstOpen && modalRef.current) {
      if (isDesktop) {
        // Desktop : animation depuis la droite (à côté de la liste)
        gsap.fromTo(
          modalRef.current,
          { x: "50px", opacity: 0 },
          { x: "0", opacity: 1, duration: 0.6, ease: "expo" }
        );
      } else {
        // Mobile : animation depuis le bas
        gsap.fromTo(
          modalRef.current,
          { y: "-20%" },
          { y: "5%", opacity: 1, duration: 0.6, ease: "expo" }
        );
      }
    }

    // Animation de transition du contenu lors du changement de projet
    if (isProjectChange) {
      if (modalImageRef.current) {
        gsap.fromTo(
          modalImageRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
      if (modalContentRef.current) {
        gsap.fromTo(
          modalContentRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
      // Réinitialiser le scroll de l'image
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTop = 0;
      }
    }

    previousProjectIdRef.current = selectedProjectId;
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
    // Animation de sortie de l'overlay
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    // Animation de sortie de la modale
    if (modalRef.current) {
      if (isDesktop) {
        // Desktop : sortie vers la droite
        gsap.to(modalRef.current, {
          x: "50px",
          opacity: 0,
          duration: 0.3,
          ease: "expo",
          onComplete: () => {
            setSelectedProjectId(null);
            previousProjectIdRef.current = null;
          },
        });
      } else {
        // Mobile : sortie vers le haut
        gsap.to(modalRef.current, {
          y: "-20%",
          opacity: 0,
          duration: 0.3,
          ease: "expo",
          onComplete: () => {
            setSelectedProjectId(null);
            previousProjectIdRef.current = null;
          },
        });
      }
    } else {
      setSelectedProjectId(null);
      previousProjectIdRef.current = null;
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

  // Layout : desktop (colonne à droite) et mobile (horizontal en bas)
  const containerClass = `fixed z-40 flex gap-4 ${
    isDesktop
      ? `flex-col xl:right-8 right-4 top-1/2 -translate-y-1/2 py-2`
      : `flex-col bottom-28 left-1/2 -translate-x-1/2 w-full max-w-main xl:px-8`
  } ${
    currentIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
  }`;
  
  const cardsContainerClass = `flex gap-4 ${
    isDesktop
      ? `flex-col overflow-y-auto p-2 hide-scrollbar max-h-[60vh]`
      : `flex-row overflow-x-auto hide-scrollbar p-4`
  } ${
    currentIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
  }`;
  
  // S'assurer que les cartes sont au-dessus de l'overlay et peuvent être cliquées
  const cardClickHandler = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setSelectedProjectId(projectId);
  };

  const getCardClass = (projectId: string, isDesktop: boolean) => {
    const baseClass = isDesktop
      ? "group relative overflow-hidden rounded-md w-[240px] h-[135px]"
      : "group relative overflow-hidden rounded-md w-[150px] h-[80px]";
    
    return baseClass;
  };

  return (
    <>
      <div 
        ref={containerRef}
        className={`relative z-40 w-full max-w-main mx-auto mb-24 md:mb-0 md:h-screen ${
          currentIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={(e) => {
          // Fermer la modale si on clique en dehors de la liste de cartes et de la modale
          if (selectedProjectId && containerRef.current) {
            const target = e.target as HTMLElement;
            const isClickOnCards = containerRef.current.querySelector('.cards-container')?.contains(target);
            const isClickOnModal = modalRef.current?.contains(target);
            
            if (!isClickOnCards && !isClickOnModal) {
              handleCloseModal();
            }
          }
        }}
      >
        <div className="flex justify-center w-full h-full px-4 md:items-center md:justify-end">
          <div 
            className={`relative flex w-max ${
              isDesktop ? 'flex-col py-2' : 'flex-col'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <p ref={titleRef} className="pl-4 text-sm opacity-0 text-light/70">
              Some projects :
            </p>
            <div className={`${cardsContainerClass} cards-container`}>
          {projects.map((project, index) => {
            return (
              <a
                key={project.id}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                onClick={(e) => {
                  e.preventDefault();
                  cardClickHandler(e, project.id);
                }}
                className="flex-shrink-0 pushable-card pushable-card-secondary"
              >
                <div className={`front ${getCardClass(project.id, isDesktop)}`}>
                  <div
                    ref={(el) => {
                      if (el) scrollRefs.current[index] = el;
                    }}
                    className="relative w-full h-full overflow-hidden rounded-md"
                  >
                    <Image
                      src={project.imageSrc}
                      alt={`Capture d'écran du projet ${project.name}`}
                      className="block w-full"
                      width={project.imageWidth}
                      height={project.imageHeight}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />

                    {/* Overlay de hover avec nom du projet */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none bg-black/50 group-hover:opacity-100">
                      <span className="px-3 py-1 font-semibold text-md text-light">
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

          {/* Carte détaillée légèrement plus haute que le centre - Desktop */}
          {selectedProject && isDesktop && (
            <div 
              ref={modalRef}
              className="pointer-events-auto absolute z-50 right-full mr-8 top-1/2 -translate-y-1/2 w-[90vw] max-w-sm max-h-[70vh] flex flex-col overflow-hidden bg-primaryDark rounded-md shadow-2xl border border-secondary/10 opacity-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image au-dessus avec scroll animé */}
              <div
                ref={modalScrollRef}
                className="relative flex-shrink-0 w-full h-48 overflow-hidden"
              >
                <div ref={modalImageRef}>
                  <Image
                    src={selectedProject.imageSrc}
                    alt={selectedProject.name}
                    className="block w-full"
                    width={selectedProject.imageWidth}
                    height={selectedProject.imageHeight}
                  />
                </div>
              </div>

              {/* Contenu texte scrollable */}
              <div
                ref={modalContentRef}
                className="flex-1 p-4 py-8 space-y-3 overflow-y-auto custom-scrollbar text-light"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mb-2 text-gray-400">
                     Client : <span className="text-lg font-semibold text-secondary">{selectedProject.name}</span>
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
                  <p className="text-xs opacity-60">
                    Stack used :
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-sm text-gray-300 border rounded-md border-secondary/10 bg-primary/80"
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
                    icon={MoveRight}
                    iconPosition="right"
                  >
                    Go to project
                  </Button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Overlay assombri */}
      {selectedProject && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-30 pointer-events-auto bg-black/60 backdrop-blur-sm md:backdrop-blur-none"
          onClick={handleCloseModal}
        />
      )}

      {/* Carte détaillée - Mobile */}
      {selectedProject && !isDesktop && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none md:justify-end md:pr-4">
              <div
                ref={modalRef}
                className="pointer-events-auto relative z-10 w-[90vw] max-w-md max-h-[60vh] h-fit flex flex-col overflow-hidden bg-primaryDark rounded-md shadow-2xl border border-secondary/10 opacity-0 md:max-w-sm md:translate-y-[10%] md:translate-x-[30%]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image au-dessus avec scroll animé */}
                <div
                  ref={modalScrollRef}
                  className="relative flex-shrink-0 w-full h-48 overflow-hidden"
                >
                  <div ref={modalImageRef}>
                    <Image
                      src={selectedProject.imageSrc}
                      alt={selectedProject.name}
                      className="block w-full"
                      width={selectedProject.imageWidth}
                      height={selectedProject.imageHeight}
                    />
                  </div>
                </div>

                {/* Contenu texte scrollable */}
                <div
                  ref={modalContentRef}
                  className="flex-1 p-4 py-8 space-y-3 overflow-y-auto custom-scrollbar text-light"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="mb-2 text-gray-400">
                       Client : <span className="text-lg font-semibold text-secondary">{selectedProject.name}</span>
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
                          className="px-2 py-1 text-sm text-gray-300 border rounded-md border-secondary/10 bg-primary/80"
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
                      icon={MoveRight}
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

