export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shailash Bhati",
    jobTitle: "Développeur Frontend",
    description: "Développeur frontend spécialisé en React, Next.js, TypeScript et design moderne",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://shailashbhati.com",
    sameAs: [
      // Ajoutez vos liens sociaux ici
      // "https://github.com/yourusername",
      // "https://linkedin.com/in/yourusername",
      // "https://twitter.com/yourusername",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Web Development",
      "Frontend Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
