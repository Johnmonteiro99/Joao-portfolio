// Real content only — nothing here is fabricated. Items drawn from the
// existing resume/skill list are regrouped for the new Expertise chapter,
// and a few genuinely-true practices demonstrated by this very rebuild
// (Tailwind, Framer Motion, reduced-motion support) are included alongside
// them — no invented tools or unverifiable claims.

export const CONTACT = {
  email: "zay.monteiro222@gmail.com",
  github: "https://github.com/Johnmonteiro99",
  linkedin: "https://www.linkedin.com/in/joaomonteiro99/",
};

export const HERO = {
  eyebrow: "Creative Engineer",
  role: "Full-Stack Software Engineer",
  focus: "UI-Focused",
  name: "João Monteiro",
  handle: "aka Zay",
  supporting:
    "I build thoughtful digital experiences from interface to infrastructure. A full-stack engineer with a passion for intuitive design, maintainable systems, and turning ambitious ideas into working products.",
  ctaPrimary: { label: "View My Work", target: "work" },
  ctaSecondary: { label: "Let’s Build Something", target: "contact" },
  tools: ["React", "TypeScript", "Python", "FastAPI", "Node.js", "PostgreSQL", "Supabase", "Figma"],
};

// Single source of truth for project data — the homepage rail and the full
// projects archive both render from this same array, nothing duplicated.
// Featured selection and order live here; the archive always renders all items.
// Actions are rendered only for real URLs. Never use placeholder links.
export const PROJECTS = [
  {
    id: "haven",
    number: "01",
    name: "HAVEN · Listing Search",
    classification: "Full-Stack · Personal Project",
    description:
      "A responsive property search application featuring advanced listing filters, budget and recency ranking, and server-side pagination. Built with React, TypeScript, and FastAPI using a modern architectural-editorial design.",
    technologies: ["React", "TypeScript", "Vite", "Python", "FastAPI"],
    featured: true,
    featuredOrder: 1,
    image: "/images/projects/haven-960.webp",
    imageSrcSet: "/images/projects/haven-480.webp 480w, /images/projects/haven-960.webp 960w",
    imageWidth: 960,
    imageHeight: 617,
    imageFit: "contain",
    imagePosition: "50% 42%",
    imageBackground: "#f5f4ef",
    imageAlt: "HAVEN’s editorial homepage with property search filters and a coastal home hero",
    liveUrl: "https://haven-listing-search.vercel.app/",
    githubLabel: "Source Code",
    githubUrl: "https://github.com/Johnmonteiro99/haven-listing-search",
  },
  {
    id: "astral-veil",
    slogan: "between fate and imagination",
    developmentNote: "Expanding toward deeper Oracle, Lenormand, and meditation experiences.",
    number: "02",
    name: "Astral Veil",
    classification: "Flagship · Personal",
    description:
      "An immersive digital spiritual platform blending Tarot, storytelling, education, and reflection within an interconnected interactive world.",
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "SCSS"],
    featured: true,
    featuredOrder: 2,
    image: "/images/projects/astral-veil-960.webp",
    imageSrcSet: "/images/projects/astral-veil-480.webp 480w, /images/projects/astral-veil-960.webp 960w",
    imageWidth: 960,
    imageHeight: 960,
    imageFit: "cover",
    imagePosition: "50% 50%",
    imageBackground: "#171912",
    imageAlt: "Astral Veil artwork with Tarot and Lenormand cards, candlelight, and the words between fate and imagination",
    liveUrl: "https://astralveil.world",
  },
  {
    id: "pawsitive",
    number: "03",
    name: "Pawsitive",
    classification: "Client Project",
    description:
      "A warm, responsive pet-sitting website designed to build trust, clearly communicate services, and make it easy for local clients to connect.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    featured: true,
    featuredOrder: 3,
    image: "/images/projects/pawsitive-960.webp",
    imageSrcSet: "/images/projects/pawsitive-480.webp 480w, /images/projects/pawsitive-960.webp 960w",
    imageWidth: 960,
    imageHeight: 540,
    imageFit: "contain",
    imagePosition: "50% 44%",
    imageBackground: "#f7ecdd",
    imageAlt: "Pawsitive pet sitting website project preview",
    liveUrl: "https://johnmonteiro99.github.io/pawsitive/",
  },
];

// Return a new array so configuring homepage order never reorders the archive.
export function getFeaturedProjects(projects = PROJECTS) {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER))
    .slice(0, 7);
}

