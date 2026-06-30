import type { Locale } from "@/lib/i18n";

type Hero = { pre: string; accent: string; post: string; p: string; cta1: string; cta2: string };
type CTA = { title: string; sub: string; button: string };
export type BlocksContent = {
  culture: {
    hero: Hero; cta: CTA;
    dnaPre: string; dnaAccent: string; dnaPost: string; dnaP: string;
    profileTitle: string; profileSub: string; matchScore: string; matchScoreDesc: string;
    culturalFit: string; alignLabel: string; align: string[]; watchLabel: string; watch: string[];
    paramsPre: string; paramsAccent: string; paramsSub: string; dims: string[];
  };
  report: {
    hero: Hero; cta: CTA; section: string;
    prevLabel: string; nextLabel: string;
    steps: { title: string; text: string }[];
  };
  assistant: {
    hero: Hero; cta: CTA;
    bentoPre: string; bentoAccent: string; bentoPost: string; bentoSub: string;
    features: { title: string; text: string }[];
  };
};

const en: BlocksContent = {
  culture: {
    hero: { pre: "We map the unique ", accent: "code", post: " of your corporate culture", p: "Upload your culture artifacts: website, social media, job postings, internal guides and more. TalentMind helps you structure your company profile across 54 parameters. The platform becomes your assistant for assessing candidates through the lens of your DNA", cta1: "Sample report", cta2: "Report for your company" },
    cta: { title: "Build your team’s culture profile", sub: "Upload your culture artifacts and assess candidates against your own DNA. First 5 assessments free", button: "Start for free" },
    dnaPre: "We factor in your company DNA when analyzing ", dnaAccent: "every candidate", dnaPost: "", dnaP: "Your culture profile becomes the benchmark. For each candidate we calculate a match score and break cultural fit down into strong alignment points and areas to watch",
    profileTitle: "Company culture profile", profileSub: "7 dimensions · 54 parameters", matchScore: "Match score", matchScoreDesc: "How closely the candidate’s values and behavior align with your company DNA",
    culturalFit: "Cultural fit", alignLabel: "Alignment points", align: ["Execution discipline", "Respect for areas of responsibility", "Analytical approach"], watchLabel: "Areas to watch", watch: ["Low initiative", "Limited flexibility to change"],
    paramsPre: "Parameters ", paramsAccent: "we analyze", paramsSub: "Seven culture dimensions broken down into concrete signals. Pick a dimension to explore the parameters behind it",
    dims: ["Innovation", "Stability", "People orientation", "Results orientation", "Attention to detail", "Team orientation", "Competitiveness", "Culture profile"],
  },
  report: {
    hero: { pre: "A ready ", accent: "report", post: " on your candidate", p: "A detailed breakdown of soft skills and cultural fit, based on a real interview", cta1: "View the report", cta2: "Get your report" },
    cta: { title: "Get a report like this for your candidate", sub: "Upload an interview recording and TalentMind returns an objective breakdown in minutes. First 5 reports free", button: "Start for free" },
    section: "Section", prevLabel: "54 parameters", nextLabel: "AI assistant",
    steps: [
      { title: "Candidate & match", text: "The basic profile, experience, and overall match to the role's requirements — at a glance. AI builds a transparent candidate profile with arguments for and against, giving you a reliable basis for your final decision" },
      { title: "Cultural fit assessment", text: "How well the candidate's values and behavior match the company's DNA and cultural code. The platform computes a compatibility index and breaks it down across key culture dimensions — highlighting gaps against the benchmark" },
      { title: "Deep analytics & hidden risks", text: "The system looks beyond the résumé. Surface true strengths, red flags (such as flight risk), and analyze psycholinguistics: how the candidate shares responsibility and their locus of control" },
      { title: "Visualizing growth areas", text: "A clear radar chart compares the candidate's actual skills with the benchmark profile for your role. Instantly gauge the average gap and spot the most critical competency shortfalls" },
      { title: "Detailed soft-skills map", text: "Every soft skill, quantified. The platform scores leadership, communication, empathy, and critical thinking, backing each score with evidence from the conversation" },
      { title: "Experience assessment with the STAR method", text: "AI automatically extracts real work cases from the interview and structures them with the STAR method — Situation, Task, Action, and Result — to prove the candidate's real competence" },
      { title: "Preparing for the final round", text: "The platform generates a list of targeted questions for the hiring manager to precisely probe the weak spots and risks found in the first interview" },
    ],
  },
  assistant: {
    hero: { pre: "Your ", accent: "personal analyst", post: " across all candidates", p: "Not reports and spreadsheets, but a real conversation. The assistant keeps every interview in your pipeline in memory and answers any question in seconds", cta1: "Start for free", cta2: "What it does" },
    cta: { title: "Ask the assistant about your candidates", sub: "5 analyses free, no credit card required. Your first answer in under a minute", button: "Start for free" },
    bentoPre: "What the ", bentoAccent: "assistant", bentoPost: " can do", bentoSub: "Five capabilities that turn your pipeline into a conversation partner",
    features: [
      { title: "Chat with your pipeline", text: "“Talk” to your entire candidate pipeline in natural language — no filters or spreadsheets" },
      { title: "Context is never lost", text: "The assistant remembers the whole conversation and every interview — ask without repeating yourself" },
      { title: "Answers in seconds", text: "Instant responses based on analysis of real interviews, not generic phrases" },
      { title: "Compare candidates", text: "Quick profile comparison — ask the assistant to match candidates against your criteria" },
      { title: "Hiring recommendations", text: "Decision support — get structured interview summaries so you can confidently recommend candidates to hiring managers" },
    ],
  },
};

