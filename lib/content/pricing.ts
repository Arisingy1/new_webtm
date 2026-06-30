import type { Locale } from "@/lib/i18n";

export type Tier = { name: string; price: string; per: string; desc: string; incl: string; feats: string[]; hot: boolean };
export type PricingContent = {
  h1a: string; h1accent: string; sub: string;
  tiers: Tier[];
  cta: (name: string) => string; startFree: string;
  offerPre: string; offerLink: string;
  ent: { badge: string; title: string; sub: string; desc: string; cta: string; feats: string[] };
  faqTitle: string; faq: [string, string][];
  help: { title: string; sub: string; cta: string };
};

const en: PricingContent = {
  h1a: "Choose your ", h1accent: "hiring plan", sub: "Transparent pricing that grows with your team",
  tiers: [
    { name: "Free", price: "$0", per: "5 interviews", desc: "To try the platform. No credit card required", incl: "Included in the plan:", feats: ["Corporate culture profile upload", "Basic soft-skills scoring and AI report", "Basic analytics dashboards"], hot: false },
    { name: "Starter", price: "$149", per: "per month · up to 30 interviews", desc: "Perfect for small teams and a fast start with AI in hiring", incl: "Everything in Free, plus:", feats: ["Video-conferencing integrations", "Data stored in secure U.S. data centers", "Email support"], hot: false },
    { name: "Growth", price: "$449", per: "per month · up to 100 interviews", desc: "For fast-growing companies and structured HR teams", incl: "Everything in Starter, plus:", feats: ["ATS integrations", "Branded reports (your company logo)", "Priority support"], hot: true },
    { name: "Scale", price: "$1,699", per: "per month · up to 400 interviews", desc: "For large businesses that need customization and automation", incl: "Everything in Growth, plus:", feats: ["Open API and webhooks", "1 custom AI competency model", "Bias control", "Dedicated account manager"], hot: false },
  ],
  cta: (n) => `Choose ${n}`, startFree: "Start for free",
  offerPre: "By providing payment information, you accept the terms of the ", offerLink: "Terms of Service",
  ent: { badge: "Enterprise", title: "Custom pricing", sub: "Unlimited interview volume", desc: "Maximum security and tailored solutions for enterprises. Everything in Scale, plus extended capabilities", cta: "Discuss a rollout", feats: ["On-premise deployment (within the client's private perimeter)", "Tailored AI models for your specific needs", "Complex integrations with internal HR/ERP systems", "SSO support and a custom role-based access model"] },
  faqTitle: "FAQ",
  faq: [
    ["What counts as one interview?", "One uploaded or recorded interview session that produces a soft-skills report"],
    ["Do I need a credit card to start?", "No. The Free plan and 5 free interviews are available without a card"],
    ["Can I change my plan later?", "Yes, you can upgrade or downgrade at any time — billing is prorated"],
    ["Where is interview data stored?", "In a secure, encrypted cloud in U.S. data centers. SSO and advanced access control are available on Scale and Enterprise"],
  ],
  help: { title: "Still have pricing questions?", sub: "We'll help you choose the right plan for your team and get you set up", cta: "Contact us" },
};

