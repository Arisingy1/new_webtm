/* ============================================================
   i18n — локали сайта TalentMind.
   EN — в корне (/...), ES — /es/..., PT — /pt/...
   Локаль выводится из URL; контент берётся из словарей.
   ============================================================ */

export type Locale = "en" | "es" | "pt" | "ar";
export const LOCALES: Locale[] = ["en", "es", "pt", "ar"];
export const LOCALE_LABEL: Record<Locale, string> = { en: "English", es: "Español", pt: "Português", ar: "العربية" };
export const LOCALE_SHORT: Record<Locale, string> = { en: "EN", es: "ES", pt: "PT", ar: "ع" };

/** Локали с письмом справа налево. */
export const RTL_LOCALES: Locale[] = ["ar"];
export const isRTL = (locale: Locale): boolean => RTL_LOCALES.includes(locale);

/** Локаль из пути: /es/... → es, /pt/... → pt, /ar/... → ar, иначе en. */
export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/pt" || pathname.startsWith("/pt/")) return "pt";
  if (pathname === "/ar" || pathname.startsWith("/ar/")) return "ar";
  return "en";
}

/** Путь без префикса локали: /es/pricing → /pricing. */
export function stripLocale(pathname: string): string {
  const l = getLocaleFromPath(pathname);
  if (l === "en") return pathname || "/";
  const base = pathname.slice(3);
  return base.startsWith("/") ? base : "/" + base || "/";
}

/** Добавить префикс локали к внутренней ссылке. */
export function localize(href: string, locale: Locale): string {
  if (locale === "en" || !href.startsWith("/")) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

/* ── словарь интерфейса (шапка/подвал) ── */
type UI = {
  nav: { softskill: string; culture: string; geoculture: string; pricing: string; partners: string; contacts: string };
  login: string;
  tryFree: string;
  footer: {
    tagline: string;
    linkedin: string;
    product: string;
    resources: string;
    links: { softskill: string; culture: string; pricing: string; contacts: string; api: string; security: string; partners: string };
    privacy: string;
    terms: string;
    language: string;
    rights: string;
  };
};

export const T: Record<Locale, UI> = {
  en: {
    nav: { softskill: "Soft-skill report", culture: "Culture Fit report", geoculture: "Geoculture", pricing: "Pricing", partners: "Partners", contacts: "Contacts" },
    login: "Log in",
    tryFree: "Try for free",
    footer: {
      tagline: "Built for teams that hire the best",
      linkedin: "LinkedIn",
      product: "Product",
      resources: "Resources",
      links: { softskill: "Soft-skill report", culture: "Culture Fit report", pricing: "Pricing", contacts: "Contacts", api: "API", security: "Security", partners: "Partners" },
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      language: "Language",
      rights: "© 2026 TalentMind AI CORP",
    },
  },
  es: {
    nav: { softskill: "Informe soft skills", culture: "Informe de culture fit", geoculture: "Geocultura", pricing: "Precios", partners: "Socios", contacts: "Contacto" },
    login: "Iniciar sesión",
    tryFree: "Probar gratis",
    footer: {
      tagline: "Creado para equipos que contratan a los mejores",
      linkedin: "LinkedIn",
      product: "Producto",
      resources: "Recursos",
      links: { softskill: "Informe soft skills", culture: "Informe de culture fit", pricing: "Precios", contacts: "Contacto", api: "API", security: "Seguridad", partners: "Socios" },
      privacy: "Política de privacidad",
      terms: "Términos del servicio",
      language: "Idioma",
      rights: "© 2026 TalentMind AI CORP",
    },
  },
  pt: {
    nav: { softskill: "Relatório soft skills", culture: "Relatório de culture fit", geoculture: "Geocultura", pricing: "Preços", partners: "Parceiros", contacts: "Contato" },
    login: "Entrar",
    tryFree: "Experimentar grátis",
    footer: {
      tagline: "Feito para equipes que contratam os melhores",
      linkedin: "LinkedIn",
      product: "Produto",
      resources: "Recursos",
      links: { softskill: "Relatório soft skills", culture: "Relatório de culture fit", pricing: "Preços", contacts: "Contato", api: "API", security: "Segurança", partners: "Parceiros" },
      privacy: "Política de privacidade",
      terms: "Termos de serviço",
      language: "Idioma",
      rights: "© 2026 TalentMind AI CORP",
    },
  },
  ar: {
    nav: { softskill: "تقرير المهارات", culture: "تقرير التوافق الثقافي", geoculture: "الجيوثقافة", pricing: "الأسعار", partners: "الشركاء", contacts: "تواصل معنا" },
    login: "تسجيل الدخول",
    tryFree: "جرّب مجانًا",
    footer: {
      tagline: "مصمّم للفِرق التي توظّف الأفضل",
      linkedin: "لينكدإن",
      product: "المنتج",
      resources: "الموارد",
      links: { softskill: "تقرير المهارات", culture: "تقرير التوافق الثقافي", pricing: "الأسعار", contacts: "تواصل معنا", api: "API", security: "الأمان", partners: "الشركاء" },
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      language: "اللغة",
      rights: "© 2026 TalentMind AI CORP",
    },
  },
};
