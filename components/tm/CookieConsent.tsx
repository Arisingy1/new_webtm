"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { GREEN, INK } from "./ui";

/* ============================================================
   CookieConsent — уведомление об использовании cookie.
   Соответствие требованиям РФ: ст. 9 152-ФЗ «О персональных
   данных», ст. 10.1 149-ФЗ и рекомендациям Роскомнадзора —
   информируем пользователя, даём ссылку на Политику и
   фиксируем явное согласие (а не «по умолчанию»).
   Выбор сохраняется в localStorage и не показывается повторно.
   ============================================================ */

const STORAGE_KEY = "tm-cookie-consent"; // "accepted" | "necessary"

export default function CookieConsent() {
  // visible начинается с false, чтобы не было мигания при SSR/гидрации
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage недоступен (приватный режим и т.п.) — показываем плашку
    }
    if (!saved) {
      // лёгкая задержка, чтобы плашка плавно «приехала» после загрузки
      const t = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (value: "accepted" | "necessary") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      // дублируем в cookie на год — пригодится для серверной логики/аналитики
      document.cookie = `${STORAGE_KEY}=${value}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          role="dialog"
          aria-live="polite"
          aria-label="Cookie usage notice"
          className="fixed bottom-4 left-4 right-4 z-[100] sm:left-6 sm:right-auto sm:max-w-[440px]"
        >
          <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/95 p-6 shadow-[0_30px_70px_rgba(24,56,51,0.18)] backdrop-blur-md sm:p-7">
            {/* мягкое зелёное свечение в углу */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-[70px]"
              style={{ background: `${GREEN}22` }}
            />

            <button
              type="button"
              onClick={() => decide("necessary")}
              aria-label="Close and accept only necessary cookies"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-[#183833]/40 transition-colors hover:bg-[#F4F7F6] hover:text-[#183833]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative flex items-start gap-4">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-[0_10px_24px_rgba(122,184,0,0.3)]"
                style={{ background: GREEN }}
              >
                <Cookie className="h-6 w-6" />
              </span>
              <div className="pr-6">
                <p className="text-[13.5px] leading-relaxed text-[#183833]/65">
                  We use cookies to improve how the site works. By continuing to use
                  the site, you agree to our{" "}
                  <a
                    href="/privacy"
                    className="font-medium underline decoration-[#7AB800]/40 underline-offset-2 transition-colors hover:text-[#7AB800]"
                    style={{ color: INK }}
                  >
                    Privacy Policy
                  </a>{" "}
                  and to the use of cookies.
                </p>
              </div>
            </div>

            <div className="relative mt-5 flex gap-2.5">
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="ease-smooth rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(122,184,0,0.32)] transition-transform duration-300 hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => decide("necessary")}
                className="ease-smooth rounded-full border border-[#183833]/15 bg-white px-6 py-2.5 text-sm font-medium text-[#183833] transition-colors duration-300 hover:bg-[#F4F7F6]"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
