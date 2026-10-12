export type Section = "about" | "resume" | "experience" | "projects" | "contact";

export type PortfolioItem = {
  id: string;
  rank: string;
  suit: "♠" | "♥" | "♣" | "♦";
  title: string;
  subtitle: string;
  description: string;
  pdf?: { url: string; downloadName: string };
  highlights?: string[];
  links?: {
    label: string;
    href: string;
  }[];
};

export const portfolio: Record<Section, PortfolioItem[]> = {
  about: [
    {
      id: "about-me",
      rank: "K",
      suit: "♠",
      title: "About Me",
      subtitle: "Meet Emilio",
      description:
        "Hello! I am Emilio! - Computer Science Grad from the University of Wisconsin - Madison with a passion for Software Development.\nI love solving ambiguous problems and coming up with a software solution.\nIf I am not coding, I am playing the drums, listening to music, or playing blackjack!\n\nCurrently looking for full-time roles as a Software Engineer, Full-Stack Developer, or Applied AI Engineer"
    },
  ],
  projects: [
    {
      id: "villart",
      rank: "A",
      suit: "♠",
      title: "Villart",
      subtitle: "React, JavaScript, Node.js, PostgreSQL",
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
    {
      id: "eciton",
      rank: "K",
      suit: "♥",
      title: "ETL pipeline",
      subtitle: "Distributed systems · Java",
      description:
        "A Kafka-inspired distributed message broker built with Java and ZooKeeper.",
      highlights: [
        "Topic partitions and persistent message storage.",
        "Leader coordination and replication.",
      ],
    },
    {
      id: "compiler",
      rank: "J",
      suit: "♠",
      title: "Language Compiler",
      subtitle: "Distributed systems · Java",
      description:
        "A Kafka-inspired distributed message broker built with Java and ZooKeeper.",
      highlights: [
        "Topic partitions and persistent message storage.",
        "Leader coordination and replication.",
      ],
    },
    {
      id: "gravity",
      rank: "Q",
      suit: "♣",
      title: "Gravity Sandbox",
      subtitle: "C++, CMake",
      description:
        "A Kafka-inspired distributed message broker built with Java and ZooKeeper.",
      highlights: [
        "Topic partitions and persistent message storage.",
        "Leader coordination and replication.",
      ],
    }
  ],

  experience: [
    {
      id: "eciton",
      rank: "A",
      suit: "♦",
      title: "AI Software Engineer Intern",
      subtitle: "Eciton",
      description:
        "June 2025 - Aug 2025",
      highlights: [
        "Python",
        "PostgreSQL",
        "OCR",
        "YOLO",
        "ETL",
        "RAG",
      ],
    },
    {
      id: "research",
      rank: "K",
      suit: "♠",
      title: "Software Engineer - Research",
      subtitle: "UW-Madison",
      description:
        "Oct 2024 - March 2025",
      highlights: [
        "Python",
        "Flask",
        "FastAPI",
        "Whisper AI",
        "Google Cloud Storage",
        "Project Documentation",
      ]
    },
    {
      id: "fair-play",
      rank: "Q",
      suit: "♥",
      title: "Data Analyst Intern",
      subtitle: "Fair Play Retail",
      description:
        "June 2023 - Aug 2023",
      highlights: [
        "Excel",
        "Power BI",
      ]
    },
  ],

  resume: [
    {
      id: "resume",
      rank: "A",
      suit: "♠",
      title: "Résumé",
      subtitle: "View resume here",
      description:
        "View my résumé for a complete overview of my background.",
      pdf: {
        url: `${import.meta.env.BASE_URL}resume.pdf`,
        downloadName: "Emilio-Fayad-Resume.pdf",
      },
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