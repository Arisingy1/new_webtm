"use client";

import {
  X, TrendingUp, TrendingDown, AudioLines, MessageSquareQuote,
  Check, Briefcase, Building2, Wallet, Home,
} from "lucide-react";
import { GREEN, TEAL, INK, RED } from "./ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import type { Locale } from "@/lib/i18n";

const AMBER = "#E8A317";

/* ============================================================
   Свёрстанные карточки отчёта (бывшие картинки на главной):
   • ReportModalCard — детальный разбор навыка (как модалка
     «Пример отчёта», навык «Problem solving»)
   • CandidateInfoCard — информация о кандидате
   • DecisionCard — решение о переходе на следующий этап
   ============================================================ */

/* ── данные кандидата ── */
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
    "سجل حافل مثبت في عمليات الإطلاق لدى شركات كبرى",
    "مهارات تواصل قوية والقدرة على الإقناع",
    "خبرة في بيئة منتج (التجارة الإلكترونية)",
    "مستوى عالٍ من الوعي الذاتي والتفكير المنظومي",
  ],
};
const ARGS_AGAINST: Record<Locale, string[]> = {
  en: ["High salary expectations", "Limited experience in custom/agency development"],
  es: ["Expectativas salariales altas", "Experiencia limitada en desarrollo a medida/para agencias"],
  pt: ["Expectativas salariais altas", "Experiência limitada em desenvolvimento sob medida/para agências"],
  ar: ["توقعات راتب مرتفعة", "خبرة محدودة في التطوير المخصّص/للوكالات"],
};

