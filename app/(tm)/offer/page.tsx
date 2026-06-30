"use client";

import { GREEN, INK, TEAL } from "@/components/tm/ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import { OFFER } from "@/lib/content/offer";

export default function OfferPage() {
  const locale = useLocale();
  const c = OFFER[locale];
  const p = c.plans;

  return (
    <main className="relative w-full" style={{ color: INK }}>
      <section className="mx-auto max-w-[860px] px-6 pt-36 pb-20 md:px-8 lg:pt-44">
        <p className="font-mono text-xs uppercase tracking-[0.22em]" style={{ color: GREEN }}>{c.kicker}</p>
        <h1 className="mt-4 text-[clamp(1.9rem,3.4vw,2.9rem)] font-bold leading-[1.1] tracking-tight text-balance">{c.title}</h1>
        <div className="mt-3 space-y-1 text-sm text-[#183833]/55">
          <p className="text-lg font-semibold text-[#183833]/80">{c.org}</p>
          <p>{c.updated}</p>
        </div>

        <div className="mt-10 divide-y divide-[#e6ece4]">
          {c.sections.map((s) => (
            <section key={s.h} className="py-7 first:pt-0">
              <h2 className="text-lg font-bold tracking-tight text-balance sm:text-xl" style={{ color: INK }}>{s.h}</h2>
              <div className="mt-3 space-y-3">
                {s.body.map((b, i) =>
                  typeof b === "string" ? (
                    <p key={i} className="text-[15px] leading-relaxed text-pretty text-[#183833]/75">{b}</p>
                  ) : "sub" in b ? (
                    <p key={i} className="pt-2 text-base font-semibold" style={{ color: INK }}>{b.sub}</p>
                  ) : (
                    <ul key={i} className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#183833]/75 marker:text-[#7AB800]">
                      {b.list.map((li, j) => <li key={j}>{li}</li>)}
                    </ul>
                  )
                )}
              </div>
            </section>
          ))}
        </div>

        {/* PLANS */}
        <div className="mt-14 rounded-[2rem] border border-[#e6ece4] bg-white p-6 shadow-[0_24px_60px_rgba(24,56,51,0.06)] md:p-9">
          <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: TEAL }}>{p.kicker}</p>
          <h2 className="mt-3 text-xl font-bold tracking-tight text-balance sm:text-2xl">{p.title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-pretty text-[#183833]/75">{p.intro}</p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e8efe6]">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#f6faef]" style={{ color: INK }}>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">{p.cPlan}</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">{p.cPrice}</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">{p.cLimit}</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">{p.cIncluded}</th>
                </tr>
              </thead>
              <tbody>
                {p.tiers.map((t) => (
                  <tr key={t.name} className="border-t border-[#eef0ee] align-top">
                    <td className="px-4 py-4 font-bold uppercase tracking-wide" style={{ color: GREEN }}>{t.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap font-semibold" style={{ color: INK }}>{t.price}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-[#183833]/70">{t.limit}</td>
                    <td className="px-4 py-4 text-[#183833]/75">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#183833]/45">{t.incl}</p>
                      <ul className="mt-1.5 space-y-1">
                        {t.feats.map((f) => (
                          <li key={f} className="flex items-start gap-2 leading-snug"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GREEN }} /> {f}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-7 text-sm font-semibold" style={{ color: INK }}>{p.notesLabel}</p>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-[#183833]/75 marker:text-[#7AB800]">
            {p.notes.map((n) => <li key={n}>{n}</li>)}
          </ol>
        </div>

        <p className="mt-10 text-sm text-[#183833]/50">{c.copyright}</p>
      </section>
    </main>
  );
}
