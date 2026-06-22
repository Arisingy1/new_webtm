"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Arrow, GREEN, INK, TEAL, useReveals } from "@/components/tm/ui";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactsPage() {
  const root = useReveals();
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
        <h1 className="reveal mx-auto max-w-3xl text-[2.6rem] font-semibold leading-[1] tracking-tight sm:text-[4rem]">
          Let's talk about your <span style={{ color: GREEN }}>hiring</span>
        </h1>
        <p className="reveal mx-auto mt-6 max-w-xl text-lg text-[#183833]/70">
          Send us a request — we'll demo TalentMind on your interviews and help you get started
        </p>
      </section>

      <section className="mx-auto grid max-w-[1080px] grid-cols-1 gap-8 px-6 pb-24 lg:grid-cols-[1fr_1.1fr]">
        {/* contact info */}
        <div className="reveal space-y-4">
          {[
            { icon: <Mail className="h-5 w-5" />, t: "Email", v: "info@talentmind.ru", href: "mailto:info@talentmind.ru", a: GREEN },
            { icon: <Phone className="h-5 w-5" />, t: "Phone", v: "+7 (495) 540-51-79", href: "tel:+74955405179", a: TEAL },
            { icon: <Send className="h-5 w-5" />, t: "Telegram channel", v: "@talentmind", href: "https://t.me/talentmind", a: "#229ED9" },
            { icon: <MapPin className="h-5 w-5" />, t: "Office", v: "Moscow, 34 Shabolovka St., Bldg. 3", href: undefined, a: GREEN },
          ].map((c) => (
            <div key={c.t} className="flex items-center gap-4 rounded-2xl border border-[#ededed] bg-white p-5 shadow-[0_12px_30px_rgba(24,56,51,0.05)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: c.a }}>{c.icon}</span>
              <div>
                <p className="text-xs text-[#183833]/55">{c.t}</p>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-base font-medium transition-colors hover:text-[#7AB800]" style={{ color: INK }}>{c.v}</a>
                ) : (
                  <p className="text-base font-medium" style={{ color: INK }}>{c.v}</p>
                )}
              </div>
            </div>
          ))}
          <div className="rounded-3xl p-6 text-white" style={{ background: INK }}>
            <p className="text-lg font-semibold">5 interviews free</p>
            <p className="mt-1 text-sm text-white/70">Try it without a credit card — get a report on your first interview in a couple of minutes</p>
          </div>
        </div>

        {/* form */}
        <form
          className="reveal rounded-3xl border border-[#ededed] bg-white p-8 shadow-[0_24px_60px_rgba(24,56,51,0.08)]"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field name="name" label="Name" placeholder="Anna" required />
            <Field name="company" label="Company" placeholder="Acme Inc." />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field name="email" label="Email" placeholder="anna@company.ru" type="email" required />
            <Field name="phone" label="Phone" placeholder="+7 ..." type="tel" />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium" style={{ color: INK }}>Message</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your hiring process..."
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
              I consent to the processing of my personal data and accept the terms of the{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-[#7AB800]/40 underline-offset-2 transition-colors hover:text-[#7AB800]"
                style={{ color: INK }}
              >
                Personal Data Processing Policy
              </a>
              .
            </span>
          </label>
          <button
            type="submit"
            disabled={!agreed || status === "sending"}
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            style={{ background: GREEN }}
          >
            {status === "sending" ? (
              <>Sending…</>
            ) : (
              <><Send className="h-4 w-4" /> Send request <Arrow className="text-white" /></>
            )}
          </button>

          {status === "success" && (
            <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium" style={{ color: GREEN }}>
              <CheckCircle2 className="h-4 w-4" /> Your request has been sent
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-center text-sm font-medium text-[#FF5252]">
              Couldn't send your request. Please try again or email us at info@talentmind.ru
            </p>
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
              <p className="text-sm font-medium" style={{ color: INK }}>
                Your request has been sent
              </p>
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
