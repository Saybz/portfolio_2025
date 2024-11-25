// components/SplineScene.tsx
import { useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";

type SplineSceneProps = {
  currentIndex: number;
};

const SplineScene: React.FC<SplineSceneProps> = ({ currentIndex }) => {
  const splineRef = useRef<any>(null);
  const splineUrl: string =
    "https://prod.spline.design/9nocutKv2UXEtYh3/scene.splinecode";

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fonction pour ajuster la taille du canevas
    const adjustCanvasSize = () => {
      const container = containerRef.current;
      const canvas = container?.querySelector("canvas");

      if (container && canvas) {
        const { width, height } = container.getBoundingClientRect();
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    };

    // Ajuster la taille initiale
    adjustCanvasSize();

    // Observer les changements de taille du conteneur
    const resizeObserver = new ResizeObserver(adjustCanvasSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const objectsRef = useRef<{ [key: string]: any }>({});

  // Stocker les objets activés à l'index précédent
  const previousActiveObjects = useRef<string[]>([]);

  // Map des animations par index
  const animationMap = [
    {
      objects: ["Plant", "Plant_leafs", "Plant_pot", "Plant_dirt", "Lamp"],
      event: "mouseUp",
    },
    { objects: ["Computer"], event: "mouseUp" },
    { objects: ["Lamp"], event: "mouseUp" },
  ];

  // Fonction pour gérer les animations
  const updateAnimations = (index: number) => {
    const currentAnimation = animationMap[index] || { objects: [], event: "" };
    const currentObjects = currentAnimation.objects;
    const event = currentAnimation.event;

    // Liste des objets qui étaient actifs mais ne le sont plus
    const objectsToReverse = previousActiveObjects.current.filter(
      (name) => !currentObjects.includes(name)
    );

    // Liste des nouveaux objets qui doivent être activés
    const objectsToActivate = currentObjects.filter(
      (name) => !previousActiveObjects.current.includes(name)
    );

    // Émettre `emitEventReverse` pour les objets à désactiver
    objectsToReverse.forEach((name) => {
      if (objectsRef.current[name]) {
        objectsRef.current[name].emitEventReverse(
          animationMap[index]?.event || "start"
        );
      }
    });

    // Émettre `emitEvent` pour les nouveaux objets à activer
    objectsToActivate.forEach((name) => {
      if (objectsRef.current[name]) {
        objectsRef.current[name].emitEvent(event);
      }
    });

    // Mettre à jour les objets actifs
    previousActiveObjects.current = currentObjects;
  };

  useEffect(() => {
    if (splineRef.current) {
      // Charger les références des objets une seule fois
      if (Object.keys(objectsRef.current).length === 0) {
        objectsRef.current["Plant"] =
          splineRef.current.findObjectByName("Plant");
        objectsRef.current["Plant_leafs"] =
          splineRef.current.findObjectByName("Plant_leafs");
        objectsRef.current["Plant_pot"] =
          splineRef.current.findObjectByName("Plant_pot");
        objectsRef.current["Plant_dirt"] =
          splineRef.current.findObjectByName("Plant_dirt");
        objectsRef.current["Lamp"] = splineRef.current.findObjectByName("Lamp");
        objectsRef.current["Computer"] =
          splineRef.current.findObjectByName("Computer");
      }

      // Mettre à jour les animations en fonction de l'index courant
      updateAnimations(currentIndex);
    }
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-screen h-screen overflow-hidden"
    >
      <Spline
        scene={splineUrl}
        onLoad={(spline) => {
          splineRef.current = spline;

          // Charger les références des objets
          objectsRef.current["Plant"] =
            splineRef.current.findObjectByName("Plant");
          objectsRef.current["Plant_leafs"] =
            splineRef.current.findObjectByName("Plant_leafs");
          objectsRef.current["Plant_pot"] =
            splineRef.current.findObjectByName("Plant_pot");
          objectsRef.current["Plant_dirt"] =
            splineRef.current.findObjectByName("Plant_dirt");
          objectsRef.current["Lamp"] =
            splineRef.current.findObjectByName("Lamp");
          objectsRef.current["Computer"] =
            splineRef.current.findObjectByName("Computer");

          // Initialisation des animations pour l'index 0 (premier chargement)
          const initialAnimation = animationMap[0];
          initialAnimation.objects.forEach((name) => {
            if (objectsRef.current[name]) {
              objectsRef.current[name].emitEvent(initialAnimation.event);
            }
          });

          // Mettre à jour les objets actifs
          previousActiveObjects.current = initialAnimation.objects;
        }}
      />
    </div>
  );
};

export default SplineScene;
