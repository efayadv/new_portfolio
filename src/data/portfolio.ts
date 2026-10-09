export type Section = "resume" | "experience" | "projects" | "contact";

export type PortfolioItem = {
  id: string;
  rank: string;
  suit: "♠" | "♥" | "♣" | "♦";
  title: string;
  subtitle: string;
  description: string;
  highlights?: string[];
  links?: {
    label: string;
    href: string;
  }[];
};

export const portfolio: Record<Section, PortfolioItem[]> = {
  projects: [
    {
      id: "villart",
      rank: "A",
      suit: "♠",
      title: "Villart",
      subtitle: "Art studio booking platform",
      description:
        "A website for discovering art classes and reserving places.",
      highlights: [
        "React frontend with an Express API.",
        "PostgreSQL stores class sessions and registrations.",
        "Reservation workflow supports bank-transfer payments.",
      ],
    },
    {
      id: "glance",
      rank: "K",
      suit: "♥",
      title: "Glance",
      subtitle: "Discover local nightlife",
      description:
        "A mobile app combining venue discovery, reels, and conversations.",
      highlights: [
        "Built with React Native and Expo.",
        "Supabase and PostgreSQL provide the backend.",
      ],
    },
    {
      id: "message-broker",
      rank: "J",
      suit: "♣",
      title: "Message Broker",
      subtitle: "Distributed systems · Java",
      description:
        "A Kafka-inspired distributed message broker built with Java and ZooKeeper.",
      highlights: [
        "Topic partitions and persistent message storage.",
        "Leader coordination and replication.",
      ],
    },
  ],

  experience: [
    {
      id: "eciton",
      rank: "A",
      suit: "♦",
      title: "Eciton",
      subtitle: "AI Software Engineer Intern",
      description:
        "Built a pipeline that converts retail shelf images into structured data.",
      highlights: [
        "Combined object detection, OCR, and data validation.",
        "Integrated structured outputs with PostgreSQL.",
      ],
    },
    {
      id: "research",
      rank: "K",
      suit: "♠",
      title: "Research",
      subtitle: "Speech recognition and translation",
      description:
        "Worked on multilingual speech-to-text and translation tools for classrooms.",
    },
    {
      id: "fair-play",
      rank: "Q",
      suit: "♥",
      title: "Fair Play",
      subtitle: "Data & Logistics Intern",
      description:
        "Analyzed sales and profitability data to support purchasing and supplier negotiations.",
    },
  ],

  resume: [
    {
      id: "resume",
      rank: "A",
      suit: "♠",
      title: "Résumé",
      subtitle: "Education, experience, and skills",
      description:
        "View my résumé for a complete overview of my background.",
      // Put your PDF at public/resume.pdf, then uncomment:
      // links: [{ label: "Open résumé", href: "/resume.pdf" }],
    },
  ],

  contact: [
    {
      id: "contact",
      rank: "A",
      suit: "♥",
      title: "Contact",
      subtitle: "Let’s connect",
      description:
        "Interested in working together? Get in touch.",
      // Add your actual links:
      // links: [
      //   { label: "Email me", href: "mailto:you@example.com" },
      //   { label: "GitHub", href: "https://github.com/your-username" },
      // ],
    },
  ],
};