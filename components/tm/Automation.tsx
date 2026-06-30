"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Check, X, AlertTriangle, Sparkles, GitBranch, Zap, Brain } from "lucide-react";
import { Arrow, GREEN, INK, RED, TEAL } from "./ui";
import { AnimatedChat } from "./AnimatedChat";
import { ReportModalCard, CandidateInfoCard, DecisionCard } from "./ReportCards";
import { useLocale } from "./LocaleProvider";
import { localize, type Locale } from "@/lib/i18n";
import { HOME } from "@/lib/content/home";

type Auto = (typeof HOME)["en"]["auto"];

/* ── словарь виджетов/мок-карточек (текст внутри макетов отчёта) ── */
type Widgets = {
  valueProp: string;
  valuePropDesc: string;
  cultureType: string;
  cultureTypeDesc: string;
  dominantValues: string;
  values: string[];
  matchScore: string;
  matchExplain: string;
  innovation: string;
  teamOrientation: string;
  stated: string;
  operationalReality: string;
  whyNotLower: string;
  whyNotHigher: string;
  innovationStated: string;
  innovationReality: string;
  innovationExplain: string;
  innovationLower: string;
  innovationHigher: string;
  teamStated: string;
  teamReality: string;
  teamExplain: string;
  teamLower: string;
  teamHigher: string;
  cultureMatch: string;
  cultureMatchDesc: string;
  alignmentPoints: string;
  frictionPoints: string;
  align1Title: string;
  align1Quote: string;
  align1Sub: string;
  align2Title: string;
  align2Quote: string;
  align2Sub: string;
  friction1Title: string;
  friction1Quote: string;
  friction1Sub: string;
  friction2Title: string;
  friction2Quote: string;
  friction2Sub: string;
  warning: string;
  contextNeverLost: string;
  contextNeverLostDesc: string;
  answersInSeconds: string;
  basedOnInterviews: string;
  assistantAlt: string;
};

