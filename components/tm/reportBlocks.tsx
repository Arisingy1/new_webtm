"use client";

import { useEffect, useState } from "react";
import {
  X, Sparkles, Check, Flame, AudioLines, MessageSquareQuote,
  Briefcase, Building2, Wallet, Home, GitBranch, ChevronDown,
} from "lucide-react";
import { useLocale } from "@/components/tm/LocaleProvider";
import type { Locale } from "@/lib/i18n";

/* ============================================================
   Переиспользуемые код-блоки отчёта по кандидату.
   Свёрстаны в стиле сайта (раньше были картинками /1.png…/6.png).
   Используются на /otchet (мобильная версия) и /softskill-report/example.
   ============================================================ */

const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const AMBER = "#E8A317";
const RED = "#FF5252";

/* флаг «смонтировано» — для анимации полос/слайдеров после маунта */
function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => { setM(true); }, []);
  return m;
}

/* ── данные ── */
const ARGS_FOR: Record<Locale, string[]> = {
  en: [
    "Proven track record of product launches at major companies",
    "Strong communication skills and the ability to persuade",
    "Experience in a product environment (e-commerce)",
    "High level of self-awareness and systems thinking",
  ],
  es: [
    "Historial probado de lanzamientos de productos en grandes empresas",
    "Sólidas habilidades de comunicación y capacidad de persuasión",
    "Experiencia en un entorno de producto (comercio electrónico)",
    "Alto nivel de autoconocimiento y pensamiento sistémico",
  ],
  pt: [
    "Histórico comprovado de lançamentos de produtos em grandes empresas",
    "Sólidas habilidades de comunicação e capacidade de persuasão",
    "Experiência em um ambiente de produto (comércio eletrônico)",
    "Alto nível de autoconhecimento e pensamento sistêmico",
  ],
  ar: [
    "سجل حافل مثبت في إطلاق المنتجات لدى شركات كبرى",
    "مهارات تواصل قوية والقدرة على الإقناع",
    "خبرة في بيئة منتج (التجارة الإلكترونية)",
    "مستوى عالٍ من الوعي الذاتي والتفكير المنظومي",
  ],
};
const ARGS_AGAINST: Record<Locale, string[]> = {
  en: ["High salary expectations", "Limited experience in client/agency development"],
  es: ["Expectativas salariales altas", "Experiencia limitada en desarrollo para clientes/agencias"],
  pt: ["Expectativas salariais altas", "Experiência limitada em desenvolvimento para clientes/agências"],
  ar: ["توقعات راتب مرتفعة", "خبرة محدودة في التطوير للعملاء/الوكالات"],
};

