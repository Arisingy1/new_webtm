"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dna, Check, AlertTriangle, Sparkles, Target } from "lucide-react";

/* ── палитра бренда TalentMind ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const AMBER = "#E8A317";
const RED = "#FF5252";

/* ============================================================
   /culture — «Корпоративная культура».
   • Hero — «Формируем срез вашей корпоративной культуры».
   • Блок «ДНК компании» — появляется параллаксом: уровень
     соответствия + культурный фит.
   • Закреплённый блок «Анализируемые параметры»: заголовок
     разъезжается в стороны, появляются 3 ряда блоков (54 параметра
     OCP), которые при прокрутке плавно листаются слева направо;
     карточки в фокусе увеличиваются/проявляются, на краях —
     размываются и уменьшаются.
   ============================================================ */

/* измерения OCP (цвета) */
const DIM: Record<string, [string, string]> = {
  inno: ["Innovation", "#7AB800"],
  stab: ["Stability", "#11AFCC"],
  people: ["People orientation", "#E8A317"],
  result: ["Results orientation", "#FF6B57"],
  detail: ["Attention to detail", "#2E9E8F"],
  team: ["Team orientation", "#5BA528"],
  aggr: ["Competitiveness", "#E07B39"],
  cross: ["Culture profile", "#5B8BB0"],
};

type P = { n: number; ru: string; dim: keyof typeof DIM; find: string };
const PARAMS: P[] = [
  { n: 1, ru: "Flexibility", dim: "inno", find: "Willingness to adapt approaches, processes and structures to new conditions" },
  { n: 2, ru: "Adaptability", dim: "inno", find: "A positive attitude toward change and the ability to reinvent" },
  { n: 3, ru: "Innovation", dim: "inno", find: "Emphasis on creating new things, original solutions and R&D" },
  { n: 4, ru: "Seizing opportunities", dim: "inno", find: "Speed of response to market signals and proactivity" },
  { n: 5, ru: "Openness to experimentation", dim: "inno", find: "A culture of A/B testing, prototyping and MVPs" },
  { n: 6, ru: "Risk appetite", dim: "inno", find: "Decision-making under uncertainty and tolerance for failure" },
  { n: 7, ru: "Few rigid constraints", dim: "inno", find: "Minimal bureaucracy, trust and autonomy" },
  { n: 8, ru: "Stability", dim: "stab", find: "Resilience, long-term planning and low turnover" },
  { n: 9, ru: "Predictability", dim: "stab", find: "Clear processes, guidelines and well-defined expectations" },
  { n: 10, ru: "Prudence", dim: "stab", find: "A measured approach, risk management and due diligence" },
  { n: 11, ru: "Rule orientation", dim: "stab", find: "Adherence to procedures, compliance and standardization" },
  { n: 12, ru: "Job security", dim: "stab", find: "Low turnover and care for career growth" },
  { n: 13, ru: "Low conflict levels", dim: "stab", find: "A harmonious atmosphere that avoids open confrontation" },
  { n: 14, ru: "Fairness", dim: "people", find: "Equal opportunities, transparent criteria and no favoritism" },
  { n: 15, ru: "Respect for individual rights", dim: "people", find: "Personal boundaries, work-life balance and an individual approach" },
  { n: 16, ru: "Tolerance", dim: "people", find: "Acceptance of differences and openness to diverse viewpoints" },
  { n: 17, ru: "Support", dim: "people", find: "Mentorship, helping colleagues and psychological safety" },
  { n: 18, ru: "People orientation", dim: "people", find: "Decisions that account for their impact on employees" },
  { n: 19, ru: "Growth opportunities", dim: "people", find: "Training, development, internal transfers and career tracks" },
  { n: 20, ru: "Recognition of achievements", dim: "people", find: "A culture of appreciation, public recognition and bonuses" },
  { n: 21, ru: "Action orientation", dim: "result", find: "A bias for action over discussion and fast execution" },
  { n: 22, ru: "Achievement orientation", dim: "result", find: "Ambitious goals, OKRs and a drive to set records" },
  { n: 23, ru: "High standards", dim: "result", find: "A high bar for quality and zero tolerance for mediocrity" },
  { n: 24, ru: "High expectations", dim: "result", find: "Clear KPIs, regular performance reviews and accountability" },
  { n: 25, ru: "Results orientation", dim: "result", find: "Evaluation by outcome rather than process; a data-driven approach" },
  { n: 26, ru: "Pay for performance", dim: "result", find: "Variable pay, bonuses and equity tied to achievements" },
  { n: 27, ru: "Focus on quality", dim: "result", find: "A zero-defect culture, QA processes and pride in the product" },
  { n: 28, ru: "Analytical mindset", dim: "detail", find: "Decisions grounded in data, research and metrics" },
  { n: 29, ru: "Attention to detail", dim: "detail", find: "Thorough review, documentation and peer review" },
  { n: 30, ru: "Precision", dim: "detail", find: "Clear wording, specifications and standards" },
  { n: 31, ru: "Strong organization", dim: "detail", find: "Structured processes and project management" },
  { n: 32, ru: "Team orientation", dim: "team", find: "Collective achievements valued above individual ones" },
  { n: 33, ru: "Open information sharing", dim: "team", find: "Open communication channels, a wiki and transparency" },
  { n: 34, ru: "Collaboration", dim: "team", find: "Cross-functional teams and pair work" },
  { n: 35, ru: "Friendly relationships", dim: "team", find: "Team-building, informal interaction and company life" },
  { n: 36, ru: "Fitting into the team", dim: "team", find: "Cultural fit during hiring and onboarding" },
  { n: 37, ru: "Competitiveness", dim: "aggr", find: "A focus on beating competitors and market aggression" },
  { n: 38, ru: "Assertiveness", dim: "aggr", find: "Forcefulness in negotiations and capturing market share" },
  { n: 39, ru: "Decisiveness", dim: "aggr", find: "Fast decisions with no paralysis by analysis" },
  { n: 40, ru: "Initiative", dim: "aggr", find: "Employees find problems and solutions on their own" },
  { n: 41, ru: "Personal accountability", dim: "aggr", find: "A culture of ownership: “this is my responsibility”" },
  { n: 42, ru: "Direct conflict resolution", dim: "aggr", find: "Open discussions, direct feedback and no politics" },
  { n: 43, ru: "Work intensity", dim: "aggr", find: "A culture of overwork or, conversely, its absence" },
  { n: 44, ru: "Reflectiveness", dim: "cross", find: "Retrospectives, learning from mistakes and self-awareness" },
  { n: 45, ru: "Autonomy", dim: "cross", find: "Freedom in decisions and minimal micromanagement" },
  { n: 46, ru: "Unified culture", dim: "cross", find: "A strong identity and shared values" },
  { n: 47, ru: "Informality", dim: "cross", find: "Open offices, first-name basis and a casual style" },
  { n: 48, ru: "Ease of communication", dim: "cross", find: "A relaxed atmosphere, humor and a flat hierarchy" },
  { n: 49, ru: "Composure", dim: "cross", find: "No panic in a crisis and measured reactions" },
  { n: 50, ru: "Enthusiasm", dim: "cross", find: "Engagement, passion and pride in the company" },
  { n: 51, ru: "Distinctiveness", dim: "cross", find: "A strong employer brand: “we’re not like everyone else”" },
  { n: 52, ru: "Reputation", dim: "cross", find: "Care for image, PR and community relations" },
  { n: 53, ru: "Social responsibility", dim: "cross", find: "An ESG agenda, volunteering and eco initiatives" },
  { n: 54, ru: "Clear philosophy", dim: "cross", find: "Mission and values that genuinely shape decisions" },
];

