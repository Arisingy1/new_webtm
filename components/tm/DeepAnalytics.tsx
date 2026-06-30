"use client";

import { useEffect, useRef } from "react";
import { Brain, LayoutGrid, HeartHandshake, ShieldAlert, Flame, Crown, GraduationCap } from "lucide-react";
import { GREEN, INK, TEAL } from "./ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import type { Locale } from "@/lib/i18n";

/* ============================================================
   «Глубокая аналитика» — scroll-linked sticky-секция.
   Внешний контейнер h-[300vh]; внутри sticky top-0 h-screen.
   По прогрессу скролла (0→1):
     • слова «Глубокая» / «аналитика» разъезжаются влево/вправо
     • в центр снизу всплывают карточки (fade + translateY)
     • далее карточки горизонтально пролистываются
   Трансформации пишутся напрямую в style рефов (rAF) — плавно,
   без ре-рендеров.
   ============================================================ */

/* icons/colors are locale-independent; text is zipped by index from DICT */
const CARD_BASE = [
  { icon: <Brain className="h-6 w-6" />, a: GREEN },
  { icon: <LayoutGrid className="h-6 w-6" />, a: TEAL },
  { icon: <HeartHandshake className="h-6 w-6" />, a: GREEN },
  { icon: <ShieldAlert className="h-6 w-6" />, a: TEAL },
  { icon: <Flame className="h-6 w-6" />, a: GREEN },
  { icon: <Crown className="h-6 w-6" />, a: TEAL },
  { icon: <GraduationCap className="h-6 w-6" />, a: GREEN },
];

type Card = { title: string; text: string };
type Dict = { titleLeft: string; titleRight: string; cards: Card[] };

