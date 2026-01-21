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
    description: "Indian restaurant in Tours, France",
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Prisma", "Cloudinary"],
    cadre: "Freelance",
    url: "https://palaisduraja.fr",
    imageSrc: "/img/projects/palais-du-raja.png",
    imageWidth: 600,
    imageHeight: 1700,
  },
  {
    id: "cogevie",
    name: "Cogévie",
    description: "Website for a mutal ",
    stack: ["Wordpress", "Scss", "Php", "MySQL"],
    cadre: "Agence Vupar",
    url: "https://cogevie.fr/",
    imageSrc: "/img/projects/cogevie.png",
    imageWidth: 600,
    imageHeight: 2000,
  },
  // Tu pourras ajouter facilement d'autres projets ici
];