const es: PricingContent = {
  h1a: "Elige tu ", h1accent: "plan de contratación", sub: "Precios transparentes que crecen con tu equipo",
  tiers: [
    { name: "Free", price: "$0", per: "5 entrevistas", desc: "Para probar la plataforma. Sin tarjeta de crédito", incl: "Incluido en el plan:", feats: ["Carga del perfil de cultura corporativa", "Puntuación básica de soft skills e informe con IA", "Paneles de analítica básicos"], hot: false },
    { name: "Starter", price: "$149", per: "al mes · hasta 30 entrevistas", desc: "Ideal para equipos pequeños y un inicio rápido con IA en la contratación", incl: "Todo lo de Free, y además:", feats: ["Integraciones con videoconferencia", "Datos en centros de datos seguros en EE. UU.", "Soporte por correo"], hot: false },
    { name: "Growth", price: "$449", per: "al mes · hasta 100 entrevistas", desc: "Para empresas en rápido crecimiento y equipos de RR. HH. estructurados", incl: "Todo lo de Starter, y además:", feats: ["Integraciones con ATS", "Informes con tu marca (logo de la empresa)", "Soporte prioritario"], hot: true },
    { name: "Scale", price: "$1,699", per: "al mes · hasta 400 entrevistas", desc: "Para grandes empresas que necesitan personalización y automatización", incl: "Todo lo de Growth, y además:", feats: ["API abierta y webhooks", "1 modelo de competencias de IA a medida", "Control de sesgos", "Gerente de cuenta dedicado"], hot: false },
  ],
  cta: (n) => `Elegir ${n}`, startFree: "Empezar gratis",
  offerPre: "Al proporcionar la información de pago, aceptas los ", offerLink: "Términos del servicio",
  ent: { badge: "Enterprise", title: "Precio a medida", sub: "Volumen de entrevistas ilimitado", desc: "Máxima seguridad y soluciones a medida para empresas. Todo lo de Scale, con capacidades ampliadas", cta: "Hablar de un despliegue", feats: ["Despliegue on-premise (dentro del perímetro privado del cliente)", "Modelos de IA a medida para tus necesidades específicas", "Integraciones complejas con sistemas internos de RR. HH./ERP", "Soporte SSO y un modelo de acceso por roles personalizado"] },
  faqTitle: "Preguntas frecuentes",
  faq: [
    ["¿Qué cuenta como una entrevista?", "Una sesión de entrevista subida o grabada que genera un informe de soft skills"],
    ["¿Necesito tarjeta para empezar?", "No. El plan Free y las 5 entrevistas gratuitas están disponibles sin tarjeta"],
    ["¿Puedo cambiar de plan después?", "Sí, puedes subir o bajar de plan en cualquier momento — el cobro es prorrateado"],
    ["¿Dónde se guardan los datos de las entrevistas?", "En una nube segura y cifrada en centros de datos de EE. UU. SSO y control de acceso avanzado están disponibles en Scale y Enterprise"],
  ],
  help: { title: "¿Aún tienes dudas sobre precios?", sub: "Te ayudamos a elegir el plan adecuado para tu equipo y a configurarlo", cta: "Contáctanos" },
};

const pt: PricingContent = {
  h1a: "Escolha seu ", h1accent: "plano de contratação", sub: "Preços transparentes que crescem com sua equipe",
  tiers: [
    { name: "Free", price: "$0", per: "5 entrevistas", desc: "Para experimentar a plataforma. Sem cartão de crédito", incl: "Incluído no plano:", feats: ["Upload do perfil de cultura corporativa", "Pontuação básica de soft skills e relatório com IA", "Painéis de análise básicos"], hot: false },
    { name: "Starter", price: "$149", per: "por mês · até 30 entrevistas", desc: "Perfeito para equipes pequenas e um começo rápido com IA na contratação", incl: "Tudo do Free, e mais:", feats: ["Integrações com videoconferência", "Dados em data centers seguros nos EUA", "Suporte por e-mail"], hot: false },
    { name: "Growth", price: "$449", per: "por mês · até 100 entrevistas", desc: "Para empresas em crescimento rápido e equipes de RH estruturadas", incl: "Tudo do Starter, e mais:", feats: ["Integrações com ATS", "Relatórios com sua marca (logo da empresa)", "Suporte prioritário"], hot: true },
    { name: "Scale", price: "$1,699", per: "por mês · até 400 entrevistas", desc: "Para grandes empresas que precisam de personalização e automação", incl: "Tudo do Growth, e mais:", feats: ["API aberta e webhooks", "1 modelo de competências de IA personalizado", "Controle de viés", "Gerente de conta dedicado"], hot: false },
  ],
  cta: (n) => `Escolher ${n}`, startFree: "Começar grátis",
  offerPre: "Ao fornecer as informações de pagamento, você aceita os ", offerLink: "Termos de serviço",
  ent: { badge: "Enterprise", title: "Preço sob medida", sub: "Volume de entrevistas ilimitado", desc: "Segurança máxima e soluções sob medida para empresas. Tudo do Scale, com recursos ampliados", cta: "Falar sobre uma implantação", feats: ["Implantação on-premise (dentro do perímetro privado do cliente)", "Modelos de IA sob medida para suas necessidades específicas", "Integrações complexas com sistemas internos de RH/ERP", "Suporte a SSO e um modelo de acesso por papéis personalizado"] },
  faqTitle: "Perguntas frequentes",
  faq: [
    ["O que conta como uma entrevista?", "Uma sessão de entrevista enviada ou gravada que gera um relatório de soft skills"],
    ["Preciso de cartão para começar?", "Não. O plano Free e as 5 entrevistas gratuitas estão disponíveis sem cartão"],
    ["Posso mudar de plano depois?", "Sim, você pode fazer upgrade ou downgrade a qualquer momento — a cobrança é proporcional"],
    ["Onde os dados das entrevistas são armazenados?", "Em uma nuvem segura e criptografada em data centers nos EUA. SSO e controle de acesso avançado estão disponíveis no Scale e Enterprise"],
  ],
  help: { title: "Ainda tem dúvidas sobre preços?", sub: "Ajudamos você a escolher o plano certo para sua equipe e a configurá-lo", cta: "Fale conosco" },
};