const W: Record<Locale, Widgets> = {
  en: {
    valueProp: "Company value proposition",
    valuePropDesc: "A high degree of process-driven management, clear role boundaries, and systematic time tracking",
    cultureType: "Culture type",
    cultureTypeDesc: "A process-oriented culture with elements of distributed management",
    dominantValues: "Dominant values",
    values: ["Diligence", "Integrity", "Collaboration"],
    matchScore: "Match score",
    matchExplain: "How well the candidate matches the company's values and cultural code",
    innovation: "Innovation / Flexibility",
    teamOrientation: "Team orientation / Informality",
    stated: "Stated",
    operationalReality: "Operational reality",
    whyNotLower: "Why not lower",
    whyNotHigher: "Why not higher",
    innovationStated: "Declared values of innovation and flexible roles",
    innovationReality: "Strict time tracking and approval procedures",
    innovationExplain: "Innovation is encouraged on paper, but time-tracking requirements lengthen the rollout cycle",
    innovationLower: "There are dedicated roles for growth",
    innovationHigher: "Approvals limit the pace",
    teamStated: "Onboarding and mentorship program",
    teamReality: "Structured, scheduled team meetings",
    teamExplain: "Support is declared through mentorship, but meetings are governed by formal rules",
    teamLower: "An onboarding system is in place",
    teamHigher: "Regulations formalize communication",
    cultureMatch: "Cultural-code match",
    cultureMatchDesc:
      "The candidate would fit naturally into an executor role with clear boundaries of responsibility and is unlikely to overstep them. However, heavy process bureaucracy could become a blocker",
    alignmentPoints: "Alignment points",
    frictionPoints: "Friction points",
    align1Title: "Respects boundaries of responsibility",
    align1Quote: "\"Clearly distinguishes their own scope from others'.\"",
    align1Sub: "Does not encroach on others' areas without asking",
    align2Title: "Honesty and transparency",
    align2Quote: "\"Openly acknowledges past mistakes.\"",
    align2Sub: "Meets the transparency requirement",
    friction1Title: "Lacks proactivity",
    friction1Quote: "\"Waits for leading questions.\"",
    friction1Sub: "Not ready to define tasks on their own",
    friction2Title: "Weak process thinking",
    friction2Quote: "\"Struggles to structure tasks.\"",
    friction2Sub: "Difficulty with multi-level requirements",
    warning: "Reliant on external direction — needs micromanagement at the start",
    contextNeverLost: "Context is never lost",
    contextNeverLostDesc:
      "The AI keeps the entire conversation and your whole pipeline in memory — ask anything, no need to repeat the background",
    answersInSeconds: "Answers in seconds",
    basedOnInterviews: "Based on interviews",
    assistantAlt: "TalentMind AI assistant",
  },
  es: {
    valueProp: "Propuesta de valor de la empresa",
    valuePropDesc: "Un alto grado de gestión orientada a procesos, límites de rol claros y un seguimiento sistemático del tiempo",
    cultureType: "Tipo de cultura",
    cultureTypeDesc: "Una cultura orientada a procesos con elementos de gestión distribuida",
    dominantValues: "Valores dominantes",
    values: ["Diligencia", "Integridad", "Colaboración"],
    matchScore: "Puntuación de coincidencia",
    matchExplain: "Qué tan bien encaja el candidato con los valores y el código cultural de la empresa",
    innovation: "Innovación / Flexibilidad",
    teamOrientation: "Orientación al equipo / Informalidad",
    stated: "Declarado",
    operationalReality: "Realidad operativa",
    whyNotLower: "Por qué no más bajo",
    whyNotHigher: "Por qué no más alto",
    innovationStated: "Valores declarados de innovación y roles flexibles",
    innovationReality: "Seguimiento estricto del tiempo y procedimientos de aprobación",
    innovationExplain: "La innovación se fomenta sobre el papel, pero los requisitos de control de tiempo alargan el ciclo de implementación",
    innovationLower: "Hay roles dedicados al crecimiento",
    innovationHigher: "Las aprobaciones limitan el ritmo",
    teamStated: "Programa de incorporación y mentoría",
    teamReality: "Reuniones de equipo estructuradas y planificadas",
    teamExplain: "El apoyo se declara a través de la mentoría, pero las reuniones se rigen por reglas formales",
    teamLower: "Existe un sistema de incorporación",
    teamHigher: "Las normas formalizan la comunicación",
    cultureMatch: "Coincidencia con el código cultural",
    cultureMatchDesc:
      "El candidato encajaría de forma natural en un rol de ejecutor con límites de responsabilidad claros y es poco probable que los sobrepase. Sin embargo, una fuerte burocracia de procesos podría convertirse en un obstáculo",
    alignmentPoints: "Puntos de alineación",
    frictionPoints: "Puntos de fricción",
    align1Title: "Respeta los límites de responsabilidad",
    align1Quote: "«Distingue claramente su propio alcance del de los demás.»",
    align1Sub: "No invade las áreas de otros sin preguntar",
    align2Title: "Honestidad y transparencia",
    align2Quote: "«Reconoce abiertamente errores pasados.»",
    align2Sub: "Cumple el requisito de transparencia",
    friction1Title: "Falta de proactividad",
    friction1Quote: "«Espera preguntas que lo orienten.»",
    friction1Sub: "No está listo para definir tareas por su cuenta",
    friction2Title: "Pensamiento de procesos débil",
    friction2Quote: "«Le cuesta estructurar las tareas.»",
    friction2Sub: "Dificultad con requisitos de varios niveles",
    warning: "Depende de la dirección externa: necesita microgestión al principio",
    contextNeverLost: "El contexto nunca se pierde",
    contextNeverLostDesc:
      "La IA conserva en memoria toda la conversación y tu pipeline completo: pregunta lo que quieras, sin necesidad de repetir los antecedentes",
    answersInSeconds: "Respuestas en segundos",
    basedOnInterviews: "Basado en entrevistas",
    assistantAlt: "Asistente de IA de TalentMind",
  },
  pt: {
    valueProp: "Proposta de valor da empresa",
    valuePropDesc: "Um alto grau de gestão orientada a processos, limites de função claros e controle sistemático de tempo",
    cultureType: "Tipo de cultura",
    cultureTypeDesc: "Uma cultura orientada a processos com elementos de gestão distribuída",
    dominantValues: "Valores dominantes",
    values: ["Diligência", "Integridade", "Colaboração"],
    matchScore: "Pontuação de compatibilidade",
    matchExplain: "O quanto o candidato se alinha aos valores e ao código cultural da empresa",
    innovation: "Inovação / Flexibilidade",
    teamOrientation: "Orientação para a equipe / Informalidade",
    stated: "Declarado",
    operationalReality: "Realidade operacional",
    whyNotLower: "Por que não mais baixo",
    whyNotHigher: "Por que não mais alto",
    innovationStated: "Valores declarados de inovação e funções flexíveis",
    innovationReality: "Controle de tempo rigoroso e procedimentos de aprovação",
    innovationExplain: "A inovação é incentivada no papel, mas as exigências de controle de tempo alongam o ciclo de implantação",
    innovationLower: "Há funções dedicadas ao crescimento",
    innovationHigher: "As aprovações limitam o ritmo",
    teamStated: "Programa de integração e mentoria",
    teamReality: "Reuniões de equipe estruturadas e agendadas",
    teamExplain: "O apoio é declarado por meio da mentoria, mas as reuniões seguem regras formais",
    teamLower: "Há um sistema de integração",
    teamHigher: "As normas formalizam a comunicação",
    cultureMatch: "Compatibilidade com o código cultural",
    cultureMatchDesc:
      "O candidato se encaixaria naturalmente em uma função de executor com limites de responsabilidade claros e dificilmente os ultrapassaria. No entanto, uma forte burocracia de processos poderia se tornar um obstáculo",
    alignmentPoints: "Pontos de alinhamento",
    frictionPoints: "Pontos de atrito",
    align1Title: "Respeita os limites de responsabilidade",
    align1Quote: "\"Distingue claramente o próprio escopo do dos outros.\"",
    align1Sub: "Não invade as áreas dos outros sem perguntar",
    align2Title: "Honestidade e transparência",
    align2Quote: "\"Reconhece abertamente erros do passado.\"",
    align2Sub: "Atende ao requisito de transparência",
    friction1Title: "Falta de proatividade",
    friction1Quote: "\"Espera por perguntas que o orientem.\"",
    friction1Sub: "Não está pronto para definir tarefas por conta própria",
    friction2Title: "Pensamento de processos fraco",
    friction2Quote: "\"Tem dificuldade para estruturar tarefas.\"",
    friction2Sub: "Dificuldade com requisitos de vários níveis",
    warning: "Depende de direcionamento externo — precisa de microgerenciamento no início",
    contextNeverLost: "O contexto nunca se perde",
    contextNeverLostDesc:
      "A IA mantém na memória toda a conversa e todo o seu pipeline — pergunte o que quiser, sem precisar repetir o contexto",
    answersInSeconds: "Respostas em segundos",
    basedOnInterviews: "Com base nas entrevistas",
    assistantAlt: "Assistente de IA da TalentMind",
  },
  ar: {
    valueProp: "عرض القيمة للشركة",
    valuePropDesc: "درجة عالية من الإدارة القائمة على العمليات، وحدود أدوار واضحة، وتتبّع منهجي للوقت",
    cultureType: "نوع الثقافة",
    cultureTypeDesc: "ثقافة موجّهة نحو العمليات مع عناصر من الإدارة الموزّعة",
    dominantValues: "القيم السائدة",
    values: ["الاجتهاد", "النزاهة", "التعاون"],
    matchScore: "مؤشر التوافق",
    matchExplain: "مدى توافق المرشّح مع قيم الشركة وشيفرتها الثقافية",
    innovation: "الابتكار / المرونة",
    teamOrientation: "التوجه نحو الفريق / عدم الرسمية",
    stated: "معلن",
    operationalReality: "الواقع التشغيلي",
    whyNotLower: "لماذا ليست أقل",
    whyNotHigher: "لماذا ليست أعلى",
    innovationStated: "قيم معلنة للابتكار والأدوار المرنة",
    innovationReality: "تتبّع صارم للوقت وإجراءات اعتماد",
    innovationExplain: "يُشجَّع الابتكار على الورق، لكن متطلبات تتبّع الوقت تطيل دورة التنفيذ",
    innovationLower: "توجد أدوار مخصّصة للنمو",
    innovationHigher: "الاعتمادات تحدّ من الوتيرة",
    teamStated: "برنامج التأهيل والإرشاد",
    teamReality: "اجتماعات فريق منظّمة ومجدولة",
    teamExplain: "يُعلَن الدعم عبر الإرشاد، لكن الاجتماعات تخضع لقواعد رسمية",
    teamLower: "يوجد نظام تأهيل قائم",
    teamHigher: "اللوائح تُضفي طابعًا رسميًا على التواصل",
    cultureMatch: "توافق الشيفرة الثقافية",
    cultureMatchDesc:
      "سيندمج المرشّح بشكل طبيعي في دور المنفّذ ضمن حدود مسؤولية واضحة، ومن غير المرجّح أن يتجاوزها. غير أن البيروقراطية الثقيلة للعمليات قد تتحوّل إلى عائق",
    alignmentPoints: "نقاط التوافق",
    frictionPoints: "نقاط الاحتكاك",
    align1Title: "يحترم حدود المسؤولية",
    align1Quote: "«يميّز بوضوح نطاق عمله عن نطاق الآخرين.»",
    align1Sub: "لا يتعدّى على مجالات الآخرين دون استئذان",
    align2Title: "الصدق والشفافية",
    align2Quote: "«يعترف بصراحة بأخطاء الماضي.»",
    align2Sub: "يستوفي متطلب الشفافية",
    friction1Title: "يفتقر إلى المبادرة",
    friction1Quote: "«ينتظر الأسئلة الموجِّهة.»",
    friction1Sub: "غير مستعد لتحديد المهام بنفسه",
    friction2Title: "تفكير ضعيف في العمليات",
    friction2Quote: "«يجد صعوبة في هيكلة المهام.»",
    friction2Sub: "صعوبة في التعامل مع المتطلبات المتعددة المستويات",
    warning: "يعتمد على التوجيه الخارجي — يحتاج إلى إدارة دقيقة في البداية",
    contextNeverLost: "لا يضيع السياق أبدًا",
    contextNeverLostDesc:
      "يحتفظ الذكاء الاصطناعي بكامل المحادثة وقائمة مرشّحيك بالكامل في الذاكرة — اسأل عن أي شيء دون الحاجة إلى تكرار الخلفية",
    answersInSeconds: "إجابات في ثوانٍ",
    basedOnInterviews: "استنادًا إلى المقابلات",
    assistantAlt: "مساعد الذكاء الاصطناعي من TalentMind",
  },
};

