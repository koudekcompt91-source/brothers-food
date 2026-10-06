"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  ariaLabel?: string;
}

export default function MagneticButton({
  children, className = "", onClick, href, strength = 0.35, ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => { x.set(0); y.set(0); };

  const Tag = (href ? motion.a : motion.button) as typeof motion.button;
  return (
    <Tag
      // @ts-expect-error — dynamic tag union
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onMouseDown={() => { if (ref.current) ref.current.style.scale = "0.97"; }}
      onMouseUp={() => { if (ref.current) ref.current.style.scale = "1"; }}
      onMouseOver={() => { if (ref.current) ref.current.style.scale = "1.03"; }}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      aria-label={ariaLabel}
      className={
        "inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide " +
        "transition-transform duration-200 select-none " + className
      }
    >
      {children}
    </Tag>
  );
}
