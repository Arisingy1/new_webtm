"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Arrow, GREEN, INK, TEAL, useReveals } from "@/components/tm/ui";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}
import { useLocale } from "@/components/tm/LocaleProvider";
import { localize } from "@/lib/i18n";
import { CONTACTS } from "@/lib/content/contacts";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactsPage() {
  const root = useReveals();
  const locale = useLocale();
  const c = CONTACTS[locale];
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed || status === "sending") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      source: "Contact form",
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setToast(true);
      form.reset();
      setAgreed(false);
      window.setTimeout(() => setToast(false), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div ref={root}>
      <section className="mx-auto max-w-[1100px] px-6 pt-40 pb-12 text-center">
        <h1 className="reveal mx-auto max-w-3xl text-[2.6rem] font-semibold leading-[1] tracking-tight text-balance sm:text-[4rem]">
          {c.pre}<span style={{ color: GREEN }}>{c.accent}</span>{c.post}
        </h1>
        <p className="reveal mx-auto mt-6 max-w-xl text-lg text-[#183833]/70">{c.sub}</p>
      </section>

      <section className="mx-auto grid max-w-[1080px] grid-cols-1 gap-8 px-6 pb-24 lg:grid-cols-[1fr_1.1fr]">
        {/* contact info */}
        <div className="reveal space-y-4">
          {[
            { icon: <Mail className="h-5 w-5" />, t: c.labels.email, v: "info@talentmind.app", href: "mailto:info@talentmind.app", a: GREEN },
            { icon: <LinkedInIcon className="h-5 w-5" />, t: c.labels.linkedin, v: "talentmindapp", href: "https://www.linkedin.com/company/talentmindapp", a: "#0A66C2" },
            { icon: <MapPin className="h-5 w-5" />, t: c.labels.office, v: "1850 S Ocean Dr, Unit 1203, Hallandale Beach, FL 33009, USA", href: undefined, a: TEAL },
          ].map((card) => (
            <div key={card.t} className="flex items-center gap-4 rounded-2xl border border-[#ededed] bg-white p-5 shadow-[0_12px_30px_rgba(24,56,51,0.05)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: card.a }}>{card.icon}</span>
              <div>
                <p className="text-xs text-[#183833]/55">{card.t}</p>
                {card.href ? (
                  <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-base font-medium transition-colors hover:text-[#7AB800]" style={{ color: INK }}>{card.v}</a>
                ) : (
                  <p className="text-base font-medium" style={{ color: INK }}>{card.v}</p>
                )}
              </div>
            </div>
          ))}
          <div className="rounded-3xl p-6 text-white" style={{ background: INK }}>
            <p className="text-lg font-semibold">{c.promoTitle}</p>
            <p className="mt-1 text-sm text-white/70">{c.promoSub}</p>
          </div>
        </div>

        {/* form */}
        <form
          className="reveal rounded-3xl border border-[#ededed] bg-white p-8 shadow-[0_24px_60px_rgba(24,56,51,0.08)]"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field name="name" label={c.form.name} placeholder={c.form.namePh} required />
            <Field name="company" label={c.form.company} placeholder={c.form.companyPh} />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field name="email" label={c.form.email} placeholder={c.form.emailPh} type="email" required />
            <Field name="phone" label={c.form.phone} placeholder={c.form.phonePh} type="tel" />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium" style={{ color: INK }}>{c.form.message}</label>
            <textarea
              name="message"
              rows={4}
              placeholder={c.form.messagePh}
              className="mt-1.5 w-full rounded-xl border border-[#ededed] bg-[#F4F7F6] px-4 py-3 text-sm outline-none focus:border-[#7AB800]"
            />
          </div>
          <label className="mt-6 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-[#cdd6cc] accent-[#7AB800]"
            />
            <span className="text-xs leading-relaxed text-[#183833]/60">
              {c.consentPre}
              <a
                href={localize("/privacy", locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-[#7AB800]/40 underline-offset-2 transition-colors hover:text-[#7AB800]"
                style={{ color: INK }}
              >
                {c.consentLink}
              </a>
              {c.consentPost}
            </span>
          </label>
          <button
            type="submit"
            disabled={!agreed || status === "sending"}
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            style={{ background: GREEN }}
          >
            {status === "sending" ? (
              <>{c.sending}</>
            ) : (
              <><Send className="h-4 w-4" /> {c.send} <Arrow className="text-white" /></>
            )}
          </button>

          {status === "success" && (
            <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium" style={{ color: GREEN }}>
              <CheckCircle2 className="h-4 w-4" /> {c.sent}
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-center text-sm font-medium text-[#FF5252]">{c.error}</p>
          )}
        </form>
      </section>

      {/* всплывающее уведомление об успешной отправке (success toast) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 px-4"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-5 py-3.5 shadow-[0_24px_60px_rgba(24,56,51,0.18)]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white" style={{ background: GREEN }}>
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <p className="text-sm font-medium" style={{ color: INK }}>{c.sent}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium" style={{ color: INK }}>{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-[#ededed] bg-[#F4F7F6] px-4 py-3 text-sm outline-none focus:border-[#7AB800]"
      />
    </div>
  );
}