const DICT: Record<Locale, Dict> = {
  en: {
    titleLeft: "Deep",
    titleRight: "analytics",
    cards: [
      {
        title: "Psycholinguistic scoring",
        text: "AI analyzes not only WHAT a candidate says, but HOW. The system uncovers hidden patterns of leadership, stress resilience, or a tendency toward burnout straight from the interview transcript",
      },
      {
        title: "Competency heatmap",
        text: "Instantly maps an applicant's skills against the ideal role profile. You immediately see gaps in hard and soft skills without additional testing",
      },
      {
        title: "Cultural-code fit (Fit Score)",
        text: "Measures how closely a candidate shares your team's values. AI predicts how quickly they will adapt and the risk of conflict within the team",
      },
      {
        title: "Toxicity & risk detector",
        text: "Automatically highlights “red flags” in answers: avoiding responsibility, negativity toward former employers, or distortion of facts",
      },
      {
        title: "Burnout forecast (Burnout Index)",
        text: "By analyzing speech pace, pauses, and fatigue markers, AI identifies candidates on the verge of burnout even before hiring",
      },
      {
        title: "Leadership matrix",
        text: "Assesses an applicant's potential to lead a team. AI captures marker words for initiative, responsibility, and the ability to resolve conflicts",
      },
      {
        title: "Learning agility index (Learning Agility)",
        text: "How quickly can a candidate absorb new information? The algorithm analyzes flexibility of thinking and reactions to non-standard questions",
      },
    ],
  },
  es: {
    titleLeft: "Análisis",
    titleRight: "profundo",
    cards: [
      {
        title: "Puntuación psicolingüística",
        text: "La IA analiza no solo QUÉ dice un candidato, sino CÓMO lo dice. El sistema revela patrones ocultos de liderazgo, resistencia al estrés o una tendencia al burnout directamente desde la transcripción de la entrevista",
      },
      {
        title: "Mapa de calor de competencias",
        text: "Compara al instante las habilidades del candidato con el perfil ideal del puesto. Detectas de inmediato las brechas en habilidades técnicas y blandas (soft skills) sin pruebas adicionales",
      },
      {
        title: "Ajuste al código cultural (Fit Score)",
        text: "Mide hasta qué punto un candidato comparte los valores de tu equipo. La IA predice con qué rapidez se adaptará y el riesgo de conflicto dentro del equipo",
      },
      {
        title: "Detector de toxicidad y riesgos",
        text: "Resalta automáticamente las “señales de alerta” en las respuestas: evasión de responsabilidad, negatividad hacia antiguos empleadores o distorsión de los hechos",
      },
      {
        title: "Pronóstico de burnout (Burnout Index)",
        text: "Al analizar el ritmo del habla, las pausas y los marcadores de fatiga, la IA identifica a los candidatos al borde del burnout incluso antes de contratarlos",
      },
      {
        title: "Matriz de liderazgo",
        text: "Evalúa el potencial de un candidato para liderar un equipo. La IA capta palabras marcadoras de iniciativa, responsabilidad y la capacidad de resolver conflictos",
      },
      {
        title: "Índice de agilidad de aprendizaje (Learning Agility)",
        text: "¿Con qué rapidez puede un candidato asimilar nueva información? El algoritmo analiza la flexibilidad de pensamiento y las reacciones ante preguntas poco convencionales",
      },
    ],
  },
  pt: {
    titleLeft: "Análise",
    titleRight: "profunda",
    cards: [
      {
        title: "Pontuação psicolinguística",
        text: "A IA analisa não apenas O QUE um candidato diz, mas COMO. O sistema revela padrões ocultos de liderança, resiliência ao estresse ou uma tendência ao burnout diretamente a partir da transcrição da entrevista",
      },
      {
        title: "Mapa de calor de competências",
        text: "Compara instantaneamente as habilidades do candidato com o perfil ideal da vaga. Você identifica de imediato as lacunas em habilidades técnicas e comportamentais (soft skills) sem testes adicionais",
      },
      {
        title: "Compatibilidade com o código cultural (Fit Score)",
        text: "Mede o quanto um candidato compartilha os valores da sua equipe. A IA prevê com que rapidez ele se adaptará e o risco de conflito dentro da equipe",
      },
      {
        title: "Detector de toxicidade e riscos",
        text: "Destaca automaticamente os “sinais de alerta” nas respostas: fuga de responsabilidade, negatividade em relação a antigos empregadores ou distorção dos fatos",
      },
      {
        title: "Previsão de burnout (Burnout Index)",
        text: "Ao analisar o ritmo da fala, as pausas e os marcadores de fadiga, a IA identifica candidatos à beira do burnout antes mesmo da contratação",
      },
      {
        title: "Matriz de liderança",
        text: "Avalia o potencial de um candidato para liderar uma equipe. A IA capta palavras-marcadoras de iniciativa, responsabilidade e a capacidade de resolver conflitos",
      },
      {
        title: "Índice de agilidade de aprendizagem (Learning Agility)",
        text: "Com que rapidez um candidato consegue absorver novas informações? O algoritmo analisa a flexibilidade de pensamento e as reações a perguntas fora do padrão",
      },
    ],
  },
  ar: {
    titleLeft: "تحليلات",
    titleRight: "معمّقة",
    cards: [
      {
        title: "التقييم اللغوي النفسي",
        text: "يحلّل الذكاء الاصطناعي ليس فقط ما يقوله المرشّح، بل كيف يقوله. يكشف النظام أنماطًا خفية للقيادة أو الصمود أمام الضغط أو الميل إلى الاحتراق الوظيفي مباشرةً من نص المقابلة",
      },
      {
        title: "خريطة حرارية للكفاءات",
        text: "تقارن على الفور مهارات المتقدّم مع الملف المثالي للوظيفة. ترى فورًا الفجوات في المهارات التقنية والشخصية دون اختبارات إضافية",
      },
      {
        title: "التوافق مع الشيفرة الثقافية (Fit Score)",
        text: "يقيس مدى مشاركة المرشّح لقيم فريقك. يتنبّأ الذكاء الاصطناعي بمدى سرعة تكيّفه ومخاطر نشوب خلاف داخل الفريق",
      },
      {
        title: "كاشف السمّية والمخاطر",
        text: "يبرز تلقائيًا «العلامات الحمراء» في الإجابات: التهرّب من المسؤولية أو السلبية تجاه أصحاب العمل السابقين أو تحريف الحقائق",
      },
      {
        title: "توقّع الاحتراق الوظيفي (Burnout Index)",
        text: "من خلال تحليل وتيرة الكلام والتوقّفات ومؤشّرات الإرهاق، يحدّد الذكاء الاصطناعي المرشّحين على حافة الاحتراق الوظيفي حتى قبل التوظيف",
      },
      {
        title: "مصفوفة القيادة",
        text: "تقيّم قدرة المتقدّم على قيادة فريق. يلتقط الذكاء الاصطناعي الكلمات الدالة على المبادرة والمسؤولية والقدرة على حلّ الخلافات",
      },
      {
        title: "مؤشّر رشاقة التعلّم (Learning Agility)",
        text: "ما مدى سرعة استيعاب المرشّح للمعلومات الجديدة؟ تحلّل الخوارزمية مرونة التفكير وردود الأفعال تجاه الأسئلة غير التقليدية",
      },
    ],
  },
};

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);

