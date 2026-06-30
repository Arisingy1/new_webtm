import type { Locale } from "@/lib/i18n";

export type Block = string | { sub: string } | { list: string[] };
export type Section = { h: string; body: Block[] };
export type PlanTier = { name: string; price: string; limit: string; incl: string; feats: string[] };
export type OfferContent = {
  kicker: string; title: string; org: string; updated: string; copyright: string;
  sections: Section[];
  plans: { kicker: string; title: string; intro: string; cPlan: string; cPrice: string; cLimit: string; cIncluded: string; tiers: PlanTier[]; notesLabel: string; notes: string[] };
};

const en: OfferContent = {
  kicker: "Legal information", title: "Terms of Service", org: "TalentMind AI CORP", updated: "Last updated: June 8, 2026", copyright: "© 2026 TalentMind AI CORP",
  sections: [
    { h: "1. Agreement to Terms", body: [
      "These Terms of Service (the “Terms”) are a binding agreement between you and TalentMind AI CORP, a Delaware corporation (“TalentMind,” “we,” “us,” or “our”), governing your access to and use of the TalentMind platform, websites, and related services (collectively, the “Services”).",
      "By creating an account, clicking “I agree,” or using the Services, you accept these Terms. If you are using the Services on behalf of an entity, you represent that you have authority to bind it.",
      "If you do not agree to these Terms, do not use the Services.",
    ] },
    { h: "2. The Services", body: [
      "2.1. TalentMind provides an AI-assisted platform that analyzes interview recordings and other materials to evaluate candidate soft skills and cultural fit, and generates assessment reports, subject to your selected plan.",
      "2.2. The features and usage limits available to you are determined by your plan, as described on talentmind.app and summarized in the Plans section below.",
      "2.3. We may modify, add, or discontinue features at any time, with reasonable notice of material changes affecting a paid plan.",
    ] },
    { h: "3. Eligibility & Accounts", body: [
      "3.1. You must be at least 18 years old and able to form a binding contract.",
      "3.2. You are responsible for your account credentials and all activity under your account, and for the conduct of users you authorize.",
    ] },
    { h: "4. Acceptable Use", body: [
      "You agree not to:",
      { list: ["use the Services in violation of any law or third-party rights, including employment, anti-discrimination, and privacy laws;", "upload content you lack the right to upload, or for which you have not obtained required notices or consents;", "reverse engineer, scrape, resell, or sublicense the Services, except as permitted;", "interfere with the Services or attempt unauthorized access;", "use the Services as the sole basis for an employment decision without appropriate human review."] },
      "AI-generated assessments are decision-support tools and may contain inaccuracies; you are responsible for your hiring decisions and for lawful, fair, non-discriminatory use.",
    ] },
    { h: "5. Customer & Candidate Data", body: [
      "5.1. You retain all rights to the data you upload (“Customer Data”). You grant us a limited license to process it to provide and improve the Services, as described in our Privacy Policy.",
      "5.2. You are the controller of candidate personal information you upload and are responsible for required notices and consents; we act as your service provider/processor.",
    ] },
    { h: "6. Fees & Payment", body: [
      "6.1. Paid plans are billed monthly in advance in U.S. dollars (USD), based on your selected plan and the pricing posted on talentmind.app.",
      "6.2. Payments are processed by our payment providers; you authorize us to charge your payment method for all fees due.",
      "6.3. Except as required by law, fees are non-refundable, and unused assessment limits do not roll over.",
      "6.4. We may change fees prospectively; you are responsible for applicable taxes other than taxes on our net income.",
    ] },
    { h: "7. Free Plan", body: ["The Free plan is offered one time to evaluate the Services, with no payment and no card required. It is provided “as is” and may be modified or discontinued at any time."] },
    { h: "8. Intellectual Property", body: ["The Services (excluding Customer Data) are owned by TalentMind and its licensors. We grant you a limited, non-exclusive, non-transferable right to use the Services during your subscription for your internal business purposes. All other rights are reserved."] },
    { h: "9. Confidentiality", body: ["Each party will use the other's confidential information only to perform under these Terms and will protect it with reasonable care. This does not apply to information that is public, independently developed, or rightfully received from a third party."] },
    { h: "10. Disclaimers", body: ["THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE OR THAT RESULTS WILL BE ACCURATE."] },
    { h: "11. Limitation of Liability", body: ["TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOST PROFITS. TALENTMIND'S TOTAL LIABILITY WILL NOT EXCEED THE AMOUNTS YOU PAID IN THE TWELVE (12) MONTHS BEFORE THE CLAIM."] },
    { h: "12. Indemnification", body: ["You will defend, indemnify, and hold harmless TalentMind from third-party claims arising out of your Customer Data, your use of the Services, or your breach of these Terms or applicable law."] },
    { h: "13. Term & Termination", body: [
      "13.1. These Terms remain in effect while you use the Services. You may cancel at any time, effective at the end of the current billing period.",
      "13.2. We may suspend or terminate access if you breach these Terms, fail to pay, or create legal or security risk.",
      "13.3. Provisions that should survive termination (fees owed, IP, confidentiality, disclaimers, liability, indemnification) will survive.",
    ] },
    { h: "14. Governing Law & Disputes", body: [
      "14.1. These Terms are governed by the laws of the State of Delaware, without regard to conflict-of-laws rules.",
      "14.2. The parties will first try to resolve disputes informally; any dispute unresolved within thirty (30) days will be resolved by binding arbitration in the United States, except that either party may seek injunctive relief to protect its IP or confidential information.",
      "14.3. You and TalentMind waive any right to a jury trial and to participate in a class action. These Terms are in the English language.",
    ] },
    { h: "15. Changes to These Terms", body: ["We may update these Terms. When we make material changes, we update the “last updated” date and provide notice. Continued use after changes take effect constitutes acceptance."] },
    { h: "16. Contact", body: [{ list: ["TalentMind AI CORP (a Delaware corporation)", "Email: legal@talentmind.app", "Web: talentmind.app"] }] },
  ],
  plans: {
    kicker: "Plans & pricing", title: "TalentMind subscription plans", intro: "The Services are offered under four plans. The available features and the limits on the number of assessments are determined by the plan you select:",
    cPlan: "Plan", cPrice: "Price", cLimit: "Assessment limit", cIncluded: "What's included",
    tiers: [
      { name: "Free", price: "$0", limit: "5 assessments (one-time)", incl: "Included:", feats: ["Corporate culture profile upload", "Basic soft-skill scoring and AI report", "Basic analytics dashboards"] },
      { name: "Starter", price: "$149 / mo", limit: "up to 30 assessments / mo", incl: "Everything in Free, plus:", feats: ["Video-conferencing integrations", "Data stored in secure U.S. data centers", "Email support"] },
      { name: "Growth", price: "$449 / mo", limit: "up to 100 assessments / mo", incl: "Everything in Starter, plus:", feats: ["ATS integrations", "Report branding (company logo)", "Priority support"] },
      { name: "Scale", price: "$1,699 / mo", limit: "up to 400 assessments / mo", incl: "Everything in Growth, plus:", feats: ["Open API and webhooks", "1 custom AI competency model", "Bias controls", "Dedicated account manager"] },
    ],
    notesLabel: "Additional plan terms:",
    notes: ["The Free plan is offered one time so you can evaluate the Services — no payment and no card required.", "Paid plans are billed in advance for a billing period equal to one (1) calendar month.", "Any assessment limit unused during a billing period does not carry over and is not refundable.", "Integrations are configured by you using the documentation we provide (the Scale plan includes API access)."],
  },
};

