import type { Locale } from "@/lib/i18n";

export type PartnersContent = {
  heroPre: string; heroAccent: string;
  heroP: string; ctaPrimary: string; ctaSecondary: string;
  trust: string[];
  logosLabel: string;
  stats: [string, string][];
  typesTitlePre: string; typesTitleAccent: string; typesSub: string;
  types: { title: string; best: string; points: string[] }[];
  benTitlePre: string; benTitleAccent: string; benSub: string;
  benefits: { title: string; text: string }[];
  stepsTitlePre: string; stepsTitleAccent: string; stepsSub: string;
  steps: { title: string; text: string }[];
  cta: { title: string; sub: string; button: string };
};

const en: PartnersContent = {
  heroPre: "Grow your business ", heroAccent: "with TalentMind",
  heroP: "Join our partner network and bring AI-driven candidate assessment to your clients. Integrate it, refer it or resell it — we help you deliver better hiring and earn while doing it",
  ctaPrimary: "Become a partner", ctaSecondary: "Explore models",
  trust: ["Recurring revenue share", "Co-marketing", "Dedicated manager"],
  logosLabel: "Plugs into the tools your clients already use",
  stats: [["4", "Partnership models"], ["30%", "Up to revenue share"], ["2 wks", "Average to go live"], ["1:1", "Dedicated manager"]],
  typesTitlePre: "Ways to ", typesTitleAccent: "partner", typesSub: "Pick the model that fits your business — or combine a few. Every partner gets the same hands-on support",
  types: [
    { title: "Technology", best: "Best for ATS, HRIS & job boards", points: ["Embed AI assessment via our API", "Co-built integrations & listings", "Shared technical support"] },
    { title: "Referral", best: "Best for advisors & communities", points: ["Recurring commission on every deal", "Simple link & deal registration", "No technical work required"] },
    { title: "Reseller", best: "Best for HR-tech vendors", points: ["Wholesale pricing & margins", "Sell under your own offering", "White-glove onboarding"] },
    { title: "Agencies", best: "Best for recruiting firms", points: ["Objective soft-skill reports", "Stand out to your clients", "Volume-based pricing"] },
  ],
  benTitlePre: "Why partners ", benTitleAccent: "choose us", benSub: "We invest in the partners who invest in us — with real margins and real support",
  benefits: [
    { title: "Competitive revenue share", text: "Generous, recurring commissions and reseller margins that grow with your book of business" },
    { title: "Co-marketing", text: "Joint campaigns, case studies and lead sharing to put your brand in front of new audiences" },
    { title: "Dedicated manager", text: "A real person who knows your goals and helps you close, onboard and expand accounts" },
    { title: "Early access", text: "Preview new models and features before launch and shape the roadmap with your feedback" },
    { title: "Enablement & training", text: "A partner portal with demo environments, sales decks, certification and product training" },
    { title: "Shared pipeline", text: "Transparent deal registration and qualified leads routed to the partners best placed to win" },
  ],
  stepsTitlePre: "How it ", stepsTitleAccent: "works", stepsSub: "From first hello to growing revenue — usually a couple of weeks, not months",
  steps: [
    { title: "Apply", text: "Tell us about your business, your clients and the partnership you have in mind" },
    { title: "Onboard", text: "Get a dedicated manager, training, materials and a demo environment to get going fast" },
    { title: "Launch", text: "Go live with co-marketing support and your first joint opportunities in the pipeline" },
    { title: "Grow", text: "Scale with shared pipeline, recurring revenue and a roadmap you help shape" },
  ],
  cta: { title: "Ready to partner with us?", sub: "Tell us about your business and we’ll come back within two business days with a plan tailored to you", button: "Become a partner" },
};

