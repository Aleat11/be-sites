import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { GlassCard } from "./site";

export const faqs = [
  {
    q: "What exactly do I get for $899?",
    a: "A 5–7 page site (Home, About, Services, Gallery, Contact, optional Testimonials), fully mobile-responsive, one spam-protected contact form, click-to-call, Google Maps embed, business hours, on-page SEO, LocalBusiness schema, analytics setup, deployment with your custom domain and SSL, plus one round of revisions.",
  },
  {
    q: "How fast is it live?",
    a: "Most builds ship in 3–5 days from the moment we have your content. The build itself takes hours — the timeline is mostly you approving copy and photos. Rush delivery is available.",
  },
  {
    q: "What is not included?",
    a: "Copywriting (add-on, $300–$500), professional photography, e-commerce, online booking or payment integrations, and ongoing edits after the revision round. Those live in the Growth tier or the Care Plan so the starter price stays honest.",
  },
  {
    q: "Do I need to pay for hosting?",
    a: "Hosting is free-tier and blazing fast with unlimited bandwidth — no surprise overage bills. You only pay ~$10/year for the domain, registered in your name so you own it outright.",
  },
  {
    q: "What is the Care Plan and do I need it?",
    a: "It's $79/month: hosting and SSL management, monthly backups, one hour of content edits, security updates, uptime monitoring, and a quarterly refresh. It's optional — but clients who skip it usually end up with a site that quietly goes stale.",
  },
  {
    q: "How do payments work?",
    a: "50% deposit to lock your build slot, 50% on delivery before go-live. Simple one-page agreement covering scope, deliverables, timeline, and revisions. No retainers, no lock-in.",
  },
  {
    q: "Will my site actually rank on Google?",
    a: "Every build ships with clean semantic HTML, title tags and meta descriptions, alt text, LocalBusiness JSON-LD schema, sub-2.5s load times, and a fully optimized Google Business Profile. That combination is what wins local search — most of your competitors have none of it.",
  },
  {
    q: "Can I edit the site myself later?",
    a: "Yes. You get admin access and a short walkthrough video at handoff. If you'd rather not touch it, send edits to us on the Care Plan and they're done the same week.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <GlassCard key={f.q} tilt={false} className="overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-4 px-5 py-5 text-left md:px-7"
            >
              <span className="font-mono text-[11px] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display text-base font-medium tracking-tight transition-colors duration-300 group-hover:text-accent md:text-lg">
                {f.q}
              </span>
              <span
                className={`relative h-5 w-5 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-[135deg]" : ""}`}
              >
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-foreground" />
                <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-foreground" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-6 pl-[3.4rem] text-sm leading-relaxed text-muted-foreground md:px-7 md:pl-[3.9rem]">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        );
      })}
    </div>
  );
}