export type Skill = { name: string; val: number; req: number; desc: string };
/* числовые поля (val/req) — общая база; текст (name/desc) — по локали, зипуется по индексу */
const SKILLS_BASE: { val: number; req: number }[] = [
  { val: 78, req: 86 },
  { val: 72, req: 86 },
  { val: 80, req: 80 },
  { val: 85, req: 80 },
  { val: 75, req: 72 },
  { val: 68, req: 84 },
];
const SKILLS_TEXT: Record<Locale, { name: string; desc: string }[]> = {
  en: [
    { name: "Management", desc: "Strong project-management skills — independently assembled and coordinated a team of 12 people. Experience at a fund demonstrates the ability to oversee execution" },
    { name: "Leadership", desc: "Shows leadership through responsibility and initiative. The management style is more functional than visionary" },
    { name: "Communication", desc: "A highly developed skill. Articulates thoughts clearly and in a structured way, listens attentively. Communicates effectively with the technical team and clients" },
    { name: "Planning", desc: "One of the strongest qualities. Proven experience building systems from scratch under uncertainty. Able to break down tasks" },
    { name: "Adaptability", desc: "Experience across different environments (fund, EdTech, startup) and with various methodologies points to strong adaptability to new conditions" },
    { name: "Stress resilience", desc: "Displays calm and controlled behavior. Speech markers indicate self-control, but there are no real cases of working under stress" },
  ],
  es: [
    { name: "Gestión", desc: "Sólidas habilidades de gestión de proyectos: formó y coordinó de forma autónoma un equipo de 12 personas. Su experiencia en un fondo demuestra la capacidad de supervisar la ejecución" },
    { name: "Liderazgo", desc: "Muestra liderazgo a través de la responsabilidad y la iniciativa. Su estilo de gestión es más funcional que visionario" },
    { name: "Comunicación", desc: "Una habilidad muy desarrollada. Articula sus ideas con claridad y de forma estructurada, escucha con atención. Se comunica con eficacia con el equipo técnico y los clientes" },
    { name: "Planificación", desc: "Una de sus cualidades más fuertes. Experiencia probada construyendo sistemas desde cero en condiciones de incertidumbre. Capaz de desglosar tareas" },
    { name: "Adaptabilidad", desc: "Su experiencia en distintos entornos (fondo, EdTech, startup) y con diversas metodologías apunta a una sólida adaptabilidad a nuevas condiciones" },
    { name: "Resiliencia al estrés", desc: "Muestra un comportamiento tranquilo y controlado. Los marcadores del habla indican autocontrol, pero no hay casos reales de trabajo bajo estrés" },
  ],
  pt: [
    { name: "Gestão", desc: "Sólidas habilidades de gestão de projetos: montou e coordenou de forma autônoma uma equipe de 12 pessoas. Sua experiência em um fundo demonstra a capacidade de supervisionar a execução" },
    { name: "Liderança", desc: "Demonstra liderança por meio da responsabilidade e da iniciativa. Seu estilo de gestão é mais funcional do que visionário" },
    { name: "Comunicação", desc: "Uma habilidade muito desenvolvida. Articula suas ideias com clareza e de forma estruturada, escuta com atenção. Comunica-se com eficácia com a equipe técnica e os clientes" },
    { name: "Planejamento", desc: "Uma de suas qualidades mais fortes. Experiência comprovada na construção de sistemas do zero em condições de incerteza. Capaz de decompor tarefas" },
    { name: "Adaptabilidade", desc: "Sua experiência em diferentes ambientes (fundo, EdTech, startup) e com diversas metodologias aponta para uma sólida adaptabilidade a novas condições" },
    { name: "Resiliência ao estresse", desc: "Apresenta um comportamento calmo e controlado. Os marcadores da fala indicam autocontrole, mas não há casos reais de trabalho sob estresse" },
  ],
  ar: [
    { name: "الإدارة", desc: "مهارات قوية في إدارة المشاريع؛ قام بمفرده بتكوين وتنسيق فريق من 12 شخصًا. تُظهر خبرته في أحد الصناديق القدرة على الإشراف على التنفيذ" },
    { name: "القيادة", desc: "يُظهر القيادة من خلال تحمّل المسؤولية والمبادرة. أسلوب الإدارة وظيفي أكثر منه رؤيوي" },
    { name: "التواصل", desc: "مهارة متطورة للغاية. يعبّر عن أفكاره بوضوح وبطريقة منظمة، ويستمع باهتمام. يتواصل بفعالية مع الفريق التقني والعملاء" },
    { name: "التخطيط", desc: "إحدى أقوى صفاته. خبرة مثبتة في بناء أنظمة من الصفر في ظروف عدم اليقين. قادر على تفكيك المهام" },
    { name: "القدرة على التكيّف", desc: "خبرته في بيئات مختلفة (صندوق، EdTech، شركة ناشئة) ومع منهجيات متنوعة تشير إلى قدرة قوية على التكيّف مع الظروف الجديدة" },
    { name: "تحمّل الضغط", desc: "يُظهر سلوكًا هادئًا ومنضبطًا. تشير مؤشرات الكلام إلى ضبط النفس، لكن لا توجد حالات فعلية للعمل تحت الضغط" },
  ],
};
export const SKILLS: Record<Locale, Skill[]> = {
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

/* ── словарь интерфейса блоков ── */
type Risk = { t: string; badge?: string; text: string };
type StarCaseT = { title: string; s: string; t: string; a: string; r: string; note: string };
type RecoT = { title: string; text: string; qs: string[] };
type DICT = {
  candidateInfo: string;
  expLabel: string; expVal: string;
  compLabel: string; compVal: string;
  expectLabel: string; expectVal: string;
  formatLabel: string; formatVal: string;
  bio: string;
  decision: string; recommended: string; argsFor: string; argsAgainst: string;
  risksTitle: string; strengthsTitle: string; psychoTitle: string;
  risks: Risk[];
  strengths: { t: string; text: string }[];
  weLabel: string; iLabel: string;
  psycho: { t: string; text: string }[];
  averageGap: string; topRisks: string; bestMatch: string; bestMatchText: string;
  topRiskRows: [string, string, string][];
  starCases: StarCaseT[]; assessment: string;
  starLabels: { situation: string; task: string; action: string; result: string };
  recos: RecoT[];
  legend: { req: string; low: string; mid: string; high: string };
};
const DICT: Record<Locale, DICT> = {
  en: {
    candidateInfo: "Candidate info",
    expLabel: "Experience", expVal: "9 years",
    compLabel: "Companies", compVal: "Ozon, Yandex, fintech",
    expectLabel: "Expectations", expectVal: "$2,800 (net)",
    formatLabel: "Format", formatVal: "hybrid / remote",
    bio: "Experienced IT project lead in e-commerce and fintech. Managed distributed teams of up to 15 people, launched products from scratch and grew existing ones",
    decision: "Decision to advance", recommended: "Recommended", argsFor: "Arguments for", argsAgainst: "Arguments against",
    risksTitle: "Risks", strengthsTitle: "Strengths", psychoTitle: "Psycholinguistics",
    risks: [
      { t: "Flight risk", badge: "Critical", text: "The candidate openly states that the current company is a way to obtain accreditation and a deferral" },
      { t: "Limited experience in a classic role", badge: "Important", text: "The main relevant experience is a single project resembling freelance work. May lack the skills needed at a large IT company" },
      { t: "Process-focused", badge: "Note", text: "Cases emphasize organization and launches, but there is almost no work with data and metrics (LTV, conversion)" },
    ],
    strengths: [
      { t: "Systems thinking", text: "Able to build processes from scratch, break down tasks and drive a product through to launch" },
      { t: "Full project lifecycle", text: "Confidently leads a project at every stage — from idea and team-building to launch and growth" },
      { t: "Reflectiveness", text: "Analyzes the value of the work and decides based on real impact rather than «heroics»" },
    ],
    weLabel: "We", iLabel: "I",
    psycho: [
      { t: "«I» / «We» balance", text: "Balances «I» when taking personal responsibility and «We» for team processes — a mature distribution of focus" },
      { t: "Tone", text: "Calm, measured, controlled. Speaks unhurriedly, with a low, even timbre" },
      { t: "Locus of control", text: "Takes responsibility, analyzes and draws conclusions rather than shifting blame to external circumstances" },
    ],
    averageGap: "Average gap", topRisks: "Top risks", bestMatch: "Best match",
    bestMatchText: "The candidate's profile is closest to the requirements for the «Planning» and «Problem solving» skills",
    topRiskRows: [
      ["Stress resilience", "16%", "The assessment is based on the candidate's calm behavior, without real examples of working in stressful situations"],
      ["Empathy", "15%", "There are indirect signs, but no direct examples of how empathy influences product decisions"],
      ["Leadership", "14%", "Shown mainly through project management; lacks examples of vision and motivating the team under challenging conditions"],
    ],
    starCases: [
      { title: "Case 1: Building a gamified platform for a real-estate agency",
        s: "A UAE agency struggled to attract investors due to a high barrier to entry and limited understanding of the market",
        t: "Build a marketing product that introduces investors to the market in a gamified way and boosts engagement",
        a: "Acted as PM/PO. Assembled a team of 12 people (developers, ML, marketing). Managed everything from game design to release",
        r: "The project was successfully delivered to the client. Specific business metrics (ROI, number of investors) were not disclosed",
        note: "A strong full-cycle management case. Demonstrated initiative and organizational skills. The weak point is the absence of business results in numbers" },
      { title: "Case 2: Setting up a management system at a venture fund",
        s: "At the start, the fund had no startup-evaluation (due diligence) or tracking processes, which created chaos",
        t: "Implement an internal management system to structure work with startups (CRM and tracking)",
        a: "Implemented the tool. Set up control processes and feedback loops from portfolio projects",
        r: "A system for properly conducting due diligence was created. Operational risks were reduced",
        note: "An excellent illustration of planning skills and building processes under uncertainty. However, the role here is more process-oriented than product-oriented" },
    ],
    assessment: "Assessment",
    starLabels: { situation: "Situation", task: "Task", action: "Action", result: "Result" },
    recos: [
      { title: "Experience with product analytics", text: "The cases show no work with metrics (A/B tests, retention, LTV, funnels). This is critical for a data-driven product manager",
        qs: ["Give an example of when you used data to make an important decision. Which metrics did you look at?", "How did you define the key success metrics for the gaming project? How did you track them?", "Have you faced a situation where the data contradicted a hypothesis? What did you do?"] },
      { title: "Stakeholder management in a corporate environment", text: "All experience is either with a single client or fund monitoring. It's unclear how they'd cope in an environment with conflicting interests",
        qs: ["Describe the most difficult situation in managing expectations. What was the conflict and how did you resolve it?", "How did you set up the process of aligning the roadmap across different departments?", "What will you do if sales need a feature «yesterday» while engineering estimates it at 3 months?"] },
    ],
    legend: { req: "Profile requirements", low: "Low skill level", mid: "Medium skill level", high: "High skill level" },
  },
  es: {
    candidateInfo: "Información del candidato",
    expLabel: "Experiencia", expVal: "9 años",
    compLabel: "Empresas", compVal: "Ozon, Yandex, fintech",
    expectLabel: "Expectativas", expectVal: "$2,800 (neto)",
    formatLabel: "Formato", formatVal: "híbrido / remoto",
    bio: "Líder de proyectos de TI con experiencia en comercio electrónico y fintech. Gestionó equipos distribuidos de hasta 15 personas, lanzó productos desde cero e hizo crecer los existentes",
    decision: "Decisión de avanzar", recommended: "Recomendado", argsFor: "Argumentos a favor", argsAgainst: "Argumentos en contra",
    risksTitle: "Riesgos", strengthsTitle: "Fortalezas", psychoTitle: "Psicolingüística",
    risks: [
      { t: "Riesgo de fuga", badge: "Crítico", text: "El candidato afirma abiertamente que la empresa actual es una forma de obtener la acreditación y un aplazamiento" },
      { t: "Experiencia limitada en un rol clásico", badge: "Importante", text: "La principal experiencia relevante es un único proyecto parecido al trabajo freelance. Puede carecer de las habilidades necesarias en una gran empresa de TI" },
      { t: "Orientado a procesos", badge: "Nota", text: "Los casos destacan la organización y los lanzamientos, pero casi no hay trabajo con datos y métricas (LTV, conversión)" },
    ],
    strengths: [
      { t: "Pensamiento sistémico", text: "Capaz de construir procesos desde cero, desglosar tareas y llevar un producto hasta su lanzamiento" },
      { t: "Ciclo de vida completo del proyecto", text: "Lidera con seguridad un proyecto en cada etapa: desde la idea y la formación del equipo hasta el lanzamiento y el crecimiento" },
      { t: "Reflexividad", text: "Analiza el valor del trabajo y decide en función del impacto real en lugar del «heroísmo»" },
    ],
    weLabel: "Nosotros", iLabel: "Yo",
    psycho: [
      { t: "Equilibrio «Yo» / «Nosotros»", text: "Equilibra el «Yo» al asumir la responsabilidad personal y el «Nosotros» para los procesos de equipo: una distribución madura del enfoque" },
      { t: "Tono", text: "Tranquilo, mesurado, controlado. Habla sin prisa, con un timbre bajo y uniforme" },
      { t: "Locus de control", text: "Asume la responsabilidad, analiza y saca conclusiones en lugar de culpar a las circunstancias externas" },
    ],
    averageGap: "Brecha promedio", topRisks: "Principales riesgos", bestMatch: "Mejor coincidencia",
    bestMatchText: "El perfil del candidato es el que más se acerca a los requisitos de las habilidades «Planificación» y «Resolución de problemas»",
    topRiskRows: [
      ["Resiliencia al estrés", "16%", "La evaluación se basa en el comportamiento tranquilo del candidato, sin ejemplos reales de trabajo en situaciones de estrés"],
      ["Empatía", "15%", "Hay indicios indirectos, pero ningún ejemplo directo de cómo la empatía influye en las decisiones de producto"],
      ["Liderazgo", "14%", "Se muestra principalmente a través de la gestión de proyectos; faltan ejemplos de visión y de motivación del equipo en condiciones difíciles"],
    ],
    starCases: [
      { title: "Caso 1: Creación de una plataforma gamificada para una agencia inmobiliaria",
        s: "Una agencia de los EAU tenía dificultades para atraer inversores debido a una alta barrera de entrada y un conocimiento limitado del mercado",
        t: "Crear un producto de marketing que introduzca a los inversores en el mercado de forma gamificada y aumente la participación",
        a: "Actuó como PM/PO. Formó un equipo de 12 personas (desarrolladores, ML, marketing). Gestionó todo, desde el diseño del juego hasta el lanzamiento",
        r: "El proyecto se entregó con éxito al cliente. No se divulgaron métricas de negocio específicas (ROI, número de inversores)",
        note: "Un sólido caso de gestión de ciclo completo. Demostró iniciativa y capacidad organizativa. El punto débil es la ausencia de resultados de negocio en cifras" },
      { title: "Caso 2: Implementación de un sistema de gestión en un fondo de capital riesgo",
        s: "Al inicio, el fondo no contaba con procesos de evaluación de startups (due diligence) ni de seguimiento, lo que generaba caos",
        t: "Implementar un sistema de gestión interno para estructurar el trabajo con las startups (CRM y seguimiento)",
        a: "Implementó la herramienta. Estableció procesos de control y circuitos de retroalimentación de los proyectos de la cartera",
        r: "Se creó un sistema para realizar correctamente el due diligence. Se redujeron los riesgos operativos",
        note: "Una excelente muestra de habilidades de planificación y de construcción de procesos en condiciones de incertidumbre. Sin embargo, aquí el rol está más orientado a procesos que a producto" },
    ],
    assessment: "Evaluación",
    starLabels: { situation: "Situación", task: "Tarea", action: "Acción", result: "Resultado" },
    recos: [
      { title: "Experiencia con analítica de producto", text: "Los casos no muestran trabajo con métricas (pruebas A/B, retención, LTV, embudos). Esto es crítico para un product manager orientado a datos",
        qs: ["Da un ejemplo de cuándo utilizaste datos para tomar una decisión importante. ¿Qué métricas miraste?", "¿Cómo definiste las métricas clave de éxito del proyecto de juego? ¿Cómo las seguiste?", "¿Te has enfrentado a una situación en la que los datos contradecían una hipótesis? ¿Qué hiciste?"] },
      { title: "Gestión de stakeholders en un entorno corporativo", text: "Toda la experiencia es con un único cliente o con el seguimiento del fondo. No está claro cómo se desenvolvería en un entorno con intereses contrapuestos",
        qs: ["Describe la situación más difícil en la gestión de expectativas. ¿Cuál fue el conflicto y cómo lo resolviste?", "¿Cómo estableciste el proceso de alineación del roadmap entre los distintos departamentos?", "¿Qué harás si ventas necesita una funcionalidad «para ayer» mientras que ingeniería la estima en 3 meses?"] },
    ],
    legend: { req: "Requisitos del perfil", low: "Nivel de habilidad bajo", mid: "Nivel de habilidad medio", high: "Nivel de habilidad alto" },
  },
  pt: {
    candidateInfo: "Informações do candidato",
    expLabel: "Experiência", expVal: "9 anos",
    compLabel: "Empresas", compVal: "Ozon, Yandex, fintech",
    expectLabel: "Expectativas", expectVal: "$2,800 (líquido)",
    formatLabel: "Formato", formatVal: "híbrido / remoto",
    bio: "Líder de projetos de TI com experiência em comércio eletrônico e fintech. Gerenciou equipes distribuídas de até 15 pessoas, lançou produtos do zero e fez crescer os existentes",
    decision: "Decisão de avançar", recommended: "Recomendado", argsFor: "Argumentos a favor", argsAgainst: "Argumentos contra",
    risksTitle: "Riscos", strengthsTitle: "Pontos fortes", psychoTitle: "Psicolinguística",
    risks: [
      { t: "Risco de saída", badge: "Crítico", text: "O candidato afirma abertamente que a empresa atual é uma forma de obter a acreditação e um adiamento" },
      { t: "Experiência limitada em um cargo clássico", badge: "Importante", text: "A principal experiência relevante é um único projeto semelhante a trabalho freelance. Pode faltar as habilidades necessárias em uma grande empresa de TI" },
      { t: "Focado em processos", badge: "Nota", text: "Os casos enfatizam a organização e os lançamentos, mas quase não há trabalho com dados e métricas (LTV, conversão)" },
    ],
    strengths: [
      { t: "Pensamento sistêmico", text: "Capaz de construir processos do zero, decompor tarefas e levar um produto até o lançamento" },
      { t: "Ciclo de vida completo do projeto", text: "Lidera com segurança um projeto em todas as etapas — da ideia e formação da equipe até o lançamento e o crescimento" },
      { t: "Reflexividade", text: "Analisa o valor do trabalho e decide com base no impacto real, e não no «heroísmo»" },
    ],
    weLabel: "Nós", iLabel: "Eu",
    psycho: [
      { t: "Equilíbrio «Eu» / «Nós»", text: "Equilibra o «Eu» ao assumir a responsabilidade pessoal e o «Nós» para os processos de equipe — uma distribuição madura do foco" },
      { t: "Tom", text: "Calmo, comedido, controlado. Fala sem pressa, com um timbre baixo e uniforme" },
      { t: "Locus de controle", text: "Assume a responsabilidade, analisa e tira conclusões em vez de culpar as circunstâncias externas" },
    ],
    averageGap: "Lacuna média", topRisks: "Principais riscos", bestMatch: "Melhor correspondência",
    bestMatchText: "O perfil do candidato é o que mais se aproxima dos requisitos das habilidades «Planejamento» e «Resolução de problemas»",
    topRiskRows: [
      ["Resiliência ao estresse", "16%", "A avaliação baseia-se no comportamento calmo do candidato, sem exemplos reais de trabalho em situações de estresse"],
      ["Empatia", "15%", "Há sinais indiretos, mas nenhum exemplo direto de como a empatia influencia as decisões de produto"],
      ["Liderança", "14%", "Demonstrada principalmente por meio da gestão de projetos; faltam exemplos de visão e de motivação da equipe em condições difíceis"],
    ],
    starCases: [
      { title: "Caso 1: Criação de uma plataforma gamificada para uma agência imobiliária",
        s: "Uma agência dos Emirados Árabes Unidos tinha dificuldade para atrair investidores devido a uma alta barreira de entrada e a um conhecimento limitado do mercado",
        t: "Criar um produto de marketing que apresente o mercado aos investidores de forma gamificada e aumente o engajamento",
        a: "Atuou como PM/PO. Montou uma equipe de 12 pessoas (desenvolvedores, ML, marketing). Gerenciou tudo, do design do jogo ao lançamento",
        r: "O projeto foi entregue com sucesso ao cliente. Métricas de negócio específicas (ROI, número de investidores) não foram divulgadas",
        note: "Um sólido caso de gestão de ciclo completo. Demonstrou iniciativa e capacidade organizacional. O ponto fraco é a ausência de resultados de negócio em números" },
      { title: "Caso 2: Implementação de um sistema de gestão em um fundo de capital de risco",
        s: "No início, o fundo não tinha processos de avaliação de startups (due diligence) nem de acompanhamento, o que gerava caos",
        t: "Implementar um sistema de gestão interno para estruturar o trabalho com as startups (CRM e acompanhamento)",
        a: "Implementou a ferramenta. Estabeleceu processos de controle e ciclos de feedback dos projetos da carteira",
        r: "Criou-se um sistema para conduzir corretamente o due diligence. Os riscos operacionais foram reduzidos",
        note: "Uma excelente demonstração de habilidades de planejamento e de construção de processos em condições de incerteza. No entanto, aqui o cargo é mais orientado a processos do que a produto" },
    ],
    assessment: "Avaliação",
    starLabels: { situation: "Situação", task: "Tarefa", action: "Ação", result: "Resultado" },
    recos: [
      { title: "Experiência com analytics de produto", text: "Os casos não mostram trabalho com métricas (testes A/B, retenção, LTV, funis). Isso é crítico para um product manager orientado a dados",
        qs: ["Dê um exemplo de quando você usou dados para tomar uma decisão importante. Quais métricas você analisou?", "Como você definiu as principais métricas de sucesso do projeto de jogo? Como as acompanhou?", "Você já enfrentou uma situação em que os dados contradiziam uma hipótese? O que você fez?"] },
      { title: "Gestão de stakeholders em um ambiente corporativo", text: "Toda a experiência é com um único cliente ou com o acompanhamento do fundo. Não está claro como ele se sairia em um ambiente com interesses conflitantes",
        qs: ["Descreva a situação mais difícil na gestão de expectativas. Qual foi o conflito e como você o resolveu?", "Como você estabeleceu o processo de alinhamento do roadmap entre os diferentes departamentos?", "O que você fará se as vendas precisarem de uma funcionalidade «para ontem» enquanto a engenharia a estima em 3 meses?"] },
    ],
    legend: { req: "Requisitos do perfil", low: "Nível de habilidade baixo", mid: "Nível de habilidade médio", high: "Nível de habilidade alto" },
  },
  ar: {
    candidateInfo: "معلومات المرشّح",
    expLabel: "الخبرة", expVal: "9 سنوات",
    compLabel: "الشركات", compVal: "Ozon, Yandex, fintech",
    expectLabel: "التوقعات", expectVal: "$2,800 (صافٍ)",
    formatLabel: "نمط العمل", formatVal: "هجين / عن بُعد",
    bio: "قائد مشاريع تقنية معلومات ذو خبرة في التجارة الإلكترونية والتقنية المالية. أدار فرقًا موزّعة يصل عددها إلى 15 شخصًا، وأطلق منتجات من الصفر ونمّى المنتجات القائمة",
    decision: "قرار الترشيح للمرحلة التالية", recommended: "موصى به", argsFor: "حجج مؤيدة", argsAgainst: "حجج معارِضة",
    risksTitle: "المخاطر", strengthsTitle: "نقاط القوة", psychoTitle: "اللغويات النفسية",
    risks: [
      { t: "مخاطر المغادرة", badge: "حرج", text: "يصرّح المرشّح علنًا بأن الشركة الحالية وسيلة للحصول على الاعتماد وعلى تأجيل" },
      { t: "خبرة محدودة في دور كلاسيكي", badge: "مهم", text: "الخبرة الرئيسية ذات الصلة هي مشروع واحد يشبه العمل الحر. قد تنقصه المهارات اللازمة في شركة تقنية معلومات كبيرة" },
      { t: "مركّز على العمليات", badge: "ملاحظة", text: "تركّز الحالات على التنظيم وعمليات الإطلاق، لكن لا يكاد يوجد عمل مع البيانات والمقاييس (LTV، معدل التحويل)" },
    ],
    strengths: [
      { t: "التفكير المنظومي", text: "قادر على بناء العمليات من الصفر وتفكيك المهام ودفع المنتج حتى الإطلاق" },
      { t: "دورة حياة المشروع كاملة", text: "يقود المشروع بثقة في كل مرحلة، من الفكرة وتكوين الفريق إلى الإطلاق والنمو" },
      { t: "القدرة على التأمل الذاتي", text: "يحلّل قيمة العمل ويقرّر بناءً على الأثر الفعلي بدلًا من «البطولات»" },
    ],
    weLabel: "نحن", iLabel: "أنا",
    psycho: [
      { t: "توازن «أنا» / «نحن»", text: "يوازن بين «أنا» عند تحمّل المسؤولية الشخصية و«نحن» لعمليات الفريق، وهو توزيع ناضج للتركيز" },
      { t: "النبرة", text: "هادئة، متّزنة، منضبطة. يتحدّث دون تسرّع، بطبقة صوت منخفضة ومتساوية" },
      { t: "موضع التحكّم", text: "يتحمّل المسؤولية ويحلّل ويستخلص الاستنتاجات بدلًا من إلقاء اللوم على الظروف الخارجية" },
    ],
    averageGap: "متوسط الفجوة", topRisks: "أبرز المخاطر", bestMatch: "أقرب تطابق",
    bestMatchText: "ملف المرشّح هو الأقرب إلى المتطلبات في مهارتي «التخطيط» و«حل المشكلات»",
    topRiskRows: [
      ["تحمّل الضغط", "16%", "يستند التقييم إلى سلوك المرشّح الهادئ، دون أمثلة فعلية على العمل في مواقف ضاغطة"],
      ["التعاطف", "15%", "توجد مؤشرات غير مباشرة، لكن لا توجد أمثلة مباشرة على كيفية تأثير التعاطف في قرارات المنتج"],
      ["القيادة", "14%", "تظهر أساسًا من خلال إدارة المشاريع؛ تنقصها أمثلة على الرؤية وتحفيز الفريق في الظروف الصعبة"],
    ],
    starCases: [
      { title: "الحالة 1: بناء منصة قائمة على التلعيب لوكالة عقارية",
        s: "واجهت وكالة في الإمارات صعوبة في جذب المستثمرين بسبب ارتفاع حاجز الدخول ومحدودية فهم السوق",
        t: "بناء منتج تسويقي يعرّف المستثمرين بالسوق بأسلوب قائم على التلعيب ويعزّز التفاعل",
        a: "عمل بصفة PM/PO. كوّن فريقًا من 12 شخصًا (مطوّرون، تعلّم آلي، تسويق). أدار كل شيء من تصميم اللعبة إلى الإطلاق",
        r: "سُلّم المشروع بنجاح إلى العميل. لم يُفصح عن مقاييس أعمال محددة (العائد على الاستثمار، عدد المستثمرين)",
        note: "حالة قوية لإدارة الدورة الكاملة. أظهر المبادرة والمهارات التنظيمية. نقطة الضعف هي غياب نتائج الأعمال بالأرقام" },
      { title: "الحالة 2: إعداد نظام إدارة في صندوق استثمار جريء",
        s: "في البداية، لم يكن لدى الصندوق عمليات لتقييم الشركات الناشئة (العناية الواجبة) أو للتتبّع، ما أحدث فوضى",
        t: "تطبيق نظام إدارة داخلي لهيكلة العمل مع الشركات الناشئة (CRM والتتبّع)",
        a: "طبّق الأداة. أعدّ عمليات الرقابة وحلقات التغذية الراجعة من مشاريع المحفظة",
        r: "أُنشئ نظام لإجراء العناية الواجبة بشكل صحيح. خُفّضت المخاطر التشغيلية",
        note: "مثال ممتاز على مهارات التخطيط وبناء العمليات في ظل عدم اليقين. غير أن الدور هنا موجّه نحو العمليات أكثر من المنتج" },
    ],
    assessment: "التقييم",
    starLabels: { situation: "الموقف", task: "المهمة", action: "الإجراء", result: "النتيجة" },
    recos: [
      { title: "الخبرة في تحليلات المنتج", text: "لا تُظهر الحالات أي عمل مع المقاييس (اختبارات A/B، الاحتفاظ، LTV، المسارات). هذا أمر حاسم لمدير منتج معتمد على البيانات",
        qs: ["اذكر مثالًا استخدمت فيه البيانات لاتخاذ قرار مهم. ما المقاييس التي نظرت إليها؟", "كيف حدّدت مقاييس النجاح الرئيسية لمشروع اللعبة؟ وكيف تتبّعتها؟", "هل واجهت موقفًا تعارضت فيه البيانات مع فرضية؟ ماذا فعلت؟"] },
      { title: "إدارة أصحاب المصلحة في بيئة مؤسسية", text: "كل الخبرة إمّا مع عميل واحد أو مع مراقبة الصندوق. من غير الواضح كيف سيتعامل في بيئة ذات مصالح متضاربة",
        qs: ["صِف أصعب موقف في إدارة التوقعات. ما كان التعارض وكيف حللته؟", "كيف أعددت عملية مواءمة خارطة الطريق بين الأقسام المختلفة؟", "ماذا ستفعل إذا احتاجت المبيعات ميزة «بالأمس» بينما تقدّرها الهندسة بثلاثة أشهر؟"] },
    ],
    legend: { req: "متطلبات الملف", low: "مستوى مهارة منخفض", mid: "مستوى مهارة متوسط", high: "مستوى مهارة عالٍ" },
  },
};

/* ============================================================
   1 · Информация о кандидате + Решение  (бывш. /1.png)
   ============================================================ */
export function CandidateDecision() {
  const loc = useLocale();
  const t = DICT[loc];
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card>
        <h3 className="text-base font-bold">{t.candidateInfo}</h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Info icon={<Briefcase className="h-4 w-4" />} t={t.expLabel} v={t.expVal} />
          <Info icon={<Building2 className="h-4 w-4" />} t={t.compLabel} v={t.compVal} />
          <Info icon={<Wallet className="h-4 w-4" />} t={t.expectLabel} v={t.expectVal} />
          <Info icon={<Home className="h-4 w-4" />} t={t.formatLabel} v={t.formatVal} />
        </div>
        <p className="mt-4 border-t border-[#eef0ee] pt-4 text-sm leading-relaxed text-[#183833]/70">
          {t.bio}
        </p>
      </Card>

      <div className="rounded-3xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] to-[#eef7e0] p-5 shadow-[0_16px_44px_rgba(24,56,51,0.07)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 text-base font-bold"><Check className="h-5 w-5" style={{ color: GREEN }} /> {t.decision}</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> {t.recommended}</span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold" style={{ color: GREEN }}>{t.argsFor}</p>
            <ul className="mt-2 space-y-1.5">{ARGS_FOR[loc].map((a) => <li key={a} className="flex items-start gap-1.5 text-xs text-[#183833]/75"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: GREEN }} /> {a}</li>)}</ul>
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: RED }}>{t.argsAgainst}</p>
            <ul className="mt-2 space-y-1.5">{ARGS_AGAINST[loc].map((a) => <li key={a} className="flex items-start gap-1.5 text-xs text-[#183833]/75"><X className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: RED }} /> {a}</li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   3 · Риски / Сильные стороны / Психолингвистика  (бывш. /2.png)
   ============================================================ */
