"use client";

import { Dna, FileText, Bot, ArrowRight, Sparkles } from "lucide-react";
import { smoothJumpTo } from "@/components/tm/transition";

/* ── палитра бренда TalentMind ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const AMBER = "#E8A317";
const INK = "#183833";

/* ============================================================
   PlatformFlow — «путь платформы»: 3 шага (культура → отчёт →
   ИИ-ассистент) как соединённый таймлайн с живым мини-превью
   каждого блока. Кликабельно: переход к блоку плавным кроссфейдом.
   ============================================================ */

type Kind = "culture" | "report" | "chat";
const STEPS: { id: string; n: string; color: string; icon: React.ReactNode; title: string; text: string; kind: Kind }[] = [
  { id: "block-1", n: "01", color: GREEN, icon: <Dna className="h-5 w-5" />, title: "Corporate culture", text: "Map your company DNA across 54 parameters", kind: "culture" },
  { id: "block-2", n: "02", color: TEAL, icon: <FileText className="h-5 w-5" />, title: "Candidate report", text: "A breakdown of soft skills and cultural fit", kind: "report" },
  { id: "block-3", n: "03", color: AMBER, icon: <Bot className="h-5 w-5" />, title: "AI assistant", text: "Chat with your whole pipeline in natural language", kind: "chat" },
];

export default function PlatformFlow() {
  return (
    <div className="pl-rise relative mx-auto mt-16 max-w-[980px]">
      <style>{`@keyframes flowSheen { 0% { transform: translateX(-120%) } 100% { transform: translateX(520%) } }`}</style>

      {/* соединительная линия (десктоп) */}
      <div aria-hidden className="absolute inset-x-0 top-[34px] hidden lg:block">
        <div
          className="relative mx-auto h-[3px] w-full overflow-hidden rounded-full [mask-image:linear-gradient(to_right,transparent,#000_17%,#000_83%,transparent)]"
          style={{ background: `linear-gradient(90deg, ${GREEN}, ${TEAL}, ${AMBER})`, opacity: 0.45 }}
        >
          <div className="absolute inset-y-0 left-0 w-1/5 animate-[flowSheen_3.2s_linear_infinite] bg-gradient-to-r from-transparent via-white/85 to-transparent" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {STEPS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => { e.preventDefault(); smoothJumpTo(`#${s.id}`); }}
            aria-label={`Go to ${s.title}`}
            className="group relative flex flex-col items-center rounded-[26px] border border-[#e8efe6] bg-white/95 p-6 pt-16 text-center shadow-[0_18px_44px_rgba(24,56,51,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_32px_70px_rgba(24,56,51,0.14)]"
          >
            {/* акцентное свечение при наведении */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-25" style={{ background: s.color }} />

            {/* узел шага на линии */}
            <span
              className="absolute left-1/2 top-2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full text-sm font-black text-white ring-4 ring-white transition-transform duration-300 group-hover:scale-110"
              style={{ background: s.color, boxShadow: `0 8px 20px ${s.color}55` }}
            >
              {s.n}
            </span>

            <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: `${s.color}1a`, color: s.color }}>{s.icon}</span>
            <h3 className="mt-3 text-lg font-bold tracking-tight" style={{ color: INK }}>{s.title}</h3>
            <p className="mt-1.5 text-sm leading-snug text-[#183833]/60">{s.text}</p>

            {/* живое мини-превью блока */}
            <div className="mt-5 w-full text-left">
              <Preview kind={s.kind} color={s.color} />
            </div>

            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5" style={{ color: s.color }}>
              Open block <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── мини-превью под каждым шагом ── */
function Preview({ kind, color }: { kind: Kind; color: string }) {
  if (kind === "culture") {
    const bars: [string, number][] = [["Innovation", 64], ["Stability", 78], ["Results", 81]];
    return (
      <div className="space-y-2 rounded-2xl border border-[#eef2ec] bg-[#f7faf3] p-3">
        {bars.map(([l, v]) => (
          <div key={l}>
            <div className="flex items-center justify-between text-[10px] font-medium" style={{ color: INK }}>
              <span className="text-[#183833]/60">{l}</span><span style={{ color }}>{v}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#e6efe0]">
              <div className="h-full rounded-full" style={{ width: `${v}%`, background: color }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "report") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-[#d9eef3] bg-[#f3fbfd] p-3">
        <MiniRing value={85} color={color} />
        <div>
          <p className="text-xs font-bold" style={{ color: INK }}>Compatibility</p>
          <span className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${color}1f`, color }}>High fit</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1.5 rounded-2xl border border-[#f3e6c7] bg-[#fdf8ee] p-3">
      <div className="flex justify-end">
        <span className="rounded-2xl rounded-br-sm bg-white px-2.5 py-1 text-[10px] font-medium" style={{ color: INK }}>Best fit for the role?</span>
      </div>
      <div className="flex items-start gap-1.5">
        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full" style={{ background: color }}><Sparkles className="h-2.5 w-2.5 text-white" /></span>
        <span className="rounded-2xl rounded-bl-sm border px-2.5 py-1 text-[10px] font-medium" style={{ background: `${color}14`, borderColor: `${color}33`, color: INK }}>Dmitry — 88% match</span>
      </div>
    </div>
  );
}

function MiniRing({ value, color }: { value: number; color: string }) {
  const r = 16, c = 2 * Math.PI * r, off = c - (value / 100) * c;
  return (
    <div className="relative h-11 w-11 shrink-0">
      <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="#e3eef0" strokeWidth="4" />
        <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray={c.toFixed(1)} strokeDashoffset={off.toFixed(1)} />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[11px] font-bold" style={{ color: INK }}>{value}%</span>
    </div>
  );
}
