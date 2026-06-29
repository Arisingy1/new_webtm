"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CultureSections from "@/components/tm/sections/CultureSections";

/* ── палитра бренда TalentMind ── */
const GREEN = "#7AB800";
const INK = "#183833";

/* ============================================================
   CultureBody — полное тело страницы «Корпоративная культура»
   (hero + блоки + CTA). Используется на /culture и на /platform.
   embedded = встроено в общую страницу платформы: уменьшенный
   верхний отступ hero и без собственного нижнего CTA.
   ============================================================ */

export default function CultureBody({ embedded = false }: { embedded?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cult-rise",
        { opacity: 0, y: 42 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, clearProps: "opacity,transform" });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden" style={{ color: INK }}>
      {/* ============================== HERO ============================== */}
      <section className={`relative mx-auto max-w-[1100px] px-6 pb-20 text-center md:px-12 ${embedded ? "pt-10" : "pt-32 lg:pt-44"}`}>
        <h1 className="cult-rise mx-auto max-w-[20ch] text-[clamp(2.2rem,4.6vw,4.6rem)] font-bold leading-[1.05] tracking-tight" style={{ color: INK }}>
          We map the unique <span style={{ color: GREEN }}>code</span> of your corporate culture
        </h1>
        <p className="cult-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#183833]/70">
          Upload your culture artifacts: website, social media, job postings, internal guides and more. TalentMind helps
          you structure your company profile across 54 parameters. The platform becomes your assistant for assessing candidates through the lens of your DNA
        </p>
        <div className="cult-rise mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="/culture/example" className="ease-smooth group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-lg font-medium text-white shadow-[0_18px_40px_rgba(122,184,0,0.32)] transition-all duration-300 hover:-translate-y-1" style={{ background: GREEN }}>
            Sample report <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
          <a href="https://app.talentmind.ru" className="ease-smooth inline-flex items-center gap-2 rounded-2xl border border-[#183833]/15 bg-white/70 px-6 py-4 text-lg font-medium text-[#183833] backdrop-blur transition-all duration-300 hover:-translate-y-1">
            Report for your company
          </a>
        </div>
      </section>

      {/* ===================== КОНТЕНТНЫЕ БЛОКИ ===================== */}
      <CultureSections />

      {/* ===================== CTA ===================== */}
      {!embedded && (
        <section className="relative mx-auto my-24 max-w-[1100px] px-6 md:px-12">
          <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center text-white shadow-[0_40px_90px_rgba(122,184,0,0.32)] md:px-16" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #5e9400 100%)` }}>
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-[90px]" />
            <h2 className="relative text-3xl font-bold tracking-tight sm:text-5xl">Build your team’s culture profile</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">
              Upload your culture artifacts and assess candidates against your own DNA. First 5 assessments free
            </p>
            <a href="/pricing" className="ease-smooth relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1" style={{ color: GREEN }}>
              Start for free →
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
