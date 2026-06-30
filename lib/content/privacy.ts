import type { Locale } from "@/lib/i18n";

export type Block = string | { sub: string } | { list: string[] };
export type Section = { h: string; body: Block[] };
export type PrivacyContent = { kicker: string; title: string; org: string; updated: string; copyright: string; sections: Section[] };

const en: PrivacyContent = {
  kicker: "Legal information", title: "Privacy Policy", org: "TalentMind AI CORP", updated: "Last updated: June 8, 2026", copyright: "© 2026 TalentMind AI CORP",
  sections: [
    { h: "1. Introduction", body: [
      "This Privacy Policy explains how TalentMind AI CORP (“TalentMind,” “we,” “us,” or “our”) collects, uses, discloses, and protects information when you visit talentmind.app, use our candidate-assessment platform, or otherwise interact with us (collectively, the “Services”).",
      "We are a Delaware corporation based in the United States. By using the Services, you agree to the practices described in this Policy. If you do not agree, please do not use the Services.",
      "This Policy aligns with applicable U.S. privacy laws, including the California Consumer Privacy Act as amended by the California Privacy Rights Act (“CCPA/CPRA”) and other state privacy laws, to the extent they apply.",
    ] },
    { h: "2. Information We Collect", body: [
      "We collect the following categories of information:",
      { list: ["Account & contact data — name, business email, phone number, company name, and role.", "Billing data — payment-method and billing details, processed by our payment providers (we do not store full card numbers).", "Interview & assessment content — audio/video recordings and related materials you upload, and the candidate information they may contain.", "Usage & device data — IP address, browser type, device identifiers, and actions taken, collected via cookies.", "Communications — messages, support requests, and feedback you send us."] },
    ] },
    { h: "3. How We Use Your Information", body: [
      "We use the information we collect to:",
      { list: ["provide and operate the Services, including generating assessment reports;", "manage accounts, process payments, and provide support;", "personalize and improve the Services and conduct analytics;", "communicate about your account, security, and (where permitted) marketing;", "detect and prevent fraud, abuse, and security incidents;", "comply with legal obligations."] },
      "We do not use the content of uploaded interviews to train general-purpose AI models made available to other customers.",
    ] },
    { h: "4. How We Share Your Information", body: [
      "We do not sell your personal information for money. We may share information with:",
      { list: ["Service providers that host infrastructure, process payments, or provide support, under contracts limiting their use of the data;", "authorized users within your own organization;", "authorities when required by law or to protect rights and safety;", "a successor entity in connection with a merger, acquisition, or sale of assets."] },
    ] },
    { h: "5. Interview Uploads & Demo Reports", body: [
      "When you upload an interview recording — including in our free demo flow — we use it solely to generate the corresponding report.",
      "5.1. We do not retain uploaded interview files after the report has been generated.",
      "5.2. We de-identify demo reports: identifiers such as full name and contact details are excluded; a demo report may use only the candidate's first name and generalized descriptions of experience.",
      "5.3. Access to a demo report via a shareable link lasts no more than forty-eight (48) hours, after which the link is disabled.",
      "5.4. If you upload information about other individuals, you represent that you have provided required notices and obtained required consents.",
    ] },
    { h: "6. Data Retention", body: ["We keep personal information only as long as needed to provide the Services, comply with legal obligations, and resolve disputes. Uploaded interview files are handled as described in Section 5. When no longer needed, we delete or de-identify information."] },
    { h: "7. Data Security", body: ["We maintain administrative, technical, and physical safeguards, including encryption in transit and access controls. No method of transmission or storage is completely secure. We will notify you of a security incident as required by applicable U.S. state breach-notification laws."] },
    { h: "8. Your Privacy Rights", body: [
      "Depending on where you live, you may have the right to:",
      { list: ["access the personal information we hold about you;", "delete personal information we collected from you;", "correct inaccurate information;", "opt out of the “sale” or “sharing” of personal information;", "not be discriminated against for exercising your rights."] },
      "To exercise these rights, contact us at privacy@talentmind.app. If you are a candidate whose data was uploaded by an organization, please also contact that organization.",
    ] },
    { h: "9. Cookies & Tracking", body: ["We use cookies and similar technologies to operate the site, remember preferences, and measure usage. You can control cookies through your browser and the cookie banner. We honor Global Privacy Control (GPC) signals where required."] },
    { h: "10. International Data Transfers", body: ["We are based in the United States and host information in U.S. data centers; information may also be processed in other countries where we or our providers operate, with appropriate safeguards."] },
    { h: "11. Children's Privacy", body: ["The Services are intended for businesses and users at least 18 years old. We do not knowingly collect personal information from children under 16."] },
    { h: "12. Changes to This Policy", body: ["We may update this Policy. When we make material changes, we update the “last updated” date and provide notice where appropriate."] },
    { h: "13. Contact Us", body: [{ list: ["TalentMind AI CORP", "Email: privacy@talentmind.app", "Web: talentmind.app/privacy"] }] },
  ],
};

