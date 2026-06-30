"use client";

import { LayoutGrid, Users, BarChart3, FileText, Settings } from "lucide-react";
import { GREEN, TEAL, INK } from "./ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import type { Locale } from "@/lib/i18n";

/* ============================================================
   «Результаты сравнения» — живой превью-экран платформы:
   боковая панель + список кандидатов с оценкой совместимости.
   ============================================================ */
const AMBER = "#E8A317";

type Cand = { name: string; v: number; d: string };
/* имена кандидатов не переводятся; v — число; описания d — по локали */
const CAND_BASE: { name: string; v: number }[] = [
  { name: "Dmitry Smirnov", v: 88 },
  { name: "Sofia Kovaleva", v: 82 },
  { name: "Egor Morozov", v: 80 },
  { name: "Anna Sokolova", v: 78 },
  { name: "Maxim Orlov", v: 76 },
  { name: "Maria Lebedeva", v: 60 },
  { name: "Pavel Novikov", v: 58 },
];
const CAND_DESC: Record<Locale, string[]> = {
  en: [
    "Strong T-shaped profile: deep expertise in project management plus a broad set of competencies. Solves problems and adapts quickly.",
    "Well-rounded skill set that combines fundamental knowledge with diverse domains. Communicates ideas clearly and gets things done effectively.",
    "Versatile profile that pairs a solid foundation with new domains. Forward-looking mindset and a drive to grow.",
    "Combines general knowledge with a broad range of competencies. Articulates thoughts clearly and adapts flexibly to new environments.",
    "Broad skill set and varied experience. Expresses ideas clearly and handles complex tasks.",
    "Versatile skill set that blends deep knowledge with a wide range of abilities. Articulates ideas effectively.",
    "Diverse skill set that combines general knowledge with different domains. Solves practical tasks effectively.",
  ],
  es: [
    "Sólido perfil en forma de T: profunda experiencia en gestión de proyectos más un amplio conjunto de competencias. Resuelve problemas y se adapta con rapidez.",
    "Conjunto de habilidades completo que combina conocimientos fundamentales con diversos ámbitos. Comunica las ideas con claridad y ejecuta con eficacia.",
    "Perfil versátil que combina una base sólida con nuevos ámbitos. Mentalidad orientada al futuro y afán de crecer.",
    "Combina conocimientos generales con una amplia gama de competencias. Articula sus ideas con claridad y se adapta con flexibilidad a nuevos entornos.",
    "Amplio conjunto de habilidades y experiencia variada. Expresa las ideas con claridad y aborda tareas complejas.",
    "Conjunto de habilidades versátil que combina conocimientos profundos con una amplia gama de capacidades. Articula sus ideas con eficacia.",
    "Conjunto de habilidades diverso que combina conocimientos generales con distintos ámbitos. Resuelve tareas prácticas con eficacia.",
  ],
  pt: [
    "Sólido perfil em forma de T: profunda experiência em gestão de projetos mais um amplo conjunto de competências. Resolve problemas e se adapta com rapidez.",
    "Conjunto de habilidades completo que combina conhecimentos fundamentais com diversos domínios. Comunica as ideias com clareza e executa com eficácia.",
    "Perfil versátil que combina uma base sólida com novos domínios. Mentalidade voltada para o futuro e vontade de crescer.",
    "Combina conhecimentos gerais com uma ampla gama de competências. Articula suas ideias com clareza e se adapta com flexibilidade a novos ambientes.",
    "Amplo conjunto de habilidades e experiência variada. Expressa as ideias com clareza e lida com tarefas complexas.",
    "Conjunto de habilidades versátil que combina conhecimentos profundos com uma ampla gama de capacidades. Articula suas ideias com eficácia.",
    "Conjunto de habilidades diverso que combina conhecimentos gerais com diferentes domínios. Resolve tarefas práticas com eficácia.",
  ],
  ar: [
    "ملف قوي على شكل حرف T: خبرة عميقة في إدارة المشاريع إلى جانب مجموعة واسعة من الكفاءات. يحلّ المشكلات ويتكيّف بسرعة.",
    "مجموعة مهارات متكاملة تجمع بين المعرفة الأساسية ومجالات متنوعة. يوصِل أفكاره بوضوح ويُنجز المهام بفعالية.",
    "ملف متعدد الاستخدامات يجمع بين أساس متين ومجالات جديدة. عقلية استشرافية ودافع للنمو.",
    "يجمع بين المعرفة العامة ومجموعة واسعة من الكفاءات. يعبّر عن أفكاره بوضوح ويتكيّف بمرونة مع البيئات الجديدة.",
    "مجموعة مهارات واسعة وخبرة متنوعة. يعبّر عن أفكاره بوضوح ويتعامل مع المهام المعقّدة.",
    "مجموعة مهارات متعددة الاستخدامات تمزج بين المعرفة العميقة ومجموعة واسعة من القدرات. يعبّر عن أفكاره بفعالية.",
    "مجموعة مهارات متنوعة تجمع بين المعرفة العامة ومجالات مختلفة. يحلّ المهام العملية بفعالية.",
  ],
};
const UI: Record<Locale, { results: string; candidates: string; interview: string; details: string }> = {
  en: { results: "Comparison results", candidates: "7 candidates", interview: "Interview", details: "Details →" },
  es: { results: "Resultados de la comparación", candidates: "7 candidatos", interview: "Entrevista", details: "Detalles →" },
  pt: { results: "Resultados da comparação", candidates: "7 candidatos", interview: "Entrevista", details: "Detalhes →" },
  ar: { results: "نتائج المقارنة", candidates: "7 مرشّحين", interview: "المقابلة", details: "التفاصيل" },
};
const col = (v: number) => (v >= 70 ? GREEN : AMBER);

