"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Arrow, GREEN, INK } from "./ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import { localize, type Locale } from "@/lib/i18n";

const DICT: Record<Locale, { evaluate: string; start: string }> = {
  en: { evaluate: "Evaluate 5 candidates for free", start: "Start" },
  es: { evaluate: "Evalúa 5 candidatos gratis", start: "Empezar" },
  pt: { evaluate: "Avalie 5 candidatos grátis", start: "Começar" },
  ar: { evaluate: "قيّم 5 مرشّحين مجانًا", start: "ابدأ" },
};

export default function StickyCTA() {
  const locale = useLocale();
  const t = DICT[locale];
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { yPercent: 140, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1 }
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-2xl px-5 py-3 shadow-[0_20px_50px_rgba(24,56,51,0.4)]"
      style={{ background: INK }}
    >
      <p className="hidden text-sm font-medium text-white sm:block">
        {t.evaluate}
      </p>
      <a
        href={localize("/pricing", locale)}
        className="group flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold text-white"
        style={{ background: GREEN }}
      >
        {t.start}
        <Arrow className="text-white" />
      </a>
    </div>
  );
}
