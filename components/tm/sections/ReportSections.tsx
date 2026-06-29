"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, ChevronUp, ChevronDown } from "lucide-react";
import {
  CandidateDecision, RisksStrengthsPsycho, ComplianceDiagram,
  SoftSkillsMap, StarCases, Recommendations,
} from "@/components/tm/reportBlocks";
import { smoothJumpTo } from "@/components/tm/transition";

/* ── палитра бренда TalentMind ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const RED = "#FF5252";
const AMBER = "#E8A317";

/* ============================================================
   ReportSections — закреплённый (pinned) разбор отчёта по
   кандидату: красивый кроссфейд текст+картинка по 7 разделам +
   горизонтальный прогресс-бар. Кнопки «назад» (сверху) и «далее»
   (снизу) перемещают к соседнему БЛОКУ страницы (передаются через
   prevHref/nextHref — только на /platform).
   Данные STEPS экспортируются для hero-ноутбука в ReportBody.
   ============================================================ */

/* кольцо индекса корпоративной совместимости */
export function RingGauge({ value }: { value: number }) {
  const r = 34, c = 2 * Math.PI * r, off = c - (value / 100) * c;
  return (
    <div className="relative h-[96px] w-[96px]">
      <svg viewBox="0 0 92 92" className="h-full w-full -rotate-90">
        <defs><linearGradient id="cgGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={TEAL} /><stop offset="100%" stopColor={GREEN} /></linearGradient></defs>
        <style>{`@keyframes ringDraw{from{stroke-dashoffset:${c.toFixed(1)}}to{stroke-dashoffset:${off.toFixed(1)}}}`}</style>
        <circle cx="46" cy="46" r={r} fill="none" stroke="#e3eedb" strokeWidth="8" />
        <circle cx="46" cy="46" r={r} fill="none" stroke="url(#cgGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={c.toFixed(1)} style={{ strokeDashoffset: off.toFixed(1), animation: "ringDraw 1.2s cubic-bezier(.22,1,.36,1) .2s both" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl font-bold" style={{ color: INK }}>{value}%</span></div>
    </div>
  );
}

