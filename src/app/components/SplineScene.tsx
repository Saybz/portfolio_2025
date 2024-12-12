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

  const objectsRef = useRef<{ [key: string]: any }>({});

  // Stocker les objets activés à l'index précédent
  const previousActiveObjects = useRef<string[]>([]);

  // Map des animations par index
  const animationMap = [
    {
      objects: ["Plant", "Lamp", "Saymoji"],
      event: "mouseUp",
    },
    { objects: ["Computer", "Saymoji"], event: "mouseDown" },
    { objects: [], event: "mousePress" },
  ];

  // Fonction pour charger les références d'objets
  const loadObjects = (spline: any) => {
    const objectNames = [
      "Plant",
      "Plant_leafs",
      "Plant_pot",
      "Plant_dirt",
      "Lamp",
      "Computer",
      "Saymoji",
    ];

    objectNames.forEach((name) => {
      objectsRef.current[name] = spline.findObjectByName(name);
    });
  };

  // Gestion des animations selon l'index courant
  const updateAnimations = (index: number) => {
    const currentAnimation = animationMap[index] || { objects: [], event: "" };
    const currentObjects = currentAnimation.objects;
    const event = currentAnimation.event;

    // Map pour suivre l'index précédent des objets actifs
    const activeObjectsIndexMap: { [name: string]: number } = {};

    // Activez ou réactivez les objets du nouvel index
    currentObjects.forEach((name) => {
      if (objectsRef.current[name]) {
        if (previousActiveObjects.current.includes(name)) {
          // Réactiver avec l'animation du nouvel index
          objectsRef.current[name].emitEvent(event);
        } else {
          // Nouvel objet à activer
          objectsRef.current[name].emitEvent(event);
        }
      }

      // Enregistrez l'index actuel pour l'objet
      activeObjectsIndexMap[name] = index;
    });

    // Appliquez l'animation par défaut pour les objets absents du nouvel index
    Object.keys(objectsRef.current).forEach((name) => {
      if (!currentObjects.includes(name)) {
        // Animation par défaut
        objectsRef.current[name]?.emitEvent("mouseHover");
      }
    });

    // Mettre à jour les objets actifs
    previousActiveObjects.current = currentObjects;
  };

  useEffect(() => {
    if (splineRef.current) {
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
          loadObjects(spline);

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
