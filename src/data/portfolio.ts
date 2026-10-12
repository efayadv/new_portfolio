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
    icon?: string;
  }[];
  images?: {
    src: string;
    alt: string;
  }[];
};

export const portfolio: Record<Section, PortfolioItem[]> = {
  about: [
    {
      id: "about-me",
      rank: "K",
      suit: "♠",
      title: "About Me",
      subtitle: "Who am I?",
      description:
        "Hello! I am Emilio! - Computer Science Grad from the University of Wisconsin - Madison with a passion for Software Development.\nI love solving ambiguous problems and coming up with a software solution.\nIf I am not coding, I am playing the drums, listening to music, or playing blackjack!\n\nCurrently looking for full-time roles as a Software Engineer, Full-Stack Developer, or Applied AI Engineer",
      images: [
        {
          src: "/images/gradpic.png",
          alt: "graduation",
        },
      ]
    },
  ],
  projects: [
    {
      id: "villart",
      rank: "A",
      suit: "♠",
      title: "Villart - Web App",
      subtitle: "React, JavaScript, Node.js, PostgreSQL",
      description:
        "Full-Stack website for art studio with sign up/reservation feature",
      highlights: [
        "Handles 100+ users monthly",
        "Uses Express API to communicate with database",
        "PostgreSQL for database schema and domain logic",
        "Websocket communication for efficient updates",
        "Full reservation workflow and email worker"
      ],
      links: [
        { label: "GitHub", href: "https://github.com/efayadv/villart", icon: "/icons/github.svg" },
        { label: "Website", href: "https://www.villart.com.mx/" },
      ]
    },
    {
      id: "glance",
      rank: "K",
      suit: "♥",
      title: "Glance - Mobile App",
      subtitle: "React Native, PostgreSQL, TypeScript, Supabase",
      description:
        "A mobile app for venue discovery and wait-line time display",
      highlights: [
        "Built with React Native and Expo.",
        "Supabase and PostgreSQL for backend.",
        "Supabase for edge functions triggering notifications.",
        "Handles Authentication, Authorization, and Row-Level Security to protect user data",
      ],
      images: [
        {
          src: "/images/glance_map.png",
          alt: "glance-map",
        },
        {
          src: "/images/glance_chat.png",
          alt: "glance-chat",
        },
      ]
    },
    {
      id: "message-broker",
      rank: "J",
      suit: "♣",
      title: "Kafka Message Broker",
      subtitle: "Java, Zookeeper, TCP/IP",
      description:
        "A Kafka-inspired distributed message broker built with Java and ZooKeeper.",
      highlights: [
        "Topic partitions and persistent message storage.",
        "Leader coordination and replication with Zookeper.",
        "Custom binary TCP protocols.",
      ],
      links: [
        { label: "Github", href: "https://github.com/efayadv/kafka_ds", icon: "/icons/github.svg", },
      ]
    },
    {
      id: "eciton",
      rank: "K",
      suit: "♥",
      title: "ETL pipeline",
      subtitle: "Python, OCR/YOLO, PostgreSQL",
      description:
        "A computer vision ETL pipeline to turn raw images into structured data for Eciton",
      highlights: [
        "Python with OpenCV, Numpy, and Pandas for preprocessing and postprocessing",
        "Supervised YOLO models and TrOCR/PaddleOCR for data extraction",
        "Trained a RNN-CNN architecture to optimize character recognition",
        "JSON conversion and PostgreSQL for storing",
      ],
    },
    {
      id: "eciton-rag",
      rank: "J",
      suit: "♥",
      title: "Database AI Agent",
      subtitle: "LlamaIndex, SQL",
      description:
        "A Natural Language Querying AI Agent (RAG) for Eciton",
      highlights: [
        "LlamaIndex to answer natural-language questions about retail data.",
        "SQL Queries for retrieving relevant records",
        "Used embeddings and vector search to find information based on semantic similarity.",
      ],
    },
    {
      id: "compiler",
      rank: "J",
      suit: "♠",
      title: "Language Compiler",
      subtitle: "Java, JUnit, Assembly",
      description:
        "Java Language Compiler to turn my own language into machine code",
      highlights: [
        "Tokenization, Lexical Analysis, Abstract Syntax Tree, and Semantic Analysis",
        "Intermediate Representation and Linking to produce final executable",
        "MIPS Assembly optimization",
        "JUnit testing for each workflow stage",
      ],
      links: [
        { label: "Github", href: "https://github.com/efayadv/Compiler_project", icon: "/icons/github.svg", }
      ]
    },
    {
      id: "gravity",
      rank: "Q",
      suit: "♣",
      title: "Gravity Sandbox",
      subtitle: "C++, CMake",
      description:
        "Playful tool I made to learn some C++",
      highlights: [
        "Topic partitions and persistent message storage.",
        "Leader coordination and replication.",
      ],
      links: [
        { label: "Github", href: "https://github.com/efayadv/gravity_simulation", icon: "/icons/github.svg" }
      ]
    }, 
    {
      id: "portfolio",
      rank: "Q",
      suit: "♣",
      title: "Portfolio Website",
      subtitle: "React, TypeScript",
      description:
        "This website!",
      highlights: [
        "React, TypeScrip, and TailwindCSS",
        "Vercel Deployment",
      ],
      links: [
        { label: "Github", href: "https://github.com/efayadv/new_portfolio", icon: "/icons/github.svg" }
      ]
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
        "Interested in working together? Get in touch.\nI'll get back within a day.",
      // Add your actual links:
      links: [
        { label: "Email me", href: "emiliofav@gmail.com" },
        { label: "GitHub", href: "https://github.com/efayadv", icon: "/icons/github.svg",},
        { label: "LinkedIn", href: "https://www.linkedin.com/in/emilio-fayad", icon: "/icons/linkedin.svg",}
      ],
    },
  ],
};