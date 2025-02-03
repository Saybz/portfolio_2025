export const sections = [
  {
    title: "Hey",
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
    title: "Skills",
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
  // {
  //   title: "Game",
  //   elements: [
  //     {
  //       content: <p>Explorez le potentiel infini de la 3D.</p>,
  //       animation: {
  //         hidden: { opacity: 0, x: -100 },
  //         visible: { opacity: 1, x: 0 },
  //         delay: 0,
  //       },
  //     },
  //     {
  //       content: <p>I’m a 25-year-old French web developer based in Tours.</p>,
  //       animation: {
  //         hidden: { opacity: 0, x: -100 },
  //         visible: { opacity: 1, x: 0 },
  //         delay: 0.1,
  //       },
  //     },
  //     {
  //       content: <p>I’m a 25-year-old French web developer based in Tours.</p>,
  //       animation: {
  //         hidden: { opacity: 0, x: -100 },
  //         visible: { opacity: 1, x: 0 },
  //         delay: 0.1,
  //       },
  //     },
  //   ],
  // },
];
