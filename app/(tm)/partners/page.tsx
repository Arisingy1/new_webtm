"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Plug, Share2, Store, Building2,
  BadgePercent, Megaphone, Headphones, GraduationCap, TrendingUp, Sparkles,
  Check, ArrowRight,
} from "lucide-react";
import { GREEN, INK, TEAL, Arrow, useReveals } from "@/components/tm/ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import { localize } from "@/lib/i18n";
import { PARTNERS } from "@/lib/content/partners";

/* ── дополнительные акценты бренда ── */
const AMBER = "#E8A317";
const TEALGREEN = "#2E9E8F";
const NODE_LABELS: Record<string, string[]> = { en: ["Integrate", "Refer", "Resell", "Agencies"], es: ["Integrar", "Referir", "Revender", "Agencias"], pt: ["Integrar", "Indicar", "Revender", "Agências"], ar: ["دمج", "ترشيح", "إعادة بيع", "وكالات"] };

/* ============================================================
   /partners — «Партнёрство». Сигнатура: hub партнёрской сети в
   hero (TalentMind в центре, связи к 4 моделям). Дальше — логотипы
   стека, полоса метрик, детальные карточки моделей, выгоды и шаги.
   ============================================================ */

/* узлы партнёрской сети (координаты в % внутри сцены) */
const NODES: { x: number; y: number; color: string; icon: React.ReactNode; label: string; depth: number }[] = [
  { x: 15, y: 24, color: GREEN, icon: <Plug className="h-5 w-5" />, label: "Integrate", depth: 26 },
  { x: 85, y: 20, color: TEAL, icon: <Share2 className="h-5 w-5" />, label: "Refer", depth: 34 },
  { x: 13, y: 77, color: AMBER, icon: <Store className="h-5 w-5" />, label: "Resell", depth: 30 },
  { x: 87, y: 74, color: TEALGREEN, icon: <Building2 className="h-5 w-5" />, label: "Agencies", depth: 22 },
];

const LOGOS = ["/lever.svg", "/greenhouse.svg", "/teams.svg", "/zoom.svg"];

const STATS: [string, string][] = [
  ["4", "Partnership models"],
  ["30%", "Up to revenue share"],
  ["2 wks", "Average to go live"],
  ["1:1", "Dedicated manager"],
];

const TYPES: { icon: React.ReactNode; color: string; title: string; best: string; points: string[] }[] = [
  { icon: <Plug className="h-6 w-6" />, color: GREEN, title: "Technology", best: "Best for ATS, HRIS & job boards", points: ["Embed AI assessment via our API", "Co-built integrations & listings", "Shared technical support"] },
  { icon: <Share2 className="h-6 w-6" />, color: TEAL, title: "Referral", best: "Best for advisors & communities", points: ["Recurring commission on every deal", "Simple link & deal registration", "No technical work required"] },
  { icon: <Store className="h-6 w-6" />, color: AMBER, title: "Reseller", best: "Best for HR-tech vendors", points: ["Wholesale pricing & margins", "Sell under your own offering", "White-glove onboarding"] },
  { icon: <Building2 className="h-6 w-6" />, color: TEALGREEN, title: "Agencies", best: "Best for recruiting firms", points: ["Objective soft-skill reports", "Stand out to your clients", "Volume-based pricing"] },
];

const BENEFITS: { icon: React.ReactNode; color: string; title: string; text: string }[] = [
  { icon: <BadgePercent className="h-5 w-5" />, color: GREEN, title: "Competitive revenue share", text: "Generous, recurring commissions and reseller margins that grow with your book of business" },
  { icon: <Megaphone className="h-5 w-5" />, color: TEAL, title: "Co-marketing", text: "Joint campaigns, case studies and lead sharing to put your brand in front of new audiences" },
  { icon: <Headphones className="h-5 w-5" />, color: AMBER, title: "Dedicated manager", text: "A real person who knows your goals and helps you close, onboard and expand accounts" },
  { icon: <Sparkles className="h-5 w-5" />, color: TEALGREEN, title: "Early access", text: "Preview new models and features before launch and shape the roadmap with your feedback" },
  { icon: <GraduationCap className="h-5 w-5" />, color: GREEN, title: "Enablement & training", text: "A partner portal with demo environments, sales decks, certification and product training" },
  { icon: <TrendingUp className="h-5 w-5" />, color: TEAL, title: "Shared pipeline", text: "Transparent deal registration and qualified leads routed to the partners best placed to win" },
];

const STEPS: { n: string; title: string; text: string }[] = [
  { n: "01", title: "Apply", text: "Tell us about your business, your clients and the partnership you have in mind" },
  { n: "02", title: "Onboard", text: "Get a dedicated manager, training, materials and a demo environment to get going fast" },
  { n: "03", title: "Launch", text: "Go live with co-marketing support and your first joint opportunities in the pipeline" },
  { n: "04", title: "Grow", text: "Scale with shared pipeline, recurring revenue and a roadmap you help shape" },
];