// One category is expanded at a time. Diagram keys select educational data;
// projectIds resolve evidence against PROJECTS without copying project URLs.
export const EXPERTISE = [
  {
    "id": "fullstack",
    "number": "01",
    "label": "Full-Stack Engineering",
    "shortLabel": "Full-Stack",
    "description": "Connecting interfaces, APIs, application logic, and data into complete, usable applications.",
    "diagram": "application-flow",
    "groups": [
      {
        "title": "Technologies",
        "items": [
          "React",
          "TypeScript",
          "Python",
          "FastAPI",
          "Supabase",
          "PostgreSQL"
        ]
      },
      {
        "title": "Capabilities",
        "items": [
          "API Integration",
          "Application Logic",
          "Data Interaction",
          "End-to-End Workflows"
        ]
      }
    ],
    "projectIds": [
      "haven"
    ]
  },
  {
    "id": "frontend",
    "number": "02",
    "label": "Front-End Engineering",
    "shortLabel": "Front-End",
    "description": "Building maintainable, component-driven interfaces with thoughtful state, responsive layouts, and accessible interactions.",
    "diagram": "component-tree",
    "groups": [
      {
        "title": "Technologies",
        "items": [
          "React",
          "TypeScript",
          "JavaScript",
          "HTML / CSS"
        ]
      },
      {
        "title": "Capabilities",
        "items": [
          "Component Composition",
          "State Management",
          "Responsive UI",
          "Accessibility"
        ]
      }
    ],
    "projectIds": [
      "haven",
      "astral-veil"
    ]
  },
  {
    "id": "uiux",
    "number": "03",
    "label": "UI/UX & Interaction",
    "shortLabel": "UI / UX",
    "description": "Translating design ideas into clear, responsive experiences with considered feedback, motion, and visual consistency.",
    "diagram": "interaction-flow",
    "groups": [
      {
        "title": "Tools",
        "items": [
          "Figma",
          "Framer Motion"
        ]
      },
      {
        "title": "Capabilities",
        "items": [
          "Interaction Design",
          "Design-to-Code Translation",
          "Micro-interactions",
          "Design Tokens",
          "Reusable Patterns"
        ]
      }
    ],
    "projectIds": [
      "haven",
      "astral-veil"
    ]
  },
  {
    "id": "backend",
    "number": "04",
    "label": "Back-End & Systems",
    "shortLabel": "Back-End",
    "description": "Designing validated API workflows and server-side application logic, with clear boundaries between requests, processing, and data.",
    "diagram": "request-flow",
    "groups": [
      {
        "title": "Back-End",
        "items": [
          "Python / FastAPI",
          "Node.js",
          "REST APIs"
        ]
      },
      {
        "title": "Data & Logic",
        "items": [
          "Supabase / PostgreSQL",
          "Request Validation",
          "Business Logic",
          "Data Access",
          "Error Handling"
        ]
      }
    ],
    "projectIds": [
      "haven"
    ]
  },
  {
    "id": "quality",
    "number": "05",
    "label": "Performance & Quality",
    "shortLabel": "Quality",
    "description": "Improving usability and reliability through performance checks, accessible interactions, automated tests, and maintainable implementation.",
    "diagram": "quality-flow",
    "groups": [
      {
        "title": "Testing Tools",
        "items": [
          "pytest",
          "Vitest",
          "React Testing Library",
          "Playwright",
          "axe"
        ]
      },
      {
        "title": "Practices",
        "items": [
          "Loading & Error States",
          "Keyboard Checks",
          "Reduced Motion",
          "Regression Testing"
        ]
      }
    ],
    "projectIds": [
      "haven"
    ]
  }
];

// Evidence links use the existing project records, with real URLs only.
export function getProjectEvidence(projectIds = [], projects = PROJECTS) {
  return projectIds.flatMap((id) => {
    const project = projects.find((item) => item.id === id);
    if (!project) return [];
    const href = project.liveUrl || project.githubUrl;
    return href ? [{ ...project, href, action: project.liveUrl ? "Live project" : "View source" }] : [];
  });
}

export const SERVICES = [
  {
    "title": "Full-Stack Development",
    "desc": "Building complete web applications that connect responsive interfaces with APIs, application logic, and data.",
    "icon": "application"
  },
  {
    "title": "Website & App Redesign",
    "desc": "Refining existing websites and applications through clearer structure, thoughtful design, and maintainable code.",
    "icon": "redesign"
  },
  {
    "title": "UI/UX Implementation",
    "desc": "Translating designs into responsive, accessible interfaces with considered interactions and visual detail.",
    "icon": "interaction"
  },
  {
    "title": "Design Systems",
    "desc": "Creating reusable components, design tokens, and consistent themes that make interfaces easier to extend.",
    "icon": "components"
  },
  {
    "title": "Performance & Accessibility",
    "desc": "Improving loading, rendering, keyboard access, and usability through focused checks and practical fixes.",
    "icon": "quality"
  },
  {
    "title": "Technical Collaboration",
    "desc": "Working with teams on implementation, debugging, code review, and technical problem-solving.",
    "icon": "collaboration"
  }
];

export const RESUME = {
  available: true, // real file at public/resume.pdf (copied from Joao_Monteiro_Resume_10:26.pdf)
  href: "/resume.pdf",
  // First-page preview rendered from the current PDF.
  previewImage: "/images/resume-preview.png",
};

export const ABOUT = {
  paragraphs: [
    {
      text: "I'm naturally curious and creative. I enjoy designing, building, and finding new ways to turn an idea into something people can actually experience. Art, books, mysteries, and the way people think all tend to send my mind down new paths.",
      labels: ["Curiosity", "Design", "Creativity"],
    },
    {
      text: "I'm happiest when I can slow things down a little. Give me a good coffee, plants nearby, crisp fall weather, or a quiet mountain getaway and I'm probably exactly where I want to be. Nature has always been one of the places where I reset and find inspiration.",
      labels: ["Nature", "Fall", "Coffee", "Slow Moments"],
    },
    {
      text: "Cars are another world I love. There's something about a long road trip, a great stretch of road, and discovering somewhere new that never gets old. Traveling gives me that same feeling: new places, new perspectives, and another piece of the world to understand.",
      labels: ["Cars", "Road Trips", "Travel"],
    },
    {
      text: "At my core, I try to live intentionally and experience life fully. I value staying active, caring for the people and animals around me, and having the kind of conversations where you really get to know how someone sees the world. Those connections, ideas, and perspectives are often what stay with me most.",
      labels: ["Connection", "Perspective", "Intention"],
    },
  ],
};

// Current headshot from assets/Joao-profile-pic.jpeg, copied to public/images.
// Portrait.jsx still falls back to a placeholder automatically via onError
// if this path is ever missing (e.g. before this photo was added).
export const PORTRAIT_SRC = "/images/joao-profile-pic.jpeg";