const es: BlocksContent = {
  culture: {
    hero: { pre: "Mapeamos el ", accent: "código", post: " único de tu cultura corporativa", p: "Sube tus artefactos de cultura: sitio web, redes sociales, ofertas de empleo, guías internas y más. TalentMind te ayuda a estructurar el perfil de tu empresa en 54 parámetros. La plataforma se convierte en tu asistente para evaluar candidatos a través del prisma de tu ADN", cta1: "Informe de ejemplo", cta2: "Informe para tu empresa" },
    cta: { title: "Crea el perfil de cultura de tu equipo", sub: "Sube tus artefactos de cultura y evalúa a los candidatos frente a tu propio ADN. Las primeras 5 evaluaciones gratis", button: "Empezar gratis" },
    dnaPre: "Tenemos en cuenta el ADN de tu empresa al analizar ", dnaAccent: "a cada candidato", dnaPost: "", dnaP: "El perfil de tu cultura se convierte en el referente. Para cada candidato calculamos un nivel de coincidencia y desglosamos el ajuste cultural en puntos fuertes y áreas de atención",
    profileTitle: "Perfil de cultura de la empresa", profileSub: "7 dimensiones · 54 parámetros", matchScore: "Nivel de coincidencia", matchScoreDesc: "Cuánto se alinean los valores y el comportamiento del candidato con el ADN de tu empresa",
    culturalFit: "Ajuste cultural", alignLabel: "Puntos de coincidencia", align: ["Disciplina de ejecución", "Respeto por las áreas de responsabilidad", "Enfoque analítico"], watchLabel: "Áreas de atención", watch: ["Baja iniciativa", "Flexibilidad limitada al cambio"],
    paramsPre: "Parámetros ", paramsAccent: "que analizamos", paramsSub: "Siete dimensiones de cultura desglosadas en señales concretas. Elige una dimensión para explorar sus parámetros",
    dims: ["Innovación", "Estabilidad", "Orientación a las personas", "Orientación a resultados", "Atención al detalle", "Orientación al equipo", "Competitividad", "Perfil de cultura"],
  },
  report: {
    hero: { pre: "Un ", accent: "informe", post: " listo sobre tu candidato", p: "Un desglose detallado de soft skills y ajuste cultural, basado en una entrevista real", cta1: "Ver el informe", cta2: "Obtener tu informe" },
    cta: { title: "Obtén un informe así para tu candidato", sub: "Sube una grabación de entrevista y TalentMind devuelve un desglose objetivo en minutos. Los primeros 5 informes gratis", button: "Empezar gratis" },
    section: "Sección", prevLabel: "54 parámetros", nextLabel: "Asistente de IA",
    steps: [
      { title: "Candidato y coincidencia", text: "El perfil básico, la experiencia y la coincidencia general con los requisitos del puesto, de un vistazo. La IA construye un perfil transparente con argumentos a favor y en contra, dándote una base fiable para tu decisión final" },
      { title: "Evaluación del ajuste cultural", text: "Qué tan bien encajan los valores y el comportamiento del candidato con el ADN y el código cultural de la empresa. La plataforma calcula un índice de compatibilidad y lo desglosa por dimensiones clave, señalando las brechas frente al referente" },
      { title: "Analítica profunda y riesgos ocultos", text: "El sistema mira más allá del currículum. Revela fortalezas reales, señales de alerta (como riesgo de fuga) y analiza la psicolingüística: cómo reparte la responsabilidad el candidato y su locus de control" },
      { title: "Visualización de áreas de crecimiento", text: "Un gráfico de radar claro compara las habilidades reales del candidato con el perfil de referencia del puesto. Evalúa al instante la brecha media y detecta las carencias de competencias más críticas" },
      { title: "Mapa detallado de soft skills", text: "Cada soft skill, cuantificada. La plataforma puntúa liderazgo, comunicación, empatía y pensamiento crítico, respaldando cada puntuación con evidencia de la conversación" },
      { title: "Evaluación de experiencia con el método STAR", text: "La IA extrae automáticamente casos reales de la entrevista y los estructura con el método STAR — Situación, Tarea, Acción y Resultado — para demostrar la competencia real del candidato" },
      { title: "Preparación para la ronda final", text: "La plataforma genera una lista de preguntas dirigidas para que el responsable de contratación indague con precisión en los puntos débiles y riesgos hallados en la primera entrevista" },
    ],
  },
  assistant: {
    hero: { pre: "Tu ", accent: "analista personal", post: " para todos los candidatos", p: "No informes ni hojas de cálculo, sino una conversación real. El asistente recuerda cada entrevista de tu pipeline y responde cualquier pregunta en segundos", cta1: "Empezar gratis", cta2: "Qué hace" },
    cta: { title: "Pregúntale al asistente sobre tus candidatos", sub: "5 análisis gratis, sin tarjeta de crédito. Tu primera respuesta en menos de un minuto", button: "Empezar gratis" },
    bentoPre: "Lo que el ", bentoAccent: "asistente", bentoPost: " puede hacer", bentoSub: "Cinco capacidades que convierten tu pipeline en un interlocutor",
    features: [
      { title: "Chatea con tu pipeline", text: "«Habla» con todo tu pipeline de candidatos en lenguaje natural, sin filtros ni hojas de cálculo" },
      { title: "El contexto no se pierde", text: "El asistente recuerda toda la conversación y cada entrevista: pregunta sin repetirte" },
      { title: "Respuestas en segundos", text: "Respuestas instantáneas basadas en el análisis de entrevistas reales, no frases genéricas" },
      { title: "Compara candidatos", text: "Comparación rápida de perfiles: pide al asistente que evalúe candidatos según tus criterios" },
      { title: "Recomendaciones de contratación", text: "Apoyo a la decisión: obtén resúmenes estructurados para recomendar candidatos con confianza" },
    ],
  },
};

