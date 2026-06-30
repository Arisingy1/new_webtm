"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Dna, Building2, Globe, Users, FileText, Check, AlertTriangle,
  Target, Compass, UserCheck, Lightbulb, ShieldCheck,
  X, TrendingUp, TrendingDown, ExternalLink, MessageSquareQuote,
} from "lucide-react";
import { useLocale } from "@/components/tm/LocaleProvider";
import { localize, type Locale } from "@/lib/i18n";

/* ── палитра ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const AMBER = "#E8A317";
const RED = "#FF5252";

/* ============================================================
   /culture/example — «Пример отчёта по корпоративной культуре».
   Полностью свёрстанная страница с анимациями: профиль ДНК
   компании по 7 измерениям и детальным параметрам, доминирующий
   тип культуры, сильные стороны и зоны напряжения, портрет
   идеального кандидата и рекомендации по найму.
   ============================================================ */

/* ── базовые (нетекстовые) данные 7 измерений: ключ/значение/цвет ── */
type DimBase = { key: string; val: number; c: string };
const DIMS_BASE: DimBase[] = [
  { key: "result", val: 81, c: "#FF6B57" },
  { key: "stab", val: 78, c: TEAL },
  { key: "detail", val: 75, c: "#2E9E8F" },
  { key: "people", val: 72, c: AMBER },
  { key: "team", val: 69, c: "#5BA528" },
  { key: "inno", val: 64, c: GREEN },
  { key: "aggr", val: 58, c: "#E07B39" },
];

/* ── текстовые поля 7 измерений по локали (зипуются по индексу) ── */
type DimText = { name: string; sum: string; params: string[] };
const DIMS_TEXT: Record<Locale, DimText[]> = {
  en: [
    { name: "Results orientation", sum: "The dominant dimension. Decisions are judged by outcome; ambitious goals and accountability are valued", params: ["Action orientation", "Achievement orientation", "Being demanding", "High expectations", "Results orientation", "Pay for performance", "Emphasis on quality"] },
    { name: "Stability", sum: "A strong reliance on processes and predictability. Long-term planning, low turnover", params: ["Stability", "Predictability", "Caution", "Rule orientation", "Job security", "Low conflict levels"] },
    { name: "Attention to detail", sum: "A data-driven approach; thoroughness, documentation, and peer review are built into the processes", params: ["Analytical thinking", "Attention to detail", "Precision", "Strong organization"] },
    { name: "People orientation", sum: "Fairness and employee development. Decisions account for the impact on the team", params: ["Fairness", "Respect for individual rights", "Tolerance", "Support", "People orientation", "Growth opportunities", "Recognition of achievements"] },
    { name: "Team orientation", sum: "Collective achievements matter, but individual accountability is expressed more strongly", params: ["Team orientation", "Free flow of information", "Collaboration", "Friendships at work", "Fitting in with the team"] },
    { name: "Innovation", sum: "Moderate. Experimentation is encouraged, but within managed risk", params: ["Flexibility", "Adaptability", "Innovation", "Seizing opportunities", "Willingness to experiment", "Risk appetite", "Freedom from rigid constraints"] },
    { name: "Competitiveness", sum: "The weakest dimension. The internal environment is collaborative rather than competitive", params: ["Competitiveness", "Assertiveness", "Decisiveness", "Initiative", "Personal accountability", "Direct conflict resolution", "Work intensity"] },
  ],
  es: [
    { name: "Orientación a resultados", sum: "La dimensión dominante. Las decisiones se juzgan por el resultado; se valoran las metas ambiciosas y la rendición de cuentas", params: ["Orientación a la acción", "Orientación al logro", "Exigencia", "Altas expectativas", "Orientación a resultados", "Pago por desempeño", "Énfasis en la calidad"] },
    { name: "Estabilidad", sum: "Una fuerte dependencia de los procesos y la previsibilidad. Planificación a largo plazo, baja rotación", params: ["Estabilidad", "Previsibilidad", "Cautela", "Orientación a las reglas", "Seguridad laboral", "Bajos niveles de conflicto"] },
    { name: "Atención al detalle", sum: "Un enfoque basado en datos; el rigor, la documentación y la revisión por pares están integrados en los procesos", params: ["Pensamiento analítico", "Atención al detalle", "Precisión", "Organización sólida"] },
    { name: "Orientación a las personas", sum: "Equidad y desarrollo de los empleados. Las decisiones tienen en cuenta el impacto en el equipo", params: ["Equidad", "Respeto a los derechos individuales", "Tolerancia", "Apoyo", "Orientación a las personas", "Oportunidades de crecimiento", "Reconocimiento de los logros"] },
    { name: "Orientación al equipo", sum: "Los logros colectivos importan, pero la rendición de cuentas individual se expresa con más fuerza", params: ["Orientación al equipo", "Flujo libre de información", "Colaboración", "Amistades en el trabajo", "Integración con el equipo"] },
    { name: "Innovación", sum: "Moderada. Se fomenta la experimentación, pero dentro de un riesgo gestionado", params: ["Flexibilidad", "Adaptabilidad", "Innovación", "Aprovechar oportunidades", "Disposición a experimentar", "Apetito de riesgo", "Libertad frente a restricciones rígidas"] },
    { name: "Competitividad", sum: "La dimensión más débil. El entorno interno es colaborativo más que competitivo", params: ["Competitividad", "Asertividad", "Decisión", "Iniciativa", "Responsabilidad personal", "Resolución directa de conflictos", "Intensidad del trabajo"] },
  ],
  pt: [
    { name: "Orientação a resultados", sum: "A dimensão dominante. As decisões são julgadas pelo resultado; metas ambiciosas e responsabilização são valorizadas", params: ["Orientação à ação", "Orientação à conquista", "Exigência", "Altas expectativas", "Orientação a resultados", "Remuneração por desempenho", "Ênfase na qualidade"] },
    { name: "Estabilidade", sum: "Forte dependência de processos e previsibilidade. Planejamento de longo prazo, baixa rotatividade", params: ["Estabilidade", "Previsibilidade", "Cautela", "Orientação a regras", "Segurança no emprego", "Baixos níveis de conflito"] },
    { name: "Atenção aos detalhes", sum: "Uma abordagem orientada por dados; rigor, documentação e revisão por pares estão incorporados aos processos", params: ["Pensamento analítico", "Atenção aos detalhes", "Precisão", "Organização sólida"] },
    { name: "Orientação às pessoas", sum: "Justiça e desenvolvimento dos colaboradores. As decisões levam em conta o impacto na equipe", params: ["Justiça", "Respeito aos direitos individuais", "Tolerância", "Apoio", "Orientação às pessoas", "Oportunidades de crescimento", "Reconhecimento das conquistas"] },
    { name: "Orientação à equipe", sum: "As conquistas coletivas importam, mas a responsabilização individual é expressa com mais força", params: ["Orientação à equipe", "Livre fluxo de informação", "Colaboração", "Amizades no trabalho", "Integração com a equipe"] },
    { name: "Inovação", sum: "Moderada. A experimentação é incentivada, mas dentro de um risco gerenciado", params: ["Flexibilidade", "Adaptabilidade", "Inovação", "Aproveitar oportunidades", "Disposição para experimentar", "Apetite por risco", "Liberdade frente a restrições rígidas"] },
    { name: "Competitividade", sum: "A dimensão mais fraca. O ambiente interno é colaborativo em vez de competitivo", params: ["Competitividade", "Assertividade", "Decisão", "Iniciativa", "Responsabilidade pessoal", "Resolução direta de conflitos", "Intensidade do trabalho"] },
  ],
  ar: [
    { name: "التوجّه نحو النتائج", sum: "البُعد المهيمن. تُقيَّم القرارات بالنتيجة؛ وتُقدَّر الأهداف الطموحة والمساءلة", params: ["التوجّه نحو الفعل", "التوجّه نحو الإنجاز", "التطلّب", "توقّعات عالية", "التوجّه نحو النتائج", "الأجر مقابل الأداء", "التركيز على الجودة"] },
    { name: "الاستقرار", sum: "اعتماد قوي على العمليات والقابلية للتنبؤ. تخطيط طويل الأمد ومعدّل دوران منخفض", params: ["الاستقرار", "القابلية للتنبؤ", "الحصافة", "التوجّه نحو القواعد", "الأمان الوظيفي", "انخفاض مستويات النزاع"] },
    { name: "الاهتمام بالتفاصيل", sum: "نهج قائم على البيانات؛ الدقة والتوثيق ومراجعة الأقران مدمجة في العمليات", params: ["التفكير التحليلي", "الاهتمام بالتفاصيل", "الدقة", "تنظيم قوي"] },
    { name: "التوجّه نحو الأفراد", sum: "الإنصاف وتطوير الموظفين. تراعي القرارات أثرها على الفريق", params: ["الإنصاف", "احترام الحقوق الفردية", "التسامح", "الدعم", "التوجّه نحو الأفراد", "فرص النمو", "تقدير الإنجازات"] },
    { name: "التوجّه نحو الفريق", sum: "الإنجازات الجماعية مهمّة، لكن المساءلة الفردية تتجلّى بقوة أكبر", params: ["التوجّه نحو الفريق", "التدفّق الحر للمعلومات", "التعاون", "الصداقات في العمل", "الاندماج مع الفريق"] },
    { name: "الابتكار", sum: "معتدل. يُشجَّع التجريب، لكن ضمن مخاطرة مُدارة", params: ["المرونة", "القدرة على التكيّف", "الابتكار", "اغتنام الفرص", "الاستعداد للتجريب", "تقبّل المخاطرة", "التحرّر من القيود الصارمة"] },
    { name: "التنافسية", sum: "البُعد الأضعف. البيئة الداخلية تعاونية أكثر منها تنافسية", params: ["التنافسية", "الحزم", "الحسم", "المبادرة", "المساءلة الشخصية", "الحل المباشر للنزاعات", "كثافة العمل"] },
  ],
};

type Dim = DimBase & DimText;
function buildDims(locale: Locale): Dim[] {
  return DIMS_BASE.map((b, i) => ({ ...b, ...DIMS_TEXT[locale][i] }));
}

/* ── 9 ключевых ценностей, каждая = среднее (ROUND) её OCP-параметров ── */
const nlvl = (v: number) => (v >= 75 ? GREEN : v >= 50 ? AMBER : RED);
const badgeColor = (b: string) => (b === "Systemic" ? TEAL : b === "Process" ? "#5B8BB0" : b === "Behavioral" ? GREEN : AMBER);

/* badge — ключ-инвариант (не переводится: используется в badgeColor); подпись бейджа берётся по локали */
const BADGE_LABEL: Record<Locale, Record<string, string>> = {
  en: { Systemic: "Systemic", Process: "Process", Behavioral: "Behavioral", "Value-based": "Value-based" },
  es: { Systemic: "Sistémico", Process: "Proceso", Behavioral: "Conductual", "Value-based": "Basado en valores" },
  pt: { Systemic: "Sistêmico", Process: "Processo", Behavioral: "Comportamental", "Value-based": "Baseado em valores" },
  ar: { Systemic: "نظامي", Process: "عملياتي", Behavioral: "سلوكي", "Value-based": "قائم على القيم" },
};

/* ── базовые (нетекстовые) данные 9 ценностей ── */
type OcpBase = { n: number; score: number; badge: string };
type NineBase = { key: string; score: number; params: OcpBase[] };
const BIG_NINE_BASE: NineBase[] = [
  { key: "agility", score: 49, params: [
    { n: 1, score: 45, badge: "Process" },
    { n: 2, score: 52, badge: "Behavioral" },
    { n: 4, score: 49, badge: "Behavioral" },
    { n: 5, score: 50, badge: "Process" },
  ] },
  { key: "collab", score: 73, params: [
    { n: 32, score: 76, badge: "Systemic" },
    { n: 33, score: 65, badge: "Process" },
    { n: 34, score: 74, badge: "Process" },
    { n: 35, score: 77, badge: "Behavioral" },
  ] },
  { key: "customer", score: 77, params: [
    { n: 21, score: 79, badge: "Behavioral" },
    { n: 25, score: 73, badge: "Systemic" },
    { n: 27, score: 79, badge: "Process" },
  ] },
  { key: "diversity", score: 67, params: [
    { n: 14, score: 75, badge: "Systemic" },
    { n: 15, score: 75, badge: "Systemic" },
    { n: 16, score: 51, badge: "Value-based" },
  ] },
  { key: "execution", score: 83, params: [
    { n: 22, score: 84, badge: "Systemic" },
    { n: 24, score: 85, badge: "Systemic" },
    { n: 28, score: 80, badge: "Process" },
    { n: 29, score: 82, badge: "Process" },
    { n: 31, score: 84, badge: "Systemic" },
  ] },
  { key: "innovation", score: 39, params: [
    { n: 3, score: 42, badge: "Value-based" },
    { n: 5, score: 40, badge: "Process" },
    { n: 6, score: 36, badge: "Behavioral" },
    { n: 7, score: 38, badge: "Systemic" },
  ] },
  { key: "integrity", score: 84, params: [
    { n: 14, score: 86, badge: "Systemic" },
    { n: 41, score: 88, badge: "Behavioral" },
    { n: 42, score: 80, badge: "Process" },
    { n: 54, score: 82, badge: "Value-based" },
  ] },
  { key: "performance", score: 71, params: [
    { n: 22, score: 78, badge: "Systemic" },
    { n: 23, score: 73, badge: "Behavioral" },
    { n: 24, score: 71, badge: "Systemic" },
    { n: 26, score: 62, badge: "Value-based" },
  ] },
  { key: "respect", score: 65, params: [
    { n: 14, score: 72, badge: "Systemic" },
    { n: 16, score: 58, badge: "Value-based" },
    { n: 17, score: 64, badge: "Behavioral" },
    { n: 18, score: 67, badge: "Value-based" },
    { n: 19, score: 64, badge: "Process" },
  ] },
];