const es: PartnersContent = {
  heroPre: "Haz crecer tu negocio ", heroAccent: "con TalentMind",
  heroP: "Únete a nuestra red de socios y lleva la evaluación de candidatos con IA a tus clientes. Intégrala, recomiéndala o revéndela: te ayudamos a contratar mejor y a ganar mientras lo haces",
  ctaPrimary: "Hazte socio", ctaSecondary: "Ver modelos",
  trust: ["Comisión recurrente", "Co-marketing", "Gerente dedicado"],
  logosLabel: "Se integra con las herramientas que ya usan tus clientes",
  stats: [["4", "Modelos de partnership"], ["30%", "Hasta de comisión"], ["2 sem", "Media para arrancar"], ["1:1", "Gerente dedicado"]],
  typesTitlePre: "Formas de ", typesTitleAccent: "asociarte", typesSub: "Elige el modelo que encaje con tu negocio, o combina varios. Todos los socios reciben el mismo apoyo cercano",
  types: [
    { title: "Tecnología", best: "Ideal para ATS, HRIS y bolsas de empleo", points: ["Integra la evaluación con IA vía API", "Integraciones y listados creados juntos", "Soporte técnico compartido"] },
    { title: "Referidos", best: "Ideal para asesores y comunidades", points: ["Comisión recurrente en cada venta", "Enlace simple y registro de oportunidades", "Sin trabajo técnico"] },
    { title: "Reventa", best: "Ideal para proveedores de HR-tech", points: ["Precios y márgenes mayoristas", "Vende bajo tu propia oferta", "Onboarding personalizado"] },
    { title: "Agencias", best: "Ideal para firmas de selección", points: ["Informes objetivos de soft skills", "Destácate ante tus clientes", "Precios por volumen"] },
  ],
  benTitlePre: "Por qué los socios ", benTitleAccent: "nos eligen", benSub: "Invertimos en los socios que invierten en nosotros: con márgenes reales y soporte real",
  benefits: [
    { title: "Comisión competitiva", text: "Comisiones recurrentes generosas y márgenes de reventa que crecen con tu cartera" },
    { title: "Co-marketing", text: "Campañas conjuntas, casos de éxito y reparto de leads para llevar tu marca a nuevas audiencias" },
    { title: "Gerente dedicado", text: "Una persona real que conoce tus objetivos y te ayuda a cerrar, incorporar y expandir cuentas" },
    { title: "Acceso anticipado", text: "Prueba modelos y funciones antes del lanzamiento y da forma a la hoja de ruta con tu feedback" },
    { title: "Capacitación", text: "Un portal de socios con entornos de demo, presentaciones, certificación y formación de producto" },
    { title: "Pipeline compartido", text: "Registro de oportunidades transparente y leads cualificados para los socios mejor posicionados" },
  ],
  stepsTitlePre: "Cómo ", stepsTitleAccent: "funciona", stepsSub: "Del primer hola a ingresos crecientes: normalmente un par de semanas, no meses",
  steps: [
    { title: "Solicita", text: "Cuéntanos sobre tu negocio, tus clientes y el tipo de partnership que tienes en mente" },
    { title: "Incorpórate", text: "Recibe un gerente dedicado, formación, materiales y un entorno de demo para arrancar rápido" },
    { title: "Lanza", text: "Sal al mercado con apoyo de co-marketing y tus primeras oportunidades conjuntas" },
    { title: "Crece", text: "Escala con pipeline compartido, ingresos recurrentes y una hoja de ruta que ayudas a definir" },
  ],
  cta: { title: "¿Listo para asociarte con nosotros?", sub: "Cuéntanos sobre tu negocio y te responderemos en dos días hábiles con un plan a tu medida", button: "Hazte socio" },
};

