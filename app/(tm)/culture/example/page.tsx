"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Dna, Building2, Globe, Users, FileText, Check, AlertTriangle,
  Target, Compass, UserCheck, Lightbulb, ShieldCheck,
  X, TrendingUp, TrendingDown, ExternalLink, MessageSquareQuote,
} from "lucide-react";

/* ── палитра ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const AMBER = "#E8A317";
const RED = "#FF5252";

/* ============================================================
   /culture/example — «Пример отчёта по корпоративной культуре».
   Полностью свёрстанная страница с анимациями: профиль ДНК
   компании по 7 измерениям и детальным параметрам, доминирующий
   тип культуры, сильные стороны и зоны напряжения, портрет
   идеального кандидата и рекомендации по найму.
   ============================================================ */

type Dim = { key: string; name: string; val: number; c: string; sum: string; params: string[] };
const DIMS: Dim[] = [
  { key: "result", name: "Results orientation", val: 81, c: "#FF6B57", sum: "The dominant dimension. Decisions are judged by outcome; ambitious goals and accountability are valued", params: ["Action orientation", "Achievement orientation", "Being demanding", "High expectations", "Results orientation", "Pay for performance", "Emphasis on quality"] },
  { key: "stab", name: "Stability", val: 78, c: TEAL, sum: "A strong reliance on processes and predictability. Long-term planning, low turnover", params: ["Stability", "Predictability", "Caution", "Rule orientation", "Job security", "Low conflict levels"] },
  { key: "detail", name: "Attention to detail", val: 75, c: "#2E9E8F", sum: "A data-driven approach; thoroughness, documentation, and peer review are built into the processes", params: ["Analytical thinking", "Attention to detail", "Precision", "Strong organization"] },
  { key: "people", name: "People orientation", val: 72, c: AMBER, sum: "Fairness and employee development. Decisions account for the impact on the team", params: ["Fairness", "Respect for individual rights", "Tolerance", "Support", "People orientation", "Growth opportunities", "Recognition of achievements"] },
  { key: "team", name: "Team orientation", val: 69, c: "#5BA528", sum: "Collective achievements matter, but individual accountability is expressed more strongly", params: ["Team orientation", "Free flow of information", "Collaboration", "Friendships at work", "Fitting in with the team"] },
  { key: "inno", name: "Innovation", val: 64, c: GREEN, sum: "Moderate. Experimentation is encouraged, but within managed risk", params: ["Flexibility", "Adaptability", "Innovation", "Seizing opportunities", "Willingness to experiment", "Risk appetite", "Freedom from rigid constraints"] },
  { key: "aggr", name: "Competitiveness", val: 58, c: "#E07B39", sum: "The weakest dimension. The internal environment is collaborative rather than competitive", params: ["Competitiveness", "Assertiveness", "Decisiveness", "Initiative", "Personal accountability", "Direct conflict resolution", "Work intensity"] },
];

/* ── 9 ключевых ценностей, каждая = среднее (ROUND) её OCP-параметров ── */
const nlvl = (v: number) => (v >= 75 ? GREEN : v >= 50 ? AMBER : RED);
const badgeColor = (b: string) => (b === "Systemic" ? TEAL : b === "Process" ? "#5B8BB0" : b === "Behavioral" ? GREEN : AMBER);

type Ocp = { ru: string; en: string; n: number; score: number; badge: string; statement: string; lower: string; higher: string; quote?: string };
type Nine = { key: string; ru: string; en: string; score: number; desc: string; gap: string; src: string; params: Ocp[] };