/* ── текстовые поля 9 ценностей по локали (зипуются по индексу) ── */
type OcpText = { ru: string; en: string; statement: string; lower: string; higher: string; quote?: string };
type NineText = { ru: string; en: string; desc: string; gap: string; src: string; params: OcpText[] };
const BIG_NINE_TEXT: Record<Locale, NineText[]> = {
  en: [
    {
      ru: "Agility", en: "Agility",
      desc: "Structural flexibility is balanced by a high degree of process and role-boundary regulation.",
      gap: "Adaptability is constrained by heavy regulation: teams quickly change tactics within their own area, but cross-functional changes require approvals.",
      src: "Primary source: All-Hands Meetings · Secondary: Job Descriptions",
      params: [
        { ru: "Flexibility", en: "Flexibility", statement: "Changes within one's own area are possible; changes across teams go through approvals.", lower: "Within their area of responsibility, employees are free to change their approach", higher: "Cross-functional changes are formalized and not quick", quote: "[All-Hands] Decisions to change processes are made at quarterly meetings." },
        { ru: "Adaptability", en: "Adaptability", statement: "Teams adjust their tactics, but within approved guidelines.", lower: "Tactical adaptation is encouraged", higher: "Strategic pivots require approval" },
        { ru: "Seizing opportunities", en: "Being quick to take advantage of opportunities", statement: "The response to opportunities depends on the planning cycle.", lower: "Targeted initiatives are launched quickly", higher: "Major bets go through ROI assessment" },
        { ru: "Willingness to experiment", en: "A willingness to experiment", statement: "Experiments are allowed as managed pilots.", lower: "MVPs and pilots are part of the culture", higher: "Every pilot requires a hypothesis and metrics" },
      ],
    },
    {
      ru: "Collaboration", en: "Collaboration",
      desc: "The level of formalized collaboration is sustained through cross-reviews and a buddy system.",
      gap: "Collaboration is structured around processes: cross-functional reviews and the buddy system are mandatory, while informal cooperation takes a back seat.",
      src: "Primary source: Performance Review · Secondary: Employee Handbook",
      params: [
        { ru: "Team orientation", en: "Being team oriented", statement: "Collective results are anchored in team metrics.", lower: "Team goals in every cycle", higher: "Individual accountability is valued just as highly" },
        { ru: "Free flow of information", en: "Sharing information freely", statement: "Information is open via the wiki and mandatory reviews.", lower: "Documentation and process transparency", higher: "Some knowledge stays within teams" },
        { ru: "Collaboration", en: "Working in collaboration", statement: "Cross-review is required for significant changes.", lower: "Pair and cross-functional work is the norm", higher: "Coordination requires sync-ups" },
        { ru: "Friendships at work", en: "Developing friends at work", statement: "The buddy system and team-building activities build connections.", lower: "Onboarding through a buddy mentor", higher: "Friendship does not replace process discipline", quote: "[Handbook] Each new employee is assigned a buddy for 3 months." },
      ],
    },
    {
      ru: "Customer focus", en: "Customer",
      desc: "A focus on product quality and outcomes through adherence to standards.",
      gap: "The customer is at the center through quality standards and results orientation, rather than through direct contact between every employee and the user.",
      src: "Primary source: Job Descriptions · Secondary: All-Hands Meetings",
      params: [
        { ru: "Action orientation", en: "Action orientation", statement: "A \"do it and see it through\" culture.", lower: "Fast execution is the priority", higher: "Action is checked against the quality standard" },
        { ru: "Results orientation", en: "Being results oriented", statement: "Evaluation by outcome and impact on the product.", lower: "Results are measured by metrics", higher: "The process is also kept under control" },
        { ru: "Emphasis on quality", en: "An emphasis on quality", statement: "Zero-defect standards and QA are built into the pipeline.", lower: "Pride in product quality", higher: "The high bar slows down releases", quote: "[Job Desc] Meeting the Definition of Done is a mandatory condition for merging." },
      ],
    },
    {
      ru: "Diversity", en: "Diversity",
      desc: "Respect for boundaries and roles is the foundation of how people interact.",
      gap: "Respect is expressed through honoring each employee's area of responsibility and following the company's shared rules.",
      src: "Primary source: Employee Handbook · Secondary: Glassdoor/eNPS reviews",
      params: [
        { ru: "Fairness", en: "Fairness", statement: "The rules are the same for everyone and codified in internal guidelines.", lower: "Shared rules apply to all employees", higher: "The system is formalized; no exceptions are provided for", quote: "[Employee Handbook] Role allocation is reviewed through a transparent procedure accessible to every employee." },
        { ru: "Respect for individual rights", en: "Respect for the individual's rights", statement: "Respect is expressed through honoring areas of responsibility.", lower: "The right to full autonomy within one's own area is established", higher: "Rights are viewed through the lens of work tasks rather than the individual" },
        { ru: "Tolerance", en: "Tolerance", statement: "Differences are accepted within the scope of work roles.", lower: "Openness to different approaches within processes", higher: "Tolerance is not codified in a dedicated policy" },
      ],
    },
    {
      ru: "Execution", en: "Execution",
      desc: "Systematic control of execution, detailed time tracking, and quality standards.",
      gap: "Execution is the strongest dimension: strict control of deadlines, metrics, and development standards at every stage.",
      src: "Primary source: Performance Review · Secondary: Job Descriptions",
      params: [
        { ru: "Achievement orientation", en: "Achievement orientation", statement: "Ambitious OKRs and a drive to set records.", lower: "Goals are measurable and ambitious", higher: "The bar is set, but growth is limited by resources" },
        { ru: "High expectations", en: "Having high expectations for performance", statement: "Explicit KPIs and regular performance reviews.", lower: "Accountability is tied to roles", higher: "Expectations are high but realistic" },
        { ru: "Analytical thinking", en: "Being analytical", statement: "Decisions are based on data and research.", lower: "A data-driven approach is the norm", higher: "Some decisions are still made by expert judgment" },
        { ru: "Attention to detail", en: "Paying attention to detail", statement: "Thorough checking, documentation, peer review.", lower: "Peer review is mandatory", higher: "The depth of checking slows the pace" },
        { ru: "Strong organization", en: "Being highly organized", statement: "Structured processes and project management.", lower: "Clear pipelines and guidelines", higher: "Structure sometimes comes at the expense of flexibility", quote: "[Performance] Adherence to the multi-level Definition of Done is factored into evaluations." },
      ],
    },
    {
      ru: "Innovation", en: "Innovation",
      desc: "Innovation is structured through guidelines, ROI assessment, and multi-level testing.",
      gap: "Innovation is a weak dimension: novelty is allowed only within managed limits, and risk is minimized through guidelines and ROI assessment.",
      src: "Primary source: Performance Review (attitude toward risk) · Secondary: All-Hands Meetings",
      params: [
        { ru: "Innovation", en: "Being innovative", statement: "New solutions go through assessment and guidelines.", lower: "R&D is present in a targeted way", higher: "Radical ideas rarely make it to launch" },
        { ru: "Willingness to experiment", en: "A willingness to experiment", statement: "Experiments are allowed as controlled pilots.", lower: "Pilots are possible when a hypothesis exists", higher: "Every pilot is bounded by guidelines" },
        { ru: "Risk appetite", en: "Risk taking", statement: "Risk is minimized through due diligence and ROI assessment.", lower: "Decisions under uncertainty are made deliberately", higher: "Tolerance for failure is low", quote: "[Performance] Launching a new initiative requires an ROI justification and a testing plan." },
        { ru: "Freedom from rigid constraints", en: "Not being constrained by many rules", statement: "Work is governed by internal rules and areas of responsibility.", lower: "Autonomy within one's own area is preserved", higher: "Cross-functional actions are heavily regulated" },
      ],
    },
    {
      ru: "Integrity", en: "Integrity",
      desc: "Accountability for assigned areas and adherence to the company's internal rules.",
      gap: "Integrity is high: everyone owns their area, conflicts are resolved openly in work meetings, and the company's philosophy is clear.",
      src: "Primary source: Glassdoor/eNPS reviews · Secondary: Employee Handbook",
      params: [
        { ru: "Fairness", en: "Fairness", statement: "The same rules apply to all employees.", lower: "Transparent criteria without favoritism", higher: "Formalization leaves no room for individual cases" },
        { ru: "Personal accountability", en: "Taking individual responsibility", statement: "A culture of ownership: \"this is my area of responsibility.\"", lower: "Accountability is tied to the role", higher: "Accountability is limited to one's own area" },
        { ru: "Direct conflict resolution", en: "Confronting conflict", statement: "Contentious issues are brought to work meetings.", lower: "Open feedback, no politics", higher: "Conflicts are resolved through process, not immediately", quote: "[Glassdoor] \"Here it's normal to name problems openly — there's a clear process for it.\"" },
        { ru: "Clear philosophy", en: "Having a clear guiding philosophy", statement: "The mission and values genuinely influence decisions.", lower: "Values are documented", higher: "The philosophy lives through guidelines" },
      ],
    },
    {
      ru: "Performance", en: "Performance",
      desc: "Evaluation based on 360 results and adherence to development and process standards.",
      gap: "Performance is measured through 360 reviews and adherence to standards; compensation is partly tied to outcomes.",
      src: "Primary source: Performance Review · Secondary: Job Descriptions",
      params: [
        { ru: "Achievement orientation", en: "Achievement orientation", statement: "OKRs and a drive for measurable results.", lower: "Goals are ambitious and measurable", higher: "Achievements are checked against the process" },
        { ru: "Being demanding", en: "Being demanding", statement: "A high quality bar and low tolerance for mediocrity.", lower: "Quality standards are high", higher: "High standards are balanced by support" },
        { ru: "High expectations", en: "Having high expectations for performance", statement: "Regular reviews and accountability.", lower: "Explicit expectations by role", higher: "Expectations are realistic, without overwork" },
        { ru: "Pay for performance", en: "High pay for good performance", statement: "A variable component and bonuses for achievements.", lower: "Bonuses are tied to results", higher: "The share of variable pay is moderate", quote: "[Job Desc] The annual bonus depends on achieving team and individual goals." },
      ],
    },
    {
      ru: "Respect", en: "Respect",
      desc: "Respect is conveyed through honoring role boundaries and the onboarding system.",
      gap: "Respect is expressed through role autonomy, support, and development, but is viewed in a work context rather than a personal one.",
      src: "Primary source: Glassdoor/eNPS reviews · Secondary: Employee Handbook",
      params: [
        { ru: "Fairness", en: "Fairness", statement: "Shared rules and transparent criteria.", lower: "Equal opportunities for all roles", higher: "Fairness is formalized" },
        { ru: "Tolerance", en: "Tolerance", statement: "Differences are accepted in a work context.", lower: "Openness to different points of view", higher: "There is no dedicated DEI policy" },
        { ru: "Support", en: "Being supportive", statement: "Mentoring and psychological safety.", lower: "Buddy and mentoring programs are well developed", higher: "Support is tied to onboarding processes" },
        { ru: "People orientation", en: "Being people oriented", statement: "Decisions account for the impact on employees.", lower: "Impact on the team is assessed", higher: "Results still take priority" },
        { ru: "Growth opportunities", en: "Opportunities for professional growth", statement: "Training, career tracks, and internal transfers.", lower: "Career tracks are transparent", higher: "Growth is limited by the role structure", quote: "[Glassdoor] \"There are clear grades, but vertical growth runs up against the role structure.\"" },
      ],
    },
  ],
  es: [
    {
      ru: "Agilidad", en: "Agility",
      desc: "La flexibilidad estructural se equilibra con un alto grado de regulación de procesos y límites de rol.",
      gap: "La adaptabilidad está limitada por una fuerte regulación: los equipos cambian de táctica con rapidez dentro de su propia área, pero los cambios interfuncionales requieren aprobaciones.",
      src: "Fuente principal: reuniones generales · Secundaria: descripciones de puesto",
      params: [
        { ru: "Flexibilidad", en: "Flexibility", statement: "Los cambios dentro del área propia son posibles; los cambios entre equipos pasan por aprobaciones.", lower: "Dentro de su área de responsabilidad, los empleados son libres de cambiar su enfoque", higher: "Los cambios interfuncionales están formalizados y no son rápidos", quote: "[Reunión general] Las decisiones de cambiar procesos se toman en las reuniones trimestrales." },
        { ru: "Adaptabilidad", en: "Adaptability", statement: "Los equipos ajustan sus tácticas, pero dentro de las directrices aprobadas.", lower: "Se fomenta la adaptación táctica", higher: "Los giros estratégicos requieren aprobación" },
        { ru: "Aprovechar oportunidades", en: "Being quick to take advantage of opportunities", statement: "La respuesta a las oportunidades depende del ciclo de planificación.", lower: "Las iniciativas específicas se lanzan con rapidez", higher: "Las apuestas grandes pasan por una evaluación de ROI" },
        { ru: "Disposición a experimentar", en: "A willingness to experiment", statement: "Se permiten experimentos como pilotos gestionados.", lower: "Los MVP y los pilotos forman parte de la cultura", higher: "Cada piloto requiere una hipótesis y métricas" },
      ],
    },
    {
      ru: "Colaboración", en: "Collaboration",
      desc: "El nivel de colaboración formalizada se mantiene mediante revisiones cruzadas y un sistema de buddy.",
      gap: "La colaboración se estructura en torno a procesos: las revisiones interfuncionales y el sistema de buddy son obligatorios, mientras que la cooperación informal queda en segundo plano.",
      src: "Fuente principal: evaluación de desempeño · Secundaria: manual del empleado",
      params: [
        { ru: "Orientación al equipo", en: "Being team oriented", statement: "Los resultados colectivos se anclan en métricas de equipo.", lower: "Objetivos de equipo en cada ciclo", higher: "La rendición de cuentas individual se valora igual de alto" },
        { ru: "Flujo libre de información", en: "Sharing information freely", statement: "La información es abierta a través de la wiki y de revisiones obligatorias.", lower: "Documentación y transparencia de los procesos", higher: "Parte del conocimiento permanece dentro de los equipos" },
        { ru: "Colaboración", en: "Working in collaboration", statement: "La revisión cruzada es obligatoria para cambios significativos.", lower: "El trabajo en pareja e interfuncional es la norma", higher: "La coordinación requiere reuniones de sincronización" },
        { ru: "Amistades en el trabajo", en: "Developing friends at work", statement: "El sistema de buddy y las actividades de team-building crean vínculos.", lower: "Onboarding con un mentor buddy", higher: "La amistad no sustituye la disciplina de los procesos", quote: "[Manual] A cada nuevo empleado se le asigna un buddy durante 3 meses." },
      ],
    },
    {
      ru: "Enfoque en el cliente", en: "Customer",
      desc: "Un enfoque en la calidad del producto y los resultados mediante el cumplimiento de estándares.",
      gap: "El cliente está en el centro a través de los estándares de calidad y la orientación a resultados, más que mediante el contacto directo de cada empleado con el usuario.",
      src: "Fuente principal: descripciones de puesto · Secundaria: reuniones generales",
      params: [
        { ru: "Orientación a la acción", en: "Action orientation", statement: "Una cultura de \"hazlo y llévalo hasta el final\".", lower: "La ejecución rápida es la prioridad", higher: "La acción se contrasta con el estándar de calidad" },
        { ru: "Orientación a resultados", en: "Being results oriented", statement: "Evaluación por resultado e impacto en el producto.", lower: "Los resultados se miden con métricas", higher: "El proceso también se mantiene bajo control" },
        { ru: "Énfasis en la calidad", en: "An emphasis on quality", statement: "Estándares de cero defectos y QA integrados en el pipeline.", lower: "Orgullo por la calidad del producto", higher: "El listón alto ralentiza los lanzamientos", quote: "[Descripción de puesto] Cumplir la Definition of Done es condición obligatoria para hacer merge." },
      ],
    },
    {
      ru: "Diversidad", en: "Diversity",
      desc: "El respeto por los límites y los roles es la base de cómo interactúan las personas.",
      gap: "El respeto se expresa honrando el área de responsabilidad de cada empleado y siguiendo las reglas compartidas de la empresa.",
      src: "Fuente principal: manual del empleado · Secundaria: reseñas de Glassdoor/eNPS",
      params: [
        { ru: "Equidad", en: "Fairness", statement: "Las reglas son iguales para todos y están codificadas en las directrices internas.", lower: "Las reglas compartidas se aplican a todos los empleados", higher: "El sistema está formalizado; no se contemplan excepciones", quote: "[Manual del empleado] La asignación de roles se revisa mediante un procedimiento transparente accesible a cada empleado." },
        { ru: "Respeto a los derechos individuales", en: "Respect for the individual's rights", statement: "El respeto se expresa honrando las áreas de responsabilidad.", lower: "Se establece el derecho a plena autonomía dentro del área propia", higher: "Los derechos se ven a través de las tareas de trabajo más que de la persona" },
        { ru: "Tolerancia", en: "Tolerance", statement: "Las diferencias se aceptan dentro del alcance de los roles de trabajo.", lower: "Apertura a distintos enfoques dentro de los procesos", higher: "La tolerancia no está codificada en una política específica" },
      ],
    },
    {
      ru: "Ejecución", en: "Execution",
      desc: "Control sistemático de la ejecución, seguimiento detallado del tiempo y estándares de calidad.",
      gap: "La ejecución es la dimensión más fuerte: control estricto de plazos, métricas y estándares de desarrollo en cada etapa.",
      src: "Fuente principal: evaluación de desempeño · Secundaria: descripciones de puesto",
      params: [
        { ru: "Orientación al logro", en: "Achievement orientation", statement: "OKR ambiciosos y un afán por batir récords.", lower: "Los objetivos son medibles y ambiciosos", higher: "El listón está alto, pero el crecimiento está limitado por los recursos" },
        { ru: "Altas expectativas", en: "Having high expectations for performance", statement: "KPI explícitos y evaluaciones de desempeño periódicas.", lower: "La rendición de cuentas está ligada a los roles", higher: "Las expectativas son altas pero realistas" },
        { ru: "Pensamiento analítico", en: "Being analytical", statement: "Las decisiones se basan en datos e investigación.", lower: "El enfoque basado en datos es la norma", higher: "Algunas decisiones aún se toman por criterio experto" },
        { ru: "Atención al detalle", en: "Paying attention to detail", statement: "Comprobación minuciosa, documentación, revisión por pares.", lower: "La revisión por pares es obligatoria", higher: "La profundidad de la comprobación ralentiza el ritmo" },
        { ru: "Organización sólida", en: "Being highly organized", statement: "Procesos estructurados y gestión de proyectos.", lower: "Pipelines y directrices claros", higher: "A veces la estructura va en detrimento de la flexibilidad", quote: "[Desempeño] El cumplimiento de la Definition of Done de varios niveles se tiene en cuenta en las evaluaciones." },
      ],
    },
    {
      ru: "Innovación", en: "Innovation",
      desc: "La innovación está estructurada mediante directrices, evaluación de ROI y pruebas de varios niveles.",
      gap: "La innovación es una dimensión débil: la novedad solo se permite dentro de límites gestionados, y el riesgo se minimiza mediante directrices y evaluación de ROI.",
      src: "Fuente principal: evaluación de desempeño (actitud ante el riesgo) · Secundaria: reuniones generales",
      params: [
        { ru: "Innovación", en: "Being innovative", statement: "Las nuevas soluciones pasan por evaluación y directrices.", lower: "El I+D está presente de forma específica", higher: "Las ideas radicales rara vez llegan al lanzamiento" },
        { ru: "Disposición a experimentar", en: "A willingness to experiment", statement: "Se permiten experimentos como pilotos controlados.", lower: "Los pilotos son posibles cuando existe una hipótesis", higher: "Cada piloto está acotado por directrices" },
        { ru: "Apetito de riesgo", en: "Risk taking", statement: "El riesgo se minimiza mediante due diligence y evaluación de ROI.", lower: "Las decisiones bajo incertidumbre se toman con deliberación", higher: "La tolerancia al fracaso es baja", quote: "[Desempeño] Lanzar una nueva iniciativa requiere una justificación de ROI y un plan de pruebas." },
        { ru: "Libertad frente a restricciones rígidas", en: "Not being constrained by many rules", statement: "El trabajo se rige por reglas internas y áreas de responsabilidad.", lower: "Se preserva la autonomía dentro del área propia", higher: "Las acciones interfuncionales están muy reguladas" },
      ],
    },
    {
      ru: "Integridad", en: "Integrity",
      desc: "Responsabilidad por las áreas asignadas y cumplimiento de las reglas internas de la empresa.",
      gap: "La integridad es alta: cada uno es dueño de su área, los conflictos se resuelven abiertamente en las reuniones de trabajo y la filosofía de la empresa es clara.",
      src: "Fuente principal: reseñas de Glassdoor/eNPS · Secundaria: manual del empleado",
      params: [
        { ru: "Equidad", en: "Fairness", statement: "Las mismas reglas se aplican a todos los empleados.", lower: "Criterios transparentes sin favoritismos", higher: "La formalización no deja margen para casos individuales" },
        { ru: "Responsabilidad personal", en: "Taking individual responsibility", statement: "Una cultura de ownership: \"esta es mi área de responsabilidad\".", lower: "La rendición de cuentas está ligada al rol", higher: "La rendición de cuentas se limita al área propia" },
        { ru: "Resolución directa de conflictos", en: "Confronting conflict", statement: "Los temas controvertidos se llevan a las reuniones de trabajo.", lower: "Feedback abierto, sin política interna", higher: "Los conflictos se resuelven por proceso, no de inmediato", quote: "[Glassdoor] \"Aquí es normal nombrar los problemas abiertamente: hay un proceso claro para ello\"." },
        { ru: "Filosofía clara", en: "Having a clear guiding philosophy", statement: "La misión y los valores influyen genuinamente en las decisiones.", lower: "Los valores están documentados", higher: "La filosofía vive a través de las directrices" },
      ],
    },
    {
      ru: "Desempeño", en: "Performance",
      desc: "Evaluación basada en resultados 360 y cumplimiento de estándares de desarrollo y de procesos.",
      gap: "El desempeño se mide mediante evaluaciones 360 y el cumplimiento de estándares; la compensación está en parte ligada a los resultados.",
      src: "Fuente principal: evaluación de desempeño · Secundaria: descripciones de puesto",
      params: [
        { ru: "Orientación al logro", en: "Achievement orientation", statement: "OKR y un afán por resultados medibles.", lower: "Los objetivos son ambiciosos y medibles", higher: "Los logros se contrastan con el proceso" },
        { ru: "Exigencia", en: "Being demanding", statement: "Un listón de calidad alto y poca tolerancia a la mediocridad.", lower: "Los estándares de calidad son altos", higher: "Los altos estándares se equilibran con apoyo" },
        { ru: "Altas expectativas", en: "Having high expectations for performance", statement: "Evaluaciones periódicas y rendición de cuentas.", lower: "Expectativas explícitas por rol", higher: "Las expectativas son realistas, sin sobrecarga" },
        { ru: "Pago por desempeño", en: "High pay for good performance", statement: "Un componente variable y bonos por logros.", lower: "Los bonos están ligados a los resultados", higher: "La proporción de pago variable es moderada", quote: "[Descripción de puesto] El bono anual depende del logro de objetivos de equipo e individuales." },
      ],
    },
    {
      ru: "Respeto", en: "Respect",
      desc: "El respeto se transmite honrando los límites de rol y el sistema de onboarding.",
      gap: "El respeto se expresa mediante la autonomía de rol, el apoyo y el desarrollo, pero se ve en un contexto de trabajo más que personal.",
      src: "Fuente principal: reseñas de Glassdoor/eNPS · Secundaria: manual del empleado",
      params: [
        { ru: "Equidad", en: "Fairness", statement: "Reglas compartidas y criterios transparentes.", lower: "Igualdad de oportunidades para todos los roles", higher: "La equidad está formalizada" },
        { ru: "Tolerancia", en: "Tolerance", statement: "Las diferencias se aceptan en un contexto de trabajo.", lower: "Apertura a distintos puntos de vista", higher: "No hay una política DEI específica" },
        { ru: "Apoyo", en: "Being supportive", statement: "Mentoría y seguridad psicológica.", lower: "Los programas de buddy y mentoría están bien desarrollados", higher: "El apoyo está ligado a los procesos de onboarding" },
        { ru: "Orientación a las personas", en: "Being people oriented", statement: "Las decisiones tienen en cuenta el impacto en los empleados.", lower: "Se evalúa el impacto en el equipo", higher: "Los resultados siguen teniendo prioridad" },
        { ru: "Oportunidades de crecimiento", en: "Opportunities for professional growth", statement: "Formación, planes de carrera y transferencias internas.", lower: "Los planes de carrera son transparentes", higher: "El crecimiento está limitado por la estructura de roles", quote: "[Glassdoor] \"Hay grados claros, pero el crecimiento vertical choca con la estructura de roles\"." },
      ],
    },
  ],
  pt: [
    {
      ru: "Agilidade", en: "Agility",
      desc: "A flexibilidade estrutural é equilibrada por um alto grau de regulação de processos e limites de função.",
      gap: "A adaptabilidade é limitada por uma forte regulação: as equipes mudam de tática rapidamente dentro de sua própria área, mas mudanças interfuncionais exigem aprovações.",
      src: "Fonte principal: reuniões gerais · Secundária: descrições de cargo",
      params: [
        { ru: "Flexibilidade", en: "Flexibility", statement: "Mudanças dentro da própria área são possíveis; mudanças entre equipes passam por aprovações.", lower: "Dentro de sua área de responsabilidade, os colaboradores são livres para mudar sua abordagem", higher: "Mudanças interfuncionais são formalizadas e não rápidas", quote: "[Reunião geral] As decisões de mudar processos são tomadas nas reuniões trimestrais." },
        { ru: "Adaptabilidade", en: "Adaptability", statement: "As equipes ajustam suas táticas, mas dentro das diretrizes aprovadas.", lower: "A adaptação tática é incentivada", higher: "Mudanças estratégicas exigem aprovação" },
        { ru: "Aproveitar oportunidades", en: "Being quick to take advantage of opportunities", statement: "A resposta às oportunidades depende do ciclo de planejamento.", lower: "Iniciativas específicas são lançadas rapidamente", higher: "Apostas grandes passam por avaliação de ROI" },
        { ru: "Disposição para experimentar", en: "A willingness to experiment", statement: "Experimentos são permitidos como pilotos gerenciados.", lower: "MVPs e pilotos fazem parte da cultura", higher: "Cada piloto requer uma hipótese e métricas" },
      ],
    },
    {
      ru: "Colaboração", en: "Collaboration",
      desc: "O nível de colaboração formalizada é mantido por revisões cruzadas e um sistema de buddy.",
      gap: "A colaboração é estruturada em torno de processos: as revisões interfuncionais e o sistema de buddy são obrigatórios, enquanto a cooperação informal fica em segundo plano.",
      src: "Fonte principal: avaliação de desempenho · Secundária: manual do colaborador",
      params: [
        { ru: "Orientação à equipe", en: "Being team oriented", statement: "Os resultados coletivos estão ancorados em métricas de equipe.", lower: "Metas de equipe em cada ciclo", higher: "A responsabilização individual é valorizada na mesma medida" },
        { ru: "Livre fluxo de informação", en: "Sharing information freely", statement: "A informação é aberta pela wiki e por revisões obrigatórias.", lower: "Documentação e transparência dos processos", higher: "Parte do conhecimento permanece dentro das equipes" },
        { ru: "Colaboração", en: "Working in collaboration", statement: "A revisão cruzada é obrigatória para mudanças significativas.", lower: "O trabalho em par e interfuncional é a norma", higher: "A coordenação exige reuniões de sincronização" },
        { ru: "Amizades no trabalho", en: "Developing friends at work", statement: "O sistema de buddy e as atividades de team-building criam vínculos.", lower: "Onboarding com um mentor buddy", higher: "A amizade não substitui a disciplina dos processos", quote: "[Manual] A cada novo colaborador é atribuído um buddy por 3 meses." },
      ],
    },
    {
      ru: "Foco no cliente", en: "Customer",
      desc: "Um foco na qualidade do produto e nos resultados por meio do cumprimento de padrões.",
      gap: "O cliente está no centro por meio dos padrões de qualidade e da orientação a resultados, em vez do contato direto de cada colaborador com o usuário.",
      src: "Fonte principal: descrições de cargo · Secundária: reuniões gerais",
      params: [
        { ru: "Orientação à ação", en: "Action orientation", statement: "Uma cultura de \"faça e leve até o fim\".", lower: "A execução rápida é a prioridade", higher: "A ação é verificada contra o padrão de qualidade" },
        { ru: "Orientação a resultados", en: "Being results oriented", statement: "Avaliação por resultado e impacto no produto.", lower: "Os resultados são medidos por métricas", higher: "O processo também é mantido sob controle" },
        { ru: "Ênfase na qualidade", en: "An emphasis on quality", statement: "Padrões de zero defeitos e QA integrados ao pipeline.", lower: "Orgulho pela qualidade do produto", higher: "O alto patamar desacelera os lançamentos", quote: "[Descrição de cargo] Cumprir a Definition of Done é condição obrigatória para o merge." },
      ],
    },
    {
      ru: "Diversidade", en: "Diversity",
      desc: "O respeito por limites e funções é a base de como as pessoas interagem.",
      gap: "O respeito é expresso ao honrar a área de responsabilidade de cada colaborador e seguir as regras compartilhadas da empresa.",
      src: "Fonte principal: manual do colaborador · Secundária: avaliações do Glassdoor/eNPS",
      params: [
        { ru: "Justiça", en: "Fairness", statement: "As regras são iguais para todos e codificadas nas diretrizes internas.", lower: "As regras compartilhadas se aplicam a todos os colaboradores", higher: "O sistema é formalizado; não há exceções previstas", quote: "[Manual do colaborador] A alocação de funções é revisada por um procedimento transparente acessível a cada colaborador." },
        { ru: "Respeito aos direitos individuais", en: "Respect for the individual's rights", statement: "O respeito é expresso ao honrar as áreas de responsabilidade.", lower: "O direito à plena autonomia dentro da própria área está estabelecido", higher: "Os direitos são vistos pela ótica das tarefas de trabalho, não da pessoa" },
        { ru: "Tolerância", en: "Tolerance", statement: "As diferenças são aceitas dentro do escopo das funções de trabalho.", lower: "Abertura a diferentes abordagens dentro dos processos", higher: "A tolerância não está codificada em uma política específica" },
      ],
    },
    {
      ru: "Execução", en: "Execution",
      desc: "Controle sistemático da execução, acompanhamento detalhado do tempo e padrões de qualidade.",
      gap: "A execução é a dimensão mais forte: controle rígido de prazos, métricas e padrões de desenvolvimento em cada etapa.",
      src: "Fonte principal: avaliação de desempenho · Secundária: descrições de cargo",
      params: [
        { ru: "Orientação à conquista", en: "Achievement orientation", statement: "OKRs ambiciosos e uma busca por bater recordes.", lower: "As metas são mensuráveis e ambiciosas", higher: "O patamar está alto, mas o crescimento é limitado pelos recursos" },
        { ru: "Altas expectativas", en: "Having high expectations for performance", statement: "KPIs explícitos e avaliações de desempenho regulares.", lower: "A responsabilização está ligada às funções", higher: "As expectativas são altas, mas realistas" },
        { ru: "Pensamento analítico", en: "Being analytical", statement: "As decisões são baseadas em dados e pesquisa.", lower: "A abordagem orientada por dados é a norma", higher: "Algumas decisões ainda são tomadas por julgamento especializado" },
        { ru: "Atenção aos detalhes", en: "Paying attention to detail", statement: "Verificação minuciosa, documentação, revisão por pares.", lower: "A revisão por pares é obrigatória", higher: "A profundidade da verificação desacelera o ritmo" },
        { ru: "Organização sólida", en: "Being highly organized", statement: "Processos estruturados e gestão de projetos.", lower: "Pipelines e diretrizes claros", higher: "Às vezes a estrutura vem à custa da flexibilidade", quote: "[Desempenho] O cumprimento da Definition of Done de vários níveis é considerado nas avaliações." },
      ],
    },
    {
      ru: "Inovação", en: "Innovation",
      desc: "A inovação é estruturada por diretrizes, avaliação de ROI e testes de vários níveis.",
      gap: "A inovação é uma dimensão fraca: a novidade só é permitida dentro de limites gerenciados, e o risco é minimizado por diretrizes e avaliação de ROI.",
      src: "Fonte principal: avaliação de desempenho (atitude perante o risco) · Secundária: reuniões gerais",
      params: [
        { ru: "Inovação", en: "Being innovative", statement: "As novas soluções passam por avaliação e diretrizes.", lower: "O P&D está presente de forma específica", higher: "Ideias radicais raramente chegam ao lançamento" },
        { ru: "Disposição para experimentar", en: "A willingness to experiment", statement: "Experimentos são permitidos como pilotos controlados.", lower: "Pilotos são possíveis quando existe uma hipótese", higher: "Cada piloto é delimitado por diretrizes" },
        { ru: "Apetite por risco", en: "Risk taking", statement: "O risco é minimizado por due diligence e avaliação de ROI.", lower: "As decisões sob incerteza são tomadas com deliberação", higher: "A tolerância ao fracasso é baixa", quote: "[Desempenho] Lançar uma nova iniciativa exige uma justificativa de ROI e um plano de testes." },
        { ru: "Liberdade frente a restrições rígidas", en: "Not being constrained by many rules", statement: "O trabalho é regido por regras internas e áreas de responsabilidade.", lower: "A autonomia dentro da própria área é preservada", higher: "As ações interfuncionais são fortemente reguladas" },
      ],
    },
    {
      ru: "Integridade", en: "Integrity",
      desc: "Responsabilidade pelas áreas atribuídas e cumprimento das regras internas da empresa.",
      gap: "A integridade é alta: cada um é dono de sua área, os conflitos são resolvidos abertamente nas reuniões de trabalho e a filosofia da empresa é clara.",
      src: "Fonte principal: avaliações do Glassdoor/eNPS · Secundária: manual do colaborador",
      params: [
        { ru: "Justiça", en: "Fairness", statement: "As mesmas regras se aplicam a todos os colaboradores.", lower: "Critérios transparentes sem favoritismo", higher: "A formalização não deixa espaço para casos individuais" },
        { ru: "Responsabilidade pessoal", en: "Taking individual responsibility", statement: "Uma cultura de ownership: \"esta é a minha área de responsabilidade\".", lower: "A responsabilização está ligada à função", higher: "A responsabilização se limita à própria área" },
        { ru: "Resolução direta de conflitos", en: "Confronting conflict", statement: "Os assuntos controversos são levados às reuniões de trabalho.", lower: "Feedback aberto, sem política interna", higher: "Os conflitos são resolvidos por processo, não de imediato", quote: "[Glassdoor] \"Aqui é normal nomear os problemas abertamente — há um processo claro para isso\"." },
        { ru: "Filosofia clara", en: "Having a clear guiding philosophy", statement: "A missão e os valores influenciam genuinamente as decisões.", lower: "Os valores estão documentados", higher: "A filosofia vive por meio das diretrizes" },
      ],
    },
    {
      ru: "Desempenho", en: "Performance",
      desc: "Avaliação baseada em resultados 360 e cumprimento de padrões de desenvolvimento e de processos.",
      gap: "O desempenho é medido por avaliações 360 e pelo cumprimento de padrões; a remuneração está em parte ligada aos resultados.",
      src: "Fonte principal: avaliação de desempenho · Secundária: descrições de cargo",
      params: [
        { ru: "Orientação à conquista", en: "Achievement orientation", statement: "OKRs e uma busca por resultados mensuráveis.", lower: "As metas são ambiciosas e mensuráveis", higher: "As conquistas são verificadas contra o processo" },
        { ru: "Exigência", en: "Being demanding", statement: "Um alto patamar de qualidade e baixa tolerância à mediocridade.", lower: "Os padrões de qualidade são altos", higher: "Os altos padrões são equilibrados por apoio" },
        { ru: "Altas expectativas", en: "Having high expectations for performance", statement: "Avaliações regulares e responsabilização.", lower: "Expectativas explícitas por função", higher: "As expectativas são realistas, sem sobrecarga" },
        { ru: "Remuneração por desempenho", en: "High pay for good performance", statement: "Um componente variável e bônus por conquistas.", lower: "Os bônus estão ligados aos resultados", higher: "A parcela de remuneração variável é moderada", quote: "[Descrição de cargo] O bônus anual depende do alcance de metas de equipe e individuais." },
      ],
    },
    {
      ru: "Respeito", en: "Respect",
      desc: "O respeito é transmitido ao honrar os limites de função e o sistema de onboarding.",
      gap: "O respeito é expresso por meio da autonomia de função, do apoio e do desenvolvimento, mas é visto em um contexto de trabalho em vez de pessoal.",
      src: "Fonte principal: avaliações do Glassdoor/eNPS · Secundária: manual do colaborador",
      params: [
        { ru: "Justiça", en: "Fairness", statement: "Regras compartilhadas e critérios transparentes.", lower: "Igualdade de oportunidades para todas as funções", higher: "A justiça é formalizada" },
        { ru: "Tolerância", en: "Tolerance", statement: "As diferenças são aceitas em um contexto de trabalho.", lower: "Abertura a diferentes pontos de vista", higher: "Não há uma política de DEI específica" },
        { ru: "Apoio", en: "Being supportive", statement: "Mentoria e segurança psicológica.", lower: "Os programas de buddy e mentoria são bem desenvolvidos", higher: "O apoio está ligado aos processos de onboarding" },
        { ru: "Orientação às pessoas", en: "Being people oriented", statement: "As decisões levam em conta o impacto nos colaboradores.", lower: "O impacto na equipe é avaliado", higher: "Os resultados ainda têm prioridade" },
        { ru: "Oportunidades de crescimento", en: "Opportunities for professional growth", statement: "Treinamento, trilhas de carreira e transferências internas.", lower: "As trilhas de carreira são transparentes", higher: "O crescimento é limitado pela estrutura de funções", quote: "[Glassdoor] \"Há níveis claros, mas o crescimento vertical esbarra na estrutura de funções\"." },
      ],
    },
  ],
  ar: [
    {
      ru: "القدرة على الحركة", en: "Agility",
      desc: "تتوازن المرونة الهيكلية مع درجة عالية من تنظيم العمليات وحدود الأدوار.",
      gap: "القدرة على التكيّف مقيّدة بتنظيم مكثّف: تغيّر الفرق تكتيكاتها بسرعة ضمن نطاقها الخاص، لكن التغييرات متعددة الوظائف تتطلّب موافقات.",
      src: "المصدر الأساسي: اجتماعات الفريق الكامل · الثانوي: الأوصاف الوظيفية",
      params: [
        { ru: "المرونة", en: "Flexibility", statement: "التغييرات ضمن النطاق الخاص ممكنة؛ والتغييرات بين الفرق تمرّ عبر موافقات.", lower: "ضمن نطاق مسؤوليتهم، يتمتّع الموظفون بحرية تغيير نهجهم", higher: "التغييرات متعددة الوظائف مُمأسسة وغير سريعة", quote: "[اجتماع الفريق الكامل] تُتّخذ قرارات تغيير العمليات في الاجتماعات الفصلية." },
        { ru: "القدرة على التكيّف", en: "Adaptability", statement: "تعدّل الفرق تكتيكاتها، لكن ضمن إرشادات معتمدة.", lower: "يُشجَّع التكيّف التكتيكي", higher: "التحوّلات الاستراتيجية تتطلّب موافقة" },
        { ru: "اغتنام الفرص", en: "Being quick to take advantage of opportunities", statement: "تعتمد الاستجابة للفرص على دورة التخطيط.", lower: "تُطلَق المبادرات المحدّدة بسرعة", higher: "الرهانات الكبرى تمرّ بتقييم العائد على الاستثمار" },
        { ru: "الاستعداد للتجريب", en: "A willingness to experiment", statement: "تُسمح التجارب كتجارب رائدة مُدارة.", lower: "المنتجات الأولية والتجارب الرائدة جزء من الثقافة", higher: "كل تجربة رائدة تتطلّب فرضية ومقاييس" },
      ],
    },
    {
      ru: "التعاون", en: "Collaboration",
      desc: "يُحافَظ على مستوى التعاون المُمأسس عبر المراجعات المتقاطعة ونظام الزميل المرافق.",
      gap: "يُبنى التعاون حول العمليات: المراجعات متعددة الوظائف ونظام الزميل المرافق إلزامية، بينما يتراجع التعاون غير الرسمي إلى الخلف.",
      src: "المصدر الأساسي: مراجعة الأداء · الثانوي: دليل الموظف",
      params: [
        { ru: "التوجّه نحو الفريق", en: "Being team oriented", statement: "تُرسَّخ النتائج الجماعية في مقاييس الفريق.", lower: "أهداف للفريق في كل دورة", higher: "المساءلة الفردية تُقدَّر بالقدر نفسه" },
        { ru: "التدفّق الحر للمعلومات", en: "Sharing information freely", statement: "المعلومات مفتوحة عبر الويكي والمراجعات الإلزامية.", lower: "التوثيق وشفافية العمليات", higher: "تبقى بعض المعارف داخل الفرق" },
        { ru: "التعاون", en: "Working in collaboration", statement: "المراجعة المتقاطعة مطلوبة للتغييرات الجوهرية.", lower: "العمل الثنائي ومتعدد الوظائف هو القاعدة", higher: "التنسيق يتطلّب اجتماعات تزامن" },
        { ru: "الصداقات في العمل", en: "Developing friends at work", statement: "يبني نظام الزميل المرافق وأنشطة بناء الفريق الروابط.", lower: "التأهيل عبر زميل مرافق مرشد", higher: "الصداقة لا تحلّ محل انضباط العمليات", quote: "[الدليل] يُخصَّص لكل موظف جديد زميل مرافق لمدة 3 أشهر." },
      ],
    },
    {
      ru: "التركيز على العميل", en: "Customer",
      desc: "تركيز على جودة المنتج والنتائج عبر الالتزام بالمعايير.",
      gap: "العميل في المركز عبر معايير الجودة والتوجّه نحو النتائج، بدلًا من التواصل المباشر بين كل موظف والمستخدم.",
      src: "المصدر الأساسي: الأوصاف الوظيفية · الثانوي: اجتماعات الفريق الكامل",
      params: [
        { ru: "التوجّه نحو الفعل", en: "Action orientation", statement: "ثقافة «نفّذه وأنجزه حتى النهاية».", lower: "التنفيذ السريع هو الأولوية", higher: "يُقاس الفعل وفق معيار الجودة" },
        { ru: "التوجّه نحو النتائج", en: "Being results oriented", statement: "التقييم بالنتيجة والأثر على المنتج.", lower: "تُقاس النتائج بالمقاييس", higher: "تبقى العملية أيضًا تحت السيطرة" },
        { ru: "التركيز على الجودة", en: "An emphasis on quality", statement: "معايير انعدام العيوب وضمان الجودة مدمجة في خط الإنتاج.", lower: "الاعتزاز بجودة المنتج", higher: "السقف العالي يُبطئ الإصدارات", quote: "[الوصف الوظيفي] استيفاء «تعريف الإنجاز» شرط إلزامي للدمج." },
      ],
    },
    {
      ru: "التنوّع", en: "Diversity",
      desc: "احترام الحدود والأدوار هو أساس كيفية تفاعل الأفراد.",
      gap: "يُعبَّر عن الاحترام عبر تكريم نطاق مسؤولية كل موظف واتباع القواعد المشتركة للشركة.",
      src: "المصدر الأساسي: دليل الموظف · الثانوي: مراجعات Glassdoor/eNPS",
      params: [
        { ru: "الإنصاف", en: "Fairness", statement: "القواعد متساوية للجميع ومدوّنة في الإرشادات الداخلية.", lower: "تنطبق القواعد المشتركة على جميع الموظفين", higher: "النظام مُمأسس؛ ولا تُتاح استثناءات", quote: "[دليل الموظف] تُراجَع توزيعة الأدوار عبر إجراء شفّاف متاح لكل موظف." },
        { ru: "احترام الحقوق الفردية", en: "Respect for the individual's rights", statement: "يُعبَّر عن الاحترام عبر تكريم نطاقات المسؤولية.", lower: "حق الاستقلالية الكاملة ضمن النطاق الخاص مُقرّر", higher: "يُنظَر إلى الحقوق من منظور مهام العمل لا الفرد" },
        { ru: "التسامح", en: "Tolerance", statement: "تُقبَل الاختلافات ضمن نطاق أدوار العمل.", lower: "الانفتاح على نُهُج مختلفة ضمن العمليات", higher: "التسامح غير مدوّن في سياسة مخصّصة" },
      ],
    },
    {
      ru: "التنفيذ", en: "Execution",
      desc: "تحكّم منهجي في التنفيذ وتتبّع مفصّل للوقت ومعايير للجودة.",
      gap: "التنفيذ هو البُعد الأقوى: تحكّم صارم في المواعيد والمقاييس ومعايير التطوير في كل مرحلة.",
      src: "المصدر الأساسي: مراجعة الأداء · الثانوي: الأوصاف الوظيفية",
      params: [
        { ru: "التوجّه نحو الإنجاز", en: "Achievement orientation", statement: "أهداف ونتائج رئيسية طموحة ودافع لتحطيم الأرقام القياسية.", lower: "الأهداف قابلة للقياس وطموحة", higher: "السقف مرتفع، لكن النمو محدود بالموارد" },
        { ru: "توقّعات عالية", en: "Having high expectations for performance", statement: "مؤشرات أداء صريحة ومراجعات أداء منتظمة.", lower: "المساءلة مرتبطة بالأدوار", higher: "التوقّعات عالية لكنها واقعية" },
        { ru: "التفكير التحليلي", en: "Being analytical", statement: "تُبنى القرارات على البيانات والبحث.", lower: "النهج القائم على البيانات هو القاعدة", higher: "بعض القرارات لا تزال تُتّخذ بالحكم الخبير" },
        { ru: "الاهتمام بالتفاصيل", en: "Paying attention to detail", statement: "تدقيق دقيق وتوثيق ومراجعة الأقران.", lower: "مراجعة الأقران إلزامية", higher: "عمق التدقيق يُبطئ الوتيرة" },
        { ru: "تنظيم قوي", en: "Being highly organized", statement: "عمليات منظّمة وإدارة للمشاريع.", lower: "خطوط إنتاج وإرشادات واضحة", higher: "أحيانًا يأتي التنظيم على حساب المرونة", quote: "[الأداء] يُؤخَذ الالتزام بـ«تعريف الإنجاز» متعدد المستويات في الحسبان عند التقييم." },
      ],
    },
    {
      ru: "الابتكار", en: "Innovation",
      desc: "يُهيكَل الابتكار عبر الإرشادات وتقييم العائد على الاستثمار والاختبار متعدد المستويات.",
      gap: "الابتكار بُعد ضعيف: لا يُسمح بالجِدّة إلا ضمن حدود مُدارة، ويُقلّل الخطر عبر الإرشادات وتقييم العائد على الاستثمار.",
      src: "المصدر الأساسي: مراجعة الأداء (الموقف من المخاطرة) · الثانوي: اجتماعات الفريق الكامل",
      params: [
        { ru: "الابتكار", en: "Being innovative", statement: "تمرّ الحلول الجديدة بالتقييم والإرشادات.", lower: "البحث والتطوير حاضر بشكل محدّد", higher: "نادرًا ما تصل الأفكار الجذرية إلى الإطلاق" },
        { ru: "الاستعداد للتجريب", en: "A willingness to experiment", statement: "تُسمح التجارب كتجارب رائدة مُتحكَّم بها.", lower: "التجارب الرائدة ممكنة عند وجود فرضية", higher: "كل تجربة رائدة محدودة بالإرشادات" },
        { ru: "تقبّل المخاطرة", en: "Risk taking", statement: "يُقلّل الخطر عبر العناية الواجبة وتقييم العائد على الاستثمار.", lower: "تُتّخذ القرارات في ظل عدم اليقين بتروٍّ", higher: "تحمّل الإخفاق منخفض", quote: "[الأداء] يتطلّب إطلاق مبادرة جديدة تبريرًا للعائد على الاستثمار وخطة اختبار." },
        { ru: "التحرّر من القيود الصارمة", en: "Not being constrained by many rules", statement: "يُنظَّم العمل عبر القواعد الداخلية ونطاقات المسؤولية.", lower: "تُصان الاستقلالية ضمن النطاق الخاص", higher: "الإجراءات متعددة الوظائف مُنظَّمة بشدّة" },
      ],
    },
    {
      ru: "النزاهة", en: "Integrity",
      desc: "المساءلة عن النطاقات المُسنَدة والالتزام بالقواعد الداخلية للشركة.",
      gap: "النزاهة عالية: كل فرد يملك نطاقه، وتُحلّ النزاعات علنًا في اجتماعات العمل، وفلسفة الشركة واضحة.",
      src: "المصدر الأساسي: مراجعات Glassdoor/eNPS · الثانوي: دليل الموظف",
      params: [
        { ru: "الإنصاف", en: "Fairness", statement: "تنطبق القواعد نفسها على جميع الموظفين.", lower: "معايير شفّافة دون محاباة", higher: "المأسسة لا تترك مجالًا للحالات الفردية" },
        { ru: "المساءلة الشخصية", en: "Taking individual responsibility", statement: "ثقافة الملكية: «هذا نطاق مسؤوليتي».", lower: "المساءلة مرتبطة بالدور", higher: "تقتصر المساءلة على النطاق الخاص" },
        { ru: "الحل المباشر للنزاعات", en: "Confronting conflict", statement: "تُطرَح المسائل الخلافية في اجتماعات العمل.", lower: "تغذية راجعة مفتوحة دون مناورات سياسية", higher: "تُحلّ النزاعات عبر العملية لا فورًا", quote: "[Glassdoor] «هنا من الطبيعي تسمية المشكلات صراحةً — وهناك عملية واضحة لذلك.»" },
        { ru: "فلسفة واضحة", en: "Having a clear guiding philosophy", statement: "تؤثّر الرسالة والقيم فعليًا في القرارات.", lower: "القيم موثّقة", higher: "تعيش الفلسفة عبر الإرشادات" },
      ],
    },
    {
      ru: "الأداء", en: "Performance",
      desc: "تقييم قائم على نتائج التقييم الشامل (360) والالتزام بمعايير التطوير والعمليات.",
      gap: "يُقاس الأداء عبر تقييمات 360 والالتزام بالمعايير؛ والتعويض مرتبط جزئيًا بالنتائج.",
      src: "المصدر الأساسي: مراجعة الأداء · الثانوي: الأوصاف الوظيفية",
      params: [
        { ru: "التوجّه نحو الإنجاز", en: "Achievement orientation", statement: "أهداف ونتائج رئيسية ودافع نحو نتائج قابلة للقياس.", lower: "الأهداف طموحة وقابلة للقياس", higher: "تُقاس الإنجازات وفق العملية" },
        { ru: "التطلّب", en: "Being demanding", statement: "سقف جودة عالٍ وتسامح منخفض مع الرداءة.", lower: "معايير الجودة عالية", higher: "تُوازَن المعايير العالية بالدعم" },
        { ru: "توقّعات عالية", en: "Having high expectations for performance", statement: "مراجعات منتظمة ومساءلة.", lower: "توقّعات صريحة حسب الدور", higher: "التوقّعات واقعية دون إفراط في العمل" },
        { ru: "الأجر مقابل الأداء", en: "High pay for good performance", statement: "مكوّن متغيّر ومكافآت على الإنجازات.", lower: "المكافآت مرتبطة بالنتائج", higher: "حصّة الأجر المتغيّر معتدلة", quote: "[الوصف الوظيفي] تعتمد المكافأة السنوية على تحقيق أهداف الفريق والأهداف الفردية." },
      ],
    },
    {
      ru: "الاحترام", en: "Respect",
      desc: "يُنقَل الاحترام عبر تكريم حدود الأدوار ونظام التأهيل.",
      gap: "يُعبَّر عن الاحترام عبر استقلالية الدور والدعم والتطوير، لكنه يُنظَر إليه في سياق العمل لا الشخصي.",
      src: "المصدر الأساسي: مراجعات Glassdoor/eNPS · الثانوي: دليل الموظف",
      params: [
        { ru: "الإنصاف", en: "Fairness", statement: "قواعد مشتركة ومعايير شفّافة.", lower: "تكافؤ الفرص لجميع الأدوار", higher: "الإنصاف مُمأسس" },
        { ru: "التسامح", en: "Tolerance", statement: "تُقبَل الاختلافات في سياق العمل.", lower: "الانفتاح على وجهات نظر مختلفة", higher: "لا توجد سياسة تنوّع وإدماج مخصّصة" },
        { ru: "الدعم", en: "Being supportive", statement: "إرشاد وأمان نفسي.", lower: "برامج الزميل المرافق والإرشاد متطوّرة", higher: "الدعم مرتبط بعمليات التأهيل" },
        { ru: "التوجّه نحو الأفراد", en: "Being people oriented", statement: "تراعي القرارات الأثر على الموظفين.", lower: "يُقيَّم الأثر على الفريق", higher: "تبقى النتائج ذات أولوية" },
        { ru: "فرص النمو", en: "Opportunities for professional growth", statement: "تدريب ومسارات مهنية وانتقالات داخلية.", lower: "المسارات المهنية شفّافة", higher: "النمو محدود بهيكل الأدوار", quote: "[Glassdoor] «هناك درجات واضحة، لكن النمو العمودي يصطدم بهيكل الأدوار.»" },
      ],
    },
  ],
};

