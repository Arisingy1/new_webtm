"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X, Sparkles, Check, AlertTriangle, Flame, AudioLines, MessageSquareQuote,
  Briefcase, Building2, Wallet, Home, GitBranch, TrendingUp, TrendingDown,
  Dna, Target, ChevronDown,
} from "lucide-react";
import { useLocale } from "@/components/tm/LocaleProvider";
import type { Locale } from "@/lib/i18n";

/* ── палитра ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const AMBER = "#E8A317";
const RED = "#FF5252";

/* ============================================================
   /softskill-report/example — «Пример отчёта» (отдельная страница).
   Полностью свёрстанный отчёт по кандидату с анимациями.
   У каждого soft-skill кнопка «Подробнее» открывает модальное
   окно с детальным разбором. Добавлен блок «Корпоративная
   совместимость».
   ============================================================ */

const ARGS_FOR: Record<Locale, string[]> = {
  en: [
    "Proven track record of launches at large companies",
    "Strong communication skills and the ability to persuade",
    "Experience in a product environment (e-commerce)",
    "High level of self-awareness and systems thinking",
  ],
  es: [
    "Historial probado de lanzamientos en grandes empresas",
    "Sólidas habilidades de comunicación y capacidad de persuasión",
    "Experiencia en un entorno de producto (comercio electrónico)",
    "Alto nivel de autoconocimiento y pensamiento sistémico",
  ],
  pt: [
    "Histórico comprovado de lançamentos em grandes empresas",
    "Sólidas habilidades de comunicação e capacidade de persuasão",
    "Experiência em um ambiente de produto (comércio eletrônico)",
    "Alto nível de autoconhecimento e pensamento sistêmico",
  ],
  ar: [
    "سجل حافل ومُثبَت في إطلاق المنتجات داخل الشركات الكبرى",
    "مهارات تواصل قوية وقدرة على الإقناع",
    "خبرة في بيئة منتجات (التجارة الإلكترونية)",
    "مستوى عالٍ من الوعي الذاتي والتفكير المنظومي",
  ],
};
const ARGS_AGAINST: Record<Locale, string[]> = {
  en: ["High salary expectations", "Limited experience in custom/agency development"],
  es: ["Expectativas salariales altas", "Experiencia limitada en desarrollo a medida/de agencia"],
  pt: ["Expectativas salariais altas", "Experiência limitada em desenvolvimento sob medida/de agência"],
  ar: ["توقعات مرتفعة بشأن الراتب", "خبرة محدودة في تطوير الحلول المخصّصة / عبر الوكالات"],
};

type Skill = { name: string; val: number; req: number; desc: string };
/* числовые поля (val/req) — общая база; текст (name/desc) — по локали, зипуется по индексу */
const SKILLS_BASE: { val: number; req: number }[] = [
  { val: 78, req: 86 },
  { val: 72, req: 86 },
  { val: 80, req: 80 },
  { val: 85, req: 80 },
  { val: 75, req: 72 },
  { val: 68, req: 84 },
  { val: 46, req: 80 },
  { val: 70, req: 85 },
  { val: 82, req: 86 },
  { val: 80, req: 80 },
];
const SKILLS_TEXT: Record<Locale, { name: string; desc: string }[]> = {
  en: [
    { name: "Management", desc: "Strong project-delivery skills — independently built and coordinated a team of 12. His experience at the fund proves an ability to oversee execution" },
    { name: "Leadership", desc: "Demonstrates leadership through accountability and initiative. His management style is functional rather than visionary" },
    { name: "Communication", desc: "Highly developed skill. Expresses ideas clearly and in a structured way, and listens attentively. Communicates effectively with the tech team and clients" },
    { name: "Planning", desc: "One of his strongest qualities. Proven experience building systems from scratch under uncertainty. Skilled at breaking work down into tasks" },
    { name: "Adaptability", desc: "Experience across different environments (fund, EdTech, startup) and methodologies points to strong adaptability to new conditions" },
    { name: "Stress resilience", desc: "Shows calm, controlled behavior. Speech markers indicate self-control, but there are no real-world examples of performing under stress" },
    { name: "Teamwork", desc: "Understands the importance of dialogue but prefers face-to-face contact. Successfully assembled and coordinated a team" },
    { name: "Empathy", desc: "Shows empathy through a focus on the product's value to the user. Tends toward a generalized approach" },
    { name: "Problem solving", desc: "Strong skill. Able to analyze situations and find and implement non-standard solutions (confirmed by case examples)" },
    { name: "Critical thinking", desc: "Assesses not only how to do something but why — questions the value of processes and selects the best approaches" },
  ],
  es: [
    { name: "Gestión", desc: "Sólidas habilidades de ejecución de proyectos: formó y coordinó de forma autónoma un equipo de 12 personas. Su experiencia en el fondo demuestra la capacidad de supervisar la ejecución" },
    { name: "Liderazgo", desc: "Muestra liderazgo a través de la responsabilidad y la iniciativa. Su estilo de gestión es más funcional que visionario" },
    { name: "Comunicación", desc: "Habilidad muy desarrollada. Expresa sus ideas con claridad y de forma estructurada, y escucha con atención. Se comunica con eficacia con el equipo técnico y los clientes" },
    { name: "Planificación", desc: "Una de sus cualidades más fuertes. Experiencia probada construyendo sistemas desde cero en condiciones de incertidumbre. Hábil para desglosar el trabajo en tareas" },
    { name: "Adaptabilidad", desc: "Su experiencia en distintos entornos (fondo, EdTech, startup) y metodologías apunta a una sólida adaptabilidad a nuevas condiciones" },
    { name: "Resiliencia al estrés", desc: "Muestra un comportamiento tranquilo y controlado. Los marcadores del habla indican autocontrol, pero no hay ejemplos reales de desempeño bajo estrés" },
    { name: "Trabajo en equipo", desc: "Comprende la importancia del diálogo, pero prefiere el contacto cara a cara. Formó y coordinó un equipo con éxito" },
    { name: "Empatía", desc: "Muestra empatía a través del enfoque en el valor del producto para el usuario. Tiende a un enfoque generalizado" },
    { name: "Resolución de problemas", desc: "Habilidad sólida. Capaz de analizar situaciones y de encontrar e implementar soluciones no estándar (confirmado por los ejemplos de casos)" },
    { name: "Pensamiento crítico", desc: "Evalúa no solo cómo hacer algo, sino por qué: cuestiona el valor de los procesos y selecciona los mejores enfoques" },
  ],
  pt: [
    { name: "Gestão", desc: "Sólidas habilidades de execução de projetos: montou e coordenou de forma autônoma uma equipe de 12 pessoas. Sua experiência no fundo comprova a capacidade de supervisionar a execução" },
    { name: "Liderança", desc: "Demonstra liderança por meio da responsabilidade e da iniciativa. Seu estilo de gestão é mais funcional do que visionário" },
    { name: "Comunicação", desc: "Habilidade muito desenvolvida. Expressa suas ideias com clareza e de forma estruturada, e escuta com atenção. Comunica-se com eficácia com a equipe técnica e os clientes" },
    { name: "Planejamento", desc: "Uma de suas qualidades mais fortes. Experiência comprovada na construção de sistemas do zero em condições de incerteza. Habilidoso em decompor o trabalho em tarefas" },
    { name: "Adaptabilidade", desc: "Sua experiência em diferentes ambientes (fundo, EdTech, startup) e metodologias aponta para uma sólida adaptabilidade a novas condições" },
    { name: "Resiliência ao estresse", desc: "Apresenta um comportamento calmo e controlado. Os marcadores da fala indicam autocontrole, mas não há exemplos reais de desempenho sob estresse" },
    { name: "Trabalho em equipe", desc: "Compreende a importância do diálogo, mas prefere o contato cara a cara. Montou e coordenou uma equipe com sucesso" },
    { name: "Empatia", desc: "Demonstra empatia por meio do foco no valor do produto para o usuário. Tende a uma abordagem generalizada" },
    { name: "Resolução de problemas", desc: "Habilidade sólida. Capaz de analisar situações e de encontrar e implementar soluções não convencionais (confirmado pelos exemplos de casos)" },
    { name: "Pensamento crítico", desc: "Avalia não apenas como fazer algo, mas por quê: questiona o valor dos processos e seleciona as melhores abordagens" },
  ],
  ar: [
    { name: "الإدارة", desc: "مهارات قوية في تنفيذ المشاريع وتسليمها؛ بنى ونسّق بشكل مستقل فريقًا من 12 شخصًا. تثبت خبرته في الصندوق قدرته على الإشراف على التنفيذ" },
    { name: "القيادة", desc: "يُظهر القيادة من خلال تحمّل المسؤولية والمبادرة. أسلوبه الإداري وظيفي أكثر منه استشرافي" },
    { name: "التواصل", desc: "مهارة متطورة للغاية. يعبّر عن أفكاره بوضوح وبطريقة منظَّمة، ويُصغي باهتمام. يتواصل بفعالية مع الفريق التقني والعملاء" },
    { name: "التخطيط", desc: "من أبرز نقاط قوته. خبرة مُثبَتة في بناء الأنظمة من الصفر في ظل عدم اليقين. بارع في تقسيم العمل إلى مهام" },
    { name: "القدرة على التكيّف", desc: "تشير خبرته في بيئات مختلفة (الصندوق، التعليم التقني، الشركات الناشئة) ومنهجيات متعددة إلى قدرة قوية على التكيّف مع الظروف الجديدة" },
    { name: "تحمّل الضغط", desc: "يُظهر سلوكًا هادئًا ومنضبطًا. تشير مؤشرات الكلام إلى ضبط النفس، لكن لا توجد أمثلة واقعية على الأداء تحت الضغط" },
    { name: "العمل الجماعي", desc: "يدرك أهمية الحوار لكنه يفضّل التواصل المباشر وجهًا لوجه. نجح في تكوين فريق وتنسيقه" },
    { name: "التعاطف", desc: "يُظهر التعاطف من خلال التركيز على قيمة المنتج للمستخدم. يميل إلى اتباع نهج عام" },
    { name: "حل المشكلات", desc: "مهارة قوية. قادر على تحليل المواقف وإيجاد حلول غير تقليدية وتطبيقها (مؤكَّد بأمثلة الحالات)" },
    { name: "التفكير النقدي", desc: "يُقيّم ليس فقط كيفية إنجاز العمل بل سببه؛ يتساءل عن قيمة العمليات ويختار أفضل الأساليب" },
  ],
};
const SKILLS: Record<Locale, Skill[]> = {
  en: SKILLS_BASE.map((b, i) => ({ ...b, ...SKILLS_TEXT.en[i] })),
  es: SKILLS_BASE.map((b, i) => ({ ...b, ...SKILLS_TEXT.es[i] })),
  pt: SKILLS_BASE.map((b, i) => ({ ...b, ...SKILLS_TEXT.pt[i] })),
  ar: SKILLS_BASE.map((b, i) => ({ ...b, ...SKILLS_TEXT.ar[i] })),
};

