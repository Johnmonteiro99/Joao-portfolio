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
  name: "João Monteiro",
  handle: "aka Zay",
  supporting:
    "I build digital experiences that blend code, design, and intention. Front-end engineer with a creative mind and a systems-thinking approach.",
  ctaPrimary: { label: "View My Work", target: "work" },
  ctaSecondary: { label: "Build Your Website", target: "contact" },
  tools: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "Node.js", "Figma", "Git"],
};

// Single source of truth for project data — the homepage rail and the full
// projects archive both render from this same array, nothing duplicated.
// Only real, currently-live projects belong here; add future ones the same
// shape (githubUrl/caseStudyUrl/featured/year can be added per-project when
// they're real, never populated with placeholder values).
export const PROJECTS = [
  {
    id: "astral-veil",
    number: "01",
    name: "Astral Veil",
    classification: "Flagship · Personal",
    description:
      "An immersive spiritual platform blending interactive tarot, education, storytelling, personalized experiences, and a scalable content system.",
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "SCSS"],
    image: "/images/astral-veil-thumbnail.jpg",
    imageAlt: "Astral Veil project preview",
    liveUrl: "https://astralveil.world",
  },
  {
    id: "pawsitive",
    number: "02",
    name: "Pawsitive",
    classification: "Client Project",
    description:
      "A warm, responsive pet-sitting website designed to build trust, clearly communicate services, and make it easy for local clients to connect.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    image: "/images/pawsitive-thumbnail.jpg",
    imageAlt: "Pawsitive pet sitting website project preview",
    liveUrl: "https://johnmonteiro99.github.io/pawsitive/",
  },
];

// One category is shown expanded at a time (Expertise Matrix). Each group's
// `title` distinguishes tools/technologies from broader capabilities — never
// merged into one undifferentiated list. `diagram` selects which small SVG
// illustration ExpertiseDiagram.jsx renders for that category.
export const EXPERTISE = [
  {
    id: "frontend",
    number: "01",
    label: "Front-End Engineering",
    shortLabel: "Front-End",
    description:
      "Building responsive, component-driven interfaces with a focus on thoughtful interaction, performance, maintainability, and clean implementation.",
    diagram: "component-tree",
    groups: [
      { title: "Technologies", items: ["React", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 / CSS3", "SCSS"] },
      { title: "Capabilities", items: ["Responsive UI", "Component Architecture", "Reusable UI Patterns"] },
    ],
  },
  {
    id: "uiux",
    number: "02",
    label: "UI/UX & Interaction",
    shortLabel: "UI / UX",
    description:
      "Turning design ideas into responsive interfaces with polished interaction, thoughtful motion, and attention to how an experience feels as well as how it works.",
    diagram: "interaction-path",
    groups: [
      { title: "Tools", items: ["Figma", "Framer Motion"] },
      {
        title: "Capabilities",
        items: ["Interaction Design", "Micro-animations", "Design-to-Code Translation", "Responsive Experience Design", "Component-Driven UI"],
      },
    ],
  },
  {
    id: "design-systems",
    number: "03",
    label: "Design Systems",
    shortLabel: "Design Systems",
    description:
      "Creating reusable visual and component systems that keep interfaces consistent, scalable, and easier to maintain as products grow.",
    diagram: "token-network",
    groups: [
      { title: "Tools", items: ["Tailwind CSS", "Figma"] },
      {
        title: "Capabilities",
        items: ["Reusable Component Architecture", "Token-Based Theming", "Design Consistency at Scale", "Shared UI Patterns", "Theme Architecture"],
      },
    ],
  },
  {
    id: "backend",
    number: "04",
    label: "Back-End & Tools",
    shortLabel: "Back-End & Tools",
    description:
      "Working across APIs, databases, cloud infrastructure, and development workflows when a project needs more than the interface layer.",
    diagram: "architecture-flow",
    groups: [
      { title: "Back-End", items: ["Node.js", "Express", "REST APIs"] },
      { title: "Data", items: ["Supabase", "PostgreSQL", "MongoDB"] },
      { title: "Cloud / Infrastructure", items: ["AWS", "Docker"] },
      { title: "Workflow", items: ["Git", "CI/CD", "Agile"] },
    ],
  },
  {
    id: "performance",
    number: "05",
    label: "Performance & Accessibility",
    shortLabel: "Performance",
    description:
      "Building interfaces that remain fast, usable, and considerate of different users, devices, input methods, and motion preferences.",
    diagram: "diagnostic-rings",
    groups: [
      { title: "Accessibility", items: ["Semantic HTML", "Keyboard Support", "Screen Reader Considerations", "Reduced Motion Support", "Responsive Design"] },
      { title: "Testing / Validation", items: ["Cypress", "Playwright", "Postman"] },
    ],
  },
];

export const SERVICES = [
  {
    title: "Web Development",
    desc: "End-to-end build of fast, modern, production-ready websites and web apps.",
  },
  {
    title: "Website Redesign",
    desc: "Modernizing an existing site's design, structure, and codebase without losing what already works.",
  },
  {
    title: "UI Implementation",
    desc: "Turning designs (Figma or otherwise) into pixel-accurate, responsive, accessible interfaces.",
  },
  {
    title: "Design Systems",
    desc: "Reusable component libraries and token-based theming so a product stays consistent as it grows.",
  },
  {
    title: "Performance, SEO & Accessibility",
    desc: "Auditing and improving load speed, search visibility, and usability for every visitor.",
  },
  {
    title: "Consulting & Mentoring",
    desc: "Technical guidance for teams and individuals navigating front-end architecture decisions.",
  },
];

export const RESUME = {
  available: true, // real file at public/resume.pdf (copied from Updated_resume_fid_2026.pdf)
  href: "/resume.pdf",
  // First-page preview generated from the real PDF (macOS QuickLook thumbnail,
  // public/images/resume-preview.png) — not a fabricated mockup.
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

// Real headshot, added to assets/joao-profile-pic.jpeg and copied here.
// Portrait.jsx still falls back to a placeholder automatically via onError
// if this path is ever missing (e.g. before this photo was added).
export const PORTRAIT_SRC = "/images/joao-profile-pic.jpeg";