const es: PrivacyContent = {
  kicker: "Información legal", title: "Política de privacidad", org: "TalentMind AI CORP", updated: "Última actualización: 8 de junio de 2026", copyright: "© 2026 TalentMind AI CORP",
  sections: [
    { h: "1. Introducción", body: [
      "Esta Política de privacidad explica cómo TalentMind AI CORP («TalentMind», «nosotros») recopila, usa, divulga y protege la información cuando visitas talentmind.app, usas nuestra plataforma de evaluación de candidatos o interactúas con nosotros (en conjunto, los «Servicios»).",
      "Prestamos nuestros Servicios a clientes en la Argentina y en América Latina. Al usar los Servicios, aceptas las prácticas descritas en esta Política. Si no estás de acuerdo, no uses los Servicios.",
      "Esta Política se ajusta a la Ley 25.326 de Protección de los Datos Personales de la Argentina y a las normas de protección de datos personales vigentes en América Latina, en la medida en que apliquen al tratamiento de tus datos personales. La autoridad de control es la Agencia de Acceso a la Información Pública (AAIP).",
    ] },
    { h: "2. Información que recopilamos", body: [
      "Recopilamos las siguientes categorías de información:",
      { list: ["Datos de cuenta y contacto: nombre, correo profesional, teléfono, empresa y cargo.", "Datos de facturación: método de pago y datos de facturación, procesados por nuestros proveedores (no almacenamos números de tarjeta completos).", "Contenido de entrevistas y evaluaciones: grabaciones de audio/vídeo y materiales que subes, y la información de candidatos que puedan contener.", "Datos de uso y dispositivo: dirección IP, tipo de navegador, identificadores de dispositivo y acciones, recopilados mediante cookies.", "Comunicaciones: mensajes, solicitudes de soporte y comentarios que nos envías."] },
    ] },
    { h: "3. Cómo usamos tu información", body: [
      "Usamos la información que recopilamos para:",
      { list: ["prestar y operar los Servicios, incluida la generación de informes de evaluación;", "gestionar cuentas, procesar pagos y dar soporte;", "personalizar y mejorar los Servicios y realizar analíticas;", "comunicarnos sobre tu cuenta, seguridad y (cuando se permita) marketing;", "detectar y prevenir fraude, abuso e incidentes de seguridad;", "cumplir obligaciones legales."] },
      "No usamos el contenido de las entrevistas subidas para entrenar modelos de IA de uso general puestos a disposición de otros clientes.",
    ] },
    { h: "4. Cómo compartimos tu información", body: [
      "No vendemos tu información personal por dinero. Podemos compartirla con:",
      { list: ["proveedores de servicios que alojan la infraestructura, procesan pagos o dan soporte, bajo contratos que limitan el uso de los datos;", "usuarios autorizados dentro de tu propia organización;", "autoridades cuando la ley lo exija o para proteger derechos y la seguridad;", "una entidad sucesora en el marco de una fusión, adquisición o venta de activos."] },
    ] },
    { h: "5. Subida de entrevistas e informes de demostración", body: [
      "Cuando subes una grabación de entrevista —incluido el flujo de demostración gratuito— la usamos únicamente para generar el informe correspondiente.",
      "5.1. No conservamos los archivos de entrevista subidos después de generar el informe.",
      "5.2. Anonimizamos los informes de demostración: se excluyen identificadores como el nombre completo y los datos de contacto; un informe de demostración puede usar solo el nombre del candidato y descripciones generales de su experiencia.",
      "5.3. El acceso a un informe de demostración mediante enlace dura como máximo cuarenta y ocho (48) horas, tras lo cual el enlace se desactiva.",
      "5.4. Si subes información de otras personas, declaras haber facilitado los avisos y obtenido los consentimientos exigidos.",
    ] },
    { h: "6. Conservación de datos", body: ["Conservamos la información personal solo el tiempo necesario para prestar los Servicios, cumplir obligaciones legales y resolver disputas. Los archivos de entrevista se tratan según la Sección 5. Cuando ya no es necesaria, eliminamos o anonimizamos la información."] },
    { h: "7. Seguridad de los datos", body: ["Mantenemos salvaguardas administrativas, técnicas y físicas, incluido el cifrado en tránsito y controles de acceso. Ningún método de transmisión o almacenamiento es completamente seguro. Te notificaremos un incidente de seguridad según lo exija la ley."] },
    { h: "8. Tus derechos de privacidad", body: [
      "Conforme a la Ley 25.326 y a las normas de protección de datos aplicables en América Latina, puedes tener derecho a:",
      { list: ["acceder a la información personal que tenemos sobre ti;", "solicitar la supresión de la información personal que recopilamos de ti;", "rectificar o actualizar información inexacta o desactualizada;", "oponerte al tratamiento de tu información personal en los supuestos previstos por la ley;", "no ser discriminado por ejercer tus derechos."] },
      "Para ejercer estos derechos, escríbenos a privacy@talentmind.app; también puedes presentar un reclamo ante la Agencia de Acceso a la Información Pública (AAIP). Si eres un candidato cuyos datos subió una organización, contacta también con esa organización.",
    ] },
    { h: "9. Cookies y seguimiento", body: ["Usamos cookies y tecnologías similares para operar el sitio, recordar preferencias y medir el uso. Puedes controlar las cookies desde tu navegador y el banner de cookies. Respetamos las señales de Global Privacy Control (GPC) cuando se exige."] },
    { h: "10. Transferencias internacionales de datos", body: ["La información se aloja en centros de datos de la región (América Latina) y puede procesarse en la Argentina y en otros países donde operamos nosotros o nuestros proveedores, con las garantías adecuadas conforme a la Ley 25.326."] },
    { h: "11. Privacidad de menores", body: ["Los Servicios están destinados a empresas y usuarios de al menos 18 años. No recopilamos conscientemente información personal de menores de 16 años."] },
    { h: "12. Cambios en esta Política", body: ["Podemos actualizar esta Política. Cuando hagamos cambios sustanciales, actualizaremos la fecha de «última actualización» y avisaremos cuando corresponda."] },
    { h: "13. Contacto", body: [{ list: ["TalentMind AI CORP", "Correo: privacy@talentmind.app", "Web: talentmind.app/privacy"] }] },
  ],
};