const pt: BlocksContent = {
  culture: {
    hero: { pre: "Mapeamos o ", accent: "código", post: " único da sua cultura corporativa", p: "Envie seus artefatos de cultura: site, redes sociais, vagas, guias internos e mais. A TalentMind ajuda a estruturar o perfil da sua empresa em 54 parâmetros. A plataforma se torna seu assistente para avaliar candidatos sob a ótica do seu DNA", cta1: "Relatório de exemplo", cta2: "Relatório para sua empresa" },
    cta: { title: "Crie o perfil de cultura da sua equipe", sub: "Envie seus artefatos de cultura e avalie candidatos frente ao seu próprio DNA. As primeiras 5 avaliações grátis", button: "Começar grátis" },
    dnaPre: "Levamos em conta o DNA da sua empresa ao analisar ", dnaAccent: "cada candidato", dnaPost: "", dnaP: "O perfil da sua cultura se torna a referência. Para cada candidato calculamos um nível de correspondência e detalhamos o ajuste cultural em pontos fortes e áreas de atenção",
    profileTitle: "Perfil de cultura da empresa", profileSub: "7 dimensões · 54 parâmetros", matchScore: "Nível de correspondência", matchScoreDesc: "O quanto os valores e o comportamento do candidato se alinham ao DNA da sua empresa",
    culturalFit: "Ajuste cultural", alignLabel: "Pontos de correspondência", align: ["Disciplina de execução", "Respeito às áreas de responsabilidade", "Abordagem analítica"], watchLabel: "Áreas de atenção", watch: ["Baixa iniciativa", "Flexibilidade limitada à mudança"],
    paramsPre: "Parâmetros ", paramsAccent: "que analisamos", paramsSub: "Sete dimensões de cultura detalhadas em sinais concretos. Escolha uma dimensão para explorar seus parâmetros",
    dims: ["Inovação", "Estabilidade", "Orientação às pessoas", "Orientação a resultados", "Atenção ao detalhe", "Orientação à equipe", "Competitividade", "Perfil de cultura"],
  },
  report: {
    hero: { pre: "Um ", accent: "relatório", post: " pronto sobre seu candidato", p: "Um detalhamento de soft skills e ajuste cultural, com base em uma entrevista real", cta1: "Ver o relatório", cta2: "Obter seu relatório" },
    cta: { title: "Obtenha um relatório assim para seu candidato", sub: "Envie uma gravação de entrevista e a TalentMind devolve um detalhamento objetivo em minutos. Os primeiros 5 relatórios grátis", button: "Começar grátis" },
    section: "Seção", prevLabel: "54 parâmetros", nextLabel: "Assistente de IA",
    steps: [
      { title: "Candidato e correspondência", text: "O perfil básico, a experiência e a correspondência geral com os requisitos da vaga, de relance. A IA constrói um perfil transparente com argumentos a favor e contra, dando uma base confiável para sua decisão final" },
      { title: "Avaliação do ajuste cultural", text: "O quanto os valores e o comportamento do candidato combinam com o DNA e o código cultural da empresa. A plataforma calcula um índice de compatibilidade e o detalha por dimensões-chave, destacando as lacunas frente à referência" },
      { title: "Análise profunda e riscos ocultos", text: "O sistema olha além do currículo. Revela forças reais, sinais de alerta (como risco de saída) e analisa a psicolinguística: como o candidato divide a responsabilidade e seu locus de controle" },
      { title: "Visualização de áreas de crescimento", text: "Um gráfico de radar claro compara as habilidades reais do candidato com o perfil de referência da vaga. Avalie na hora a lacuna média e identifique as carências de competências mais críticas" },
      { title: "Mapa detalhado de soft skills", text: "Cada soft skill, quantificada. A plataforma pontua liderança, comunicação, empatia e pensamento crítico, embasando cada nota com evidências da conversa" },
      { title: "Avaliação de experiência com o método STAR", text: "A IA extrai automaticamente casos reais da entrevista e os estrutura com o método STAR — Situação, Tarefa, Ação e Resultado — para comprovar a competência real do candidato" },
      { title: "Preparação para a rodada final", text: "A plataforma gera uma lista de perguntas direcionadas para o gestor sondar com precisão os pontos fracos e riscos encontrados na primeira entrevista" },
    ],
  },
  assistant: {
    hero: { pre: "Seu ", accent: "analista pessoal", post: " para todos os candidatos", p: "Não relatórios e planilhas, mas uma conversa real. O assistente mantém cada entrevista do seu pipeline na memória e responde qualquer pergunta em segundos", cta1: "Começar grátis", cta2: "O que ele faz" },
    cta: { title: "Pergunte ao assistente sobre seus candidatos", sub: "5 análises grátis, sem cartão de crédito. Sua primeira resposta em menos de um minuto", button: "Começar grátis" },
    bentoPre: "O que o ", bentoAccent: "assistente", bentoPost: " pode fazer", bentoSub: "Cinco recursos que transformam seu pipeline em um interlocutor",
    features: [
      { title: "Converse com seu pipeline", text: "«Fale» com todo o seu pipeline de candidatos em linguagem natural, sem filtros nem planilhas" },
      { title: "O contexto nunca se perde", text: "O assistente lembra de toda a conversa e de cada entrevista: pergunte sem repetir" },
      { title: "Respostas em segundos", text: "Respostas instantâneas baseadas na análise de entrevistas reais, não frases genéricas" },
      { title: "Compare candidatos", text: "Comparação rápida de perfis: peça ao assistente para avaliar candidatos segundo seus critérios" },
      { title: "Recomendações de contratação", text: "Apoio à decisão: receba resumos estruturados para recomendar candidatos com confiança" },
    ],
  },
};

