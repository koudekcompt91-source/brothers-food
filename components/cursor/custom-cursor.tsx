"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "button" | "view" | "explore";

export default function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      if (!t || typeof t.closest !== "function") return;
      if (t.closest("[data-cursor='explore']")) setMode("explore");
      else if (t.closest("[data-cursor='view']")) setMode("view");
      else if (t.closest("a, button, [role='button'], input, select, textarea, [data-cursor='button']")) setMode("button");
      else setMode("default");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[95] pointer-events-none"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-orange"
        animate={{
          width: mode === "default" ? 12 : mode === "button" ? 52 : 84,
          height: mode === "default" ? 12 : mode === "button" ? 52 : 84,
          x: mode === "default" ? -6 : mode === "button" ? -26 : -42,
          y: mode === "default" ? -6 : mode === "button" ? -26 : -42,
          backgroundColor: mode === "default" ? "#ff6a00" : "rgba(255,106,0,0.9)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{ position: "absolute" }}
      >
        {(mode === "view" || mode === "explore") && (
          <span className="font-display text-[11px] tracking-widest text-black">
            {mode === "explore" ? "EXPLORE" : "VIEW"}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