type Ocp = OcpBase & OcpText;
type Nine = Omit<NineBase, "params"> & Omit<NineText, "params"> & { params: Ocp[] };
function buildNine(locale: Locale): Nine[] {
  return BIG_NINE_BASE.map((b, i) => {
    const t = BIG_NINE_TEXT[locale][i];
    return {
      ...b,
      ru: t.ru, en: t.en, desc: t.desc, gap: t.gap, src: t.src,
      params: b.params.map((pb, j) => ({ ...pb, ...t.params[j] })),
    };
  });
}

/* ── сильные стороны / зоны напряжения / портрет кандидата / рекомендации ── */
type Pair = [string, string];
const STRENGTHS: Record<Locale, Pair[]> = {
  en: [
    ["Execution discipline", "A high quality bar and a \"see it through\" culture — tasks are closed on time"],
    ["Process predictability", "Clear guidelines and long-term planning reduce operational risks"],
    ["Analytical decision-making", "Decisions rely on data and metrics rather than intuition"],
  ],
  es: [
    ["Disciplina de ejecución", "Un listón de calidad alto y una cultura de \"llevarlo hasta el final\": las tareas se cierran a tiempo"],
    ["Previsibilidad de los procesos", "Directrices claras y planificación a largo plazo reducen los riesgos operativos"],
    ["Toma de decisiones analítica", "Las decisiones se basan en datos y métricas más que en la intuición"],
  ],
  pt: [
    ["Disciplina de execução", "Um alto patamar de qualidade e uma cultura de \"levar até o fim\": as tarefas são concluídas no prazo"],
    ["Previsibilidade dos processos", "Diretrizes claras e planejamento de longo prazo reduzem os riscos operacionais"],
    ["Tomada de decisão analítica", "As decisões se baseiam em dados e métricas em vez da intuição"],
  ],
  ar: [
    ["انضباط التنفيذ", "سقف جودة عالٍ وثقافة «الإنجاز حتى النهاية» — تُغلَق المهام في الموعد"],
    ["قابلية العمليات للتنبؤ", "إرشادات واضحة وتخطيط طويل الأمد يقلّلان المخاطر التشغيلية"],
    ["اتخاذ القرار التحليلي", "تعتمد القرارات على البيانات والمقاييس بدلًا من الحدس"],
  ],
};
const TENSIONS: Record<Locale, Pair[]> = {
  en: [
    ["Inertia to change", "Strong stability paired with moderate innovation slows adaptation to the market"],
    ["Low competitiveness", "The collaborative environment is comfortable but may lack drive in aggressive niches"],
    ["Risk of perfectionism", "Attention to detail and high expectations sometimes hold back shipping \"good enough\""],
  ],
  es: [
    ["Inercia ante el cambio", "Una estabilidad fuerte junto a una innovación moderada ralentiza la adaptación al mercado"],
    ["Baja competitividad", "El entorno colaborativo es cómodo, pero puede faltar empuje en nichos agresivos"],
    ["Riesgo de perfeccionismo", "La atención al detalle y las altas expectativas a veces frenan entregar lo \"suficientemente bueno\""],
  ],
  pt: [
    ["Inércia diante da mudança", "Uma estabilidade forte aliada a uma inovação moderada desacelera a adaptação ao mercado"],
    ["Baixa competitividade", "O ambiente colaborativo é confortável, mas pode faltar impulso em nichos agressivos"],
    ["Risco de perfeccionismo", "A atenção aos detalhes e as altas expectativas às vezes impedem entregar o \"bom o suficiente\""],
  ],
  ar: [
    ["جمود تجاه التغيير", "الاستقرار القوي المقترن بابتكار معتدل يُبطئ التكيّف مع السوق"],
    ["تنافسية منخفضة", "البيئة التعاونية مريحة لكنها قد تفتقر إلى الاندفاع في المجالات التنافسية الحادّة"],
    ["خطر السعي إلى الكمال", "الاهتمام بالتفاصيل والتوقّعات العالية يعيقان أحيانًا تسليم ما هو «جيد بما يكفي»"],
  ],
};