export function RisksStrengthsPsycho() {
  const mounted = useMounted();
  const t = DICT[useLocale()];
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <Card>
        <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: RED }}><Flame className="h-4 w-4" /> {t.risksTitle}</h3>
        {t.risks.map((r, i) => <Block key={i} t={r.t} badge={r.badge} bc={i === 0 ? RED : AMBER} text={r.text} />)}
      </Card>
      <Card>
        <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> {t.strengthsTitle}</h3>
        {t.strengths.map((s, i) => <Block key={i} t={s.t} text={s.text} />)}
      </Card>
      <Card>
        <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: TEAL }}><AudioLines className="h-4 w-4" /> {t.psychoTitle}</h3>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs font-semibold"><span style={{ color: INK }}>{t.weLabel}</span><span style={{ color: INK }}>{t.iLabel}</span></div>
          <div className="relative mt-1.5 h-1.5 rounded-full bg-[#eef2ec]">
            <div className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000" style={{ width: mounted ? "62%" : "0%", background: `linear-gradient(90deg,${TEAL},${GREEN})` }} />
            <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow transition-[left] duration-1000" style={{ left: mounted ? "62%" : "0%", background: GREEN }} />
          </div>
        </div>
        {t.psycho.map((p, i) => <Block key={i} t={p.t} text={p.text} />)}
      </Card>
    </div>
  );
}

