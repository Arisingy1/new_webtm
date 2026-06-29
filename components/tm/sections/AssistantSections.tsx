"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessagesSquare, Brain, Zap, Users, Sparkles } from "lucide-react";
import { GREEN, INK, TEAL } from "@/components/tm/ui";

const AMBER = "#E8A317";

/* ============================================================
   AssistantSections — bento возможностей ИИ-ассистента без hero
   и CTA. Переиспользуется на /ai-assistant и /platform.
   ============================================================ */

const FEATURES: { n: string; title: string; text: string; color: string; icon: React.ReactNode; span: string }[] = [
  { n: "01", title: "Chat with your pipeline", text: "“Talk” to your entire candidate pipeline in natural language — no filters or spreadsheets", color: GREEN, icon: <MessagesSquare className="h-6 w-6" />, span: "lg:col-span-2" },
  { n: "02", title: "Context is never lost", text: "The assistant remembers the whole conversation and every interview — ask without repeating yourself", color: TEAL, icon: <Brain className="h-6 w-6" />, span: "" },
  { n: "03", title: "Answers in seconds", text: "Instant responses based on analysis of real interviews, not generic phrases", color: AMBER, icon: <Zap className="h-6 w-6" />, span: "" },
  { n: "04", title: "Compare candidates", text: "Quick profile comparison — ask the assistant to match candidates against your criteria", color: TEAL, icon: <Users className="h-6 w-6" />, span: "" },
  { n: "05", title: "Hiring recommendations", text: "Decision support — get structured interview summaries so you can confidently recommend candidates to hiring managers", color: GREEN, icon: <Sparkles className="h-6 w-6" />, span: "sm:col-span-2 lg:col-span-1" },
];

export default function AssistantSections() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".as-reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 60, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full" style={{ color: INK }}>
      {/* ============================== BENTO ВОЗМОЖНОСТЕЙ ============================== */}
      <section id="caps" className="relative mx-auto max-w-[1340px] px-6 py-16 md:px-10">
        <div className="as-reveal mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[16ch] text-[clamp(2rem,3.6vw,3.6rem)] font-bold leading-[1.05] tracking-tight" style={{ color: INK }}>
            What the <span style={{ color: GREEN }}>assistant</span> can do
          </h2>
          <p className="max-w-sm text-[#183833]/55">Five capabilities that turn your pipeline into a conversation partner</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.n}
              className={`as-reveal group relative overflow-hidden rounded-[28px] border border-[#e8efe6] bg-white p-7 shadow-[0_22px_55px_rgba(24,56,51,0.07)] transition-all duration-500 hover:-translate-y-1.5 ${f.span}`}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-30" style={{ background: f.color }} />
              <div className="relative flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `${f.color}1a`, color: f.color }}>{f.icon}</span>
                <span className="font-mono text-5xl font-black leading-none" style={{ color: `${f.color}26` }}>{f.n}</span>
              </div>
              <h3 className="relative mt-6 text-2xl font-bold tracking-tight" style={{ color: INK }}>{f.title}</h3>
              <p className="relative mt-2.5 max-w-md leading-relaxed text-[#183833]/60">{f.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