const BIG_NINE: Nine[] = [
  {
    key: "agility", ru: "Agility", en: "Agility", score: 49,
    desc: "Structural flexibility is balanced by a high degree of process and role-boundary regulation.",
    gap: "Adaptability is constrained by heavy regulation: teams quickly change tactics within their own area, but cross-functional changes require approvals.",
    src: "Primary source: All-Hands Meetings · Secondary: Job Descriptions",
    params: [
      { ru: "Flexibility", en: "Flexibility", n: 1, score: 45, badge: "Process", statement: "Changes within one's own area are possible; changes across teams go through approvals.", lower: "Within their area of responsibility, employees are free to change their approach", higher: "Cross-functional changes are formalized and not quick", quote: "[All-Hands] Decisions to change processes are made at quarterly meetings." },
      { ru: "Adaptability", en: "Adaptability", n: 2, score: 52, badge: "Behavioral", statement: "Teams adjust their tactics, but within approved guidelines.", lower: "Tactical adaptation is encouraged", higher: "Strategic pivots require approval" },
      { ru: "Seizing opportunities", en: "Being quick to take advantage of opportunities", n: 4, score: 49, badge: "Behavioral", statement: "The response to opportunities depends on the planning cycle.", lower: "Targeted initiatives are launched quickly", higher: "Major bets go through ROI assessment" },
      { ru: "Willingness to experiment", en: "A willingness to experiment", n: 5, score: 50, badge: "Process", statement: "Experiments are allowed as managed pilots.", lower: "MVPs and pilots are part of the culture", higher: "Every pilot requires a hypothesis and metrics" },
    ],
  },
  {
    key: "collab", ru: "Collaboration", en: "Collaboration", score: 73,
    desc: "The level of formalized collaboration is sustained through cross-reviews and a buddy system.",
    gap: "Collaboration is structured around processes: cross-functional reviews and the buddy system are mandatory, while informal cooperation takes a back seat.",
    src: "Primary source: Performance Review · Secondary: Employee Handbook",
    params: [
      { ru: "Team orientation", en: "Being team oriented", n: 32, score: 76, badge: "Systemic", statement: "Collective results are anchored in team metrics.", lower: "Team goals in every cycle", higher: "Individual accountability is valued just as highly" },
      { ru: "Free flow of information", en: "Sharing information freely", n: 33, score: 65, badge: "Process", statement: "Information is open via the wiki and mandatory reviews.", lower: "Documentation and process transparency", higher: "Some knowledge stays within teams" },
      { ru: "Collaboration", en: "Working in collaboration", n: 34, score: 74, badge: "Process", statement: "Cross-review is required for significant changes.", lower: "Pair and cross-functional work is the norm", higher: "Coordination requires sync-ups" },
      { ru: "Friendships at work", en: "Developing friends at work", n: 35, score: 77, badge: "Behavioral", statement: "The buddy system and team-building activities build connections.", lower: "Onboarding through a buddy mentor", higher: "Friendship does not replace process discipline", quote: "[Handbook] Each new employee is assigned a buddy for 3 months." },
    ],
  },
  {
    key: "customer", ru: "Customer focus", en: "Customer", score: 77,
    desc: "A focus on product quality and outcomes through adherence to standards.",
    gap: "The customer is at the center through quality standards and results orientation, rather than through direct contact between every employee and the user.",
    src: "Primary source: Job Descriptions · Secondary: All-Hands Meetings",
    params: [
      { ru: "Action orientation", en: "Action orientation", n: 21, score: 79, badge: "Behavioral", statement: "A \"do it and see it through\" culture.", lower: "Fast execution is the priority", higher: "Action is checked against the quality standard" },
      { ru: "Results orientation", en: "Being results oriented", n: 25, score: 73, badge: "Systemic", statement: "Evaluation by outcome and impact on the product.", lower: "Results are measured by metrics", higher: "The process is also kept under control" },
      { ru: "Emphasis on quality", en: "An emphasis on quality", n: 27, score: 79, badge: "Process", statement: "Zero-defect standards and QA are built into the pipeline.", lower: "Pride in product quality", higher: "The high bar slows down releases", quote: "[Job Desc] Meeting the Definition of Done is a mandatory condition for merging." },
    ],
  },
  {
    key: "diversity", ru: "Diversity", en: "Diversity", score: 67,
    desc: "Respect for boundaries and roles is the foundation of how people interact.",
    gap: "Respect is expressed through honoring each employee's area of responsibility and following the company's shared rules.",
    src: "Primary source: Employee Handbook · Secondary: Glassdoor/eNPS reviews",
    params: [
      { ru: "Fairness", en: "Fairness", n: 14, score: 75, badge: "Systemic", statement: "The rules are the same for everyone and codified in internal guidelines.", lower: "Shared rules apply to all employees", higher: "The system is formalized; no exceptions are provided for", quote: "[Employee Handbook] Role allocation is reviewed through a transparent procedure accessible to every employee." },
      { ru: "Respect for individual rights", en: "Respect for the individual's rights", n: 15, score: 75, badge: "Systemic", statement: "Respect is expressed through honoring areas of responsibility.", lower: "The right to full autonomy within one's own area is established", higher: "Rights are viewed through the lens of work tasks rather than the individual" },
      { ru: "Tolerance", en: "Tolerance", n: 16, score: 51, badge: "Value-based", statement: "Differences are accepted within the scope of work roles.", lower: "Openness to different approaches within processes", higher: "Tolerance is not codified in a dedicated policy" },
    ],
  },
  {
    key: "execution", ru: "Execution", en: "Execution", score: 83,
    desc: "Systematic control of execution, detailed time tracking, and quality standards.",
    gap: "Execution is the strongest dimension: strict control of deadlines, metrics, and development standards at every stage.",
    src: "Primary source: Performance Review · Secondary: Job Descriptions",
    params: [
      { ru: "Achievement orientation", en: "Achievement orientation", n: 22, score: 84, badge: "Systemic", statement: "Ambitious OKRs and a drive to set records.", lower: "Goals are measurable and ambitious", higher: "The bar is set, but growth is limited by resources" },
      { ru: "High expectations", en: "Having high expectations for performance", n: 24, score: 85, badge: "Systemic", statement: "Explicit KPIs and regular performance reviews.", lower: "Accountability is tied to roles", higher: "Expectations are high but realistic" },
      { ru: "Analytical thinking", en: "Being analytical", n: 28, score: 80, badge: "Process", statement: "Decisions are based on data and research.", lower: "A data-driven approach is the norm", higher: "Some decisions are still made by expert judgment" },
      { ru: "Attention to detail", en: "Paying attention to detail", n: 29, score: 82, badge: "Process", statement: "Thorough checking, documentation, peer review.", lower: "Peer review is mandatory", higher: "The depth of checking slows the pace" },
      { ru: "Strong organization", en: "Being highly organized", n: 31, score: 84, badge: "Systemic", statement: "Structured processes and project management.", lower: "Clear pipelines and guidelines", higher: "Structure sometimes comes at the expense of flexibility", quote: "[Performance] Adherence to the multi-level Definition of Done is factored into evaluations." },
    ],
  },
  {
    key: "innovation", ru: "Innovation", en: "Innovation", score: 39,
    desc: "Innovation is structured through guidelines, ROI assessment, and multi-level testing.",
    gap: "Innovation is a weak dimension: novelty is allowed only within managed limits, and risk is minimized through guidelines and ROI assessment.",
    src: "Primary source: Performance Review (attitude toward risk) · Secondary: All-Hands Meetings",
    params: [
      { ru: "Innovation", en: "Being innovative", n: 3, score: 42, badge: "Value-based", statement: "New solutions go through assessment and guidelines.", lower: "R&D is present in a targeted way", higher: "Radical ideas rarely make it to launch" },
      { ru: "Willingness to experiment", en: "A willingness to experiment", n: 5, score: 40, badge: "Process", statement: "Experiments are allowed as controlled pilots.", lower: "Pilots are possible when a hypothesis exists", higher: "Every pilot is bounded by guidelines" },
      { ru: "Risk appetite", en: "Risk taking", n: 6, score: 36, badge: "Behavioral", statement: "Risk is minimized through due diligence and ROI assessment.", lower: "Decisions under uncertainty are made deliberately", higher: "Tolerance for failure is low", quote: "[Performance] Launching a new initiative requires an ROI justification and a testing plan." },
      { ru: "Freedom from rigid constraints", en: "Not being constrained by many rules", n: 7, score: 38, badge: "Systemic", statement: "Work is governed by internal rules and areas of responsibility.", lower: "Autonomy within one's own area is preserved", higher: "Cross-functional actions are heavily regulated" },
    ],
  },
  {
    key: "integrity", ru: "Integrity", en: "Integrity", score: 84,
    desc: "Accountability for assigned areas and adherence to the company's internal rules.",
    gap: "Integrity is high: everyone owns their area, conflicts are resolved openly in work meetings, and the company's philosophy is clear.",
    src: "Primary source: Glassdoor/eNPS reviews · Secondary: Employee Handbook",
    params: [
      { ru: "Fairness", en: "Fairness", n: 14, score: 86, badge: "Systemic", statement: "The same rules apply to all employees.", lower: "Transparent criteria without favoritism", higher: "Formalization leaves no room for individual cases" },
      { ru: "Personal accountability", en: "Taking individual responsibility", n: 41, score: 88, badge: "Behavioral", statement: "A culture of ownership: \"this is my area of responsibility.\"", lower: "Accountability is tied to the role", higher: "Accountability is limited to one's own area" },
      { ru: "Direct conflict resolution", en: "Confronting conflict", n: 42, score: 80, badge: "Process", statement: "Contentious issues are brought to work meetings.", lower: "Open feedback, no politics", higher: "Conflicts are resolved through process, not immediately", quote: "[Glassdoor] \"Here it's normal to name problems openly — there's a clear process for it.\"" },
      { ru: "Clear philosophy", en: "Having a clear guiding philosophy", n: 54, score: 82, badge: "Value-based", statement: "The mission and values genuinely influence decisions.", lower: "Values are documented", higher: "The philosophy lives through guidelines" },
    ],
  },
  {
    key: "performance", ru: "Performance", en: "Performance", score: 71,
    desc: "Evaluation based on 360 results and adherence to development and process standards.",
    gap: "Performance is measured through 360 reviews and adherence to standards; compensation is partly tied to outcomes.",
    src: "Primary source: Performance Review · Secondary: Job Descriptions",
    params: [
      { ru: "Achievement orientation", en: "Achievement orientation", n: 22, score: 78, badge: "Systemic", statement: "OKRs and a drive for measurable results.", lower: "Goals are ambitious and measurable", higher: "Achievements are checked against the process" },
      { ru: "Being demanding", en: "Being demanding", n: 23, score: 73, badge: "Behavioral", statement: "A high quality bar and low tolerance for mediocrity.", lower: "Quality standards are high", higher: "High standards are balanced by support" },
      { ru: "High expectations", en: "Having high expectations for performance", n: 24, score: 71, badge: "Systemic", statement: "Regular reviews and accountability.", lower: "Explicit expectations by role", higher: "Expectations are realistic, without overwork" },
      { ru: "Pay for performance", en: "High pay for good performance", n: 26, score: 62, badge: "Value-based", statement: "A variable component and bonuses for achievements.", lower: "Bonuses are tied to results", higher: "The share of variable pay is moderate", quote: "[Job Desc] The annual bonus depends on achieving team and individual goals." },
    ],
  },
  {
    key: "respect", ru: "Respect", en: "Respect", score: 65,
    desc: "Respect is conveyed through honoring role boundaries and the onboarding system.",
    gap: "Respect is expressed through role autonomy, support, and development, but is viewed in a work context rather than a personal one.",
    src: "Primary source: Glassdoor/eNPS reviews · Secondary: Employee Handbook",
    params: [
      { ru: "Fairness", en: "Fairness", n: 14, score: 72, badge: "Systemic", statement: "Shared rules and transparent criteria.", lower: "Equal opportunities for all roles", higher: "Fairness is formalized" },
      { ru: "Tolerance", en: "Tolerance", n: 16, score: 58, badge: "Value-based", statement: "Differences are accepted in a work context.", lower: "Openness to different points of view", higher: "There is no dedicated DEI policy" },
      { ru: "Support", en: "Being supportive", n: 17, score: 64, badge: "Behavioral", statement: "Mentoring and psychological safety.", lower: "Buddy and mentoring programs are well developed", higher: "Support is tied to onboarding processes" },
      { ru: "People orientation", en: "Being people oriented", n: 18, score: 67, badge: "Value-based", statement: "Decisions account for the impact on employees.", lower: "Impact on the team is assessed", higher: "Results still take priority" },
      { ru: "Growth opportunities", en: "Opportunities for professional growth", n: 19, score: 64, badge: "Process", statement: "Training, career tracks, and internal transfers.", lower: "Career tracks are transparent", higher: "Growth is limited by the role structure", quote: "[Glassdoor] \"There are clear grades, but vertical growth runs up against the role structure.\"" },
    ],
  },
];

