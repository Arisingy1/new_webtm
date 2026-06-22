"use client";

import { useEffect, useState } from "react";
import {
  X, Sparkles, Check, Flame, AudioLines, MessageSquareQuote,
  Briefcase, Building2, Wallet, Home, GitBranch, ChevronDown,
} from "lucide-react";

/* ============================================================
   Переиспользуемые код-блоки отчёта по кандидату.
   Свёрстаны в стиле сайта (раньше были картинками /1.png…/6.png).
   Используются на /otchet (мобильная версия) и /softskill-report/example.
   ============================================================ */

const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const AMBER = "#E8A317";
const RED = "#FF5252";

/* флаг «смонтировано» — для анимации полос/слайдеров после маунта */
function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => { setM(true); }, []);
  return m;
}

/* ── данные ── */
const ARGS_FOR = [
  "Proven track record of product launches at major companies",
  "Strong communication skills and the ability to persuade",
  "Experience in a product environment (e-commerce)",
  "High level of self-awareness and systems thinking",
];
const ARGS_AGAINST = ["High salary expectations", "Limited experience in client/agency development"];

export type Skill = { name: string; val: number; req: number; desc: string };
export const SKILLS: Skill[] = [
  { name: "Management", val: 78, req: 86, desc: "Strong project-management skills — independently assembled and coordinated a team of 12 people. Experience at a fund demonstrates the ability to oversee execution" },
  { name: "Leadership", val: 72, req: 86, desc: "Shows leadership through responsibility and initiative. The management style is more functional than visionary" },
  { name: "Communication", val: 80, req: 80, desc: "A highly developed skill. Articulates thoughts clearly and in a structured way, listens attentively. Communicates effectively with the technical team and clients" },
  { name: "Planning", val: 85, req: 80, desc: "One of the strongest qualities. Proven experience building systems from scratch under uncertainty. Able to break down tasks" },
  { name: "Adaptability", val: 75, req: 72, desc: "Experience across different environments (fund, EdTech, startup) and with various methodologies points to strong adaptability to new conditions" },
  { name: "Stress resilience", val: 68, req: 84, desc: "Displays calm and controlled behavior. Speech markers indicate self-control, but there are no real cases of working under stress" },
];

const RADAR: { l: string; v: number; req: number }[] = [
  { l: "Management", v: 35, req: 86 }, { l: "Leadership", v: 90, req: 86 }, { l: "Communication", v: 40, req: 80 },
  { l: "Planning", v: 30, req: 80 }, { l: "Adaptability", v: 72, req: 72 }, { l: "Stress resilience", v: 50, req: 84 },
  { l: "Teamwork", v: 18, req: 80 }, { l: "Empathy", v: 25, req: 85 }, { l: "Problem solving", v: 62, req: 86 },
  { l: "Critical thinking", v: 62, req: 80 },
];

/* ============================================================
   1 · Информация о кандидате + Решение  (бывш. /1.png)
   ============================================================ */
export function CandidateDecision() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card>
        <h3 className="text-base font-bold">Candidate info</h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Info icon={<Briefcase className="h-4 w-4" />} t="Experience" v="9 years" />
          <Info icon={<Building2 className="h-4 w-4" />} t="Companies" v="Ozon, Yandex, fintech" />
          <Info icon={<Wallet className="h-4 w-4" />} t="Expectations" v="$2,800 (net)" />
          <Info icon={<Home className="h-4 w-4" />} t="Format" v="hybrid / remote" />
        </div>
        <p className="mt-4 border-t border-[#eef0ee] pt-4 text-sm leading-relaxed text-[#183833]/70">
          Experienced IT project lead in e-commerce and fintech. Managed distributed teams of up to 15 people,
          launched products from scratch and grew existing ones
        </p>
      </Card>

      <div className="rounded-3xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] to-[#eef7e0] p-5 shadow-[0_16px_44px_rgba(24,56,51,0.07)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 text-base font-bold"><Check className="h-5 w-5" style={{ color: GREEN }} /> Decision to advance</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> Recommended</span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold" style={{ color: GREEN }}>Arguments for</p>
            <ul className="mt-2 space-y-1.5">{ARGS_FOR.map((a) => <li key={a} className="flex items-start gap-1.5 text-xs text-[#183833]/75"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: GREEN }} /> {a}</li>)}</ul>
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: RED }}>Arguments against</p>
            <ul className="mt-2 space-y-1.5">{ARGS_AGAINST.map((a) => <li key={a} className="flex items-start gap-1.5 text-xs text-[#183833]/75"><X className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: RED }} /> {a}</li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   3 · Риски / Сильные стороны / Психолингвистика  (бывш. /2.png)
   ============================================================ */