/* ── словарь блоков отчёта ── */
type RC = {
  skillTitle: string; skillIntro: string;
  roleExpectations: string; roleExpectationsText: string;
  gap: string; gapText: string;
  skillPct: string;
  legendGap: string; candidateLevel: string; profileRequirement: string;
  whyNotHigher: string; whyNotHigherText: string;
  whyNotLower: string; whyNotLowerText: string;
  audioMarkers: string; audioMarkersIntro: string; audioMarkerList: string[];
  quotes: string; quotesList: string[];
  candidateInfo: string;
  expLabel: string; expVal: string; compLabel: string; compVal: string;
  expectLabel: string; expectVal: string; formatLabel: string; formatVal: string;
  bio: string;
  decision: string; recommended: string; argsFor: string; argsAgainst: string;
};
const DICT: Record<Locale, RC> = {
  en: {
    skillTitle: "Problem solving",
    skillIntro: "Strong skill. Able to analyze situations and find and implement non-standard solutions (confirmed by case examples)",
    roleExpectations: "Role expectations",
    roleExpectationsText: "Requires confident command of the skill across all stages of the product lifecycle — from defining the task to implementing the solution",
    gap: "Gap",
    gapText: "A small gap. The candidate confidently handles organization and launch. A higher score would have required more data-driven case examples",
    skillPct: "Problem solving",
    legendGap: "Gap", candidateLevel: "Candidate level", profileRequirement: "Profile requirement",
    whyNotHigher: "Why not higher",
    whyNotHigherText: "He demonstrates solutions to organizational and conceptual problems, but not analytical ones (for example, \"why is conversion dropping\" or \"how to improve retention\")",
    whyNotLower: "Why not lower",
    whyNotLowerText: "Strong proactivity and focus on results. The candidate takes ownership of difficult decisions and sees them through to implementation",
    audioMarkers: "Audio markers",
    audioMarkersIntro: "When discussing solutions, he sounds confident and direct, focusing on actions and results",
    audioMarkerList: [
      "Maintains an even, businesslike pace when describing the problem and solution, reflecting a pragmatic approach",
      "Quickly moves from describing the problem to solving it — a sign of a well-developed skill",
    ],
    quotes: "Quotes",
    quotesList: [
      "They had a problem: they didn't understand how to consolidate marketing resources in that market",
      "The idea was to create a game to reduce stress for people ready to invest from another region",
      "I insisted on changing the concept",
    ],
    candidateInfo: "Candidate information",
    expLabel: "Experience", expVal: "9 years", compLabel: "Companies", compVal: "Ozon, Yandex, fintech",
    expectLabel: "Expectations", expectVal: "$2,800 (net)", formatLabel: "Format", formatVal: "hybrid / remote",
    bio: "An experienced IT project leader in e-commerce and fintech. Has managed distributed teams of up to 15 people, launched products from scratch, and scaled existing ones",
    decision: "Decision to advance to the next stage", recommended: "Recommended", argsFor: "Arguments for", argsAgainst: "Arguments against",
  },
  es: {
    skillTitle: "Resolución de problemas",
    skillIntro: "Habilidad sólida. Capaz de analizar situaciones y de encontrar e implementar soluciones no convencionales (confirmado por ejemplos de casos)",
    roleExpectations: "Expectativas del rol",
    roleExpectationsText: "Requiere un dominio seguro de la habilidad en todas las etapas del ciclo de vida del producto: desde la definición de la tarea hasta la implementación de la solución",
    gap: "Brecha",
    gapText: "Una brecha pequeña. El candidato maneja con seguridad la organización y el lanzamiento. Una puntuación más alta habría requerido más ejemplos de casos basados en datos",
    skillPct: "Resolución de problemas",
    legendGap: "Brecha", candidateLevel: "Nivel del candidato", profileRequirement: "Requisito del perfil",
    whyNotHigher: "Por qué no más alto",
    whyNotHigherText: "Demuestra soluciones a problemas organizativos y conceptuales, pero no analíticos (por ejemplo, \"por qué cae la conversión\" o \"cómo mejorar la retención\")",
    whyNotLower: "Por qué no más bajo",
    whyNotLowerText: "Fuerte proactividad y orientación a resultados. El candidato asume las decisiones difíciles y las lleva hasta su implementación",
    audioMarkers: "Marcadores de audio",
    audioMarkersIntro: "Al hablar de soluciones, suena seguro y directo, centrándose en las acciones y los resultados",
    audioMarkerList: [
      "Mantiene un ritmo uniforme y profesional al describir el problema y la solución, lo que refleja un enfoque pragmático",
      "Pasa rápidamente de describir el problema a resolverlo, señal de una habilidad bien desarrollada",
    ],
    quotes: "Citas",
    quotesList: [
      "Tenían un problema: no entendían cómo consolidar los recursos de marketing en ese mercado",
      "La idea era crear un juego para reducir el estrés de las personas dispuestas a invertir desde otra región",
      "Insistí en cambiar el concepto",
    ],
    candidateInfo: "Información del candidato",
    expLabel: "Experiencia", expVal: "9 años", compLabel: "Empresas", compVal: "Ozon, Yandex, fintech",
    expectLabel: "Expectativas", expectVal: "$2,800 (neto)", formatLabel: "Formato", formatVal: "híbrido / remoto",
    bio: "Líder de proyectos de TI con experiencia en comercio electrónico y fintech. Ha gestionado equipos distribuidos de hasta 15 personas, lanzó productos desde cero y escaló los existentes",
    decision: "Decisión de avanzar a la siguiente etapa", recommended: "Recomendado", argsFor: "Argumentos a favor", argsAgainst: "Argumentos en contra",
  },
  pt: {
    skillTitle: "Resolução de problemas",
    skillIntro: "Habilidade sólida. Capaz de analisar situações e de encontrar e implementar soluções não convencionais (confirmado por exemplos de casos)",
    roleExpectations: "Expectativas do cargo",
    roleExpectationsText: "Exige domínio seguro da habilidade em todas as etapas do ciclo de vida do produto — da definição da tarefa à implementação da solução",
    gap: "Lacuna",
    gapText: "Uma lacuna pequena. O candidato lida com segurança com a organização e o lançamento. Uma pontuação mais alta exigiria mais exemplos de casos baseados em dados",
    skillPct: "Resolução de problemas",
    legendGap: "Lacuna", candidateLevel: "Nível do candidato", profileRequirement: "Requisito do perfil",
    whyNotHigher: "Por que não mais alto",
    whyNotHigherText: "Ele demonstra soluções para problemas organizacionais e conceituais, mas não analíticos (por exemplo, \"por que a conversão está caindo\" ou \"como melhorar a retenção\")",
    whyNotLower: "Por que não mais baixo",
    whyNotLowerText: "Forte proatividade e foco em resultados. O candidato assume as decisões difíceis e as conduz até a implementação",
    audioMarkers: "Marcadores de áudio",
    audioMarkersIntro: "Ao falar de soluções, soa confiante e direto, concentrando-se nas ações e nos resultados",
    audioMarkerList: [
      "Mantém um ritmo uniforme e profissional ao descrever o problema e a solução, refletindo uma abordagem pragmática",
      "Passa rapidamente de descrever o problema para resolvê-lo — sinal de uma habilidade bem desenvolvida",
    ],
    quotes: "Citações",
    quotesList: [
      "Eles tinham um problema: não entendiam como consolidar os recursos de marketing naquele mercado",
      "A ideia era criar um jogo para reduzir o estresse de pessoas dispostas a investir de outra região",
      "Insisti em mudar o conceito",
    ],
    candidateInfo: "Informações do candidato",
    expLabel: "Experiência", expVal: "9 anos", compLabel: "Empresas", compVal: "Ozon, Yandex, fintech",
    expectLabel: "Expectativas", expectVal: "$2,800 (líquido)", formatLabel: "Formato", formatVal: "híbrido / remoto",
    bio: "Líder de projetos de TI com experiência em comércio eletrônico e fintech. Gerenciou equipes distribuídas de até 15 pessoas, lançou produtos do zero e escalou os existentes",
    decision: "Decisão de avançar para a próxima etapa", recommended: "Recomendado", argsFor: "Argumentos a favor", argsAgainst: "Argumentos contra",
  },
  ar: {
    skillTitle: "حل المشكلات",
    skillIntro: "مهارة قوية. قادر على تحليل المواقف وإيجاد حلول غير تقليدية وتنفيذها (مؤكَّد بأمثلة من الحالات)",
    roleExpectations: "توقعات الدور",
    roleExpectationsText: "يتطلّب إتقانًا واثقًا للمهارة عبر جميع مراحل دورة حياة المنتج، من تحديد المهمة إلى تنفيذ الحل",
    gap: "الفجوة",
    gapText: "فجوة صغيرة. يتعامل المرشّح بثقة مع التنظيم والإطلاق. كانت الدرجة الأعلى ستتطلّب مزيدًا من أمثلة الحالات المعتمدة على البيانات",
    skillPct: "حل المشكلات",
    legendGap: "الفجوة", candidateLevel: "مستوى المرشّح", profileRequirement: "متطلب الملف",
    whyNotHigher: "لماذا ليست أعلى",
    whyNotHigherText: "يُظهر حلولًا للمشكلات التنظيمية والمفاهيمية، لكن ليس التحليلية (على سبيل المثال، \"لماذا ينخفض معدل التحويل\" أو \"كيف نحسّن الاحتفاظ\")",
    whyNotLower: "لماذا ليست أدنى",
    whyNotLowerText: "مبادرة قوية وتركيز على النتائج. يتحمّل المرشّح مسؤولية القرارات الصعبة ويقودها حتى التنفيذ",
    audioMarkers: "مؤشرات صوتية",
    audioMarkersIntro: "عند مناقشة الحلول، يبدو واثقًا ومباشرًا، مركّزًا على الإجراءات والنتائج",
    audioMarkerList: [
      "يحافظ على وتيرة متساوية وعملية عند وصف المشكلة والحل، ما يعكس نهجًا براغماتيًا",
      "ينتقل بسرعة من وصف المشكلة إلى حلّها، وهو دليل على مهارة متطورة جيدًا",
    ],
    quotes: "اقتباسات",
    quotesList: [
      "كانت لديهم مشكلة: لم يفهموا كيفية توحيد الموارد التسويقية في ذلك السوق",
      "كانت الفكرة إنشاء لعبة للحدّ من التوتر لدى الأشخاص المستعدّين للاستثمار من منطقة أخرى",
      "أصررت على تغيير المفهوم",
    ],
    candidateInfo: "معلومات المرشّح",
    expLabel: "الخبرة", expVal: "9 سنوات", compLabel: "الشركات", compVal: "Ozon, Yandex, fintech",
    expectLabel: "التوقعات", expectVal: "$2,800 (صافٍ)", formatLabel: "نمط العمل", formatVal: "هجين / عن بُعد",
    bio: "قائد مشاريع تقنية معلومات ذو خبرة في التجارة الإلكترونية والتقنية المالية. أدار فرقًا موزّعة يصل عددها إلى 15 شخصًا، وأطلق منتجات من الصفر ووسّع المنتجات القائمة",
    decision: "قرار الترشيح للمرحلة التالية", recommended: "موصى به", argsFor: "حجج مؤيدة", argsAgainst: "حجج معارِضة",
  },
};