const ar: BlocksContent = {
  culture: {
    hero: { pre: "نرسم الشيفرة ", accent: "الفريدة", post: " لثقافتك المؤسسية", p: "ارفع عناصر ثقافتك: الموقع الإلكتروني، وسائل التواصل الاجتماعي، إعلانات الوظائف، الأدلة الداخلية والمزيد. تساعدك TalentMind على هيكلة ملف شركتك عبر 54 معياراً. تصبح المنصة مساعدك لتقييم المرشّحين من منظور حمضك النووي", cta1: "تقرير نموذجي", cta2: "تقرير لشركتك" },
    cta: { title: "ابنِ ملف الثقافة لفريقك", sub: "ارفع عناصر ثقافتك وقيّم المرشّحين مقابل حمضك النووي الخاص. أول 5 تقييمات مجاناً", button: "ابدأ مجاناً" },
    dnaPre: "نأخذ في الاعتبار الحمض النووي لشركتك عند تحليل ", dnaAccent: "كل مرشّح", dnaPost: "", dnaP: "يصبح ملف ثقافتك هو المعيار المرجعي. لكل مرشّح نحسب درجة التوافق ونفصّل التوافق الثقافي إلى نقاط توافق قوية ومجالات تستحق الانتباه",
    profileTitle: "ملف الثقافة المؤسسية للشركة", profileSub: "7 أبعاد · 54 معياراً", matchScore: "درجة التوافق", matchScoreDesc: "مدى توافق قيم المرشّح وسلوكه مع الحمض النووي لشركتك",
    culturalFit: "التوافق الثقافي", alignLabel: "نقاط التوافق", align: ["انضباط في التنفيذ", "احترام مجالات المسؤولية", "نهج تحليلي"], watchLabel: "مجالات تستحق الانتباه", watch: ["مبادرة منخفضة", "مرونة محدودة تجاه التغيير"],
    paramsPre: "المعايير ", paramsAccent: "التي نحللها", paramsSub: "سبعة أبعاد ثقافية مفصّلة إلى إشارات ملموسة. اختر بُعداً لاستكشاف المعايير الكامنة وراءه",
    dims: ["الابتكار", "الاستقرار", "التوجّه نحو الأفراد", "التوجّه نحو النتائج", "الاهتمام بالتفاصيل", "التوجّه نحو الفريق", "التنافسية", "ملف الثقافة"],
  },
  report: {
    hero: { pre: "تقرير ", accent: "جاهز", post: " عن مرشّحك", p: "تحليل تفصيلي للمهارات الشخصية والتوافق الثقافي، مبني على مقابلة حقيقية", cta1: "عرض التقرير", cta2: "احصل على تقريرك" },
    cta: { title: "احصل على تقرير كهذا لمرشّحك", sub: "ارفع تسجيل مقابلة وتُعيد TalentMind تحليلاً موضوعياً في دقائق. أول 5 تقارير مجاناً", button: "ابدأ مجاناً" },
    section: "القسم", prevLabel: "54 معياراً", nextLabel: "مساعد الذكاء الاصطناعي",
    steps: [
      { title: "المرشّح والتوافق", text: "الملف الأساسي والخبرة والتوافق العام مع متطلبات الدور — في لمحة. يبني الذكاء الاصطناعي ملفاً شفافاً للمرشّح مع حجج مؤيّدة ومعارضة، ما يمنحك أساساً موثوقاً لقرارك النهائي" },
      { title: "تقييم التوافق الثقافي", text: "مدى تطابق قيم المرشّح وسلوكه مع الحمض النووي والشيفرة الثقافية للشركة. تحسب المنصة مؤشّر التوافق وتفصّله عبر الأبعاد الثقافية الرئيسية — مع إبراز الفجوات مقابل المعيار المرجعي" },
      { title: "تحليلات معمّقة ومخاطر خفية", text: "يتجاوز النظام السيرة الذاتية. اكتشف نقاط القوة الحقيقية، والإشارات التحذيرية (مثل خطر المغادرة)، وحلّل اللغويات النفسية: كيف يتقاسم المرشّح المسؤولية ومركز التحكم لديه" },
      { title: "تصوّر مجالات التطوير", text: "يقارن مخطط راداري واضح المهارات الفعلية للمرشّح بالملف المرجعي لدورك. قِس على الفور متوسّط الفجوة وارصد أكثر أوجه القصور في الكفاءات أهمية" },
      { title: "خريطة تفصيلية للمهارات الشخصية", text: "كل مهارة شخصية، مُقاسة بالأرقام. تُقيّم المنصة القيادة والتواصل والتعاطف والتفكير النقدي، مع دعم كل درجة بأدلة من المحادثة" },
      { title: "تقييم الخبرة بمنهجية STAR", text: "يستخرج الذكاء الاصطناعي تلقائياً حالات عمل حقيقية من المقابلة ويهيكلها بمنهجية STAR — الموقف والمهمة والإجراء والنتيجة — لإثبات الكفاءة الحقيقية للمرشّح" },
      { title: "التحضير للجولة النهائية", text: "تُنشئ المنصة قائمة بأسئلة موجّهة لمدير التوظيف ليتقصّى بدقّة نقاط الضعف والمخاطر التي ظهرت في المقابلة الأولى" },
    ],
  },
  assistant: {
    hero: { pre: "محلّلك ", accent: "الشخصي", post: " عبر جميع المرشّحين", p: "ليست تقارير وجداول بيانات، بل محادثة حقيقية. يحتفظ المساعد بكل مقابلة في مسارك في الذاكرة ويجيب عن أي سؤال في ثوانٍ", cta1: "ابدأ مجاناً", cta2: "ماذا يفعل" },
    cta: { title: "اسأل المساعد عن مرشّحيك", sub: "5 تحليلات مجاناً، دون الحاجة إلى بطاقة ائتمان. إجابتك الأولى في أقل من دقيقة", button: "ابدأ مجاناً" },
    bentoPre: "ما الذي يستطيع ", bentoAccent: "المساعد", bentoPost: " فعله", bentoSub: "خمس قدرات تحوّل مسارك إلى شريك حوار",
    features: [
      { title: "تحدّث مع مسارك", text: "«تحدّث» مع مسار مرشّحيك بالكامل بلغة طبيعية — دون مرشّحات أو جداول بيانات" },
      { title: "السياق لا يضيع أبداً", text: "يتذكّر المساعد المحادثة بأكملها وكل مقابلة — اسأل دون أن تكرّر نفسك" },
      { title: "إجابات في ثوانٍ", text: "ردود فورية مبنية على تحليل مقابلات حقيقية، لا عبارات عامة" },
      { title: "قارن بين المرشّحين", text: "مقارنة سريعة للملفات — اطلب من المساعد مطابقة المرشّحين مع معاييرك" },
      { title: "توصيات التوظيف", text: "دعم القرار — احصل على ملخّصات منظّمة للمقابلات لتوصي بثقة بالمرشّحين لمديري التوظيف" },
    ],
  },
};

export const BLOCKS: Record<Locale, BlocksContent> = { en, es, pt, ar };
