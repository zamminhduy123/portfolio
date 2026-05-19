export type LandingPageService = {
  id: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  outcomes: string[];
  features: string[];
  image: string;
  fullImage?: string;
  alt: string;
  link?: string;
};

export const LANDING_PAGE_SERVICES: LandingPageService[] = [
  {
    id: "phaya-thai-spa",
    title: "Phaya Thai Spa",
    category: "Wellness service",
    summary:
      "A Vietnamese landing page for a Thai spa brand, designed around service discovery, branch selection, and fast booking.",
    details:
      "Built to present Phaya's Thai-inspired wellness experience clearly: hero positioning, service menus, recommended treatments, branch discovery, booking flow, promotion space, and app download prompts. The page helps customers understand the brand atmosphere before choosing a service or location.",
    outcomes: [
      "Turns a large spa menu into a guided browsing experience",
      "Makes branch and booking actions easy to find",
      "Uses visuals and service sections to communicate trust",
    ],
    features: [
      "Service menu",
      "Branch finder",
      "Booking flow",
      "Promotion sections",
    ],
    image:
      "./services/phaya.webp",
    fullImage: "./services/full-phaya.webp",
    alt: "Phaya Thai Spa landing page",
    link: "https://phaya-bliss-flow.vercel.app/",
  },
  {
    id: "sho-cinema",
    title: "SHO Cinema LoveTech",
    category: "Entertainment venue",
    summary:
      "A landing page for private cinema, PS5, PC couple rooms, karaoke mini, and food ordering at a Gò Vấp venue.",
    details:
      "Built for a venue where the offer depends on mood and occasion. The page presents room types, experience categories, gallery moments, booking steps, contact channels, and location details so visitors can decide quickly and message the business.",
    outcomes: [
      "Shows several room experiences without overwhelming visitors",
      "Moves users from browsing to booking contact",
      "Makes the venue feel concrete through gallery and amenity sections",
    ],
    features: [
      "Room showcase",
      "Experience cards",
      "Gallery",
      "Messenger and Zalo CTAs",
    ],
    image:
      "./services/sho.webp",
    fullImage: "/services/full-sho.webp",
    alt: "SHO Cinema landing page",
    link: "https://sho-landing.vercel.app/",
  },
  {
    id: "kni-education",
    title: "KNI Education",
    category: "Education",
    summary:
      "A bilingual education landing page for TestAS preparation and Germany study-abroad guidance.",
    details:
      "Built to explain a specialized education offer with credibility. The page positions TestAS preparation, highlights student outcomes, introduces the teaching roadmap, presents instructor authority, and routes visitors toward consultation or a trial lesson.",
    outcomes: [
      "Explains a niche education service in practical terms",
      "Builds authority with roadmap, results, and instructor profile",
      "Guides students toward consultation and trial registration",
    ],
    features: [
      "Bilingual content",
      "Learning roadmap",
      "Lead forms",
      "Trust sections",
    ],
    image:
      "./services/kni.webp",
    fullImage: "/services/full-kni.webp",
    alt: "KNI Education landing page",
    link: "https://kni.vn/vn/",
  },
  {
    id: "tung-bach-nhat",
    title: "Tùng Bách Nhật",
    category: "Industrial supplier",
    summary:
      "A corporate product showcase for an MRO equipment supplier serving oil, energy, chemical, food, and industrial clients.",
    details:
      "Built to present an industrial supplier with clear credibility signals: company positioning, industry coverage, experience metrics, partner logos, product highlights, client trust, and contact paths for sales inquiries.",
    outcomes: [
      "Makes a technical supplier offer understandable at a glance",
      "Highlights product depth, industries served, and business trust",
      "Routes buyers toward product browsing or direct contact",
    ],
    features: [
      "Product showcase",
      "Industry sections",
      "Client logos",
      "Contact CTAs",
    ],
    image:
      "./services/tungbachnhat.webp",
    fullImage: "/services/full-tungbachnhat.webp",
    alt: "Tùng Bách Nhật industrial supplier website",
    link: "https://tungbachnhat.vn/",
  },
  {
    id: "saas-product",
    title: "SaaS Product Landing Page",
    category: "Product launch",
    summary:
      "A focused landing page for explaining a digital product, showing the core workflow, and turning visitors into demo requests or signups.",
    details:
      "Built for software products that need a clear first impression. The page can cover the hero message, product benefits, proof points, feature sections, screenshots, FAQs, and conversion-focused calls to action.",
    outcomes: [
      "Explains the product in the first screen",
      "Guides visitors toward signup or contact",
      "Supports analytics and iteration after launch",
    ],
    features: [
      "Responsive layout",
      "Conversion-focused sections",
      "Product screenshots",
      "Contact or signup CTA",
    ],
    image: "/services/daucv.webp",
    fullImage: "/services/full-daucv.webp",
    alt: "SaaS landing page example",
    link: "https://daucv.com",
  },
  {
    id: "portfolio-business",
    title: "Portfolio / Service Business Page",
    category: "Personal brand",
    summary:
      "A clean website for presenting your work, credibility, and services so potential clients know what you do and how to contact you.",
    details:
      "Good for freelancers, consultants, small studios, and technical professionals. The page is organized around trust: what you offer, examples of work, who you help, and the simplest path to start a conversation.",
    outcomes: [
      "Creates a professional home for your business",
      "Packages services into a clear story",
      "Makes contact and inquiry friction low",
    ],
    features: [
      "Service overview",
      "Work showcase",
      "About section",
      "Contact section",
    ],
    image: "/me.webp",
    alt: "Portfolio website example",
  },
];