/* ============================================================
   4 · Диаграмма соответствия (роза) + риски  (бывш. /3.png)
   ============================================================ */
export function ComplianceDiagram() {
  const t = DICT[useLocale()];
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.3fr_1fr]">
      <Card><RoseChart /></Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#e6ece4] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(24,56,51,0.05)]"><span className="text-base font-bold">{t.averageGap}</span><span className="flex items-center gap-1 text-base font-bold" style={{ color: AMBER }}>9% <ChevronDown className="h-4 w-4" /></span></div>
        <Card className="flex flex-1 flex-col">
          <p className="flex items-center gap-2 text-base font-bold" style={{ color: RED }}><Flame className="h-4 w-4" /> {t.topRisks}</p>
          <div className="mt-3 space-y-3">
            {t.topRiskRows.map(([k, v, dsc], i) => (
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
            <p className="flex items-center gap-2 text-base font-bold" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> {t.bestMatch}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#183833]/75">{t.bestMatchText}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   5 · Карта soft skills  (бывш. /4.png)
   ============================================================ */
export function SoftSkillsMap() {
  const mounted = useMounted();
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
      {SKILLS[useLocale()].map((s) => {
        const c = s.val >= 70 ? GREEN : s.val >= 50 ? AMBER : RED;
        return (
          <Card key={s.name} className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-2"><p className="text-sm font-semibold">{s.name}</p><span className="text-sm font-bold" style={{ color: c }}>{s.val}%</span></div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#eef2ec]"><div className="h-full rounded-full transition-[width] duration-[1100ms] ease-out" style={{ width: mounted ? `${s.val}%` : "0%", background: c }} /></div>
            <p className="mt-2 text-[11px] leading-snug text-[#183833]/65">{s.desc}</p>
          </Card>
        );
      })}
    </div>
  );
}

/* ============================================================
   6 · Кейсы по модели STAR  (бывш. /5.png)
   ============================================================ */
export function StarCases() {
  const d = DICT[useLocale()];
  return (
    <div className="space-y-4">
      {d.starCases.map((c, i) => (
        <StarCase key={i} title={c.title} s={c.s} t={c.t} a={c.a} r={c.r} note={c.note}
          labels={d.starLabels} assessment={d.assessment} />
      ))}
    </div>
  );
}

/* ============================================================
   7 · Рекомендации для следующих этапов  (бывш. /6.png)
   ============================================================ */
export function Recommendations() {
  const d = DICT[useLocale()];
  return (
    <div className="space-y-3">
      {d.recos.map((r, i) => <Reco key={i} title={r.title} text={r.text} qs={r.qs} />)}
    </div>
  );
}

/* ============================================================
   Мелкие переиспользуемые компоненты
   ============================================================ */
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-[#e6ece4] bg-white p-5 shadow-[0_16px_44px_rgba(24,56,51,0.06)] ${className}`}>{children}</div>;
}
function Info({ icon, t, v }: { icon: React.ReactNode; t: string; v: string }) {
  return <div className="flex items-start gap-2"><span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f4f7f2] text-[#7AB800]">{icon}</span><div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{t}</p><p className="text-xs font-medium">{v}</p></div></div>;
}
function Block({ t, text, badge, bc }: { t: string; text: string; badge?: string; bc?: string }) {
  return <div className="mt-3 border-t border-[#eef0ee] pt-3"><div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold">{t}</p>{badge && <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase" style={{ background: `${bc}1a`, color: bc }}>{badge}</span>}</div><p className="mt-1 text-[11px] leading-snug text-[#183833]/65">{text}</p></div>;
}
function StarCase({ title, s, t, a, r, note, labels, assessment }: { title: string; s: string; t: string; a: string; r: string; note: string; labels: { situation: string; task: string; action: string; result: string }; assessment: string }) {
  const rows: [string, string, string][] = [[labels.situation, s, TEAL], [labels.task, t, GREEN], [labels.action, a, AMBER], [labels.result, r, GREEN]];
  return (
    <Card>
      <p className="text-sm font-bold">{title}</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(([k, v, c]) => <div key={k} className="rounded-2xl bg-[#f6faef] p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: c }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} /> {k}</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{v}</p></div>)}
      </div>
      <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-[#d8ecc4] bg-[#f3faea] p-3.5"><MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><div><p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: GREEN }}>{assessment}</p><p className="mt-0.5 text-[11px] leading-snug text-[#183833]/70">{note}</p></div></div>
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
function RoseChart() {
  const loc = useLocale();
  const labels = RADAR_LABELS[loc];
  const lg = DICT[loc].legend;
  const RADAR = RADAR_BASE.map((d, i) => ({ ...d, l: labels[i] }));
  const N = RADAR.length, cx = 280, cy = 220, R = 140, seg = 360 / N, pad = 1.6, labelR = R + 18;
  const lvl = (v: number) => (v >= 60 ? GREEN : v >= 40 ? "#bcdd93" : "#f2a0a0");
  const rad = (d: number) => (d * Math.PI) / 180;
  const sector = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${cx} ${cy} L ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)} Z`;
  };
  const arc = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`;
  };
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 560 480" className="w-full max-w-[520px]">
        {RADAR.map((_, i) => <path key={`bg${i}`} d={sector(R, i)} fill="#eef1f3" stroke="#ffffff" strokeWidth="2.5" />)}
        {[0.25, 0.5, 0.75, 1].map((f) => RADAR.map((_, i) => <path key={`g${f}-${i}`} d={arc(R * f, i)} fill="none" stroke="#d2dce2" strokeWidth="1" opacity="0.7" />))}
        {RADAR.map((d, i) => <path key={`req${i}`} d={sector((R * d.req) / 100, i)} fill="#bcd9ec" stroke="#ffffff" strokeWidth="1.5" />)}
        {RADAR.map((d, i) => <path key={`v${i}`} d={sector((R * d.v) / 100, i)} fill={lvl(d.v)} style={{ transformOrigin: `${cx}px ${cy}px`, animation: `roseG .7s ease-out ${0.04 * i + 0.1}s both` }} />)}
        {RADAR.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), rr = R * 0.66;
          return <text key={`p${i}`} x={(cx + rr * Math.cos(a)).toFixed(1)} y={(cy + rr * Math.sin(a)).toFixed(1)} fontSize="13" fontWeight="700" fill="#2b4a44" textAnchor="middle" dominantBaseline="middle">{d.v}%</text>;
        })}
        {RADAR.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), ca = Math.cos(a);
          const anchor = ca > 0.15 ? "start" : ca < -0.15 ? "end" : "middle";
          return <text key={`l${i}`} x={(cx + labelR * ca).toFixed(1)} y={(cy + labelR * Math.sin(a)).toFixed(1)} fontSize="12.5" fill="#3a4f4a" textAnchor={anchor} dominantBaseline="middle">{d.l}</text>;
        })}
        <style>{`@keyframes roseG{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] text-[#183833]/70 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-4">
        <Lg c="#bcd9ec" t={lg.req} /><Lg c="#f2a0a0" t={lg.low} /><Lg c="#bcdd93" t={lg.mid} /><Lg c={GREEN} t={lg.high} />
      </div>
    </div>
  );
}
function Lg({ c, t }: { c: string; t: string }) { return <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm border border-black/5" style={{ background: c }} /> {t}</span>; }
