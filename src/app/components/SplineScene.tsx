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

  const objectsRef = useRef<{ [key: string]: any }>({});

  // Stocker les objets activés à l'index précédent
  const previousActiveObjects = useRef<string[]>([]);

  // Map des animations par index
  const animationMap = [
    { objects: ["Plant", "Lamp"], event: "mouseUp" },
    { objects: ["Computer"], event: "mouseUp" },
    { objects: ["Lamp"], event: "mouseUp" },
  ];

  // Fonction pour activer/désactiver les animations
  const updateAnimations = (index: number) => {
    const currentAnimation = animationMap[index] || { objects: [], event: "" };
    const currentObjects = currentAnimation.objects;

    // Émettre un `emitEventReverse` pour les objets qui étaient actifs mais ne le sont plus
    previousActiveObjects.current.forEach((name) => {
      if (!currentObjects.includes(name) && objectsRef.current[name]) {
        objectsRef.current[name].emitEventReverse(animationMap[index]?.event);
      }
    });

    // Émettre un `emitEvent` pour les objets de l'index courant
    currentObjects.forEach((name) => {
      if (objectsRef.current[name]) {
        objectsRef.current[name].emitEvent(currentAnimation.event);
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
        objectsRef.current["Lamp"] = splineRef.current.findObjectByName("Lamp");
        objectsRef.current["Computer"] =
          splineRef.current.findObjectByName("Computer");
      }

      // Mettre à jour les animations en fonction de l'index courant
      updateAnimations(currentIndex);
    }
  }, [currentIndex]);

  return (
    <Spline
      scene={splineUrl}
      onLoad={(spline) => {
        splineRef.current = spline;
        // Émettre l'état initial
        updateAnimations(currentIndex);
      }}
    />
  );
};

export default SplineScene;