const STRENGTHS = [
  ["Execution discipline", "A high quality bar and a \"see it through\" culture — tasks are closed on time"],
  ["Process predictability", "Clear guidelines and long-term planning reduce operational risks"],
  ["Analytical decision-making", "Decisions rely on data and metrics rather than intuition"],
];
const TENSIONS = [
  ["Inertia to change", "Strong stability paired with moderate innovation slows adaptation to the market"],
  ["Low competitiveness", "The collaborative environment is comfortable but may lack drive in aggressive niches"],
  ["Risk of perfectionism", "Attention to detail and high expectations sometimes hold back shipping \"good enough\""],
];

const FIT = [
  "Results-oriented and takes ownership of outcomes",
  "Values clear processes and works systematically",
  "Makes decisions based on data rather than emotion",
  "A team player who respects boundaries of responsibility",
];
const NOFIT = [
  "A pronounced disruptor who feels constrained by guidelines",
  "A lone individualist focused on self-promotion",
  "Someone who prefers firefighting over systematic work",
];
const RECO = [
  ["Test for systematic thinking", "Ask the candidate to describe how they built a process from scratch and brought it to a stable state"],
  ["Assess data-driven thinking", "Ask about a decision made based on data and which metrics they looked at"],
  ["Gauge tolerance for process", "Clarify their attitude toward guidelines — whether they're comfortable working within structure rather than chaos"],
];

