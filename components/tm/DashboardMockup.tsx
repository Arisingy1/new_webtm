"use client";

import { Maximize2, X, Settings, Mic, ArrowRight, MessageSquare, Home, Building2, ChevronLeft, ChevronDown } from "lucide-react";
import { Candidate, GREEN, INK, RED, TEAL } from "./ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import type { Locale } from "@/lib/i18n";

/* ── словарь интерфейса макета дашборда ── */
type DashCard = { name: string; note: string };

const DICT: Record<
  Locale,
  {
    steps: { load: string; loadSub: string; assistant: string; assistantSub: string; compare: string; compareSub: string };
    nav: { aiAssistant: string; home: string; departments: string; settings: string };
    user: string;
    userInitials: string;
    role: string;
    collapse: string;
    aiAssistant: string;
    hrChat: string;
    location: string;
    ready: string;
    figureOut: string;
    askQuestion: string;
    welcome: string;
    newReports: string;
    cards: DashCard[];
  }
> = {
  en: {
    steps: {
      load: "Load the interview",
      loadSub: "Quick report on soft skills from audio or video",
      assistant: "AI Assistant",
      assistantSub: "Will help you understand at any stage of work",
      compare: "Compare candidates",
      compareSub: "Choose the best candidate",
    },
    nav: { aiAssistant: "AI assistant", home: "Home", departments: "Departments", settings: "Settings" },
    user: "Olivia Hayes",
    userInitials: "OH",
    role: "Recruiter",
    collapse: "Collapse menu",
    aiAssistant: "AI Assistant",
    hrChat: "HR Insights Chat",
    location: "What's my current location?",
    ready:
      "Ready to analyze your soft skills? Just upload your video or audio interview: 1. Launch the interface. 2. Navigate to “Media Upload”. 3. Hit “Choose File” and pick your interview. 4. Click “Upload”. 5. The bot will start analyzing",
    figureOut: "Could you help me figure out where I am?",
    askQuestion: "Ask your question",
    welcome: "Welcome to",
    newReports: "New Reports",
    cards: [
      { name: "David Parker", note: "Strong T-shape, good communication" },
      { name: "Michaela Thompson", note: "Offer sent" },
      { name: "Samantha Carter", note: "Salary negotiation" },
      { name: "Alex Johnson", note: "Exit in 2 weeks" },
      { name: "Daniel Brooks", note: "Strong T-shape, good communication" },
      { name: "Rachel Cole", note: "" },
    ],
  },
  es: {
    steps: {
      load: "Carga la entrevista",
      loadSub: "Informe rápido de habilidades blandas a partir de audio o video",
      assistant: "Asistente de IA",
      assistantSub: "Te ayudará a entender en cualquier etapa del trabajo",
      compare: "Comparar candidatos",
      compareSub: "Elige al mejor candidato",
    },
    nav: { aiAssistant: "Asistente de IA", home: "Inicio", departments: "Departamentos", settings: "Ajustes" },
    user: "Lucía Romero",
    userInitials: "LR",
    role: "Reclutador",
    collapse: "Contraer menú",
    aiAssistant: "Asistente de IA",
    hrChat: "Chat de información de RR. HH.",
    location: "¿Cuál es mi ubicación actual?",
    ready:
      "¿Listo para analizar tus habilidades blandas? Solo sube tu entrevista en video o audio: 1. Abre la interfaz. 2. Ve a “Subir contenido”. 3. Pulsa “Elegir archivo” y selecciona tu entrevista. 4. Haz clic en “Subir”. 5. El bot comenzará a analizar",
    figureOut: "¿Podrías ayudarme a averiguar dónde estoy?",
    askQuestion: "Escribe tu pregunta",
    welcome: "Bienvenido a",
    newReports: "Nuevos informes",
    cards: [
      { name: "David Romero", note: "Perfil en T sólido, buena comunicación" },
      { name: "Micaela Torres", note: "Oferta enviada" },
      { name: "Valentina Ríos", note: "Negociación salarial" },
      { name: "Alejandro Gil", note: "Salida en 2 semanas" },
      { name: "Daniel Castro", note: "Perfil en T sólido, buena comunicación" },
      { name: "Camila Ortega", note: "" },
    ],
  },
  pt: {
    steps: {
      load: "Carregue a entrevista",
      loadSub: "Relatório rápido de habilidades comportamentais a partir de áudio ou vídeo",
      assistant: "Assistente de IA",
      assistantSub: "Vai ajudar você a entender em qualquer etapa do trabalho",
      compare: "Comparar candidatos",
      compareSub: "Escolha o melhor candidato",
    },
    nav: { aiAssistant: "Assistente de IA", home: "Início", departments: "Departamentos", settings: "Configurações" },
    user: "Beatriz Santos",
    userInitials: "BS",
    role: "Recrutador",
    collapse: "Recolher menu",
    aiAssistant: "Assistente de IA",
    hrChat: "Chat de insights de RH",
    location: "Qual é a minha localização atual?",
    ready:
      "Pronto para analisar suas habilidades comportamentais? Basta enviar sua entrevista em vídeo ou áudio: 1. Abra a interface. 2. Vá em “Enviar mídia”. 3. Toque em “Escolher arquivo” e selecione sua entrevista. 4. Clique em “Enviar”. 5. O bot vai começar a analisar",
    figureOut: "Você poderia me ajudar a descobrir onde estou?",
    askQuestion: "Escreva sua pergunta",
    welcome: "Bem-vindo ao",
    newReports: "Novos relatórios",
    cards: [
      { name: "David Ramos", note: "Perfil em T forte, boa comunicação" },
      { name: "Micaela Torres", note: "Oferta enviada" },
      { name: "Valentina Rios", note: "Negociação salarial" },
      { name: "Alexandre Pinto", note: "Saída em 2 semanas" },
      { name: "Daniel Castro", note: "Perfil em T forte, boa comunicação" },
      { name: "Camila Costa", note: "" },
    ],
  },
  ar: {
    steps: {
      load: "حمّل المقابلة",
      loadSub: "تقرير سريع عن المهارات الشخصية من الصوت أو الفيديو",
      assistant: "مساعد الذكاء الاصطناعي",
      assistantSub: "سيساعدك على الفهم في أي مرحلة من العمل",
      compare: "قارن المرشّحين",
      compareSub: "اختر أفضل مرشّح",
    },
    nav: { aiAssistant: "مساعد الذكاء الاصطناعي", home: "الرئيسية", departments: "الأقسام", settings: "الإعدادات" },
    user: "نورة الشمري",
    userInitials: "ن",
    role: "مسؤول التوظيف",
    collapse: "طيّ القائمة",
    aiAssistant: "مساعد الذكاء الاصطناعي",
    hrChat: "محادثة رؤى الموارد البشرية",
    location: "ما موقعي الحالي؟",
    ready:
      "هل أنت مستعد لتحليل مهاراتك الشخصية؟ ما عليك سوى رفع مقابلتك بالفيديو أو الصوت: 1. افتح الواجهة. 2. انتقل إلى “رفع الوسائط”. 3. اضغط “اختيار ملف” واختر مقابلتك. 4. انقر “رفع”. 5. سيبدأ البوت بالتحليل",
    figureOut: "هل يمكنك مساعدتي في معرفة مكاني؟",
    askQuestion: "اطرح سؤالك",
    welcome: "مرحبًا بك في",
    newReports: "تقارير جديدة",
    cards: [
      { name: "داود كريم", note: "ملف T قوي، تواصل جيد" },
      { name: "ميساء ثابت", note: "تم إرسال العرض" },
      { name: "سمر قاسم", note: "التفاوض على الراتب" },
      { name: "علي حسن", note: "مغادرة خلال أسبوعين" },
      { name: "ليلى مراد", note: "ملف T قوي، تواصل جيد" },
      { name: "ريان خوري", note: "" },
    ],
  },
};

