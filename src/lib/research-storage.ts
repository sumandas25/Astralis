import type { UIMessage } from "ai";

export type ResearchThread = {
  id: string;
  title: string;
  updatedAt: number;
  messages: UIMessage[];
};

const KEY = "astralis.research.threads.v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadThreads(): ResearchThread[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ResearchThread[];
    if (!Array.isArray(parsed)) return [];
    return parsed.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

export function saveThreads(threads: ResearchThread[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(threads));
  } catch {
    // ignore quota errors
  }
}

export function createThreadId() {
  if (isBrowser() && "randomUUID" in crypto) return crypto.randomUUID();
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function deriveTitle(messages: UIMessage[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return "New conversation";
  const text = firstUser.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join(" ")
    .trim();
  if (!text) return "New conversation";
  return text.length > 56 ? text.slice(0, 56) + "…" : text;
}