export default function CulturePrimerPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<Nine | null>(null);
  useEffect(() => { setMounted(true); }, []);

  /* блокируем скролл фона при открытой модалке */
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 46, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full" style={{ color: INK }}>
      {/* HERO */}
      <section className="mx-auto max-w-[1100px] px-6 pt-36 pb-8 text-center md:px-8 lg:pt-40">
        <h1 className="rv mx-auto mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[1.04] tracking-tight">Company culture profile</h1>
        <p className="rv mx-auto mt-4 max-w-2xl text-lg text-[#183833]/65">A digitized cultural code across 7 dimensions and detailed parameters, based on the company's artifacts</p>
      </section>

      <div className="mx-auto max-w-[1100px] space-y-5 px-5 pb-24 md:px-8">
        {/* 1 · компания + доминирующий тип */}
        <div className="rv grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="text-base font-bold">Company information</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Info icon={<Building2 className="h-4 w-4" />} t="Company" v="Technopolis LLC" />
              <Info icon={<Globe className="h-4 w-4" />} t="Industry" v="FinTech / B2B SaaS" />
              <Info icon={<Users className="h-4 w-4" />} t="Size" v="180 employees" />
              <Info icon={<FileText className="h-4 w-4" />} t="Artifacts" v="website, job postings, social media, guidelines" />
            </div>
            <p className="mt-4 border-t border-[#eef0ee] pt-4 text-sm leading-relaxed text-[#183833]/70">
              A mature product company with a strong process-driven culture. It values results, quality, and predictability,
              and approaches change deliberately
            </p>
          </Card>

          <div className="rounded-3xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] to-[#eef7e0] p-5 shadow-[0_16px_44px_rgba(24,56,51,0.07)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-base font-bold"><Compass className="h-5 w-5" style={{ color: GREEN }} /> Dominant culture type</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm" style={{ color: GREEN }}>Results + Stability</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#183833]/75">
              A high-performance culture built on clear processes, quality standards, and predictability.
              Decisions are made by outcome and based on data, and change is approached deliberately. The strengths are
              execution discipline and analytics; the area for growth is the speed of adapting to change.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[["Results", 81, "#FF6B57"], ["Stability", 78, TEAL], ["Details", 75, "#2E9E8F"]].map(([t, v, c]) => (
                <div key={t as string} className="rounded-2xl bg-white/70 p-3 text-center">
                  <p className="text-xl font-bold" style={{ color: c as string }}>{v}%</p>
                  <p className="mt-0.5 text-[10px] text-[#183833]/55">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2 · диаграмма ДНК */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">Cultural DNA — 7 dimensions</h2>
          <p className="mx-auto mt-1 max-w-md text-center text-xs text-[#183833]/55">The polar chart shows how pronounced each dimension of the company's culture is</p>
          <div className="mt-4 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.15fr_1fr]">
            <Card className="flex items-center justify-center"><RoseChart /></Card>
            <Card className="flex flex-col">
              <p className="flex items-center gap-2 text-sm font-bold"><Dna className="h-4 w-4" style={{ color: GREEN }} /> Dimension intensity</p>
              <div className="mt-4 flex flex-1 flex-col justify-between gap-3.5">
                {DIMS.map((d) => (
                  <div key={d.key}>
                    <div className="flex items-center justify-between text-xs"><span className="font-medium">{d.name}</span><span className="font-bold tabular-nums" style={{ color: d.c }}>{d.val}%</span></div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#eef2ec]"><div className="h-full rounded-full transition-[width] duration-[1100ms] ease-out" style={{ width: mounted ? `${d.val}%` : "0%", background: d.c }} /></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* 3 · анализ измерений */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">Dimension analysis</h2>
          <p className="mx-auto mt-1 max-w-lg text-center text-xs text-[#183833]/55">9 core cultural values — each calculated as the average of its parameter scores</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BIG_NINE.map((d) => {
              const c = nlvl(d.score);
              return (
                <Card key={d.key} className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-bold leading-tight">{d.ru}</p>
                    <span className="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold tabular-nums" style={{ background: `${c}1a`, color: c }}>{d.score} / 100</span>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#eef2ec]"><div className="h-full rounded-full transition-[width] duration-[1100ms] ease-out" style={{ width: mounted ? `${d.score}%` : "0%", background: c }} /></div>
                  <p className="mt-3 flex-1 text-xs leading-snug text-[#183833]/65">{d.desc}</p>
                  <button onClick={() => setActive(d)} className="ease-smooth mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e6ece4] bg-white px-4 py-2.5 text-xs font-semibold text-[#183833] transition-all hover:-translate-y-0.5 hover:border-[#d8ecc4] hover:bg-[#f6faef]">
                    Learn more <ExternalLink className="h-3.5 w-3.5" style={{ color: GREEN }} />
                  </button>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 4 · сильные стороны / зоны напряжения */}
        <div className="rv grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card>
            <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: GREEN }}><ShieldCheck className="h-4 w-4" /> Cultural strengths</h3>
            {STRENGTHS.map(([t, x]) => <Block key={t} t={t} text={x} />)}
          </Card>
          <Card>
            <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: AMBER }}><AlertTriangle className="h-4 w-4" /> Tension points</h3>
            {TENSIONS.map(([t, x]) => <Block key={t} t={t} text={x} badge="Growth area" bc={AMBER} />)}
          </Card>
        </div>

        {/* 5 · идеальный кандидат */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">Ideal candidate profile</h2>
          <p className="mx-auto mt-1 max-w-md text-center text-xs text-[#183833]/55">Who the company's culture will embrace naturally, and who would feel out of place</p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[#d8ecc4] bg-[#f3faea] p-5">
              <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: GREEN }}><UserCheck className="h-4 w-4" /> Will fit in well</p>
              <ul className="mt-3 space-y-2">{FIT.map((t) => <li key={t} className="flex items-start gap-2 text-xs leading-snug text-[#183833]/75"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: GREEN }} /> {t}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-[#ffd9d9] bg-[#fff5f5] p-5">
              <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: RED }}><AlertTriangle className="h-4 w-4" /> Risk zone</p>
              <ul className="mt-3 space-y-2">{NOFIT.map((t) => <li key={t} className="flex items-start gap-2 text-xs leading-snug text-[#183833]/75"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: RED }} /> {t}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* 6 · рекомендации по найму */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">Hiring recommendations</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {RECO.map(([t, x]) => (
              <Card key={t}>
                <p className="flex items-center gap-2 text-sm font-bold"><span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: `${TEAL}1a`, color: TEAL }}><Lightbulb className="h-4 w-4" /></span> {t}</p>
                <p className="mt-2 text-xs leading-snug text-[#183833]/70">{x}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rv overflow-hidden rounded-[2rem] px-8 py-12 text-center text-white shadow-[0_30px_70px_rgba(122,184,0,0.28)]" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #5e9400 100%)` }}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Build a profile like this for your company</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">Upload your culture artifacts and evaluate candidates through the lens of your DNA. The first 5 reports are free</p>
          <a href="https://app.talentmind.ru" className="ease-smooth mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1" style={{ color: GREEN }}>Get a report for your company →</a>
        </div>

        <p className="rv text-center text-[11px] text-[#183833]/40">TalentMind · automatically generated report · demo data</p>
      </div>

      {/* модальное окно — обоснование измерения */}
      {active && <DimModal key={active.key} d={active} onClose={() => setActive(null)} />}
    </div>
  );
}