const RADAR_BASE: { v: number; req: number }[] = [
  { v: 35, req: 86 }, { v: 90, req: 86 }, { v: 40, req: 80 },
  { v: 30, req: 80 }, { v: 72, req: 72 }, { v: 50, req: 84 },
  { v: 18, req: 80 }, { v: 25, req: 85 }, { v: 62, req: 86 },
  { v: 62, req: 80 },
];
const RADAR_LABELS: Record<Locale, string[]> = {
  en: ["Management", "Leadership", "Communication", "Planning", "Adaptability", "Stress resilience", "Teamwork", "Empathy", "Problem solving", "Critical thinking"],
  es: ["Gestión", "Liderazgo", "Comunicación", "Planificación", "Adaptabilidad", "Resiliencia al estrés", "Trabajo en equipo", "Empatía", "Resolución de problemas", "Pensamiento crítico"],
  pt: ["Gestão", "Liderança", "Comunicação", "Planejamento", "Adaptabilidade", "Resiliência ao estresse", "Trabalho em equipe", "Empatia", "Resolução de problemas", "Pensamento crítico"],
  ar: ["الإدارة", "القيادة", "التواصل", "التخطيط", "القدرة على التكيّف", "تحمّل الضغط", "العمل الجماعي", "التعاطف", "حل المشكلات", "التفكير النقدي"],
};

/* оценка корпоративной совместимости — кандидат против эталонного профиля культуры */
type CDim = { name: string; val: number; ref: number };
const COMPAT_SCORE = 74;
const COMPAT_DIMS_BASE: { val: number; ref: number }[] = [
  { val: 82, ref: 78 },
  { val: 80, ref: 78 },
  { val: 76, ref: 74 },
  { val: 70, ref: 68 },
  { val: 64, ref: 78 },
  { val: 58, ref: 60 },
  { val: 55, ref: 58 },
];
const COMPAT_DIMS_NAMES: Record<Locale, string[]> = {
  en: ["Stability and processes", "Results orientation", "Attention to detail", "People orientation", "Teamwork", "Innovation / flexibility", "Competitiveness"],
  es: ["Estabilidad y procesos", "Orientación a resultados", "Atención al detalle", "Orientación a las personas", "Trabajo en equipo", "Innovación / flexibilidad", "Competitividad"],
  pt: ["Estabilidade e processos", "Orientação a resultados", "Atenção aos detalhes", "Orientação às pessoas", "Trabalho em equipe", "Inovação / flexibilidade", "Competitividade"],
  ar: ["الاستقرار والعمليات", "التوجّه نحو النتائج", "الاهتمام بالتفاصيل", "التوجّه نحو الأشخاص", "العمل الجماعي", "الابتكار / المرونة", "التنافسية"],
};
const COMPAT_DIMS: Record<Locale, CDim[]> = {
  en: COMPAT_DIMS_BASE.map((b, i) => ({ ...b, name: COMPAT_DIMS_NAMES.en[i] })),
  es: COMPAT_DIMS_BASE.map((b, i) => ({ ...b, name: COMPAT_DIMS_NAMES.es[i] })),
  pt: COMPAT_DIMS_BASE.map((b, i) => ({ ...b, name: COMPAT_DIMS_NAMES.pt[i] })),
  ar: COMPAT_DIMS_BASE.map((b, i) => ({ ...b, name: COMPAT_DIMS_NAMES.ar[i] })),
};
const COMPAT_MATCHES: Record<Locale, [string, string][]> = {
  en: [
    ["Manages tasks systematically", "Plans, meets deadlines, and sees work through to results — the way the team expects."],
    ["Attentive to detail", "Double-checks results and doesn't miss the small things — fewer errors at product launch."],
    ["Owns the outcome", "Takes responsibility instead of shifting it to others — easy to manage."],
  ],
  es: [
    ["Gestiona las tareas de forma sistemática", "Planifica, cumple los plazos y lleva el trabajo hasta los resultados, tal como el equipo espera."],
    ["Atento al detalle", "Revisa dos veces los resultados y no pasa por alto los pequeños detalles: menos errores en el lanzamiento del producto."],
    ["Asume el resultado", "Se responsabiliza en lugar de trasladarlo a otros: fácil de dirigir."],
  ],
  pt: [
    ["Gerencia as tarefas de forma sistemática", "Planeja, cumpre os prazos e leva o trabalho até os resultados, como a equipe espera."],
    ["Atento aos detalhes", "Revisa duas vezes os resultados e não deixa passar os pequenos detalhes: menos erros no lançamento do produto."],
    ["Assume o resultado", "Assume a responsabilidade em vez de transferi-la para os outros: fácil de gerenciar."],
  ],
  ar: [
    ["يدير المهام بشكل منهجي", "يخطّط، ويلتزم بالمواعيد النهائية، ويقود العمل حتى تحقيق النتائج، تمامًا كما يتوقع الفريق."],
    ["منتبه للتفاصيل", "يراجع النتائج مرتين ولا يُغفل التفاصيل الصغيرة: أخطاء أقل عند إطلاق المنتج."],
    ["يتحمّل مسؤولية النتيجة", "يتحمّل المسؤولية بدلًا من إلقائها على الآخرين: سهل الإدارة."],
  ],
};
const COMPAT_ATTENTION: Record<Locale, [string, string][]> = {
  en: [
    ["Team collaboration", "Prefers to resolve issues one-on-one. Early on, it's worth agreeing on regular team meetings."],
    ["Response to change", "Cautious about abrupt changes of plan. It's better to give clear priorities and time to adapt."],
  ],
  es: [
    ["Colaboración en equipo", "Prefiere resolver los problemas uno a uno. Al principio, conviene acordar reuniones de equipo periódicas."],
    ["Respuesta al cambio", "Es cauteloso ante los cambios bruscos de plan. Es mejor darle prioridades claras y tiempo para adaptarse."],
  ],
  pt: [
    ["Colaboração em equipe", "Prefere resolver as questões individualmente. No início, vale a pena combinar reuniões de equipe regulares."],
    ["Resposta à mudança", "É cauteloso diante de mudanças bruscas de plano. É melhor dar prioridades claras e tempo para se adaptar."],
  ],
  ar: [
    ["التعاون ضمن الفريق", "يفضّل حل المسائل بشكل ثنائي. من المفيد في البداية الاتفاق على اجتماعات فريق منتظمة."],
    ["الاستجابة للتغيير", "يتعامل بحذر مع التغييرات المفاجئة في الخطط. من الأفضل منحه أولويات واضحة ووقتًا للتكيّف."],
  ],
};

