"use client";

import { LayoutGrid, Users, BarChart3, FileText, Settings } from "lucide-react";
import { GREEN, TEAL, INK } from "./ui";

/* ============================================================
   «Результаты сравнения» — живой превью-экран платформы:
   боковая панель + список кандидатов с оценкой совместимости.
   ============================================================ */
const AMBER = "#E8A317";

type Cand = { name: string; v: number; d: string };
const CANDS: Cand[] = [
  { name: "Dmitry Smirnov", v: 88, d: "Strong T-shaped profile: deep expertise in project management plus a broad set of competencies. Solves problems and adapts quickly." },
  { name: "Sofia Kovaleva", v: 82, d: "Well-rounded skill set that combines fundamental knowledge with diverse domains. Communicates ideas clearly and gets things done effectively." },
  { name: "Egor Morozov", v: 80, d: "Versatile profile that pairs a solid foundation with new domains. Forward-looking mindset and a drive to grow." },
  { name: "Anna Sokolova", v: 78, d: "Combines general knowledge with a broad range of competencies. Articulates thoughts clearly and adapts flexibly to new environments." },
  { name: "Maxim Orlov", v: 76, d: "Broad skill set and varied experience. Expresses ideas clearly and handles complex tasks." },
  { name: "Maria Lebedeva", v: 60, d: "Versatile skill set that blends deep knowledge with a wide range of abilities. Articulates ideas effectively." },
  { name: "Pavel Novikov", v: 58, d: "Diverse skill set that combines general knowledge with different domains. Solves practical tasks effectively." },
];
const col = (v: number) => (v >= 70 ? GREEN : AMBER);

function Pct({ v }: { v: number }) {
  return <span className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: col(v) }}>{v}%</span>;
}
function Interview() {
  return <span className="rounded-md px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${TEAL}14`, color: TEAL }}>Interview</span>;
}
function More() {
  return <span className="inline-flex items-center gap-1 text-[11px] font-semibold" style={{ color: GREEN }}>Details →</span>;
}

export function ComparisonPanel() {
  return (
    <div className="flex h-full overflow-hidden rounded-3xl border border-[#e9efe6] bg-white shadow-[0_28px_60px_rgba(24,56,51,0.16)]">
      {/* боковая панель */}
      <div className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-[#eef0ee] bg-[#fafcf8] py-4 sm:flex">
        <img src="/logo-sign.svg" alt="" className="h-7 w-7" />
        <div className="mt-3 flex flex-col items-center gap-2.5">
          {[LayoutGrid, Users, BarChart3, FileText].map((Icon, i) => (
            <span key={i} className={`grid h-8 w-8 place-items-center rounded-xl ${i === 1 ? "" : ""}`} style={i === 1 ? { background: `${GREEN}1a`, color: GREEN } : { color: "#9fb0a6" }}>
              <Icon className="h-4 w-4" />
            </span>
          ))}
        </div>
        <span className="mt-auto grid h-8 w-8 place-items-center rounded-xl text-[#9fb0a6]"><Settings className="h-4 w-4" /></span>
      </div>

      {/* контент */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#eef0ee] px-5 py-3.5">
          <p className="text-base font-bold" style={{ color: INK }}>Comparison results</p>
          <span className="rounded-full bg-[#f4f7f2] px-2.5 py-1 text-[10px] font-semibold text-[#183833]/55">7 candidates</span>
        </div>

        <div className="px-4 py-4">
          {/* топ-3 в ряд */}
          <div className="grid grid-cols-3 gap-2.5">
            {CANDS.slice(0, 3).map((c) => (
              <div key={c.name} className="relative rounded-2xl border border-[#eef0ee] bg-white p-3 shadow-[0_6px_18px_rgba(24,56,51,0.05)]">
                <span className="absolute right-2.5 top-2.5 rounded-md bg-[#eef2ec] px-1.5 py-0.5 text-[8px] font-bold text-[#183833]/45">AI</span>
                <div className="flex items-center gap-1.5"><Pct v={c.v} /><Interview /></div>
                <p className="mt-2 text-[13px] font-bold leading-tight" style={{ color: INK }}>{c.name}</p>
                <p className="mt-1 line-clamp-3 text-[10.5px] leading-snug text-[#183833]/55">{c.d}</p>
                <div className="mt-2.5"><More /></div>
              </div>
            ))}
          </div>

          {/* остальные — строки */}
          <div className="mt-3 space-y-2.5">
            {CANDS.slice(3).map((c) => (
              <div key={c.name} className="relative rounded-2xl border border-[#eef0ee] bg-white p-3 shadow-[0_6px_18px_rgba(24,56,51,0.04)]">
                <span className="absolute right-3 top-3 rounded-md bg-[#eef2ec] px-1.5 py-0.5 text-[8px] font-bold text-[#183833]/45">AI</span>
                <div className="flex items-center gap-2"><Pct v={c.v} /><p className="text-[13px] font-bold" style={{ color: INK }}>{c.name}</p><Interview /></div>
                <p className="mt-1.5 line-clamp-2 pr-8 text-[11px] leading-snug text-[#183833]/55">{c.d}</p>
                <div className="mt-2 flex justify-end"><More /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