const pt: PartnersContent = {
  heroPre: "Faça seu negócio crescer ", heroAccent: "com a TalentMind",
  heroP: "Junte-se à nossa rede de parceiros e leve a avaliação de candidatos com IA aos seus clientes. Integre, indique ou revenda — ajudamos você a contratar melhor e a ganhar fazendo isso",
  ctaPrimary: "Seja parceiro", ctaSecondary: "Ver modelos",
  trust: ["Comissão recorrente", "Co-marketing", "Gerente dedicado"],
  logosLabel: "Integra-se às ferramentas que seus clientes já usam",
  stats: [["4", "Modelos de parceria"], ["30%", "Até de comissão"], ["2 sem", "Média para começar"], ["1:1", "Gerente dedicado"]],
  typesTitlePre: "Formas de ", typesTitleAccent: "ser parceiro", typesSub: "Escolha o modelo que combina com o seu negócio, ou combine vários. Todos os parceiros recebem o mesmo apoio de perto",
  types: [
    { title: "Tecnologia", best: "Ideal para ATS, HRIS e portais de vagas", points: ["Integre a avaliação com IA via API", "Integrações e listagens construídas juntos", "Suporte técnico compartilhado"] },
    { title: "Indicação", best: "Ideal para consultores e comunidades", points: ["Comissão recorrente em cada negócio", "Link simples e registro de oportunidades", "Sem trabalho técnico"] },
    { title: "Revenda", best: "Ideal para fornecedores de HR-tech", points: ["Preços e margens de atacado", "Venda sob a sua própria oferta", "Onboarding personalizado"] },
    { title: "Agências", best: "Ideal para empresas de recrutamento", points: ["Relatórios objetivos de soft skills", "Destaque-se para seus clientes", "Preços por volume"] },
  ],
  benTitlePre: "Por que os parceiros ", benTitleAccent: "nos escolhem", benSub: "Investimos nos parceiros que investem em nós — com margens reais e suporte real",
  benefits: [
    { title: "Comissão competitiva", text: "Comissões recorrentes generosas e margens de revenda que crescem com sua carteira" },
    { title: "Co-marketing", text: "Campanhas conjuntas, cases e compartilhamento de leads para levar sua marca a novos públicos" },
    { title: "Gerente dedicado", text: "Uma pessoa real que conhece seus objetivos e ajuda a fechar, integrar e expandir contas" },
    { title: "Acesso antecipado", text: "Teste modelos e recursos antes do lançamento e ajude a moldar o roadmap com seu feedback" },
    { title: "Capacitação", text: "Um portal de parceiros com ambientes de demo, apresentações, certificação e treinamento de produto" },
    { title: "Pipeline compartilhado", text: "Registro de oportunidades transparente e leads qualificados para os parceiros mais bem posicionados" },
  ],
  stepsTitlePre: "Como ", stepsTitleAccent: "funciona", stepsSub: "Do primeiro olá à receita crescente — normalmente algumas semanas, não meses",
  steps: [
    { title: "Inscreva-se", text: "Conte sobre seu negócio, seus clientes e o tipo de parceria que você tem em mente" },
    { title: "Integre-se", text: "Receba um gerente dedicado, treinamento, materiais e um ambiente de demo para começar rápido" },
    { title: "Lance", text: "Vá ao mercado com apoio de co-marketing e suas primeiras oportunidades conjuntas" },
    { title: "Cresça", text: "Escale com pipeline compartilhado, receita recorrente e um roadmap que você ajuda a definir" },
  ],
  cta: { title: "Pronto para ser nosso parceiro?", sub: "Conte sobre seu negócio e retornaremos em dois dias úteis com um plano sob medida para você", button: "Seja parceiro" },
};

