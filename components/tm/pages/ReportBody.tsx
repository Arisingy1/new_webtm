"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ReportSections, { STEPS } from "@/components/tm/sections/ReportSections";

/* ── палитра бренда TalentMind ── */
const GREEN = "#7AB800";
const INK = "#183833";

/* ============================================================
   ReportBody — полное тело страницы «Отчёт» (hero с живым
   ноутбуком + разбор + CTA). Используется на /otchet и /platform.
   embedded = встроено в страницу платформы.
   ============================================================ */

export default function ReportBody({
  embedded = false, prevHref, nextHref, prevLabel, nextLabel,
}: {
  embedded?: boolean;
  prevHref?: string;
  nextHref?: string;
  prevLabel?: string;
  nextLabel?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ── авто-прокрутка отчёта внутри ноутбука (hero) ── */
  useEffect(() => {
    const screen = screenRef.current;
    const content = contentRef.current;
    if (!screen || !content) return;

    let raf = 0, y = 0, dir = 1, pauseUntil = 0, paused = false;
    const SPEED = 1.0;
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    screen.addEventListener("mouseenter", onEnter);
    screen.addEventListener("mouseleave", onLeave);

    const tick = (t: number) => {
      const max = content.scrollHeight - screen.clientHeight;
      if (!paused && t > pauseUntil && max > 0) {
        y += SPEED * dir;
        if (y >= max) { y = max; dir = -1; pauseUntil = t + 1600; }
        else if (y <= 0) { y = 0; dir = 1; pauseUntil = t + 1600; }
        content.style.transform = `translateY(${-y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      screen.removeEventListener("mouseenter", onEnter);
      screen.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── входная анимация hero ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".otchet-rise",
        { opacity: 0, y: 42 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, clearProps: "opacity,transform" });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden" style={{ color: INK }}>

      {/* ============================== HERO ============================== */}
      <section className={`relative mx-auto max-w-[1600px] px-6 pb-10 text-center md:px-8 ${embedded ? "pt-10" : "pt-32 lg:pt-40"}`}>
        <h1 className="otchet-rise mx-auto max-w-[18ch] text-[clamp(2.4rem,5vw,4.8rem)] font-bold leading-[1.02] tracking-tight" style={{ color: INK }}>
          A ready <span style={{ color: GREEN }}>report</span> on your candidate
        </h1>
        <p className="otchet-rise mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#183833]/70">
          A detailed breakdown of soft skills and cultural fit, based on a real interview
        </p>
        <div className="otchet-rise mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="/softskill-report/example" className="ease-smooth group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-lg font-medium text-white shadow-[0_18px_40px_rgba(122,184,0,0.32)] transition-all duration-300 hover:-translate-y-1" style={{ background: GREEN }}>
            View the report <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
          <a href="https://app.talentmind.ru" className="ease-smooth inline-flex items-center gap-2 rounded-2xl border border-[#183833]/15 bg-white/70 px-6 py-4 text-lg font-medium text-[#183833] backdrop-blur transition-all duration-300 hover:-translate-y-1">
            Get your report
          </a>
        </div>

        {/* ── ноутбук с живым отчётом (только десктоп; на мобильном убран) ── */}
        <div className="otchet-rise relative z-10 mx-auto mt-8 hidden w-full max-w-[1534px] lg:block">
          <img src="/Group 1222.png" alt="TalentMind — candidate report" className="pointer-events-none w-full select-none" draggable={false} />
          <div ref={screenRef} className="absolute overflow-hidden bg-[#f4f7f6]" style={{ left: "27.6%", top: "20.6%", width: "44.8%", height: "42.2%" }}>
            <div ref={contentRef} className="will-change-transform">
              <div className="px-4 pb-6 pt-4">
                <p className="text-center text-sm font-bold" style={{ color: INK }}>Analysis result</p>
                <div className="mt-3 space-y-2">
                  {STEPS.map((s) => (
                    s.node
                      ? <div key={s.n} className="rounded-lg border border-[#eaefe8] bg-white p-3 shadow-sm">{s.node}</div>
                      : <img key={s.n} src={s.img} alt="" className="w-full rounded-lg border border-[#eaefe8] bg-white shadow-sm" />
                  ))}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#f4f7f6] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#f4f7f6] to-transparent" />
          </div>
        </div>
      </section>

      {/* ===================== ЗАКРЕПЛЁННЫЙ РАЗБОР ===================== */}
      <ReportSections prevHref={prevHref} nextHref={nextHref} prevLabel={prevLabel} nextLabel={nextLabel} />

      {/* ===================== CTA ===================== */}
      {!embedded && (
        <section className="relative mx-auto mb-24 max-w-[1100px] px-6 md:px-12">
          <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center text-white shadow-[0_40px_90px_rgba(122,184,0,0.32)] md:px-16" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #5e9400 100%)` }}>
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-[90px]" />
            <h2 className="relative text-3xl font-bold tracking-tight sm:text-5xl">Get a report like this for your candidate</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">
              Upload an interview recording and TalentMind returns an objective breakdown in minutes. First 5 reports free
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
