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
    heroAccent: "GDPR",
    heroPost: " compliance",
    sub: "Interview recordings are personal data. We process them under GDPR and regional MENA data-protection laws, host them in EU and MENA data centers, encrypt everything, and tightly control access — so candidate data stays protected at every stage",
    cta: "Request a security demo",
    pillars: [
      { t: "Processing under GDPR\n(as a processor)", d: "TalentMind acts as a data processor and handles data strictly on the client's documented instructions: the client is the data controller and is responsible for the candidate's lawful basis (consent). A Data Processing Agreement (DPA, Art. 28 GDPR) is signed with every client, and we provide guidance on collecting valid consent" },
      { t: "Data residency in the EU & MENA", d: "Personal data is hosted in EU and MENA data centers (e.g., Frankfurt and the UAE), so candidate data stays within its region. Regular encrypted backups; for Enterprise — a dedicated, isolated environment in the region of your choice" },
      { t: "Encryption in transit and at rest", d: "All traffic is protected with TLS 1.2+/HTTPS, and data is encrypted at rest with AES-256. Encryption keys are managed in a dedicated KMS/HSM, with regular rotation and strict access separation" },
      { t: "Biometrics and explicit consent", d: "Audio and video recordings of interviews are personal — and in some cases special-category (biometric) — data. We process them only with the data subject's explicit consent (Art. 9 GDPR; aligned with the UAE and KSA PDPL). Recordings are isolated per tenant and accessed strictly on a need-to-know basis" },
      { t: "Access control and audit", d: "Role-based access control (RBAC) following the principle of least privilege, with two-factor authentication for administrators. Every data operation is logged, and we support data-subject rights — access, rectification, and erasure" },
      { t: "Certified infrastructure and response", d: "Our practices align with ISO/IEC 27001 and SOC 2. Vulnerability management, regular updates, continuous monitoring, and an incident response plan with breach notification within 72 hours (Art. 33 GDPR)" },
    ],
    bandTitle: "Need a security review for your team?",
    bandText: "We'll send our security documentation, a Data Processing Agreement (DPA), a candidate consent form, and answer any questions from your information security team",
    contact: "Contact us",
  },
  es: {
    heroPre: "Protección de datos de candidatos y cumplimiento del ",
    heroAccent: "RGPD",
    heroPost: "",
    sub: "Las grabaciones de entrevistas son datos personales. Las procesamos conforme al RGPD y a las leyes de protección de datos de la región MENA, las alojamos en centros de datos de la UE y MENA, lo ciframos todo y controlamos estrictamente el acceso, para que los datos de los candidatos permanezcan protegidos en cada etapa",
    cta: "Solicita una demo de seguridad",
    pillars: [
      { t: "Tratamiento conforme al RGPD\n(como encargado del tratamiento)", d: "TalentMind actúa como encargado del tratamiento y maneja los datos estrictamente según las instrucciones documentadas del cliente: el cliente es el responsable del tratamiento y es responsable de la base legal del candidato (consentimiento). Se firma un Data Processing Agreement (DPA, Art. 28 GDPR) con cada cliente, y ofrecemos orientación sobre cómo recopilar un consentimiento válido" },
      { t: "Residencia de datos en la UE y MENA", d: "Los datos personales se alojan en centros de datos de la UE y MENA (por ejemplo, Frankfurt y los EAU), de modo que los datos de los candidatos permanecen dentro de su región. Copias de seguridad cifradas periódicas; para Enterprise, un entorno dedicado y aislado en la región que elijas" },
      { t: "Cifrado en tránsito y en reposo", d: "Todo el tráfico está protegido con TLS 1.2+/HTTPS, y los datos se cifran en reposo con AES-256. Las claves de cifrado se gestionan en un KMS/HSM dedicado, con rotación periódica y una estricta separación de acceso" },
      { t: "Biometría y consentimiento explícito", d: "Las grabaciones de audio y vídeo de las entrevistas son datos personales y, en algunos casos, datos de categoría especial (biométricos). Los procesamos únicamente con el consentimiento explícito del interesado (Art. 9 GDPR; en consonancia con la PDPL de los EAU y KSA). Las grabaciones se aíslan por tenant y se accede a ellas estrictamente según la necesidad de conocer" },
      { t: "Control de acceso y auditoría", d: "Control de acceso basado en roles (RBAC) siguiendo el principio de mínimo privilegio, con autenticación de doble factor para los administradores. Cada operación con datos queda registrada, y respaldamos los derechos del interesado: acceso, rectificación y supresión" },
      { t: "Infraestructura certificada y respuesta", d: "Nuestras prácticas se alinean con ISO/IEC 27001 y SOC 2. Gestión de vulnerabilidades, actualizaciones periódicas, monitorización continua y un plan de respuesta a incidentes con notificación de brechas en un plazo de 72 horas (Art. 33 GDPR)" },
    ],
    bandTitle: "¿Necesitas una revisión de seguridad para tu equipo?",
    bandText: "Te enviaremos nuestra documentación de seguridad, un Data Processing Agreement (DPA), un formulario de consentimiento del candidato y responderemos a cualquier pregunta de tu equipo de seguridad de la información",
    contact: "Contáctanos",
  },
  pt: {
    heroPre: "Proteção dos dados dos candidatos e conformidade com o ",
    heroAccent: "RGPD",
    heroPost: "",
    sub: "As gravações de entrevistas são dados pessoais. Nós as processamos em conformidade com o RGPD e com as leis regionais de proteção de dados da MENA, hospedamos em data centers na UE e na MENA, criptografamos tudo e controlamos rigorosamente o acesso — para que os dados dos candidatos permaneçam protegidos em todas as etapas",
    cta: "Solicite uma demo de segurança",
    pillars: [
      { t: "Tratamento sob o RGPD\n(como operador)", d: "A TalentMind atua como operador de dados e trata os dados estritamente conforme as instruções documentadas do cliente: o cliente é o controlador dos dados e é responsável pela base legal do candidato (consentimento). Um Data Processing Agreement (DPA, Art. 28 GDPR) é assinado com cada cliente, e fornecemos orientação sobre como coletar um consentimento válido" },
      { t: "Residência de dados na UE e MENA", d: "Os dados pessoais são hospedados em data centers na UE e na MENA (por exemplo, Frankfurt e os EAU), de modo que os dados dos candidatos permaneçam dentro de sua região. Backups criptografados regulares; para Enterprise — um ambiente dedicado e isolado na região de sua escolha" },
      { t: "Criptografia em trânsito e em repouso", d: "Todo o tráfego é protegido com TLS 1.2+/HTTPS, e os dados são criptografados em repouso com AES-256. As chaves de criptografia são gerenciadas em um KMS/HSM dedicado, com rotação regular e estrita separação de acesso" },
      { t: "Biometria e consentimento explícito", d: "As gravações de áudio e vídeo das entrevistas são dados pessoais e, em alguns casos, dados de categoria especial (biométricos). Nós as processamos apenas com o consentimento explícito do titular dos dados (Art. 9 GDPR; alinhado com a PDPL dos EAU e KSA). As gravações são isoladas por tenant e acessadas estritamente com base na necessidade de conhecer" },
      { t: "Controle de acesso e auditoria", d: "Controle de acesso baseado em funções (RBAC) seguindo o princípio do menor privilégio, com autenticação de dois fatores para administradores. Cada operação com dados é registrada, e oferecemos suporte aos direitos do titular dos dados — acesso, retificação e eliminação" },
      { t: "Infraestrutura certificada e resposta", d: "Nossas práticas estão alinhadas com a ISO/IEC 27001 e a SOC 2. Gestão de vulnerabilidades, atualizações regulares, monitoramento contínuo e um plano de resposta a incidentes com notificação de violação em até 72 horas (Art. 33 GDPR)" },
    ],
    bandTitle: "Precisa de uma revisão de segurança para sua equipe?",
    bandText: "Enviaremos nossa documentação de segurança, um Data Processing Agreement (DPA), um formulário de consentimento do candidato e responderemos a qualquer pergunta da sua equipe de segurança da informação",
    contact: "Fale conosco",
  },
  ar: {
    heroPre: "حماية بيانات المرشّحين والامتثال لـ ",
    heroAccent: "GDPR",
    heroPost: "",
    sub: "تسجيلات المقابلات بيانات شخصية. نعالجها وفقًا للائحة GDPR وقوانين حماية البيانات الإقليمية في منطقة MENA، ونستضيفها في مراكز بيانات في الاتحاد الأوروبي ومنطقة MENA، ونشفّر كل شيء، ونتحكّم بصرامة في الوصول — لتبقى بيانات المرشّحين محميّة في كل مرحلة",
    cta: "اطلب عرضًا توضيحيًا للأمان",
    pillars: [
      { t: "المعالجة وفقًا لـ GDPR\n(بصفتنا معالِجًا للبيانات)", d: "تعمل TalentMind بصفتها معالِجًا للبيانات وتتعامل معها بدقة وفق التعليمات الموثّقة للعميل: فالعميل هو المتحكّم في البيانات وهو المسؤول عن الأساس القانوني الخاص بالمرشّح (الموافقة). تُوقَّع اتفاقية معالجة البيانات (DPA، Art. 28 GDPR) مع كل عميل، ونقدّم إرشادات حول جمع موافقة صحيحة" },
      { t: "موقع تخزين البيانات في الاتحاد الأوروبي وMENA", d: "تُستضاف البيانات الشخصية في مراكز بيانات في الاتحاد الأوروبي ومنطقة MENA (مثل Frankfurt والإمارات UAE)، بحيث تبقى بيانات المرشّحين ضمن منطقتها. نسخ احتياطية مشفّرة منتظمة؛ ولعملاء Enterprise — بيئة مخصّصة ومعزولة في المنطقة التي تختارها" },
      { t: "التشفير أثناء النقل وفي السكون", d: "جميع حركة البيانات محميّة بـ TLS 1.2+/HTTPS، وتُشفَّر البيانات في السكون باستخدام AES-256. تُدار مفاتيح التشفير في KMS/HSM مخصّص، مع تدوير منتظم وفصل صارم للوصول" },
      { t: "القياسات الحيوية والموافقة الصريحة", d: "تسجيلات الصوت والفيديو للمقابلات بيانات شخصية — وفي بعض الحالات بيانات من فئة خاصة (حيوية). نعالجها فقط بموافقة صريحة من صاحب البيانات (Art. 9 GDPR؛ بما يتوافق مع PDPL في الإمارات UAE والسعودية KSA). تُعزَل التسجيلات لكل مستأجر ويُتاح الوصول إليها بدقة وفق مبدأ الحاجة إلى المعرفة" },
      { t: "التحكم في الوصول والتدقيق", d: "التحكم في الوصول القائم على الأدوار (RBAC) وفق مبدأ الحدّ الأدنى من الصلاحيات، مع المصادقة الثنائية للمسؤولين. تُسجَّل كل عملية على البيانات، وندعم حقوق أصحاب البيانات — الوصول والتصحيح والمحو" },
      { t: "بنية تحتية معتمدة واستجابة", d: "تتوافق ممارساتنا مع ISO/IEC 27001 وSOC 2. إدارة الثغرات، والتحديثات المنتظمة، والمراقبة المستمرة، وخطة استجابة للحوادث مع الإخطار بالخروقات خلال 72 ساعة (Art. 33 GDPR)" },
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