const ar: PartnersContent = {
  heroPre: "نمِّ عملك ", heroAccent: "مع TalentMind",
  heroP: "انضمّ إلى شبكة شركائنا وقدّم لعملائك تقييم المرشّحين المدعوم بالذكاء الاصطناعي. ادمجه أو رشّحه أو أعد بيعه — نساعدك على تقديم توظيف أفضل والربح أثناء ذلك",
  ctaPrimary: "كن شريكًا", ctaSecondary: "استكشف النماذج",
  trust: ["حصّة إيرادات متكرّرة", "تسويق مشترك", "مدير مخصّص"],
  logosLabel: "يتكامل مع الأدوات التي يستخدمها عملاؤك بالفعل",
  stats: [["4", "نماذج شراكة"], ["30%", "حتى من حصّة الإيرادات"], ["2 أسبوع", "المتوسّط حتى الإطلاق"], ["1:1", "مدير مخصّص"]],
  typesTitlePre: "طرق ", typesTitleAccent: "الشراكة", typesSub: "اختر النموذج الذي يناسب عملك — أو ادمج بضعة نماذج. يحصل كل شريك على نفس الدعم المباشر",
  types: [
    { title: "التقنية", best: "الأنسب لأنظمة تتبّع المتقدّمين وأنظمة معلومات الموارد البشرية ولوحات الوظائف", points: ["دمج تقييم الذكاء الاصطناعي عبر API الخاصة بنا", "تكاملات وقوائم مبنيّة بشكل مشترك", "دعم تقني مشترك"] },
    { title: "الترشيح", best: "الأنسب للمستشارين والمجتمعات", points: ["عمولة متكرّرة على كل صفقة", "رابط بسيط وتسجيل للصفقات", "لا حاجة لأي عمل تقني"] },
    { title: "إعادة البيع", best: "الأنسب لموردي تقنيات الموارد البشرية", points: ["أسعار وهوامش الجملة", "بِع تحت عرضك الخاص", "إعداد متكامل بعناية فائقة"] },
    { title: "الوكالات", best: "الأنسب لشركات التوظيف", points: ["تقارير موضوعية للمهارات الشخصية", "تميّز أمام عملائك", "تسعير حسب الحجم"] },
  ],
  benTitlePre: "لماذا يختارنا ", benTitleAccent: "الشركاء", benSub: "نستثمر في الشركاء الذين يستثمرون فينا — بهوامش حقيقية ودعم حقيقي",
  benefits: [
    { title: "حصّة إيرادات تنافسية", text: "عمولات متكرّرة سخيّة وهوامش إعادة بيع تنمو مع محفظة أعمالك" },
    { title: "تسويق مشترك", text: "حملات مشتركة ودراسات حالة ومشاركة العملاء المحتملين لإيصال علامتك التجارية إلى جماهير جديدة" },
    { title: "مدير مخصّص", text: "شخص حقيقي يعرف أهدافك ويساعدك على الإغلاق والإعداد وتوسيع الحسابات" },
    { title: "وصول مبكر", text: "عاين النماذج والميزات الجديدة قبل الإطلاق وشكّل خارطة الطريق بملاحظاتك" },
    { title: "التمكين والتدريب", text: "بوابة شركاء تضمّ بيئات تجريبية وعروض مبيعات وشهادات وتدريبًا على المنتج" },
    { title: "قائمة فرص مشتركة", text: "تسجيل صفقات شفّاف وعملاء محتملون مؤهّلون يُوجّهون إلى الشركاء الأقدر على الفوز" },
  ],
  stepsTitlePre: "كيف ", stepsTitleAccent: "تعمل", stepsSub: "من أول تحية إلى إيرادات متنامية — عادةً بضعة أسابيع، لا أشهر",
  steps: [
    { title: "تقديم الطلب", text: "أخبرنا عن عملك وعملائك ونوع الشراكة التي تفكّر فيها" },
    { title: "الإعداد", text: "احصل على مدير مخصّص وتدريب ومواد وبيئة تجريبية للانطلاق بسرعة" },
    { title: "الإطلاق", text: "انطلق بدعم التسويق المشترك وأولى فرصك المشتركة في قائمة الفرص" },
    { title: "النمو", text: "وسّع نطاقك بقائمة فرص مشتركة وإيرادات متكرّرة وخارطة طريق تساعد في تشكيلها" },
  ],
  cta: { title: "هل أنت مستعدّ للشراكة معنا؟", sub: "أخبرنا عن عملك وسنعود إليك خلال يومي عمل بخطة مصمّمة خصيصًا لك", button: "كن شريكًا" },
};

export const PARTNERS: Record<Locale, PartnersContent> = { en, es, pt, ar };
