"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dna, Check, AlertTriangle, Target, ChevronRight } from "lucide-react";
import { useLocale } from "@/components/tm/LocaleProvider";
import { BLOCKS } from "@/lib/content/blocks";
import type { Locale } from "@/lib/i18n";

/* ── палитра бренда TalentMind ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const AMBER = "#E8A317";

/* ============================================================
   CultureSections — контентные блоки страницы «Корпоративная
   культура» без hero и CTA. Переиспользуется на /culture и на
   /platform.
   • Блок «ДНК компании» — появляется параллаксом.
   • «Анализируемые параметры» — лёгкий интерактивный обозреватель
     по 8 измерениям OCP (без pin-скролла и тяжёлых пер-кадровых
     вычислений — только CSS-переходы).
   ============================================================ */

/* измерения OCP: ключ → [подпись, цвет] (порядок = порядок в UI) */
const DIM_ORDER = ["inno", "stab", "people", "result", "detail", "team", "aggr", "cross"] as const;
type DimKey = (typeof DIM_ORDER)[number];
const DIM: Record<DimKey, [string, string]> = {
  inno: ["Innovation", "#7AB800"],
  stab: ["Stability", "#11AFCC"],
  people: ["People orientation", "#E8A317"],
  result: ["Results orientation", "#FF6B57"],
  detail: ["Attention to detail", "#2E9E8F"],
  team: ["Team orientation", "#5BA528"],
  aggr: ["Competitiveness", "#E07B39"],
  cross: ["Culture profile", "#5B8BB0"],
};

type P = { n: number; ru: string; dim: DimKey; find: string };

/* базовые (не зависящие от языка) поля параметров — порядок фиксирован */
const PARAM_BASE: { n: number; dim: DimKey }[] = [
  { n: 1, dim: "inno" },
  { n: 2, dim: "inno" },
  { n: 3, dim: "inno" },
  { n: 4, dim: "inno" },
  { n: 5, dim: "inno" },
  { n: 6, dim: "inno" },
  { n: 7, dim: "inno" },
  { n: 8, dim: "stab" },
  { n: 9, dim: "stab" },
  { n: 10, dim: "stab" },
  { n: 11, dim: "stab" },
  { n: 12, dim: "stab" },
  { n: 13, dim: "stab" },
  { n: 14, dim: "people" },
  { n: 15, dim: "people" },
  { n: 16, dim: "people" },
  { n: 17, dim: "people" },
  { n: 18, dim: "people" },
  { n: 19, dim: "people" },
  { n: 20, dim: "people" },
  { n: 21, dim: "result" },
  { n: 22, dim: "result" },
  { n: 23, dim: "result" },
  { n: 24, dim: "result" },
  { n: 25, dim: "result" },
  { n: 26, dim: "result" },
  { n: 27, dim: "result" },
  { n: 28, dim: "detail" },
  { n: 29, dim: "detail" },
  { n: 30, dim: "detail" },
  { n: 31, dim: "detail" },
  { n: 32, dim: "team" },
  { n: 33, dim: "team" },
  { n: 34, dim: "team" },
  { n: 35, dim: "team" },
  { n: 36, dim: "team" },
  { n: 37, dim: "aggr" },
  { n: 38, dim: "aggr" },
  { n: 39, dim: "aggr" },
  { n: 40, dim: "aggr" },
  { n: 41, dim: "aggr" },
  { n: 42, dim: "aggr" },
  { n: 43, dim: "aggr" },
  { n: 44, dim: "cross" },
  { n: 45, dim: "cross" },
  { n: 46, dim: "cross" },
  { n: 47, dim: "cross" },
  { n: 48, dim: "cross" },
  { n: 49, dim: "cross" },
  { n: 50, dim: "cross" },
  { n: 51, dim: "cross" },
  { n: 52, dim: "cross" },
  { n: 53, dim: "cross" },
  { n: 54, dim: "cross" },
];

