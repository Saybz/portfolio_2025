import { FileUser } from "lucide-react";
import Button from "@/app/components/Button";

export type SceneId = "intro" | "projects";

type AnimationState = {
  [key: string]: unknown;
};

type SceneElement = {
  content: JSX.Element;
  animation: {
    hidden: AnimationState;
    visible: AnimationState;
    delay: number;
  };
};

export type SplineAnimationConfig = {
  objects: string[];
  event: string;
};

export type SceneConfig = {
  id: SceneId;
  title: string;
  elements: SceneElement[];
  spline: SplineAnimationConfig;
};

export const scenes: SceneConfig[] = [
  {
    id: "intro",
    title: "Hey",
    spline: {
      objects: ["Cameramain", "Saymoji", "desk-relation", "Plant", "Lamp"],
      event: "mouseUp",
    },
    elements: [
      {
        content: <div className="font-light text-xxl ">My name is</div>,
        animation: {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
          delay: 0,
        },
      },
      {
        content: <div className="text-3xl font-bold ">Shailash Bhati</div>,
        animation: {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
          delay: 0.1,
        },
      },
      {
        content: (
          <p>I’m a 27-year-old French web developer based at Bordeaux.</p>
        ),
        animation: {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
          delay: 0.1,
        },
      },
    ],
  },
  {
    id: "projects",
    title: "Skills",
    spline: {
      objects: [
        "Saymoji",
        "Cameramain",
        "Computer",
        "Skills",
        "Tamplate",
        "Database",
        // "project-pdr",
      ],
      event: "mouseDown",
    },
    elements: [
      {
        content: (
          <p className="mb-6 text-gray-300">
            Passionate <span className="font-bold text-light">front-end developer</span> with a strong focus on <span className="font-bold text-light">user experience</span>. I enjoy understanding and contributing to every stage of a project in order to create <span className="font-bold text-light">coherent, useful, and efficient interfaces</span>.
          </p>
        ),
        animation: {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
          delay: 0,
        },
      },
      {
        content: (
          <Button
            variant="pushable"
            href="./img/CV_Shailash_Bhati.pdf"
            external
            icon={FileUser}
            iconPosition="right"
          >
            Check my Resume
          </Button>
        ),
        animation: {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
          delay: 0.1,
        },
      },

    ],
  },
];

