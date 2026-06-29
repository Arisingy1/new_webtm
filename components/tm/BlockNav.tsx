"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { smoothJumpTo } from "@/components/tm/transition";

/* ============================================================
   BlockNav — глобальный прогресс-бар страницы платформы по трём
   блокам (корпоративная культура · отчёт · ИИ-ассистент).
   Закреплён справа по центру; кнопки «назад» (вверх) и «далее»
   (вниз) перемещают к предыдущему / следующему блоку. Узлы
   кликабельны, активный блок подсвечивается. Только десктоп.
   ============================================================ */

const INK = "#183833";

export type NavBlock = { id: string; label: string; color: string };

export default function BlockNav({ blocks }: { blocks: NavBlock[] }) {
  const [active, setActive] = useState(0);
  const elsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const els = blocks.map((b) => document.getElementById(b.id)).filter(Boolean) as HTMLElement[];
    elsRef.current = els;
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = els.indexOf(e.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [blocks]);

  const goto = (i: number) => {
    const t = Math.max(0, Math.min(blocks.length - 1, i));
    smoothJumpTo("#" + blocks[t].id);
  };

  const fillPct = blocks.length > 1 ? (active / (blocks.length - 1)) * 100 : 0;
  const accent = blocks[active]?.color ?? INK;

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {/* назад — к предыдущему блоку */}
      <button
        type="button"
        onClick={() => goto(active - 1)}
        disabled={active === 0}
        aria-label="Previous section"
        className="ease-smooth grid h-10 w-10 place-items-center rounded-full border border-[#183833]/10 bg-white/90 text-[#183833] shadow-[0_8px_22px_rgba(24,56,51,0.10)] backdrop-blur transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
        style={active !== 0 ? { color: accent } : undefined}
      >
        <ChevronUp className="h-4 w-4" />
      </button>

      {/* узлы блоков */}
      <div className="relative flex h-[168px] flex-col items-center justify-between py-1">
        <span aria-hidden className="absolute left-1/2 top-2 bottom-2 w-[2px] -translate-x-1/2 rounded-full bg-[#e3eedb]" />
        <span
          aria-hidden
          className="ease-smooth absolute left-1/2 top-2 w-[2px] -translate-x-1/2 rounded-full transition-all duration-500"
          style={{ height: `calc(${fillPct}% )`, background: accent }}
        />
        {blocks.map((b, i) => {
          const on = i === active, done = i < active;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => goto(i)}
              aria-label={`Go to ${b.label}`}
              aria-current={on}
              className="group relative z-10 grid place-items-center"
            >
              {/* подпись слева */}
              <span
                className="ease-smooth pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold text-white shadow-lg transition-all duration-200"
                style={{
                  background: INK,
                  opacity: on ? 1 : 0,
                  transform: on ? "translateX(0)" : "translateX(6px)",
                }}
              >
                {b.label}
              </span>
              <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100" style={{ background: INK }}>
                {b.label}
              </span>
              {/* точка */}
              <span
                className="ease-smooth grid place-items-center rounded-full border-2 transition-all duration-300"
                style={
                  on
                    ? { height: 18, width: 18, background: b.color, borderColor: b.color, boxShadow: `0 0 0 5px ${b.color}22` }
                    : done
                    ? { height: 12, width: 12, background: b.color, borderColor: b.color }
                    : { height: 12, width: 12, background: "#fff", borderColor: "#cfdcc6" }
                }
              />
            </button>
          );
        })}
      </div>

      {/* далее — к следующему блоку (основное действие) */}
      <button
        type="button"
        onClick={() => goto(active + 1)}
        disabled={active === blocks.length - 1}
        aria-label="Next section"
        className="ease-smooth grid h-10 w-10 place-items-center rounded-full text-white shadow-[0_10px_24px_rgba(122,184,0,0.34)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
        style={{ background: accent }}
      >
        <ChevronDown className="h-4 w-4" />
      </button>
    </nav>
  );
}