/* локализуемый текст параметров (name = название, find = описание) — тот же порядок, 54 записи на язык */
const PARAM_TEXT: Record<Locale, { name: string; find: string }[]> = {
  en: [
    { name: "Flexibility", find: "Willingness to adapt approaches, processes and structures to new conditions" },
    { name: "Adaptability", find: "A positive attitude toward change and the ability to reinvent" },
    { name: "Innovation", find: "Emphasis on creating new things, original solutions and R&D" },
    { name: "Seizing opportunities", find: "Speed of response to market signals and proactivity" },
    { name: "Openness to experimentation", find: "A culture of A/B testing, prototyping and MVPs" },
    { name: "Risk appetite", find: "Decision-making under uncertainty and tolerance for failure" },
    { name: "Few rigid constraints", find: "Minimal bureaucracy, trust and autonomy" },
    { name: "Stability", find: "Resilience, long-term planning and low turnover" },
    { name: "Predictability", find: "Clear processes, guidelines and well-defined expectations" },
    { name: "Prudence", find: "A measured approach, risk management and due diligence" },
    { name: "Rule orientation", find: "Adherence to procedures, compliance and standardization" },
    { name: "Job security", find: "Low turnover and care for career growth" },
    { name: "Low conflict levels", find: "A harmonious atmosphere that avoids open confrontation" },
    { name: "Fairness", find: "Equal opportunities, transparent criteria and no favoritism" },
    { name: "Respect for individual rights", find: "Personal boundaries, work-life balance and an individual approach" },
    { name: "Tolerance", find: "Acceptance of differences and openness to diverse viewpoints" },
    { name: "Support", find: "Mentorship, helping colleagues and psychological safety" },
    { name: "People orientation", find: "Decisions that account for their impact on employees" },
    { name: "Growth opportunities", find: "Training, development, internal transfers and career tracks" },
    { name: "Recognition of achievements", find: "A culture of appreciation, public recognition and bonuses" },
    { name: "Action orientation", find: "A bias for action over discussion and fast execution" },
    { name: "Achievement orientation", find: "Ambitious goals, OKRs and a drive to set records" },
    { name: "High standards", find: "A high bar for quality and zero tolerance for mediocrity" },
    { name: "High expectations", find: "Clear KPIs, regular performance reviews and accountability" },
    { name: "Results orientation", find: "Evaluation by outcome rather than process; a data-driven approach" },
    { name: "Pay for performance", find: "Variable pay, bonuses and equity tied to achievements" },
    { name: "Focus on quality", find: "A zero-defect culture, QA processes and pride in the product" },
    { name: "Analytical mindset", find: "Decisions grounded in data, research and metrics" },
    { name: "Attention to detail", find: "Thorough review, documentation and peer review" },
    { name: "Precision", find: "Clear wording, specifications and standards" },
    { name: "Strong organization", find: "Structured processes and project management" },
    { name: "Team orientation", find: "Collective achievements valued above individual ones" },
    { name: "Open information sharing", find: "Open communication channels, a wiki and transparency" },
    { name: "Collaboration", find: "Cross-functional teams and pair work" },
    { name: "Friendly relationships", find: "Team-building, informal interaction and company life" },
    { name: "Fitting into the team", find: "Cultural fit during hiring and onboarding" },
    { name: "Competitiveness", find: "A focus on beating competitors and market aggression" },
    { name: "Assertiveness", find: "Forcefulness in negotiations and capturing market share" },
    { name: "Decisiveness", find: "Fast decisions with no paralysis by analysis" },
    { name: "Initiative", find: "Employees find problems and solutions on their own" },
    { name: "Personal accountability", find: "A culture of ownership: “this is my responsibility”" },
    { name: "Direct conflict resolution", find: "Open discussions, direct feedback and no politics" },
    { name: "Work intensity", find: "A culture of overwork or, conversely, its absence" },
    { name: "Reflectiveness", find: "Retrospectives, learning from mistakes and self-awareness" },
    { name: "Autonomy", find: "Freedom in decisions and minimal micromanagement" },
    { name: "Unified culture", find: "A strong identity and shared values" },
    { name: "Informality", find: "Open offices, first-name basis and a casual style" },
    { name: "Ease of communication", find: "A relaxed atmosphere, humor and a flat hierarchy" },
    { name: "Composure", find: "No panic in a crisis and measured reactions" },
    { name: "Enthusiasm", find: "Engagement, passion and pride in the company" },
    { name: "Distinctiveness", find: "A strong employer brand: “we’re not like everyone else”" },
    { name: "Reputation", find: "Care for image, PR and community relations" },
    { name: "Social responsibility", find: "An ESG agenda, volunteering and eco initiatives" },
    { name: "Clear philosophy", find: "Mission and values that genuinely shape decisions" },
  ],
  es: [
    { name: "Flexibilidad", find: "Disposición a adaptar enfoques, procesos y estructuras a nuevas condiciones" },
    { name: "Adaptabilidad", find: "Una actitud positiva ante el cambio y la capacidad de reinventarse" },
    { name: "Innovación", find: "Énfasis en crear cosas nuevas, soluciones originales e I+D" },
    { name: "Aprovechar las oportunidades", find: "Velocidad de respuesta a las señales del mercado y proactividad" },
    { name: "Apertura a la experimentación", find: "Una cultura de pruebas A/B, prototipado y MVP" },
    { name: "Apetito por el riesgo", find: "Toma de decisiones en condiciones de incertidumbre y tolerancia al fracaso" },
    { name: "Pocas restricciones rígidas", find: "Mínima burocracia, confianza y autonomía" },
    { name: "Estabilidad", find: "Resiliencia, planificación a largo plazo y baja rotación" },
    { name: "Previsibilidad", find: "Procesos claros, directrices y expectativas bien definidas" },
    { name: "Prudencia", find: "Un enfoque mesurado, gestión de riesgos y debida diligencia" },
    { name: "Orientación a las normas", find: "Cumplimiento de procedimientos, compliance y estandarización" },
    { name: "Seguridad laboral", find: "Baja rotación y atención al crecimiento profesional" },
    { name: "Bajos niveles de conflicto", find: "Un ambiente armonioso que evita la confrontación abierta" },
    { name: "Equidad", find: "Igualdad de oportunidades, criterios transparentes y sin favoritismos" },
    { name: "Respeto a los derechos individuales", find: "Límites personales, equilibrio entre vida y trabajo y un enfoque individual" },
    { name: "Tolerancia", find: "Aceptación de las diferencias y apertura a puntos de vista diversos" },
    { name: "Apoyo", find: "Mentoría, ayuda a los colegas y seguridad psicológica" },
    { name: "Orientación a las personas", find: "Decisiones que consideran su impacto en los empleados" },
    { name: "Oportunidades de crecimiento", find: "Formación, desarrollo, traslados internos y planes de carrera" },
    { name: "Reconocimiento de logros", find: "Una cultura de aprecio, reconocimiento público y bonificaciones" },
    { name: "Orientación a la acción", find: "Una predisposición a actuar más que a debatir y una ejecución rápida" },
    { name: "Orientación al logro", find: "Metas ambiciosas, OKR y un afán por batir récords" },
    { name: "Estándares altos", find: "Un alto listón de calidad y cero tolerancia a la mediocridad" },
    { name: "Altas expectativas", find: "KPI claros, evaluaciones de desempeño regulares y rendición de cuentas" },
    { name: "Orientación a resultados", find: "Evaluación por resultados más que por procesos; un enfoque basado en datos" },
    { name: "Pago por desempeño", find: "Retribución variable, bonificaciones y acciones ligadas a los logros" },
    { name: "Enfoque en la calidad", find: "Una cultura de cero defectos, procesos de QA y orgullo por el producto" },
    { name: "Mentalidad analítica", find: "Decisiones fundamentadas en datos, investigación y métricas" },
    { name: "Atención al detalle", find: "Revisión exhaustiva, documentación y revisión por pares" },
    { name: "Precisión", find: "Redacción clara, especificaciones y estándares" },
    { name: "Organización sólida", find: "Procesos estructurados y gestión de proyectos" },
    { name: "Orientación al equipo", find: "Los logros colectivos se valoran por encima de los individuales" },
    { name: "Intercambio abierto de información", find: "Canales de comunicación abiertos, una wiki y transparencia" },
    { name: "Colaboración", find: "Equipos multifuncionales y trabajo en parejas" },
    { name: "Relaciones cordiales", find: "Team-building, interacción informal y vida de empresa" },
    { name: "Encajar en el equipo", find: "Encaje cultural en la contratación y la incorporación" },
    { name: "Competitividad", find: "Un enfoque en superar a los competidores y agresividad de mercado" },
    { name: "Asertividad", find: "Firmeza en las negociaciones y captura de cuota de mercado" },
    { name: "Decisión", find: "Decisiones rápidas sin parálisis por análisis" },
    { name: "Iniciativa", find: "Los empleados encuentran problemas y soluciones por su cuenta" },
    { name: "Responsabilidad personal", find: "Una cultura de apropiación: «esto es responsabilidad mía»" },
    { name: "Resolución directa de conflictos", find: "Discusiones abiertas, feedback directo y sin politiqueo" },
    { name: "Intensidad de trabajo", find: "Una cultura de sobrecarga laboral o, por el contrario, su ausencia" },
    { name: "Reflexión", find: "Retrospectivas, aprender de los errores y autoconciencia" },
    { name: "Autonomía", find: "Libertad en las decisiones y mínima microgestión" },
    { name: "Cultura unificada", find: "Una identidad fuerte y valores compartidos" },
    { name: "Informalidad", find: "Oficinas abiertas, tuteo y un estilo desenfadado" },
    { name: "Facilidad de comunicación", find: "Un ambiente relajado, humor y una jerarquía plana" },
    { name: "Serenidad", find: "Sin pánico en una crisis y reacciones mesuradas" },
    { name: "Entusiasmo", find: "Compromiso, pasión y orgullo por la empresa" },
    { name: "Distintividad", find: "Una marca empleadora fuerte: «no somos como los demás»" },
    { name: "Reputación", find: "Cuidado de la imagen, relaciones públicas y vínculo con la comunidad" },
    { name: "Responsabilidad social", find: "Una agenda ESG, voluntariado e iniciativas ecológicas" },
    { name: "Filosofía clara", find: "Una misión y unos valores que realmente guían las decisiones" },
  ],
  pt: [
    { name: "Flexibilidade", find: "Disposição para adaptar abordagens, processos e estruturas a novas condições" },
    { name: "Adaptabilidade", find: "Uma atitude positiva perante a mudança e a capacidade de se reinventar" },
    { name: "Inovação", find: "Ênfase em criar coisas novas, soluções originais e P&D" },
    { name: "Aproveitar oportunidades", find: "Velocidade de resposta aos sinais do mercado e proatividade" },
    { name: "Abertura à experimentação", find: "Uma cultura de testes A/B, prototipagem e MVPs" },
    { name: "Apetite ao risco", find: "Tomada de decisão sob incerteza e tolerância ao fracasso" },
    { name: "Poucas restrições rígidas", find: "Burocracia mínima, confiança e autonomia" },
    { name: "Estabilidade", find: "Resiliência, planejamento de longo prazo e baixa rotatividade" },
    { name: "Previsibilidade", find: "Processos claros, diretrizes e expectativas bem definidas" },
    { name: "Prudência", find: "Uma abordagem ponderada, gestão de riscos e due diligence" },
    { name: "Orientação a normas", find: "Cumprimento de procedimentos, compliance e padronização" },
    { name: "Segurança no emprego", find: "Baixa rotatividade e cuidado com o crescimento na carreira" },
    { name: "Baixos níveis de conflito", find: "Um ambiente harmonioso que evita o confronto aberto" },
    { name: "Equidade", find: "Igualdade de oportunidades, critérios transparentes e sem favoritismo" },
    { name: "Respeito aos direitos individuais", find: "Limites pessoais, equilíbrio entre vida e trabalho e uma abordagem individual" },
    { name: "Tolerância", find: "Aceitação das diferenças e abertura a pontos de vista diversos" },
    { name: "Apoio", find: "Mentoria, ajuda aos colegas e segurança psicológica" },
    { name: "Orientação às pessoas", find: "Decisões que consideram o seu impacto sobre os colaboradores" },
    { name: "Oportunidades de crescimento", find: "Capacitação, desenvolvimento, transferências internas e planos de carreira" },
    { name: "Reconhecimento de conquistas", find: "Uma cultura de valorização, reconhecimento público e bonificações" },
    { name: "Orientação à ação", find: "Uma predisposição para agir em vez de debater e uma execução rápida" },
    { name: "Orientação à conquista", find: "Metas ambiciosas, OKRs e um impulso para bater recordes" },
    { name: "Padrões elevados", find: "Um alto nível de qualidade e tolerância zero à mediocridade" },
    { name: "Expectativas elevadas", find: "KPIs claros, avaliações de desempenho regulares e prestação de contas" },
    { name: "Orientação a resultados", find: "Avaliação por resultados em vez de processos; uma abordagem orientada por dados" },
    { name: "Remuneração por desempenho", find: "Remuneração variável, bônus e participação acionária atrelados às conquistas" },
    { name: "Foco na qualidade", find: "Uma cultura de zero defeitos, processos de QA e orgulho do produto" },
    { name: "Mentalidade analítica", find: "Decisões fundamentadas em dados, pesquisa e métricas" },
    { name: "Atenção aos detalhes", find: "Revisão minuciosa, documentação e revisão por pares" },
    { name: "Precisão", find: "Redação clara, especificações e padrões" },
    { name: "Organização sólida", find: "Processos estruturados e gestão de projetos" },
    { name: "Orientação à equipe", find: "As conquistas coletivas são valorizadas acima das individuais" },
    { name: "Compartilhamento aberto de informação", find: "Canais de comunicação abertos, uma wiki e transparência" },
    { name: "Colaboração", find: "Equipes multifuncionais e trabalho em duplas" },
    { name: "Relações cordiais", find: "Team-building, interação informal e vida da empresa" },
    { name: "Encaixar na equipe", find: "Encaixe cultural na contratação e no onboarding" },
    { name: "Competitividade", find: "Um foco em superar os concorrentes e agressividade de mercado" },
    { name: "Assertividade", find: "Firmeza nas negociações e conquista de participação de mercado" },
    { name: "Capacidade de decisão", find: "Decisões rápidas sem paralisia por análise" },
    { name: "Iniciativa", find: "Os colaboradores encontram problemas e soluções por conta própria" },
    { name: "Responsabilidade pessoal", find: "Uma cultura de apropriação: «isto é responsabilidade minha»" },
    { name: "Resolução direta de conflitos", find: "Discussões abertas, feedback direto e sem politicagem" },
    { name: "Intensidade de trabalho", find: "Uma cultura de excesso de trabalho ou, ao contrário, a sua ausência" },
    { name: "Reflexão", find: "Retrospectivas, aprender com os erros e autoconsciência" },
    { name: "Autonomia", find: "Liberdade nas decisões e mínimo microgerenciamento" },
    { name: "Cultura unificada", find: "Uma identidade forte e valores compartilhados" },
    { name: "Informalidade", find: "Escritórios abertos, tratamento informal e um estilo descontraído" },
    { name: "Facilidade de comunicação", find: "Um ambiente descontraído, humor e uma hierarquia horizontal" },
    { name: "Serenidade", find: "Sem pânico numa crise e reações ponderadas" },
    { name: "Entusiasmo", find: "Engajamento, paixão e orgulho da empresa" },
    { name: "Distinção", find: "Uma marca empregadora forte: «não somos como os outros»" },
    { name: "Reputação", find: "Cuidado com a imagem, relações públicas e vínculo com a comunidade" },
    { name: "Responsabilidade social", find: "Uma agenda ESG, voluntariado e iniciativas ecológicas" },
    { name: "Filosofia clara", find: "Uma missão e valores que realmente orientam as decisões" },
  ],
  ar: [
    { name: "المرونة", find: "الاستعداد لتكييف الأساليب والعمليات والهياكل مع الظروف الجديدة" },
    { name: "القدرة على التكيّف", find: "موقف إيجابي تجاه التغيير والقدرة على إعادة ابتكار الذات" },
    { name: "الابتكار", find: "التركيز على ابتكار أشياء جديدة وحلول أصيلة والبحث والتطوير" },
    { name: "اغتنام الفرص", find: "سرعة الاستجابة لإشارات السوق والمبادرة الاستباقية" },
    { name: "الانفتاح على التجريب", find: "ثقافة اختبارات A/B والنماذج الأولية والمنتجات الأولية القابلة للتطبيق" },
    { name: "تقبّل المخاطرة", find: "اتخاذ القرار في ظل عدم اليقين وتحمّل الإخفاق" },
    { name: "قلة القيود الصارمة", find: "حدّ أدنى من البيروقراطية والثقة والاستقلالية" },
    { name: "الاستقرار", find: "المرونة المؤسسية والتخطيط طويل الأمد وانخفاض معدّل الدوران" },
    { name: "القابلية للتنبؤ", find: "عمليات واضحة وإرشادات وتوقّعات محدّدة جيدًا" },
    { name: "الحصافة", find: "نهج متّزن وإدارة للمخاطر وعناية واجبة" },
    { name: "التوجّه نحو القواعد", find: "الالتزام بالإجراءات والامتثال والتوحيد القياسي" },
    { name: "الأمان الوظيفي", find: "انخفاض معدّل الدوران والاهتمام بالنمو المهني" },
    { name: "انخفاض مستويات النزاع", find: "أجواء منسجمة تتجنّب المواجهة العلنية" },
    { name: "الإنصاف", find: "تكافؤ الفرص ومعايير شفّافة وانعدام المحاباة" },
    { name: "احترام الحقوق الفردية", find: "الحدود الشخصية والتوازن بين العمل والحياة والنهج الفردي" },
    { name: "التسامح", find: "تقبّل الاختلافات والانفتاح على وجهات النظر المتنوّعة" },
    { name: "الدعم", find: "الإرشاد ومساعدة الزملاء والأمان النفسي" },
    { name: "التوجّه نحو الأفراد", find: "قرارات تراعي أثرها على الموظفين" },
    { name: "فرص النمو", find: "التدريب والتطوير والانتقالات الداخلية والمسارات المهنية" },
    { name: "تقدير الإنجازات", find: "ثقافة التقدير والاعتراف العلني والمكافآت" },
    { name: "التوجّه نحو الفعل", find: "انحياز نحو الفعل بدلًا من النقاش والتنفيذ السريع" },
    { name: "التوجّه نحو الإنجاز", find: "أهداف طموحة وأهداف ونتائج رئيسية (OKRs) ودافع لتحطيم الأرقام القياسية" },
    { name: "معايير عالية", find: "سقف عالٍ للجودة وانعدام التسامح مع الرداءة" },
    { name: "توقّعات عالية", find: "مؤشرات أداء واضحة ومراجعات أداء منتظمة ومساءلة" },
    { name: "التوجّه نحو النتائج", find: "التقييم بالنتيجة بدلًا من العملية؛ نهج قائم على البيانات" },
    { name: "الأجر مقابل الأداء", find: "أجر متغيّر ومكافآت وحصص ملكية مرتبطة بالإنجازات" },
    { name: "التركيز على الجودة", find: "ثقافة انعدام العيوب وعمليات ضمان الجودة والاعتزاز بالمنتج" },
    { name: "العقلية التحليلية", find: "قرارات مبنية على البيانات والبحث والمقاييس" },
    { name: "الاهتمام بالتفاصيل", find: "مراجعة دقيقة وتوثيق ومراجعة الأقران" },
    { name: "الدقة", find: "صياغة واضحة ومواصفات ومعايير" },
    { name: "تنظيم قوي", find: "عمليات منظّمة وإدارة للمشاريع" },
    { name: "التوجّه نحو الفريق", find: "تقدير الإنجازات الجماعية فوق الفردية" },
    { name: "التشارك المفتوح للمعلومات", find: "قنوات تواصل مفتوحة وويكي وشفافية" },
    { name: "التعاون", find: "فرق متعددة الوظائف والعمل الثنائي" },
    { name: "علاقات ودّية", find: "بناء الفريق والتفاعل غير الرسمي والحياة في الشركة" },
    { name: "الاندماج في الفريق", find: "التوافق الثقافي عند التوظيف والتأهيل" },
    { name: "التنافسية", find: "تركيز على التفوّق على المنافسين والاندفاع السوقي" },
    { name: "الحزم", find: "قوة في المفاوضات والاستحواذ على حصّة السوق" },
    { name: "الحسم", find: "قرارات سريعة دون شلل التحليل" },
    { name: "المبادرة", find: "يكتشف الموظفون المشكلات والحلول بأنفسهم" },
    { name: "المساءلة الشخصية", find: "ثقافة الملكية: «هذه مسؤوليتي»" },
    { name: "الحل المباشر للنزاعات", find: "نقاشات مفتوحة وتغذية راجعة مباشرة ولا مناورات سياسية" },
    { name: "كثافة العمل", find: "ثقافة الإفراط في العمل أو، على العكس، غيابها" },
    { name: "التأمل الذاتي", find: "المراجعات الاسترجاعية والتعلّم من الأخطاء والوعي الذاتي" },
    { name: "الاستقلالية", find: "حرية في القرارات وحدّ أدنى من الإدارة التفصيلية" },
    { name: "ثقافة موحّدة", find: "هوية قوية وقيم مشتركة" },
    { name: "عدم الرسمية", find: "مكاتب مفتوحة والمناداة بالأسماء الأولى وأسلوب عفوي" },
    { name: "سهولة التواصل", find: "أجواء مريحة وروح الدعابة وهرمية مسطّحة" },
    { name: "رباطة الجأش", find: "لا ذعر في الأزمات وردود فعل متّزنة" },
    { name: "الحماس", find: "الاندماج والشغف والاعتزاز بالشركة" },
    { name: "التميّز", find: "علامة صاحب عمل قوية: «لسنا كالآخرين»" },
    { name: "السمعة", find: "العناية بالصورة والعلاقات العامة والعلاقة مع المجتمع" },
    { name: "المسؤولية الاجتماعية", find: "أجندة الحوكمة البيئية والاجتماعية والمؤسسية والتطوّع والمبادرات البيئية" },
    { name: "فلسفة واضحة", find: "رسالة وقيم توجّه القرارات فعليًا" },
  ],
};

