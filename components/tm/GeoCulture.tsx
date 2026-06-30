"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe2, ArrowLeft } from "lucide-react";

const ARABIC_FONT = "var(--font-arabic), sans-serif";

/* ============================================================
   GeoCulture — «الجيوثقافة»: كتلتان تسويقيّتان للنسخة العربية،
   تُدرجان كأول كتلة في /ar/platform (قبل الثقافة المؤسسية).
   ١) لوحة فاتحة «الشيفرة الثقافية» — المعنى لا المنهجية.
   ٢) شريط ثقة + دعوة لاتخاذ إجراء.
   ============================================================ */

const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const AMBER = "#E8A317";
const INK = "#183833";

const CODES = [
  { glyph: "و", ar: "الواسطة", color: GREEN, meaning: "بناء الثقة وشبكة العلاقات المهنية." },
  { glyph: "ش", ar: "الشورى", color: TEAL, meaning: "اتخاذ القرار بالتشاور وإشراك الفريق." },
  { glyph: "ح", ar: "حفظ ماء الوجه", color: AMBER, meaning: "التواصل بلباقةٍ واحترامٍ للكرامة." },
  { glyph: "أ", ar: "الأمانة والإتقان", color: GREEN, meaning: "النزاهة والإخلاص والإتقان في العمل." },
];

const TRUST = [
  { num: "١", t: "علميّ", d: "مبنيّ على أطر علمية عالمية معتمَدة.", color: GREEN },
  { num: "٢", t: "محليّ", d: "مُعايَر لثقافة الخليج والشرق الأوسط.", color: TEAL },
  { num: "٣", t: "عادل", d: "يركّز على السلوك المهني، لا على الأصل.", color: AMBER },
];

export default function GeoCulture() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".geo-reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 44, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray<HTMLElement>(".geo-tile").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: i * 0.07,
            scrollTrigger: { trigger: el.parentElement, start: "top 82%" } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="geo-culture" ref={rootRef} dir="rtl" className="scroll-mt-24 relative w-full overflow-hidden py-16 md:py-24" style={{ color: INK }}>
      <style>{`
        .geo-dots { background-image: radial-gradient(rgba(24,56,51,0.05) 1px, transparent 1px); background-size: 24px 24px;
          -webkit-mask-image: radial-gradient(120% 90% at 80% 0%, #000 30%, transparent 75%); mask-image: radial-gradient(120% 90% at 80% 0%, #000 30%, transparent 75%); }
      `}</style>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        {/* ====================== ١) لوحة الشيفرة الثقافية (فاتحة) ====================== */}
        <div
          className="geo-reveal relative overflow-hidden rounded-[34px] border border-[#e2ecd2] p-7 shadow-[0_28px_70px_rgba(24,56,51,0.08)] md:p-12"
          style={{ background: "linear-gradient(135deg, #f5fbef 0%, #eef6f3 60%, #ecf5f4 100%)" }}
        >
          <div aria-hidden className="geo-dots pointer-events-none absolute inset-0" />
          <div aria-hidden className="pointer-events-none absolute h-72 w-72 rounded-full blur-[120px]" style={{ background: `${GREEN}1f`, insetInlineEnd: "-3rem", top: "-3rem" }} />
          <div aria-hidden className="pointer-events-none absolute h-64 w-64 rounded-full blur-[130px]" style={{ background: `${TEAL}1c`, insetInlineStart: "-4rem", bottom: "-4rem" }} />

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d8ecc4] bg-white/70 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] backdrop-blur" style={{ color: INK }}>
              <Globe2 className="h-3.5 w-3.5" style={{ color: GREEN }} /> الخليج والشرق الأوسط
            </span>
            <h2 className="mt-5 font-bold leading-[1.12]" style={{ color: INK }}>
              التوظيف <span style={{ color: GREEN }}>بثقافة منطقتكم</span>، لا بقوالب عامة
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#183833]/70">
              النماذج العالمية تغفل ما يصنع بيئة الأعمال في الخليج والشرق الأوسط. نقرأ المفاهيم التي تُشكّل القرار
              والعلاقات والثقة فعليًا داخل فِرقكم.
            </p>
          </div>

          <div className="relative mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {CODES.map((c) => (
              <article
                key={c.ar}
                className="geo-tile group relative overflow-hidden rounded-[22px] border border-[#e8efe6] bg-white p-5 shadow-[0_14px_34px_rgba(24,56,51,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(24,56,51,0.12)]"
              >
                <div className="pointer-events-none absolute -top-12 h-32 w-32 rounded-full opacity-0 blur-[55px] transition-opacity duration-500 group-hover:opacity-30" style={{ background: c.color, insetInlineStart: "-2.5rem" }} />
                {/* арабский инициал-монограмма вместо иконки */}
                <span
                  className="relative grid h-12 w-12 place-items-center rounded-2xl pb-1 text-[1.7rem] font-black leading-none transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `${c.color}14`, color: c.color, boxShadow: `inset 0 0 0 1px ${c.color}33`, fontFamily: ARABIC_FONT }}
                >
                  {c.glyph}
                </span>
                <h3 className="relative mt-4 text-xl font-bold leading-tight" style={{ color: INK }}>{c.ar}</h3>
                <p className="relative mt-2 text-[14px] leading-relaxed text-[#183833]/65">{c.meaning}</p>
              </article>
            ))}
          </div>
        </div>

        {/* ====================== ٢) شريط الثقة + الدعوة ====================== */}
        <div className="geo-reveal relative mt-5 overflow-hidden rounded-[34px] border border-[#e8efe6] bg-white/95 p-7 text-center shadow-[0_24px_60px_rgba(24,56,51,0.07)] md:p-12">
          <span className="text-[12px] font-bold tracking-wide" style={{ color: GREEN }}>لماذا نحن</span>
          <h3 className="mx-auto mt-3 max-w-2xl text-[clamp(1.6rem,2.8vw,2.3rem)] font-bold leading-tight text-balance" style={{ color: INK }}>
            علمٌ موثوق، <span style={{ color: GREEN }}>تقييمٌ عادل</span>
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-pretty text-[#183833]/65">
            نُعايِر التقييم على أطر علمية عالمية ونكيّفها لمنطقتكم — بإنصاف، وبلا تحيّز على أساس الأصل.
          </p>

          <div className="mx-auto mt-9 grid max-w-3xl grid-cols-1 gap-3.5 sm:grid-cols-3">
            {TRUST.map((v) => (
              <div key={v.t} className="flex items-start gap-3 rounded-2xl border border-[#eef2ec] bg-[#f7faf3] p-4 text-start">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[1.2rem] font-black leading-none" style={{ background: `${v.color}14`, color: v.color, boxShadow: `inset 0 0 0 1px ${v.color}33`, fontFamily: ARABIC_FONT }}>{v.num}</span>
                <div>
                  <p className="text-[15px] font-bold" style={{ color: INK }}>{v.t}</p>
                  <p className="mt-0.5 text-[13px] leading-snug text-[#183833]/60">{v.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center gap-3">
            <a
              href="https://app.talentmind.app"
              className="ease-smooth group inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_40px_rgba(122,184,0,0.32)] transition-all duration-300 hover:-translate-y-1"
              style={{ background: GREEN }}
            >
              ابدأ الآن مجانًا
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            </a>
            <p className="text-[13px] text-[#183833]/50">أوّل ٥ تقارير مجانًا — دون بطاقة ائتمان</p>
          </div>
        </div>
      </div>
    </section>
  );
}