export function RisksStrengthsPsycho() {
  const mounted = useMounted();
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <Card>
        <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: RED }}><Flame className="h-4 w-4" /> Risks</h3>
        <Block t="Flight risk" badge="Critical" bc={RED} text="The candidate openly states that the current company is a way to obtain accreditation and a deferral" />
        <Block t="Limited experience in a classic role" badge="Important" bc={AMBER} text="The main relevant experience is a single project resembling freelance work. May lack the skills needed at a large IT company" />
        <Block t="Process-focused" badge="Note" bc={AMBER} text="Cases emphasize organization and launches, but there is almost no work with data and metrics (LTV, conversion)" />
      </Card>
      <Card>
        <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> Strengths</h3>
        <Block t="Systems thinking" text="Able to build processes from scratch, break down tasks and drive a product through to launch" />
        <Block t="Full project lifecycle" text="Confidently leads a project at every stage — from idea and team-building to launch and growth" />
        <Block t="Reflectiveness" text="Analyzes the value of the work and decides based on real impact rather than «heroics»" />
      </Card>
      <Card>
        <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: TEAL }}><AudioLines className="h-4 w-4" /> Psycholinguistics</h3>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs font-semibold"><span style={{ color: INK }}>We</span><span style={{ color: INK }}>I</span></div>
          <div className="relative mt-1.5 h-1.5 rounded-full bg-[#eef2ec]">
            <div className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000" style={{ width: mounted ? "62%" : "0%", background: `linear-gradient(90deg,${TEAL},${GREEN})` }} />
            <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow transition-[left] duration-1000" style={{ left: mounted ? "62%" : "0%", background: GREEN }} />
          </div>
        </div>
        <Block t="«I» / «We» balance" text="Balances «I» when taking personal responsibility and «We» for team processes — a mature distribution of focus" />
        <Block t="Tone" text="Calm, measured, controlled. Speaks unhurriedly, with a low, even timbre" />
        <Block t="Locus of control" text="Takes responsibility, analyzes and draws conclusions rather than shifting blame to external circumstances" />
      </Card>
    </div>
  );
}

/* ============================================================
   4 · Диаграмма соответствия (роза) + риски  (бывш. /3.png)
   ============================================================ */
