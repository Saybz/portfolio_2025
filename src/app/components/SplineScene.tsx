// components/SplineScene.tsx
import { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import debounce from "lodash/debounce";
type SplineSceneProps = {
  currentIndex: number;
  onLoad: () => void;
};

type Animation = {
  objects: string[];
  event: string;
};

const SplineScene: React.FC<SplineSceneProps> = ({ currentIndex, onLoad }) => {
  const splineRef = useRef<any>(null);
  const splineUrl =
    "https://prod.spline.design/9nocutKv2UXEtYh3/scene.splinecode";
  const objectsRef = useRef<{ [key: string]: any }>({});
  const previousActiveObjects = useRef<Set<string>>(new Set());
  // État pour gérer les erreurs
  const [error, setError] = useState<string | null>(null);

  const animationMap: Animation[] = [
    {
      objects: ["Cameramain", "Saymoji", "desk-relation", "Plant", "Lamp"],
      event: "mouseUp",
    },
    {
      objects: [
        "Saymoji",
        "Cameramain",
        "Computer",
        "Skills",
        "Tamplate",
        "Database",
      ],
      event: "mouseDown",
    },
    // { objects: [], event: "mousePress" },
  ];

  // Fonction pour activer/désactiver les ombres d'un objet
  const toggleShadows = (object: any, enable: boolean) => {
    if (object) {
      object.castShadow = enable;
      object.receiveShadow = enable;
    }
  };

  // Fonction pour charger les objets dans la scène
  const loadObjects = (spline: any) => {
    const objectNames = [
      "Cameramain",
      "Saymoji",
      "desk-relation",
      "Plant",
      "Lamp",
      "Computer",
      "Skills",
      "Tamplate",
      "Database",
    ];
    objectNames.forEach((name) => {
      try {
        const object: any = spline.findObjectByName(name);
        if (object) {
          objectsRef.current[name] = object;
          toggleShadows(object, false); // Désactiver les ombres par défaut
        } else {
          // console.warn(`Objet ${name} non trouvé`);
        }
      } catch (err) {
        setError(`Erreur lors du chargement de l'objet ${name}: ${err}`);
      }
    });
  };

  // Fonction pour activer les objets pour une animation donnée
  const activateObjectsForAnimation = (objects: string[], event: string) => {
    objects.forEach((name) => {
      const object = objectsRef.current[name];
      if (object) {
        object.emitEvent(event);
        toggleShadows(object, true); // Activer les ombres pour les objets actifs
      }
    });
  };

  // Fonction pour désactiver les objets non actifs
  const deactivateObjectsForAnimation = (objects: string[]) => {
    Object.keys(objectsRef.current).forEach((name) => {
      if (!objects.includes(name)) {
        const object = objectsRef.current[name];
        object?.emitEvent("mouseHover"); // Animation par défaut
        toggleShadows(object, false); // Désactiver les ombres pour les objets non actifs
      }
    });
  };

  // Mettre à jour les animations en fonction de l'index courant
  const updateAnimations = (index: number) => {
    const { objects, event } = animationMap[index] || {
      objects: [],
      event: "",
    };

    // Activer ou réactiver les objets pour l'animation actuelle
    activateObjectsForAnimation(objects, event);

    // Désactiver les objets qui ne sont pas présents dans cette animation
    deactivateObjectsForAnimation(objects);

    // Mettre à jour les objets actifs dans le précédent actif
    previousActiveObjects.current = new Set(objects);
  };

  useEffect(() => {
    if (splineRef.current) {
      // Mettre à jour les animations à chaque changement d'index
      updateAnimations(currentIndex);
    }
  }, [currentIndex]);

  return (
    <div className="inset-0">
      {/* Afficher un message d'erreur si une erreur survient */}
      {error && <div className="error-message">{error}</div>}

      <Spline
        scene={splineUrl}
        onLoad={(spline) => {
          try {
            splineRef.current = spline;
            loadObjects(spline);

            // Initialiser l'animation pour le premier index
            updateAnimations(0);
            onLoad();
          } catch (err) {
            setError(`Erreur lors du chargement de la scène: ${err}`);
          }
        }}
        onError={(err) => {
          setError(`Erreur lors du chargement de la scène: ${err}`);
        }}
      />
    </div>
  );
};

export default SplineScene;
