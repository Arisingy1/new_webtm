"use client";

import { ShieldCheck, Lock, Server, FileCheck, Eye, KeyRound } from "lucide-react";
import { Arrow, CTA, GREEN, INK, TEAL, useReveals } from "@/components/tm/ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import { localize, type Locale } from "@/lib/i18n";

const PILLARS = [
  { icon: <FileCheck className="h-6 w-6" />, a: GREEN },
  { icon: <Server className="h-6 w-6" />, a: TEAL },
  { icon: <Lock className="h-6 w-6" />, a: GREEN },
  { icon: <ShieldCheck className="h-6 w-6" />, a: TEAL },
  { icon: <Eye className="h-6 w-6" />, a: GREEN },
  { icon: <KeyRound className="h-6 w-6" />, a: TEAL },
];

const COPY: Record<Locale, {
  heroPre: string;
  heroAccent: string;
  heroPost: string;
  sub: string;
  cta: string;
  pillars: { t: string; d: string }[];
  bandTitle: string;
  bandText: string;
  contact: string;
}> = {
  en: {
    heroPre: "Candidate data protection and ",
    heroAccent: "CCPA",
    heroPost: " compliance",
    sub: "Interview recordings are personal data. We process them under the CCPA/CPRA and applicable U.S. privacy law, host them in secure U.S. data centers, encrypt everything, and tightly control access — so candidate data stays protected at every stage",
    cta: "Request a security demo",
    pillars: [
      { t: "Processing as a service provider\n(under your instructions)", d: "TalentMind acts as a service provider (processor) and handles data strictly on the client's documented instructions: the client is the business responsible for the candidate's notice and consent. A Data Processing Addendum (DPA) is signed with every client, and we provide guidance on collecting valid consent in line with the CCPA/CPRA" },
      { t: "Data residency in the\nUnited States", d: "Personal data is hosted in secure U.S. data centers, so candidate data stays within the United States. Regular encrypted backups; for Enterprise — a dedicated, isolated environment in the region of your choice" },
      { t: "Encryption in transit and at rest", d: "All traffic is protected with TLS 1.2+/HTTPS, and data is encrypted at rest with AES-256. Encryption keys are managed in a dedicated KMS/HSM, with regular rotation and strict access separation" },
      { t: "Biometrics and explicit consent", d: "Audio and video recordings of interviews are personal — and in some cases biometric — data. We process them only with the data subject's explicit consent, in line with the CCPA/CPRA and applicable state biometric privacy laws. Recordings are isolated per tenant and accessed strictly on a need-to-know basis" },
      { t: "Access control and audit", d: "Role-based access control (RBAC) following the principle of least privilege, with two-factor authentication for administrators. Every data operation is logged, and we support consumer privacy rights — access, correction, and deletion" },
      { t: "Certified infrastructure and response", d: "Our practices align with ISO/IEC 27001 and SOC 2 Type II. Vulnerability management, regular updates, continuous monitoring, and an incident response plan with breach notification in accordance with applicable U.S. state laws" },
    ],
    bandTitle: "Need a security review for your team?",
    bandText: "We'll send our security documentation, a Data Processing Addendum (DPA), a candidate consent form, and answer any questions from your information security team",
    contact: "Contact us",
  },
  es: {
    heroPre: "Protección de datos de candidatos y cumplimiento de la ",
    heroAccent: "Ley 25.326",
    heroPost: "",
    sub: "Las grabaciones de entrevistas son datos personales. Las procesamos conforme a la Ley 25.326 de Protección de Datos Personales de Argentina y a las normativas de protección de datos de América Latina, las alojamos en centros de datos en la región (LATAM), lo ciframos todo y controlamos estrictamente el acceso, para que los datos de los candidatos permanezcan protegidos en cada etapa",
    cta: "Solicita una demo de seguridad",
    pillars: [
      { t: "Tratamiento conforme a la Ley 25.326\n(como encargado del tratamiento)", d: "TalentMind actúa como encargado del tratamiento y maneja los datos estrictamente según las instrucciones documentadas del cliente: el cliente es el responsable del tratamiento y es responsable de la base legal del candidato (consentimiento). Se firma un Data Processing Agreement (DPA) con cada cliente, y ofrecemos orientación sobre cómo recopilar un consentimiento válido conforme a la Ley 25.326 y bajo la autoridad de control (AAIP)" },
      { t: "Residencia de datos en\nla región (LATAM)", d: "Los datos personales se alojan en centros de datos en la región (LATAM), de modo que los datos de los candidatos permanecen dentro de su región. Copias de seguridad cifradas periódicas; para Enterprise, un entorno dedicado y aislado en la región que elijas" },
      { t: "Cifrado en tránsito y en reposo", d: "Todo el tráfico está protegido con TLS 1.2+/HTTPS, y los datos se cifran en reposo con AES-256. Las claves de cifrado se gestionan en un KMS/HSM dedicado, con rotación periódica y una estricta separación de acceso" },
      { t: "Biometría y consentimiento explícito", d: "Las grabaciones de audio y vídeo de las entrevistas son datos personales y, en algunos casos, datos sensibles (biométricos). Los procesamos únicamente con el consentimiento explícito del titular de los datos, conforme a la Ley 25.326 y a las normativas de protección de datos de América Latina. Las grabaciones se aíslan por tenant y se accede a ellas estrictamente según la necesidad de conocer" },
      { t: "Control de acceso y auditoría", d: "Control de acceso basado en roles (RBAC) siguiendo el principio de mínimo privilegio, con autenticación de doble factor para los administradores. Cada operación con datos queda registrada, y respaldamos los derechos del titular: acceso, rectificación y supresión" },
      { t: "Infraestructura certificada y respuesta", d: "Nuestras prácticas se alinean con ISO/IEC 27001 y SOC 2. Gestión de vulnerabilidades, actualizaciones periódicas, monitorización continua y un plan de respuesta a incidentes con notificación de brechas a la autoridad de control (AAIP) y a los titulares afectados" },
    ],
    bandTitle: "¿Necesitas una revisión de seguridad para tu equipo?",
    bandText: "Te enviaremos nuestra documentación de seguridad, un Data Processing Agreement (DPA), un formulario de consentimiento del candidato y responderemos a cualquier pregunta de tu equipo de seguridad de la información",
    contact: "Contáctanos",
  },
  pt: {
    heroPre: "Proteção dos dados dos candidatos e conformidade com a ",
    heroAccent: "LGPD",
    heroPost: "",
    sub: "As gravações de entrevistas são dados pessoais. Nós as processamos em conformidade com a LGPD (Lei 13.709/2018) e sob a supervisão da ANPD, hospedamos em data centers no Brasil / na região, criptografamos tudo e controlamos rigorosamente o acesso — para que os dados dos candidatos permaneçam protegidos em todas as etapas",
    cta: "Solicite uma demo de segurança",
    pillars: [
      { t: "Tratamento sob a LGPD\n(como operador)", d: "A TalentMind atua como operador de dados e trata os dados estritamente conforme as instruções documentadas do cliente: o cliente é o controlador dos dados e é responsável pela base legal do candidato (consentimento). Um Data Processing Agreement (DPA) é assinado com cada cliente, e fornecemos orientação sobre como coletar um consentimento válido nos termos da LGPD (Lei 13.709/2018)" },
      { t: "Residência de dados\nno Brasil / na região", d: "Os dados pessoais são hospedados em data centers no Brasil / na região, de modo que os dados dos candidatos permaneçam dentro de sua região. Backups criptografados regulares; para Enterprise — um ambiente dedicado e isolado na região de sua escolha" },
      { t: "Criptografia em trânsito e em repouso", d: "Todo o tráfego é protegido com TLS 1.2+/HTTPS, e os dados são criptografados em repouso com AES-256. As chaves de criptografia são gerenciadas em um KMS/HSM dedicado, com rotação regular e estrita separação de acesso" },
      { t: "Biometria e consentimento explícito", d: "As gravações de áudio e vídeo das entrevistas são dados pessoais e, em alguns casos, dados pessoais sensíveis (biométricos). Nós as processamos apenas com o consentimento explícito do titular dos dados, nos termos da LGPD (Lei 13.709/2018). As gravações são isoladas por tenant e acessadas estritamente com base na necessidade de conhecer" },
      { t: "Controle de acesso e auditoria", d: "Controle de acesso baseado em funções (RBAC) seguindo o princípio do menor privilégio, com autenticação de dois fatores para administradores. Cada operação com dados é registrada, e oferecemos suporte aos direitos do titular dos dados — acesso, correção e eliminação" },
      { t: "Infraestrutura certificada e resposta", d: "Nossas práticas estão alinhadas com a ISO/IEC 27001 e a SOC 2. Gestão de vulnerabilidades, atualizações regulares, monitoramento contínuo e um plano de resposta a incidentes com notificação de violação à ANPD e aos titulares afetados" },
    ],
    bandTitle: "Precisa de uma revisão de segurança para sua equipe?",
    bandText: "Enviaremos nossa documentação de segurança, um Data Processing Agreement (DPA), um formulário de consentimento do candidato e responderemos a qualquer pergunta da sua equipe de segurança da informação",
    contact: "Fale conosco",
  },
  ar: {
    heroPre: "حماية بيانات المرشّحين والامتثال لأنظمة ",
    heroAccent: "حماية البيانات",
    heroPost: "",
    sub: "تسجيلات المقابلات بيانات شخصية. نعالجها وفقًا لأنظمة حماية البيانات الشخصية في منطقة الشرق الأوسط وشمال إفريقيا (MENA) — مثل قانون حماية البيانات الشخصية في الإمارات (PDPL) والسعودية — ونستضيفها في مراكز بيانات داخل المنطقة (MENA)، ونشفّر كل شيء، ونتحكّم بصرامة في الوصول — لتبقى بيانات المرشّحين محميّة في كل مرحلة",
    cta: "اطلب عرضًا توضيحيًا للأمان",
    pillars: [
      { t: "المعالجة وفقًا لأنظمة حماية البيانات\n(بصفتنا معالِجًا للبيانات)", d: "تعمل TalentMind بصفتها معالِجًا للبيانات وتتعامل معها بدقة وفق التعليمات الموثّقة للعميل: فالعميل هو المتحكّم في البيانات وهو المسؤول عن الأساس القانوني الخاص بالمرشّح (الموافقة). تُوقَّع اتفاقية معالجة البيانات (DPA) مع كل عميل، ونقدّم إرشادات حول جمع موافقة صحيحة بما يتوافق مع قانون حماية البيانات الشخصية (PDPL) في الإمارات والسعودية" },
      { t: "موقع تخزين البيانات داخل\nمنطقة MENA", d: "تُستضاف البيانات الشخصية في مراكز بيانات داخل منطقة الشرق الأوسط وشمال إفريقيا (MENA)، مثل الإمارات والسعودية، بحيث تبقى بيانات المرشّحين ضمن منطقتها. نسخ احتياطية مشفّرة منتظمة؛ ولعملاء Enterprise — بيئة مخصّصة ومعزولة في المنطقة التي تختارها" },
      { t: "التشفير أثناء النقل وفي السكون", d: "جميع حركة البيانات محميّة بـ TLS 1.2+/HTTPS، وتُشفَّر البيانات في السكون باستخدام AES-256. تُدار مفاتيح التشفير في KMS/HSM مخصّص، مع تدوير منتظم وفصل صارم للوصول" },
      { t: "القياسات الحيوية والموافقة الصريحة", d: "تسجيلات الصوت والفيديو للمقابلات بيانات شخصية — وفي بعض الحالات بيانات من فئة حسّاسة (حيوية). نعالجها فقط بموافقة صريحة من صاحب البيانات، بما يتوافق مع قانون حماية البيانات الشخصية (PDPL) في الإمارات والسعودية. تُعزَل التسجيلات لكل مستأجر ويُتاح الوصول إليها بدقة وفق مبدأ الحاجة إلى المعرفة" },
      { t: "التحكم في الوصول والتدقيق", d: "التحكم في الوصول القائم على الأدوار (RBAC) وفق مبدأ الحدّ الأدنى من الصلاحيات، مع المصادقة الثنائية للمسؤولين. تُسجَّل كل عملية على البيانات، وندعم حقوق أصحاب البيانات — الوصول والتصحيح والمحو" },
      { t: "بنية تحتية معتمدة واستجابة", d: "تتوافق ممارساتنا مع ISO/IEC 27001 وSOC 2. إدارة الثغرات، والتحديثات المنتظمة، والمراقبة المستمرة، وخطة استجابة للحوادث مع الإخطار بالخروقات وفق أنظمة حماية البيانات الشخصية في المنطقة (MENA)" },
    ],
    bandTitle: "هل تحتاج فريقك إلى مراجعة أمنية؟",
    bandText: "سنرسل وثائق الأمان الخاصة بنا، واتفاقية معالجة البيانات (DPA)، ونموذج موافقة المرشّح، ونجيب عن أي أسئلة من فريق أمن المعلومات لديك",
    contact: "تواصل معنا",
  },
};