export function ComplianceDiagram() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.3fr_1fr]">
      <Card><RoseChart /></Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#e6ece4] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(24,56,51,0.05)]"><span className="text-base font-bold">Average gap</span><span className="flex items-center gap-1 text-base font-bold" style={{ color: AMBER }}>9% <ChevronDown className="h-4 w-4" /></span></div>
        <Card className="flex flex-1 flex-col">
          <p className="flex items-center gap-2 text-base font-bold" style={{ color: RED }}><Flame className="h-4 w-4" /> Top risks</p>
          <div className="mt-3 space-y-3">
            {([
              ["Stress resilience", "16%", "The assessment is based on the candidate's calm behavior, without real examples of working in stressful situations"],
              ["Empathy", "15%", "There are indirect signs, but no direct examples of how empathy influences product decisions"],
              ["Leadership", "14%", "Shown mainly through project management; lacks examples of vision and motivating the team under challenging conditions"],
            ] as [string, string, string][]).map(([k, v, dsc], i) => (
              <div key={k} className={i ? "border-t border-[#eef0ee] pt-3" : ""}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{k}</span>
                  <span className="flex items-center gap-1 text-sm font-bold" style={{ color: RED }}>{v} <ChevronDown className="h-3.5 w-3.5" /></span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#183833]/65">{dsc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-[#eef0ee] pt-4">
            <p className="flex items-center gap-2 text-base font-bold" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> Best match</p>
            <p className="mt-2 text-xs leading-relaxed text-[#183833]/75">The candidate's profile is closest to the requirements for the «Planning» and «Problem solving» skills</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   5 · Карта soft skills  (бывш. /4.png)
   ============================================================ */
export function SoftSkillsMap() {
  const mounted = useMounted();
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
      {SKILLS.map((s) => {
        const c = s.val >= 70 ? GREEN : s.val >= 50 ? AMBER : RED;
        return (
          <Card key={s.name} className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-2"><p className="text-sm font-semibold">{s.name}</p><span className="text-sm font-bold" style={{ color: c }}>{s.val}%</span></div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#eef2ec]"><div className="h-full rounded-full transition-[width] duration-[1100ms] ease-out" style={{ width: mounted ? `${s.val}%` : "0%", background: c }} /></div>
            <p className="mt-2 text-[11px] leading-snug text-[#183833]/65">{s.desc}</p>
          </Card>
        );
      })}
    </div>
  );
}

/* ============================================================
   6 · Кейсы по модели STAR  (бывш. /5.png)
   ============================================================ */
export function StarCases() {
  return (
    <div className="space-y-4">
      <StarCase title="Case 1: Building a gamified platform for a real-estate agency"
        s="A UAE agency struggled to attract investors due to a high barrier to entry and limited understanding of the market"
        t="Build a marketing product that introduces investors to the market in a gamified way and boosts engagement"
        a="Acted as PM/PO. Assembled a team of 12 people (developers, ML, marketing). Managed everything from game design to release"
        r="The project was successfully delivered to the client. Specific business metrics (ROI, number of investors) were not disclosed"
        note="A strong full-cycle management case. Demonstrated initiative and organizational skills. The weak point is the absence of business results in numbers" />
      <StarCase title="Case 2: Setting up a management system at a venture fund"
        s="At the start, the fund had no startup-evaluation (due diligence) or tracking processes, which created chaos"
        t="Implement an internal management system to structure work with startups (CRM and tracking)"
        a="Implemented the tool. Set up control processes and feedback loops from portfolio projects"
        r="A system for properly conducting due diligence was created. Operational risks were reduced"
        note="An excellent illustration of planning skills and building processes under uncertainty. However, the role here is more process-oriented than product-oriented" />
    </div>
  );
}

/* ============================================================
   7 · Рекомендации для следующих этапов  (бывш. /6.png)
   ============================================================ */
export function Recommendations() {
  return (
    <div className="space-y-3">
      <Reco title="Experience with product analytics" text="The cases show no work with metrics (A/B tests, retention, LTV, funnels). This is critical for a data-driven product manager"
        qs={["Give an example of when you used data to make an important decision. Which metrics did you look at?", "How did you define the key success metrics for the gaming project? How did you track them?", "Have you faced a situation where the data contradicted a hypothesis? What did you do?"]} />
      <Reco title="Stakeholder management in a corporate environment" text="All experience is either with a single client or fund monitoring. It's unclear how they'd cope in an environment with conflicting interests"
        qs={["Describe the most difficult situation in managing expectations. What was the conflict and how did you resolve it?", "How did you set up the process of aligning the roadmap across different departments?", "What will you do if sales need a feature «yesterday» while engineering estimates it at 3 months?"]} />
    </div>
  );
}

/* ============================================================
   Мелкие переиспользуемые компоненты
   ============================================================ */
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-[#e6ece4] bg-white p-5 shadow-[0_16px_44px_rgba(24,56,51,0.06)] ${className}`}>{children}</div>;
}
function Info({ icon, t, v }: { icon: React.ReactNode; t: string; v: string }) {
  return <div className="flex items-start gap-2"><span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f4f7f2] text-[#7AB800]">{icon}</span><div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{t}</p><p className="text-xs font-medium">{v}</p></div></div>;
}
function Block({ t, text, badge, bc }: { t: string; text: string; badge?: string; bc?: string }) {
  return <div className="mt-3 border-t border-[#eef0ee] pt-3"><div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold">{t}</p>{badge && <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase" style={{ background: `${bc}1a`, color: bc }}>{badge}</span>}</div><p className="mt-1 text-[11px] leading-snug text-[#183833]/65">{text}</p></div>;
}
function StarCase({ title, s, t, a, r, note }: { title: string; s: string; t: string; a: string; r: string; note: string }) {
  const rows: [string, string, string][] = [["Situation", s, TEAL], ["Task", t, GREEN], ["Action", a, AMBER], ["Result", r, GREEN]];
  return (
    <Card>
      <p className="text-sm font-bold">{title}</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(([k, v, c]) => <div key={k} className="rounded-2xl bg-[#f6faef] p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: c }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} /> {k}</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{v}</p></div>)}
      </div>
      <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-[#d8ecc4] bg-[#f3faea] p-3.5"><MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><div><p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: GREEN }}>Assessment</p><p className="mt-0.5 text-[11px] leading-snug text-[#183833]/70">{note}</p></div></div>
    </Card>
  );
}
function Reco({ title, text, qs }: { title: string; text: string; qs: string[] }) {
  return (
    <Card>
      <p className="flex items-center gap-2 text-base font-bold"><span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: `${TEAL}1a`, color: TEAL }}><GitBranch className="h-4 w-4" /></span> {title}</p>
      <p className="mt-2 text-sm leading-snug text-[#183833]/65">{text}</p>
      <ul className="mt-3 space-y-2">{qs.map((q) => <li key={q} className="flex items-start gap-2 rounded-xl bg-[#f6faef] px-3 py-2 text-xs text-[#183833]/75"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GREEN }} /> {q}</li>)}</ul>
    </Card>
  );
}
/* роза-диаграмма (полярные сектора) */
function RoseChart() {
  const N = RADAR.length, cx = 280, cy = 220, R = 140, seg = 360 / N, pad = 1.6, labelR = R + 18;
  const lvl = (v: number) => (v >= 60 ? GREEN : v >= 40 ? "#bcdd93" : "#f2a0a0");
  const rad = (d: number) => (d * Math.PI) / 180;
  const sector = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${cx} ${cy} L ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)} Z`;
  };
  const arc = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`;
  };
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 560 480" className="w-full max-w-[520px]">
        {RADAR.map((_, i) => <path key={`bg${i}`} d={sector(R, i)} fill="#eef1f3" stroke="#ffffff" strokeWidth="2.5" />)}
        {[0.25, 0.5, 0.75, 1].map((f) => RADAR.map((_, i) => <path key={`g${f}-${i}`} d={arc(R * f, i)} fill="none" stroke="#d2dce2" strokeWidth="1" opacity="0.7" />))}
        {RADAR.map((d, i) => <path key={`req${i}`} d={sector((R * d.req) / 100, i)} fill="#bcd9ec" stroke="#ffffff" strokeWidth="1.5" />)}
        {RADAR.map((d, i) => <path key={`v${i}`} d={sector((R * d.v) / 100, i)} fill={lvl(d.v)} style={{ transformOrigin: `${cx}px ${cy}px`, animation: `roseG .7s ease-out ${0.04 * i + 0.1}s both` }} />)}
        {RADAR.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), rr = R * 0.66;
          return <text key={`p${i}`} x={(cx + rr * Math.cos(a)).toFixed(1)} y={(cy + rr * Math.sin(a)).toFixed(1)} fontSize="13" fontWeight="700" fill="#2b4a44" textAnchor="middle" dominantBaseline="middle">{d.v}%</text>;
        })}
        {RADAR.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), ca = Math.cos(a);
          const anchor = ca > 0.15 ? "start" : ca < -0.15 ? "end" : "middle";
          return <text key={`l${i}`} x={(cx + labelR * ca).toFixed(1)} y={(cy + labelR * Math.sin(a)).toFixed(1)} fontSize="12.5" fill="#3a4f4a" textAnchor={anchor} dominantBaseline="middle">{d.l}</text>;
        })}
        <style>{`@keyframes roseG{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] text-[#183833]/70 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-4">
        <Lg c="#bcd9ec" t="Profile requirements" /><Lg c="#f2a0a0" t="Low skill level" /><Lg c="#bcdd93" t="Medium skill level" /><Lg c={GREEN} t="High skill level" />
      </div>
    </div>
  );
}
function Lg({ c, t }: { c: string; t: string }) { return <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm border border-black/5" style={{ background: c }} /> {t}</span>; }