const UI: Record<Locale, {
  resultsTitle: string;
  resultsSubtitle: string;
  candidateName: string;
  candidateRole: string;
  candidateIndustry: string;
  matchScore: string;
  candidateInfo: string;
  infoExperience: string; infoExperienceV: string;
  infoCompanies: string; infoCompaniesV: string;
  infoExpectations: string; infoExpectationsV: string;
  infoFormat: string; infoFormatV: string;
  candidateBio: string;
  decisionTitle: string;
  recommended: string;
  argsFor: string;
  argsAgainst: string;
  culturalFit: string;
  culturalFitSub: string;
  compatibilityIndex: string;
  highCompatibility: string;
  compatibilityDesc: { a: string; b: string; c: string };
  strongMatchesShort: string;
  areasToWatchShort: string;
  matchByDimension: string;
  gapToBenchmark: string;
  strongMatches: string;
  areasToWatch: string;
  risks: string;
  strengths: string;
  psycholinguistics: string;
  we: string; i: string;
  balanceTitle: string; balanceText: string;
  toneTitle: string; toneText: string;
  locusTitle: string; locusText: string;
  riskBlocks: { t: string; badge: string; text: string }[];
  strengthBlocks: { t: string; text: string }[];
  matchDiagram: string;
  matchDiagramSub: string;
  averageDeviation: string;
  topRisks: string;
  topRiskRows: [string, string][];
  closestMatch: string;
  closestMatchText: string;
  softSkillsMap: string;
  softSkillsMapSub: string;
  learnMore: string;
  caseExamples: string;
  cases: { title: string; s: string; t: string; a: string; r: string; note: string }[];
  recommendations: string;
  recos: { title: string; text: string; qs: string[] }[];
  footer: string;
  /* modal */
  close: string;
  roleExpectations: string; roleExpectationsText: string;
  gapTitle: string; gapNegative: string; gapNonNegative: string;
  gapLegend: string; candidateLevel: string; profileRequirement: string;
  whyNotHigher: string; whyNotHigherText: string;
  whyNotLower: string; whyNotLowerText: string;
  audioMarkers: string; audioMarkersIntro: string; audioMarkerList: string[];
  quotes: string; quoteList: string[];
  /* rose legend */
  roseProfileReq: string; roseLow: string; roseMedium: string; roseHigh: string;
  dimOnTarget: string; dimClose: string; dimBelow: string;
}> = {
  en: {
    resultsTitle: "Analysis results",
    resultsSubtitle: "A detailed breakdown of soft skills and cultural fit based on a real interview",
    candidateName: "James Bennett",
    candidateRole: "Senior Project Manager",
    candidateIndustry: "IT · e-commerce",
    matchScore: "Match score",
    candidateInfo: "Candidate information",
    infoExperience: "Experience", infoExperienceV: "9 years",
    infoCompanies: "Companies", infoCompaniesV: "Ozon, Yandex, fintech",
    infoExpectations: "Expectations", infoExpectationsV: "$2,800 (net)",
    infoFormat: "Format", infoFormatV: "hybrid / remote",
    candidateBio: "An experienced IT project leader in e-commerce and fintech. Has managed distributed teams of up to 15 people, launched products from scratch, and scaled existing ones",
    decisionTitle: "Decision to advance to the next stage",
    recommended: "Recommended",
    argsFor: "Arguments for",
    argsAgainst: "Arguments against",
    culturalFit: "Cultural fit assessment",
    culturalFitSub: "How well the candidate's values and behavior align with the company's DNA and cultural code",
    compatibilityIndex: "Compatibility index",
    highCompatibility: "High compatibility",
    compatibilityDesc: { a: "The candidate is a good fit for a team that values ", b: "processes, deadlines, and quality", c: ": his strengths align with the requirements of the role. The main thing to watch during onboarding is team collaboration." },
    strongMatchesShort: "strong matches",
    areasToWatchShort: "areas to watch",
    matchByDimension: "Match by dimension",
    gapToBenchmark: "gap to benchmark",
    strongMatches: "Strong matches",
    areasToWatch: "Areas to watch",
    risks: "Risks",
    strengths: "Strengths",
    psycholinguistics: "Psycholinguistics",
    we: "We", i: "I",
    balanceTitle: `"I" / "We" balance`, balanceText: `Balances "I" for personal accountability and "We" for team processes — a mature distribution of focus`,
    toneTitle: "Tone", toneText: "Calm, measured, controlled. Speaks unhurriedly, with a low, even timbre",
    locusTitle: "Locus of control", locusText: "Takes responsibility, analyzes, and draws conclusions rather than shifting blame onto external circumstances",
    riskBlocks: [
      { t: "Attrition risk", badge: "Critical", text: "The candidate openly states that his current company is a way to obtain accreditation and a deferral" },
      { t: "Limited experience in a classic role", badge: "Important", text: "His main relevant experience is a single project resembling freelance work. He may lack the skills needed at a large IT company" },
      { t: "Process-focused", badge: "Note", text: "His case examples emphasize organization and launches, but show almost no work with data and metrics (LTV, conversion)" },
    ],
    strengthBlocks: [
      { t: "Systems thinking", text: "Able to build processes from scratch, break work down into tasks, and take a product through to launch" },
      { t: "Full project lifecycle", text: "Confidently runs a project at every stage — from idea and team-building to launch and growth" },
      { t: "Reflectiveness", text: "Analyzes the value of the work and decides based on real impact rather than heroics" },
    ],
    matchDiagram: "Match diagram",
    matchDiagramSub: "The chart shows where the candidate falls short of the profile requirements",
    averageDeviation: "Average deviation",
    topRisks: "Top risks",
    topRiskRows: [
      ["Stress resilience", "The score is based on the candidate's calm demeanor, without real examples of performing under stressful conditions"],
      ["Empathy", "There are indirect signs, but no direct examples of how empathy shapes product decisions"],
      ["Leadership", "Demonstrated mainly through project management; lacks examples of vision-setting and motivating a team under difficult conditions"],
    ],
    closestMatch: "Closest match",
    closestMatchText: "The candidate's profile is closest to the requirements on the Planning and Problem solving skills",
    softSkillsMap: "Soft skills map",
    softSkillsMapSub: "A detailed gap analysis, mini-chart, and quotes open in a modal window",
    learnMore: "Learn more →",
    caseExamples: "Case examples (STAR method)",
    cases: [
      {
        title: "Case 1: Building a gamified platform for a real-estate agency",
        s: "An agency in the UAE struggled to attract investors due to a high barrier to entry and a lack of understanding of the market",
        t: "Create a marketing product that introduces investors to the market in a gamified way and boosts engagement",
        a: "Acted as PM/PO. Assembled a team of 12 (developers, ML, marketing). Managed everything from game design to release",
        r: "The project was successfully delivered to the client. Specific business metrics (ROI, number of investors) were not disclosed",
        note: "A strong full-lifecycle management case. Showed initiative and organizational skills. The weak point is the absence of business results in numbers",
      },
      {
        title: "Case 2: Building a management system at a venture fund",
        s: "At the outset, the fund had no startup evaluation (due diligence) or tracking processes, which created chaos",
        t: "Implement an internal management system to structure work with startups (CRM and tracking)",
        a: "Implemented the tool. Built control and feedback processes with the portfolio companies",
        r: "Created a system for conducting proper due diligence. Reduced operational risks",
        note: "Clearly illustrates planning skills and process-building under uncertainty. However, the role here is more process-oriented than product-oriented",
      },
    ],
    recommendations: "Recommendations for the next stages",
    recos: [
      {
        title: "Experience with product analytics",
        text: "The case examples show no work with metrics (A/B tests, retention, LTV, funnels). This is critical for a data-driven product manager",
        qs: [
          "Give an example of when you used data to make an important decision. Which metrics did you look at?",
          "How did you define the key success metrics for the gamified project? How did you track them?",
          "Have you faced a situation where the data contradicted your hypothesis? What did you do?",
        ],
      },
      {
        title: "Stakeholder management in a corporate environment",
        text: "All of his experience is either with a single client or monitoring at the fund. It's unclear how he would handle an environment with conflicting interests",
        qs: [
          "Describe the most difficult situation you've faced managing expectations. What was the conflict and how did you resolve it?",
          "How did you set up the roadmap alignment process across different departments?",
          "What would you do if sales needs a feature \"yesterday\" but engineering estimates it at 3 months?",
        ],
      },
      {
        title: "Experience running user research (customer development)",
        text: "The candidate talks about the importance of the audience but gives no real examples of in-depth interviews, surveys, or behavioral analysis",
        qs: [
          "How did user research influence your product's backlog or roadmap?",
          "Which research methods have you applied in practice?",
          "How do you separate what users say from what they actually need?",
        ],
      },
    ],
    footer: "TalentMind · automatically generated report · demo data",
    close: "Close",
    roleExpectations: "Role expectations",
    roleExpectationsText: "Requires confident command of the skill across all stages of the product lifecycle — from defining the task to implementing the solution",
    gapTitle: "Gap",
    gapNegative: "A small gap. The candidate confidently handles organization and launch. A higher score would have required more data-driven case examples",
    gapNonNegative: "No gap — the candidate meets or exceeds the profile requirements on this skill",
    gapLegend: "Gap",
    candidateLevel: "Candidate level",
    profileRequirement: "Profile requirement",
    whyNotHigher: "Why not higher",
    whyNotHigherText: "He demonstrates solutions to organizational and conceptual problems, but not analytical ones (for example, “why conversion is dropping” or “how to improve retention”)",
    whyNotLower: "Why not lower",
    whyNotLowerText: "Strong proactivity and focus on results. The candidate is able to take ownership of difficult decisions and see them through to implementation",
    audioMarkers: "Audio markers",
    audioMarkersIntro: "When discussing solutions, he sounds confident and direct, focusing on actions and results",
    audioMarkerList: [
      "Maintains an even, businesslike pace when describing the problem and solution, reflecting a pragmatic approach",
      "Quickly moves from describing the problem to solving it — a sign of a well-developed skill",
    ],
    quotes: "Quotes",
    quoteList: [
      "They had a problem: they didn't understand how to consolidate marketing resources in that market",
      "The idea was to create a game to reduce stress for people ready to invest from another region",
      "I insisted on changing the concept",
    ],
    roseProfileReq: "Profile requirement", roseLow: "Low skill level", roseMedium: "Medium skill level", roseHigh: "High skill level",
    dimOnTarget: "On target", dimClose: "Close", dimBelow: "Below benchmark",
  },
  es: {
    resultsTitle: "Resultados del análisis",
    resultsSubtitle: "Un desglose detallado de las habilidades blandas y la compatibilidad cultural basado en una entrevista real",
    candidateName: "Diego Fernández",
    candidateRole: "Jefe de Proyecto Sénior",
    candidateIndustry: "TI · comercio electrónico",
    matchScore: "Índice de compatibilidad",
    candidateInfo: "Información del candidato",
    infoExperience: "Experiencia", infoExperienceV: "9 años",
    infoCompanies: "Empresas", infoCompaniesV: "Ozon, Yandex, fintech",
    infoExpectations: "Expectativas", infoExpectationsV: "$2,800 (neto)",
    infoFormat: "Formato", infoFormatV: "híbrido / remoto",
    candidateBio: "Líder de proyectos de TI con experiencia en comercio electrónico y fintech. Ha gestionado equipos distribuidos de hasta 15 personas, lanzado productos desde cero y escalado los existentes",
    decisionTitle: "Decisión de avanzar a la siguiente etapa",
    recommended: "Recomendado",
    argsFor: "Argumentos a favor",
    argsAgainst: "Argumentos en contra",
    culturalFit: "Evaluación de compatibilidad cultural",
    culturalFitSub: "Hasta qué punto los valores y el comportamiento del candidato se alinean con el ADN y el código cultural de la empresa",
    compatibilityIndex: "Índice de compatibilidad",
    highCompatibility: "Compatibilidad alta",
    compatibilityDesc: { a: "El candidato encaja bien en un equipo que valora los ", b: "procesos, los plazos y la calidad", c: ": sus fortalezas se alinean con los requisitos del puesto. Lo principal a vigilar durante la incorporación es la colaboración en equipo." },
    strongMatchesShort: "coincidencias fuertes",
    areasToWatchShort: "áreas a vigilar",
    matchByDimension: "Coincidencia por dimensión",
    gapToBenchmark: "brecha respecto al referente",
    strongMatches: "Coincidencias fuertes",
    areasToWatch: "Áreas a vigilar",
    risks: "Riesgos",
    strengths: "Fortalezas",
    psycholinguistics: "Psicolingüística",
    we: "Nosotros", i: "Yo",
    balanceTitle: `Equilibrio "Yo" / "Nosotros"`, balanceText: `Equilibra el "Yo" para la responsabilidad personal y el "Nosotros" para los procesos de equipo: una distribución madura del enfoque`,
    toneTitle: "Tono", toneText: "Tranquilo, mesurado, controlado. Habla sin prisa, con un timbre bajo y uniforme",
    locusTitle: "Locus de control", locusText: "Asume la responsabilidad, analiza y extrae conclusiones en lugar de culpar a las circunstancias externas",
    riskBlocks: [
      { t: "Riesgo de rotación", badge: "Crítico", text: "El candidato afirma abiertamente que su empresa actual es una forma de obtener acreditación y un aplazamiento" },
      { t: "Experiencia limitada en un rol clásico", badge: "Importante", text: "Su principal experiencia relevante es un único proyecto que se asemeja al trabajo freelance. Puede carecer de las habilidades necesarias en una gran empresa de TI" },
      { t: "Enfocado en procesos", badge: "Nota", text: "Sus ejemplos de casos enfatizan la organización y los lanzamientos, pero apenas muestran trabajo con datos y métricas (LTV, conversión)" },
    ],
    strengthBlocks: [
      { t: "Pensamiento sistémico", text: "Capaz de construir procesos desde cero, desglosar el trabajo en tareas y llevar un producto hasta el lanzamiento" },
      { t: "Ciclo de vida completo del proyecto", text: "Dirige un proyecto con seguridad en todas las etapas: desde la idea y la formación del equipo hasta el lanzamiento y el crecimiento" },
      { t: "Capacidad de reflexión", text: "Analiza el valor del trabajo y decide en función del impacto real y no del heroísmo" },
    ],
    matchDiagram: "Diagrama de compatibilidad",
    matchDiagramSub: "El gráfico muestra dónde el candidato no alcanza los requisitos del perfil",
    averageDeviation: "Desviación media",
    topRisks: "Principales riesgos",
    topRiskRows: [
      ["Resiliencia al estrés", "La puntuación se basa en la actitud tranquila del candidato, sin ejemplos reales de desempeño en condiciones de estrés"],
      ["Empatía", "Hay indicios indirectos, pero no ejemplos directos de cómo la empatía moldea las decisiones de producto"],
      ["Liderazgo", "Demostrado principalmente a través de la gestión de proyectos; faltan ejemplos de definición de visión y de motivación de un equipo en condiciones difíciles"],
    ],
    closestMatch: "Mejor coincidencia",
    closestMatchText: "El perfil del candidato es el que más se acerca a los requisitos en las habilidades de Planificación y Resolución de problemas",
    softSkillsMap: "Mapa de habilidades blandas",
    softSkillsMapSub: "Un análisis detallado de brechas, un minigráfico y citas se abren en una ventana modal",
    learnMore: "Más información →",
    caseExamples: "Ejemplos de casos (método STAR)",
    cases: [
      {
        title: "Caso 1: Creación de una plataforma gamificada para una agencia inmobiliaria",
        s: "Una agencia en los EAU tenía dificultades para atraer inversores debido a una alta barrera de entrada y a la falta de comprensión del mercado",
        t: "Crear un producto de marketing que presente el mercado a los inversores de forma gamificada y aumente la participación",
        a: "Actuó como PM/PO. Formó un equipo de 12 (desarrolladores, ML, marketing). Gestionó todo, desde el diseño del juego hasta el lanzamiento",
        r: "El proyecto se entregó con éxito al cliente. No se revelaron métricas de negocio concretas (ROI, número de inversores)",
        note: "Un sólido caso de gestión de ciclo de vida completo. Mostró iniciativa y capacidad organizativa. El punto débil es la ausencia de resultados de negocio en cifras",
      },
      {
        title: "Caso 2: Creación de un sistema de gestión en un fondo de capital riesgo",
        s: "Al principio, el fondo no tenía procesos de evaluación de startups (due diligence) ni de seguimiento, lo que generaba caos",
        t: "Implementar un sistema de gestión interno para estructurar el trabajo con las startups (CRM y seguimiento)",
        a: "Implementó la herramienta. Construyó procesos de control y retroalimentación con las empresas de la cartera",
        r: "Creó un sistema para llevar a cabo una due diligence adecuada. Redujo los riesgos operativos",
        note: "Ilustra claramente las habilidades de planificación y la construcción de procesos en condiciones de incertidumbre. Sin embargo, aquí el rol está más orientado a procesos que a producto",
      },
    ],
    recommendations: "Recomendaciones para las próximas etapas",
    recos: [
      {
        title: "Experiencia con analítica de producto",
        text: "Los ejemplos de casos no muestran trabajo con métricas (pruebas A/B, retención, LTV, embudos). Esto es crítico para un product manager orientado a datos",
        qs: [
          "Da un ejemplo de cuando usaste datos para tomar una decisión importante. ¿Qué métricas analizaste?",
          "¿Cómo definiste las métricas clave de éxito del proyecto gamificado? ¿Cómo las seguiste?",
          "¿Te has enfrentado a una situación en la que los datos contradecían tu hipótesis? ¿Qué hiciste?",
        ],
      },
      {
        title: "Gestión de stakeholders en un entorno corporativo",
        text: "Toda su experiencia es con un único cliente o de seguimiento en el fondo. No está claro cómo gestionaría un entorno con intereses contrapuestos",
        qs: [
          "Describe la situación más difícil que has enfrentado gestionando expectativas. ¿Cuál fue el conflicto y cómo lo resolviste?",
          "¿Cómo configuraste el proceso de alineación del roadmap entre los distintos departamentos?",
          "¿Qué harías si ventas necesita una funcionalidad \"para ayer\" pero ingeniería la estima en 3 meses?",
        ],
      },
      {
        title: "Experiencia realizando investigación de usuarios (customer development)",
        text: "El candidato habla de la importancia de la audiencia, pero no da ejemplos reales de entrevistas en profundidad, encuestas o análisis del comportamiento",
        qs: [
          "¿Cómo influyó la investigación de usuarios en el backlog o el roadmap de tu producto?",
          "¿Qué métodos de investigación has aplicado en la práctica?",
          "¿Cómo separas lo que los usuarios dicen de lo que realmente necesitan?",
        ],
      },
    ],
    footer: "TalentMind · informe generado automáticamente · datos de demostración",
    close: "Cerrar",
    roleExpectations: "Expectativas del rol",
    roleExpectationsText: "Requiere un dominio sólido de la habilidad en todas las etapas del ciclo de vida del producto: desde la definición de la tarea hasta la implementación de la solución",
    gapTitle: "Brecha",
    gapNegative: "Una brecha pequeña. El candidato maneja con seguridad la organización y el lanzamiento. Una puntuación más alta habría requerido más ejemplos de casos basados en datos",
    gapNonNegative: "Sin brecha: el candidato cumple o supera los requisitos del perfil en esta habilidad",
    gapLegend: "Brecha",
    candidateLevel: "Nivel del candidato",
    profileRequirement: "Requisito del perfil",
    whyNotHigher: "Por qué no más alto",
    whyNotHigherText: "Demuestra soluciones a problemas organizativos y conceptuales, pero no analíticos (por ejemplo, “por qué cae la conversión” o “cómo mejorar la retención”)",
    whyNotLower: "Por qué no más bajo",
    whyNotLowerText: "Fuerte proactividad y enfoque en los resultados. El candidato es capaz de asumir decisiones difíciles y llevarlas hasta la implementación",
    audioMarkers: "Marcadores de audio",
    audioMarkersIntro: "Al hablar de soluciones, suena seguro y directo, centrándose en las acciones y los resultados",
    audioMarkerList: [
      "Mantiene un ritmo uniforme y profesional al describir el problema y la solución, lo que refleja un enfoque pragmático",
      "Pasa rápidamente de describir el problema a resolverlo: señal de una habilidad bien desarrollada",
    ],
    quotes: "Citas",
    quoteList: [
      "Tenían un problema: no entendían cómo consolidar los recursos de marketing en ese mercado",
      "La idea era crear un juego para reducir el estrés de las personas dispuestas a invertir desde otra región",
      "Insistí en cambiar el concepto",
    ],
    roseProfileReq: "Requisito del perfil", roseLow: "Nivel bajo de habilidad", roseMedium: "Nivel medio de habilidad", roseHigh: "Nivel alto de habilidad",
    dimOnTarget: "En objetivo", dimClose: "Cerca", dimBelow: "Por debajo del referente",
  },
  pt: {
    resultsTitle: "Resultados da análise",
    resultsSubtitle: "Um detalhamento das habilidades comportamentais e da compatibilidade cultural com base em uma entrevista real",
    candidateName: "Diogo Almeida",
    candidateRole: "Gerente de Projetos Sênior",
    candidateIndustry: "TI · comércio eletrônico",
    matchScore: "Índice de compatibilidade",
    candidateInfo: "Informações do candidato",
    infoExperience: "Experiência", infoExperienceV: "9 anos",
    infoCompanies: "Empresas", infoCompaniesV: "Ozon, Yandex, fintech",
    infoExpectations: "Expectativas", infoExpectationsV: "$2,800 (líquido)",
    infoFormat: "Formato", infoFormatV: "híbrido / remoto",
    candidateBio: "Líder de projetos de TI com experiência em comércio eletrônico e fintech. Gerenciou equipes distribuídas de até 15 pessoas, lançou produtos do zero e escalou os existentes",
    decisionTitle: "Decisão de avançar para a próxima etapa",
    recommended: "Recomendado",
    argsFor: "Argumentos a favor",
    argsAgainst: "Argumentos contra",
    culturalFit: "Avaliação de compatibilidade cultural",
    culturalFitSub: "O quanto os valores e o comportamento do candidato se alinham ao DNA e ao código cultural da empresa",
    compatibilityIndex: "Índice de compatibilidade",
    highCompatibility: "Compatibilidade alta",
    compatibilityDesc: { a: "O candidato se encaixa bem em uma equipe que valoriza ", b: "processos, prazos e qualidade", c: ": seus pontos fortes se alinham aos requisitos do cargo. O principal a observar durante a integração é a colaboração em equipe." },
    strongMatchesShort: "correspondências fortes",
    areasToWatchShort: "áreas a observar",
    matchByDimension: "Correspondência por dimensão",
    gapToBenchmark: "lacuna em relação ao referencial",
    strongMatches: "Correspondências fortes",
    areasToWatch: "Áreas a observar",
    risks: "Riscos",
    strengths: "Pontos fortes",
    psycholinguistics: "Psicolinguística",
    we: "Nós", i: "Eu",
    balanceTitle: `Equilíbrio "Eu" / "Nós"`, balanceText: `Equilibra o "Eu" para a responsabilidade pessoal e o "Nós" para os processos de equipe: uma distribuição madura do foco`,
    toneTitle: "Tom", toneText: "Calmo, comedido, controlado. Fala sem pressa, com um timbre baixo e uniforme",
    locusTitle: "Locus de controle", locusText: "Assume a responsabilidade, analisa e tira conclusões em vez de culpar as circunstâncias externas",
    riskBlocks: [
      { t: "Risco de rotatividade", badge: "Crítico", text: "O candidato afirma abertamente que sua empresa atual é uma forma de obter credenciamento e um adiamento" },
      { t: "Experiência limitada em um cargo clássico", badge: "Importante", text: "Sua principal experiência relevante é um único projeto semelhante a trabalho freelance. Pode lhe faltar as habilidades necessárias em uma grande empresa de TI" },
      { t: "Focado em processos", badge: "Nota", text: "Seus exemplos de casos enfatizam a organização e os lançamentos, mas quase não mostram trabalho com dados e métricas (LTV, conversão)" },
    ],
    strengthBlocks: [
      { t: "Pensamento sistêmico", text: "Capaz de construir processos do zero, decompor o trabalho em tarefas e levar um produto até o lançamento" },
      { t: "Ciclo de vida completo do projeto", text: "Conduz um projeto com segurança em todas as etapas: da ideia e formação da equipe ao lançamento e crescimento" },
      { t: "Capacidade de reflexão", text: "Analisa o valor do trabalho e decide com base no impacto real, e não no heroísmo" },
    ],
    matchDiagram: "Diagrama de compatibilidade",
    matchDiagramSub: "O gráfico mostra onde o candidato fica aquém dos requisitos do perfil",
    averageDeviation: "Desvio médio",
    topRisks: "Principais riscos",
    topRiskRows: [
      ["Resiliência ao estresse", "A pontuação baseia-se na postura calma do candidato, sem exemplos reais de desempenho em condições de estresse"],
      ["Empatia", "Há indícios indiretos, mas nenhum exemplo direto de como a empatia molda as decisões de produto"],
      ["Liderança", "Demonstrada principalmente por meio da gestão de projetos; faltam exemplos de definição de visão e de motivação de uma equipe em condições difíceis"],
    ],
    closestMatch: "Melhor correspondência",
    closestMatchText: "O perfil do candidato é o que mais se aproxima dos requisitos nas habilidades de Planejamento e Resolução de problemas",
    softSkillsMap: "Mapa de habilidades comportamentais",
    softSkillsMapSub: "Uma análise detalhada de lacunas, um minigráfico e citações abrem em uma janela modal",
    learnMore: "Saiba mais →",
    caseExamples: "Exemplos de casos (método STAR)",
    cases: [
      {
        title: "Caso 1: Criação de uma plataforma gamificada para uma imobiliária",
        s: "Uma agência nos Emirados Árabes Unidos tinha dificuldades para atrair investidores devido à alta barreira de entrada e à falta de compreensão do mercado",
        t: "Criar um produto de marketing que apresente o mercado aos investidores de forma gamificada e aumente o engajamento",
        a: "Atuou como PM/PO. Montou uma equipe de 12 (desenvolvedores, ML, marketing). Gerenciou tudo, do design do jogo ao lançamento",
        r: "O projeto foi entregue com sucesso ao cliente. Métricas de negócio específicas (ROI, número de investidores) não foram divulgadas",
        note: "Um sólido caso de gestão de ciclo de vida completo. Mostrou iniciativa e capacidade organizacional. O ponto fraco é a ausência de resultados de negócio em números",
      },
      {
        title: "Caso 2: Criação de um sistema de gestão em um fundo de venture capital",
        s: "No início, o fundo não tinha processos de avaliação de startups (due diligence) nem de acompanhamento, o que gerava caos",
        t: "Implementar um sistema de gestão interno para estruturar o trabalho com as startups (CRM e acompanhamento)",
        a: "Implementou a ferramenta. Construiu processos de controle e feedback com as empresas do portfólio",
        r: "Criou um sistema para conduzir uma due diligence adequada. Reduziu os riscos operacionais",
        note: "Ilustra claramente as habilidades de planejamento e a construção de processos em condições de incerteza. No entanto, aqui o papel é mais orientado a processos do que a produto",
      },
    ],
    recommendations: "Recomendações para as próximas etapas",
    recos: [
      {
        title: "Experiência com analytics de produto",
        text: "Os exemplos de casos não mostram trabalho com métricas (testes A/B, retenção, LTV, funis). Isso é crítico para um product manager orientado a dados",
        qs: [
          "Dê um exemplo de quando você usou dados para tomar uma decisão importante. Quais métricas você analisou?",
          "Como você definiu as principais métricas de sucesso do projeto gamificado? Como você as acompanhou?",
          "Você já enfrentou uma situação em que os dados contradiziam sua hipótese? O que você fez?",
        ],
      },
      {
        title: "Gestão de stakeholders em um ambiente corporativo",
        text: "Toda a sua experiência é com um único cliente ou de acompanhamento no fundo. Não está claro como ele lidaria com um ambiente de interesses conflitantes",
        qs: [
          "Descreva a situação mais difícil que você enfrentou gerenciando expectativas. Qual foi o conflito e como você o resolveu?",
          "Como você configurou o processo de alinhamento do roadmap entre os diferentes departamentos?",
          "O que você faria se vendas precisa de uma funcionalidade \"para ontem\", mas engenharia a estima em 3 meses?",
        ],
      },
      {
        title: "Experiência conduzindo pesquisa de usuários (customer development)",
        text: "O candidato fala sobre a importância do público, mas não dá exemplos reais de entrevistas em profundidade, pesquisas ou análise comportamental",
        qs: [
          "Como a pesquisa de usuários influenciou o backlog ou o roadmap do seu produto?",
          "Quais métodos de pesquisa você aplicou na prática?",
          "Como você separa o que os usuários dizem do que eles realmente precisam?",
        ],
      },
    ],
    footer: "TalentMind · relatório gerado automaticamente · dados de demonstração",
    close: "Fechar",
    roleExpectations: "Expectativas do cargo",
    roleExpectationsText: "Exige domínio sólido da habilidade em todas as etapas do ciclo de vida do produto: da definição da tarefa à implementação da solução",
    gapTitle: "Lacuna",
    gapNegative: "Uma lacuna pequena. O candidato lida com segurança com a organização e o lançamento. Uma pontuação mais alta exigiria mais exemplos de casos baseados em dados",
    gapNonNegative: "Sem lacuna: o candidato atende ou supera os requisitos do perfil nesta habilidade",
    gapLegend: "Lacuna",
    candidateLevel: "Nível do candidato",
    profileRequirement: "Requisito do perfil",
    whyNotHigher: "Por que não mais alto",
    whyNotHigherText: "Ele demonstra soluções para problemas organizacionais e conceituais, mas não analíticos (por exemplo, “por que a conversão está caindo” ou “como melhorar a retenção”)",
    whyNotLower: "Por que não mais baixo",
    whyNotLowerText: "Forte proatividade e foco em resultados. O candidato é capaz de assumir decisões difíceis e levá-las até a implementação",
    audioMarkers: "Marcadores de áudio",
    audioMarkersIntro: "Ao falar de soluções, ele soa seguro e direto, concentrando-se nas ações e nos resultados",
    audioMarkerList: [
      "Mantém um ritmo uniforme e profissional ao descrever o problema e a solução, refletindo uma abordagem pragmática",
      "Passa rapidamente de descrever o problema para resolvê-lo: sinal de uma habilidade bem desenvolvida",
    ],
    quotes: "Citações",
    quoteList: [
      "Eles tinham um problema: não entendiam como consolidar os recursos de marketing naquele mercado",
      "A ideia era criar um jogo para reduzir o estresse das pessoas dispostas a investir de outra região",
      "Insisti em mudar o conceito",
    ],
    roseProfileReq: "Requisito do perfil", roseLow: "Nível baixo de habilidade", roseMedium: "Nível médio de habilidade", roseHigh: "Nível alto de habilidade",
    dimOnTarget: "No alvo", dimClose: "Perto", dimBelow: "Abaixo do referencial",
  },
  ar: {
    resultsTitle: "نتائج التحليل",
    resultsSubtitle: "تحليل تفصيلي للمهارات الشخصية والتوافق الثقافي استنادًا إلى مقابلة حقيقية",
    candidateName: "أحمد العتيبي",
    candidateRole: "مدير مشاريع أول",
    candidateIndustry: "تقنية المعلومات · التجارة الإلكترونية",
    matchScore: "مؤشر التوافق",
    candidateInfo: "معلومات المرشّح",
    infoExperience: "الخبرة", infoExperienceV: "9 سنوات",
    infoCompanies: "الشركات", infoCompaniesV: "Ozon, Yandex, fintech",
    infoExpectations: "التوقعات", infoExpectationsV: "$2,800 (صافي)",
    infoFormat: "نمط العمل", infoFormatV: "هجين / عن بُعد",
    candidateBio: "قائد مشاريع تقنية ذو خبرة في التجارة الإلكترونية والتقنية المالية. أدار فرقًا موزّعة يصل عددها إلى 15 شخصًا، وأطلق منتجات من الصفر، ووسّع نطاق المنتجات القائمة",
    decisionTitle: "قرار الترشيح للمرحلة التالية",
    recommended: "موصى به",
    argsFor: "حجج مؤيدة",
    argsAgainst: "حجج معارِضة",
    culturalFit: "تقييم التوافق الثقافي",
    culturalFitSub: "مدى انسجام قيم المرشّح وسلوكه مع الحمض الثقافي للشركة وقواعدها الثقافية",
    compatibilityIndex: "مؤشر التوافق",
    highCompatibility: "توافق عالٍ",
    compatibilityDesc: { a: "المرشّح مناسب تمامًا لفريق يُقدّر ", b: "العمليات والمواعيد النهائية والجودة", c: ": تنسجم نقاط قوته مع متطلبات الدور. أهم ما يجب مراقبته أثناء الإعداد الوظيفي هو التعاون ضمن الفريق." },
    strongMatchesShort: "تطابقات قوية",
    areasToWatchShort: "مجالات للمراقبة",
    matchByDimension: "التوافق حسب البُعد",
    gapToBenchmark: "الفجوة عن المعيار",
    strongMatches: "نقاط القوة",
    areasToWatch: "مجالات للمراقبة",
    risks: "المخاطر",
    strengths: "نقاط القوة",
    psycholinguistics: "اللغويات النفسية",
    we: "نحن", i: "أنا",
    balanceTitle: `توازن "أنا" / "نحن"`, balanceText: `يوازن بين "أنا" للمسؤولية الشخصية و"نحن" لعمليات الفريق: توزيع ناضج للتركيز`,
    toneTitle: "النبرة", toneText: "هادئ، متّزن، منضبط. يتحدث بتأنٍّ، بنبرة منخفضة ومتوازنة",
    locusTitle: "موضع التحكّم", locusText: "يتحمّل المسؤولية، ويحلّل، ويستخلص النتائج بدلًا من إلقاء اللوم على الظروف الخارجية",
    riskBlocks: [
      { t: "خطر ترك العمل", badge: "حرِج", text: "يصرّح المرشّح علنًا بأن شركته الحالية وسيلة للحصول على الاعتماد والتأجيل" },
      { t: "خبرة محدودة في دور تقليدي", badge: "مهم", text: "خبرته الأساسية ذات الصلة هي مشروع واحد يشبه العمل الحر. قد تنقصه المهارات اللازمة في شركة تقنية معلومات كبيرة" },
      { t: "التركيز على العمليات", badge: "ملاحظة", text: "تُبرز أمثلة حالاته التنظيم والإطلاق، لكنها لا تُظهر تقريبًا أي عمل مع البيانات والمؤشرات (LTV، معدل التحويل)" },
    ],
    strengthBlocks: [
      { t: "التفكير المنظومي", text: "قادر على بناء العمليات من الصفر، وتقسيم العمل إلى مهام، وقيادة المنتج حتى الإطلاق" },
      { t: "دورة حياة المشروع الكاملة", text: "يدير المشروع بثقة في كل مرحلة: من الفكرة وتكوين الفريق إلى الإطلاق والنمو" },
      { t: "القدرة على التأمّل", text: "يحلّل قيمة العمل ويقرّر بناءً على الأثر الفعلي لا على البطولات" },
    ],
    matchDiagram: "مخطط التوافق",
    matchDiagramSub: "يوضّح المخطط المواضع التي يقصُر فيها المرشّح عن متطلبات الملف الوظيفي",
    averageDeviation: "متوسط الانحراف",
    topRisks: "أبرز المخاطر",
    topRiskRows: [
      ["تحمّل الضغط", "تستند الدرجة إلى هدوء المرشّح، دون أمثلة واقعية على الأداء في ظروف الضغط"],
      ["التعاطف", "هناك مؤشرات غير مباشرة، لكن لا توجد أمثلة مباشرة على كيفية تأثير التعاطف في قرارات المنتج"],
      ["القيادة", "تظهر بشكل أساسي من خلال إدارة المشاريع؛ تنقصها أمثلة على رسم الرؤية وتحفيز الفريق في الظروف الصعبة"],
    ],
    closestMatch: "أقرب تطابق",
    closestMatchText: "ملف المرشّح هو الأقرب إلى المتطلبات في مهارتَي التخطيط وحل المشكلات",
    softSkillsMap: "خريطة المهارات الشخصية",
    softSkillsMapSub: "يُفتح تحليل تفصيلي للفجوات ومخطط مصغّر واقتباسات في نافذة منبثقة",
    learnMore: "اعرف المزيد",
    caseExamples: "أمثلة حالات (منهجية STAR)",
    cases: [
      {
        title: "الحالة 1: بناء منصة قائمة على التلعيب لوكالة عقارية",
        s: "واجهت وكالة في الإمارات العربية المتحدة صعوبة في جذب المستثمرين بسبب ارتفاع حاجز الدخول وغياب فهم السوق",
        t: "ابتكار منتج تسويقي يُعرّف المستثمرين بالسوق بأسلوب قائم على التلعيب ويرفع مستوى التفاعل",
        a: "عمل بصفة مدير مشروع / مالك منتج. كوّن فريقًا من 12 شخصًا (مطوّرون، تعلّم آلي، تسويق). أدار كل شيء من تصميم اللعبة حتى الإطلاق",
        r: "سُلِّم المشروع بنجاح إلى العميل. لم يُكشف عن مؤشرات أعمال محددة (العائد على الاستثمار، عدد المستثمرين)",
        note: "حالة قوية لإدارة دورة الحياة الكاملة. أظهر المبادرة والمهارات التنظيمية. نقطة الضعف هي غياب نتائج الأعمال بالأرقام",
      },
      {
        title: "الحالة 2: بناء نظام إدارة في صندوق استثماري",
        s: "في البداية، لم يكن لدى الصندوق عمليات لتقييم الشركات الناشئة (العناية الواجبة) أو للمتابعة، ما أوجد حالة من الفوضى",
        t: "تطبيق نظام إدارة داخلي لتنظيم العمل مع الشركات الناشئة (إدارة علاقات العملاء والمتابعة)",
        a: "طبّق الأداة. بنى عمليات للرقابة والتغذية الراجعة مع شركات المحفظة",
        r: "أنشأ نظامًا لإجراء عناية واجبة سليمة. قلّل المخاطر التشغيلية",
        note: "يوضّح بجلاء مهارات التخطيط وبناء العمليات في ظل عدم اليقين. غير أن الدور هنا موجّه نحو العمليات أكثر من توجّهه نحو المنتج",
      },
    ],
    recommendations: "توصيات للمراحل التالية",
    recos: [
      {
        title: "الخبرة في تحليلات المنتج",
        text: "لا تُظهر أمثلة الحالات أي عمل مع المؤشرات (اختبارات A/B، الاحتفاظ، LTV، المسارات). وهذا أمر حاسم لمدير منتج يعتمد على البيانات",
        qs: [
          "اذكر مثالًا استخدمت فيه البيانات لاتخاذ قرار مهم. ما المؤشرات التي نظرت إليها؟",
          "كيف حدّدت مؤشرات النجاح الرئيسية للمشروع القائم على التلعيب؟ وكيف تابعتها؟",
          "هل واجهت موقفًا تعارضت فيه البيانات مع فرضيتك؟ ماذا فعلت؟",
        ],
      },
      {
        title: "إدارة أصحاب المصلحة في بيئة مؤسسية",
        text: "كل خبرته إما مع عميل واحد أو في المتابعة داخل الصندوق. ليس واضحًا كيف سيتعامل مع بيئة تتضارب فيها المصالح",
        qs: [
          "صف أصعب موقف واجهته في إدارة التوقعات. ما كان التعارض وكيف حللته؟",
          "كيف أعددت عملية مواءمة خارطة الطريق بين الأقسام المختلفة؟",
          "ماذا ستفعل إذا احتاج فريق المبيعات ميزة \"بالأمس\" بينما تقدّرها الهندسة بثلاثة أشهر؟",
        ],
      },
      {
        title: "خبرة إجراء أبحاث المستخدمين (تطوير العملاء)",
        text: "يتحدّث المرشّح عن أهمية الجمهور لكنه لا يقدّم أمثلة واقعية على المقابلات المعمّقة أو الاستبيانات أو تحليل السلوك",
        qs: [
          "كيف أثّرت أبحاث المستخدمين في قائمة مهام منتجك أو خارطة طريقه؟",
          "ما أساليب البحث التي طبّقتها عمليًا؟",
          "كيف تفصل بين ما يقوله المستخدمون وما يحتاجونه فعليًا؟",
        ],
      },
    ],
    footer: "TalentMind · تقرير مُولَّد تلقائيًا · بيانات توضيحية",
    close: "إغلاق",
    roleExpectations: "متطلبات الدور",
    roleExpectationsText: "يتطلب إتقانًا واثقًا للمهارة عبر جميع مراحل دورة حياة المنتج: من تحديد المهمة إلى تنفيذ الحل",
    gapTitle: "الفجوة",
    gapNegative: "فجوة صغيرة. يتعامل المرشّح بثقة مع التنظيم والإطلاق. وكانت الدرجة الأعلى ستتطلب مزيدًا من أمثلة الحالات القائمة على البيانات",
    gapNonNegative: "لا توجد فجوة؛ المرشّح يستوفي متطلبات الملف الوظيفي أو يتجاوزها في هذه المهارة",
    gapLegend: "الفجوة",
    candidateLevel: "مستوى المرشّح",
    profileRequirement: "متطلّب الملف الوظيفي",
    whyNotHigher: "لماذا ليست أعلى",
    whyNotHigherText: "يُظهر حلولًا للمشكلات التنظيمية والمفاهيمية، لكن ليس التحليلية (مثل \"لماذا ينخفض معدل التحويل\" أو \"كيف نحسّن الاحتفاظ\")",
    whyNotLower: "لماذا ليست أدنى",
    whyNotLowerText: "مبادرة قوية وتركيز على النتائج. المرشّح قادر على تحمّل مسؤولية القرارات الصعبة وقيادتها حتى التنفيذ",
    audioMarkers: "المؤشرات الصوتية",
    audioMarkersIntro: "عند مناقشة الحلول، يبدو واثقًا ومباشرًا، مركّزًا على الإجراءات والنتائج",
    audioMarkerList: [
      "يحافظ على إيقاع متوازن وعملي عند وصف المشكلة والحل، ما يعكس نهجًا براغماتيًا",
      "ينتقل بسرعة من وصف المشكلة إلى حلّها: مؤشر على مهارة متطورة",
    ],
    quotes: "اقتباسات",
    quoteList: [
      "كانت لديهم مشكلة: لم يفهموا كيفية تجميع الموارد التسويقية في تلك السوق",
      "كانت الفكرة ابتكار لعبة لتخفيف التوتر لدى الأشخاص المستعدّين للاستثمار من منطقة أخرى",
      "أصررتُ على تغيير المفهوم",
    ],
    roseProfileReq: "متطلّب الملف الوظيفي", roseLow: "مستوى مهارة منخفض", roseMedium: "مستوى مهارة متوسط", roseHigh: "مستوى مهارة مرتفع",
    dimOnTarget: "ضمن الهدف", dimClose: "قريب", dimBelow: "دون المعيار",
  },
};

