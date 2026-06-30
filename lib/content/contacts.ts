import type { Locale } from "@/lib/i18n";

export type ContactsContent = {
  pre: string; accent: string; post: string; sub: string;
  labels: { email: string; linkedin: string; office: string };
  promoTitle: string; promoSub: string;
  form: { name: string; company: string; email: string; phone: string; message: string; messagePh: string; namePh: string; companyPh: string; emailPh: string; phonePh: string };
  consentPre: string; consentLink: string; consentPost: string;
  send: string; sending: string; sent: string; error: string;
};

const en: ContactsContent = {
  pre: "Let's talk about your ", accent: "hiring", post: "",
  sub: "Send us a request — we'll demo TalentMind on your interviews and help you get started",
  labels: { email: "Email", linkedin: "LinkedIn", office: "Office" },
  promoTitle: "5 interviews free", promoSub: "Try it without a credit card — get a report on your first interview in a couple of minutes",
  form: { name: "Name", company: "Company", email: "Email", phone: "Phone", message: "Message", messagePh: "Tell us about your hiring process...", namePh: "Anna", companyPh: "Acme Inc.", emailPh: "anna@company.com", phonePh: "+1 ..." },
  consentPre: "I consent to the processing of my personal data and accept the terms of the ", consentLink: "Privacy Policy", consentPost: ".",
  send: "Send request", sending: "Sending…", sent: "Your request has been sent", error: "Couldn't send your request. Please try again or email us at info@talentmind.app",
};

const es: ContactsContent = {
  pre: "Hablemos de tu ", accent: "contratación", post: "",
  sub: "Envíanos una solicitud: haremos una demo de TalentMind con tus entrevistas y te ayudaremos a empezar",
  labels: { email: "Correo", linkedin: "LinkedIn", office: "Oficina" },
  promoTitle: "5 entrevistas gratis", promoSub: "Pruébalo sin tarjeta de crédito: recibe un informe de tu primera entrevista en un par de minutos",
  form: { name: "Nombre", company: "Empresa", email: "Correo", phone: "Teléfono", message: "Mensaje", messagePh: "Cuéntanos sobre tu proceso de contratación...", namePh: "Ana", companyPh: "Acme Inc.", emailPh: "ana@empresa.com", phonePh: "+34 ..." },
  consentPre: "Doy mi consentimiento para el tratamiento de mis datos personales y acepto los términos de la ", consentLink: "Política de privacidad", consentPost: ".",
  send: "Enviar solicitud", sending: "Enviando…", sent: "Tu solicitud se ha enviado", error: "No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos a info@talentmind.app",
};

const pt: ContactsContent = {
  pre: "Vamos falar sobre sua ", accent: "contratação", post: "",
  sub: "Envie uma solicitação — faremos uma demo da TalentMind com suas entrevistas e ajudaremos você a começar",
  labels: { email: "E-mail", linkedin: "LinkedIn", office: "Escritório" },
  promoTitle: "5 entrevistas grátis", promoSub: "Experimente sem cartão de crédito: receba um relatório da sua primeira entrevista em alguns minutos",
  form: { name: "Nome", company: "Empresa", email: "E-mail", phone: "Telefone", message: "Mensagem", messagePh: "Conte sobre seu processo de contratação...", namePh: "Ana", companyPh: "Acme Inc.", emailPh: "ana@empresa.com", phonePh: "+55 ..." },
  consentPre: "Concordo com o tratamento dos meus dados pessoais e aceito os termos da ", consentLink: "Política de privacidade", consentPost: ".",
  send: "Enviar solicitação", sending: "Enviando…", sent: "Sua solicitação foi enviada", error: "Não foi possível enviar sua solicitação. Tente novamente ou escreva para info@talentmind.app",
};

const ar: ContactsContent = {
  pre: "لنتحدّث عن ", accent: "التوظيف لديك", post: "",
  sub: "أرسل لنا طلبًا — سنقدّم عرضًا توضيحيًا لـ TalentMind على مقابلاتك ونساعدك على البدء",
  labels: { email: "البريد الإلكتروني", linkedin: "LinkedIn", office: "المكتب" },
  promoTitle: "5 مقابلات مجانًا", promoSub: "جرّبها دون بطاقة ائتمان — احصل على تقرير عن مقابلتك الأولى خلال دقائق",
  form: { name: "الاسم", company: "الشركة", email: "البريد الإلكتروني", phone: "الهاتف", message: "الرسالة", messagePh: "أخبرنا عن عملية التوظيف لديك...", namePh: "Anna", companyPh: "Acme Inc.", emailPh: "anna@company.com", phonePh: "+1 ..." },
  consentPre: "أوافق على معالجة بياناتي الشخصية وأقبل شروط ", consentLink: "سياسة الخصوصية", consentPost: ".",
  send: "إرسال الطلب", sending: "جارٍ الإرسال…", sent: "تم إرسال طلبك", error: "تعذّر إرسال طلبك. يُرجى المحاولة مرة أخرى أو مراسلتنا على info@talentmind.app",
};

export const CONTACTS: Record<Locale, ContactsContent> = { en, es, pt, ar };