/* ============================================================
   Блок 3 — вертикальный стек экранов «полёт в облаках».
   Блоки идут друг под другом; каждый при прокрутке плавно
   проявляется + разблюривается, на выходе слегка размывается
   (не исчезает полностью). Реализация: GSAP ScrollTrigger scrub.
   ============================================================ */

const PHOTO = "/talentmind-laptop.png"; // фото кандидата/HR (заменяемо)
const AMBER = "#E8A317";

/* логотипы интеграций из /public */
const L = {
  lever: "/lever.svg",          // Lever
  greenhouse: "/greenhouse.svg", // Greenhouse
  teams: "/teams.svg",          // Microsoft Teams
  zoom: "/zoom.svg",            // Zoom
};
/* логотипы по краям (без повторов), ×2, с порядком фокуса (как «54 параметра») */
const LOGO_SCATTER: { src: string; pos: string; h: number; o: number; d: string; f: string }[] = [
  { src: L.lever, pos: "lg:left-[4%] lg:top-[14%]", h: 57, o: 0.9, d: "0s", f: "0" },
  { src: L.teams, pos: "lg:right-[4%] lg:top-[16%]", h: 97, o: 0.95, d: "0.5s", f: "1" },
  { src: L.greenhouse, pos: "lg:left-[5%] lg:bottom-[16%]", h: 44, o: 0.9, d: "0.9s", f: "2" },
  { src: L.zoom, pos: "lg:right-[6%] lg:bottom-[16%]", h: 44, o: 0.9, d: "1.9s", f: "2" },
];