const FIT: Record<Locale, string[]> = {
  en: [
    "Results-oriented and takes ownership of outcomes",
    "Values clear processes and works systematically",
    "Makes decisions based on data rather than emotion",
    "A team player who respects boundaries of responsibility",
  ],
  es: [
    "Orientado a resultados y se apropia de los resultados",
    "Valora los procesos claros y trabaja de forma sistemática",
    "Toma decisiones basadas en datos más que en la emoción",
    "Un jugador de equipo que respeta los límites de responsabilidad",
  ],
  pt: [
    "Orientado a resultados e assume a responsabilidade pelos resultados",
    "Valoriza processos claros e trabalha de forma sistemática",
    "Toma decisões baseadas em dados em vez da emoção",
    "Um jogador de equipe que respeita os limites de responsabilidade",
  ],
  ar: [
    "موجّه نحو النتائج ويتحمّل مسؤولية المخرجات",
    "يقدّر العمليات الواضحة ويعمل بشكل منهجي",
    "يتّخذ قراراته بناءً على البيانات لا العاطفة",
    "عضو فريق يحترم حدود المسؤولية",
  ],
};
const NOFIT: Record<Locale, string[]> = {
  en: [
    "A pronounced disruptor who feels constrained by guidelines",
    "A lone individualist focused on self-promotion",
    "Someone who prefers firefighting over systematic work",
  ],
  es: [
    "Un disruptor marcado que se siente limitado por las directrices",
    "Un individualista solitario centrado en la autopromoción",
    "Alguien que prefiere apagar incendios al trabajo sistemático",
  ],
  pt: [
    "Um disruptor acentuado que se sente limitado pelas diretrizes",
    "Um individualista solitário focado na autopromoção",
    "Alguém que prefere apagar incêndios ao trabalho sistemático",
  ],
  ar: [
    "مُحدِث اضطراب بارز يشعر بالتقييد من الإرشادات",
    "فردي منعزل يركّز على الترويج الذاتي",
    "من يفضّل إطفاء الحرائق على العمل المنهجي",
  ],
};
const RECO: Record<Locale, Pair[]> = {
  en: [
    ["Test for systematic thinking", "Ask the candidate to describe how they built a process from scratch and brought it to a stable state"],
    ["Assess data-driven thinking", "Ask about a decision made based on data and which metrics they looked at"],
    ["Gauge tolerance for process", "Clarify their attitude toward guidelines — whether they're comfortable working within structure rather than chaos"],
  ],
  es: [
    ["Evalúa el pensamiento sistemático", "Pide al candidato que describa cómo construyó un proceso desde cero y lo llevó a un estado estable"],
    ["Valora el pensamiento basado en datos", "Pregunta por una decisión tomada con base en datos y qué métricas tuvo en cuenta"],
    ["Mide la tolerancia al proceso", "Aclara su actitud hacia las directrices: si se siente cómodo trabajando dentro de una estructura en lugar del caos"],
  ],
  pt: [
    ["Avalie o pensamento sistemático", "Peça ao candidato para descrever como construiu um processo do zero e o levou a um estado estável"],
    ["Avalie o pensamento orientado por dados", "Pergunte sobre uma decisão tomada com base em dados e quais métricas ele considerou"],
    ["Meça a tolerância ao processo", "Esclareça a atitude dele em relação às diretrizes — se está confortável trabalhando dentro de uma estrutura em vez do caos"],
  ],
  ar: [
    ["اختبر التفكير المنهجي", "اطلب من المرشّح وصف كيف بنى عملية من الصفر وأوصلها إلى حالة مستقرة"],
    ["قيّم التفكير القائم على البيانات", "اسأل عن قرار اتُّخذ بناءً على البيانات وأي المقاييس نظر إليها"],
    ["قِس مدى تقبّل العمليات", "وضّح موقفه من الإرشادات — ما إذا كان مرتاحًا للعمل ضمن هيكل بدلًا من الفوضى"],
  ],
};

