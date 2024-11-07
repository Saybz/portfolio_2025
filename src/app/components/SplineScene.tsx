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
  useEffect(() => {
    if (splineRef.current) {
      // Exemple : Changer d'état en fonction de l'index
      splineRef.current.emitEvent("stateChange", `state-${currentIndex}`);
    }
  }, [currentIndex]);

  return (
    <Spline
      scene={splineUrl}
      onLoad={(spline) => {
        splineRef.current = spline;
        // Initialiser la scène ou configurer d'autres événements ici
      }}
    />
  );
};

export default SplineScene;
