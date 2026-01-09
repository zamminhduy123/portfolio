export type PublicationLink = {
  pdf?: string;
  bibtex?: string;
  code?: string;
};

export type Publication = {
  id: string;
  title: string;
  venue: string;
  year: number;
  authors: string[];
  first: boolean;
  vibes: string;
  links: PublicationLink;
};

/**
 * Single source of truth for publications.
 * Used by both `Publications2.tsx` (cards list) and `PublicationsPage.tsx` (featured grid).
 */
export const PUBLICATIONS: Publication[] = [
  {
    id: "1",
    title:
      "Multi-Class Intrusion Detection System for In-Vehicle Networks Using Few-Shot Learning and Convolutional Anomaly Transformer Network",
    venue: "Knowledge Based Systems Journal",
    year: 2025,
    authors: ["Nguyen T. M. Duy", "H. B. T. Huy", "P. Van Phu", "T. D. Le", "D. Kim."],
    first: true,
    vibes: "hmmm this one idk :))",
    links: { pdf: "https://doi.org/10.1016/j.knosys.2025.114436" },
  },
  {
    id: "2",
    title:
      "Open-Set Recognition with Multi-Objective Graph Neural Network in Controller Area Networks",
    venue: "Submitted to IEEE Transactions",
    year: 2025,
    authors: ["Nguyen T. M. Duy", "D. Kim", "et al."],
    first: true,
    vibes: "just a submission for now but hoping for the best",
    links: { pdf: "#" },
  },
  {
    id: "3",
    title:
      "Advanced deep learning-based electricity theft detection in smart grids using multi-dimensional analysis with Convolutional Autoencoder and Transformer",
    venue: "Engineering Applications of Artificial Intelligence Journal",
    year: 2024,
    authors: ["T. D. Le", "N. T. M. Duy", "H. B. T. Huy", "P. Van Phu", "H. T. Doan", "D. Kim."],
    first: false,
    vibes: "lowkey just helped with the model training",
    links: { pdf: "https://doi.org/10.1016/j.engappai.2025.111333", bibtex: "#" },
  },
];

/**
 * Adapter for PublicationsPage.tsx "featured grid" format.
 * Keep this minimal so that PublicationsPage can keep its current UI shape.
 */
export type FeaturedPublication = {
  id: number;
  title: string;
  venue: string;
  year: string;
  abstract: string;
  tags: string[];
  link: string;
};

export const FEATURED_PUBLICATIONS: FeaturedPublication[] = PUBLICATIONS.map((p, idx) => ({
  id: idx + 1,
  title: p.title,
  venue: p.venue,
  year: String(p.year),
  // Publications2.tsx doesn't have abstracts/tags, so provide safe defaults.
  abstract: p.vibes ? p.vibes : "—",
  tags: p.first ? ["First author"] : ["Contribution"],
  link: p.links.pdf ?? "#",
}));