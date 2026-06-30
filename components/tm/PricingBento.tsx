"use client";

import { Check } from "lucide-react";
import { Arrow, GREEN, INK } from "./ui";
import { useLocale } from "./LocaleProvider";
import { PRICING } from "@/lib/content/pricing";

export default function PricingBento() {
  const locale = useLocale();
  const c = PRICING[locale];

  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {c.tiers.map((t) => (
        <div
          key={t.name}
          className={`ease-smooth flex h-full flex-col rounded-3xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 ${
            t.hot
              ? "border-2 shadow-[0_40px_80px_rgba(122,184,0,0.18)]"
              : "border border-gray-100 shadow-[0_24px_60px_rgba(24,56,51,0.07)]"
          }`}
          style={t.hot ? { borderColor: GREEN } : undefined}
        >
          {/* header */}
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold uppercase tracking-wide" style={{ color: t.hot ? GREEN : INK }}>{t.name}</p>
            {t.hot && (
              <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: GREEN }}>
                Popular
              </span>
            )}
          </div>

          {/* price */}
          <div className="mt-5 flex items-end gap-2">
            <span className="text-[2.6rem] font-bold leading-none tracking-tight" style={{ color: INK }}>{t.price}</span>
          </div>
          <p className="mt-2 text-sm font-medium text-[#183833]/55">{t.per}</p>

          {/* description */}
          <p className="mt-4 text-sm leading-snug text-[#183833]/70">{t.desc}</p>

          {/* features */}
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-[#183833]/45">{t.incl}</p>
          <ul className="mt-3 flex-grow space-y-3">
            {t.feats.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] leading-snug text-[#183833]/85">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: `${GREEN}1f` }}>
                  <Check className="h-3 w-3" style={{ color: GREEN }} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA pinned to the bottom */}
          <a
            href="https://app.talentmind.app"
            className={`group mt-8 flex w-full items-center justify-center gap-1.5 rounded-2xl py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${
              t.hot ? "text-white" : "text-[#183833]"
            }`}
            style={t.hot ? { background: GREEN } : { background: "#F4F7F6", border: `1px solid ${INK}1a` }}
          >
            {t.name === "Free" ? c.startFree : c.cta(t.name)}
            <Arrow className={t.hot ? "text-white" : ""} />
          </a>
        </div>
      ))}
    </div>
  );
}