/* ── UI-строки страницы ── */
type CopyShape = {
  heroTitle: string;
  heroSubtitle: string;
  companyInfo: string;
  infoCompany: string;
  infoIndustry: string;
  infoSize: string;
  infoArtifacts: string;
  companySize: string;
  companyArtifacts: string;
  companyBio: string;
  dominantType: string;
  dominantBadge: string;
  dominantDesc: string;
  scoreResults: string;
  scoreStability: string;
  scoreDetails: string;
  dnaTitle: string;
  dnaSubtitle: string;
  dimensionIntensity: string;
  analysisTitle: string;
  analysisSubtitle: string;
  learnMore: string;
  strengthsTitle: string;
  tensionsTitle: string;
  growthArea: string;
  candidateTitle: string;
  candidateSubtitle: string;
  willFit: string;
  riskZone: string;
  recoTitle: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  footer: string;
  /* модалка */
  modalClose: string;
  modalCulturalValue: string;
  modalKeyTakeaway: string;
  modalEvidenceSources: string;
  modalScoreBreakdown: string;
  modalParameters: string;
  modalDashedNote: (avg: number) => string;
  modalParameterBreakdown: string;
  modalScoreBoundaries: string;
  modalWhyNotLower: string;
  modalWhyNotHigher: string;
};
const COPY: Record<Locale, CopyShape> = {
  en: {
    heroTitle: "Company culture profile",
    heroSubtitle: "A digitized cultural code across 7 dimensions and detailed parameters, based on the company's artifacts",
    companyInfo: "Company information",
    infoCompany: "Company",
    infoIndustry: "Industry",
    infoSize: "Size",
    infoArtifacts: "Artifacts",
    companySize: "180 employees",
    companyArtifacts: "website, job postings, social media, guidelines",
    companyBio: "A mature product company with a strong process-driven culture. It values results, quality, and predictability, and approaches change deliberately",
    dominantType: "Dominant culture type",
    dominantBadge: "Results + Stability",
    dominantDesc: "A high-performance culture built on clear processes, quality standards, and predictability. Decisions are made by outcome and based on data, and change is approached deliberately. The strengths are execution discipline and analytics; the area for growth is the speed of adapting to change.",
    scoreResults: "Results",
    scoreStability: "Stability",
    scoreDetails: "Details",
    dnaTitle: "Cultural DNA — 7 dimensions",
    dnaSubtitle: "The polar chart shows how pronounced each dimension of the company's culture is",
    dimensionIntensity: "Dimension intensity",
    analysisTitle: "Dimension analysis",
    analysisSubtitle: "9 core cultural values — each calculated as the average of its parameter scores",
    learnMore: "Learn more",
    strengthsTitle: "Cultural strengths",
    tensionsTitle: "Tension points",
    growthArea: "Growth area",
    candidateTitle: "Ideal candidate profile",
    candidateSubtitle: "Who the company's culture will embrace naturally, and who would feel out of place",
    willFit: "Will fit in well",
    riskZone: "Risk zone",
    recoTitle: "Hiring recommendations",
    ctaTitle: "Build a profile like this for your company",
    ctaDesc: "Upload your culture artifacts and evaluate candidates through the lens of your DNA. The first 5 reports are free",
    ctaButton: "Get a report for your company →",
    footer: "TalentMind · automatically generated report · demo data",
    modalClose: "Close",
    modalCulturalValue: "Cultural value",
    modalKeyTakeaway: "Key takeaway · gap analysis",
    modalEvidenceSources: "Evidence sources",
    modalScoreBreakdown: "Score breakdown",
    modalParameters: "parameters",
    modalDashedNote: (avg) => `dashed line — dimension average (${avg})`,
    modalParameterBreakdown: "Parameter breakdown",
    modalScoreBoundaries: "Score boundaries",
    modalWhyNotLower: "Why not lower",
    modalWhyNotHigher: "Why not higher",
  },
  es: {
    heroTitle: "Perfil de cultura de la empresa",
    heroSubtitle: "Un código cultural digitalizado en 7 dimensiones y parámetros detallados, basado en los artefactos de la empresa",
    companyInfo: "Información de la empresa",
    infoCompany: "Empresa",
    infoIndustry: "Sector",
    infoSize: "Tamaño",
    infoArtifacts: "Artefactos",
    companySize: "180 empleados",
    companyArtifacts: "sitio web, ofertas de empleo, redes sociales, directrices",
    companyBio: "Una empresa de producto madura con una sólida cultura orientada a procesos. Valora los resultados, la calidad y la previsibilidad, y aborda el cambio con deliberación",
    dominantType: "Tipo de cultura dominante",
    dominantBadge: "Resultados + Estabilidad",
    dominantDesc: "Una cultura de alto desempeño construida sobre procesos claros, estándares de calidad y previsibilidad. Las decisiones se toman por resultado y con base en datos, y el cambio se aborda con deliberación. Las fortalezas son la disciplina de ejecución y la analítica; el área de crecimiento es la velocidad de adaptación al cambio.",
    scoreResults: "Resultados",
    scoreStability: "Estabilidad",
    scoreDetails: "Detalles",
    dnaTitle: "ADN cultural — 7 dimensiones",
    dnaSubtitle: "El gráfico polar muestra cuán pronunciada es cada dimensión de la cultura de la empresa",
    dimensionIntensity: "Intensidad de la dimensión",
    analysisTitle: "Análisis de dimensiones",
    analysisSubtitle: "9 valores culturales fundamentales: cada uno se calcula como el promedio de las puntuaciones de sus parámetros",
    learnMore: "Saber más",
    strengthsTitle: "Fortalezas culturales",
    tensionsTitle: "Puntos de tensión",
    growthArea: "Área de crecimiento",
    candidateTitle: "Perfil de candidato ideal",
    candidateSubtitle: "A quién acogerá la cultura de la empresa de forma natural y quién se sentiría fuera de lugar",
    willFit: "Encajará bien",
    riskZone: "Zona de riesgo",
    recoTitle: "Recomendaciones de contratación",
    ctaTitle: "Crea un perfil así para tu empresa",
    ctaDesc: "Sube los artefactos de tu cultura y evalúa a los candidatos a través de la lente de tu ADN. Los primeros 5 informes son gratis",
    ctaButton: "Obtén un informe para tu empresa →",
    footer: "TalentMind · informe generado automáticamente · datos de demostración",
    modalClose: "Cerrar",
    modalCulturalValue: "Valor cultural",
    modalKeyTakeaway: "Conclusión clave · análisis de brechas",
    modalEvidenceSources: "Fuentes de evidencia",
    modalScoreBreakdown: "Desglose de la puntuación",
    modalParameters: "parámetros",
    modalDashedNote: (avg) => `línea discontinua — promedio de la dimensión (${avg})`,
    modalParameterBreakdown: "Desglose del parámetro",
    modalScoreBoundaries: "Límites de la puntuación",
    modalWhyNotLower: "Por qué no es más baja",
    modalWhyNotHigher: "Por qué no es más alta",
  },
  pt: {
    heroTitle: "Perfil de cultura da empresa",
    heroSubtitle: "Um código cultural digitalizado em 7 dimensões e parâmetros detalhados, baseado nos artefatos da empresa",
    companyInfo: "Informações da empresa",
    infoCompany: "Empresa",
    infoIndustry: "Setor",
    infoSize: "Tamanho",
    infoArtifacts: "Artefatos",
    companySize: "180 colaboradores",
    companyArtifacts: "site, vagas de emprego, redes sociais, diretrizes",
    companyBio: "Uma empresa de produto madura com uma sólida cultura orientada a processos. Valoriza os resultados, a qualidade e a previsibilidade, e aborda a mudança com deliberação",
    dominantType: "Tipo de cultura dominante",
    dominantBadge: "Resultados + Estabilidade",
    dominantDesc: "Uma cultura de alto desempenho construída sobre processos claros, padrões de qualidade e previsibilidade. As decisões são tomadas por resultado e com base em dados, e a mudança é abordada com deliberação. Os pontos fortes são a disciplina de execução e a analítica; a área de crescimento é a velocidade de adaptação à mudança.",
    scoreResults: "Resultados",
    scoreStability: "Estabilidade",
    scoreDetails: "Detalhes",
    dnaTitle: "DNA cultural — 7 dimensões",
    dnaSubtitle: "O gráfico polar mostra quão pronunciada é cada dimensão da cultura da empresa",
    dimensionIntensity: "Intensidade da dimensão",
    analysisTitle: "Análise de dimensões",
    analysisSubtitle: "9 valores culturais fundamentais — cada um calculado como a média das pontuações de seus parâmetros",
    learnMore: "Saber mais",
    strengthsTitle: "Pontos fortes culturais",
    tensionsTitle: "Pontos de tensão",
    growthArea: "Área de crescimento",
    candidateTitle: "Perfil de candidato ideal",
    candidateSubtitle: "Quem a cultura da empresa acolherá naturalmente e quem se sentiria deslocado",
    willFit: "Vai se encaixar bem",
    riskZone: "Zona de risco",
    recoTitle: "Recomendações de contratação",
    ctaTitle: "Crie um perfil assim para a sua empresa",
    ctaDesc: "Carregue os artefatos da sua cultura e avalie os candidatos pela lente do seu DNA. Os primeiros 5 relatórios são gratuitos",
    ctaButton: "Obtenha um relatório para a sua empresa →",
    footer: "TalentMind · relatório gerado automaticamente · dados de demonstração",
    modalClose: "Fechar",
    modalCulturalValue: "Valor cultural",
    modalKeyTakeaway: "Conclusão principal · análise de lacunas",
    modalEvidenceSources: "Fontes de evidência",
    modalScoreBreakdown: "Detalhamento da pontuação",
    modalParameters: "parâmetros",
    modalDashedNote: (avg) => `linha tracejada — média da dimensão (${avg})`,
    modalParameterBreakdown: "Detalhamento do parâmetro",
    modalScoreBoundaries: "Limites da pontuação",
    modalWhyNotLower: "Por que não é mais baixa",
    modalWhyNotHigher: "Por que não é mais alta",
  },
  ar: {
    heroTitle: "الملف الثقافي للشركة",
    heroSubtitle: "شيفرة ثقافية مُرقمَنة عبر 7 أبعاد ومعايير تفصيلية، بناءً على مُخرَجات الشركة",
    companyInfo: "معلومات الشركة",
    infoCompany: "الشركة",
    infoIndustry: "القطاع",
    infoSize: "الحجم",
    infoArtifacts: "المُخرَجات",
    companySize: "180 موظفًا",
    companyArtifacts: "الموقع الإلكتروني والإعلانات الوظيفية ووسائل التواصل الاجتماعي والإرشادات",
    companyBio: "شركة منتجات ناضجة بثقافة قوية قائمة على العمليات. تقدّر النتائج والجودة والقابلية للتنبؤ، وتتعامل مع التغيير بتروٍّ",
    dominantType: "نوع الثقافة المهيمن",
    dominantBadge: "النتائج + الاستقرار",
    dominantDesc: "ثقافة عالية الأداء مبنية على عمليات واضحة ومعايير جودة وقابلية للتنبؤ. تُتّخذ القرارات بالنتيجة وبناءً على البيانات، ويُتعامَل مع التغيير بتروٍّ. نقاط القوة هي انضباط التنفيذ والتحليلات؛ ومجال النمو هو سرعة التكيّف مع التغيير.",
    scoreResults: "النتائج",
    scoreStability: "الاستقرار",
    scoreDetails: "التفاصيل",
    dnaTitle: "الحمض النووي الثقافي — 7 أبعاد",
    dnaSubtitle: "يُظهر المخطط القطبي مدى وضوح كل بُعد من أبعاد ثقافة الشركة",
    dimensionIntensity: "شدّة البُعد",
    analysisTitle: "تحليل الأبعاد",
    analysisSubtitle: "9 قيم ثقافية أساسية — كل منها محسوب كمتوسط درجات معاييرها",
    learnMore: "اعرف المزيد",
    strengthsTitle: "نقاط القوة الثقافية",
    tensionsTitle: "نقاط التوتر",
    growthArea: "مجال النمو",
    candidateTitle: "الملف المثالي للمرشّح",
    candidateSubtitle: "من ستحتضنه ثقافة الشركة بشكل طبيعي، ومن سيشعر أنه في غير مكانه",
    willFit: "سيندمج جيدًا",
    riskZone: "منطقة الخطر",
    recoTitle: "توصيات التوظيف",
    ctaTitle: "ابنِ ملفًا كهذا لشركتك",
    ctaDesc: "حمّل مُخرَجات ثقافتك وقيّم المرشّحين من منظور حمضك النووي. أول 5 تقارير مجانية",
    ctaButton: "احصل على تقرير لشركتك ←",
    footer: "TalentMind · تقرير مُولَّد تلقائيًا · بيانات توضيحية",
    modalClose: "إغلاق",
    modalCulturalValue: "قيمة ثقافية",
    modalKeyTakeaway: "الخلاصة الرئيسية · تحليل الفجوات",
    modalEvidenceSources: "مصادر الأدلة",
    modalScoreBreakdown: "تفصيل الدرجة",
    modalParameters: "معايير",
    modalDashedNote: (avg) => `الخط المتقطّع — متوسط البُعد (${avg})`,
    modalParameterBreakdown: "تفصيل المعيار",
    modalScoreBoundaries: "حدود الدرجة",
    modalWhyNotLower: "لماذا ليست أدنى",
    modalWhyNotHigher: "لماذا ليست أعلى",
  },
};

