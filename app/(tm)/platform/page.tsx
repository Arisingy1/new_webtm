"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CultureBody from "@/components/tm/pages/CultureBody";
import ReportBody from "@/components/tm/pages/ReportBody";
import AssistantBody from "@/components/tm/pages/AssistantBody";
import BlockNav from "@/components/tm/BlockNav";
import PlatformFlow from "@/components/tm/PlatformFlow";
import GeoCulture from "@/components/tm/GeoCulture";
import { useLocale } from "@/components/tm/LocaleProvider";
import { localize, type Locale } from "@/lib/i18n";
import { PLATFORM } from "@/lib/content/platform";

/* ── палитра бренда TalentMind ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const AMBER = "#E8A317";
const INK = "#183833";

/* подписи прогресс-бара по локалям (+ гео-блок только для арабского) */
const NAV_LABELS: Record<Locale, { geo: string; culture: string; report: string; assistant: string }> = {
  en: { geo: "Geoculture", culture: "Corporate culture", report: "Candidate report", assistant: "AI assistant" },
  es: { geo: "Geocultura", culture: "Cultura corporativa", report: "Informe del candidato", assistant: "Asistente de IA" },
  pt: { geo: "Geocultura", culture: "Cultura corporativa", report: "Relatório do candidato", assistant: "Assistente de IA" },
  ar: { geo: "الجيوثقافة", culture: "الثقافة المؤسسية", report: "تقرير المرشّح", assistant: "مساعد الذكاء الاصطناعي" },
};

/* ============================================================
   /platform — единая страница платформы. Переносит целиком три
   страницы с их главными блоками и кнопками:
     #block-1 → Corporate culture (CultureBody)
     #block-2 → Candidate report  (ReportBody)
     #block-3 → AI assistant      (AssistantBody)
   Навигация по блокам — карточки-якоря в hero (плавный скролл
   через Lenis).
   ============================================================ */

export default function PlatformPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const c = PLATFORM[locale];
  const nl = NAV_LABELS[locale];
  const navBlocks = [
    ...(locale === "ar" ? [{ id: "geo-culture", label: nl.geo, color: TEAL }] : []),
    { id: "block-1", label: nl.culture, color: GREEN },
    { id: "block-2", label: nl.report, color: TEAL },
    { id: "block-3", label: nl.assistant, color: AMBER },
  ];

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

  return (
    <div ref={rootRef} className="pf-uniform relative w-full overflow-hidden" style={{ color: INK }}>
      {/* все заголовки разделов на странице платформы — одного размера */}
      <style>{`.pf-uniform :is(h1, h2) { font-size: clamp(2rem, 3.4vw, 3.1rem) !important; line-height: 1.12 !important; }`}</style>

      {/* завеса плавных переходов между блоками (в цвет фона страницы) */}
      <div
        id="tm-veil"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100] opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ background: "radial-gradient(125% 90% at 15% 0%, #ffffff 0%, #fbfdf8 45%, #f6faf1 78%, #f2f8ec 100%)" }}
      />

      {/* глобальный прогресс-бар по трём блокам (справа, десктоп) */}
      <BlockNav blocks={navBlocks} />

      {/* ============================== HERO ПЛАТФОРМЫ ============================== */}
      <section className="relative mx-auto max-w-[1100px] px-6 pt-32 pb-12 text-center md:px-12 lg:pt-44">
        <h1 className="pl-rise mx-auto max-w-[20ch] text-[clamp(2.2rem,4.6vw,4.6rem)] font-bold leading-[1.05] tracking-tight text-balance" style={{ color: INK }}>
          {c.pre}<span style={{ color: GREEN }}>{c.accent}</span>{c.post}
        </h1>
        <p className="pl-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-[#183833]/70">{c.p}</p>
        <div className="pl-rise mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="https://app.talentmind.app" className="ease-smooth group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-lg font-medium text-white shadow-[0_18px_40px_rgba(122,184,0,0.32)] transition-all duration-300 hover:-translate-y-1" style={{ background: GREEN }}>
            {c.ctaStart} <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
          <a href={localize("/pricing", locale)} className="ease-smooth inline-flex items-center gap-2 rounded-2xl border border-[#183833]/15 bg-white/70 px-6 py-4 text-lg font-medium text-[#183833] backdrop-blur transition-all duration-300 hover:-translate-y-1">
            {c.ctaPricing}
          </a>
        </div>

        {/* путь платформы — интерактивный таймлайн из трёх блоков */}
        <PlatformFlow />
      </section>

      {/* ===================== БЛОКИ ===================== */}
      {/* геокультура — только для арабской версии, первым блоком (до корп. культуры) */}
      {locale === "ar" && <GeoCulture />}

      <div id="block-1" className="scroll-mt-24">
        <CultureBody embedded />
      </div>

      <div id="block-2" className="scroll-mt-24">
        <ReportBody embedded prevHref="#params" nextHref="#block-3" />
      </div>

      <div id="block-3" className="scroll-mt-24">
        <AssistantBody embedded />
      </div>

      {/* ===================== ФИНАЛЬНЫЙ CTA ===================== */}
      <section className="relative mx-auto my-24 max-w-[1100px] px-6 md:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center text-white shadow-[0_40px_90px_rgba(122,184,0,0.32)] md:px-16" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #5e9400 100%)` }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-[90px]" />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-5xl">{c.cta.title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">{c.cta.sub}</p>
          <a href="https://app.talentmind.app" className="ease-smooth relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1" style={{ color: GREEN }}>
            {c.cta.button} →
          </a>
        </div>
      </section>
    </div>
  );
}
