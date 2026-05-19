import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  MousePointerClick,
  Target,
  X,
  PanelsTopLeft,
  Sparkles,
} from "lucide-react";
import {
  LANDING_PAGE_SERVICES,
  type LandingPageService,
} from "@/const/services";

function ServiceCard({
  service,
  index,
  onSelect,
}: {
  service: LandingPageService;
  index: number;
  onSelect: (service: LandingPageService) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(service)}
      className="group cursor-pointer rounded-2xl"
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-2xl border border-black/10 bg-white transition-colors duration-300 hover:border-black/30"
        animate={{
          y: isHovered ? -6 : 0,
          boxShadow: isHovered
            ? "0 24px 48px -20px rgba(0, 0, 0, 0.35)"
            : "0 0 0 0 rgba(0, 0, 0, 0)",
        }}
      >
        <div className="aspect-[16/9] overflow-hidden bg-black">
          <img
            src={service.image}
            alt={service.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="flex min-h-56 flex-col p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <span className="rounded-md bg-black/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-black/50">
              {service.category}
            </span>
            <motion.span
              animate={{ x: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0 }}
              className="text-black/35"
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          </div>

          <h2 className="mb-2 text-lg font-bold leading-tight tracking-tight">
            {service.title}
          </h2>
          <p className="mb-4 text-xs leading-relaxed text-black/60">
            {service.summary}
          </p>

          <div className="mt-auto space-y-1.5">
            {service.outcomes.slice(0, 1).map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-2 font-mono text-xs text-black/60"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E11D48]" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>

          <motion.div
            className="pointer-events-none absolute bottom-0 right-2 flex items-center justify-center gap-2 py-3 font-mono text-xs font-medium"
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 8,
            }}
            transition={{ duration: 0.25 }}
          >
            <MousePointerClick className="h-3.5 w-3.5" />
            {/* View details */}
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function ServiceDetailModal({
  service,
  onClose,
}: {
  service: LandingPageService | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!service) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <>
          <motion.div
            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="pointer-events-none fixed inset-0 z-101 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="pointer-events-auto relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white"
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-black shadow-lg transition-colors hover:bg-white"
                aria-label="Close service details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid max-h-[90vh] overflow-hidden md:grid-cols-[1.1fr_0.9fr]">
                <div
                  className={
                    service.fullImage
                      ? "max-h-72 overflow-y-auto bg-black md:max-h-[90vh]"
                      : "bg-black"
                  }
                >
                  <img
                    src={service.fullImage ?? service.image}
                    alt={service.alt}
                    className={
                      service.fullImage
                        ? "w-full"
                        : "h-72 w-full object-cover md:h-full"
                    }
                  />
                </div>

                <div className="max-h-[calc(90vh-18rem)] overflow-y-auto p-6 md:max-h-[90vh] md:p-8">
                  <span className="mb-4 inline-flex rounded-lg bg-black/5 px-3 py-1 font-mono text-xs uppercase tracking-wide text-black/50">
                    {service.category}
                  </span>
                  <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight">
                    {service.title}
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-black/70">
                    {service.details}
                  </p>

                  <div className="mb-6">
                    <h3 className="mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
                      What this helps with
                    </h3>
                    <div className="space-y-2">
                      {service.outcomes.map((outcome) => (
                        <div
                          key={outcome}
                          className="flex items-start gap-2 rounded-lg bg-black/5 p-3 text-sm text-black/70"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E11D48]" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
                      Typical sections
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-lg bg-black/5 px-3 py-1.5 font-mono text-xs text-black/70"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {service.link && (
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#E11D48]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View example
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function LandingPageServicesPage() {
  const [selectedService, setSelectedService] =
    useState<LandingPageService | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-6 md:px-20 py-12">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end mb-14"
        >
          <div className="flex flex-col gap-3">
            <div className="mb-5 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="h-3 w-3 rounded-full bg-linear-to-r from-[#E11D48] to-black"
              />
              <span className="font-mono text-sm uppercase tracking-wider text-black/50">
                Your Brand’s First Impression
              </span>
            </div>

            <div>
              <div>
                <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
                  Websites that make your <span className="text-[#E11D48]">business</span> clear.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/55">
                  I create landing pages for products, service businesses,
                  technical demos, and personal brands. The goal is simple: help
                  visitors understand what you offer, why it matters, and what
                  action they should take next.
                </p>
              </div>
            </div>
            </div>

            <div className="relative h-full overflow-hidden rounded-3xl">
              <img
                src="/service.png"
                alt="Landing page website example"
                className="absolute inset-0 h-full w-full object-contain opacity-90"
              />
            </div>

        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 grid gap-4 md:grid-cols-3"
        >
          {[
            {
              icon: Target,
              title: "Clear positioning",
              copy: "Show who you help, what you do, and why your offer is worth attention.",
            },
            {
              icon: PanelsTopLeft,
              title: "Structured story",
              copy: "Guide visitors from the first headline to proof, details, and a clear next step.",
            },
            {
              icon: MousePointerClick,
              title: "Action-focused",
              copy: "Design the page around contact, signup, booking, or a demo instead of passive browsing.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-black/10 bg-white p-5"
            >
              <item.icon className="mb-4 h-5 w-5 text-[#E11D48]" />
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-black/55">
                {item.copy}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-sm uppercase tracking-wider text-black/40">
              Service types
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Shipped products
            </h2>
          </div>
          <span className="hidden font-mono text-sm text-black/35 md:block">
            {LANDING_PAGE_SERVICES.length} examples
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LANDING_PAGE_SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onSelect={setSelectedService}
            />
          ))}
        </div>
      </section>

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </main>
  );
}
