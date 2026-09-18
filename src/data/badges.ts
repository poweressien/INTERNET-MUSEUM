import type { Badge } from "@/types";
import { EXHIBITS } from "./exhibits";
import { LOST_PLATFORMS } from "./historicalPlatforms";

// Derived from the data itself so new exhibits/platforms are picked up
// automatically without editing badge logic.
const EXHIBITS_2007_IDS = EXHIBITS.filter((e) => e.year === 2007).map((e) => e.id);
const SOCIAL_LOST_IDS = LOST_PLATFORMS.filter((p) => p.category === "social").map((p) => p.id);

export const BADGES: Badge[] = [
  {
    id: "web-archaeologist",
    name: "WEB ARCHAEOLOGIST",
    description: "Visited 10 historical exhibits.",
    check: (state) => state.visitedExhibits.length + state.visitedLostPlatforms.length >= 10,
  },
  {
    id: "dot-com-survivor",
    name: "DOT-COM SURVIVOR",
    description: "Explored the 2000 era.",
    check: (state) => state.visitedEras.includes(2000),
  },
  {
    id: "social-archaeologist",
    name: "SOCIAL ARCHAEOLOGIST",
    description: "Explored 5 dead social networks.",
    check: (state) =>
      SOCIAL_LOST_IDS.filter((id) => state.visitedLostPlatforms.includes(id)).length >= 5,
  },
  {
    id: "old-school",
    name: "OLD SCHOOL",
    description: "Explored the early web.",
    check: (state) =>
      state.visitedExhibits.includes("geocities") || state.visitedEras.includes(1995),
  },
  {
    id: "2007-kid",
    name: "2007 KID",
    description: "Completed the 2007 Internet experience.",
    check: (state) => EXHIBITS_2007_IDS.every((id) => state.visitedExhibits.includes(id)),
  },
];

export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}