/* =====================  ЛЕВЫЙ СКРИН — модалка разбора навыка  ===================== */
export function ReportModalCard() {
  const t = DICT[useLocale()];
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#e6ece4] bg-white p-4 shadow-[0_24px_60px_rgba(24,56,51,0.16)] md:p-5"
      style={{ zoom: 1 / (1.4 * 1.3) } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight" style={{ color: INK }}>{t.skillTitle}</h3>
          <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-[#183833]/65">
            {t.skillIntro}
          </p>
        </div>
        <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#e6ece4] text-[#183833]/45">
          <X className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* role expectations + gap */}
        <div className="space-y-3">
          <SoftCard t={t.roleExpectations} text={t.roleExpectationsText} />
          <SoftCard t={t.gap} text={t.gapText} />
        </div>
        {/* cone diagram */}
        <div className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[#e6ece4] bg-gradient-to-br from-[#f7fbf0] via-white to-[#eef7e0] p-4">
          <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#7AB800]/12 blur-3xl" />
          <p className="relative text-sm font-semibold" style={{ color: INK }}>
            {t.skillPct} <span className="ml-1 text-xl font-bold" style={{ color: GREEN }}>82%</span>
          </p>
          <div className="relative mx-auto"><ConeChart val={82} req={86} color={GREEN} /></div>
          <div className="relative space-y-2 text-xs">
            <LegendRow c="#bfe3ec" t={t.legendGap} v="-4%" vc={RED} />
            <LegendRow c={GREEN} t={t.candidateLevel} v="82%" />
            <LegendRow c="#d6ebf2" t={t.profileRequirement} v="86%" />
          </div>
        </div>
      </div>

      {/* why not higher / lower */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#fff5f5] p-4">
          <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: RED }}><TrendingDown className="h-4 w-4" /> {t.whyNotHigher}</p>
          <p className="mt-2 text-sm leading-snug text-[#183833]/70">
            {t.whyNotHigherText}
          </p>
        </div>
        <div className="rounded-2xl bg-[#f3faea] p-4">
          <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: GREEN }}><TrendingUp className="h-4 w-4" /> {t.whyNotLower}</p>
          <p className="mt-2 text-sm leading-snug text-[#183833]/70">
            {t.whyNotLowerText}
          </p>
        </div>
      </div>

      {/* audio markers */}
      <div className="mt-4 rounded-2xl bg-[#f6faef] p-4">
        <p className="text-sm font-bold" style={{ color: INK }}>{t.audioMarkers}</p>
        <p className="mt-1 text-xs text-[#183833]/55">{t.audioMarkersIntro}</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {t.audioMarkerList.map((m) => (
            <div key={m} className="flex items-start gap-2"><AudioLines className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><span className="text-xs leading-snug text-[#183833]/65">{m}</span></div>
          ))}
        </div>
      </div>

      {/* quotes */}
      <div className="mt-4 rounded-2xl bg-[#f6faef] p-4">
        <p className="text-sm font-bold" style={{ color: INK }}>{t.quotes}</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {t.quotesList.map((q) => (
            <div key={q} className="flex items-start gap-2"><MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><span className="text-xs italic leading-snug text-[#183833]/60">{q}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =====================  ПРАВЫЙ ВЕРХ — информация о кандидате  ===================== */
export function CandidateInfoCard() {
  const t = DICT[useLocale()];
  return (
    <div className="rounded-3xl border border-[#e6ece4] bg-white p-5 shadow-[0_24px_60px_rgba(24,56,51,0.16)]">
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
    </div>
  );
}

/* =====================  ПРАВЫЙ НИЗ — решение о переходе  ===================== */
export function DecisionCard() {
  const loc = useLocale();
  const t = DICT[loc];
  return (
    <div className="rounded-3xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] to-[#eef7e0] p-5 shadow-[0_24px_60px_rgba(24,56,51,0.16)]">
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
  );
}

/* ── мелкие помощники ── */
function SoftCard({ t, text }: { t: string; text: string }) {
  return <div className="rounded-2xl bg-[#f6faef] p-4"><p className="text-sm font-bold" style={{ color: INK }}>{t}</p><p className="mt-1.5 text-xs leading-snug text-[#183833]/70">{text}</p></div>;
}
function Info({ icon, t, v }: { icon: React.ReactNode; t: string; v: string }) {
  return <div className="flex items-start gap-2"><span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f4f7f2] text-[#7AB800]">{icon}</span><div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{t}</p><p className="text-xs font-medium">{v}</p></div></div>;
}
function LegendRow({ c, t, v, vc }: { c: string; t: string; v: string; vc?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-[#183833]/70"><span className="h-3 w-3 rounded-sm" style={{ background: c }} /> {t}</span>
      <span className="font-bold tabular-nums" style={{ color: vc || INK }}>{v}</span>
    </div>
  );
}

/* оттенки конуса по уровню */
const CONE_SHADES: Record<string, [string, string, string]> = {
  [GREEN]: ["#a4d44a", "#7AB800", "#5f9b00"],
  [AMBER]: ["#f6cf63", "#E8A317", "#bd840c"],
  [RED]: ["#ff8f8f", "#FF5252", "#dd3b3b"],
};
/* конусная диаграмма уровня (цвет и длина по проценту) */
function ConeChart({ val, req, color }: { val: number; req: number; color: string }) {
  const W = 196, H = 132, cy = H / 2, x0 = 16, x1 = W - 16, maxH = H - 26;
  const Lfull = x1 - x0, half = maxH / 2;
  const [c0, c1, c2] = CONE_SHADES[color] ?? CONE_SHADES[GREEN];
  const xv = x0 + (val / 100) * Lfull, hv = (val / 100) * half;
  const xr = x0 + (req / 100) * Lfull, hr = (req / 100) * half;
  const gid = "rcConeFill", fid = "rcConeGlow";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[112px] w-[168px] shrink-0 overflow-visible">
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
      <polygon points={`${x0},${cy} ${xr},${cy - hr} ${xr},${cy + hr}`} fill="#bfe3ec" fillOpacity="0.16" stroke="#a9d8e6" strokeWidth="1.8" strokeDasharray="4 4" strokeLinejoin="round" />
      <line x1={xr} y1={cy - hr} x2={xr} y2={cy + hr} stroke="#a9d8e6" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="4 4" />
      <g>
        <polygon points={`${x0},${cy} ${xv},${cy - hv} ${xv},${cy + hv}`} fill={`url(#${gid})`} filter={`url(#${fid})`} strokeLinejoin="round" />
        <line x1={xv} y1={cy - hv} x2={xv} y2={cy + hv} stroke={c2} strokeWidth="3" strokeLinecap="round" />
      </g>
      <circle cx={x0} cy={cy} r="3.4" fill={c2} />
    </svg>
  );
}
