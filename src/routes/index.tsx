import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useState, type FormEvent } from "react";
import logo from "@/assets/logo.png.asset.json";
import { CursorGlow, Eyebrow, GlassCard, Kinetic, Reveal, Stat } from "@/components/site";
import { Faq, faqs } from "@/components/Faq";

const Scene3D = lazy(() =>
  import("@/components/Scene3D").then((m) => ({ default: m.Scene3D })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Be-Sites — Websites for Home-Service Businesses" },
      {
        name: "description",
        content:
          "Be-Sites builds clear, fast websites for established home-service businesses. $850 flat for 1–3 page websites.",
      },
      { property: "og:title", content: "Be-Sites — Websites that turn local visits into inquiries" },
      {
        property: "og:description",
        content:
          "Clear, fast websites for established home-service businesses, with service pages, proof, and a tested inquiry process.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://be-sites-web.vercel.app/" },
      { property: "og:image", content: "https://be-sites-web.vercel.app/favicon.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://be-sites-web.vercel.app/favicon.png" },
    ],
    links: [
      { rel: "canonical", href: "https://be-sites-web.vercel.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Be-Sites",
          url: "https://be-sites-web.vercel.app/",
          description:
            "Be-Sites builds clear, fast websites for established home-service businesses. $850 flat for 1–3 page websites.",
          email: "antwane.leater@be-extraordinary.site",
          priceRange: "$850 - $1,799",
          areaServed: "United States",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const CONTACT_EMAIL = "antwane.leater@be-extraordinary.site";
const LEAD_ENDPOINT = "https://be-sites-lead-form.vercel.app/api/submit";
const SUCCESS_MSG =
  "Request received. If it's a fit, we'll call you within one business day.";

const TRADES = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Roofing",
  "Landscaping",
  "Concrete",
  "Remodeling",
  "Handyman",
  "Tree Service",
  "Fencing",
  "Garage Doors",
  "Painting",
  "Pest Control",
  "Other trade",
];

const TIMELINES = [
  "ASAP — ready to start now",
  "Within 2 weeks",
  "Within a month",
  "Just researching",
];

const nav = [
  { label: "Work", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const capabilities = [
  {
    n: "01",
    t: "Sub-2.5s load",
    d: "Static-first builds, compressed imagery, lazy loading and minified assets. Your site loads before a visitor's thumb leaves the screen.",
  },
  {
    n: "02",
    t: "Local SEO baked in",
    d: "Title tags, meta descriptions, semantic H1/H2 structure, alt text and LocalBusiness JSON-LD schema on every build.",
  },
  {
    n: "03",
    t: "Mobile-first, always",
    d: "Google indexes mobile-first and so do we. Every layout is designed on a phone before it's designed on a desktop.",
  },
  {
    n: "04",
    t: "Leads, not just pages",
    d: "Spam-protected contact forms, click-to-call, maps and hours placed exactly where people look for them.",
  },
  {
    n: "05",
    t: "Google Business Profile",
    d: "Claimed, verified, NAP-consistent, photographed and Q&A-seeded — the single biggest driver of local calls.",
  },
  {
    n: "06",
    t: "Analytics from day one",
    d: "GA4 and Search Console verified at handoff so you can see traffic, queries and calls instead of guessing.",
  },
];

const process = [
  { k: "Discovery", d: "A 20-minute call and one short form. Services, hours, photos, logo, colors — collected once, never chased." },
  { k: "Build", d: "Your site is designed and assembled against a hardened, industry-tuned foundation. Hours, not weeks." },
  { k: "Polish", d: "Mobile testing, PageSpeed pass, schema, analytics, accessibility and a full content proof." },
  { k: "Launch", d: "Domain connected, SSL provisioned, admin access handed over with a walkthrough video." },
];

const tiers = [
  {
    name: "Website Build",
    price: "$850",
    note: "1–3 pages, flat",
    highlight: true,
    points: ["1–3 page custom website", "Proof and trust sections", "Tested inquiry process", "Fast mobile experience", "Written scope + milestones", "Ownership at handoff"],
  },
  {
    name: "Growth",
    price: "$1,799",
    note: "up to 8 pages",
    highlight: false,
    points: ["Up to 8 custom pages", "Everything in Website Build", "Blog and articles setup", "Advanced on-page SEO", "Review and referral funnels", "Quarterly strategy call"],
  },
  {
    name: "Care Plan",
    price: "$79",
    note: "per month",
    highlight: false,
    points: ["Hosting + SSL managed", "Monthly backups", "1 hour of edits monthly", "Security updates", "Uptime monitoring", "Quarterly refresh"],
  },
];

const marquee = [
  "PLUMBERS",
  "LANDSCAPERS",
  "DENTISTS",
  "ROOFERS",
  "SALONS",
  "RESTAURANTS",
  "CONTRACTORS",
  "STUDIOS",
];

const inputCls =
  "glass-soft w-full rounded-xl px-5 py-3.5 text-sm outline-none transition-shadow duration-300 placeholder:text-muted-foreground focus:shadow-[0_0_0_2px_var(--color-ring)]";
const labelCls =
  "mb-1.5 block text-left font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      businessName: String(fd.get("businessName") || ""),
      trade: String(fd.get("trade") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      timeline: String(fd.get("timeline") || ""),
      message: String(fd.get("message") || ""),
    };
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.ok || data.duplicate)) {
        setStatus("done");
      } else {
        setError(data.error || "Could not save your request. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mx-auto mt-10 max-w-md rounded-2xl border border-accent/40 bg-accent/10 px-6 py-5 text-sm leading-relaxed text-foreground">
        {SUCCESS_MSG}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
      <div>
        <label className={labelCls} htmlFor="qf-business">Business name *</label>
        <input id="qf-business" name="businessName" required placeholder="Acme Plumbing Co." className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="qf-trade">Trade *</label>
        <select id="qf-trade" name="trade" required defaultValue="" className={inputCls}>
          <option value="" disabled>Select your trade…</option>
          {TRADES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelCls} htmlFor="qf-phone">Phone *</label>
        <input id="qf-phone" name="phone" type="tel" required placeholder="(555) 123-4567" className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="qf-email">Email *</label>
        <input id="qf-email" name="email" type="email" required placeholder="you@business.com" className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="qf-timeline">When do you want to go live? *</label>
        <select id="qf-timeline" name="timeline" required defaultValue="" className={inputCls}>
          <option value="" disabled>Select…</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="qf-needs">What do you need? (optional)</label>
        <textarea
          id="qf-needs"
          name="message"
          rows={3}
          placeholder="Services, service area, anything we should know…"
          className={`${inputCls} resize-none`}
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400 sm:col-span-2">{error}</p>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-sheen w-full rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {status === "sending" ? "Sending…" : "Request my quote"}
        </button>
      </div>
    </form>
  );
}

function Index() {
  return (
    <div className="noise relative min-h-screen overflow-hidden bg-background">
      <CursorGlow />

      {/* ---------- NAV ---------- */}
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
        <nav className="glass mx-auto flex max-w-6xl items-center gap-6 rounded-full px-5 py-3">
          <a href="#top" className="flex items-center gap-2.5">
            <img src={logo.url} alt="Be-Sites logo" className="h-7 w-7 rounded-md object-cover" />
            <span className="font-display text-sm font-semibold tracking-tight">Be-Sites</span>
          </a>
          <ul className="ml-auto hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {nav.map((i) => (
              <li key={i.href}>
                <a href={i.href} className="transition-colors hover:text-foreground">
                  <Kinetic>{i.label}</Kinetic>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="btn-sheen ml-auto rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.04] md:ml-0"
          >
            Request a quote
          </a>
        </nav>
      </header>

      {/* ---------- HERO ---------- */}
      <section id="top" className="relative min-h-[100svh] pb-24 pt-36">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-[18svh] h-[82svh] opacity-55 [mask-image:radial-gradient(closest-side,#000_48%,transparent_90%)] md:top-[8svh] md:h-[92svh]">
          <ClientOnly fallback={null}>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </ClientOnly>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 text-center [text-shadow:0_2px_24px_var(--color-background)]">
          <Reveal>
            <Eyebrow>Websites for home-service businesses</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-7 max-w-5xl font-display text-[clamp(2.5rem,7vw,5.7rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              <span className="text-foreground">Websites that make it easier for local customers to request a quote.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mx-auto mt-7 max-w-2xl space-y-3 text-balance text-base leading-relaxed text-foreground/80 md:text-lg">
              <p>
                Be-Sites builds clear, fast websites for established home-service businesses—with
                service pages, proof, and a tested inquiry process.
              </p>
              <p className="text-sm text-foreground/70 md:text-base">
                <span className="font-medium text-foreground">$850 flat</span> for a 1–3 page
                website. Written scope, clear milestones, and ownership at handoff.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="btn-sheen rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
              >
                Request a quote
              </a>
            </div>
          </Reveal>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* ---------- MARQUEE ---------- */}
      <div className="relative overflow-hidden border-y border-border py-5">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap px-8 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
              {m}
              <span className="h-1 w-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      {/* ---------- STATS ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {[
            { v: 850, p: "$", s: "", l: "Flat, 1–3 page websites" },
            { v: 4, p: "", s: " days", l: "Average go-live" },
            { v: 100, p: "", s: "%", l: "Mobile responsive" },
            { v: 2, p: "", s: ".5s", l: "Load time ceiling" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <Stat value={s.v} prefix={s.p} suffix={s.s} label={s.l} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CAPABILITIES ---------- */}
      <section id="capabilities" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal x={-34} y={12}>
          <Eyebrow>What's under the hood</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-display text-accent text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Every build ships with the things your competitors skipped.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.n} delay={(i % 3) * 0.07}>
              <GlassCard className="h-full p-7">
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{c.n}</span>
                <h3 className="mt-5 font-display text-xl font-medium tracking-tight">
                  <Kinetic>{c.t}</Kinetic>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section id="process" className="relative mx-auto max-w-6xl px-5 py-24">
        <Reveal x={34} y={12}>
          <Eyebrow>The process</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-display text-accent text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Four steps. No agency theatre.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border md:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.08} className="h-full">
              <div className="group relative h-full bg-card/40 p-7 transition-colors duration-500 hover:bg-card">
                <span className="font-mono text-[11px] text-muted-foreground">
                  0{i + 1} /04
                </span>
                <h3 className="mt-6 font-display text-lg font-medium tracking-tight">{p.k}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
      <section id="pricing" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal x={-34} y={12}>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-display text-accent text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Flat prices. Written scope. No surprises.
          </h2>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <GlassCard
                className={`flex h-full flex-col p-8 ${t.highlight ? "shadow-[var(--shadow-glow)]" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t.name}
                  </span>
                  {t.highlight && (
                    <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-foreground">
                      Popular
                    </span>
                  )}
                </div>
                <div className="mt-7 flex items-end gap-2">
                  <span className="font-display text-5xl font-semibold tracking-[-0.04em]">
                    {t.price}
                  </span>
                  <span className="pb-2 text-xs text-muted-foreground">{t.note}</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`btn-sheen mt-9 rounded-full px-5 py-3 text-center text-sm font-medium transition-transform duration-300 hover:scale-[1.03] ${
                    t.highlight
                      ? "bg-primary text-primary-foreground"
                      : "glass-soft text-foreground"
                  }`}
                >
                  Choose {t.name}
                </a>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal y={36} scale={0.97} className="text-center">
          <Eyebrow>Questions & answers</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-accent text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Everything people ask before they say yes.
          </h2>
        </Reveal>
        <div className="mt-14">
          <Faq />
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-32 pt-10">
        <Reveal y={42} scale={0.96}>
          <GlassCard tilt={false} className="overflow-hidden p-10 text-center md:p-20">
            <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-accent text-[clamp(2.1rem,5.5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                Ready for a website that{" "}
                <span className="text-accent">brings in jobs?</span>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Flat $850 for a 1–3 page site. Send your details — if it's a fit, we'll call you
                within one business day.
              </p>
              <QuoteForm />
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <img src={logo.url} alt="Be-Sites" className="h-7 w-7 rounded-md object-cover" />
            <span className="font-display text-sm font-semibold tracking-tight">Be-Sites</span>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground md:ml-auto"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Be-Sites. Built fast, built to be found.
          </p>
        </div>
      </footer>
    </div>
  );
}