/* Soft-skills rose chart (deterministic → SSR-safe) */
export function Rose({ size = 120 }: { size?: number }) {
  const segs = [
    { v: 0.62, c: GREEN },
    { v: 0.92, c: GREEN },
    { v: 0.5, c: TEAL },
    { v: 0.4, c: TEAL },
    { v: 0.28, c: RED },
    { v: 0.55, c: "#bfe39a" },
    { v: 0.72, c: "#7fd6e6" },
    { v: 0.46, c: GREEN },
  ];
  const cx = 60, cy = 60, max = 50;
  const step = (Math.PI * 2) / segs.length;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <circle cx={cx} cy={cy} r="54" fill="#F4F7F6" />
      {segs.map((s, i) => {
        const a0 = i * step - Math.PI / 2;
        const a1 = a0 + step * 0.88;
        const r = max * s.v + 10;
        const x0 = (cx + r * Math.cos(a0)).toFixed(2);
        const y0 = (cy + r * Math.sin(a0)).toFixed(2);
        const x1 = (cx + r * Math.cos(a1)).toFixed(2);
        const y1 = (cy + r * Math.sin(a1)).toFixed(2);
        return (
          <path
            key={i}
            d={`M${cx} ${cy} L${x0} ${y0} A${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x1} ${y1} Z`}
            fill={s.c}
            opacity={0.92}
          />
        );
      })}
      <circle cx={cx} cy={cy} r="9" fill="#fff" />
    </svg>
  );
}

