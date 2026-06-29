"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dna, Check, AlertTriangle, Target, ChevronRight } from "lucide-react";

/* ── палитра бренда TalentMind ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const AMBER = "#E8A317";

/* ============================================================
   CultureSections — контентные блоки страницы «Корпоративная
   культура» без hero и CTA. Переиспользуется на /culture и на
   /platform.
   • Блок «ДНК компании» — появляется параллаксом.
   • «Анализируемые параметры» — лёгкий интерактивный обозреватель
     по 8 измерениям OCP (без pin-скролла и тяжёлых пер-кадровых
     вычислений — только CSS-переходы).
   ============================================================ */

/* измерения OCP: ключ → [подпись, цвет] (порядок = порядок в UI) */
const DIM_ORDER = ["inno", "stab", "people", "result", "detail", "team", "aggr", "cross"] as const;
type DimKey = (typeof DIM_ORDER)[number];
const DIM: Record<DimKey, [string, string]> = {
  inno: ["Innovation", "#7AB800"],
  stab: ["Stability", "#11AFCC"],
  people: ["People orientation", "#E8A317"],
  result: ["Results orientation", "#FF6B57"],
  detail: ["Attention to detail", "#2E9E8F"],
  team: ["Team orientation", "#5BA528"],
  aggr: ["Competitiveness", "#E07B39"],
  cross: ["Culture profile", "#5B8BB0"],
};

type P = { n: number; ru: string; dim: DimKey; find: string };
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

/* группировка параметров по измерению (порядок — DIM_ORDER) */
const GROUPS: { key: DimKey; label: string; color: string; items: P[] }[] = DIM_ORDER.map((key) => ({
  key,
  label: DIM[key][0],
  color: DIM[key][1],
  items: PARAMS.filter((p) => p.dim === key),
}));

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

export default function CultureSections() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* лёгкое появление блоков из блюра */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 54, filter: "blur(14px)", scale: 0.95 },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", scale: 1, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%", end: "top 54%", scrub: 1 } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full" style={{ color: INK }}>
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

      {/* ===================== АНАЛИЗИРУЕМЫЕ ПАРАМЕТРЫ (обозреватель) ===================== */}
      <ParametersExplorer />
    </div>
  );
}

/* ============================================================
   ParametersExplorer — лёгкий интерактивный обозреватель 54
   параметров по 8 измерениям. Никакого pin-скролла: выбор
   измерения, карточки появляются CSS-каскадом (transform/opacity).
   ============================================================ */
function ParametersExplorer() {
  const [active, setActive] = useState<DimKey>("inno");
  const group = GROUPS.find((g) => g.key === active)!;

  return (
    <section id="params" className="relative mx-auto max-w-[1280px] px-6 pb-28 md:px-12">
      <style>{`
        @keyframes paramCardIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
        .param-card-in { animation: paramCardIn .42s cubic-bezier(.22,1,.36,1) backwards; }
        @media (prefers-reduced-motion: reduce) { .param-card-in { animation: none } }
      `}</style>

      {/* заголовок */}
      <div className="reveal mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: INK }}>
          Parameters <span style={{ color: GREEN }}>we analyze</span>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[#183833]/65">
          Seven culture dimensions broken down into concrete signals. Pick a dimension to explore the parameters behind it
        </p>
      </div>

      <div className="reveal mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
        {/* выбор измерения */}
        <div
          role="tablist"
          aria-label="Culture dimensions"
          className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
        >
          {GROUPS.map((g) => {
            const on = g.key === active;
            return (
              <button
                key={g.key}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(g.key)}
                className={`group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                  on ? "shadow-[0_14px_36px_rgba(24,56,51,0.10)]" : "border-[#e8efe6] bg-white/70 hover:bg-white"
                }`}
                style={on ? { borderColor: `${g.color}66`, background: `${g.color}12` } : undefined}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-110" style={{ background: g.color }} />
                <span className="flex-1 whitespace-nowrap text-sm font-semibold lg:whitespace-normal" style={{ color: on ? g.color : INK }}>{g.label}</span>
                <span className="hidden shrink-0 text-xs font-bold tabular-nums lg:block" style={{ color: on ? g.color : "#18383366" }}>{g.items.length}</span>
                <ChevronRight className={`hidden h-4 w-4 shrink-0 transition-all duration-300 lg:block ${on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`} style={{ color: g.color }} />
              </button>
            );
          })}
        </div>

        {/* панель параметров выбранного измерения */}
        <div
          role="tabpanel"
          className="rounded-[28px] border border-[#e8efe6] bg-white/80 p-5 shadow-[0_24px_60px_rgba(24,56,51,0.07)] sm:p-7"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2.5 text-lg font-bold" style={{ color: INK }}>
              <span className="h-3 w-3 rounded-full" style={{ background: group.color }} />
              {group.label}
            </p>
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: `${group.color}16`, color: group.color }}>
              {group.items.length} parameters
            </span>
          </div>

          {/* key={active} — перезапуск CSS-каскада при смене измерения */}
          <div key={active} className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((p, i) => (
              <div
                key={p.n}
                className="param-card-in rounded-2xl border border-[#eef2ec] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#dfe7da] hover:shadow-[0_16px_40px_rgba(24,56,51,0.09)]"
                style={{ animationDelay: `${i * 32}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black tabular-nums" style={{ color: group.color }}>{p.n.toString().padStart(2, "0")}</span>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: group.color }} />
                </div>
                <p className="mt-2 text-base font-bold leading-tight" style={{ color: INK }}>{p.ru}</p>
                <p className="mt-1.5 text-xs leading-snug text-[#183833]/60">{p.find}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
