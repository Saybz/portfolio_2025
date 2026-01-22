// components/SplineScene.tsx
import { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { SplineAnimationConfig } from "@/app/components/data/sceneConfig";
type SplineSceneProps = {
  currentIndex: number;
  splineConfig: SplineAnimationConfig;
  onLoad: () => void;
};

const SplineScene: React.FC<SplineSceneProps> = ({
  currentIndex,
  splineConfig,
  onLoad,
}) => {
  const splineRef = useRef<any>(null);
  const splineUrl =
    "https://prod.spline.design/9nocutKv2UXEtYh3/scene.splinecode";
  const objectsRef = useRef<{ [key: string]: any }>({});
  // État pour gérer les erreurs
  const [error, setError] = useState<string | null>(null);

  // Filtrer les erreurs CORS de Spline dans la console
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;

    // Intercepter console.error
    console.error = (...args: any[]) => {
      const errorMessage = args[0]?.toString() || "";
      // Ignorer les erreurs CORS de Spline
      if (
        errorMessage.includes("CORS") &&
        (errorMessage.includes("hooks.spline.design") ||
          errorMessage.includes("spline.design"))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    // Intercepter console.warn
    console.warn = (...args: any[]) => {
      const warnMessage = args[0]?.toString() || "";
      // Ignorer les warnings CORS de Spline
      if (
        warnMessage.includes("CORS") &&
        (warnMessage.includes("hooks.spline.design") ||
          warnMessage.includes("spline.design"))
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    // Intercepter les erreurs non gérées
    const handleError = (event: ErrorEvent) => {
      if (
        event.message?.includes("CORS") &&
        (event.message.includes("hooks.spline.design") ||
          event.message.includes("spline.design"))
      ) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener("error", handleError);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener("error", handleError);
    };
  }, []);

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
      // "project-pdr",
    ];
    objectNames.forEach((name) => {
      try {
        const object: any = spline.findObjectByName(name);
        if (object) {
          objectsRef.current[name] = object;
          toggleShadows(object, false); // Désactiver les ombres par défaut
        } else {
          // console.warn(`Spline object "${name}" not found in scene`);
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
  const updateAnimations = (config: SplineAnimationConfig) => {
    const { objects, event } = config || { objects: [], event: "" };

    activateObjectsForAnimation(objects, event);

    // Désactiver les objets qui ne sont pas présents dans cette animation
    deactivateObjectsForAnimation(objects);
  };

  useEffect(() => {
    if (splineRef.current && splineConfig) {
      // Mettre à jour les animations à chaque changement d'index
      updateAnimations(splineConfig);
    }
  }, [currentIndex, splineConfig]);

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

            // Initialiser l'animation pour la config actuelle
            updateAnimations(splineConfig);
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