function Pct({ v }: { v: number }) {
  return <span className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: col(v) }}>{v}%</span>;
}
function Interview({ label }: { label: string }) {
  return <span className="rounded-md px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${TEAL}14`, color: TEAL }}>{label}</span>;
}
function More({ label }: { label: string }) {
  return <span className="inline-flex items-center gap-1 text-[11px] font-semibold" style={{ color: GREEN }}>{label}</span>;
}

export function ComparisonPanel() {
  const loc = useLocale();
  const ui = UI[loc];
  const CANDS: Cand[] = CAND_BASE.map((c, i) => ({ ...c, d: CAND_DESC[loc][i] }));
  return (
    <div className="flex h-full overflow-hidden rounded-3xl border border-[#e9efe6] bg-white shadow-[0_28px_60px_rgba(24,56,51,0.16)]">
      {/* боковая панель */}
      <div className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-[#eef0ee] bg-[#fafcf8] py-4 sm:flex">
        <img src="/logo-sign.svg" alt="" className="h-7 w-7" />
        <div className="mt-3 flex flex-col items-center gap-2.5">
          {[LayoutGrid, Users, BarChart3, FileText].map((Icon, i) => (
            <span key={i} className={`grid h-8 w-8 place-items-center rounded-xl ${i === 1 ? "" : ""}`} style={i === 1 ? { background: `${GREEN}1a`, color: GREEN } : { color: "#9fb0a6" }}>
              <Icon className="h-4 w-4" />
            </span>
          ))}
        </div>
        <span className="mt-auto grid h-8 w-8 place-items-center rounded-xl text-[#9fb0a6]"><Settings className="h-4 w-4" /></span>
      </div>

      {/* контент */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#eef0ee] px-5 py-3.5">
          <p className="text-base font-bold" style={{ color: INK }}>{ui.results}</p>
          <span className="rounded-full bg-[#f4f7f2] px-2.5 py-1 text-[10px] font-semibold text-[#183833]/55">{ui.candidates}</span>
        </div>

        <div className="px-4 py-4">
          {/* топ-3 в ряд */}
          <div className="grid grid-cols-3 gap-2.5">
            {CANDS.slice(0, 3).map((c) => (
              <div key={c.name} className="relative rounded-2xl border border-[#eef0ee] bg-white p-3 shadow-[0_6px_18px_rgba(24,56,51,0.05)]">
                <span className="absolute right-2.5 top-2.5 rounded-md bg-[#eef2ec] px-1.5 py-0.5 text-[8px] font-bold text-[#183833]/45">AI</span>
                <div className="flex items-center gap-1.5"><Pct v={c.v} /><Interview label={ui.interview} /></div>
                <p className="mt-2 text-[13px] font-bold leading-tight" style={{ color: INK }}>{c.name}</p>
                <p className="mt-1 line-clamp-3 text-[10.5px] leading-snug text-[#183833]/55">{c.d}</p>
                <div className="mt-2.5"><More label={ui.details} /></div>
              </div>
            ))}
          </div>

          {/* остальные — строки */}
          <div className="mt-3 space-y-2.5">
            {CANDS.slice(3).map((c) => (
              <div key={c.name} className="relative rounded-2xl border border-[#eef0ee] bg-white p-3 shadow-[0_6px_18px_rgba(24,56,51,0.04)]">
                <span className="absolute right-3 top-3 rounded-md bg-[#eef2ec] px-1.5 py-0.5 text-[8px] font-bold text-[#183833]/45">AI</span>
                <div className="flex items-center gap-2"><Pct v={c.v} /><p className="text-[13px] font-bold" style={{ color: INK }}>{c.name}</p><Interview label={ui.interview} /></div>
                <p className="mt-1.5 line-clamp-2 pr-8 text-[11px] leading-snug text-[#183833]/55">{c.d}</p>
                <div className="mt-2 flex justify-end"><More label={ui.details} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
