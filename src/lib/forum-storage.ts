// Local (browser) community forum store. Multi-user upgrade path: swap these
// helpers for Lovable Cloud queries when auth is enabled.
import type { Category } from "@/data/cosmos";

export type ForumTopicCategory = Category | "general" | "missions" | "research";

export interface ForumReply {
  id: string;
  author: string;
  body: string;
  createdAt: number;
}

export interface ForumTopic {
  id: string;
  title: string;
  body: string;
  author: string;
  category: ForumTopicCategory;
  createdAt: number;
  replies: ForumReply[];
}

const TOPICS_KEY = "astralis.forum.topics.v1";
const NAME_KEY = "astralis.forum.author.v1";

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function read(): ForumTopic[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TOPICS_KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw) as ForumTopic[];
    return Array.isArray(parsed) ? parsed : seed();
  } catch {
    return seed();
  }
}

function write(topics: ForumTopic[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
}

function seed(): ForumTopic[] {
  const now = Date.now();
  const topics: ForumTopic[] = [
    {
      id: uid(),
      title: "Could Europa's subsurface ocean host life?",
      body:
        "Galileo and Hubble both suggest a salty ocean beneath Europa's ice. With Europa Clipper en route, what biosignatures are realistically detectable from orbit?",
      author: "astro_kai",
      category: "moons",
      createdAt: now - 1000 * 60 * 60 * 30,
      replies: [
        {
          id: uid(),
          author: "plume_hunter",
          body:
            "Methane:ethane ratios in plumes would be the cleanest tell, but Clipper's MASPEX needs a flyby through an active vent.",
          createdAt: now - 1000 * 60 * 60 * 12,
        },
      ],
    },
    {
      id: uid(),
      title: "Is TON 618 really the largest known black hole?",
      body:
        "Mass estimates from C IV broad-line widths are notoriously uncertain. What's the modern consensus on ultramassive SMBH catalogs?",
      author: "eventhorizon",
      category: "black-holes",
      createdAt: now - 1000 * 60 * 60 * 80,
      replies: [],
    },
    {
      id: uid(),
      title: "Upcoming Chinese & Indian lunar missions — what to watch",
      body:
        "Chang'e 7 + Chandrayaan-4 sample return are both queued for the late 2020s. Share your favorite primary-source links and launch trackers.",
      author: "rocket_diary",
      category: "missions",
      createdAt: now - 1000 * 60 * 60 * 4,
      replies: [],
    },
  ];
  write(topics);
  return topics;
}

export function listTopics(): ForumTopic[] {
  return read().sort((a, b) => b.createdAt - a.createdAt);
}

export function getTopic(id: string): ForumTopic | undefined {
  return read().find((t) => t.id === id);
}

export function createTopic(input: {
  title: string;
  body: string;
  category: ForumTopicCategory;
  author: string;
}): ForumTopic {
  const topic: ForumTopic = {
    id: uid(),
    title: input.title.trim(),
    body: input.body.trim(),
    category: input.category,
    author: input.author.trim() || "anonymous",
    createdAt: Date.now(),
    replies: [],
  };
  const all = read();
  all.unshift(topic);
  write(all);
  return topic;
}

export function addReply(topicId: string, input: { author: string; body: string }): ForumTopic | undefined {
  const all = read();
  const t = all.find((x) => x.id === topicId);
  if (!t) return undefined;
  t.replies.push({
    id: uid(),
    author: input.author.trim() || "anonymous",
    body: input.body.trim(),
    createdAt: Date.now(),
  });
  write(all);
  return t;
}

export function deleteTopic(id: string) {
  write(read().filter((t) => t.id !== id));
}

export function getAuthor(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(NAME_KEY) || "";
}

export function setAuthor(name: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(NAME_KEY, name.trim());
}

export const FORUM_CATEGORIES: { id: ForumTopicCategory; label: string }[] = [
  { id: "general", label: "General" },
  { id: "planets", label: "Planets" },
  { id: "moons", label: "Moons" },
  { id: "stars", label: "Stars" },
  { id: "galaxies", label: "Galaxies" },
  { id: "black-holes", label: "Black holes" },
  { id: "nebulae", label: "Nebulae" },
  { id: "meteors", label: "Meteors" },
  { id: "missions", label: "Missions" },
  { id: "research", label: "Research & papers" },
];

export function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(ts).toLocaleDateString();
}