const ROWS: P[][] = [PARAMS.slice(0, 18), PARAMS.slice(18, 36), PARAMS.slice(36, 54)];

/* ДНК компании — 7 измерений OCP (демо-профиль) */
const DNA: [string, number, string][] = [
  ["Innovation", 64, GREEN],
  ["Stability", 78, TEAL],
  ["People orientation", 72, AMBER],
  ["Results orientation", 81, "#FF6B57"],
  ["Attention to detail", 75, "#2E9E8F"],
  ["Team orientation", 69, "#5BA528"],
  ["Competitiveness", 58, "#E07B39"],
];

export default function CulturePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      /* hero */
      gsap.fromTo(".cult-rise",
        { opacity: 0, y: 42 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, clearProps: "opacity,transform" });

      /* блоки ДНК — появление из блюра + лёгкое увеличение */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 54, filter: "blur(14px)", scale: 0.95 },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", scale: 1, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%", end: "top 54%", scrub: 1 } });
      });

      /* DESKTOP — закреплённый блок «Анализируемые параметры» */
      mm.add("(min-width: 1024px)", () => {
        const section = pinRef.current!;
        const rows = gsap.utils.toArray<HTMLElement>(".param-row");

        /* Оптимизация: статичный центр каждой карточки кэшируем (без чтения
           layout в кадре). В кадре только читаем x треков (дёшево) и пишем
           стиль ТОЛЬКО тем карточкам, у кого фокус реально изменился. */
        type M = { el: HTMLElement; track: HTMLElement; base: number; le: number };
        let metrics: M[] = [];
        const measure = () => {
          metrics = [];
          rows.forEach((track) => {
            const tx = Number(gsap.getProperty(track, "x")) || 0;
            track.querySelectorAll<HTMLElement>(".param-card").forEach((el) => {
              const r = el.getBoundingClientRect();
              metrics.push({ el, track, base: r.left + el.offsetWidth / 2 - tx, le: -1 });
            });
          });
        };
        const focus = () => {
          const cx = window.innerWidth / 2;
          const band = window.innerWidth * 0.46;
          const tx = new Map<HTMLElement, number>();
          rows.forEach((t) => tx.set(t, Number(gsap.getProperty(t, "x")) || 0));
          for (let i = 0; i < metrics.length; i++) {
            const m = metrics[i];
            const n = Math.min(Math.abs(m.base + tx.get(m.track)! - cx) / band, 1);
            const e = Math.round(n * n * (3 - 2 * n) * 100) / 100; // smoothstep, квант 0.01
            if (e === m.le) continue; // фокус не изменился — пропускаем
            m.le = e;
            const s = m.el.style;
            s.transform = `scale(${(1 - 0.16 * e).toFixed(3)})`;
            s.filter = e < 0.02 ? "none" : `blur(${(9 * e).toFixed(2)}px)`;
            s.opacity = (1 - 0.6 * e).toFixed(3);
          }
        };

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top top", end: "+=320%", pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: focus, onRefresh: () => { measure(); focus(); } },
        });
        /* заголовок разъезжается в стороны, ряды проявляются */
        tl.to(".params-head-left", { xPercent: -190, autoAlpha: 0, ease: "power1.in", duration: 0.16 }, 0)
          .to(".params-head-right", { xPercent: 190, autoAlpha: 0, ease: "power1.in", duration: 0.16 }, 0)
          .to(".params-meta", { autoAlpha: 0, y: -24, duration: 0.12 }, 0)
          .fromTo(".param-rows", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: "power2.out" }, 0.06);
        /* ряды листаются слева направо: спейсеры по краям дают первой и
           последней карточке дойти до центра — видны все 54 параметра */
        rows.forEach((t) => {
          tl.fromTo(t, { x: 0 }, { x: () => -(t.scrollWidth - window.innerWidth), ease: "none", duration: 0.8 }, 0.2);
        });
        measure(); focus();

        return () => { tl.scrollTrigger?.kill(); tl.kill(); metrics.forEach((m) => m.el.removeAttribute("style")); };
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => { mm.revert(); ctx.revert(); };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden" style={{ color: INK }}>
      {/* фокус-стиль карточек параметров (только desktop) */}
      <style>{`
        @media (min-width:1024px){
          .param-card{ transform: scale(.84); filter: blur(9px); opacity:.4; }
          .param-row::-webkit-scrollbar{ display:none; }
        }
      `}</style>


      {/* ============================== HERO ============================== */}
      <section className="relative mx-auto max-w-[1100px] px-6 pt-32 pb-20 text-center md:px-12 lg:pt-44">
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

      {/* ===================== ДНК КОМПАНИИ ===================== */}
      <section id="dna" className="relative mx-auto max-w-[1280px] px-6 pb-28 md:px-12">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: GREEN }}>
            <Dna className="h-4 w-4" /> Company DNA
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: INK }}>
            We factor in your company DNA when analyzing <span style={{ color: GREEN }}>every candidate</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#183833]/65">
            Your culture profile becomes the benchmark. For each candidate we calculate a match score
            and break cultural fit down into strong alignment points and areas to watch
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ДНК — 7 измерений OCP */}
          <div className="reveal rounded-[28px] border border-[#e8efe6] bg-white/95 p-7 shadow-[0_24px_60px_rgba(24,56,51,0.09)]">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: `${GREEN}1a` }}><Dna className="h-5 w-5" style={{ color: GREEN }} /></span>
              <div>
                <p className="text-base font-bold" style={{ color: INK }}>Company culture profile</p>
                <p className="text-xs text-[#183833]/50">7 dimensions · 54 parameters</p>
              </div>
            </div>
            <div className="mt-6 space-y-3.5">
              {DNA.map(([name, val, c]) => (
                <div key={name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium" style={{ color: INK }}>{name}</span>
                    <span className="font-bold" style={{ color: c }}>{val}</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#eef2ec]">
                    <div className="h-full rounded-full" style={{ width: `${val}%`, background: c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Уровень соответствия + культурный фит */}
          <div className="flex flex-col gap-5">
            <div className="reveal flex items-center gap-5 rounded-[28px] border border-[#e8efe6] bg-white/95 p-7 shadow-[0_24px_60px_rgba(24,56,51,0.09)]">
              <Ring value={74} />
              <div>
                <p className="flex items-center gap-1.5 text-base font-bold" style={{ color: INK }}><Target className="h-4 w-4" style={{ color: GREEN }} /> Match score</p>
                <p className="mt-1.5 text-sm leading-snug text-[#183833]/65">
                  How closely the candidate’s values and behavior align with your company DNA
                </p>
              </div>
            </div>

            <div className="reveal rounded-[28px] border border-[#e8efe6] bg-white/95 p-7 shadow-[0_24px_60px_rgba(24,56,51,0.09)]">
              <p className="text-base font-bold" style={{ color: INK }}>Cultural fit</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> Alignment points</p>
                  <ul className="mt-2 space-y-1.5">
                    {["Execution discipline", "Respect for areas of responsibility", "Analytical approach"].map((t) => (
                      <li key={t} className="flex items-start gap-1.5 text-xs leading-snug text-[#183833]/70"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GREEN }} /> {t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: AMBER }}><AlertTriangle className="h-3.5 w-3.5" /> Areas to watch</p>
                  <ul className="mt-2 space-y-1.5">
                    {["Low initiative", "Limited flexibility to change"].map((t) => (
                      <li key={t} className="flex items-start gap-1.5 text-xs leading-snug text-[#183833]/70"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: AMBER }} /> {t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== АНАЛИЗИРУЕМЫЕ ПАРАМЕТРЫ (pinned) ===================== */}
      <section id="params" ref={pinRef} className="relative w-full overflow-hidden lg:h-screen">
        {/* заголовок */}
        <div className="relative z-20 px-6 pt-16 text-center lg:pointer-events-none lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-center lg:justify-center lg:pt-0">
          <p className="params-meta inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: GREEN }}>
            <Sparkles className="h-4 w-4" /> 54 parameters
          </p>
          <h2 className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-4xl font-bold tracking-tight sm:text-6xl" style={{ color: INK }}>
            <span className="params-head-left">Parameters</span>
            <span className="params-head-right" style={{ color: GREEN }}>we analyze</span>
          </h2>
          <p className="params-meta mx-auto mt-4 max-w-none text-lg leading-relaxed text-[#183833]/65 sm:whitespace-nowrap">
            Seven culture dimensions broken down into concrete signals
          </p>
        </div>

        {/* три ряда блоков */}
        <div className="param-rows relative z-10 mt-10 space-y-4 pb-16 lg:absolute lg:inset-0 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:gap-3 lg:space-y-0 lg:pb-0">
          {ROWS.map((row, ri) => (
            <div
              key={ri}
              className="param-row flex gap-3 overflow-x-auto px-6 pb-3 [scrollbar-width:none] lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {/* спейсер: первая карточка стартует по центру + сдвиг ряда (шахматный порядок) */}
              <div aria-hidden className="hidden shrink-0 lg:block" style={{ width: `calc((100vw - 252px) / 2 + ${[0, 132, 66][ri] ?? 0}px)` }} />
              {row.map((p) => {
                const [label, c] = DIM[p.dim];
                return (
                  <div key={p.n} className="param-card w-[230px] shrink-0 rounded-2xl border border-[#e8efe6] bg-white p-4 shadow-[0_14px_40px_rgba(24,56,51,0.08)] lg:w-[252px]">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black tabular-nums" style={{ color: c }}>{p.n.toString().padStart(2, "0")}</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: `${c}16`, color: c }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} /> {label}
                      </span>
                    </div>
                    <p className="mt-2.5 text-base font-bold leading-tight" style={{ color: INK }}>{p.ru}</p>
                    <p className="mt-1.5 text-xs leading-snug text-[#183833]/60">{p.find}</p>
                  </div>
                );
              })}
              {/* спейсер: последняя карточка доходит до центра */}
              <div aria-hidden className="hidden shrink-0 lg:block" style={{ width: "calc((100vw - 252px) / 2)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
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
    </div>
  );
}

/* кольцо уровня соответствия */
function Ring({ value }: { value: number }) {
  const r = 38, c = 2 * Math.PI * r, dash = ((value / 100) * c).toFixed(1);
  return (
    <div className="relative h-[104px] w-[104px] shrink-0 text-center">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <defs><linearGradient id="cRing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={TEAL} /><stop offset="100%" stopColor={GREEN} /></linearGradient></defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e9efe6" strokeWidth="9" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="url(#cRing)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${dash} ${c.toFixed(1)}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: GREEN }}>{value}%</span>
      </div>
    </div>
  );
}