export default function DeepAnalytics() {
  const t = DICT[useLocale()];
  const cards = CARD_BASE.map((b, i) => ({ ...b, ...t.cards[i] }));
  const outerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = outer.getBoundingClientRect();
      const total = outer.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total) : 0;

      // фазы
      const split = clamp(p / 0.3); // 0..0.30 — разъезд слов
      const rise = clamp((p - 0.12) / 0.26); // всплытие карточек
      const horiz = clamp((p - 0.42) / 0.55); // горизонтальный пролистывание

      const vw = window.innerWidth;
      const shift = vw * 0.58;
      if (leftRef.current) leftRef.current.style.transform = `translateX(${(-split * shift).toFixed(1)}px)`;
      if (rightRef.current) rightRef.current.style.transform = `translateX(${(split * shift).toFixed(1)}px)`;
      if (leftRef.current) leftRef.current.style.opacity = String((1 - split * 0.35).toFixed(2));
      if (rightRef.current) rightRef.current.style.opacity = String((1 - split * 0.35).toFixed(2));

      if (wrapRef.current) {
        wrapRef.current.style.opacity = rise.toFixed(2);
        wrapRef.current.style.transform = `translateY(${((1 - rise) * 70).toFixed(1)}px)`;
      }
      if (trackRef.current && containerRef.current) {
        const scrollable = Math.max(trackRef.current.scrollWidth - containerRef.current.clientWidth, 0);
        trackRef.current.style.transform = `translateX(${(-horiz * scrollable).toFixed(1)}px)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={outerRef} className="relative w-full" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-white">
        {/* мягкое свечение фона */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-[#7AB800]/10 blur-[150px]" />
          <div className="absolute right-0 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[#11AFCC]/10 blur-[160px]" />
        </div>

        {/* разъезжающийся заголовок */}
        <h2 className="pointer-events-none relative z-0 flex select-none items-center justify-center gap-3 whitespace-nowrap text-4xl font-bold leading-none tracking-tight sm:gap-5 sm:text-6xl lg:text-7xl">
          <span ref={leftRef} className="will-change-transform" style={{ color: INK }}>{t.titleLeft}</span>
          <span ref={rightRef} className="will-change-transform" style={{ color: GREEN }}>{t.titleRight}</span>
        </h2>

        {/* всплывающие карточки + горизонтальный скролл */}
        <div ref={wrapRef} className="absolute inset-0 z-10 flex items-center opacity-0">
          <div ref={containerRef} className="w-full overflow-hidden px-4 py-10 md:px-10">
            <div ref={trackRef} className="flex gap-8 px-2 will-change-transform">
              {cards.map((c) => (
                <article
                  key={c.title}
                  className="ease-smooth flex w-[320px] shrink-0 flex-col rounded-3xl border border-[#ededed] bg-white p-9 shadow-[0_24px_60px_rgba(24,56,51,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_36px_80px_rgba(24,56,51,0.16)] sm:w-[380px]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: c.a }}>
                    {c.icon}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight" style={{ color: INK }}>
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#183833]/70">{c.text}</p>
                </article>
              ))}
              {/* хвостовой отступ, чтобы последняя карточка доезжала красиво */}
              <div className="w-6 shrink-0 md:w-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
