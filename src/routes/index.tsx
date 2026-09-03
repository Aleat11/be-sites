import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import logo from "@/assets/logo.png.asset.json";
import { CursorGlow, Eyebrow, GlassCard, Kinetic, Reveal, Stat } from "@/components/site";
import { Faq, faqs } from "@/components/Faq";

const Scene3D = lazy(() =>
  import("@/components/Scene3D").then((m) => ({ default: m.Scene3D })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Be-Sites — Fast, Modern Websites for Small Business, $899" },
      {
        name: "description",
        content:
          "Be-Sites builds high-performance, mobile-first small business websites from $899. Live in days, local SEO built in, optional $79/mo care plan.",
      },
      { property: "og:title", content: "Be-Sites — Websites that load fast and win local search" },
      {
        property: "og:description",
        content:
          "A 5–7 page, mobile-first small business site from $899. Local SEO, schema, analytics and custom domain included.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
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
    name: "Starter",
    price: "$899",
    note: "one-time",
    highlight: false,
    points: ["5 pages", "1 contact form", "On-page SEO + schema", "Analytics + Search Console", "Domain, SSL, deployment", "1 revision round"],
  },
  {
    name: "Growth",
    price: "$1,799",
    note: "one-time",
    highlight: true,
    points: ["Up to 10 pages", "Copywriting included", "Booking or e-commerce", "Custom motion + interactions", "Gallery / portfolio system", "2 revision rounds"],
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
            Start a build
          </a>
        </nav>
      </header>

      {/* ---------- HERO ---------- */}
      <section id="top" className="relative min-h-[100svh] pb-24 pt-36">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="absolute inset-0 -z-0">
          <ClientOnly fallback={null}>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </ClientOnly>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 text-center">
          <Reveal>
            <Eyebrow>Website studio — building since 2026</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-7 font-display text-[clamp(2.6rem,8vw,6.2rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
              <span className="text-gradient block">Websites that</span>
              <span className="block">
                <Kinetic>load fast</Kinetic>{" "}
                <span className="text-muted-foreground">&</span>{" "}
                <Kinetic>get found</Kinetic>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
              Be-Sites designs and ships high-performance small business websites — mobile-first,
              local-SEO-ready, live in days. From <span className="text-foreground">$899</span>.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="btn-sheen rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
              >
                Get my site built
              </a>
              <a
                href="#pricing"
                className="glass edge-lit rounded-full px-7 py-3.5 text-sm font-medium transition-transform duration-300 hover:scale-[1.04]"
              >
                See pricing
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
            { v: 899, s: "$", l: "Starter build" },
            { v: 4, s: " days", l: "Average go-live" },
            { v: 100, s: "%", l: "Mobile responsive" },
            { v: 2, s: ".5s", l: "Load time ceiling" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <Stat value={s.v} suffix={s.s} label={s.l} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CAPABILITIES ---------- */}
      <section id="capabilities" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <Eyebrow>What's under the hood</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
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
        <Reveal>
          <Eyebrow>The process</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
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
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Flat prices. Written scope. No surprises.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
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
        <Reveal className="text-center">
          <Eyebrow>Questions & answers</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Everything people ask before they say yes.
          </h2>
        </Reveal>
        <div className="mt-14">
          <Faq />
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-32 pt-10">
        <Reveal>
          <GlassCard tilt={false} className="overflow-hidden p-10 text-center md:p-20">
            <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-[clamp(2.1rem,5.5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                Let's put your business{" "}
                <span className="text-accent">on the map.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Tell us about the business and we'll send back a free homepage mockup — before you
                pay a cent.
              </p>
              <form
                className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@business.com"
                  className="glass-soft flex-1 rounded-full px-5 py-3.5 text-sm outline-none transition-shadow duration-300 placeholder:text-muted-foreground focus:shadow-[0_0_0_2px_var(--color-ring)]"
                />
                <button
                  type="submit"
                  className="btn-sheen rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
                >
                  Request mockup
                </button>
              </form>
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
          <p className="text-xs text-muted-foreground md:ml-auto">
            © {new Date().getFullYear()} Be-Sites. Built fast, built to be found.
          </p>
        </div>
      </footer>
    </div>
  );
}
