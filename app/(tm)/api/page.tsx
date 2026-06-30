"use client";

import { Terminal, Webhook, KeyRound, Zap } from "lucide-react";
import { Arrow, CTA, GREEN, INK, TEAL, useReveals } from "@/components/tm/ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import { localize, type Locale } from "@/lib/i18n";

const ENDPOINTS = [
  { m: "POST", path: "/v1/interviews", c: GREEN },
  { m: "GET", path: "/v1/interviews/{id}", c: TEAL },
  { m: "GET", path: "/v1/candidates/{id}/score", c: TEAL },
  { m: "POST", path: "/v1/webhooks", c: GREEN },
];

const CODE = `curl -X POST https://api.talentmind.ru/v1/interviews \\
  -H "Authorization: Bearer $TALENTMIND_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "candidate": "David Parker",
    "vacancy_id": "ui-engineer",
    "media_url": "https://cdn.acme.io/int-204.mp4"
  }'`;

const RESPONSE = `{
  "id": "int_8d24f0",
  "status": "processing",
  "scores": {
    "leadership": 0.88,
    "empathy": 0.75,
    "communication": 0.84,
    "logic": 0.76
  },
  "match": 0.88
}`;

const COPY: Record<Locale, {
  heroPre: string;
  heroAccent: string;
  heroPost: string;
  sub: string;
  ctaKey: string;
  ctaDocs: string;
  request: string;
  response: string;
  coreEndpoints: string;
  endpoints: string[];
  features: { t: string; d: string }[];
}> = {
  en: {
    heroPre: "Embed ",
    heroAccent: "AI assessment",
    heroPost: " into your ATS",
    sub: "TalentMind REST API and webhooks: upload interviews and get soft skills scoring and team DNA fit programmatically",
    ctaKey: "Get an access key",
    ctaDocs: "Documentation",
    request: "Request",
    response: "Response",
    coreEndpoints: "Core endpoints",
    endpoints: [
      "Upload an interview recording for analysis",
      "Get interview status and report",
      "Score a candidate's soft skills",
      "Subscribe to analysis events",
    ],
    features: [
      { t: "Keys and OAuth", d: "Secure authentication, key rotation, and scope-based access control" },
      { t: "Webhooks", d: "Real-time events: interview processed, report ready" },
      { t: "Rate limits", d: "Transparent limits and SDKs for Python, Node, and Go" },
    ],
  },
  es: {
    heroPre: "Integra la ",
    heroAccent: "evaluación con IA",
    heroPost: " en tu ATS",
    sub: "API REST y webhooks de TalentMind: sube entrevistas y obtén la puntuación de habilidades blandas y el ajuste al ADN del equipo de forma programática",
    ctaKey: "Obtén una clave de acceso",
    ctaDocs: "Documentación",
    request: "Solicitud",
    response: "Respuesta",
    coreEndpoints: "Endpoints principales",
    endpoints: [
      "Sube una grabación de entrevista para su análisis",
      "Obtén el estado y el informe de la entrevista",
      "Puntúa las habilidades blandas de un candidato",
      "Suscríbete a los eventos de análisis",
    ],
    features: [
      { t: "Claves y OAuth", d: "Autenticación segura, rotación de claves y control de acceso basado en alcances" },
      { t: "Webhooks", d: "Eventos en tiempo real: entrevista procesada, informe listo" },
      { t: "Límites de uso", d: "Límites transparentes y SDK para Python, Node y Go" },
    ],
  },
  pt: {
    heroPre: "Integre a ",
    heroAccent: "avaliação por IA",
    heroPost: " no seu ATS",
    sub: "API REST e webhooks da TalentMind: envie entrevistas e obtenha a pontuação de habilidades comportamentais e a compatibilidade com o DNA da equipe de forma programática",
    ctaKey: "Obtenha uma chave de acesso",
    ctaDocs: "Documentação",
    request: "Solicitação",
    response: "Resposta",
    coreEndpoints: "Endpoints principais",
    endpoints: [
      "Envie uma gravação de entrevista para análise",
      "Obtenha o status e o relatório da entrevista",
      "Pontue as habilidades comportamentais de um candidato",
      "Inscreva-se nos eventos de análise",
    ],
    features: [
      { t: "Chaves e OAuth", d: "Autenticação segura, rotação de chaves e controle de acesso baseado em escopos" },
      { t: "Webhooks", d: "Eventos em tempo real: entrevista processada, relatório pronto" },
      { t: "Limites de uso", d: "Limites transparentes e SDKs para Python, Node e Go" },
    ],
  },
  ar: {
    heroPre: "ادمج ",
    heroAccent: "التقييم بالذكاء الاصطناعي",
    heroPost: " في نظام التوظيف (ATS)",
    sub: "واجهة TalentMind البرمجية REST وميزة Webhooks: ارفع المقابلات واحصل على تقييم المهارات الشخصية ومدى التوافق مع الحمض النووي للفريق برمجيًا",
    ctaKey: "احصل على مفتاح وصول",
    ctaDocs: "التوثيق",
    request: "الطلب",
    response: "الاستجابة",
    coreEndpoints: "نقاط النهاية الأساسية",
    endpoints: [
      "ارفع تسجيل مقابلة لتحليله",
      "احصل على حالة المقابلة وتقريرها",
      "قيّم المهارات الشخصية لمرشّح",
      "اشترك في أحداث التحليل",
    ],
    features: [
      { t: "المفاتيح وOAuth", d: "مصادقة آمنة، وتدوير للمفاتيح، وتحكم في الوصول قائم على النطاقات" },
      { t: "Webhooks", d: "أحداث فورية: تمت معالجة المقابلة، التقرير جاهز" },
      { t: "حدود الاستخدام", d: "حدود شفافة وحِزم تطوير برمجية (SDK) للغات Python وNode وGo" },
    ],
  },
};

