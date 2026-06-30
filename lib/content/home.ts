import type { Locale } from "@/lib/i18n";

export type HomeContent = {
  heroA: string; heroAccent: string; heroB: string;
  heroP: string; heroCta: string;
  stats: [string, string][];
  bvA: string; bvAccent: string; bvP: string;
  marquee: string;
  auto: Record<"fit" | "report" | "copilot" | "integrations", { pre: string; accent: string; post: string; link: string }>;
};

const en: HomeContent = {
  heroA: "AI assessment of soft skills and ", heroAccent: "cultural fit", heroB: " for every candidate",
  heroP: "TalentMind is the platform that analyzes interview recordings and evaluates candidates through the lens of your company culture. See the accuracy for yourself — get 5 full reports for free",
  heroCta: "Start for free",
  stats: [["Time to hire", "Recruiter time per role"], ["Offer conversion", "from interview to offer"], ["Hiring quality", "Fewer bad hires"]],
  bvA: "Deep candidate analytics built on ", bvAccent: "objective data",
  bvP: "Built to take the routine off HR and give a complete picture of every candidate, the TalentMind platform helps you make well-grounded decisions faster. AI analyzes interview recordings, surfacing hidden soft-skill patterns and corporate-culture fit to protect your business from costly hiring mistakes",
  marquee: "Evaluate 5 candidates for free",
  auto: {
    fit: { pre: "", accent: "Cultural fit", post: " analysis across 54 parameters", link: "See how values assessment works" },
    report: { pre: "A ready candidate profile backed by ", accent: "objective reasoning", post: "", link: "See a sample report" },
    copilot: { pre: "AI assistant: ", accent: "“chat”", post: " with your candidate pipeline", link: "See a sample chat" },
    integrations: { pre: "Embed ", accent: "AI analysis", post: " into your existing hiring workflow", link: "Go to API" },
  },
};

const es: HomeContent = {
  heroA: "Evaluación con IA de soft skills y ", heroAccent: "ajuste cultural", heroB: " para cada candidato",
  heroP: "TalentMind es la plataforma que analiza grabaciones de entrevistas y evalúa a los candidatos a través del prisma de la cultura de tu empresa. Comprueba tú mismo la precisión: obtén 5 informes completos gratis",
  heroCta: "Empezar gratis",
  stats: [["Tiempo de contratación", "Tiempo del reclutador por vacante"], ["Conversión a oferta", "de la entrevista a la oferta"], ["Calidad de contratación", "Menos contrataciones fallidas"]],
  bvA: "Analítica profunda de candidatos basada en ", bvAccent: "datos objetivos",
  bvP: "Creada para quitar la rutina a RR. HH. y dar una visión completa de cada candidato, la plataforma TalentMind te ayuda a tomar decisiones bien fundadas más rápido. La IA analiza las grabaciones de entrevistas y revela patrones ocultos de soft skills y de ajuste con la cultura corporativa para proteger tu negocio de errores de contratación costosos",
  marquee: "Evalúa 5 candidatos gratis",
  auto: {
    fit: { pre: "Análisis de ", accent: "ajuste cultural", post: " en 54 parámetros", link: "Ver cómo funciona la evaluación de valores" },
    report: { pre: "Un perfil de candidato listo, respaldado por ", accent: "razonamiento objetivo", post: "", link: "Ver un informe de ejemplo" },
    copilot: { pre: "Asistente de IA: ", accent: "“chatea”", post: " con tu pipeline de candidatos", link: "Ver un chat de ejemplo" },
    integrations: { pre: "Integra el ", accent: "análisis con IA", post: " en tu flujo de contratación actual", link: "Ir a la API" },
  },
};

const pt: HomeContent = {
  heroA: "Avaliação com IA de soft skills e ", heroAccent: "ajuste cultural", heroB: " para cada candidato",
  heroP: "A TalentMind é a plataforma que analisa gravações de entrevistas e avalia os candidatos sob a ótica da cultura da sua empresa. Comprove você mesmo a precisão: receba 5 relatórios completos grátis",
  heroCta: "Começar grátis",
  stats: [["Tempo de contratação", "Tempo do recrutador por vaga"], ["Conversão em oferta", "da entrevista à oferta"], ["Qualidade da contratação", "Menos contratações ruins"]],
  bvA: "Análise profunda de candidatos baseada em ", bvAccent: "dados objetivos",
  bvP: "Criada para tirar a rotina do RH e dar uma visão completa de cada candidato, a plataforma TalentMind ajuda você a tomar decisões bem fundamentadas mais rápido. A IA analisa as gravações de entrevistas e revela padrões ocultos de soft skills e de ajuste à cultura corporativa para proteger seu negócio de erros de contratação caros",
  marquee: "Avalie 5 candidatos grátis",
  auto: {
    fit: { pre: "Análise de ", accent: "ajuste cultural", post: " em 54 parâmetros", link: "Ver como funciona a avaliação de valores" },
    report: { pre: "Um perfil de candidato pronto, com ", accent: "raciocínio objetivo", post: "", link: "Ver um relatório de exemplo" },
    copilot: { pre: "Assistente de IA: ", accent: "“converse”", post: " com seu pipeline de candidatos", link: "Ver um chat de exemplo" },
    integrations: { pre: "Integre a ", accent: "análise com IA", post: " ao seu fluxo de contratação atual", link: "Ir para a API" },
  },
};

const ar: HomeContent = {
  heroA: "تقييم بالذكاء الاصطناعي للمهارات الشخصية و", heroAccent: "التوافق الثقافي", heroB: " لكل مرشّح",
  heroP: "TalentMind هي المنصة التي تحلّل تسجيلات المقابلات وتقيّم المرشّحين من منظور ثقافة شركتك. تحقّق من الدقة بنفسك واحصل على 5 تقارير كاملة مجانًا",
  heroCta: "ابدأ مجانًا",
  stats: [["مدة التوظيف", "وقت جهة التوظيف لكل دور"], ["تحويل العروض", "من المقابلة إلى العرض"], ["جودة التوظيف", "أخطاء توظيف أقل"]],
  bvA: "تحليلات معمّقة للمرشّحين مبنيّة على ", bvAccent: "بيانات موضوعية",
  bvP: "صُمّمت منصة TalentMind لتخفيف العبء الروتيني عن الموارد البشرية وتقديم صورة كاملة عن كل مرشّح، فتساعدك على اتخاذ قرارات مدروسة بشكل أسرع. يحلّل الذكاء الاصطناعي تسجيلات المقابلات ويكشف أنماط المهارات الشخصية الخفيّة ومدى التوافق مع الثقافة المؤسسية لحماية عملك من أخطاء التوظيف المكلفة",
  marquee: "قيّم 5 مرشّحين مجانًا",
  auto: {
    fit: { pre: "", accent: "التوافق الثقافي", post: " تحليل عبر 54 معيارًا", link: "اطّلع على كيفية عمل تقييم القيم" },
    report: { pre: "ملف مرشّح جاهز مدعوم بـ", accent: "تحليل موضوعي", post: "", link: "اطّلع على نموذج تقرير" },
    copilot: { pre: "مساعد الذكاء الاصطناعي: ", accent: "“تحدّث”", post: " مع قائمة مرشّحيك", link: "اطّلع على نموذج محادثة" },
    integrations: { pre: "ادمج ", accent: "تحليل الذكاء الاصطناعي", post: " في سير عمل التوظيف الحالي لديك", link: "انتقل إلى API" },
  },
};

export const HOME: Record<Locale, HomeContent> = { en, es, pt, ar };