/* The three Figma step cards (reused in hero mockup + features) */
export function StepCards({ compact = false }: { compact?: boolean }) {
  const s = DICT[useLocale()].steps;
  const pad = compact ? "p-4" : "p-7";
  const title = compact ? "text-base" : "text-xl";
  const sub = compact ? "text-[11px]" : "text-sm";
  const icon = compact ? "h-9 w-9" : "h-14 w-14";
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className={`rounded-[20px] ${pad} text-center text-white shadow-[0_10px_30px_rgba(122,184,0,0.25)]`} style={{ background: GREEN }}>
        <img src="/figma/cloud-upload.svg" alt="" className={`mx-auto ${icon}`} />
        <p className={`mt-3 ${title}`}>{s.load}</p>
        <p className={`mt-1.5 ${sub} text-white/85`}>{s.loadSub}</p>
      </div>
      <div className={`rounded-[20px] border border-[#11AFCC]/30 bg-gradient-to-br from-white via-[#eafaff] to-white ${pad} text-center shadow-[0_12px_40px_rgba(17,175,204,0.2)]`}>
        <img src="/robot.png" alt="" className={`mx-auto ${compact ? "h-12 w-12" : "h-16 w-16"} object-contain`} />
        <p className={`mt-2 ${title}`} style={{ color: TEAL }}>{s.assistant}</p>
        <p className={`mt-1.5 ${sub}`} style={{ color: INK }}>{s.assistantSub}</p>
      </div>
      <div className={`rounded-[20px] ${pad} text-center text-white shadow-[0_10px_30px_rgba(17,175,204,0.25)]`} style={{ background: TEAL }}>
        <img src="/figma/people.svg" alt="" className={`mx-auto ${icon}`} />
        <p className={`mt-3 ${title}`}>{s.compare}</p>
        <p className={`mt-1.5 ${sub} text-white/85`}>{s.compareSub}</p>
      </div>
    </div>
  );
}