const es: OfferContent = {
  kicker: "Información legal", title: "Términos del servicio", org: "TalentMind AI CORP", updated: "Última actualización: 8 de junio de 2026", copyright: "© 2026 TalentMind AI CORP",
  sections: [
    { h: "1. Aceptación de los Términos", body: [
      "Estos Términos del servicio (los «Términos») constituyen un acuerdo vinculante entre tú y TalentMind AI CORP («TalentMind», «nosotros»), que rige tu acceso y uso de la plataforma, los sitios web y los servicios relacionados de TalentMind (en conjunto, los «Servicios»).",
      "Al crear una cuenta, hacer clic en «Acepto» o usar los Servicios, aceptas estos Términos. Si los usas en nombre de una entidad, declaras tener autoridad para obligarla.",
      "Si no estás de acuerdo con estos Términos, no uses los Servicios.",
    ] },
    { h: "2. Los Servicios", body: [
      "2.1. TalentMind ofrece una plataforma asistida por IA que analiza grabaciones de entrevistas y otros materiales para evaluar las soft skills y el ajuste cultural de los candidatos, y genera informes de evaluación, según el plan seleccionado.",
      "2.2. Las funciones y los límites de uso disponibles dependen de tu plan, descrito en talentmind.app y resumido en la sección Planes.",
      "2.3. Podemos modificar, añadir o retirar funciones en cualquier momento, con aviso razonable de los cambios sustanciales que afecten a un plan de pago.",
    ] },
    { h: "3. Elegibilidad y cuentas", body: [
      "3.1. Debes tener al menos 18 años y capacidad para celebrar un contrato vinculante.",
      "3.2. Eres responsable de tus credenciales y de toda la actividad en tu cuenta, así como de la conducta de los usuarios que autorices.",
    ] },
    { h: "4. Uso aceptable", body: [
      "Te comprometes a no:",
      { list: ["usar los Servicios infringiendo leyes o derechos de terceros, incluidas leyes laborales, antidiscriminación y de privacidad;", "subir contenido que no tengas derecho a subir o para el que no hayas obtenido los avisos o consentimientos exigidos;", "realizar ingeniería inversa, extraer datos, revender o sublicenciar los Servicios, salvo lo permitido;", "interferir en los Servicios o intentar accesos no autorizados;", "usar los Servicios como única base de una decisión de contratación sin una revisión humana adecuada."] },
      "Las evaluaciones generadas por IA son herramientas de apoyo a la decisión y pueden contener imprecisiones; eres responsable de tus decisiones de contratación y de un uso lícito, justo y no discriminatorio.",
    ] },
    { h: "5. Datos del cliente y de los candidatos", body: [
      "5.1. Conservas todos los derechos sobre los datos que subes («Datos del cliente»). Nos concedes una licencia limitada para procesarlos a fin de prestar y mejorar los Servicios, según nuestra Política de privacidad.",
      "5.2. Eres el responsable de la información personal de los candidatos que subes y de los avisos y consentimientos exigidos; nosotros actuamos como tu proveedor de servicios/encargado del tratamiento.",
    ] },
    { h: "6. Precios y pago", body: [
      "6.1. Los planes de pago se facturan por adelantado mensualmente en dólares estadounidenses (USD), según tu plan y los precios publicados en talentmind.app.",
      "6.2. Los pagos los procesan nuestros proveedores; nos autorizas a cobrar todas las tarifas debidas en tu medio de pago.",
      "6.3. Salvo que la ley lo exija, las tarifas no son reembolsables y los límites de evaluación no utilizados no se acumulan.",
      "6.4. Podemos cambiar las tarifas a futuro; eres responsable de los impuestos aplicables, salvo los que graven nuestra renta neta.",
    ] },
    { h: "7. Plan Free", body: ["El plan Free se ofrece una sola vez para evaluar los Servicios, sin pago ni tarjeta. Se ofrece «tal cual» y puede modificarse o retirarse en cualquier momento."] },
    { h: "8. Propiedad intelectual", body: ["Los Servicios (excepto los Datos del cliente) son propiedad de TalentMind y sus licenciantes. Te concedemos un derecho limitado, no exclusivo e intransferible de usar los Servicios durante tu suscripción para tus fines internos de negocio. Los demás derechos quedan reservados."] },
    { h: "9. Confidencialidad", body: ["Cada parte usará la información confidencial de la otra solo para cumplir estos Términos y la protegerá con cuidado razonable. Esto no aplica a información pública, desarrollada de forma independiente o recibida legítimamente de un tercero."] },
    { h: "10. Renuncias de garantía", body: ["LOS SERVICIOS SE OFRECEN «TAL CUAL» Y «SEGÚN DISPONIBILIDAD», SIN GARANTÍAS DE NINGÚN TIPO, EXPRESAS, IMPLÍCITAS O LEGALES, INCLUIDAS LAS DE COMERCIABILIDAD, IDONEIDAD PARA UN FIN Y NO INFRACCIÓN. NO GARANTIZAMOS QUE LOS SERVICIOS SEAN ININTERRUMPIDOS O SIN ERRORES NI QUE LOS RESULTADOS SEAN EXACTOS."] },
    { h: "11. Limitación de responsabilidad", body: ["EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, NINGUNA PARTE SERÁ RESPONSABLE POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES O PUNITIVOS, NI POR LUCRO CESANTE. LA RESPONSABILIDAD TOTAL DE TALENTMIND NO SUPERARÁ LO QUE HAYAS PAGADO EN LOS DOCE (12) MESES ANTERIORES A LA RECLAMACIÓN."] },
    { h: "12. Indemnización", body: ["Defenderás e indemnizarás a TalentMind frente a reclamaciones de terceros derivadas de tus Datos del cliente, tu uso de los Servicios o tu incumplimiento de estos Términos o de la ley aplicable."] },
    { h: "13. Vigencia y terminación", body: [
      "13.1. Estos Términos están vigentes mientras uses los Servicios. Puedes cancelar en cualquier momento, con efecto al final del período de facturación en curso.",
      "13.2. Podemos suspender o terminar el acceso si incumples estos Términos, no pagas o generas un riesgo legal o de seguridad.",
      "13.3. Las disposiciones que deban subsistir (tarifas debidas, PI, confidencialidad, renuncias, responsabilidad, indemnización) seguirán vigentes.",
    ] },
    { h: "14. Ley aplicable y disputas", body: [
      "14.1. Estos Términos se rigen por las leyes de la República Argentina, sin atender a sus normas de conflicto de leyes.",
      "14.2. Las partes intentarán resolver las disputas de forma informal; toda disputa no resuelta en treinta (30) días se someterá a la jurisdicción de los tribunales competentes de la República Argentina o, a opción de las partes, a arbitraje en Argentina, salvo que cualquiera de las partes solicite medidas cautelares para proteger su PI o información confidencial.",
      "14.3. Tú y TalentMind renunciáis a participar en acciones colectivas. Estos Términos están redactados en español para la región de América Latina.",
    ] },
    { h: "15. Cambios en estos Términos", body: ["Podemos actualizar estos Términos. Cuando hagamos cambios sustanciales, actualizaremos la fecha de «última actualización» y avisaremos. El uso continuado tras la entrada en vigor implica aceptación."] },
    { h: "16. Contacto", body: [{ list: ["TalentMind AI CORP", "Correo: legal@talentmind.app", "Web: talentmind.app"] }] },
  ],
  plans: {
    kicker: "Planes y precios", title: "Planes de suscripción de TalentMind", intro: "Los Servicios se ofrecen en cuatro planes. Las funciones disponibles y los límites de evaluaciones dependen del plan que elijas:",
    cPlan: "Plan", cPrice: "Precio", cLimit: "Límite de evaluaciones", cIncluded: "Qué incluye",
    tiers: [
      { name: "Free", price: "$0", limit: "5 evaluaciones (única vez)", incl: "Incluye:", feats: ["Carga del perfil de cultura corporativa", "Puntuación básica de soft skills e informe con IA", "Paneles de analítica básicos"] },
      { name: "Starter", price: "$149 / mes", limit: "hasta 30 evaluaciones / mes", incl: "Todo lo de Free, y además:", feats: ["Integraciones con videoconferencia", "Datos en centros de datos seguros en la región de América Latina", "Soporte por correo"] },
      { name: "Growth", price: "$449 / mes", limit: "hasta 100 evaluaciones / mes", incl: "Todo lo de Starter, y además:", feats: ["Integraciones con ATS", "Informes con tu marca (logo de la empresa)", "Soporte prioritario"] },
      { name: "Scale", price: "$1,699 / mes", limit: "hasta 400 evaluaciones / mes", incl: "Todo lo de Growth, y además:", feats: ["API abierta y webhooks", "1 modelo de competencias de IA a medida", "Control de sesgos", "Gerente de cuenta dedicado"] },
    ],
    notesLabel: "Condiciones adicionales de los planes:",
    notes: ["El plan Free se ofrece una sola vez para evaluar los Servicios: sin pago y sin tarjeta.", "Los planes de pago se facturan por adelantado por un período de facturación de un (1) mes natural.", "Cualquier límite de evaluaciones no utilizado en un período no se traslada ni es reembolsable.", "Las integraciones las configuras tú con la documentación que facilitamos (el plan Scale incluye acceso a la API)."],
  },
};

