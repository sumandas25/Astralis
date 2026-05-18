/**
 * Build canonical research / publication search URLs for any astronomy topic.
 * No API calls — pure URL builders that point to authoritative sources.
 */

const enc = (q: string) => encodeURIComponent(q.trim());

export type ResearchLink = {
  label: string;
  url: string;
  venue: string;
  description: string;
};

export function buildResearchLinks(topic: string): ResearchLink[] {
  const q = enc(topic);
  return [
    {
      label: `arXiv: ${topic}`,
      venue: "arXiv (preprints)",
      description: "Open-access preprints in physics & astrophysics.",
      url: `https://arxiv.org/search/?searchtype=all&query=${q}`,
    },
    {
      label: `NASA ADS: ${topic}`,
      venue: "NASA ADS",
      description: "The definitive bibliographic database for astronomy.",
      url: `https://ui.adsabs.harvard.edu/search/q=${q}&sort=date%20desc`,
    },
    {
      label: `Google Scholar: ${topic}`,
      venue: "Google Scholar",
      description: "Cross-publisher academic search.",
      url: `https://scholar.google.com/scholar?q=${q}`,
    },
    {
      label: `Nature search: ${topic}`,
      venue: "Nature",
      description: "Peer-reviewed articles in Nature & sister journals.",
      url: `https://www.nature.com/search?q=${q}`,
    },
    {
      label: `Wikipedia: ${topic}`,
      venue: "Wikipedia",
      description: "Encyclopedic overview & onward references.",
      url: `https://en.wikipedia.org/wiki/Special:Search?search=${q}`,
    },
  ];
}

/** Single Wikipedia "Learn more" URL — useful for cards. */
export function wikipediaUrl(topic: string): string {
  return `https://en.wikipedia.org/wiki/Special:Search?search=${enc(topic)}`;
}
