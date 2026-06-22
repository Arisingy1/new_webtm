"use client";

import { Arrow, GREEN, INK, TEAL, useReveals } from "@/components/tm/ui";
import PricingBento from "@/components/tm/PricingBento";

const FAQ = [
  ["What counts as one interview?", "One uploaded or recorded interview session that produces a soft-skills report"],
  ["Do I need a credit card to start?", "No. The Free plan and 5 free interviews are available without a card"],
  ["Can I change my plan later?", "Yes, you can upgrade or downgrade at any time — billing is prorated"],
  ["Where is interview data stored?", "In a secure, encrypted cloud in EU and MENA data centers. SSO and advanced access control are available on Scale and Enterprise"],
];

const ENTERPRISE_FEATS = [
  "On-premise deployment (within the client's private perimeter)",
  "Tailored\nAI models for\nyour specific needs",
  "Complex integrations with internal HR/ERP systems",
  "SSO support and a custom role-based access model",
];

export default function PricingPage() {
  const root = useReveals();
  return (
    <div ref={root} className="w-full">
      <section className="w-full px-6 pt-40 pb-12 text-center md:px-12">
        <h1 className="reveal mx-auto max-w-4xl text-[3rem] font-bold leading-[1] tracking-tight sm:text-[4.5rem]">
          Choose your <span style={{ color: GREEN }}>hiring plan</span>
        </h1>
        <p className="reveal mx-auto mt-6 max-w-xl text-lg text-[#183833]/70">
          Transparent pricing that grows with your team
        </p>
      </section>

      <section className="w-full px-6 pb-16 md:px-12">
        <div className="reveal"><PricingBento /></div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-[#183833]/50">
          By providing payment information, you accept the terms of the{" "}
          <a href="/offer" className="underline underline-offset-2 transition-colors hover:text-[#7AB800]">public offer</a>
        </p>
      </section>

      {/* ENTERPRISE — отдельный блок */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 md:px-12">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] p-8 text-white md:p-12" style={{ background: INK }}>
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#7AB800]/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-[#11AFCC]/20 blur-[130px]" />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* левая колонка */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#cfeac0" }}>
                Enterprise
              </span>
              <p className="mt-5 text-[clamp(1.55rem,5.5vw,3rem)] font-bold leading-tight tracking-tight">Custom pricing</p>
              <p className="mt-2 text-lg font-medium" style={{ color: GREEN }}>Unlimited interview volume</p>
              <p className="mt-4 max-w-md leading-relaxed text-white/65">
                Maximum security and tailored solutions for enterprises. Everything in Scale, plus extended capabilities
              </p>
              <a href="/contacts" className="ease-smooth group mt-7 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-7 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1 sm:inline-flex sm:w-auto sm:justify-start" style={{ background: GREEN, color: INK }}>
                Discuss a rollout <Arrow style={{ color: INK }} />
              </a>
            </div>
            {/* правая колонка — возможности */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ENTERPRISE_FEATS.map((f) => (
                <div key={f} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ background: GREEN }}><Arrow style={{ color: INK }} className="h-3.5 w-3.5" /></span>
                  <span className="whitespace-pre-line text-sm leading-snug text-white/85">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[900px] px-6 pb-24">
        <h2 className="reveal text-center text-3xl font-semibold tracking-tight sm:text-4xl">FAQ</h2>
        <div className="stagger mt-10 space-y-4">
          {FAQ.map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-[#ededed] bg-white p-6">
              <p className="font-semibold" style={{ color: INK }}>{q}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#183833]/70">{a}</p>
            </div>
          ))}
        </div>
        <div className="reveal mt-12 flex flex-col items-center gap-4 rounded-3xl p-10 text-center text-white" style={{ background: TEAL }}>
          <p className="text-2xl font-semibold">Still have pricing questions?</p>
          <p className="max-w-md text-white/85">We'll help you choose the right plan for your team and get you set up</p>
          <a href="/contacts" className="group mt-2 flex items-center gap-1 rounded-xl bg-white px-6 py-3 text-sm font-semibold" style={{ color: TEAL }}>
            Contact us <Arrow style={{ color: TEAL }} />
          </a>
        </div>
      </section>
    </div>
  );
}
