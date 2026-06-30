"use client";

import { Globe } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}
import { usePathname } from "next/navigation";
import { INK } from "./ui";
import { useLocale } from "./LocaleProvider";
import { T, LOCALES, LOCALE_LABEL, LOCALE_SHORT, localize, stripLocale, type Locale } from "@/lib/i18n";

export default function Footer() {
  const locale = useLocale();
  const t = T[locale];
  const pathname = usePathname() || "/";
  const base = stripLocale(pathname); // путь без префикса локали

  const L = t.footer.links;
  const cols: { h: string; links: [string, string][] }[] = [
    { h: t.footer.product, links: [[L.platform, "/platform"], [L.pricing, "/pricing"], [L.contacts, "/contacts"]] },
    { h: t.footer.resources, links: [[L.api, "/api"], [L.security, "/security"], [L.partners, "/partners"]] },
  ];

  return (
    <footer className="relative z-10 overflow-hidden pt-20 text-white" style={{ background: INK }}>
      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 pb-16 md:grid-cols-[1.8fr_1fr_1fr]">
        <div>
          <img
            src="/figma/logo.svg"
            alt="TalentMind"
            className="h-9 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="mt-4 max-w-xs text-sm text-white/55">{t.footer.tagline}</p>
          <a
            href="https://www.linkedin.com/company/talentmindapp"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            <LinkedInIcon className="h-4 w-4" /> {t.footer.linkedin}
          </a>
        </div>
        {cols.map((col) => (
          <div key={col.h}>
            <p className="text-sm font-semibold">{col.h}</p>
            <ul className="mt-4 space-y-3">
              {col.links.map(([l, href]) => (
                <li key={l}>
                  <a href={localize(href, locale)} className="text-sm text-white/55 transition-colors hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── переключатель языка ── */}
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center gap-4 px-6 pb-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2.5">
          <Globe className="h-4 w-4 text-white/45" />
          <span className="text-sm text-white/45">{t.footer.language}:</span>
          <div className="flex items-center gap-1">
            {LOCALES.map((lc: Locale) => {
              const on = lc === locale;
              return (
                <a
                  key={lc}
                  href={localize(base, lc)}
                  aria-current={on}
                  title={LOCALE_LABEL[lc]}
                  className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${on ? "bg-white text-[#183833]" : "text-white/55 hover:bg-white/10 hover:text-white"}`}
                >
                  {LOCALE_SHORT[lc]}
                </a>
              );
            })}
          </div>
        </div>
        <p className="text-xs text-white/35">{LOCALE_LABEL[locale]}</p>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-8 text-sm text-white/40 sm:flex-row">
        <p>{t.footer.rights}</p>
        <div className="flex items-center gap-6">
          <a href={localize("/privacy", locale)} className="transition-colors hover:text-white">{t.footer.privacy}</a>
          <a href={localize("/offer", locale)} className="transition-colors hover:text-white">{t.footer.terms}</a>
        </div>
      </div>

      <h2 className="pointer-events-none block select-none text-center text-[15vw] font-black leading-none tracking-tight text-white/[0.05]" style={{ marginBottom: "-0.02em" }}>
        TalentMind
      </h2>
    </footer>
  );
}
