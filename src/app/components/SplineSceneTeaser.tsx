import { useEffect, useRef } from "react";

interface SplineSceneProps {
  sceneUrl: string; // L'URL de la scène exportée depuis Spline
}

const SplineSceneTeaser: React.FC<SplineSceneProps> = ({ sceneUrl }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Ajoutez des listeners pour interagir avec l'objet dans Spline si nécessaire
    const iframe = iframeRef.current;

    if (iframe) {
      // Vous pouvez ajouter de la communication via postMessage si la scène est interactive
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === "custom-event") {
          console.log(
            "Réception d’un événement personnalisé depuis Spline",
            event.data
          );
        }
      };

      window.addEventListener("message", handleMessage);

      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={sceneUrl}
      title={"teaser"}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
      }}
      allow="fullscreen"
    />
  );
};

export default SplineSceneTeaser;