export default function CulturePrimerPage() {
  const locale = useLocale();
  const t = COPY[locale];
  const DIMS = buildDims(locale);
  const BIG_NINE = buildNine(locale);
  const strengths = STRENGTHS[locale];
  const tensions = TENSIONS[locale];
  const fit = FIT[locale];
  const nofit = NOFIT[locale];
  const reco = RECO[locale];

  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<Nine | null>(null);
  useEffect(() => { setMounted(true); }, []);

  /* блокируем скролл фона при открытой модалке */
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

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

  return (
    <div ref={rootRef} className="relative w-full" style={{ color: INK }}>
      {/* HERO */}
      <section className="mx-auto max-w-[1100px] px-6 pt-36 pb-8 text-center md:px-8 lg:pt-40">
        <h1 className="rv mx-auto mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[1.04] tracking-tight">{t.heroTitle}</h1>
        <p className="rv mx-auto mt-4 max-w-2xl text-lg text-[#183833]/65">{t.heroSubtitle}</p>
      </section>

      <div className="mx-auto max-w-[1100px] space-y-5 px-5 pb-24 md:px-8">
        {/* 1 · компания + доминирующий тип */}
        <div className="rv grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="text-base font-bold">{t.companyInfo}</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Info icon={<Building2 className="h-4 w-4" />} t={t.infoCompany} v="Technopolis LLC" />
              <Info icon={<Globe className="h-4 w-4" />} t={t.infoIndustry} v="FinTech / B2B SaaS" />
              <Info icon={<Users className="h-4 w-4" />} t={t.infoSize} v={t.companySize} />
              <Info icon={<FileText className="h-4 w-4" />} t={t.infoArtifacts} v={t.companyArtifacts} />
            </div>
            <p className="mt-4 border-t border-[#eef0ee] pt-4 text-sm leading-relaxed text-[#183833]/70">
              {t.companyBio}
            </p>
          </Card>

          <div className="rounded-3xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] to-[#eef7e0] p-5 shadow-[0_16px_44px_rgba(24,56,51,0.07)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-base font-bold"><Compass className="h-5 w-5" style={{ color: GREEN }} /> {t.dominantType}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm" style={{ color: GREEN }}>{t.dominantBadge}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#183833]/75">
              {t.dominantDesc}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[[t.scoreResults, 81, "#FF6B57"], [t.scoreStability, 78, TEAL], [t.scoreDetails, 75, "#2E9E8F"]].map(([tt, v, c]) => (
                <div key={tt as string} className="rounded-2xl bg-white/70 p-3 text-center">
                  <p className="text-xl font-bold" style={{ color: c as string }}>{v}%</p>
                  <p className="mt-0.5 text-[10px] text-[#183833]/55">{tt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2 · диаграмма ДНК */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">{t.dnaTitle}</h2>
          <p className="mx-auto mt-1 max-w-md text-center text-xs text-[#183833]/55">{t.dnaSubtitle}</p>
          <div className="mt-4 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.15fr_1fr]">
            <Card className="flex items-center justify-center"><RoseChart dims={DIMS} /></Card>
            <Card className="flex flex-col">
              <p className="flex items-center gap-2 text-sm font-bold"><Dna className="h-4 w-4" style={{ color: GREEN }} /> {t.dimensionIntensity}</p>
              <div className="mt-4 flex flex-1 flex-col justify-between gap-3.5">
                {DIMS.map((d) => (
                  <div key={d.key}>
                    <div className="flex items-center justify-between text-xs"><span className="font-medium">{d.name}</span><span className="font-bold tabular-nums" style={{ color: d.c }}>{d.val}%</span></div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#eef2ec]"><div className="h-full rounded-full transition-[width] duration-[1100ms] ease-out" style={{ width: mounted ? `${d.val}%` : "0%", background: d.c }} /></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* 3 · анализ измерений */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">{t.analysisTitle}</h2>
          <p className="mx-auto mt-1 max-w-lg text-center text-xs text-[#183833]/55">{t.analysisSubtitle}</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BIG_NINE.map((d) => {
              const c = nlvl(d.score);
              return (
                <Card key={d.key} className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-bold leading-tight">{d.ru}</p>
                    <span className="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold tabular-nums" style={{ background: `${c}1a`, color: c }}>{d.score} / 100</span>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#eef2ec]"><div className="h-full rounded-full transition-[width] duration-[1100ms] ease-out" style={{ width: mounted ? `${d.score}%` : "0%", background: c }} /></div>
                  <p className="mt-3 flex-1 text-xs leading-snug text-[#183833]/65">{d.desc}</p>
                  <button onClick={() => setActive(d)} className="ease-smooth mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e6ece4] bg-white px-4 py-2.5 text-xs font-semibold text-[#183833] transition-all hover:-translate-y-0.5 hover:border-[#d8ecc4] hover:bg-[#f6faef]">
                    {t.learnMore} <ExternalLink className="h-3.5 w-3.5" style={{ color: GREEN }} />
                  </button>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 4 · сильные стороны / зоны напряжения */}
        <div className="rv grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card>
            <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: GREEN }}><ShieldCheck className="h-4 w-4" /> {t.strengthsTitle}</h3>
            {strengths.map(([tt, x]) => <Block key={tt} t={tt} text={x} />)}
          </Card>
          <Card>
            <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: AMBER }}><AlertTriangle className="h-4 w-4" /> {t.tensionsTitle}</h3>
            {tensions.map(([tt, x]) => <Block key={tt} t={tt} text={x} badge={t.growthArea} bc={AMBER} />)}
          </Card>
        </div>

        {/* 5 · идеальный кандидат */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">{t.candidateTitle}</h2>
          <p className="mx-auto mt-1 max-w-md text-center text-xs text-[#183833]/55">{t.candidateSubtitle}</p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[#d8ecc4] bg-[#f3faea] p-5">
              <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: GREEN }}><UserCheck className="h-4 w-4" /> {t.willFit}</p>
              <ul className="mt-3 space-y-2">{fit.map((x) => <li key={x} className="flex items-start gap-2 text-xs leading-snug text-[#183833]/75"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: GREEN }} /> {x}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-[#ffd9d9] bg-[#fff5f5] p-5">
              <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: RED }}><AlertTriangle className="h-4 w-4" /> {t.riskZone}</p>
              <ul className="mt-3 space-y-2">{nofit.map((x) => <li key={x} className="flex items-start gap-2 text-xs leading-snug text-[#183833]/75"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: RED }} /> {x}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* 6 · рекомендации по найму */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">{t.recoTitle}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {reco.map(([tt, x]) => (
              <Card key={tt}>
                <p className="flex items-center gap-2 text-sm font-bold"><span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: `${TEAL}1a`, color: TEAL }}><Lightbulb className="h-4 w-4" /></span> {tt}</p>
                <p className="mt-2 text-xs leading-snug text-[#183833]/70">{x}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rv overflow-hidden rounded-[2rem] px-8 py-12 text-center text-white shadow-[0_30px_70px_rgba(122,184,0,0.28)]" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #5e9400 100%)` }}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{t.ctaDesc}</p>
          <a href="https://app.talentmind.app" className="ease-smooth mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1" style={{ color: GREEN }}>{t.ctaButton}</a>
        </div>

        <p className="rv text-center text-[11px] text-[#183833]/40">{t.footer}</p>
      </div>

      {/* модальное окно — обоснование измерения */}
      {active && <DimModal key={active.key} d={active} onClose={() => setActive(null)} t={t} />}
    </div>
  );
}

/* ============================================================
   Модальное окно — детальный анализ измерения
   ============================================================ */
function DimModal({ d, onClose, t }: { d: Nine; onClose: () => void; t: CopyShape }) {
  const locale = useLocale();
  const c = nlvl(d.score);
  const [sel, setSel] = useState(0);
  const sp = d.params[sel];
  const spc = nlvl(sp.score);
  const grad = c === GREEN ? "linear-gradient(120deg,#6aa400 0%,#8ec425 100%)"
    : c === AMBER ? "linear-gradient(120deg,#c8860a 0%,#f0b53e 100%)"
    : "linear-gradient(120deg,#e23b3b 0%,#ff7676 100%)";
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <style>{`@keyframes dimFade{from{opacity:0}to{opacity:1}}
        @keyframes dimPop{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes pIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes barGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
      <div className="absolute inset-0 bg-[#0d1b17]/45 backdrop-blur-sm" style={{ animation: "dimFade .28s ease both" }} onClick={onClose} />
      <div className="relative z-10 flex max-h-[90vh] w-[min(1080px,95vw)] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_60px_140px_rgba(13,27,23,0.5)]" style={{ animation: "dimPop .36s cubic-bezier(.22,1,.36,1) both" }}>

        {/* ── HERO HEADER (градиент по уровню) ── */}
        <div className="relative shrink-0 overflow-hidden px-6 py-6 text-white md:px-9 md:py-7" style={{ background: grad }}>
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-black/10 blur-3xl" />
          <button onClick={onClose} aria-label={t.modalClose} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"><X className="h-4 w-4" /></button>
          <div className="relative flex items-center gap-5">
            <HeaderRing value={d.score} />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">{t.modalCulturalValue}</p>
              <h3 className="mt-1 text-[1.9rem] font-bold leading-none tracking-tight">{d.ru}</h3>
              <p className="mt-1 text-sm italic text-white/70">{d.en}</p>
            </div>
          </div>
          <p className="relative mt-4 max-w-2xl text-[15px] leading-relaxed text-white/90">{d.desc}</p>
        </div>

        {/* ── SCROLL BODY ── */}
        <div className="flex flex-col overflow-y-auto bg-[#fafcf8]" data-lenis-prevent>

          {/* ключевой вывод + источники */}
          <div className="border-b border-[#eef0ee] px-6 py-5 md:px-9">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
              <div className="flex items-start gap-3 lg:flex-1">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: c }}><Lightbulb className="h-4 w-4" /></span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#183833]/45">{t.modalKeyTakeaway}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-[#183833]/85">{d.gap}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-2xl border border-dashed border-[#d8e0da] bg-white px-4 py-3 lg:w-[280px] lg:shrink-0">
                <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#183833]/40" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#183833]/45">{t.modalEvidenceSources}</p>
                  <p className="mt-1 text-[11px] leading-snug text-[#183833]/65">{d.src}</p>
                </div>
              </div>
            </div>
          </div>

          {/* MASTER (состав оценки) ↔ DETAIL */}
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[0.92fr_1.08fr] md:p-9">

            {/* ── MASTER: диаграмма состава ── */}
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#183833]/45">{t.modalScoreBreakdown}</p>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums" style={{ background: `${GREEN}1a`, color: GREEN }}>{d.params.length} {t.modalParameters}</span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-[10px] text-[#183833]/45"><span className="inline-block h-3 w-[2px]" style={{ background: "#183833", opacity: 0.4 }} /> {t.modalDashedNote(d.score)}</p>

              <div className="mt-3 space-y-2">
                {d.params.map((p, i) => {
                  const lc = nlvl(p.score), on = i === sel;
                  return (
                    <button
                      key={p.n}
                      onClick={() => setSel(i)}
                      className="w-full rounded-2xl border border-[#e9ede9] bg-white p-3 text-left transition-all hover:border-[#d6e6c8]"
                      style={{ animation: `pIn .45s ease ${0.05 * i + 0.05}s both`, ...(on ? { boxShadow: `0 0 0 2px ${lc}`, background: `${lc}0d` } : {}) }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: lc }} />
                          <span className="truncate text-[13px] font-semibold" style={{ color: INK }}>{p.ru}</span>
                          <span className="hidden shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold sm:inline" style={{ background: `${badgeColor(p.badge)}1a`, color: badgeColor(p.badge) }}>{BADGE_LABEL[locale][p.badge]}</span>
                        </span>
                        <span className="shrink-0 text-sm font-bold tabular-nums" style={{ color: lc }}>{p.score}</span>
                      </div>
                      <div className="relative mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#eef2ec]">
                        <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: lc, transformOrigin: "left", animation: `barGrow .7s cubic-bezier(.22,1,.36,1) ${0.05 * i + 0.15}s both` }} />
                      </div>
                      {/* маркер среднего */}
                      <div className="relative">
                        <span className="absolute -top-[10px] h-2.5 w-[2px]" style={{ left: `${d.score}%`, background: "#183833", opacity: 0.4 }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── DETAIL: выбранный параметр ── */}
            <div className="self-start lg:sticky lg:top-0">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#183833]/45">{t.modalParameterBreakdown}</p>
              <div key={sel} className="mt-3 overflow-hidden rounded-2xl border border-[#e9ede9] bg-white shadow-[0_12px_34px_rgba(24,56,51,0.07)]" style={{ animation: "pIn .35s ease both" }}>
                <div className="border-l-[5px] p-5" style={{ borderColor: spc }}>
                  <div className="flex items-center gap-4">
                    <ScoreRing value={sp.score} color={spc} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-xl font-bold leading-tight" style={{ color: INK }}>{sp.ru}</h4>
                        <span className="rounded-md px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${badgeColor(sp.badge)}1a`, color: badgeColor(sp.badge) }}>{BADGE_LABEL[locale][sp.badge]}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-[15px] font-medium leading-snug" style={{ color: INK }}>{sp.statement}</p>

                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#183833]/40">{t.modalScoreBoundaries}</p>
                  <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#d8ecc4] bg-[#f3faea] p-3.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: GREEN }}><TrendingUp className="h-3.5 w-3.5" /> {t.modalWhyNotLower}</p>
                      <p className="mt-1.5 text-xs leading-snug text-[#183833]/70">{sp.lower}</p>
                    </div>
                    <div className="rounded-xl border border-[#f1d9a8] bg-[#fdf6e9] p-3.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: AMBER }}><TrendingDown className="h-3.5 w-3.5" /> {t.modalWhyNotHigher}</p>
                      <p className="mt-1.5 text-xs leading-snug text-[#183833]/70">{sp.higher}</p>
                    </div>
                  </div>

                  {sp.quote && (
                    <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-[#ececec] bg-[#f7f8f7] px-4 py-3">
                      <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-[#183833]/30" />
                      <p className="text-xs italic leading-snug text-[#183833]/60">{sp.quote}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/* большое кольцо оценки в шапке (белое на цветном) */
function HeaderRing({ value }: { value: number }) {
  const r = 30, cc = 2 * Math.PI * r, dash = ((value / 100) * cc).toFixed(1);
  return (
    <div className="relative h-[80px] w-[80px] shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="7" />
        <circle cx="40" cy="40" r={r} fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${dash} ${cc.toFixed(1)}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none text-white">
        <span className="text-2xl font-bold tabular-nums">{value}</span>
      </div>
    </div>
  );
}
/* кольцо оценки параметра */
function ScoreRing({ value, color }: { value: number; color: string }) {
  const r = 24, cc = 2 * Math.PI * r, dash = ((value / 100) * cc).toFixed(1);
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#eef2ec" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${dash} ${cc.toFixed(1)}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-lg font-bold tabular-nums" style={{ color }}>{value}</span>
      </div>
    </div>
  );
}

/* ============================================================
   мелкие компоненты
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

/* роза-диаграмма 7 измерений */
function RoseChart({ dims }: { dims: Dim[] }) {
  const N = dims.length, cx = 280, cy = 215, R = 152, seg = 360 / N, pad = 1.4, labelR = R + 16;
  const rad = (deg: number) => (deg * Math.PI) / 180;
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
  /* перенос длинной подписи на две строки */
  const wrap = (s: string) => {
    if (s.length <= 13 || !s.includes(" ")) return [s];
    const words = s.split(" "), half = s.length / 2;
    let l1 = "", k = 0;
    for (; k < words.length; k++) { if (l1.length && l1.length + words[k].length > half) break; l1 += (l1 ? " " : "") + words[k]; }
    const l2 = words.slice(k).join(" ");
    return l2 ? [l1, l2] : [l1];
  };
  return (
    <div className="flex w-full flex-col items-center">
      <svg viewBox="0 0 560 460" className="w-full max-w-[620px]">
        {/* вся шкала 0–100% — нейтральная подложка */}
        {dims.map((_, i) => <path key={`bg${i}`} d={sector(R, i)} fill="#eef1f3" stroke="#ffffff" strokeWidth="2.5" />)}
        {/* концентрические направляющие шкалы */}
        {[0.25, 0.5, 0.75, 1].map((f) => dims.map((_, i) => <path key={`g${f}-${i}`} d={arc(R * f, i)} fill="none" stroke="#d2dce2" strokeWidth="1" opacity="0.7" />))}
        {/* выраженность измерения — цветной сектор по значению */}
        {dims.map((d, i) => <path key={`v${i}`} d={sector((R * d.val) / 100, i)} fill={d.c} style={{ transformOrigin: `${cx}px ${cy}px`, animation: `roseG .7s ease-out ${0.05 * i + 0.1}s both` }} />)}
        {/* проценты внутри сектора */}
        {dims.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), rr = R * 0.62;
          return <text key={`p${i}`} x={(cx + rr * Math.cos(a)).toFixed(1)} y={(cy + rr * Math.sin(a)).toFixed(1)} fontSize="15" fontWeight="700" fill="#2b3b38" textAnchor="middle" dominantBaseline="middle">{d.val}%</text>;
        })}
        {/* подписи измерений снаружи (с переносом) */}
        {dims.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), ca = Math.cos(a);
          const lx = +(cx + labelR * ca).toFixed(1), ly = +(cy + labelR * Math.sin(a)).toFixed(1);
          const anchor = ca > 0.3 ? "start" : ca < -0.3 ? "end" : "middle";
          const lines = wrap(d.name), dy0 = lines.length > 1 ? -5 : 0;
          return (
            <text key={`l${i}`} x={lx} y={ly} fontSize="13" fill="#3a4f4a" textAnchor={anchor} dominantBaseline="middle">
              {lines.map((ln, k) => <tspan key={k} x={lx} dy={k === 0 ? dy0 : 13}>{ln}</tspan>)}
            </text>
          );
        })}
        <style>{`@keyframes roseG{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      </svg>
    </div>
  );
}
