"use client";

import { useEffect, useState } from "react";
import { Dna, FileText, Bot, ArrowRight, Sparkles } from "lucide-react";
import { smoothJumpTo } from "@/components/tm/transition";
import { useLocale } from "@/components/tm/LocaleProvider";
import { PLATFORM } from "@/lib/content/platform";
import type { Locale } from "@/lib/i18n";

/* строки живых мини-превью под шагами */
const PV: Record<Locale, { cultureBars: [string, string, string]; compatibility: string; highFit: string; q: string; a: string }> = {
  en: { cultureBars: ["Innovation", "Stability", "Results"], compatibility: "Compatibility", highFit: "High fit", q: "Best fit for the role?", a: "Dmitry — 88% match" },
  es: { cultureBars: ["Innovación", "Estabilidad", "Resultados"], compatibility: "Compatibilidad", highFit: "Encaje alto", q: "¿Quién encaja mejor para el puesto?", a: "Dmitry — 88% de coincidencia" },
  pt: { cultureBars: ["Inovação", "Estabilidade", "Resultados"], compatibility: "Compatibilidade", highFit: "Alto encaixe", q: "Quem encaixa melhor na vaga?", a: "Dmitry — 88% de correspondência" },
  ar: { cultureBars: ["الابتكار", "الاستقرار", "النتائج"], compatibility: "التوافق", highFit: "توافق عالٍ", q: "من الأنسب للدور؟", a: "Dmitry — توافق بنسبة 88%" },
};

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
const STEPS: { id: string; color: string; icon: React.ReactNode; title: string; text: string; kind: Kind }[] = [
  { id: "block-1", color: GREEN, icon: <Dna className="h-6 w-6" />, title: "Corporate culture", text: "Map your company DNA across 54 parameters", kind: "culture" },
  { id: "block-2", color: TEAL, icon: <FileText className="h-6 w-6" />, title: "Candidate report", text: "A breakdown of soft skills and cultural fit", kind: "report" },
  { id: "block-3", color: AMBER, icon: <Bot className="h-6 w-6" />, title: "AI assistant", text: "Chat with your whole pipeline in natural language", kind: "chat" },
];

export default function PlatformFlow() {
  const c = PLATFORM[useLocale()];
  return (
    <div className="pl-rise relative mx-auto mt-16 max-w-[980px]">
      <style>{`@keyframes flowSheen { 0% { transform: translateX(-120%) } 100% { transform: translateX(520%) } }`}</style>

      {/* соединительная линия (десктоп) — связывает иконки-узлы */}
      <div aria-hidden className="absolute inset-x-0 top-[40px] hidden lg:block">
        <div
          className="relative mx-auto h-[3px] w-full overflow-hidden rounded-full [mask-image:linear-gradient(to_right,transparent,#000_17%,#000_83%,transparent)]"
          style={{ background: `linear-gradient(90deg, ${GREEN}, ${TEAL}, ${AMBER})`, opacity: 0.45 }}
        >
          <div className="absolute inset-y-0 left-0 w-1/5 animate-[flowSheen_3.2s_linear_infinite] bg-gradient-to-r from-transparent via-white/85 to-transparent" />
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
        {STEPS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => { e.preventDefault(); smoothJumpTo(`#${s.id}`); }}
            aria-label={c.flow[s.kind].title}
            className="group relative flex flex-col items-center rounded-[26px] border border-[#e8efe6] bg-white/95 p-6 pt-20 text-center shadow-[0_18px_44px_rgba(24,56,51,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_32px_70px_rgba(24,56,51,0.14)]"
          >
            {/* акцентное свечение при наведении */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-25" style={{ background: s.color }} />

            {/* иконка-узел на линии */}
            <span
              className="absolute left-1/2 top-3 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-2xl ring-4 ring-white transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${s.color}1a`, color: s.color, boxShadow: `0 8px 22px ${s.color}30` }}
            >
              {s.icon}
            </span>

            <h3 className="text-lg font-bold tracking-tight" style={{ color: INK }}>{c.flow[s.kind].title}</h3>
            <p className="mt-1.5 text-sm leading-snug text-[#183833]/60">{c.flow[s.kind].text}</p>

            {/* живое мини-превью блока (растягивается, чтобы кнопки были на одном уровне) */}
            <div className="mt-5 w-full flex-1 text-left">
              <Preview kind={s.kind} color={s.color} />
            </div>

            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5" style={{ color: s.color }}>
              {c.openBlock} <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── мини-превью под каждым шагом ── */
function Preview({ kind, color }: { kind: Kind; color: string }) {
  const t = PV[useLocale()];
  if (kind === "culture") {
    const bars: [string, number][] = [[t.cultureBars[0], 64], [t.cultureBars[1], 78], [t.cultureBars[2], 81]];
    return (
      <div className="space-y-2 rounded-2xl border border-[#eef2ec] bg-[#f7faf3] p-3">
        {bars.map(([l, v]) => (
          <div key={l}>
            <div className="flex items-center justify-between text-[10px] font-medium">
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
          <p className="text-xs font-bold" style={{ color: INK }}>{t.compatibility}</p>
          <span className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${color}1f`, color }}>{t.highFit}</span>
        </div>
      </div>
    );
  }

  return <MiniChat color={color} />;
}

/* ── маленький анимированный чат ИИ-ассистента (как в блоке ниже) ── */
function MiniChat({ color }: { color: string }) {
  const { q: Q, a: A } = PV[useLocale()];
  const [phase, setPhase] = useState(0); // 0 пусто · 1 вопрос · 2 печатает · 3 ответ
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 4), 1300);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-[96px] flex-col justify-end gap-1.5 rounded-2xl border border-[#f3e6c7] bg-[#fdf8ee] p-3">
      <div className={`flex justify-end transition-all duration-300 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
        <span className="rounded-2xl rounded-br-sm bg-white px-2.5 py-1 text-[10px] font-medium shadow-sm" style={{ color: INK }}>{Q}</span>
      </div>

      {phase === 2 ? (
        <div className="flex items-center gap-1.5">
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full" style={{ background: color }}><Sparkles className="h-2.5 w-2.5 text-white" /></span>
          <span className="flex gap-1 rounded-2xl rounded-bl-sm border px-2 py-1.5" style={{ background: `${color}14`, borderColor: `${color}33` }}>
            <span className="h-1 w-1 animate-bounce rounded-full" style={{ background: `${color}aa` }} />
            <span className="h-1 w-1 animate-bounce rounded-full" style={{ background: `${color}aa`, animationDelay: "0.15s" }} />
            <span className="h-1 w-1 animate-bounce rounded-full" style={{ background: `${color}aa`, animationDelay: "0.3s" }} />
          </span>
        </div>
      ) : (
        <div className={`flex items-start gap-1.5 transition-all duration-300 ${phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full" style={{ background: color }}><Sparkles className="h-2.5 w-2.5 text-white" /></span>
          <span className="rounded-2xl rounded-bl-sm border px-2.5 py-1 text-[10px] font-medium" style={{ background: `${color}14`, borderColor: `${color}33`, color: INK }}>{A}</span>
        </div>
      )}
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