const ar: PricingContent = {
  h1a: "اختر ", h1accent: "خطة التوظيف", sub: "أسعار شفّافة تنمو مع فريقك",
  tiers: [
    { name: "Free", price: "$0", per: "5 مقابلات", desc: "لتجربة المنصة. لا حاجة لبطاقة ائتمان", incl: "مشمول في الخطة:", feats: ["رفع ملف الثقافة المؤسسية", "تقييم أساسي للمهارات الشخصية وتقرير بالذكاء الاصطناعي", "لوحات تحليلات أساسية"], hot: false },
    { name: "Starter", price: "$149", per: "شهريًا · حتى 30 مقابلة", desc: "مثالية للفرق الصغيرة وللبدء السريع مع الذكاء الاصطناعي في التوظيف", incl: "كل ما في Free، بالإضافة إلى:", feats: ["تكاملات مع مؤتمرات الفيديو", "تخزين البيانات في مراكز بيانات آمنة في الولايات المتحدة", "دعم عبر البريد الإلكتروني"], hot: false },
    { name: "Growth", price: "$449", per: "شهريًا · حتى 100 مقابلة", desc: "للشركات سريعة النمو وفرق الموارد البشرية المنظّمة", incl: "كل ما في Starter، بالإضافة إلى:", feats: ["تكاملات مع أنظمة تتبّع المتقدّمين", "تقارير بعلامتك التجارية (شعار شركتك)", "دعم ذو أولوية"], hot: true },
    { name: "Scale", price: "$1,699", per: "شهريًا · حتى 400 مقابلة", desc: "للشركات الكبيرة التي تحتاج إلى التخصيص والأتمتة", incl: "كل ما في Growth، بالإضافة إلى:", feats: ["API مفتوحة وwebhooks", "نموذج كفاءات ذكاء اصطناعي مخصّص واحد", "ضبط التحيّز", "مدير حساب مخصّص"], hot: false },
  ],
  cta: (n) => `اختر ${n}`, startFree: "ابدأ مجانًا",
  offerPre: "بتقديمك معلومات الدفع، فإنك تقبل شروط ", offerLink: "شروط الخدمة",
  ent: { badge: "Enterprise", title: "تسعير مخصّص", sub: "حجم مقابلات غير محدود", desc: "أقصى درجات الأمان وحلول مصمّمة خصيصًا للمؤسسات. كل ما في Scale، بالإضافة إلى إمكانات موسّعة", cta: "ناقش عملية التطبيق", feats: ["نشر داخلي (ضمن النطاق الخاص للعميل)", "نماذج ذكاء اصطناعي مصمّمة لاحتياجاتك المحدّدة", "تكاملات معقّدة مع أنظمة الموارد البشرية/تخطيط الموارد الداخلية", "دعم تسجيل الدخول الموحّد ونموذج وصول مخصّص قائم على الأدوار"] },
  faqTitle: "الأسئلة الشائعة",
  faq: [
    ["ما الذي يُحتسب كمقابلة واحدة؟", "جلسة مقابلة واحدة مرفوعة أو مسجّلة تُنتج تقريرًا للمهارات الشخصية"],
    ["هل أحتاج إلى بطاقة ائتمان للبدء؟", "لا. خطة Free و5 مقابلات مجانية متاحة دون بطاقة"],
    ["هل يمكنني تغيير خطتي لاحقًا؟", "نعم، يمكنك الترقية أو خفض الخطة في أي وقت — وتُحتسب الفاتورة بالتناسب"],
    ["أين تُخزَّن بيانات المقابلات؟", "في سحابة آمنة ومشفّرة في مراكز بيانات بالولايات المتحدة. تسجيل الدخول الموحّد والتحكّم المتقدّم في الوصول متاحان في Scale وEnterprise"],
  ],
  help: { title: "ما زالت لديك أسئلة حول الأسعار؟", sub: "سنساعدك على اختيار الخطة المناسبة لفريقك وعلى إعدادها", cta: "تواصل معنا" },
};

export const PRICING: Record<Locale, PricingContent> = { en, es, pt, ar };