const pt: PrivacyContent = {
  kicker: "Informações legais", title: "Política de privacidade", org: "TalentMind AI CORP", updated: "Última atualização: 8 de junho de 2026", copyright: "© 2026 TalentMind AI CORP",
  sections: [
    { h: "1. Introdução", body: [
      "Esta Política de privacidade explica como a TalentMind AI CORP («TalentMind», «nós») coleta, usa, divulga e protege informações quando você visita talentmind.app, usa nossa plataforma de avaliação de candidatos ou interage conosco (em conjunto, os «Serviços»).",
      "Prestamos nossos Serviços a clientes no Brasil. Ao usar os Serviços, você concorda com as práticas descritas nesta Política. Se não concordar, não use os Serviços.",
      "Esta Política está alinhada à Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018) e demais normas brasileiras aplicáveis, na medida em que se apliquem ao tratamento dos seus dados pessoais. A autoridade fiscalizadora é a Autoridade Nacional de Proteção de Dados (ANPD).",
    ] },
    { h: "2. Informações que coletamos", body: [
      "Coletamos as seguintes categorias de informações:",
      { list: ["Dados de conta e contato: nome, e-mail corporativo, telefone, empresa e cargo.", "Dados de cobrança: forma de pagamento e dados de cobrança, processados por nossos provedores (não armazenamos números de cartão completos).", "Conteúdo de entrevistas e avaliações: gravações de áudio/vídeo e materiais que você envia, e as informações de candidatos que possam conter.", "Dados de uso e dispositivo: endereço IP, tipo de navegador, identificadores de dispositivo e ações, coletados por cookies.", "Comunicações: mensagens, solicitações de suporte e feedback que você envia."] },
    ] },
    { h: "3. Como usamos suas informações", body: [
      "Usamos as informações coletadas para:",
      { list: ["fornecer e operar os Serviços, incluindo a geração de relatórios de avaliação;", "gerenciar contas, processar pagamentos e prestar suporte;", "personalizar e melhorar os Serviços e realizar análises;", "comunicar sobre sua conta, segurança e (quando permitido) marketing;", "detectar e prevenir fraude, abuso e incidentes de segurança;", "cumprir obrigações legais."] },
      "Não usamos o conteúdo das entrevistas enviadas para treinar modelos de IA de uso geral disponibilizados a outros clientes.",
    ] },
    { h: "4. Como compartilhamos suas informações", body: [
      "Não vendemos suas informações pessoais por dinheiro. Podemos compartilhá-las com:",
      { list: ["provedores que hospedam a infraestrutura, processam pagamentos ou prestam suporte, sob contratos que limitam o uso dos dados;", "usuários autorizados dentro da sua própria organização;", "autoridades quando exigido por lei ou para proteger direitos e a segurança;", "uma entidade sucessora em caso de fusão, aquisição ou venda de ativos."] },
    ] },
    { h: "5. Envio de entrevistas e relatórios de demonstração", body: [
      "Quando você envia uma gravação de entrevista — inclusive no fluxo de demonstração gratuito — nós a usamos apenas para gerar o relatório correspondente.",
      "5.1. Não retemos os arquivos de entrevista enviados após a geração do relatório.",
      "5.2. Anonimizamos os relatórios de demonstração: identificadores como nome completo e dados de contato são excluídos; um relatório de demonstração pode usar apenas o primeiro nome do candidato e descrições gerais da experiência.",
      "5.3. O acesso a um relatório de demonstração por link dura no máximo quarenta e oito (48) horas, após o que o link é desativado.",
      "5.4. Se você enviar informações de outras pessoas, declara ter fornecido os avisos e obtido os consentimentos exigidos.",
    ] },
    { h: "6. Retenção de dados", body: ["Mantemos as informações pessoais apenas pelo tempo necessário para prestar os Serviços, cumprir obrigações legais e resolver disputas. Os arquivos de entrevista são tratados conforme a Seção 5. Quando não são mais necessárias, excluímos ou anonimizamos as informações."] },
    { h: "7. Segurança dos dados", body: ["Mantemos salvaguardas administrativas, técnicas e físicas, incluindo criptografia em trânsito e controles de acesso. Nenhum método de transmissão ou armazenamento é completamente seguro. Notificaremos você sobre um incidente de segurança conforme exigido por lei."] },
    { h: "8. Seus direitos de privacidade", body: [
      "De acordo com a LGPD, como titular dos dados, você pode ter o direito de:",
      { list: ["acessar as informações pessoais que mantemos sobre você;", "solicitar a eliminação das informações pessoais que coletamos de você;", "corrigir informações imprecisas ou desatualizadas;", "opor-se ao tratamento dos seus dados pessoais nas hipóteses previstas em lei e revogar o consentimento;", "não ser discriminado por exercer seus direitos."] },
      "Para exercer esses direitos, escreva para privacy@talentmind.app; você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD). Se você é um candidato (titular dos dados) cujos dados foram enviados por uma organização, contate também essa organização.",
    ] },
    { h: "9. Cookies e rastreamento", body: ["Usamos cookies e tecnologias semelhantes para operar o site, lembrar preferências e medir o uso. Você pode controlar os cookies pelo navegador e pelo banner de cookies. Respeitamos os sinais de Global Privacy Control (GPC) quando exigido."] },
    { h: "10. Transferências internacionais de dados", body: ["As informações são hospedadas em data centers no Brasil (na região) e podem ser processadas no Brasil e em outros países onde nós ou nossos provedores operamos, com as devidas salvaguardas previstas na LGPD."] },
    { h: "11. Privacidade de crianças", body: ["Os Serviços destinam-se a empresas e usuários com pelo menos 18 anos. Não coletamos intencionalmente informações pessoais de menores de 16 anos."] },
    { h: "12. Alterações nesta Política", body: ["Podemos atualizar esta Política. Quando fizermos alterações relevantes, atualizaremos a data de «última atualização» e avisaremos quando apropriado."] },
    { h: "13. Contato", body: [{ list: ["TalentMind AI CORP", "E-mail: privacy@talentmind.app", "Web: talentmind.app/privacy"] }] },
  ],
};