export default function SecurityPage() {
  const root = useReveals();
  const locale = useLocale();
  const t = COPY[locale];
  return (
    <div ref={root}>
      <section className="mx-auto max-w-[1100px] px-6 pt-40 pb-12 text-center">
        <h1 className="reveal mx-auto mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[1] tracking-tight sm:text-[4rem]">
          {t.heroPre}<span style={{ color: GREEN }}>{t.heroAccent}</span>{t.heroPost}
        </h1>
        <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-[#183833]/70">
          {t.sub}
        </p>
        <div className="reveal mt-9 flex justify-center"><CTA href={localize("/contacts", locale)}>{t.cta}</CTA></div>
      </section>

      {/* pillars */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="stagger grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={t.pillars[i].t} className="flex h-full flex-col rounded-3xl border border-[#ededed] bg-white p-7 shadow-[0_16px_40px_rgba(24,56,51,0.06)]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: p.a }}>{p.icon}</span>
              <h3 className="mt-5 whitespace-pre-line text-xl font-semibold">{t.pillars[i].t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#183833]/70">{t.pillars[i].d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-[1100px] px-6 pb-24">
        <div className="reveal flex flex-col items-center gap-4 rounded-3xl p-10 text-center text-white" style={{ background: INK }}>
          <ShieldCheck className="h-10 w-10" style={{ color: GREEN }} />
          <p className="text-2xl font-semibold">{t.bandTitle}</p>
          <p className="max-w-md text-white/70">{t.bandText}</p>
          <a href={localize("/contacts", locale)} className="group mt-2 flex items-center gap-1 rounded-xl px-6 py-3 text-sm font-semibold text-white" style={{ background: GREEN }}>
            {t.contact} <Arrow className="text-white" />
          </a>
        </div>
      </section>
    </div>
  );
}