function Light({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border border-[#ededed] bg-white p-4 shadow-[0_22px_50px_rgba(24,56,51,0.14)] ${className}`}>{children}</div>;
}
function Dark({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl p-4 text-white shadow-[0_26px_55px_rgba(24,56,51,0.3)] ${className}`} style={{ background: INK }}>{children}</div>;
}
function Photo({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/60 shadow-[0_30px_60px_rgba(24,56,51,0.22)] ${className}`}>
      <img src={PHOTO} alt="Candidate / HR" className="h-[210px] w-full object-cover object-top" />
    </div>
  );
}

type Step = {
  key: string;
  head?: React.ReactNode;
  link?: string;
  href?: string;
  widgets?: React.ReactNode;
  full?: React.ReactNode;
};

const makeSteps = (a: Auto, w: Widgets, link: (h: string) => string): Step[] => [
  {
    key: "fit",
    full: (
      <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-center gap-5 lg:block lg:h-[920px]">
        {/* ЦЕНТР — заголовок (поверх блоков) */}
        <div className="relative order-first text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:z-20 lg:w-[56rem] lg:-translate-x-1/2 lg:-translate-y-1/2">
          {/* мягкий ореол — заголовок читается поверх блоков заднего фона */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[160%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,248,243,0.92),rgba(244,248,243,0.55)_55%,rgba(244,248,243,0))] lg:block" />
          <div className="report-head relative will-change-[filter,opacity,transform]">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl" style={{ color: INK }}>
            {a.fit.pre}<span style={{ color: GREEN }}>{a.fit.accent}</span>{a.fit.post}
          </h2>
          <a href={link("/platform#block-1")} className="mt-4 inline-flex items-center gap-1.5 text-base font-medium" style={{ color: GREEN }}>
            {a.fit.link} <Arrow style={{ color: GREEN }} />
          </a>
          </div>
        </div>

        {/* Ценностное предложение — слева сверху (средний) */}
        <div data-focus="0" className="report-card w-full max-w-md lg:absolute lg:left-[1%] lg:top-[1%] lg:w-[330px] lg:max-w-none">
          <div className="rounded-3xl border border-[#e9efe6] bg-white/95 p-5 shadow-[0_20px_50px_rgba(24,56,51,0.10)]">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${GREEN}1a`, color: GREEN }}>
              <Sparkles className="h-3.5 w-3.5" /> {w.valueProp}
            </span>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: INK }}>
              {w.valuePropDesc}
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#f4f7f2] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{w.cultureType}</p>
                <p className="mt-1 text-[11px] leading-snug text-[#183833]/75">{w.cultureTypeDesc}</p>
              </div>
              <div className="rounded-2xl bg-[#f4f7f2] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{w.dominantValues}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {w.values.map((v) => (
                    <span key={v} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium shadow-[0_4px_12px_rgba(24,56,51,0.08)]" style={{ color: INK }}>{v}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Индекс уверенности — правый нижний угол (маленький) */}
        <div data-focus="2" className="report-card w-full max-w-[260px] lg:absolute lg:right-[1%] lg:bottom-[2%] lg:w-[210px] lg:max-w-none">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-[#e9efe6] bg-white/95 p-5 text-center shadow-[0_20px_50px_rgba(24,56,51,0.10)]">
            <p className="text-sm font-semibold" style={{ color: INK }}>{w.matchScore}</p>
            <div className="relative my-2.5 h-[112px] w-[112px]">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <defs>
                  <linearGradient id="confGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={TEAL} />
                    <stop offset="100%" stopColor={GREEN} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e9efe6" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#confGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="224.3 263.9" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold" style={{ color: INK }}>85%</span>
              </div>
            </div>
            <p className="text-[11px] leading-snug text-[#183833]/55">{w.matchExplain}</p>
          </div>
        </div>

        {/* Инновационность + Ориентация — вместе в левом нижнем углу */}
        <div data-focus="2" className="report-card flex w-full flex-col gap-5 lg:absolute lg:bottom-[2%] lg:left-[-3%] lg:flex-row lg:items-end lg:gap-4">
          <div className="w-full lg:w-[300px]">
          <div className="rounded-3xl border border-[#e9efe6] bg-white/95 p-4 shadow-[0_20px_50px_rgba(24,56,51,0.10)]">
            <p className="flex items-center gap-2 text-[15px] font-semibold" style={{ color: INK }}><GitBranch className="h-4 w-4" style={{ color: TEAL }} /> {w.innovation}</p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl p-2.5" style={{ background: `${GREEN}12` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: GREEN }}>{w.stated}</p>
                <p className="mt-1 text-[11px] leading-snug text-[#183833]/75">{w.innovationStated}</p>
              </div>
              <div className="rounded-xl p-2.5" style={{ background: `${TEAL}12` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: TEAL }}>{w.operationalReality}</p>
                <p className="mt-1 text-[11px] leading-snug text-[#183833]/75">{w.innovationReality}</p>
              </div>
            </div>
            <p className="mt-2.5 text-[11px] leading-snug text-[#183833]/65">{w.innovationExplain}</p>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5 border-t border-[#eef0ee] pt-2.5">
              <div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/40">{w.whyNotLower}</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{w.innovationLower}</p></div>
              <div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/40">{w.whyNotHigher}</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{w.innovationHigher}</p></div>
            </div>
          </div>
          </div>

          <div className="w-full lg:w-[300px]">
          <div className="rounded-3xl border border-[#e9efe6] bg-white/95 p-4 shadow-[0_20px_50px_rgba(24,56,51,0.10)]">
            <p className="flex items-center gap-2 text-[15px] font-semibold" style={{ color: INK }}><GitBranch className="h-4 w-4" style={{ color: TEAL }} /> {w.teamOrientation}</p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl p-2.5" style={{ background: `${GREEN}12` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: GREEN }}>{w.stated}</p>
                <p className="mt-1 text-[11px] leading-snug text-[#183833]/75">{w.teamStated}</p>
              </div>
              <div className="rounded-xl p-2.5" style={{ background: `${TEAL}12` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: TEAL }}>{w.operationalReality}</p>
                <p className="mt-1 text-[11px] leading-snug text-[#183833]/75">{w.teamReality}</p>
              </div>
            </div>
            <p className="mt-2.5 text-[11px] leading-snug text-[#183833]/65">{w.teamExplain}</p>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5 border-t border-[#eef0ee] pt-2.5">
              <div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/40">{w.whyNotLower}</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{w.teamLower}</p></div>
              <div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/40">{w.whyNotHigher}</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{w.teamHigher}</p></div>
            </div>
          </div>
          </div>
        </div>

        {/* Соответствие культурному коду — правый верхний угол (большой) */}
        <div data-focus="1" className="report-card w-full max-w-lg lg:absolute lg:right-[-3%] lg:top-[-62px] lg:w-[400px] lg:max-w-none">
          <div className="rounded-3xl border border-[#e9efe6] bg-white/95 p-5 shadow-[0_20px_50px_rgba(24,56,51,0.10)]">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 shrink-0" style={{ color: GREEN }} fill={GREEN} />
              <span className="text-[15px] font-bold" style={{ color: INK }}>{w.cultureMatch}</span>
              <span className="ml-auto rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: `${GREEN}1a`, color: GREEN }}>70%</span>
            </div>
            <div className="mt-2.5 rounded-2xl border border-[#eef0ee] bg-[#fafbf9] p-2.5 text-xs leading-snug text-[#183833]/75">
              {w.cultureMatchDesc}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> {w.alignmentPoints}</p>
                <div className="mt-2 space-y-2">
                  <div className="rounded-xl border border-[#e7f0d8] bg-[#f6faef] p-2.5">
                    <p className="text-xs font-semibold" style={{ color: INK }}>{w.align1Title}</p>
                    <p className="mt-1 text-[11px] italic leading-snug text-[#183833]/55">{w.align1Quote}</p>
                    <p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{w.align1Sub}</p>
                  </div>
                  <div className="rounded-xl border border-[#e7f0d8] bg-[#f6faef] p-2.5">
                    <p className="text-xs font-semibold" style={{ color: INK }}>{w.align2Title}</p>
                    <p className="mt-1 text-[11px] italic leading-snug text-[#183833]/55">{w.align2Quote}</p>
                    <p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{w.align2Sub}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: AMBER }}><X className="h-3.5 w-3.5" /> {w.frictionPoints}</p>
                <div className="mt-2 space-y-2">
                  <div className="rounded-xl border border-[#f3e6c7] bg-[#fdf8ee] p-2.5">
                    <p className="text-xs font-semibold" style={{ color: INK }}>{w.friction1Title}</p>
                    <p className="mt-1 text-[11px] italic leading-snug text-[#183833]/55">{w.friction1Quote}</p>
                    <p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{w.friction1Sub}</p>
                  </div>
                  <div className="rounded-xl border border-[#f3e6c7] bg-[#fdf8ee] p-2.5">
                    <p className="text-xs font-semibold" style={{ color: INK }}>{w.friction2Title}</p>
                    <p className="mt-1 text-[11px] italic leading-snug text-[#183833]/55">{w.friction2Quote}</p>
                    <p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{w.friction2Sub}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#ffd9d9] bg-[#fff5f5] px-3 py-2 text-[11px]" style={{ color: RED }}>
              <AlertTriangle className="h-4 w-4 shrink-0" /> {w.warning}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "report",
    full: (
      <div className="relative mx-auto flex w-full max-w-none flex-col items-center gap-5 lg:block lg:h-[760px]">
        {/* ЦЕНТР — заголовок (поверх блоков) */}
        <div className="relative order-first text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:z-20 lg:w-[46rem] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[170%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,248,243,0.94),rgba(244,248,243,0.55)_55%,rgba(244,248,243,0))] lg:block" />
          <div className="report-head relative will-change-[filter,opacity,transform]">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl" style={{ color: INK }}>
            {a.report.pre}<span style={{ color: GREEN }}>{a.report.accent}</span>{a.report.post}
          </h2>
          <a href={link("/platform#block-2")} className="mt-4 inline-flex items-center gap-1.5 text-base font-medium" style={{ color: GREEN }}>
            {a.report.link} <Arrow style={{ color: GREEN }} />
          </a>
          </div>
        </div>

        {/* modal — левый верхний угол */}
        <div data-focus="0" className="report-card w-full max-w-lg lg:absolute lg:left-[-52px] lg:top-[-85px] lg:w-[533px] lg:max-w-none">
          <ReportModalCard />
        </div>

        {/* candidate — правый верхний угол */}
        <div data-focus="1" className="report-card w-full max-w-md lg:absolute lg:right-[-1%] lg:top-[3%] lg:w-[420px] lg:max-w-none">
          <CandidateInfoCard />
        </div>

        {/* decision — правый нижний угол */}
        <div data-focus="2" className="report-card w-full max-w-md lg:absolute lg:right-[-1%] lg:bottom-[4%] lg:w-[420px] lg:max-w-none">
          <DecisionCard />
        </div>
      </div>
    ),
  },
  {
    key: "copilot",
    full: (
      <div className="relative mx-auto flex w-full max-w-none flex-col items-center gap-5 lg:block lg:h-[680px]">
        {/* ЦЕНТР — заголовок (поверх блоков) */}
        <div className="relative order-first text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:z-20 lg:w-[48rem] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[170%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,248,243,0.92),rgba(244,248,243,0.55)_55%,rgba(244,248,243,0))] lg:block" />
          <div className="report-head relative will-change-[filter,opacity,transform]">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl" style={{ color: INK }}>
            {a.copilot.pre}<span style={{ color: GREEN }}>{a.copilot.accent}</span>{a.copilot.post}
          </h2>
          <a href={link("/platform#block-3")} className="mt-4 inline-flex items-center gap-1.5 text-base font-medium" style={{ color: GREEN }}>
            {a.copilot.link} <Arrow style={{ color: GREEN }} />
          </a>
          </div>
        </div>

        {/* робот — левый верхний угол (картинка) */}
        <div data-focus="0" className="report-card mx-auto w-2/3 max-w-[260px] lg:absolute lg:left-[1%] lg:top-[6%] lg:mx-0 lg:w-[260px] lg:max-w-none">
          <div className="relative">
            <div className="pointer-events-none absolute inset-[14%] -z-10 rounded-full bg-[#11AFCC]/30 blur-[55px]" />
            <img src="/robot.png" alt={w.assistantAlt} className="w-full drop-shadow-[0_24px_45px_rgba(17,175,204,0.28)]" />
          </div>
        </div>

        {/* анимированный чат — правый верхний угол */}
        <div data-focus="1" className="report-card w-full max-w-sm lg:absolute lg:right-[1%] lg:top-[6%] lg:w-[340px] lg:max-w-none">
          <AnimatedChat />
        </div>

        {/* блок про ИИ — левый нижний угол */}
        <div data-focus="2" className="report-card w-full max-w-sm lg:absolute lg:bottom-[7%] lg:left-[1%] lg:w-[320px] lg:max-w-none">
          <div className="rounded-3xl border border-[#e9efe6] bg-white/95 p-5 shadow-[0_22px_50px_rgba(24,56,51,0.12)]">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: `${GREEN}1a` }}><Sparkles className="h-5 w-5" style={{ color: GREEN }} /></span>
              <p className="text-base font-semibold" style={{ color: INK }}>{w.contextNeverLost}</p>
            </div>
            <p className="mt-2.5 text-sm leading-snug text-[#183833]/65">{w.contextNeverLostDesc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f7f2] px-3 py-1.5 text-xs font-medium" style={{ color: INK }}><Zap className="h-3.5 w-3.5" style={{ color: GREEN }} /> {w.answersInSeconds}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f7f2] px-3 py-1.5 text-xs font-medium" style={{ color: INK }}><Brain className="h-3.5 w-3.5" style={{ color: TEAL }} /> {w.basedOnInterviews}</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "integrations",
    full: (
      <div className="relative mx-auto flex w-full max-w-none flex-col items-center gap-5 lg:block lg:h-[600px]">
        {/* ЦЕНТР — заголовок (поверх логотипов) */}
        <div className="relative order-first text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:z-20 lg:w-[46rem] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[170%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,248,243,0.92),rgba(244,248,243,0.55)_55%,rgba(244,248,243,0))] lg:block" />
          <div className="report-head relative will-change-[filter,opacity,transform]">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl" style={{ color: INK }}>
            {a.integrations.pre}<span style={{ color: GREEN }}>{a.integrations.accent}</span>{a.integrations.post}
          </h2>
          <a href={link("/api")} className="mt-4 inline-flex items-center gap-1.5 text-base font-medium" style={{ color: GREEN }}>
            {a.integrations.link} <Arrow style={{ color: GREEN }} />
          </a>
          </div>
        </div>

        {/* логотипы — focus-анимация (blur + scale) как на первом шаге */}
        {LOGO_SCATTER.map((g, i) => (
          <div key={i} data-focus={g.f} className={`report-card hidden lg:block lg:absolute ${g.pos}`}>
            <div className="animate-floaty" style={{ animationDelay: g.d }}>
              <img src={g.src} alt="" className="w-auto" style={{ height: g.h, opacity: g.o }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Automation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const STEPS = makeSteps(HOME[locale].auto, W[locale], (h) => localize(h, locale));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sectionRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    /* Blur-анимации при прокрутке — только десктоп (lg+).
       На мобильных блоки остаются статично видимыми: без размытия
       и без пустых «размытых» экранов при пролистывании. */
    mm.add("(min-width: 1024px)", () => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".auto-step").forEach((step) => {
        const tall = step.classList.contains("auto-step-report");

        if (tall) {
          // Заголовок остаётся в фокусе. Блоки вокруг при прокрутке сначала
          // появляются, затем по очереди теряют фокус: левый верхний → правый → нижние.
          const cards = gsap.utils.toArray<HTMLElement>(".report-card", step);
          const head = step.querySelector<HTMLElement>(".report-head");
          const grp = (o: string) => cards.filter((c) => c.dataset.focus === o);
          const tl = gsap.timeline({ scrollTrigger: { trigger: step, start: "top 72%", end: "bottom 22%", scrub: 1 } });
          tl.fromTo(cards, { filter: "blur(12px)", opacity: 0.18, scale: 0.85 }, { filter: "blur(0px)", opacity: 1, scale: 1, ease: "none", stagger: 0.12, duration: 1 }, 0);
          // центральный заголовок: проявляется и слегка увеличивается, в конце размывается и уменьшается
          if (head) tl.fromTo(head, { filter: "blur(12px)", opacity: 0.2, scale: 0.86 }, { filter: "blur(0px)", opacity: 1, scale: 1, ease: "none", duration: 1 }, 0);
          tl.to(grp("0"), { filter: "blur(12px)", opacity: 0.18, scale: 0.85, ease: "none", duration: 1 }, 2.2)
            .to(grp("1"), { filter: "blur(12px)", opacity: 0.18, scale: 0.85, ease: "none", duration: 1 }, 3.0)
            .to(grp("2"), { filter: "blur(12px)", opacity: 0.18, scale: 0.85, ease: "none", duration: 1 }, 3.8);
          if (head) tl.to(head, { filter: "blur(12px)", opacity: 0.2, scale: 0.86, ease: "none", duration: 1 }, 4.2);
          return;
        }

        gsap.fromTo(
          step,
          { filter: "blur(14px)", opacity: 0.15 },
          { filter: "blur(0px)", opacity: 1, ease: "none", scrollTrigger: { trigger: step, start: "top 85%", end: "center 56%", scrub: 1 } }
        );
        gsap.fromTo(
          step,
          { filter: "blur(0px)", opacity: 1 },
          { filter: "blur(14px)", opacity: 0.15, ease: "none", scrollTrigger: { trigger: step, start: "center 44%", end: "bottom 20%", scrub: 1 } }
        );
      });
    }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      {STEPS.map((s, i) => (
        <div
          key={s.key}
          className={`auto-step relative flex w-full items-center justify-center px-5 will-change-[filter,opacity] sm:px-6 md:px-12 ${i === STEPS.length - 1 ? "min-h-[56vh] lg:min-h-[64vh]" : i === STEPS.length - 2 ? "min-h-[70vh] lg:min-h-[84vh]" : "min-h-[80vh] lg:min-h-screen"} ${s.full ? (i === STEPS.length - 1 ? "auto-step-report pt-4 pb-16" : i === STEPS.length - 2 ? "auto-step-report pt-24 pb-6" : "auto-step-report py-24") : "overflow-hidden"}`}
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-24 top-[10%] h-[440px] w-[440px] rounded-full bg-[#7AB800]/16 blur-[140px]" />
            <div className="absolute right-[-10%] top-[22%] h-[500px] w-[500px] rounded-full bg-[#11AFCC]/14 blur-[150px]" />
          </div>

          {s.full ? (
            <div className="relative z-10 mx-auto w-full 2xl:max-w-[1600px] 3xl:max-w-[1760px]">{s.full}</div>
          ) : (
            <>
              <div className="pointer-events-none absolute inset-0 hidden lg:block">{s.widgets}</div>
              <div className="relative z-10 max-w-[52rem] text-center">
                <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl" style={{ color: INK }}>{s.head}</h2>
                <a href={s.href} className="group mt-7 inline-flex items-center gap-1.5 text-base font-medium" style={{ color: GREEN }}>
                  {s.link} <Arrow style={{ color: GREEN }} />
                </a>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
}
