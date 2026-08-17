import HeroChapter from "./HeroChapter";
import WorkChapter from "./WorkChapter";
import AboutChapter from "./AboutChapter";
import ExpertiseChapter from "./ExpertiseChapter";
import ServicesChapter from "./ServicesChapter";
import ResumeChapter from "./ResumeChapter";
import ContactChapter from "./ContactChapter";

// Single source of truth: id/navLabel/Component, consumed by the section
// list, the navbar, and the IntersectionObserver-based scroll spy alike —
// this is what keeps "what the navbar links to" from drifting out of sync
// with "what actually renders". navLabel: null means the section is
// reachable by scrolling but isn't one of the navbar's explicit links
// (Hero and Resume — Resume has its own dedicated navbar button instead).
export const CHAPTERS = [
  { id: "hero", navLabel: null, Component: HeroChapter },
  { id: "work", navLabel: "Work", Component: WorkChapter },
  { id: "about", navLabel: "About", Component: AboutChapter },
  { id: "expertise", navLabel: "Expertise", Component: ExpertiseChapter },
  { id: "services", navLabel: "Services", Component: ServicesChapter },
  { id: "resume", navLabel: null, Component: ResumeChapter },
  { id: "contact", navLabel: "Contact", Component: ContactChapter },
];