const ar: PrivacyContent = {
  kicker: "معلومات قانونية", title: "سياسة الخصوصية", org: "TalentMind AI CORP", updated: "آخر تحديث: 8 يونيو 2026", copyright: "© 2026 TalentMind AI CORP",
  sections: [
    { h: "1. مقدمة", body: [
      "توضّح سياسة الخصوصية هذه كيف تقوم TalentMind AI CORP («TalentMind» أو «نحن» أو «الشركة») بجمع المعلومات واستخدامها والإفصاح عنها وحمايتها عند زيارتك لموقع talentmind.app أو استخدامك منصّتنا لتقييم المرشّحين أو تفاعلك معنا بأي شكل آخر (يُشار إليها مجتمعةً بـ«الخدمات»).",
      "نقدّم خدماتنا للعملاء في منطقة الشرق الأوسط وشمال إفريقيا (MENA). باستخدامك للخدمات، فإنك توافق على الممارسات الموضّحة في هذه السياسة. وإذا كنت لا توافق عليها، فيُرجى عدم استخدام الخدمات.",
      "تتوافق هذه السياسة مع أنظمة حماية البيانات المعمول بها في منطقة الشرق الأوسط وشمال إفريقيا (MENA)، بما في ذلك أنظمة حماية البيانات الشخصية (PDPL) في الإمارات العربية المتحدة والمملكة العربية السعودية، بالقدر الذي تنطبق فيه على معالجة بياناتك الشخصية. ويخضع تطبيق هذه السياسة لاختصاص الجهة المعنية في منطقة الشرق الأوسط وشمال إفريقيا.",
    ] },
    { h: "2. المعلومات التي نجمعها", body: [
      "نجمع الفئات التالية من المعلومات:",
      { list: ["بيانات الحساب والتواصل — الاسم والبريد الإلكتروني المهني ورقم الهاتف واسم الشركة والمسمّى الوظيفي.", "بيانات الفوترة — وسيلة الدفع وتفاصيل الفوترة، التي يعالجها مزوّدو خدمات الدفع لدينا (لا نحتفظ بأرقام البطاقات الكاملة).", "محتوى المقابلات والتقييمات — التسجيلات الصوتية والمرئية والمواد ذات الصلة التي ترفعها، وما قد تحتويه من معلومات عن المرشّحين.", "بيانات الاستخدام والجهاز — عنوان بروتوكول الإنترنت ونوع المتصفّح ومعرّفات الجهاز والإجراءات المتّخذة، التي تُجمع عبر ملفّات تعريف الارتباط.", "المراسلات — الرسائل وطلبات الدعم والملاحظات التي ترسلها إلينا."] },
    ] },
    { h: "3. كيف نستخدم معلوماتك", body: [
      "نستخدم المعلومات التي نجمعها من أجل:",
      { list: ["تقديم الخدمات وتشغيلها، بما في ذلك إنشاء تقارير التقييم؛", "إدارة الحسابات ومعالجة المدفوعات وتقديم الدعم؛", "تخصيص الخدمات وتحسينها وإجراء التحليلات؛", "التواصل بشأن حسابك وأمنه و(حيثما يُسمح بذلك) الأغراض التسويقية؛", "كشف الاحتيال وإساءة الاستخدام وحوادث الأمن ومنعها؛", "الامتثال للالتزامات القانونية."] },
      "لا نستخدم محتوى المقابلات المرفوعة لتدريب نماذج ذكاء اصطناعي عامة الغرض تُتاح لعملاء آخرين.",
    ] },
    { h: "4. كيف نشارك معلوماتك", body: [
      "لا نبيع معلوماتك الشخصية مقابل مال. وقد نشارك المعلومات مع:",
      { list: ["مزوّدي الخدمات الذين يستضيفون البنية التحتية أو يعالجون المدفوعات أو يقدّمون الدعم، بموجب عقود تقيّد استخدامهم للبيانات؛", "المستخدمين المصرّح لهم داخل مؤسستك؛", "الجهات المختصّة عند اشتراط ذلك بموجب الأنظمة أو لحماية الحقوق والسلامة؛", "كيان خلَف في إطار عملية اندماج أو استحواذ أو بيع للأصول."] },
    ] },
    { h: "5. رفع المقابلات وتقارير العرض التجريبي", body: [
      "عند رفعك تسجيل مقابلة — بما في ذلك ضمن مسار العرض التجريبي المجاني — نستخدمه حصراً لإنشاء التقرير المقابل له.",
      "5.1. لا نحتفظ بملفّات المقابلات المرفوعة بعد إنشاء التقرير.",
      "5.2. نزيل المعرّفات من تقارير العرض التجريبي: تُستبعد المعرّفات مثل الاسم الكامل وبيانات التواصل؛ وقد يستخدم تقرير العرض التجريبي الاسم الأول للمرشّح فقط وأوصافاً عامة لخبرته.",
      "5.3. لا يتجاوز الوصول إلى تقرير العرض التجريبي عبر رابط قابل للمشاركة ثماني وأربعين (48) ساعة، يُعطّل الرابط بعدها.",
      "5.4. إذا رفعت معلومات عن أفراد آخرين، فإنك تقرّ بأنك قدّمت الإشعارات اللازمة وحصلت على الموافقات المطلوبة.",
    ] },
    { h: "6. الاحتفاظ بالبيانات", body: ["نحتفظ بالمعلومات الشخصية فقط طوال المدة اللازمة لتقديم الخدمات والامتثال للالتزامات القانونية وحلّ النزاعات. وتُعالَج ملفّات المقابلات المرفوعة على النحو الموضّح في القسم 5. وعندما تنتفي الحاجة إليها، نحذف المعلومات أو نزيل منها المعرّفات."] },
    { h: "7. أمن البيانات", body: ["نطبّق ضمانات إدارية وتقنية ومادية، تشمل التشفير أثناء النقل وضوابط الوصول. ولا توجد وسيلة نقل أو تخزين آمنة تماماً. وسنُخطرك بأي حادث أمني وفقاً لما تقتضيه الأنظمة المعمول بها."] },
    { h: "8. حقوقك في الخصوصية", body: [
      "وفقاً لأنظمة حماية البيانات الشخصية المعمول بها في منطقة الشرق الأوسط وشمال إفريقيا (MENA)، قد يكون لك الحق في:",
      { list: ["الوصول إلى المعلومات الشخصية التي نحتفظ بها عنك؛", "حذف المعلومات الشخصية التي جمعناها منك؛", "تصحيح المعلومات غير الدقيقة؛", "الاعتراض على معالجة معلوماتك الشخصية ونقلها وسحب موافقتك عليها؛", "عدم التعرّض للتمييز نتيجة ممارستك لحقوقك."] },
      "لممارسة هذه الحقوق، تواصل معنا عبر privacy@talentmind.app. وإذا كنت مرشّحاً رفعت مؤسسةٌ ما بياناتك، فيُرجى التواصل أيضاً مع تلك المؤسسة.",
    ] },
    { h: "9. ملفّات تعريف الارتباط والتتبّع", body: ["نستخدم ملفّات تعريف الارتباط والتقنيات المماثلة لتشغيل الموقع وتذكّر التفضيلات وقياس الاستخدام. ويمكنك التحكّم في ملفّات تعريف الارتباط من خلال متصفّحك ولافتة ملفّات تعريف الارتباط. ونحترم إشارات التحكّم في الخصوصية متى ما اشترطت الأنظمة المعمول بها ذلك."] },
    { h: "10. عمليات نقل البيانات دولياً", body: ["تُستضاف المعلومات في مراكز بيانات داخل منطقة الشرق الأوسط وشمال إفريقيا، وقد تُعالَج في المنطقة وفي دول أخرى نعمل فيها نحن أو مزوّدو خدماتنا، مع توفير الضمانات المناسبة لذلك."] },
    { h: "11. خصوصية الأطفال", body: ["الخدمات موجّهة للشركات وللمستخدمين الذين لا تقلّ أعمارهم عن 18 عاماً. ولا نجمع عن قصد معلومات شخصية من الأطفال دون سن 16 عاماً."] },
    { h: "12. التغييرات على هذه السياسة", body: ["قد نحدّث هذه السياسة. وعند إجراء تغييرات جوهرية، نحدّث تاريخ «آخر تحديث» ونقدّم إشعاراً حيثما كان ذلك مناسباً."] },
    { h: "13. تواصل معنا", body: [{ list: ["TalentMind AI CORP", "البريد الإلكتروني: privacy@talentmind.app", "الموقع: talentmind.app/privacy"] }] },
  ],
};

export const PRIVACY: Record<Locale, PrivacyContent> = { en, es, pt, ar };
