"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>("en");

/** Локаль выводится из текущего пути (/es/…, /pt/…). */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