export default function ApiPage() {
  const root = useReveals();
  const locale = useLocale();
  const t = COPY[locale];
  return (
    <div ref={root}>
      <section className="mx-auto max-w-[1100px] px-6 pt-40 pb-12 text-center">
        <h1 className="reveal mx-auto max-w-3xl text-[2.6rem] font-semibold leading-[1] tracking-tight sm:text-[4rem]">
          {t.heroPre}<span style={{ color: GREEN }}>{t.heroAccent}</span>{t.heroPost}
        </h1>
        <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-[#183833]/70">
          {t.sub}
        </p>
        <div className="reveal mx-auto mt-9 flex max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <CTA href={localize("/api/docs", locale)} className="w-full justify-center sm:w-auto">{t.ctaKey}</CTA>
          <CTA href={localize("/api/docs", locale)} variant="outline" className="w-full justify-center sm:w-auto">{t.ctaDocs}</CTA>
        </div>
      </section>

      {/* code mockups */}
      <section className="mx-auto max-w-[1100px] px-6 py-10">
        <div className="reveal grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[
            { title: t.request, icon: <Terminal className="h-4 w-4" />, code: CODE, lang: "bash" },
            { title: t.response, icon: <Zap className="h-4 w-4" />, code: RESPONSE, lang: "json" },
          ].map((b) => (
            <div key={b.title} className="overflow-hidden rounded-2xl border border-[#1f3f3b] bg-[#0f2a27] shadow-[0_24px_60px_rgba(24,56,51,0.25)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="flex items-center gap-2 text-sm font-medium text-white">{b.icon} {b.title}</span>
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
              </div>
              <pre dir="ltr" className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-[#cfe8c4]">
{b.code}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* endpoints */}
      <section className="mx-auto max-w-[1000px] px-6 py-12">
        <h2 className="reveal text-2xl font-semibold tracking-tight" style={{ color: INK }}>{t.coreEndpoints}</h2>
        <div className="stagger mt-6 space-y-3">
          {ENDPOINTS.map((e, i) => (
            <div key={e.path} className="flex items-center gap-4 rounded-2xl border border-[#ededed] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(24,56,51,0.05)]">
              <span className="w-14 shrink-0 rounded-md px-2 py-1 text-center text-xs font-bold text-white" style={{ background: e.c }}>{e.m}</span>
              <code className="font-mono text-sm" style={{ color: INK }}>{e.path}</code>
              <span className="ml-auto hidden text-sm text-[#183833]/60 sm:block">{t.endpoints[i]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section className="mx-auto max-w-[1100px] px-6 pb-24">
        <div className="stagger grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: <KeyRound className="h-6 w-6" />, a: GREEN },
            { icon: <Webhook className="h-6 w-6" />, a: TEAL },
            { icon: <Zap className="h-6 w-6" />, a: GREEN },
          ].map((c, i) => (
            <div key={t.features[i].t} className="flex h-full flex-col rounded-3xl border border-[#ededed] bg-white p-7 shadow-[0_16px_40px_rgba(24,56,51,0.06)]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: c.a }}>{c.icon}</span>
              <h3 className="mt-5 text-xl font-semibold">{t.features[i].t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#183833]/70">{t.features[i].d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