export default function PartnersPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const c = PARTNERS[locale];
  const nodeLabels = NODE_LABELS[locale];
  const contactsHref = localize("/contacts", locale);

  const root = useReveals(() => {
    gsap.fromTo(".partners-rise",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, clearProps: "opacity,transform" });
    gsap.fromTo(".partners-stage",
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.2, clearProps: "opacity,transform" });
  });

  /* лёгкий параллакс узлов сети по курсору */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>(".depth"));
    layers.forEach((l) => { l.style.transition = "transform .5s cubic-bezier(.22,1,.36,1)"; l.style.willChange = "transform"; });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      layers.forEach((l) => { const d = parseFloat(l.dataset.depth || "14"); l.style.transform = `translate3d(${(nx * d).toFixed(1)}px, ${(ny * d).toFixed(1)}px, 0)`; });
    };
    const onLeave = () => layers.forEach((l) => (l.style.transform = "translate3d(0,0,0)"));
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <div ref={root} className="relative w-full overflow-hidden" style={{ color: INK }}>
      <style>{`
        @keyframes ecoDash { to { stroke-dashoffset: -16; } }
        .eco-line { stroke-dasharray: 4 4; animation: ecoDash 1.1s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .eco-line { animation: none; } }
      `}</style>

      {/* ============================== HERO ============================== */}
      <section className="relative mx-auto grid max-w-[1340px] grid-cols-1 items-center gap-12 px-6 pt-32 pb-12 md:px-10 lg:grid-cols-[1.04fr_1fr] lg:pt-40">
        {/* ЛЕВО */}
        <div className="relative z-10">
          <h1 className="partners-rise max-w-[15ch] text-[clamp(2.1rem,4.4vw,4.3rem)] font-bold leading-[1.04] tracking-tight text-balance" style={{ color: INK }}>
            {c.heroPre}<span style={{ color: GREEN }}>{c.heroAccent}</span>
          </h1>
          <p className="partners-rise mt-6 max-w-xl text-lg leading-relaxed text-pretty text-[#183833]/70">{c.heroP}</p>
          <div className="partners-rise mt-8 flex flex-wrap items-center gap-3">
            <a href={contactsHref} className="ease-smooth group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-lg font-medium text-white shadow-[0_18px_40px_rgba(122,184,0,0.32)] transition-all duration-300 hover:-translate-y-1" style={{ background: GREEN }}>
              {c.ctaPrimary} <Arrow className="h-5 w-5 text-white" />
            </a>
            <a href="#models" className="ease-smooth inline-flex items-center gap-2 rounded-2xl border border-[#183833]/15 bg-white/70 px-6 py-4 text-lg font-medium text-[#183833] backdrop-blur transition-all duration-300 hover:-translate-y-1">
              {c.ctaSecondary}
            </a>
          </div>
          <div className="partners-rise mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#183833]/60">
            {c.trust.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" style={{ color: GREEN }} /> {t}</span>
            ))}
          </div>
        </div>

        {/* ПРАВО — сцена: hub партнёрской сети */}
        <div ref={stageRef} className="partners-stage relative z-10 mx-auto h-[400px] w-full max-w-[520px] sm:h-[460px]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `radial-gradient(closest-side, ${GREEN}26, transparent 70%)` }} />

          {/* связи */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="ecoStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={GREEN} stopOpacity="0.55" />
                <stop offset="100%" stopColor={TEAL} stopOpacity="0.55" />
              </linearGradient>
            </defs>
            {NODES.map((n, i) => (
              <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="url(#ecoStroke)" strokeWidth="1.5" strokeLinecap="round" className="eco-line" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>

          {/* центр — TalentMind */}
          <div className="depth absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2" data-depth="10">
            <div className="animate-floaty flex flex-col items-center gap-2 rounded-[26px] border border-[#e6ece4] bg-white px-6 py-5 shadow-[0_26px_60px_rgba(24,56,51,0.16)]">
              <span className="pointer-events-none absolute inset-2 -z-10 rounded-[22px]" style={{ boxShadow: `0 0 0 6px ${GREEN}12` }} />
              <img src="/logo-sign.svg" alt="TalentMind" className="h-9 w-auto" />
              <p className="text-sm font-bold" style={{ color: INK }}>TalentMind</p>
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ background: `${GREEN}16`, color: GREEN }}>Partner network</span>
            </div>
          </div>

          {/* узлы моделей */}
          {NODES.map((n, i) => (
            <div key={i} className="depth absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * 0.4}s` }} data-depth={n.depth}>
              <div className="animate-floaty flex items-center gap-2 rounded-2xl border border-[#e6ece4] bg-white px-3.5 py-2.5 shadow-[0_16px_40px_rgba(24,56,51,0.12)]" style={{ animationDelay: `${0.3 + i * 0.4}s` }}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl" style={{ background: `${n.color}1a`, color: n.color }}>{n.icon}</span>
                <span className="text-sm font-semibold" style={{ color: INK }}>{nodeLabels[i]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== ЛОГОТИПЫ СТЕКА ===================== */}
      <section className="reveal mx-auto max-w-[1100px] px-6 pb-4 md:px-12">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#183833]/40">{c.logosLabel}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {LOGOS.map((src) => (
            <img key={src} src={src} alt="" className="h-7 w-auto opacity-50 grayscale transition-all duration-300 hover:opacity-90 hover:grayscale-0 sm:h-8" />
          ))}
        </div>
      </section>

      {/* ===================== ПОЛОСА МЕТРИК ===================== */}
      <section className="mx-auto max-w-[1180px] px-6 py-14 md:px-12">
        <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-[#e8efe6] bg-[#e8efe6] shadow-[0_24px_60px_rgba(24,56,51,0.07)] sm:grid-cols-4">
          {c.stats.map(([v, l]) => (
            <div key={l} className="bg-white px-5 py-7 text-center">
              <p className="text-[clamp(1.8rem,3vw,2.6rem)] font-black leading-none tracking-tight" style={{ color: GREEN }}>{v}</p>
              <p className="mt-2 text-xs leading-snug text-[#183833]/55 sm:text-sm">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== МОДЕЛИ ПАРТНЁРСТВА ===================== */}
      <section id="models" className="relative mx-auto max-w-[1280px] scroll-mt-24 px-6 pb-8 md:px-12">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: INK }}>
            {c.typesTitlePre}<span style={{ color: GREEN }}>{c.typesTitleAccent}</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#183833]/65">{c.typesSub}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TYPES.map((t, i) => (
            <article key={i} className="reveal ease-smooth group relative flex flex-col overflow-hidden rounded-[28px] border border-[#e8efe6] bg-white p-7 shadow-[0_22px_55px_rgba(24,56,51,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_32px_72px_rgba(24,56,51,0.12)]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-30" style={{ background: t.color }} />
              <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `${t.color}1a`, color: t.color }}>{t.icon}</span>
              <h3 className="relative mt-6 text-2xl font-bold tracking-tight" style={{ color: INK }}>{c.types[i].title}</h3>
              <p className="relative mt-1.5 text-sm font-medium" style={{ color: t.color }}>{c.types[i].best}</p>
              <ul className="relative mt-5 space-y-2.5 border-t border-[#eef2ec] pt-5">
                {c.types[i].points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm leading-snug text-[#183833]/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: t.color }} /> {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ===================== ВЫГОДЫ ===================== */}
      <section className="relative mx-auto max-w-[1280px] px-6 py-20 md:px-12">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: INK }}>
            {c.benTitlePre}<span style={{ color: GREEN }}>{c.benTitleAccent}</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#183833]/65">{c.benSub}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div key={i} className="reveal ease-smooth group rounded-[24px] border border-[#e8efe6] bg-white/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#dfe7da] hover:shadow-[0_24px_55px_rgba(24,56,51,0.10)]">
              <span className="grid h-11 w-11 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-105" style={{ background: `${b.color}1a`, color: b.color }}>{b.icon}</span>
              <p className="mt-4 text-lg font-bold tracking-tight" style={{ color: INK }}>{c.benefits[i].title}</p>
              <p className="mt-1.5 leading-relaxed text-[#183833]/60">{c.benefits[i].text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== КАК ЭТО РАБОТАЕТ ===================== */}
      <section className="relative mx-auto max-w-[1280px] px-6 pb-20 md:px-12">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: INK }}>
            {c.stepsTitlePre}<span style={{ color: GREEN }}>{c.stepsTitleAccent}</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#183833]/65">{c.stepsSub}</p>
        </div>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[#cfe0bd] to-transparent lg:block" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.n} className="reveal relative text-center lg:text-left">
                <span className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-2xl text-lg font-black text-white shadow-[0_12px_28px_rgba(122,184,0,0.32)] lg:mx-0" style={{ background: GREEN }}>{s.n}</span>
                <h3 className="mt-5 text-xl font-bold tracking-tight" style={{ color: INK }}>{c.steps[i].title}</h3>
                <p className="mt-2 leading-relaxed text-[#183833]/60">{c.steps[i].text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative mx-auto mb-24 max-w-[1100px] px-6 md:px-12">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center text-white shadow-[0_40px_90px_rgba(122,184,0,0.32)] md:px-16" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #5e9400 100%)` }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-[90px]" />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-5xl">{c.cta.title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">{c.cta.sub}</p>
          <a href={contactsHref} className="ease-smooth relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1" style={{ color: GREEN }}>
            {c.cta.button} <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
