"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Arrow, GREEN, INK } from "./ui";
import { useLocale } from "./LocaleProvider";
import { PRICING } from "@/lib/content/pricing";

/* Annual discount: paying yearly saves 15% off the monthly price. */
const ANNUAL_DISCOUNT = 0.15;
const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const annualMonthly = (monthly: number) => Math.round(monthly * (1 - ANNUAL_DISCOUNT));

export default function PricingBento() {
  const locale = useLocale();
  const c = PRICING[locale];
  const [annual, setAnnual] = useState(false);

  return (
    <div className="w-full">
      {/* ── billing period toggle ── */}
      <div className="mb-8 flex justify-center sm:mb-10">
        <div className="inline-flex items-center gap-1 rounded-full border border-[#183833]/10 bg-white p-1 shadow-[0_10px_30px_rgba(24,56,51,0.06)]">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={`ease-smooth rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              !annual ? "text-white shadow-[0_8px_20px_rgba(122,184,0,0.28)]" : "text-[#183833]/60 hover:text-[#183833]"
            }`}
            style={!annual ? { background: GREEN } : undefined}
          >
            {c.billMonthly}
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={`ease-smooth flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              annual ? "text-white shadow-[0_8px_20px_rgba(122,184,0,0.28)]" : "text-[#183833]/60 hover:text-[#183833]"
            }`}
            style={annual ? { background: GREEN } : undefined}
          >
            {c.billAnnual}
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
              style={annual ? { background: "rgba(255,255,255,0.22)", color: "#fff" } : { background: `${GREEN}1f`, color: GREEN }}
            >
              {c.save}
            </span>
          </button>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {c.tiers.map((t) => {
          const free = t.monthly === 0;
          const shown = annual && !free ? annualMonthly(t.monthly) : t.monthly;
          const discounted = annual && !free;
          return (
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

              {/* old price + save badge (annual only) */}
              <div className="mt-5 flex h-5 items-center gap-2">
                {discounted && (
                  <>
                    <span className="text-sm font-medium text-[#183833]/40 line-through">{money(t.monthly)}</span>
                    <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold" style={{ background: `${GREEN}1f`, color: GREEN }}>{c.save}</span>
                  </>
                )}
              </div>
              {/* price */}
              <div className="mt-1 flex items-end gap-2">
                <span className="text-[2.6rem] font-bold leading-none tracking-tight" style={{ color: INK }}>{money(shown)}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-[#183833]/55">
                {free ? t.unit : `${discounted ? c.perMonthAnnual : c.perMonth} · ${t.unit}`}
              </p>

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
                {free ? c.startFree : c.cta(t.name)}
                <Arrow className={t.hot ? "text-white" : ""} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