/* Full "Desktop 53" composition — fixed design width, scale to fit */
export default function DashboardMockup() {
  const t = DICT[useLocale()];
  return (
    <div className="w-[1180px] overflow-hidden rounded-[28px] border border-[#e6ece4] bg-[#F4F7F6] shadow-[0_40px_100px_rgba(24,56,51,0.18)]">
      <div className="flex">
        {/* SIDEBAR */}
        <aside className="flex w-[260px] shrink-0 flex-col bg-white px-3 py-5">
          {/* логотип + кнопка сворачивания */}
          <div className="flex items-center justify-between px-2">
            <img src="/figma/logo.svg" alt="TalentMind" className="h-7 w-auto" />
            <button className="grid h-7 w-7 place-items-center rounded-lg text-[#183833]/40 transition-colors hover:bg-[#F4F7F6]" aria-label={t.collapse}>
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          {/* навигация */}
          <nav className="mt-7 space-y-1">
            <a className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#183833]/80 transition-colors hover:bg-[#F4F7F6]">
              <img src="/robot.png" alt="" className="h-6 w-6 object-contain" /> {t.nav.aiAssistant}
            </a>
            <a className="flex items-center gap-3 rounded-xl bg-[#F1F4F2] px-3 py-2.5 text-sm font-semibold" style={{ color: INK }}>
              <Home className="h-5 w-5" style={{ color: TEAL }} /> {t.nav.home}
            </a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#183833]/80 transition-colors hover:bg-[#F4F7F6]">
              <Building2 className="h-5 w-5" style={{ color: TEAL }} /> {t.nav.departments}
            </a>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#183833]/80 transition-colors hover:bg-[#F4F7F6]">
              <Settings className="h-5 w-5" style={{ color: TEAL }} /> {t.nav.settings}
              <ChevronDown className="ml-auto h-4 w-4 text-[#183833]/35" />
            </button>
          </nav>

          {/* профиль пользователя */}
          <div className="mt-auto flex items-center gap-3 border-t border-[#ededed] px-2 pt-4">
            <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold text-white" style={{ background: TEAL }}>{t.userInitials}</span>
            <div>
              <p className="text-sm font-medium" style={{ color: INK }}>{t.user}</p>
              <p className="text-xs" style={{ color: TEAL }}>{t.role}</p>
            </div>
          </div>
        </aside>

        {/* CHAT PANEL */}
        <section className="w-[330px] shrink-0 border-x border-[#e6ece4] bg-white">
          <div className="m-3 rounded-2xl border border-[#11AFCC]/30 p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-base font-semibold" style={{ color: INK }}>
                <img src="/robot.png" alt="" className="h-6 w-6 object-contain" /> {t.aiAssistant}
              </span>
              <span className="flex items-center gap-2 text-[#183833]/40">
                <Maximize2 className="h-4 w-4" /> <X className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#183833]/40" />
              <div className="flex-1 rounded-full border border-[#ededed] py-1.5 text-center text-xs font-medium" style={{ color: INK }}>
                {t.hrChat}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <span className="rounded-full border border-[#ededed] px-3 py-1 text-[11px] text-[#183833]/70">
                {t.location}
              </span>
            </div>
            {/* waveform */}
            <div className="mt-3 flex items-center gap-2 rounded-full bg-[#F4F7F6] px-3 py-2">
              <span className="text-[#183833]/50">❚❚</span>
              <div className="flex h-4 flex-1 items-center gap-[2px]">
                {Array.from({ length: 34 }).map((_, i) => (
                  <span key={i} className="w-[2px] rounded-full bg-[#183833]/30" style={{ height: `${(20 + ((i * 53) % 80)).toFixed(0)}%` }} />
                ))}
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-[#183833]/65">
              {t.ready}
            </p>

            {/* rose chart bubble */}
            <div className="mt-3 grid place-items-center rounded-2xl bg-[#F4F7F6] py-3">
              <Rose size={130} />
            </div>
            <p className="mt-2 text-[11px] text-[#183833]/60">{t.figureOut}</p>

            <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#ededed] px-3 py-2">
              <span className="text-xs text-gray-400">{t.askQuestion}</span>
              <span className="ml-auto flex items-center gap-2 text-[#183833]/50">
                <Mic className="h-4 w-4" /> <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="flex-1 px-7 py-6">
          <h3 className="text-2xl" style={{ color: INK }}>
            {t.welcome} <span className="font-bold">TALENT MIND</span>
          </h3>
          <div className="mt-5">
            <StepCards />
          </div>
          <p className="mt-7 text-xl" style={{ color: INK }}>{t.newReports}</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <Candidate name={t.cards[0].name} note={t.cards[0].note} noteColor={GREEN} tag="interview" />
            <Candidate name={t.cards[1].name} note={t.cards[1].note} noteColor={GREEN} tag="offer" />
            <Candidate name={t.cards[2].name} note={t.cards[2].note} noteColor={GREEN} tag="offer" />
            <Candidate name={t.cards[3].name} note={t.cards[3].note} noteColor={GREEN} tag="hired" />
            <Candidate name={t.cards[4].name} note={t.cards[4].note} noteColor={RED} tag="reject" />
            <Candidate name={t.cards[5].name} note={t.cards[5].note} noteColor={TEAL} tag="interview" />
          </div>
        </section>
      </div>
    </div>
  );
}
