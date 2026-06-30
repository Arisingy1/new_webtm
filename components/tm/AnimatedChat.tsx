"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Arrow, GREEN, INK } from "./ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import type { Locale } from "@/lib/i18n";

/* ============================================================
   Анимированный диалог с ИИ-ассистентом: в поле «печатается»
   вопрос → отправляется → ИИ «печатает» ответ → следующий вопрос.
   Зациклено. Используется на главной (BusinessValue + Automation).
   ============================================================ */
const CHAT_SCRIPT: Record<Locale, { q: string; a: string }[]> = {
  en: [
    { q: "How well does the candidate match the leader profile?", a: "82% match. Strong leadership qualities and a readiness to take responsibility" },
    { q: "What are the main risks?", a: "Salary expectations above market and limited experience in client/agency development" },
    { q: "What sets them apart from others?", a: "Systems thinking and experience launching products from scratch" },
    { q: "Should we invite them to the final round?", a: "Yes — I recommend advancing them to the next stage" },
  ],
  es: [
    { q: "¿Qué tan bien encaja el candidato con el perfil de líder?", a: "82% de coincidencia. Sólidas cualidades de liderazgo y disposición para asumir responsabilidades" },
    { q: "¿Cuáles son los principales riesgos?", a: "Expectativas salariales por encima del mercado y experiencia limitada en desarrollo de clientes/agencias" },
    { q: "¿Qué lo diferencia de los demás?", a: "Pensamiento sistémico y experiencia lanzando productos desde cero" },
    { q: "¿Deberíamos invitarlo a la ronda final?", a: "Sí — recomiendo avanzarlo a la siguiente etapa" },
  ],
  pt: [
    { q: "Quão bem o candidato corresponde ao perfil de líder?", a: "82% de correspondência. Sólidas qualidades de liderança e disposição para assumir responsabilidades" },
    { q: "Quais são os principais riscos?", a: "Expectativas salariais acima do mercado e experiência limitada em desenvolvimento de clientes/agências" },
    { q: "O que o diferencia dos demais?", a: "Pensamento sistêmico e experiência lançando produtos do zero" },
    { q: "Devemos convidá-lo para a rodada final?", a: "Sim — recomendo avançá-lo para a próxima etapa" },
  ],
  ar: [
    { q: "ما مدى توافق المرشّح مع ملف القيادة؟", a: "توافق بنسبة 82%. صفات قيادية قوية واستعداد لتحمّل المسؤولية" },
    { q: "ما المخاطر الرئيسية؟", a: "توقعات الراتب أعلى من السوق وخبرة محدودة في تطوير العملاء/الوكالات" },
    { q: "ما الذي يميّزه عن الآخرين؟", a: "التفكير المنظومي وخبرة في إطلاق المنتجات من الصفر" },
    { q: "هل ندعوه إلى الجولة النهائية؟", a: "نعم — أوصي بترشيحه إلى المرحلة التالية" },
  ],
};

const COPY: Record<Locale, { aiAssistant: string; status: string; placeholder: string }> = {
  en: { aiAssistant: "AI assistant", status: "HR analytics · online", placeholder: "Ask about a candidate…" },
  es: { aiAssistant: "Asistente de IA", status: "Analítica de RR. HH. · en línea", placeholder: "Pregunta sobre un candidato…" },
  pt: { aiAssistant: "Assistente de IA", status: "Análise de RH · online", placeholder: "Pergunte sobre um candidato…" },
  ar: { aiAssistant: "مساعد الذكاء الاصطناعي", status: "تحليلات الموارد البشرية · متصل", placeholder: "اسأل عن مرشّح…" },
};

export function AnimatedChat({ className = "h-[306px]", frozen = false }: { className?: string; frozen?: boolean }) {
  const locale = useLocale();
  const t = COPY[locale];
  const script = CHAT_SCRIPT[locale];
  /* статичный диалог целиком — для превью на лендинге (без анимации печати) */
  const full: { role: "q" | "a"; text: string }[] = script.flatMap(({ q, a }) => [
    { role: "q" as const, text: q }, { role: "a" as const, text: a },
  ]);

  const [messages, setMessages] = useState<{ role: "q" | "a"; text: string }[]>(frozen ? full : []);
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);

  useEffect(() => {
    if (frozen) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sleep = (ms: number) => new Promise<void>((res) => { const t = setTimeout(res, ms); timers.push(t); });

    const run = async () => {
      while (!cancelled) {
        setMessages([]); setInput(""); setAiTyping(false);
        await sleep(700);
        for (const { q, a } of script) {
          if (cancelled) return;
          for (let i = 1; i <= q.length; i++) { if (cancelled) return; setInput(q.slice(0, i)); await sleep(26); }
          await sleep(420);
          setInput("");
          setMessages((m) => [...m, { role: "q", text: q }]);
          await sleep(450);
          setAiTyping(true); await sleep(950); setAiTyping(false);
          setMessages((m) => [...m, { role: "a", text: "" }]);
          for (let i = 1; i <= a.length; i++) { if (cancelled) return; setMessages((m) => { const c = [...m]; c[c.length - 1] = { role: "a", text: a.slice(0, i) }; return c; }); await sleep(18); }
          await sleep(1500);
        }
        await sleep(1200);
      }
    };
    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [frozen, script]);

  return (
    <div className={`flex w-full flex-col overflow-hidden rounded-3xl border border-[#e9efe6] bg-white/95 p-5 shadow-[0_28px_60px_rgba(24,56,51,0.16)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-[#eef0ee] pb-3">
        <img src="/robot.png" alt="" className="h-7 w-7 object-contain" />
        <div className="leading-tight">
          <p className="text-xs font-semibold" style={{ color: INK }}>{t.aiAssistant}</p>
          <p className="flex items-center gap-1 text-[10px] text-[#183833]/45"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} /> {t.status}</p>
        </div>
      </div>
      <div className={`flex flex-1 flex-col gap-2.5 overflow-hidden py-3 ${frozen ? "justify-start" : "justify-end"}`}>
        {messages.map((m, i) =>
          m.role === "q" ? (
            <div key={i} className="flex justify-end">
              <span className="max-w-[86%] rounded-2xl rounded-br-sm bg-[#eef2ec] px-3 py-2 text-xs leading-snug" style={{ color: INK }}>{m.text}</span>
            </div>
          ) : (
            <div key={i} className="flex items-start gap-1.5">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: GREEN }}><Sparkles className="h-3 w-3 text-white" /></span>
              <span className="max-w-[86%] rounded-2xl rounded-bl-sm border border-[#e7f0d8] px-3 py-2 text-xs leading-snug" style={{ background: `${GREEN}14`, color: INK }}>{m.text}</span>
            </div>
          )
        )}
        {aiTyping && (
          <div className="flex items-center gap-1.5">
            <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: GREEN }}><Sparkles className="h-3 w-3 text-white" /></span>
            <span className="flex gap-1 rounded-2xl rounded-bl-sm border border-[#e7f0d8] px-3 py-2.5" style={{ background: `${GREEN}14` }}>
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9fbca3]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9fbca3]" style={{ animationDelay: "0.15s" }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9fbca3]" style={{ animationDelay: "0.3s" }} />
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-[#f4f7f2] px-3 py-2">
        <span className="flex-1 truncate text-xs">
          {input ? <span style={{ color: INK }}>{input}</span> : <span className="text-[#183833]/35">{t.placeholder}</span>}
          {!frozen && <span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse align-middle" style={{ background: INK }} />}
        </span>
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg" style={{ background: GREEN }}><Arrow className="h-3.5 w-3.5 text-white" /></span>
      </div>
    </div>
  );
}
