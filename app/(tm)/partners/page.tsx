"use client";

import { gsap } from "gsap";
import {
  Plug, Share2, Store, Building2,
  BadgePercent, Megaphone, Headphones, GraduationCap, TrendingUp, Sparkles,
  ArrowRight,
} from "lucide-react";
import { GREEN, INK, TEAL, Arrow, useReveals } from "@/components/tm/ui";

/* ── дополнительные акценты бренда ── */
const AMBER = "#E8A317";
const TEALGREEN = "#2E9E8F";

/* ============================================================
   /partners — «Партнёрство». Hero + типы партнёрства + выгоды +
   как это работает + CTA. Лёгкие reveal-анимации (без pin-скролла).
   ============================================================ */

const TYPES: { icon: React.ReactNode; color: string; title: string; text: string }[] = [
  { icon: <Plug className="h-6 w-6" />, color: GREEN, title: "Technology partners", text: "Connect TalentMind to your ATS, HRIS or job board through our API and ship AI assessment inside your own product" },
  { icon: <Share2 className="h-6 w-6" />, color: TEAL, title: "Referral partners", text: "Recommend TalentMind to your network and earn a recurring share of every deal you bring our way" },
  { icon: <Store className="h-6 w-6" />, color: AMBER, title: "Reseller partners", text: "Sell TalentMind as part of your own offering with wholesale pricing, white-glove onboarding and full support" },
  { icon: <Building2 className="h-6 w-6" />, color: TEALGREEN, title: "Agencies & consultancies", text: "Add objective soft-skill and culture-fit analysis to your recruitment services and stand out to clients" },
];

const BENEFITS: { icon: React.ReactNode; title: string; text: string }[] = [
  { icon: <BadgePercent className="h-5 w-5" />, title: "Competitive revenue share", text: "Generous, recurring commissions and reseller margins that grow with your book of business" },
  { icon: <Megaphone className="h-5 w-5" />, title: "Co-marketing", text: "Joint campaigns, case studies and lead sharing to put your brand in front of new audiences" },
  { icon: <Headphones className="h-5 w-5" />, title: "Dedicated partner manager", text: "A real person who knows your goals and helps you close, onboard and expand accounts" },
  { icon: <Sparkles className="h-5 w-5" />, title: "Early access", text: "Preview new models and features before launch and shape the roadmap with your feedback" },
  { icon: <GraduationCap className="h-5 w-5" />, title: "Enablement & training", text: "A partner portal with demo environments, sales decks, certification and product training" },
  { icon: <TrendingUp className="h-5 w-5" />, title: "Shared pipeline", text: "Transparent deal registration and qualified leads routed to the partners best placed to win them" },
];

const STEPS: { n: string; title: string; text: string }[] = [
  { n: "01", title: "Apply", text: "Tell us about your business, your clients and the kind of partnership you have in mind" },
  { n: "02", title: "Onboard", text: "Get a dedicated manager, training, materials and a demo environment to get going fast" },
  { n: "03", title: "Launch", text: "Go live with co-marketing support and your first joint opportunities in the pipeline" },
  { n: "04", title: "Grow", text: "Scale with shared pipeline, recurring revenue and a roadmap you help shape" },
];