/* собрать локализованный массив параметров */
function buildParams(locale: Locale): P[] {
  return PARAM_BASE.map((p, i) => ({
    n: p.n,
    dim: p.dim,
    ru: PARAM_TEXT[locale][i].name,
    find: PARAM_TEXT[locale][i].find,
  }));
}

/* группировка параметров по измерению (порядок — DIM_ORDER) */
function buildGroups(locale: Locale): { key: DimKey; label: string; color: string; items: P[] }[] {
  const params = buildParams(locale);
  return DIM_ORDER.map((key) => ({
    key,
    label: DIM[key][0],
    color: DIM[key][1],
    items: params.filter((p) => p.dim === key),
  }));
}

/* ДНК компании — 7 измерений OCP (демо-профиль) */
const DNA: [string, number, string][] = [
  ["Innovation", 64, GREEN],
  ["Stability", 78, TEAL],
  ["People orientation", 72, AMBER],
  ["Results orientation", 81, "#FF6B57"],
  ["Attention to detail", 75, "#2E9E8F"],
  ["Team orientation", 69, "#5BA528"],
  ["Competitiveness", 58, "#E07B39"],
];

export default function CultureSections() {
  const rootRef = useRef<HTMLDivElement>(null);
  const c = BLOCKS[useLocale()].culture;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* лёгкое появление блоков из блюра */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 54, filter: "blur(14px)", scale: 0.95 },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", scale: 1, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%", end: "top 54%", scrub: 1 } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full" style={{ color: INK }}>
      {/* ===================== ДНК КОМПАНИИ ===================== */}
      <section id="dna" className="relative mx-auto max-w-[1280px] px-6 pb-28 md:px-12">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl" style={{ color: INK }}>
            {c.dnaPre}<span style={{ color: GREEN }}>{c.dnaAccent}</span>{c.dnaPost}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#183833]/65">{c.dnaP}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ДНК — 7 измерений OCP */}
          <div className="reveal rounded-[28px] border border-[#e8efe6] bg-white/95 p-7 shadow-[0_24px_60px_rgba(24,56,51,0.09)]">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: `${GREEN}1a` }}><Dna className="h-5 w-5" style={{ color: GREEN }} /></span>
              <div>
                <p className="text-base font-bold" style={{ color: INK }}>{c.profileTitle}</p>
                <p className="text-xs text-[#183833]/50">{c.profileSub}</p>
              </div>
            </div>
            <div className="mt-6 space-y-3.5">
              {DNA.map(([name, val, col], i) => (
                <div key={name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium" style={{ color: INK }}>{c.dims[i]}</span>
                    <span className="font-bold" style={{ color: col }}>{val}</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#eef2ec]">
                    <div className="h-full rounded-full" style={{ width: `${val}%`, background: col }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Уровень соответствия + культурный фит */}
          <div className="flex flex-col gap-5">
            <div className="reveal flex items-center gap-5 rounded-[28px] border border-[#e8efe6] bg-white/95 p-7 shadow-[0_24px_60px_rgba(24,56,51,0.09)]">
              <Ring value={74} />
              <div>
                <p className="flex items-center gap-1.5 text-base font-bold" style={{ color: INK }}><Target className="h-4 w-4" style={{ color: GREEN }} /> {c.matchScore}</p>
                <p className="mt-1.5 text-sm leading-snug text-[#183833]/65">{c.matchScoreDesc}</p>
              </div>
            </div>

            <div className="reveal rounded-[28px] border border-[#e8efe6] bg-white/95 p-7 shadow-[0_24px_60px_rgba(24,56,51,0.09)]">
              <p className="text-base font-bold" style={{ color: INK }}>{c.culturalFit}</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> {c.alignLabel}</p>
                  <ul className="mt-2 space-y-1.5">
                    {c.align.map((t) => (
                      <li key={t} className="flex items-start gap-1.5 text-xs leading-snug text-[#183833]/70"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GREEN }} /> {t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: AMBER }}><AlertTriangle className="h-3.5 w-3.5" /> {c.watchLabel}</p>
                  <ul className="mt-2 space-y-1.5">
                    {c.watch.map((t) => (
                      <li key={t} className="flex items-start gap-1.5 text-xs leading-snug text-[#183833]/70"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: AMBER }} /> {t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== АНАЛИЗИРУЕМЫЕ ПАРАМЕТРЫ (обозреватель) ===================== */}
      <ParametersExplorer />
    </div>
  );
}

/* ============================================================
   ParametersExplorer — лёгкий интерактивный обозреватель 54
   параметров по 8 измерениям. Никакого pin-скролла: выбор
   измерения, карточки появляются CSS-каскадом (transform/opacity).
   ============================================================ */
const PARAMS_LABEL: Record<Locale, string> = { en: "parameters", es: "parámetros", pt: "parâmetros", ar: "معايير" };

function ParametersExplorer() {
  const locale = useLocale();
  const c = BLOCKS[locale].culture;
  const groups = buildGroups(locale);
  const [active, setActive] = useState<DimKey>("inno");
  const groupIdx = groups.findIndex((g) => g.key === active);
  const group = groups[groupIdx];

  return (
    <section id="params" className="relative mx-auto max-w-[1280px] px-6 pb-28 md:px-12">
      <style>{`
        @keyframes paramCardIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
        .param-card-in { animation: paramCardIn .42s cubic-bezier(.22,1,.36,1) backwards; }
        @media (prefers-reduced-motion: reduce) { .param-card-in { animation: none } }
      `}</style>

      {/* заголовок */}
      <div className="reveal mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl" style={{ color: INK }}>
          {c.paramsPre}<span style={{ color: GREEN }}>{c.paramsAccent}</span>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[#183833]/65">{c.paramsSub}</p>
      </div>

      <div className="reveal mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
        {/* выбор измерения */}
        <div
          role="tablist"
          aria-label="Culture dimensions"
          className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
        >
          {groups.map((g, gi) => {
            const on = g.key === active;
            return (
              <button
                key={g.key}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(g.key)}
                className={`group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                  on ? "shadow-[0_14px_36px_rgba(24,56,51,0.10)]" : "border-[#e8efe6] bg-white/70 hover:bg-white"
                }`}
                style={on ? { borderColor: `${g.color}66`, background: `${g.color}12` } : undefined}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-110" style={{ background: g.color }} />
                <span className="flex-1 whitespace-nowrap text-sm font-semibold lg:whitespace-normal" style={{ color: on ? g.color : INK }}>{c.dims[gi]}</span>
                <span className="hidden shrink-0 text-xs font-bold tabular-nums lg:block" style={{ color: on ? g.color : "#18383366" }}>{g.items.length}</span>
                <ChevronRight className={`hidden h-4 w-4 shrink-0 transition-all duration-300 lg:block ${on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`} style={{ color: g.color }} />
              </button>
            );
          })}
        </div>

        {/* панель параметров выбранного измерения */}
        <div
          role="tabpanel"
          className="rounded-[28px] border border-[#e8efe6] bg-white/80 p-5 shadow-[0_24px_60px_rgba(24,56,51,0.07)] sm:p-7"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2.5 text-lg font-bold" style={{ color: INK }}>
              <span className="h-3 w-3 rounded-full" style={{ background: group.color }} />
              {c.dims[groupIdx]}
            </p>
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: `${group.color}16`, color: group.color }}>
              {group.items.length} {PARAMS_LABEL[locale]}
            </span>
          </div>

          {/* key={active} — перезапуск CSS-каскада при смене измерения */}
          <div key={active} className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((p, i) => (
              <div
                key={p.n}
                className="param-card-in rounded-2xl border border-[#eef2ec] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#dfe7da] hover:shadow-[0_16px_40px_rgba(24,56,51,0.09)]"
                style={{ animationDelay: `${i * 32}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black tabular-nums" style={{ color: group.color }}>{p.n.toString().padStart(2, "0")}</span>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: group.color }} />
                </div>
                <p className="mt-2 text-base font-bold leading-tight" style={{ color: INK }}>{p.ru}</p>
                <p className="mt-1.5 text-xs leading-snug text-[#183833]/60">{p.find}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* кольцо уровня соответствия */
function Ring({ value }: { value: number }) {
  const r = 38, c = 2 * Math.PI * r, dash = ((value / 100) * c).toFixed(1);
  return (
    <div className="relative h-[104px] w-[104px] shrink-0 text-center">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <defs><linearGradient id="cRing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={TEAL} /><stop offset="100%" stopColor={GREEN} /></linearGradient></defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e9efe6" strokeWidth="9" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="url(#cRing)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${dash} ${c.toFixed(1)}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: GREEN }}>{value}%</span>
      </div>
    </div>
  );
}
