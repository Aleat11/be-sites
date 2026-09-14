import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Cursor-following ambient glow */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (ref.current)
        ref.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[600px] w-[600px] rounded-full opacity-60 mix-blend-screen blur-3xl md:block"
      style={{
        background:
          "radial-gradient(circle, oklch(0.84 0.15 196 / 9%), transparent 60%)",
      }}
    />
  );
}

/* Kinetic hover word: top layer slides out, accent layer slides in */
export function Kinetic({ children }: { children: string }) {
  return (
    <span className="kinetic">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

/* Scroll reveal */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  x = 0,
  scale = 0.985,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : {
        opacity: 0,
        x,
        y,
        scale,
        filter: "blur(9px)",
        clipPath: "inset(0 0 18% 0 round 10px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        clipPath: "inset(0 0 0% 0 round 0px)",
      }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.82, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}


/* Glass card with cursor spotlight + tilt */
export function GlassCard({
  children,
  className = "",
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (tilt)
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 8}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`glass edge-lit spotlight rounded-2xl transition-transform duration-500 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

/* Section eyebrow label */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="glass-soft inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
      {children}
    </span>
  );
}

/* Count-up stat */
export function Stat({
  value,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const [n, setN] = useState(0);
  const started = useRef(false);

  const run = () => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1200, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.div viewport={{ once: true, amount: 0.4 }} onViewportEnter={run}>
      <div className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        <span className="text-accent">{prefix}</span>
        {n.toLocaleString()}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
    </motion.div>
  );
}

