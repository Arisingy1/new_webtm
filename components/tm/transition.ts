/* ============================================================
   Плавный переход к блоку: вместо резкого прыжка или долгой
   прокрутки всей страницы — мягкий кроссфейд. Завеса (#tm-veil,
   в цвет фона страницы) проявляется → мгновенный переход под ней
   → завеса растворяется. Контент «перетекает», а не дёргается.
   ============================================================ */
export function smoothJumpTo(target: string | number, offset = -88) {
  if (typeof window === "undefined") return;

  const win = window as unknown as {
    __lenis?: { scrollTo: (t: string | number, o?: object) => void };
  };

  const jump = () => {
    if (win.__lenis) win.__lenis.scrollTo(target, { offset, immediate: true });
    else if (typeof target === "string") document.querySelector(target)?.scrollIntoView({ block: "start" });
    else window.scrollTo(0, target);
  };

  const veil = document.getElementById("tm-veil");
  if (!veil) { jump(); return; }

  veil.style.opacity = "1";
  veil.style.pointerEvents = "auto";
  window.setTimeout(() => {
    jump();
    requestAnimationFrame(() => {
      veil.style.opacity = "0";
      window.setTimeout(() => { veil.style.pointerEvents = "none"; }, 360);
    });
  }, 320);
}
