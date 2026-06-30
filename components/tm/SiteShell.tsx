"use client";

import { useEffect } from "react";
import { useLocale } from "@/components/tm/LocaleProvider";
import { isRTL } from "@/lib/i18n";

/* ============================================================
   SiteShell — корневая обёртка сайта: задаёт направление письма
   (RTL для арабского) и подходящий шрифт. Для арабского — Cairo,
   для остальных — основной дисплейный шрифт. dir выставляется и на
   <html> (для фиксированных оверлеев и скроллбара).
   ============================================================ */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const rtl = isRTL(locale);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", rtl ? "rtl" : "ltr");
    html.setAttribute("lang", locale);
    return () => {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
    };
  }, [rtl, locale]);

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      lang={locale}
      className="relative w-full overflow-x-clip text-[#183833] antialiased"
      style={{ fontFamily: rtl ? "var(--font-arabic), system-ui, sans-serif" : "var(--font-display), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