const pt: OfferContent = {
  kicker: "Informações legais", title: "Termos de serviço", org: "TalentMind AI CORP", updated: "Última atualização: 8 de junho de 2026", copyright: "© 2026 TalentMind AI CORP",
  sections: [
    { h: "1. Aceitação dos Termos", body: [
      "Estes Termos de serviço (os «Termos») são um acordo vinculante entre você e a TalentMind AI CORP («TalentMind», «nós»), que rege seu acesso e uso da plataforma, dos sites e dos serviços relacionados da TalentMind (em conjunto, os «Serviços»).",
      "Ao criar uma conta, clicar em «Concordo» ou usar os Serviços, você aceita estes Termos. Se os usar em nome de uma entidade, você declara ter autoridade para vinculá-la.",
      "Se você não concordar com estes Termos, não use os Serviços.",
    ] },
    { h: "2. Os Serviços", body: [
      "2.1. A TalentMind oferece uma plataforma assistida por IA que analisa gravações de entrevistas e outros materiais para avaliar as soft skills e o ajuste cultural dos candidatos, e gera relatórios de avaliação, conforme o plano selecionado.",
      "2.2. Os recursos e limites de uso disponíveis dependem do seu plano, descrito em talentmind.app e resumido na seção Planos.",
      "2.3. Podemos modificar, adicionar ou descontinuar recursos a qualquer momento, com aviso razoável de mudanças relevantes que afetem um plano pago.",
    ] },
    { h: "3. Elegibilidade e contas", body: [
      "3.1. Você deve ter pelo menos 18 anos e capacidade para celebrar um contrato vinculante.",
      "3.2. Você é responsável por suas credenciais e por toda a atividade na sua conta, bem como pela conduta dos usuários que autorizar.",
    ] },
    { h: "4. Uso aceitável", body: [
      "Você concorda em não:",
      { list: ["usar os Serviços violando leis ou direitos de terceiros, incluindo leis trabalhistas, antidiscriminação e de privacidade;", "enviar conteúdo que você não tenha direito de enviar ou para o qual não tenha obtido os avisos ou consentimentos exigidos;", "fazer engenharia reversa, extrair dados, revender ou sublicenciar os Serviços, exceto quando permitido;", "interferir nos Serviços ou tentar acesso não autorizado;", "usar os Serviços como única base de uma decisão de contratação sem revisão humana adequada."] },
      "As avaliações geradas por IA são ferramentas de apoio à decisão e podem conter imprecisões; você é responsável por suas decisões de contratação e por um uso lícito, justo e não discriminatório.",
    ] },
    { h: "5. Dados do cliente e dos candidatos", body: [
      "5.1. Você mantém todos os direitos sobre os dados que envia («Dados do cliente»). Você nos concede uma licença limitada para processá-los a fim de prestar e melhorar os Serviços, conforme nossa Política de privacidade.",
      "5.2. Você é o controlador das informações pessoais dos candidatos que envia e é responsável pelos avisos e consentimentos exigidos nos termos da Lei Geral de Proteção de Dados (LGPD); nós atuamos como seu provedor de serviços/operador.",
    ] },
    { h: "6. Tarifas e pagamento", body: [
      "6.1. Os planos pagos são cobrados antecipadamente todos os meses em dólares dos EUA (USD), conforme seu plano e os preços publicados em talentmind.app.",
      "6.2. Os pagamentos são processados por nossos provedores; você nos autoriza a cobrar todas as tarifas devidas na sua forma de pagamento.",
      "6.3. Salvo quando exigido por lei, as tarifas não são reembolsáveis e os limites de avaliação não utilizados não são acumulados.",
      "6.4. Podemos alterar as tarifas para o futuro; você é responsável pelos impostos aplicáveis, exceto os que incidem sobre nossa renda líquida.",
    ] },
    { h: "7. Plano Free", body: ["O plano Free é oferecido uma única vez para avaliar os Serviços, sem pagamento e sem cartão. É fornecido «no estado em que se encontra» e pode ser modificado ou descontinuado a qualquer momento."] },
    { h: "8. Propriedade intelectual", body: ["Os Serviços (exceto os Dados do cliente) pertencem à TalentMind e a seus licenciantes. Concedemos a você um direito limitado, não exclusivo e intransferível de usar os Serviços durante a assinatura para seus fins internos de negócio. Os demais direitos ficam reservados."] },
    { h: "9. Confidencialidade", body: ["Cada parte usará as informações confidenciais da outra apenas para cumprir estes Termos e as protegerá com cuidado razoável. Isso não se aplica a informações públicas, desenvolvidas de forma independente ou recebidas legitimamente de terceiros."] },
    { h: "10. Isenções de garantia", body: ["OS SERVIÇOS SÃO FORNECIDOS «NO ESTADO EM QUE SE ENCONTRAM» E «CONFORME DISPONIBILIDADE», SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS, IMPLÍCITAS OU LEGAIS, INCLUINDO COMERCIABILIDADE, ADEQUAÇÃO A UM FIM E NÃO VIOLAÇÃO. NÃO GARANTIMOS QUE OS SERVIÇOS SERÃO ININTERRUPTOS OU SEM ERROS NEM QUE OS RESULTADOS SERÃO PRECISOS."] },
    { h: "11. Limitação de responsabilidade", body: ["NA MÁXIMA MEDIDA PERMITIDA POR LEI, NENHUMA PARTE SERÁ RESPONSÁVEL POR DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS, CONSEQUENCIAIS OU PUNITIVOS, NEM POR LUCROS CESSANTES. A RESPONSABILIDADE TOTAL DA TALENTMIND NÃO EXCEDERÁ O VALOR PAGO POR VOCÊ NOS DOZE (12) MESES ANTERIORES À RECLAMAÇÃO."] },
    { h: "12. Indenização", body: ["Você defenderá e indenizará a TalentMind contra reclamações de terceiros decorrentes dos seus Dados do cliente, do seu uso dos Serviços ou da sua violação destes Termos ou da lei aplicável."] },
    { h: "13. Vigência e rescisão", body: [
      "13.1. Estes Termos vigoram enquanto você usar os Serviços. Você pode cancelar a qualquer momento, com efeito ao fim do período de cobrança atual.",
      "13.2. Podemos suspender ou encerrar o acesso se você violar estes Termos, não pagar ou gerar risco legal ou de segurança.",
      "13.3. As disposições que devam subsistir (tarifas devidas, PI, confidencialidade, isenções, responsabilidade, indenização) permanecerão em vigor.",
    ] },
    { h: "14. Lei aplicável e disputas", body: [
      "14.1. Estes Termos são regidos pelas leis da República Federativa do Brasil, sem considerar suas regras de conflito de leis.",
      "14.2. As partes tentarão resolver disputas de forma informal; qualquer disputa não resolvida em trinta (30) dias será submetida ao foro da comarca competente no Brasil ou, mediante acordo das partes, à arbitragem no Brasil, exceto que qualquer parte pode buscar medida liminar para proteger sua PI ou informações confidenciais.",
      "14.3. Você e a TalentMind renunciam à participação em ações coletivas. Estes Termos estão redigidos em português para o Brasil.",
    ] },
    { h: "15. Alterações nestes Termos", body: ["Podemos atualizar estes Termos. Quando fizermos mudanças relevantes, atualizaremos a data de «última atualização» e avisaremos. O uso continuado após a vigência implica aceitação."] },
    { h: "16. Contato", body: [{ list: ["TalentMind AI CORP", "E-mail: legal@talentmind.app", "Web: talentmind.app"] }] },
  ],
  plans: {
    kicker: "Planos e preços", title: "Planos de assinatura da TalentMind", intro: "Os Serviços são oferecidos em quatro planos. Os recursos disponíveis e os limites de avaliações dependem do plano escolhido:",
    cPlan: "Plano", cPrice: "Preço", cLimit: "Limite de avaliações", cIncluded: "O que está incluído",
    tiers: [
      { name: "Free", price: "$0", limit: "5 avaliações (única vez)", incl: "Inclui:", feats: ["Upload do perfil de cultura corporativa", "Pontuação básica de soft skills e relatório com IA", "Painéis de análise básicos"] },
      { name: "Starter", price: "$149 / mês", limit: "até 30 avaliações / mês", incl: "Tudo do Free, e mais:", feats: ["Integrações com videoconferência", "Dados em data centers seguros no Brasil", "Suporte por e-mail"] },
      { name: "Growth", price: "$449 / mês", limit: "até 100 avaliações / mês", incl: "Tudo do Starter, e mais:", feats: ["Integrações com ATS", "Relatórios com sua marca (logo da empresa)", "Suporte prioritário"] },
      { name: "Scale", price: "$1,699 / mês", limit: "até 400 avaliações / mês", incl: "Tudo do Growth, e mais:", feats: ["API aberta e webhooks", "1 modelo de competências de IA personalizado", "Controle de viés", "Gerente de conta dedicado"] },
    ],
    notesLabel: "Condições adicionais dos planos:",
    notes: ["O plano Free é oferecido uma única vez para avaliar os Serviços — sem pagamento e sem cartão.", "Os planos pagos são cobrados antecipadamente por um período de cobrança de um (1) mês civil.", "Qualquer limite de avaliações não utilizado em um período não é transferido nem reembolsável.", "As integrações são configuradas por você com a documentação que fornecemos (o plano Scale inclui acesso à API)."],
  },
};

