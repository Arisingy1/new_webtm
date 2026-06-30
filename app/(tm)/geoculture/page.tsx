import GeoCulture from "@/components/tm/GeoCulture";

/* /geoculture — «الجيوثقافة»: страница геокультуры (в хедере только на /ar).
   Hero-заголовок + две смысловые кантли (компонент GeoCulture). */
export default function GeoCulturePage() {
  return (
    <div dir="rtl" className="relative w-full" style={{ color: "#183833" }}>
      {/* ── hero ── */}
      <section className="relative mx-auto max-w-[1100px] px-6 pt-32 pb-2 text-center md:px-10 lg:pt-40">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d8ecc4] bg-white/70 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] backdrop-blur">
          TalentMind · الشرق الأوسط
        </span>
        <h1 className="mx-auto mt-6 max-w-[20ch] text-[clamp(2.2rem,4.8vw,4.1rem)] font-bold leading-[1.08] text-balance">
          الجيو<span style={{ color: "#7AB800" }}>ثقافة</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-[#183833]/70">
          تقييم التوافق الثقافي مُعايَر لمنطقة الخليج والشرق الأوسط — مبنيّ على أطر علمية معترَف بها، وبإنصاف.
        </p>
      </section>

      <GeoCulture />
    </div>
  );
}
