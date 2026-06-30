"use client";

import { GREEN, INK } from "@/components/tm/ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import { PRIVACY } from "@/lib/content/privacy";

export default function PrivacyPage() {
  const locale = useLocale();
  const c = PRIVACY[locale];

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
                    <ul key={i} className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed marker:text-[#7AB800] text-[#183833]/75">
                      {b.list.map((li, j) => <li key={j}>{li}</li>)}
                    </ul>
                  )
                )}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-[#183833]/50">{c.copyright}</p>
      </section>
    </main>
  );
}