/* ============================================================
   Модальное окно — детальный анализ измерения
   ============================================================ */
function DimModal({ d, onClose }: { d: Nine; onClose: () => void }) {
  const c = nlvl(d.score);
  const [sel, setSel] = useState(0);
  const sp = d.params[sel];
  const spc = nlvl(sp.score);
  const grad = c === GREEN ? "linear-gradient(120deg,#6aa400 0%,#8ec425 100%)"
    : c === AMBER ? "linear-gradient(120deg,#c8860a 0%,#f0b53e 100%)"
    : "linear-gradient(120deg,#e23b3b 0%,#ff7676 100%)";
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <style>{`@keyframes dimFade{from{opacity:0}to{opacity:1}}
        @keyframes dimPop{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes pIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes barGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
      <div className="absolute inset-0 bg-[#0d1b17]/45 backdrop-blur-sm" style={{ animation: "dimFade .28s ease both" }} onClick={onClose} />
      <div className="relative z-10 flex max-h-[90vh] w-[min(1080px,95vw)] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_60px_140px_rgba(13,27,23,0.5)]" style={{ animation: "dimPop .36s cubic-bezier(.22,1,.36,1) both" }}>

        {/* ── HERO HEADER (градиент по уровню) ── */}
        <div className="relative shrink-0 overflow-hidden px-6 py-6 text-white md:px-9 md:py-7" style={{ background: grad }}>
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-black/10 blur-3xl" />
          <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"><X className="h-4 w-4" /></button>
          <div className="relative flex items-center gap-5">
            <HeaderRing value={d.score} />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Cultural value</p>
              <h3 className="mt-1 text-[1.9rem] font-bold leading-none tracking-tight">{d.ru}</h3>
              <p className="mt-1 text-sm italic text-white/70">{d.en}</p>
            </div>
          </div>
          <p className="relative mt-4 max-w-2xl text-[15px] leading-relaxed text-white/90">{d.desc}</p>
        </div>

        {/* ── SCROLL BODY ── */}
        <div className="flex flex-col overflow-y-auto bg-[#fafcf8]" data-lenis-prevent>

          {/* ключевой вывод + источники */}
          <div className="border-b border-[#eef0ee] px-6 py-5 md:px-9">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
              <div className="flex items-start gap-3 lg:flex-1">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: c }}><Lightbulb className="h-4 w-4" /></span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#183833]/45">Key takeaway · gap analysis</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-[#183833]/85">{d.gap}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-2xl border border-dashed border-[#d8e0da] bg-white px-4 py-3 lg:w-[280px] lg:shrink-0">
                <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#183833]/40" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#183833]/45">Evidence sources</p>
                  <p className="mt-1 text-[11px] leading-snug text-[#183833]/65">{d.src}</p>
                </div>
              </div>
            </div>
          </div>

          {/* MASTER (состав оценки) ↔ DETAIL */}
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[0.92fr_1.08fr] md:p-9">

            {/* ── MASTER: диаграмма состава ── */}
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#183833]/45">Score breakdown</p>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums" style={{ background: `${GREEN}1a`, color: GREEN }}>{d.params.length} parameters</span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-[10px] text-[#183833]/45"><span className="inline-block h-3 w-[2px]" style={{ background: "#183833", opacity: 0.4 }} /> dashed line — dimension average ({d.score})</p>

              <div className="mt-3 space-y-2">
                {d.params.map((p, i) => {
                  const lc = nlvl(p.score), on = i === sel;
                  return (
                    <button
                      key={p.n}
                      onClick={() => setSel(i)}
                      className="w-full rounded-2xl border border-[#e9ede9] bg-white p-3 text-left transition-all hover:border-[#d6e6c8]"
                      style={{ animation: `pIn .45s ease ${0.05 * i + 0.05}s both`, ...(on ? { boxShadow: `0 0 0 2px ${lc}`, background: `${lc}0d` } : {}) }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: lc }} />
                          <span className="truncate text-[13px] font-semibold" style={{ color: INK }}>{p.ru}</span>
                          <span className="hidden shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold sm:inline" style={{ background: `${badgeColor(p.badge)}1a`, color: badgeColor(p.badge) }}>{p.badge}</span>
                        </span>
                        <span className="shrink-0 text-sm font-bold tabular-nums" style={{ color: lc }}>{p.score}</span>
                      </div>
                      <div className="relative mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#eef2ec]">
                        <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: lc, transformOrigin: "left", animation: `barGrow .7s cubic-bezier(.22,1,.36,1) ${0.05 * i + 0.15}s both` }} />
                      </div>
                      {/* маркер среднего */}
                      <div className="relative">
                        <span className="absolute -top-[10px] h-2.5 w-[2px]" style={{ left: `${d.score}%`, background: "#183833", opacity: 0.4 }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── DETAIL: выбранный параметр ── */}
            <div className="self-start lg:sticky lg:top-0">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#183833]/45">Parameter breakdown</p>
              <div key={sel} className="mt-3 overflow-hidden rounded-2xl border border-[#e9ede9] bg-white shadow-[0_12px_34px_rgba(24,56,51,0.07)]" style={{ animation: "pIn .35s ease both" }}>
                <div className="border-l-[5px] p-5" style={{ borderColor: spc }}>
                  <div className="flex items-center gap-4">
                    <ScoreRing value={sp.score} color={spc} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-xl font-bold leading-tight" style={{ color: INK }}>{sp.ru}</h4>
                        <span className="rounded-md px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${badgeColor(sp.badge)}1a`, color: badgeColor(sp.badge) }}>{sp.badge}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-[15px] font-medium leading-snug" style={{ color: INK }}>{sp.statement}</p>

                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#183833]/40">Score boundaries</p>
                  <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#d8ecc4] bg-[#f3faea] p-3.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: GREEN }}><TrendingUp className="h-3.5 w-3.5" /> Why not lower</p>
                      <p className="mt-1.5 text-xs leading-snug text-[#183833]/70">{sp.lower}</p>
                    </div>
                    <div className="rounded-xl border border-[#f1d9a8] bg-[#fdf6e9] p-3.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: AMBER }}><TrendingDown className="h-3.5 w-3.5" /> Why not higher</p>
                      <p className="mt-1.5 text-xs leading-snug text-[#183833]/70">{sp.higher}</p>
                    </div>
                  </div>

                  {sp.quote && (
                    <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-[#ececec] bg-[#f7f8f7] px-4 py-3">
                      <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-[#183833]/30" />
                      <p className="text-xs italic leading-snug text-[#183833]/60">{sp.quote}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/* большое кольцо оценки в шапке (белое на цветном) */
function HeaderRing({ value }: { value: number }) {
  const r = 30, cc = 2 * Math.PI * r, dash = ((value / 100) * cc).toFixed(1);
  return (
    <div className="relative h-[80px] w-[80px] shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="7" />
        <circle cx="40" cy="40" r={r} fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${dash} ${cc.toFixed(1)}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none text-white">
        <span className="text-2xl font-bold tabular-nums">{value}</span>
      </div>
    </div>
  );
}
/* кольцо оценки параметра */
function ScoreRing({ value, color }: { value: number; color: string }) {
  const r = 24, cc = 2 * Math.PI * r, dash = ((value / 100) * cc).toFixed(1);
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#eef2ec" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${dash} ${cc.toFixed(1)}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-lg font-bold tabular-nums" style={{ color }}>{value}</span>
      </div>
    </div>
  );
}

/* ============================================================
   мелкие компоненты
   ============================================================ */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-[#e6ece4] bg-white p-5 shadow-[0_16px_44px_rgba(24,56,51,0.06)] ${className}`}>{children}</div>;
}
function Info({ icon, t, v }: { icon: React.ReactNode; t: string; v: string }) {
  return <div className="flex items-start gap-2"><span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f4f7f2] text-[#7AB800]">{icon}</span><div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{t}</p><p className="text-xs font-medium">{v}</p></div></div>;
}
function Block({ t, text, badge, bc }: { t: string; text: string; badge?: string; bc?: string }) {
  return <div className="mt-3 border-t border-[#eef0ee] pt-3"><div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold">{t}</p>{badge && <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase" style={{ background: `${bc}1a`, color: bc }}>{badge}</span>}</div><p className="mt-1 text-[11px] leading-snug text-[#183833]/65">{text}</p></div>;
}

/* роза-диаграмма 7 измерений */
function RoseChart() {
  const N = DIMS.length, cx = 280, cy = 215, R = 152, seg = 360 / N, pad = 1.4, labelR = R + 16;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  /* пирог-сектор от центра до радиуса r */
  const sector = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${cx} ${cy} L ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)} Z`;
  };
  /* направляющая дуга на радиусе r */
  const arc = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`;
  };
  /* перенос длинной подписи на две строки */
  const wrap = (s: string) => {
    if (s.length <= 13 || !s.includes(" ")) return [s];
    const words = s.split(" "), half = s.length / 2;
    let l1 = "", k = 0;
    for (; k < words.length; k++) { if (l1.length && l1.length + words[k].length > half) break; l1 += (l1 ? " " : "") + words[k]; }
    const l2 = words.slice(k).join(" ");
    return l2 ? [l1, l2] : [l1];
  };
  return (
    <div className="flex w-full flex-col items-center">
      <svg viewBox="0 0 560 460" className="w-full max-w-[620px]">
        {/* вся шкала 0–100% — нейтральная подложка */}
        {DIMS.map((_, i) => <path key={`bg${i}`} d={sector(R, i)} fill="#eef1f3" stroke="#ffffff" strokeWidth="2.5" />)}
        {/* концентрические направляющие шкалы */}
        {[0.25, 0.5, 0.75, 1].map((f) => DIMS.map((_, i) => <path key={`g${f}-${i}`} d={arc(R * f, i)} fill="none" stroke="#d2dce2" strokeWidth="1" opacity="0.7" />))}
        {/* выраженность измерения — цветной сектор по значению */}
        {DIMS.map((d, i) => <path key={`v${i}`} d={sector((R * d.val) / 100, i)} fill={d.c} style={{ transformOrigin: `${cx}px ${cy}px`, animation: `roseG .7s ease-out ${0.05 * i + 0.1}s both` }} />)}
        {/* проценты внутри сектора */}
        {DIMS.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), rr = R * 0.62;
          return <text key={`p${i}`} x={(cx + rr * Math.cos(a)).toFixed(1)} y={(cy + rr * Math.sin(a)).toFixed(1)} fontSize="15" fontWeight="700" fill="#2b3b38" textAnchor="middle" dominantBaseline="middle">{d.val}%</text>;
        })}
        {/* подписи измерений снаружи (с переносом) */}
        {DIMS.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), ca = Math.cos(a);
          const lx = +(cx + labelR * ca).toFixed(1), ly = +(cy + labelR * Math.sin(a)).toFixed(1);
          const anchor = ca > 0.3 ? "start" : ca < -0.3 ? "end" : "middle";
          const lines = wrap(d.name), dy0 = lines.length > 1 ? -5 : 0;
          return (
            <text key={`l${i}`} x={lx} y={ly} fontSize="13" fill="#3a4f4a" textAnchor={anchor} dominantBaseline="middle">
              {lines.map((ln, k) => <tspan key={k} x={lx} dy={k === 0 ? dy0 : 13}>{ln}</tspan>)}
            </text>
          );
        })}
        <style>{`@keyframes roseG{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      </svg>
    </div>
  );
}