const ar: OfferContent = {
  kicker: "معلومات قانونية", title: "شروط الخدمة", org: "TalentMind AI CORP", updated: "آخر تحديث: 8 يونيو 2026", copyright: "© 2026 TalentMind AI CORP",
  sections: [
    { h: "1. الموافقة على الشروط", body: [
      "تشكّل شروط الخدمة هذه («الشروط») اتفاقاً ملزماً بينك وبين TalentMind AI CORP («TalentMind» أو «نحن» أو «لدينا»)، وتحكم وصولك إلى منصة TalentMind ومواقعها الإلكترونية والخدمات ذات الصلة واستخدامك لها (يُشار إليها مجتمعةً بـ«الخدمات»).",
      "بإنشائك حساباً أو نقرك على «أوافق» أو استخدامك للخدمات، فإنك تقبل هذه الشروط. وإذا كنت تستخدم الخدمات نيابةً عن جهة اعتبارية، فإنك تقرّ بأنك تملك صلاحية إلزامها.",
      "وإذا لم توافق على هذه الشروط، فلا تستخدم الخدمات.",
    ] },
    { h: "2. الخدمات", body: [
      "2.1. توفّر TalentMind منصةً مدعومةً بالذكاء الاصطناعي تحلّل تسجيلات المقابلات وغيرها من المواد لتقييم المهارات الشخصية للمرشحين ومدى توافقهم الثقافي، وتُنشئ تقارير تقييم، وفقاً للخطة التي تختارها.",
      "2.2. تتحدّد الميزات وحدود الاستخدام المتاحة لك بحسب خطتك، على النحو الموضّح في talentmind.app والملخّص في قسم الخطط أدناه.",
      "2.3. يجوز لنا تعديل الميزات أو إضافتها أو إيقافها في أي وقت، مع إشعار معقول بالتغييرات الجوهرية التي تؤثّر في خطة مدفوعة.",
    ] },
    { h: "3. الأهلية والحسابات", body: [
      "3.1. يجب ألا يقل عمرك عن 18 عاماً وأن تكون أهلاً لإبرام عقد ملزم.",
      "3.2. أنت مسؤول عن بيانات اعتماد حسابك وعن جميع الأنشطة التي تجري عبره، وعن سلوك المستخدمين الذين تأذن لهم.",
    ] },
    { h: "4. الاستخدام المقبول", body: [
      "أنت توافق على ألا:",
      { list: ["تستخدم الخدمات بما يخالف أي قانون أو حقوق الغير، بما في ذلك قوانين العمل ومكافحة التمييز والخصوصية؛", "ترفع محتوى لا تملك حق رفعه، أو لم تحصل بشأنه على الإشعارات أو الموافقات المطلوبة؛", "تعيد الهندسة العكسية للخدمات أو تستخرج بياناتها أو تعيد بيعها أو ترخّصها من الباطن، إلا بما هو مسموح به؛", "تتداخل مع الخدمات أو تحاول الوصول غير المصرّح به إليها؛", "تستخدم الخدمات باعتبارها الأساس الوحيد لقرار توظيف من دون مراجعة بشرية ملائمة."] },
      "إن التقييمات المُنشأة بالذكاء الاصطناعي هي أدوات داعمة لاتخاذ القرار وقد تتضمّن أخطاءً؛ وأنت المسؤول عن قرارات التوظيف الخاصة بك وعن استخدامها استخداماً مشروعاً وعادلاً وغير تمييزي.",
    ] },
    { h: "5. بيانات العميل والمرشحين", body: [
      "5.1. تحتفظ بجميع الحقوق في البيانات التي ترفعها («بيانات العميل»). وتمنحنا ترخيصاً محدوداً لمعالجتها بغرض تقديم الخدمات وتحسينها، على النحو الموضّح في سياسة الخصوصية الخاصة بنا.",
      "5.2. أنت المتحكّم في المعلومات الشخصية للمرشحين التي ترفعها، وأنت المسؤول عن الإشعارات والموافقات المطلوبة؛ ونحن نتصرّف بصفتنا مزوّد الخدمة/المعالج لديك.",
    ] },
    { h: "6. الرسوم والدفع", body: [
      "6.1. تُحتسب الخطط المدفوعة شهرياً مقدماً بالدولار الأمريكي (USD)، استناداً إلى الخطة التي تختارها والأسعار المنشورة في talentmind.app.",
      "6.2. تُعالَج المدفوعات من قِبل مزوّدي الدفع لدينا؛ وأنت تأذن لنا بتحصيل جميع الرسوم المستحقة من وسيلة الدفع الخاصة بك.",
      "6.3. باستثناء ما يقتضيه القانون، فإن الرسوم غير قابلة للاسترداد، ولا يجوز ترحيل حدود التقييم غير المستخدمة.",
      "6.4. يجوز لنا تغيير الرسوم مستقبلاً؛ وأنت المسؤول عن الضرائب المطبّقة بخلاف الضرائب المفروضة على صافي دخلنا.",
    ] },
    { h: "7. الخطة المجانية", body: ["تُقدَّم الخطة المجانية مرةً واحدةً لتقييم الخدمات، من دون أي دفع ومن دون الحاجة إلى بطاقة. وتُقدَّم «كما هي» ويجوز تعديلها أو إيقافها في أي وقت."] },
    { h: "8. الملكية الفكرية", body: ["الخدمات (باستثناء بيانات العميل) مملوكة لـ TalentMind ومرخّصيها. ونمنحك حقاً محدوداً وغير حصري وغير قابل للتحويل في استخدام الخدمات طوال مدة اشتراكك لأغراض عملك الداخلية. وجميع الحقوق الأخرى محفوظة."] },
    { h: "9. السرية", body: ["يلتزم كل طرف باستخدام المعلومات السرية للطرف الآخر فقط لأداء التزاماته بموجب هذه الشروط، وبحمايتها بعناية معقولة. ولا ينطبق ذلك على المعلومات العامة أو المطوّرة بصورة مستقلة أو المتلقّاة بصورة مشروعة من طرف ثالث."] },
    { h: "10. إخلاء المسؤولية عن الضمانات", body: ["تُقدَّم الخدمات «كما هي» و«حسب توافرها»، من دون أي ضمانات من أي نوع، صريحةً كانت أو ضمنيةً أو قانونيةً، بما في ذلك ضمانات القابلية للتسويق والملاءمة لغرض معيّن وعدم الانتهاك. ولا نضمن أن تكون الخدمات متواصلة أو خالية من الأخطاء أو أن تكون النتائج دقيقة."] },
    { h: "11. تحديد المسؤولية", body: ["إلى أقصى حد يسمح به القانون، لا يكون أيٌّ من الطرفين مسؤولاً عن الأضرار غير المباشرة أو العرضية أو الخاصة أو التبعية أو العقابية، أو عن خسارة الأرباح. ولن تتجاوز المسؤولية الإجمالية لـ TalentMind المبالغ التي دفعتها خلال الاثني عشر (12) شهراً السابقة للمطالبة."] },
    { h: "12. التعويض", body: ["تلتزم بالدفاع عن TalentMind وتعويضها وإبراء ذمتها من مطالبات الغير الناشئة عن بيانات العميل الخاصة بك أو عن استخدامك للخدمات أو عن إخلالك بهذه الشروط أو بالقانون المعمول به."] },
    { h: "13. المدة والإنهاء", body: [
      "13.1. تظل هذه الشروط سارية طوال استخدامك للخدمات. ويجوز لك الإلغاء في أي وقت، على أن يسري ذلك في نهاية دورة الفوترة الجارية.",
      "13.2. يجوز لنا تعليق الوصول أو إنهاؤه إذا أخللت بهذه الشروط أو لم تسدّد المستحقات أو تسبّبت في مخاطر قانونية أو أمنية.",
      "13.3. تظل سارية الأحكام التي يُفترض بقاؤها بعد الإنهاء (الرسوم المستحقة، والملكية الفكرية، والسرية، وإخلاء المسؤولية، والمسؤولية، والتعويض).",
    ] },
    { h: "14. القانون الحاكم والنزاعات", body: [
      "14.1. تخضع هذه الشروط للقوانين المعمول بها في الولاية القضائية المختصة بمنطقة الشرق الأوسط وشمال إفريقيا (MENA)، من دون اعتبار لقواعد تنازع القوانين.",
      "14.2. يسعى الطرفان أولاً إلى تسوية النزاعات ودياً؛ وأي نزاع لا يُحلّ خلال ثلاثين (30) يوماً يُحسَم عن طريق التحكيم الملزم وفق الولاية القضائية المختصة بمنطقة الشرق الأوسط وشمال إفريقيا (MENA)، باستثناء حق أيٍّ من الطرفين في طلب الإجراءات الزجرية لحماية ملكيته الفكرية أو معلوماته السرية.",
      "14.3. يتنازل كلٌّ منك ومن TalentMind عن أي حق في المشاركة في دعوى جماعية. وهذه الشروط محرّرة باللغة العربية لمنطقة الشرق الأوسط وشمال إفريقيا (MENA).",
    ] },
    { h: "15. التغييرات على هذه الشروط", body: ["يجوز لنا تحديث هذه الشروط. وعند إجراء تغييرات جوهرية، نحدّث تاريخ «آخر تحديث» ونقدّم إشعاراً بذلك. ويُعدّ استمرارك في الاستخدام بعد سريان التغييرات قبولاً بها."] },
    { h: "16. التواصل", body: [{ list: ["TalentMind AI CORP", "البريد الإلكتروني: legal@talentmind.app", "الموقع: talentmind.app"] }] },
  ],
  plans: {
    kicker: "الخطط والأسعار", title: "خطط اشتراك TalentMind", intro: "تُقدَّم الخدمات ضمن أربع خطط. وتتحدّد الميزات المتاحة وحدود عدد التقييمات بحسب الخطة التي تختارها:",
    cPlan: "الخطة", cPrice: "السعر", cLimit: "حد التقييمات", cIncluded: "ما المتضمَّن",
    tiers: [
      { name: "Free", price: "$0", limit: "5 تقييمات (مرة واحدة)", incl: "المتضمَّن:", feats: ["رفع ملف الثقافة المؤسسية", "تقييم أساسي للمهارات الشخصية وتقرير بالذكاء الاصطناعي", "لوحات تحليلات أساسية"] },
      { name: "Starter", price: "$149 / شهرياً", limit: "حتى 30 تقييماً / شهرياً", incl: "كل ما في الخطة المجانية، بالإضافة إلى:", feats: ["تكاملات مع مؤتمرات الفيديو", "تخزين البيانات في مراكز بيانات آمنة", "الدعم عبر البريد الإلكتروني"] },
      { name: "Growth", price: "$449 / شهرياً", limit: "حتى 100 تقييم / شهرياً", incl: "كل ما في خطة Starter، بالإضافة إلى:", feats: ["تكاملات مع أنظمة تتبّع المتقدّمين (ATS)", "علامة تجارية على التقارير (شعار الشركة)", "دعم ذو أولوية"] },
      { name: "Scale", price: "$1,699 / شهرياً", limit: "حتى 400 تقييم / شهرياً", incl: "كل ما في خطة Growth، بالإضافة إلى:", feats: ["واجهة برمجة تطبيقات مفتوحة و webhooks", "نموذج كفاءات مخصّص واحد بالذكاء الاصطناعي", "ضوابط التحيّز", "مدير حساب مخصّص"] },
    ],
    notesLabel: "شروط إضافية للخطط:",
    notes: ["تُقدَّم الخطة المجانية مرةً واحدةً لتتمكّن من تقييم الخدمات — من دون أي دفع ومن دون الحاجة إلى بطاقة.", "تُحتسب الخطط المدفوعة مقدماً عن دورة فوترة تعادل شهراً تقويمياً واحداً (1).", "أي حد تقييمات غير مستخدم خلال دورة الفوترة لا يُرحَّل ولا يُسترد.", "تتولّى أنت إعداد التكاملات باستخدام الوثائق التي نوفّرها (تتضمّن خطة Scale الوصول إلى واجهة برمجة التطبيقات)."],
  },
};

export const OFFER: Record<Locale, OfferContent> = { en, es, pt, ar };
