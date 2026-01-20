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
    title: "Projects",
    spline: {
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
    elements: [
      {
        content: (
          <p className="mb-2">
            I started my career as a front-end developer, building intuitive
            user interfaces.
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
          <p className="mb-2">Now, I’m eager to grow into a full-stack role,</p>
        ),
        animation: {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
          delay: 0.1,
        },
      },
      {
        content: (
          <p>
            Expanding my skills to contribute across the entire development
            process with ambition and drive. <br />
            <a
              className="underline underline-offset-2"
              href="./img/CV_Shailash_Bhati.pdf"
              target="_blank"
            >
              Check my CV
            </a>
          </p>
        ),
        animation: {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
          delay: 0.2,
        },
      },
    ],
  },
];