export default function PartnersPage() {
  const root = useReveals((scope) => {
    void scope;
    gsap.fromTo(".partners-rise",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, clearProps: "opacity,transform" });
  });

  return (
    <div ref={root} className="relative w-full overflow-hidden" style={{ color: INK }}>
      {/* ============================== HERO ============================== */}
      <section className="relative mx-auto max-w-[1100px] px-6 pt-32 pb-16 text-center md:px-12 lg:pt-44">
        <h1 className="partners-rise mx-auto max-w-[20ch] text-[clamp(2.2rem,4.6vw,4.6rem)] font-bold leading-[1.05] tracking-tight text-balance" style={{ color: INK }}>
          Grow your business <span style={{ color: GREEN }}>with TalentMind</span>
        </h1>
        <p className="partners-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-[#183833]/70">
          Join our partner network and bring AI-driven candidate assessment to your clients. Integrate it,
          refer it or resell it — we help you deliver better hiring outcomes and earn while doing it
        </p>
        <div className="partners-rise mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="/contacts" className="ease-smooth group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-lg font-medium text-white shadow-[0_18px_40px_rgba(122,184,0,0.32)] transition-all duration-300 hover:-translate-y-1" style={{ background: GREEN }}>
            Become a partner <Arrow className="h-5 w-5 text-white" />
          </a>
          <a href="/contacts" className="ease-smooth inline-flex items-center gap-2 rounded-2xl border border-[#183833]/15 bg-white/70 px-6 py-4 text-lg font-medium text-[#183833] backdrop-blur transition-all duration-300 hover:-translate-y-1">
            Talk to our team
          </a>
        </div>

        {/* короткие маркеры доверия */}
        <div className="partners-rise mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4">
          {[["Recurring", "revenue share"], ["Dedicated", "partner manager"], ["Co-marketing", "& enablement"]].map(([a, b]) => (
            <div key={a} className="rounded-2xl border border-[#e8efe6] bg-white/80 px-3 py-4">
              <p className="text-base font-bold leading-tight" style={{ color: GREEN }}>{a}</p>
              <p className="mt-1 text-xs leading-snug text-[#183833]/55">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== ТИПЫ ПАРТНЁРСТВА ===================== */}
      <section className="relative mx-auto max-w-[1280px] px-6 pb-8 md:px-12">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: INK }}>
            Ways to <span style={{ color: GREEN }}>partner</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#183833]/65">
            Pick the model that fits your business — or combine a few. Every partner gets the same
            hands-on support
          </p>
        </div>

        <div className="stagger mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" data-stag="0.1">
          {TYPES.map((t) => (
            <article key={t.title} className="ease-smooth group relative overflow-hidden rounded-[28px] border border-[#e8efe6] bg-white p-7 shadow-[0_22px_55px_rgba(24,56,51,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(24,56,51,0.12)]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-30" style={{ background: t.color }} />
              <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `${t.color}1a`, color: t.color }}>{t.icon}</span>
              <h3 className="relative mt-6 text-xl font-bold tracking-tight" style={{ color: INK }}>{t.title}</h3>
              <p className="relative mt-2.5 leading-relaxed text-[#183833]/60">{t.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===================== ВЫГОДЫ ===================== */}
      <section className="relative mx-auto max-w-[1280px] px-6 py-20 md:px-12">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: INK }}>
            Why partners <span style={{ color: GREEN }}>choose us</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#183833]/65">
            We invest in the partners who invest in us — with real margins and real support
          </p>
        </div>

        <div className="stagger mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stag="0.08">
          {BENEFITS.map((b) => (
            <div key={b.title} className="ease-smooth rounded-[24px] border border-[#e8efe6] bg-white/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(24,56,51,0.09)]">
              <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: `${GREEN}1a`, color: GREEN }}>{b.icon}</span>
              <p className="mt-4 text-lg font-bold tracking-tight" style={{ color: INK }}>{b.title}</p>
              <p className="mt-1.5 leading-relaxed text-[#183833]/60">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== КАК ЭТО РАБОТАЕТ ===================== */}
      <section className="relative mx-auto max-w-[1280px] px-6 pb-20 md:px-12">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: INK }}>
            How it <span style={{ color: GREEN }}>works</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#183833]/65">
            From first hello to growing revenue — usually a couple of weeks, not months
          </p>
        </div>

        <div className="relative mt-14">
          {/* соединительная линия (десктоп) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[#cfe0bd] to-transparent lg:block" />
          <div className="stagger grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" data-stag="0.12">
            {STEPS.map((s) => (
              <div key={s.n} className="relative text-center lg:text-left">
                <span className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-2xl text-lg font-black text-white shadow-[0_12px_28px_rgba(122,184,0,0.32)] lg:mx-0" style={{ background: GREEN }}>{s.n}</span>
                <h3 className="mt-5 text-xl font-bold tracking-tight" style={{ color: INK }}>{s.title}</h3>
                <p className="mt-2 leading-relaxed text-[#183833]/60">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative mx-auto my-12 mb-24 max-w-[1100px] px-6 md:px-12">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center text-white shadow-[0_40px_90px_rgba(122,184,0,0.32)] md:px-16" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #5e9400 100%)` }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-[90px]" />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-5xl">Ready to partner with us?</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">
            Tell us about your business and we’ll come back within two business days with a plan tailored to you
          </p>
          <a href="/contacts" className="ease-smooth relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1" style={{ color: GREEN }}>
            Become a partner <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
