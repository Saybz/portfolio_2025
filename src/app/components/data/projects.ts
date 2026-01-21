export type ProjectPreview = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  cadre: string;
  url: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
};

export const projects: ProjectPreview[] = [
  {
    id: "palais-du-raja",
    name: "Palais du Raja",
    description: "Design and development of a simple one-page landing website for an Indian restaurant.",
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Prisma", "Cloudinary"],
    cadre: "Freelance",
    url: "https://palaisduraja.fr",
    imageSrc: "/img/projects/palais-du-raja.png",
    imageWidth: 600,
    imageHeight: 1600,
  },
  {
    id: "cogevie",
    name: "Cogévie",
    description: "Custom WordPress theme design and development (front-end and back-end) for Cogévie, a professional website presenting health and insurance contract management services.",
    stack: ["Wordpress", "Scss", "Php", "MySQL"],
    cadre: "Vupar Agency",
    url: "https://cogevie.fr/",
    imageSrc: "/img/projects/cogevie.png",
    imageWidth: 600,
    imageHeight: 1600,
  },
];