/* живая карточка «Оценка корпоративной совместимости» (для разбора) */
export function CompatCard() {
  const dims: [string, number, number][] = [
    ["Stability & processes", 82, 78],
    ["Results orientation", 80, 78],
    ["Attention to detail", 76, 74],
    ["People orientation", 70, 68],
    ["Teamwork", 64, 78],
  ];
  const tone = (g: number) => (g >= 0 ? { c: GREEN, l: "On target" } : g >= -8 ? { c: AMBER, l: "Close" } : { c: RED, l: "Below benchmark" });
  return (
    <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] to-[#eef7e0] p-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#183833]/45">Compatibility index</p>
        <div className="mt-2"><RingGauge value={74} /></div>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm" style={{ color: GREEN }}>High compatibility</span>
        <p className="mt-2 text-[11px] leading-snug text-[#183833]/65">The candidate's profile is close to the company DNA: processes, results, and quality</p>
      </div>
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-2 text-sm font-bold" style={{ color: INK }}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ background: `${GREEN}1a` }}><Target className="h-3.5 w-3.5" style={{ color: GREEN }} /></span> Match by dimension</p>
          <span className="hidden items-center gap-1.5 text-[10px] text-[#183833]/45 sm:flex"><span className="inline-block h-2.5 w-3.5 rounded-full border border-[#cfd6ce]" style={{ background: "#e0e5df" }} /> gap</span>
        </div>
        <div className="mt-3 space-y-2.5">
          {dims.map(([name, val, ref]) => {
            const g = val - ref, t = tone(g);
            return (
              <div key={name}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium" style={{ color: INK }}>{name}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ background: `${t.c}1a`, color: t.c }}>{t.l}</span>
                    <span className="text-xs font-bold tabular-nums" style={{ color: t.c }}>{val}<span className="font-medium text-[#183833]/35"> / {ref}</span></span>
                  </span>
                </div>
                <div className="relative mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-[#eef2ec]">
                  {g < 0 && <div className="absolute inset-y-0 rounded-r-full" style={{ left: `${val}%`, width: `${-g}%`, background: "repeating-linear-gradient(-45deg,#dfe4de,#dfe4de 3px,#eceff0 3px,#eceff0 6px)" }} />}
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${val}%`, background: t.c }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* img — fallback-картинка; node — живой блок отчёта. */
export const STEPS: { n: string; title: string; text: string; img?: string; node?: React.ReactNode }[] = [
  {
    n: "01",
    title: "Candidate & match",
    text: "The basic profile, experience, and overall match to the role's requirements — at a glance. AI builds a transparent candidate profile with arguments for and against, giving you a reliable basis for your final decision",
    node: <CandidateDecision />,
  },
  {
    n: "02",
    title: "Cultural fit assessment",
    text: "How well the candidate's values and behavior match the company's DNA and cultural code. The platform computes a compatibility index and breaks it down across key culture dimensions — highlighting gaps against the benchmark",
    node: <CompatCard />,
  },
  {
    n: "03",
    title: "Deep analytics & hidden risks",
    text: "The system looks beyond the résumé. Surface true strengths, red flags (such as flight risk), and analyze psycholinguistics: how the candidate shares responsibility (the \"I\"/\"We\" balance) and their locus of control",
    node: <RisksStrengthsPsycho />,
  },
  {
    n: "04",
    title: "Visualizing growth areas",
    text: "A clear radar chart compares the candidate's actual skills with the benchmark profile for your role. Instantly gauge the average gap and spot the most critical competency shortfalls",
    node: <ComplianceDiagram />,
  },
  {
    n: "05",
    title: "Detailed soft-skills map",
    text: "Every soft skill, quantified. The platform scores leadership, communication, empathy, and critical thinking, backing each score with evidence from the conversation",
    node: <SoftSkillsMap />,
  },
  {
    n: "06",
    title: "Experience assessment with the STAR method",
    text: "AI automatically extracts real work cases from the interview and structures them with the STAR method — Situation, Task, Action, and Result — to prove the candidate's real competence",
    node: <StarCases />,
  },
  {
    n: "07",
    title: "Preparing for the final round",
    text: "The platform generates a list of targeted questions for the hiring manager to precisely probe the weak spots and risks found in the first interview",
    node: <Recommendations />,
  },
];
const TOTAL = STEPS.length;

export default function ReportSections({
  prevHref, nextHref, prevLabel = "Back", nextLabel = "Next",
}: {
  prevHref?: string;
  nextHref?: string;
  prevLabel?: string;
  nextLabel?: string;
} = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* ── закреплённый разбор: текст и картинка меняются (как было) ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add("(min-width: 1024px)", () => {
        const texts = gsap.utils.toArray<HTMLElement>(".sc-text");
        const imgs = gsap.utils.toArray<HTMLElement>(".sc-img");
        const N = texts.length;
        if (!N) return;

        texts.forEach((el, i) => gsap.set(el, { autoAlpha: i ? 0 : 1, y: i ? 60 : 0 }));
        imgs.forEach((el, i) => gsap.set(el, { autoAlpha: i ? 0 : 1, y: i ? 70 : 0, scale: i ? 0.94 : 1 }));

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".scrolly-pin",
            start: "top top",
            end: "+=" + ((N - 1) * 95 + 20) + "%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.round(self.progress * (N - 1))),
          },
        });

        for (let i = 1; i < N; i++) {
          const at = i - 1;
          tl.to(texts[i - 1], { autoAlpha: 0, y: -60, ease: "power2.in", duration: 0.45 }, at)
            .to(imgs[i - 1], { autoAlpha: 0, y: -70, scale: 0.94, ease: "power2.in", duration: 0.45 }, at)
            .to(texts[i], { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.55 }, at + 0.4)
            .to(imgs[i], { autoAlpha: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.55 }, at + 0.4)
            .to({}, { duration: 0.5 }, at + 1);
        }

        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
      });

      /* MOBILE — простая стопка */
      mm.add("(max-width: 1023px)", () => {
        const blocks = gsap.utils.toArray<HTMLElement>(".sc-mob");
        const tw = blocks.map((el) =>
          gsap.fromTo(el,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } }));
        return () => tw.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => { mm.revert(); ctx.revert(); };
  }, []);

  /* переход к соседнему блоку страницы — плавным кроссфейдом */
  const goToSection = (href?: string) => {
    if (href) smoothJumpTo(href);
  };

  return (
    <div ref={rootRef} id="razbor" className="relative w-full" style={{ color: INK }}>
      {/* ДЕСКТОП — статичная секция, текст+картинка меняются */}
      <section className="scrolly-pin relative hidden h-screen items-center overflow-hidden lg:flex">
        {/* НАЗАД — сверху (к предыдущему блоку страницы) */}
        {prevHref && (
          <button
            type="button"
            onClick={() => goToSection(prevHref)}
            aria-label={`Back to ${prevLabel}`}
            className="ease-smooth group absolute left-1/2 top-24 z-30 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#183833]/12 bg-white/85 px-5 py-2.5 text-sm font-semibold text-[#183833] shadow-[0_10px_26px_rgba(24,56,51,0.10)] backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7AB800]/40 hover:text-[#7AB800] active:scale-[0.97]"
          >
            <ChevronUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" /> {prevLabel}
          </button>
        )}

        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 items-center gap-14 px-10">
          {/* ЛЕВО — сменяющийся текст + прогресс */}
          <div className="flex h-[82vh] flex-col justify-center">
            <div className="relative h-[420px]">
              {STEPS.map((s) => (
                <div key={s.n} className="sc-text absolute inset-0 flex flex-col justify-center">
                  <span className="select-none text-[4.5rem] font-black leading-none tracking-tighter" style={{ color: `${GREEN}3a` }}>
                    {s.n}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GREEN }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
                    Section {s.n} / {TOTAL.toString().padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-[clamp(2rem,2.7vw,3.1rem)] font-bold leading-[1.06] tracking-tight text-balance" style={{ color: INK }}>
                    {s.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-pretty text-[#183833]/70">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>

            {/* индикатор прогресса по 7 разделам */}
            <div className="mt-8 flex items-center gap-2">
              {STEPS.map((s, i) => (
                <div key={s.n} className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "#dde6dd" }}>
                  <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: i <= active ? "100%" : "0%", background: GREEN }} />
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm font-medium" style={{ color: `${INK}80` }}>
              {(active + 1).toString().padStart(2, "0")} / {TOTAL.toString().padStart(2, "0")} · {STEPS[active].title}
            </div>
          </div>

          {/* ПРАВО — сменяющаяся картинка */}
          <div className="relative h-[82vh]">
            {STEPS.map((s) => (
              <div key={s.n} className="sc-img absolute inset-0 flex items-center">
                <div className="w-full overflow-hidden rounded-[26px] border border-[#e6ece4] bg-white shadow-[0_30px_80px_rgba(24,56,51,0.12)]">
                  <div className="flex items-center gap-2 border-b border-[#eef2ec] bg-[#fbfdfa] px-5 py-3.5">
                    <span className="h-3 w-3 rounded-full" style={{ background: RED }} />
                    <span className="h-3 w-3 rounded-full" style={{ background: AMBER }} />
                    <span className="h-3 w-3 rounded-full" style={{ background: GREEN }} />
                    <span className="ml-3 truncate text-sm font-medium" style={{ color: `${INK}80` }}>TalentMind · {s.title}</span>
                    <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-[#f1f6ec] px-3 py-1 text-xs font-semibold sm:inline-flex" style={{ color: GREEN }}>Section {s.n}</span>
                  </div>
                  <div className="bg-white p-4 md:p-5">
                    {s.node ?? <img src={s.img} alt={s.title} className="w-full rounded-xl" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ДАЛЕЕ — снизу (к следующему блоку страницы) */}
        {nextHref && (
          <button
            type="button"
            onClick={() => goToSection(nextHref)}
            aria-label={`Next: ${nextLabel}`}
            className="ease-smooth group absolute bottom-7 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(122,184,0,0.36)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
            style={{ background: GREEN }}
          >
            {nextLabel} <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        )}
      </section>

      {/* МОБИЛЬНАЯ ВЕРСИЯ — код-блоки вместо картинок (в стиле сайта) */}
      <section className="px-4 pb-16 pt-4 sm:px-6 lg:hidden">
        {STEPS.map((s) => (
          <div key={s.n} className="sc-mob mb-14">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GREEN }}>
              <span className="grid h-7 w-7 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: GREEN }}>{s.n}</span>
              Section {s.n} / {TOTAL.toString().padStart(2, "0")}
            </span>
            <h2 className="mt-3 text-2xl font-bold leading-[1.1] tracking-tight" style={{ color: INK }}>{s.title}</h2>
            <p className="mt-2 text-base leading-relaxed text-[#183833]/70">{s.text}</p>
            <div className="mt-5">
              {s.node ?? <img src={s.img} alt={s.title} className="w-full rounded-2xl border border-[#e6ece4]" />}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
