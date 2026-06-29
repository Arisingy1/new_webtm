"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Dna, FileText, Bot } from "lucide-react";
import CultureBody from "@/components/tm/pages/CultureBody";
import ReportBody from "@/components/tm/pages/ReportBody";
import AssistantBody from "@/components/tm/pages/AssistantBody";
import BlockNav from "@/components/tm/BlockNav";
import { smoothJumpTo } from "@/components/tm/transition";

/* ── палитра бренда TalentMind ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const AMBER = "#E8A317";
const INK = "#183833";

const NAV_BLOCKS = [
  { id: "block-1", label: "Corporate culture", color: GREEN },
  { id: "block-2", label: "Candidate report", color: TEAL },
  { id: "block-3", label: "AI assistant", color: AMBER },
];

/* ============================================================
   /platform — единая страница платформы. Переносит целиком три
   страницы с их главными блоками и кнопками:
     #block-1 → Corporate culture (CultureBody)
     #block-2 → Candidate report  (ReportBody)
     #block-3 → AI assistant      (AssistantBody)
   Навигация по блокам — карточки-якоря в hero (плавный скролл
   через Lenis).
   ============================================================ */

const PILLARS: { icon: React.ReactNode; title: string; text: string; href: string }[] = [
  { icon: <Dna className="h-5 w-5" />, title: "Corporate culture", text: "Map your company DNA across 54 parameters and assess every candidate against it", href: "#block-1" },
  { icon: <FileText className="h-5 w-5" />, title: "Candidate report", text: "A detailed breakdown of soft skills and cultural fit from a real interview", href: "#block-2" },
  { icon: <Bot className="h-5 w-5" />, title: "AI assistant", text: "Talk to your whole pipeline in natural language and get answers in seconds", href: "#block-3" },
];

export default function PlatformPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".pl-rise",
        { opacity: 0, y: 42 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, clearProps: "opacity,transform" });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* приход с главной страницы по якорю (#block-1/2/3) — прячем
     переход под завесой: накрываем, мгновенно переходим, проявляем */
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const veil = document.getElementById("tm-veil");
    if (veil) { veil.style.transition = "none"; veil.style.opacity = "1"; veil.style.pointerEvents = "auto"; }
    const t = setTimeout(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (s: string, o?: object) => void } }).__lenis;
      if (lenis) lenis.scrollTo(hash, { offset: -88, immediate: true });
      else document.querySelector(hash)?.scrollIntoView({ block: "start" });
      requestAnimationFrame(() => {
        if (veil) {
          veil.style.transition = "";
          veil.style.opacity = "0";
          setTimeout(() => { veil.style.pointerEvents = "none"; }, 420);
        }
      });
    }, 360);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothJumpTo(href);
  };

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden" style={{ color: INK }}>
      {/* завеса плавных переходов между блоками (в цвет фона страницы) */}
      <div
        id="tm-veil"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100] opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ background: "radial-gradient(125% 90% at 15% 0%, #ffffff 0%, #fbfdf8 45%, #f6faf1 78%, #f2f8ec 100%)" }}
      />

      {/* глобальный прогресс-бар по трём блокам (справа, десктоп) */}
      <BlockNav blocks={NAV_BLOCKS} />

      {/* ============================== HERO ПЛАТФОРМЫ ============================== */}
      <section className="relative mx-auto max-w-[1100px] px-6 pt-32 pb-12 text-center md:px-12 lg:pt-44">
        <h1 className="pl-rise mx-auto max-w-[20ch] text-[clamp(2.2rem,4.6vw,4.6rem)] font-bold leading-[1.05] tracking-tight text-balance" style={{ color: INK }}>
          One platform to hire by your <span style={{ color: GREEN }}>culture</span>
        </h1>
        <p className="pl-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-[#183833]/70">
          Corporate culture, candidate reports and an AI assistant — together in a single workflow. From
          your company DNA to a confident hiring decision
        </p>
        <div className="pl-rise mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="https://app.talentmind.ru" className="ease-smooth group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-lg font-medium text-white shadow-[0_18px_40px_rgba(122,184,0,0.32)] transition-all duration-300 hover:-translate-y-1" style={{ background: GREEN }}>
            Start for free <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
          <a href="/pricing" className="ease-smooth inline-flex items-center gap-2 rounded-2xl border border-[#183833]/15 bg-white/70 px-6 py-4 text-lg font-medium text-[#183833] backdrop-blur transition-all duration-300 hover:-translate-y-1">
            View pricing
          </a>
        </div>

        {/* три столпа платформы — навигация-якоря по блокам ниже */}
        <div className="pl-rise mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {PILLARS.map((p) => (
            <a
              key={p.title}
              href={p.href}
              onClick={(e) => scrollTo(e, p.href)}
              className="ease-smooth group rounded-3xl border border-[#e8efe6] bg-white/95 p-5 shadow-[0_18px_44px_rgba(24,56,51,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(24,56,51,0.10)]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-105" style={{ background: `${GREEN}1a`, color: GREEN }}>{p.icon}</span>
              <p className="mt-3 text-base font-bold" style={{ color: INK }}>{p.title}</p>
              <p className="mt-1.5 text-sm leading-snug text-[#183833]/60">{p.text}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ===================== БЛОКИ ===================== */}
      <div id="block-1" className="scroll-mt-24">
        <CultureBody embedded />
      </div>

      <div id="block-2" className="scroll-mt-24">
        <ReportBody embedded prevHref="#params" nextHref="#block-3" prevLabel="54 parameters" nextLabel="AI assistant" />
      </div>

      <div id="block-3" className="scroll-mt-24">
        <AssistantBody embedded />
      </div>

      {/* ===================== ФИНАЛЬНЫЙ CTA ===================== */}
      <section className="relative mx-auto my-24 max-w-[1100px] px-6 md:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center text-white shadow-[0_40px_90px_rgba(122,184,0,0.32)] md:px-16" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #5e9400 100%)` }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-[90px]" />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-5xl">Bring the whole platform to your hiring</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">
            Culture profile, candidate reports and the AI assistant in one place. First 5 analyses free
          </p>
          <a href="https://app.talentmind.ru" className="ease-smooth relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1" style={{ color: GREEN }}>
            Start for free →
          </a>
        </div>
      </section>
    </div>
  );
}