const dimTone = (g: number, t: Locale) => (g >= 0 ? { c: GREEN, l: UI[t].dimOnTarget } : g >= -8 ? { c: AMBER, l: UI[t].dimClose } : { c: RED, l: UI[t].dimBelow });

export default function ReportPage() {
  const locale = useLocale();
  const t = UI[locale];
  const skills = SKILLS[locale];
  const compatDims = COMPAT_DIMS[locale];
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Skill | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* появление секций из блюра + лёгкое увеличение */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 46, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* блокируем скролл фона при открытой модалке */
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <div ref={rootRef} className="relative w-full" style={{ color: INK }}>
      {/* HERO */}
      <section className="mx-auto max-w-[1100px] px-6 pt-36 pb-8 text-center md:px-8 lg:pt-40">
        <h1 className="rv mx-auto mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[1.04] tracking-tight">{t.resultsTitle}</h1>
        <p className="rv mx-auto mt-4 max-w-2xl text-lg text-[#183833]/65">{t.resultsSubtitle}</p>
      </section>

      <div className="mx-auto max-w-[1100px] space-y-5 px-5 pb-24 md:px-8">
        {/* 0 · шапка кандидата + соответствие */}
        <div className="rv flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#e6ece4] bg-white p-6 shadow-[0_16px_44px_rgba(24,56,51,0.06)] sm:flex-row sm:items-center md:px-8">
          <div>
            <h2 className="text-[1.7rem] font-bold leading-tight tracking-tight" style={{ color: INK }}>{t.candidateName}</h2>
            <p className="mt-1.5 text-sm font-semibold leading-snug" style={{ color: TEAL }}>{t.candidateRole}</p>
            <p className="text-sm font-medium leading-snug" style={{ color: `${TEAL}b3` }}>{t.candidateIndustry}</p>
          </div>
          <div className="flex flex-col items-center gap-1.5 sm:items-end">
            <p className="text-xs font-medium uppercase tracking-wide text-[#183833]/50">{t.matchScore}</p>
            <ComplianceRing value={77} />
          </div>
        </div>

        {/* 1 · кандидат + решение */}
        <div className="rv grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="text-base font-bold">{t.candidateInfo}</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Info icon={<Briefcase className="h-4 w-4" />} t={t.infoExperience} v={t.infoExperienceV} />
              <Info icon={<Building2 className="h-4 w-4" />} t={t.infoCompanies} v={t.infoCompaniesV} />
              <Info icon={<Wallet className="h-4 w-4" />} t={t.infoExpectations} v={t.infoExpectationsV} />
              <Info icon={<Home className="h-4 w-4" />} t={t.infoFormat} v={t.infoFormatV} />
            </div>
            <p className="mt-4 border-t border-[#eef0ee] pt-4 text-sm leading-relaxed text-[#183833]/70">
              {t.candidateBio}
            </p>
          </Card>

          <div className="rounded-3xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] to-[#eef7e0] p-5 shadow-[0_16px_44px_rgba(24,56,51,0.07)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-base font-bold"><Check className="h-5 w-5" style={{ color: GREEN }} /> {t.decisionTitle}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> {t.recommended}</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold" style={{ color: GREEN }}>{t.argsFor}</p>
                <ul className="mt-2 space-y-1.5">{ARGS_FOR[locale].map((a) => <li key={a} className="flex items-start gap-1.5 text-xs text-[#183833]/75"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: GREEN }} /> {a}</li>)}</ul>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: RED }}>{t.argsAgainst}</p>
                <ul className="mt-2 space-y-1.5">{ARGS_AGAINST[locale].map((a) => <li key={a} className="flex items-start gap-1.5 text-xs text-[#183833]/75"><X className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: RED }} /> {a}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>

        {/* 2 · оценка корпоративной совместимости */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">{t.culturalFit}</h2>
          <p className="mx-auto mt-1 max-w-xl text-center text-xs text-[#183833]/55">{t.culturalFitSub}</p>

          <div className="mt-4 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[0.82fr_1.18fr]">
            {/* индекс совместимости */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] via-white to-[#eef7e0] p-6 shadow-[0_16px_44px_rgba(24,56,51,0.07)]">
              <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-[#7AB800]/12 blur-3xl" />
              <div className="pointer-events-none absolute -left-10 bottom-[-30%] h-32 w-32 rounded-full bg-[#11AFCC]/8 blur-3xl" />
              <p className="relative flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#183833]/45"><Dna className="h-4 w-4" style={{ color: GREEN }} /> {t.compatibilityIndex}</p>
              <div className="relative mt-1 flex justify-center"><FitGauge value={COMPAT_SCORE} /></div>
              <div className="relative -mt-1 flex justify-center"><span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-semibold shadow-sm" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> {t.highCompatibility}</span></div>
              <p className="relative mt-4 text-center text-[13px] leading-relaxed text-[#183833]/75">{t.compatibilityDesc.a}<b style={{ color: INK }}>{t.compatibilityDesc.b}</b>{t.compatibilityDesc.c}</p>
              <div className="relative mt-auto grid grid-cols-2 gap-3 pt-5">
                <div className="rounded-2xl bg-white/70 p-3 text-center"><p className="text-2xl font-bold" style={{ color: GREEN }}>{compatDims.filter((d) => d.val >= d.ref).length}</p><p className="mt-0.5 text-[10px] text-[#183833]/55">{t.strongMatchesShort}</p></div>
                <div className="rounded-2xl bg-white/70 p-3 text-center"><p className="text-2xl font-bold" style={{ color: AMBER }}>{compatDims.filter((d) => d.val < d.ref).length}</p><p className="mt-0.5 text-[10px] text-[#183833]/55">{t.areasToWatchShort}</p></div>
              </div>
            </div>

            {/* совпадение по измерениям культуры */}
            <Card className="flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-sm font-bold"><span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: `${GREEN}1a` }}><Target className="h-4 w-4" style={{ color: GREEN }} /></span> {t.matchByDimension}</p>
                <span className="flex items-center gap-1.5 text-[10px] text-[#183833]/45"><span className="inline-block h-2.5 w-4 rounded-full border border-[#cfd6ce]" style={{ background: "#e0e5df" }} /> {t.gapToBenchmark}</span>
              </div>
              <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
                {compatDims.map((d) => <DimRow key={d.name} d={d} mounted={mounted} locale={locale} />)}
              </div>
            </Card>
          </div>

          {/* сильные совпадения / зоны внимания */}
          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-[#d8ecc4] bg-[#f3faea] p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> {t.strongMatches}</p>
              <div className="mt-3 space-y-2.5">{COMPAT_MATCHES[locale].map(([ti, x]) => <div key={ti} className="rounded-2xl bg-white/70 p-3.5"><p className="text-[13px] font-bold" style={{ color: INK }}>{ti}</p><p className="mt-0.5 text-xs leading-snug text-[#183833]/65">{x}</p></div>)}</div>
            </div>
            <div className="rounded-3xl border border-[#f1d9a8] bg-[#fdf6e9] p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: AMBER }}><AlertTriangle className="h-4 w-4" /> {t.areasToWatch}</p>
              <div className="mt-3 space-y-2.5">{COMPAT_ATTENTION[locale].map(([ti, x]) => <div key={ti} className="rounded-2xl bg-white/70 p-3.5"><p className="text-[13px] font-bold" style={{ color: INK }}>{ti}</p><p className="mt-0.5 text-xs leading-snug text-[#183833]/65">{x}</p></div>)}</div>
            </div>
          </div>
        </section>

        {/* 3 · риски / сильные / психолингвистика */}
        <div className="rv grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card>
            <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: RED }}><Flame className="h-4 w-4" /> {t.risks}</h3>
            {t.riskBlocks.map((b, i) => <Block key={b.t} t={b.t} badge={b.badge} bc={i === 0 ? RED : AMBER} text={b.text} />)}
          </Card>
          <Card>
            <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> {t.strengths}</h3>
            {t.strengthBlocks.map((b) => <Block key={b.t} t={b.t} text={b.text} />)}
          </Card>
          <Card>
            <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: TEAL }}><AudioLines className="h-4 w-4" /> {t.psycholinguistics}</h3>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs font-semibold"><span style={{ color: INK }}>{t.we}</span><span style={{ color: INK }}>{t.i}</span></div>
              <div className="relative mt-1.5 h-1.5 rounded-full bg-[#eef2ec]">
                <div className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000" style={{ width: mounted ? "62%" : "0%", background: `linear-gradient(90deg,${TEAL},${GREEN})` }} />
                <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow transition-[left] duration-1000" style={{ left: mounted ? "62%" : "0%", background: GREEN }} />
              </div>
            </div>
            <Block t={t.balanceTitle} text={t.balanceText} />
            <Block t={t.toneTitle} text={t.toneText} />
            <Block t={t.locusTitle} text={t.locusText} />
          </Card>
        </div>

        {/* 3 · диаграмма соответствия */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">{t.matchDiagram}</h2>
          <p className="mx-auto mt-1 max-w-md text-center text-xs text-[#183833]/55">{t.matchDiagramSub}</p>
          <div className="mt-4 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.3fr_1fr]">
            <Card><RoseChart locale={locale} /></Card>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-2xl border border-[#e6ece4] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(24,56,51,0.05)]"><span className="text-base font-bold">{t.averageDeviation}</span><span className="flex items-center gap-1 text-base font-bold" style={{ color: AMBER }}>9% <ChevronDown className="h-4 w-4" /></span></div>
              <Card className="flex flex-1 flex-col">
                <p className="flex items-center gap-2 text-base font-bold" style={{ color: RED }}><Flame className="h-4 w-4" /> {t.topRisks}</p>
                <div className="mt-3 space-y-3">
                  {([
                    [t.topRiskRows[0][0], "16%", t.topRiskRows[0][1]],
                    [t.topRiskRows[1][0], "15%", t.topRiskRows[1][1]],
                    [t.topRiskRows[2][0], "14%", t.topRiskRows[2][1]],
                  ] as [string, string, string][]).map(([k, v, dsc], i) => (
                    <div key={k} className={i ? "border-t border-[#eef0ee] pt-3" : ""}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{k}</span>
                        <span className="flex items-center gap-1 text-sm font-bold" style={{ color: RED }}>{v} <ChevronDown className="h-3.5 w-3.5" /></span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[#183833]/65">{dsc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-[#eef0ee] pt-4">
                  <p className="flex items-center gap-2 text-base font-bold" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> {t.closestMatch}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#183833]/75">{t.closestMatchText}</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 4 · карта soft skills */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">{t.softSkillsMap}</h2>
          <p className="mx-auto mt-1 max-w-lg text-center text-xs text-[#183833]/55">{t.softSkillsMapSub}</p>
          <div className="mt-4 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
            {skills.map((s) => <SkillCard key={s.name} s={s} mounted={mounted} onOpen={() => setActive(s)} learnMore={t.learnMore} />)}
          </div>
        </section>

        {/* 5 · кейсы STAR */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">{t.caseExamples}</h2>
          <div className="mt-4 space-y-4">
            {t.cases.map((c) => (
              <StarCase key={c.title} title={c.title} s={c.s} t={c.t} a={c.a} r={c.r} note={c.note} locale={locale} />
            ))}
          </div>
        </section>

        {/* 7 · рекомендации */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">{t.recommendations}</h2>
          <div className="mt-4 space-y-3">
            {t.recos.map((r) => <Reco key={r.title} title={r.title} text={r.text} qs={r.qs} />)}
          </div>
        </section>

        <p className="rv text-center text-[11px] text-[#183833]/40">{t.footer}</p>
      </div>

      {/* МОДАЛЬНОЕ ОКНО ДЕТАЛИ НАВЫКА */}
      {active && <SkillModal s={active} onClose={() => setActive(null)} locale={locale} />}
    </div>
  );
}

/* ============================================================
   Модальное окно — детальный разбор навыка
   ============================================================ */
function SkillModal({ s, onClose, locale }: { s: Skill; onClose: () => void; locale: Locale }) {
  const t = UI[locale];
  const gap = s.val - s.req;
  const lc = s.val >= 70 ? GREEN : s.val >= 50 ? AMBER : RED;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <style>{`@keyframes skillFade{from{opacity:0}to{opacity:1}}
        @keyframes skillPop{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes coneGrow{from{transform:scaleX(0);opacity:.2}to{transform:scaleX(1);opacity:1}}
        @keyframes legendIn{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}`}</style>
      <div className="absolute inset-0 bg-[#0d1b17]/45 backdrop-blur-sm" style={{ animation: "skillFade .28s ease both" }} onClick={onClose} />
      <div className="relative z-10 w-[min(1080px,94vw)] max-h-[90vh] overflow-y-auto rounded-[26px] border border-[#e6ece4] bg-white p-6 shadow-[0_60px_140px_rgba(13,27,23,0.5)] md:p-9" data-lenis-prevent style={{ animation: "skillPop .36s cubic-bezier(.22,1,.36,1) both" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>{s.name}</h3>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-[#183833]/65">{s.desc}</p>
          </div>
          <button onClick={onClose} aria-label={t.close} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#e6ece4] text-[#183833]/55 transition-colors hover:bg-[#f4f7f2] hover:text-[#183833]"><X className="h-4 w-4" /></button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* ожидания + разрыв */}
          <div className="space-y-4">
            <SoftCard t={t.roleExpectations} text={t.roleExpectationsText} />
            <SoftCard t={t.gapTitle} text={gap < 0 ? t.gapNegative : t.gapNonNegative} />
          </div>
          {/* диаграмма */}
          <div className="relative flex items-center gap-5 overflow-hidden rounded-2xl border border-[#e6ece4] bg-gradient-to-br from-[#f7fbf0] via-white to-[#eef7e0] p-6">
            <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#7AB800]/12 blur-3xl" />
            <div className="pointer-events-none absolute -left-8 bottom-[-30%] h-32 w-32 rounded-full bg-[#11AFCC]/8 blur-3xl" />
            <ConeChart val={s.val} req={s.req} color={lc} />
            <div className="relative flex-1">
              <p className="text-sm font-semibold" style={{ color: INK }}>{s.name} <span className="ml-1 text-2xl font-bold" style={{ color: lc }}>{s.val}%</span></p>
              <div className="mt-4 space-y-2.5 text-xs">
                <LegendRow c="#bfe3ec" t={t.gapLegend} v={`${gap > 0 ? "+" : ""}${gap}%`} vc={gap < 0 ? RED : GREEN} d={0.5} />
                <LegendRow c={lc} t={t.candidateLevel} v={`${s.val}%`} d={0.62} />
                <LegendRow c="#d6ebf2" t={t.profileRequirement} v={`${s.req}%`} d={0.74} />
              </div>
            </div>
          </div>
        </div>

        {/* почему не выше / ниже */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-[#fff5f5] p-5">
            <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: RED }}><TrendingDown className="h-4 w-4" /> {t.whyNotHigher}</p>
            <p className="mt-2 text-sm leading-snug text-[#183833]/70">{t.whyNotHigherText}</p>
          </div>
          <div className="rounded-2xl bg-[#f3faea] p-5">
            <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: GREEN }}><TrendingUp className="h-4 w-4" /> {t.whyNotLower}</p>
            <p className="mt-2 text-sm leading-snug text-[#183833]/70">{t.whyNotLowerText}</p>
          </div>
        </div>

        {/* аудиомаркеры */}
        <div className="mt-4 rounded-2xl bg-[#f6faef] p-5">
          <p className="text-sm font-bold" style={{ color: INK }}>{t.audioMarkers}</p>
          <p className="mt-1 text-xs text-[#183833]/55">{t.audioMarkersIntro}</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {t.audioMarkerList.map((m) => (
              <div key={m} className="flex items-start gap-2"><AudioLines className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><span className="text-xs leading-snug text-[#183833]/65">{m}</span></div>
            ))}
          </div>
        </div>

        {/* цитаты */}
        <div className="mt-4 rounded-2xl bg-[#f6faef] p-5">
          <p className="text-sm font-bold" style={{ color: INK }}>{t.quotes}</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {t.quoteList.map((q) => (
              <div key={q} className="flex items-start gap-2"><MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><span className="text-xs italic leading-snug text-[#183833]/60">{q}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* оттенки конуса по уровню (светлый · базовый · тёмный) */
const CONE_SHADES: Record<string, [string, string, string]> = {
  [GREEN]: ["#a4d44a", "#7AB800", "#5f9b00"],
  [AMBER]: ["#f6cf63", "#E8A317", "#bd840c"],
  [RED]: ["#ff8f8f", "#FF5252", "#dd3b3b"],
};
/* конусная диаграмма уровня (анимированная, цвет и длина по проценту) */
function ConeChart({ val, req, color }: { val: number; req: number; color: string }) {
  const W = 196, H = 132, cy = H / 2, x0 = 16, x1 = W - 16, maxH = H - 26;
  const Lfull = x1 - x0, half = maxH / 2;
  const [c0, c1, c2] = CONE_SHADES[color] ?? CONE_SHADES[GREEN];
  /* конус занимает val% длины шкалы, толщина растёт пропорционально */
  const xv = x0 + (val / 100) * Lfull, hv = (val / 100) * half;
  const xr = x0 + (req / 100) * Lfull, hr = (req / 100) * half;
  const gid = "coneFill", fid = "coneGlow";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[124px] w-[186px] shrink-0 overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c0} />
          <stop offset="55%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id={fid} x="-30%" y="-40%" width="160%" height="180%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor={c1} floodOpacity="0.34" />
        </filter>
      </defs>

      {/* требования профиля — пунктирный контур до req% */}
      <polygon points={`${x0},${cy} ${xr},${cy - hr} ${xr},${cy + hr}`} fill="#bfe3ec" fillOpacity="0.16" stroke="#a9d8e6" strokeWidth="1.8" strokeDasharray="4 4" strokeLinejoin="round" style={{ animation: "skillFade .4s ease .15s both" }} />
      <line x1={xr} y1={cy - hr} x2={xr} y2={cy + hr} stroke="#a9d8e6" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="4 4" style={{ animation: "skillFade .4s ease .15s both" }} />

      {/* уровень кандидата — растущий конус до val% */}
      <g style={{ transformOrigin: `${x0}px ${cy}px`, animation: "coneGrow 1s cubic-bezier(.22,1,.36,1) .12s both" }}>
        <polygon points={`${x0},${cy} ${xv},${cy - hv} ${xv},${cy + hv}`} fill={`url(#${gid})`} filter={`url(#${fid})`} strokeLinejoin="round" />
        <line x1={xv} y1={cy - hv} x2={xv} y2={cy + hv} stroke={c2} strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* вершина */}
      <circle cx={x0} cy={cy} r="3.4" fill={c2} style={{ animation: "skillFade .4s ease .35s both" }} />
    </svg>
  );
}
function LegendRow({ c, t, v, vc, d = 0 }: { c: string; t: string; v: string; vc?: string; d?: number }) {
  return (
    <div className="flex items-center justify-between" style={{ animation: `legendIn .5s ease ${d}s both` }}>
      <span className="flex items-center gap-2 text-[#183833]/70"><span className="h-3 w-3 rounded-sm" style={{ background: c }} /> {t}</span>
      <span className="font-bold tabular-nums" style={{ color: vc || INK }}>{v}</span>
    </div>
  );
}
function SoftCard({ t, text }: { t: string; text: string }) {
  return <div className="rounded-2xl bg-[#f6faef] p-5"><p className="text-sm font-bold" style={{ color: INK }}>{t}</p><p className="mt-2 text-sm leading-snug text-[#183833]/70">{text}</p></div>;
}
/* карточка «точка совпадения / трения» */
/* кольцо соответствия в шапке кандидата */
function ComplianceRing({ value }: { value: number }) {
  const r = 36, circ = 2 * Math.PI * r, off = circ - (value / 100) * circ;
  return (
    <div className="relative h-[96px] w-[96px]">
      <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
        <defs><linearGradient id="compG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a4d44a" /><stop offset="100%" stopColor="#5f9b00" /></linearGradient></defs>
        <style>{`@keyframes compDraw{from{stroke-dashoffset:${circ.toFixed(1)}}to{stroke-dashoffset:${off.toFixed(1)}}}`}</style>
        <circle cx="48" cy="48" r={r} fill="none" stroke="#eef2ec" strokeWidth="8" />
        <circle cx="48" cy="48" r={r} fill="none" stroke="url(#compG)" strokeWidth="8" strokeLinecap="round" strokeDasharray={circ.toFixed(1)} style={{ strokeDashoffset: off.toFixed(1), animation: "compDraw 1.2s cubic-bezier(.22,1,.36,1) .2s both" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-bold" style={{ color: "#5f9b00" }}>{value}%</span></div>
    </div>
  );
}
/* полукруглый гейдж индекса совместимости */
function FitGauge({ value }: { value: number }) {
  const circ = Math.PI * 64, off = circ - (value / 100) * circ;
  return (
    <svg viewBox="0 0 168 100" className="w-full max-w-[200px] overflow-visible">
      <defs>
        <linearGradient id="fitG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#11AFCC" /><stop offset="100%" stopColor="#7AB800" /></linearGradient>
      </defs>
      <style>{`@keyframes gaugeDraw{from{stroke-dashoffset:${circ.toFixed(1)}}to{stroke-dashoffset:${off.toFixed(1)}}}`}</style>
      <path d="M20,88 A64,64 0 0 1 148,88" fill="none" stroke="#e7eee4" strokeWidth="13" strokeLinecap="round" />
      <path d="M20,88 A64,64 0 0 1 148,88" fill="none" stroke="url(#fitG)" strokeWidth="13" strokeLinecap="round" strokeDasharray={circ.toFixed(1)} style={{ strokeDashoffset: off.toFixed(1), animation: "gaugeDraw 1.2s cubic-bezier(.22,1,.36,1) .2s both" }} />
      <text x="84" y="80" textAnchor="middle" fontSize="34" fontWeight="800" fill={INK}>{value}<tspan fontSize="17" dy="-2">%</tspan></text>
    </svg>
  );
}
/* строка измерения культуры: кандидат vs эталон (bullet-полоса) */
function DimRow({ d, mounted, locale }: { d: CDim; mounted: boolean; locale: Locale }) {
  const g = d.val - d.ref, t = dimTone(g, locale);
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium" style={{ color: INK }}>{d.name}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ background: `${t.c}1a`, color: t.c }}>{t.l}</span>
          <span className="text-xs font-bold tabular-nums" style={{ color: t.c }}>{d.val}<span className="font-medium text-[#183833]/35"> / {d.ref}</span></span>
        </span>
      </div>
      <div className="relative mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-[#eef2ec]">
        {/* разрыв до требуемого уровня (эталона) */}
        {g < 0 && (
          <div className="absolute inset-y-0 rounded-r-full" style={{ left: mounted ? `${d.val}%` : "0%", width: mounted ? `${-g}%` : "0%", background: "repeating-linear-gradient(-45deg,#dfe4de,#dfe4de 3px,#eceff0 3px,#eceff0 6px)", transition: "left 1.1s cubic-bezier(.22,1,.36,1), width 1.1s cubic-bezier(.22,1,.36,1)" }} />
        )}
        {/* уровень кандидата */}
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: mounted ? `${d.val}%` : "0%", background: t.c, transition: "width 1.1s cubic-bezier(.22,1,.36,1)" }} />
      </div>
    </div>
  );
}

/* ============================================================
   Мелкие компоненты
   ============================================================ */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-[#e6ece4] bg-white p-5 shadow-[0_16px_44px_rgba(24,56,51,0.06)] ${className}`}>{children}</div>;
}
function Info({ icon, t, v }: { icon: React.ReactNode; t: string; v: string }) {
  return <div className="flex items-start gap-2"><span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f4f7f2] text-[#7AB800]">{icon}</span><div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{t}</p><p className="text-xs font-medium">{v}</p></div></div>;
}
function Block({ t, text, badge, bc }: { t: string; text: string; badge?: string; bc?: string }) {
  return <div className="mt-3 border-t border-[#eef0ee] pt-3"><div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold">{t}</p>{badge && <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase" style={{ background: `${bc}1a`, color: bc }}>{badge}</span>}</div><p className="mt-1 text-[11px] leading-snug text-[#183833]/65">{text}</p></div>;
}
function SkillCard({ s, mounted, onOpen, learnMore }: { s: Skill; mounted: boolean; onOpen: () => void; learnMore: string }) {
  const c = s.val >= 70 ? GREEN : s.val >= 50 ? AMBER : RED;
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2"><p className="text-sm font-semibold">{s.name}</p><span className="text-sm font-bold" style={{ color: c }}>{s.val}%</span></div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#eef2ec]"><div className="h-full rounded-full transition-[width] duration-[1100ms] ease-out" style={{ width: mounted ? `${s.val}%` : "0%", background: c }} /></div>
      <p className="mt-2 text-[11px] leading-snug text-[#183833]/65">{s.desc}</p>
      <button onClick={onOpen} className="ease-smooth mt-auto inline-flex w-fit items-center gap-1.5 self-start rounded-full border border-[#d8ecc4] px-3.5 py-1.5 text-[11px] font-semibold transition-all hover:-translate-y-0.5 hover:bg-[#f3faea]" style={{ color: GREEN, marginTop: "auto" }}>{learnMore}</button>
    </Card>
  );
}
function StarCase({ title, s, t, a, r, note, locale }: { title: string; s: string; t: string; a: string; r: string; note: string; locale: Locale }) {
  const labels: Record<Locale, { s: string; t: string; a: string; r: string; assessment: string }> = {
    en: { s: "Situation", t: "Task", a: "Action", r: "Result", assessment: "Assessment" },
    es: { s: "Situación", t: "Tarea", a: "Acción", r: "Resultado", assessment: "Evaluación" },
    pt: { s: "Situação", t: "Tarefa", a: "Ação", r: "Resultado", assessment: "Avaliação" },
    ar: { s: "الموقف", t: "المهمة", a: "الإجراء", r: "النتيجة", assessment: "التقييم" },
  };
  const lb = labels[locale];
  const rows: [string, string, string][] = [[lb.s, s, TEAL], [lb.t, t, GREEN], [lb.a, a, AMBER], [lb.r, r, GREEN]];
  return (
    <Card>
      <p className="text-sm font-bold">{title}</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(([k, v, c]) => <div key={k} className="rounded-2xl bg-[#f6faef] p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: c }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} /> {k}</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{v}</p></div>)}
      </div>
      <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-[#d8ecc4] bg-[#f3faea] p-3.5"><MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><div><p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: GREEN }}>{lb.assessment}</p><p className="mt-0.5 text-[11px] leading-snug text-[#183833]/70">{note}</p></div></div>
    </Card>
  );
}
function Reco({ title, text, qs }: { title: string; text: string; qs: string[] }) {
  return (
    <Card>
      <p className="flex items-center gap-2 text-base font-bold"><span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: `${TEAL}1a`, color: TEAL }}><GitBranch className="h-4 w-4" /></span> {title}</p>
      <p className="mt-2 text-sm leading-snug text-[#183833]/65">{text}</p>
      <ul className="mt-3 space-y-2">{qs.map((q) => <li key={q} className="flex items-start gap-2 rounded-xl bg-[#f6faef] px-3 py-2 text-xs text-[#183833]/75"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GREEN }} /> {q}</li>)}</ul>
    </Card>
  );
}
/* роза-диаграмма (полярные сектора) */
function RoseChart({ locale }: { locale: Locale }) {
  const labels = RADAR_LABELS[locale];
  const N = RADAR_BASE.length, cx = 280, cy = 220, R = 140, seg = 360 / N, pad = 1.6, labelR = R + 18;
  const lvl = (v: number) => (v >= 60 ? GREEN : v >= 40 ? "#bcdd93" : "#f2a0a0");
  const rad = (d: number) => (d * Math.PI) / 180;
  /* пирог-сектор от центра до радиуса r */
  const sector = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${cx} ${cy} L ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)} Z`;
  };
  /* направляющая дуга на радиусе r */
  const arc = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`;
  };
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 560 480" className="w-full max-w-[520px]">
        {/* вся шкала 0–100% — нейтральная подложка сектора */}
        {RADAR_BASE.map((_, i) => <path key={`bg${i}`} d={sector(R, i)} fill="#eef1f3" stroke="#ffffff" strokeWidth="2.5" />)}
        {/* тонкие концентрические направляющие шкалы */}
        {[0.25, 0.5, 0.75, 1].map((f) => RADAR_BASE.map((_, i) => <path key={`g${f}-${i}`} d={arc(R * f, i)} fill="none" stroke="#d2dce2" strokeWidth="1" opacity="0.7" />))}
        {/* требования профиля — светло-голубой сектор до уровня req */}
        {RADAR_BASE.map((d, i) => <path key={`req${i}`} d={sector((R * d.req) / 100, i)} fill="#bcd9ec" stroke="#ffffff" strokeWidth="1.5" />)}
        {/* уровень кандидата — закрашенный сектор по значению */}
        {RADAR_BASE.map((d, i) => <path key={`v${i}`} d={sector((R * d.v) / 100, i)} fill={lvl(d.v)} style={{ transformOrigin: `${cx}px ${cy}px`, animation: `roseG .7s ease-out ${0.04 * i + 0.1}s both` }} />)}
        {/* значения % кандидата внутри сектора */}
        {RADAR_BASE.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), rr = R * 0.66;
          return <text key={`p${i}`} x={(cx + rr * Math.cos(a)).toFixed(1)} y={(cy + rr * Math.sin(a)).toFixed(1)} fontSize="13" fontWeight="700" fill="#2b4a44" textAnchor="middle" dominantBaseline="middle">{d.v}%</text>;
        })}
        {/* подписи навыков снаружи */}
        {RADAR_BASE.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), ca = Math.cos(a);
          const anchor = ca > 0.15 ? "start" : ca < -0.15 ? "end" : "middle";
          return <text key={`l${i}`} x={(cx + labelR * ca).toFixed(1)} y={(cy + labelR * Math.sin(a)).toFixed(1)} fontSize="12.5" fill="#3a4f4a" textAnchor={anchor} dominantBaseline="middle">{labels[i]}</text>;
        })}
        <style>{`@keyframes roseG{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] text-[#183833]/70 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-4">
        <Lg c="#bcd9ec" t={UI[locale].roseProfileReq} /><Lg c="#f2a0a0" t={UI[locale].roseLow} /><Lg c="#bcdd93" t={UI[locale].roseMedium} /><Lg c={GREEN} t={UI[locale].roseHigh} />
      </div>
    </div>
  );
}
function Lg({ c, t }: { c: string; t: string }) { return <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm border border-black/5" style={{ background: c }} /> {t}</span>; }
