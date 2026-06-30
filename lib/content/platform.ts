import type { Locale } from "@/lib/i18n";

export type PlatformContent = {
  pre: string; accent: string; post: string;
  p: string; ctaStart: string; ctaPricing: string;
  openBlock: string;
  flow: { culture: { title: string; text: string }; report: { title: string; text: string }; chat: { title: string; text: string } };
  cta: { title: string; sub: string; button: string };
};

const en: PlatformContent = {
  pre: "One platform to hire by your ", accent: "culture", post: "",
  p: "Corporate culture, candidate reports and an AI assistant — together in a single workflow. From your company DNA to a confident hiring decision",
  ctaStart: "Start for free", ctaPricing: "View pricing", openBlock: "Open block",
  flow: {
    culture: { title: "Corporate culture", text: "Map your company DNA across 54 parameters" },
    report: { title: "Candidate report", text: "A breakdown of soft skills and cultural fit" },
    chat: { title: "AI assistant", text: "Chat with your whole pipeline in natural language" },
  },
  cta: { title: "Bring the whole platform to your hiring", sub: "Culture profile, candidate reports and the AI assistant in one place. First 5 analyses free", button: "Start for free" },
};

const es: PlatformContent = {
  pre: "Una plataforma para contratar según tu ", accent: "cultura", post: "",
  p: "Cultura corporativa, informes de candidatos y un asistente de IA, juntos en un único flujo. Desde el ADN de tu empresa hasta una decisión de contratación con confianza",
  ctaStart: "Empezar gratis", ctaPricing: "Ver precios", openBlock: "Abrir bloque",
  flow: {
    culture: { title: "Cultura corporativa", text: "Mapea el ADN de tu empresa en 54 parámetros" },
    report: { title: "Informe del candidato", text: "Un desglose de soft skills y ajuste cultural" },
    chat: { title: "Asistente de IA", text: "Chatea con todo tu pipeline en lenguaje natural" },
  },
  cta: { title: "Lleva toda la plataforma a tu contratación", sub: "Perfil de cultura, informes de candidatos y el asistente de IA en un solo lugar. Los primeros 5 análisis gratis", button: "Empezar gratis" },
};

const pt: PlatformContent = {
  pre: "Uma plataforma para contratar pela sua ", accent: "cultura", post: "",
  p: "Cultura corporativa, relatórios de candidatos e um assistente de IA, juntos em um único fluxo. Do DNA da sua empresa a uma decisão de contratação com confiança",
  ctaStart: "Começar grátis", ctaPricing: "Ver preços", openBlock: "Abrir bloco",
  flow: {
    culture: { title: "Cultura corporativa", text: "Mapeie o DNA da sua empresa em 54 parâmetros" },
    report: { title: "Relatório do candidato", text: "Um resumo de soft skills e ajuste cultural" },
    chat: { title: "Assistente de IA", text: "Converse com todo o seu pipeline em linguagem natural" },
  },
  cta: { title: "Leve toda a plataforma para sua contratação", sub: "Perfil de cultura, relatórios de candidatos e o assistente de IA em um só lugar. As primeiras 5 análises grátis", button: "Começar grátis" },
};

const ar: PlatformContent = {
  pre: "منصة واحدة للتوظيف وفق ", accent: "ثقافتك", post: "",
  p: "الثقافة المؤسسية وتقارير المرشّحين ومساعد الذكاء الاصطناعي — معًا في سير عمل واحد. من الحمض النووي لشركتك إلى قرار توظيف واثق",
  ctaStart: "ابدأ مجانًا", ctaPricing: "عرض الأسعار", openBlock: "فتح القسم",
  flow: {
    culture: { title: "الثقافة المؤسسية", text: "ارسم الحمض النووي لشركتك عبر 54 معيارًا" },
    report: { title: "تقرير المرشّح", text: "تحليل تفصيلي للمهارات الشخصية والتوافق الثقافي" },
    chat: { title: "مساعد الذكاء الاصطناعي", text: "تحدّث مع قائمة مرشّحيك بالكامل بلغة طبيعية" },
  },
  cta: { title: "أضف المنصة بالكامل إلى عملية التوظيف لديك", sub: "ملف الثقافة وتقارير المرشّحين ومساعد الذكاء الاصطناعي في مكان واحد. أول 5 تحليلات مجانًا", button: "ابدأ مجانًا" },
};

export const PLATFORM: Record<Locale, PlatformContent> = { en, es, pt, ar };
