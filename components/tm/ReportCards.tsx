"use client";

import {
  X, TrendingUp, TrendingDown, AudioLines, MessageSquareQuote,
  Check, Briefcase, Building2, Wallet, Home,
} from "lucide-react";
import { GREEN, TEAL, INK, RED } from "./ui";

const AMBER = "#E8A317";

/* ============================================================
   Свёрстанные карточки отчёта (бывшие картинки на главной):
   • ReportModalCard — детальный разбор навыка (как модалка
     «Пример отчёта», навык «Problem solving»)
   • CandidateInfoCard — информация о кандидате
   • DecisionCard — решение о переходе на следующий этап
   ============================================================ */

/* ── данные кандидата ── */
const ARGS_FOR = [
  "Proven track record of launches at large companies",
  "Strong communication skills and the ability to persuade",
  "Experience in a product environment (e-commerce)",
  "High level of self-awareness and systems thinking",
];
const ARGS_AGAINST = ["High salary expectations", "Limited experience in custom/agency development"];

/* =====================  ЛЕВЫЙ СКРИН — модалка разбора навыка  ===================== */
export function ReportModalCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#e6ece4] bg-white p-4 shadow-[0_24px_60px_rgba(24,56,51,0.16)] md:p-5"
      style={{ zoom: 1 / (1.4 * 1.3) } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight" style={{ color: INK }}>Problem solving</h3>
          <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-[#183833]/65">
            Strong skill. Able to analyze situations and find and implement non-standard solutions (confirmed by case examples)
          </p>
        </div>
        <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#e6ece4] text-[#183833]/45">
          <X className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* role expectations + gap */}
        <div className="space-y-3">
          <SoftCard t="Role expectations" text="Requires confident command of the skill across all stages of the product lifecycle — from defining the task to implementing the solution" />
          <SoftCard t="Gap" text="A small gap. The candidate confidently handles organization and launch. A higher score would have required more data-driven case examples" />
        </div>
        {/* cone diagram */}
        <div className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[#e6ece4] bg-gradient-to-br from-[#f7fbf0] via-white to-[#eef7e0] p-4">
          <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#7AB800]/12 blur-3xl" />
          <p className="relative text-sm font-semibold" style={{ color: INK }}>
            Problem solving <span className="ml-1 text-xl font-bold" style={{ color: GREEN }}>82%</span>
          </p>
          <div className="relative mx-auto"><ConeChart val={82} req={86} color={GREEN} /></div>
          <div className="relative space-y-2 text-xs">
            <LegendRow c="#bfe3ec" t="Gap" v="-4%" vc={RED} />
            <LegendRow c={GREEN} t="Candidate level" v="82%" />
            <LegendRow c="#d6ebf2" t="Profile requirement" v="86%" />
          </div>
        </div>
      </div>

      {/* why not higher / lower */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#fff5f5] p-4">
          <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: RED }}><TrendingDown className="h-4 w-4" /> Why not higher</p>
          <p className="mt-2 text-sm leading-snug text-[#183833]/70">
            He demonstrates solutions to organizational and conceptual problems, but not analytical ones (for example, &quot;why is conversion dropping&quot; or &quot;how to improve retention&quot;)
          </p>
        </div>
        <div className="rounded-2xl bg-[#f3faea] p-4">
          <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: GREEN }}><TrendingUp className="h-4 w-4" /> Why not lower</p>
          <p className="mt-2 text-sm leading-snug text-[#183833]/70">
            Strong proactivity and focus on results. The candidate takes ownership of difficult decisions and sees them through to implementation
          </p>
        </div>
      </div>

      {/* audio markers */}
      <div className="mt-4 rounded-2xl bg-[#f6faef] p-4">
        <p className="text-sm font-bold" style={{ color: INK }}>Audio markers</p>
        <p className="mt-1 text-xs text-[#183833]/55">When discussing solutions, he sounds confident and direct, focusing on actions and results</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Maintains an even, businesslike pace when describing the problem and solution, reflecting a pragmatic approach",
            "Quickly moves from describing the problem to solving it — a sign of a well-developed skill",
          ].map((m) => (
            <div key={m} className="flex items-start gap-2"><AudioLines className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><span className="text-xs leading-snug text-[#183833]/65">{m}</span></div>
          ))}
        </div>
      </div>

      {/* quotes */}
      <div className="mt-4 rounded-2xl bg-[#f6faef] p-4">
        <p className="text-sm font-bold" style={{ color: INK }}>Quotes</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            "They had a problem: they didn't understand how to consolidate marketing resources in that market",
            "The idea was to create a game to reduce stress for people ready to invest from another region",
            "I insisted on changing the concept",
          ].map((q) => (
            <div key={q} className="flex items-start gap-2"><MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><span className="text-xs italic leading-snug text-[#183833]/60">{q}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =====================  ПРАВЫЙ ВЕРХ — информация о кандидате  ===================== */
export function CandidateInfoCard() {
  return (
    <div className="rounded-3xl border border-[#e6ece4] bg-white p-5 shadow-[0_24px_60px_rgba(24,56,51,0.16)]">
      <h3 className="text-base font-bold">Candidate information</h3>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Info icon={<Briefcase className="h-4 w-4" />} t="Experience" v="9 years" />
        <Info icon={<Building2 className="h-4 w-4" />} t="Companies" v="Ozon, Yandex, fintech" />
        <Info icon={<Wallet className="h-4 w-4" />} t="Expectations" v="$2,800 (net)" />
        <Info icon={<Home className="h-4 w-4" />} t="Format" v="hybrid / remote" />
      </div>
      <p className="mt-4 border-t border-[#eef0ee] pt-4 text-sm leading-relaxed text-[#183833]/70">
        An experienced IT project leader in e-commerce and fintech. Has managed distributed teams of up to 15 people,
        launched products from scratch, and scaled existing ones
      </p>
    </div>
  );
}

/* =====================  ПРАВЫЙ НИЗ — решение о переходе  ===================== */
export function DecisionCard() {
  return (
    <div className="rounded-3xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] to-[#eef7e0] p-5 shadow-[0_24px_60px_rgba(24,56,51,0.16)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-base font-bold"><Check className="h-5 w-5" style={{ color: GREEN }} /> Decision to advance to the next stage</h3>
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
  );
}

/* ── мелкие помощники ── */
function SoftCard({ t, text }: { t: string; text: string }) {
  return <div className="rounded-2xl bg-[#f6faef] p-4"><p className="text-sm font-bold" style={{ color: INK }}>{t}</p><p className="mt-1.5 text-xs leading-snug text-[#183833]/70">{text}</p></div>;
}
function Info({ icon, t, v }: { icon: React.ReactNode; t: string; v: string }) {
  return <div className="flex items-start gap-2"><span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f4f7f2] text-[#7AB800]">{icon}</span><div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{t}</p><p className="text-xs font-medium">{v}</p></div></div>;
}
function LegendRow({ c, t, v, vc }: { c: string; t: string; v: string; vc?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-[#183833]/70"><span className="h-3 w-3 rounded-sm" style={{ background: c }} /> {t}</span>
      <span className="font-bold tabular-nums" style={{ color: vc || INK }}>{v}</span>
    </div>
  );
}

/* оттенки конуса по уровню */
const CONE_SHADES: Record<string, [string, string, string]> = {
  [GREEN]: ["#a4d44a", "#7AB800", "#5f9b00"],
  [AMBER]: ["#f6cf63", "#E8A317", "#bd840c"],
  [RED]: ["#ff8f8f", "#FF5252", "#dd3b3b"],
};
/* конусная диаграмма уровня (цвет и длина по проценту) */
function ConeChart({ val, req, color }: { val: number; req: number; color: string }) {
  const W = 196, H = 132, cy = H / 2, x0 = 16, x1 = W - 16, maxH = H - 26;
  const Lfull = x1 - x0, half = maxH / 2;
  const [c0, c1, c2] = CONE_SHADES[color] ?? CONE_SHADES[GREEN];
  const xv = x0 + (val / 100) * Lfull, hv = (val / 100) * half;
  const xr = x0 + (req / 100) * Lfull, hr = (req / 100) * half;
  const gid = "rcConeFill", fid = "rcConeGlow";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[112px] w-[168px] shrink-0 overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c0} />
          <stop offset="55%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id={fid} x="-30%" y="-40%" width="160%" height="180%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor={c1} floodOpacity="0.34" />
        </filter>
      </defs>
      <polygon points={`${x0},${cy} ${xr},${cy - hr} ${xr},${cy + hr}`} fill="#bfe3ec" fillOpacity="0.16" stroke="#a9d8e6" strokeWidth="1.8" strokeDasharray="4 4" strokeLinejoin="round" />
      <line x1={xr} y1={cy - hr} x2={xr} y2={cy + hr} stroke="#a9d8e6" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="4 4" />
      <g>
        <polygon points={`${x0},${cy} ${xv},${cy - hv} ${xv},${cy + hv}`} fill={`url(#${gid})`} filter={`url(#${fid})`} strokeLinejoin="round" />
        <line x1={xv} y1={cy - hv} x2={xv} y2={cy + hv} stroke={c2} strokeWidth="3" strokeLinecap="round" />
      </g>
      <circle cx={x0} cy={cy} r="3.4" fill={c2} />
    </svg>
  );
}
