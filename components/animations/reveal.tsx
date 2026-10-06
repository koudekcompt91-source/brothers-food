"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "up" | "slide" | "scale" | "clip" | "left" | "right";

const variants = {
  up: { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0 } },
  slide: { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } },
  clip: { hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.4 }, show: { clipPath: "inset(0 0 0% 0)", opacity: 1 } },
  left: { hidden: { opacity: 0, x: -80 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 80 }, show: { opacity: 1, x: 0 } },
} satisfies Record<Variant, { hidden: object; show: object }>;

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function Reveal({
  children, variant = "up", delay = 0, className = "", once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const v = variants[variant];
  return (
    <motion.div
      className={className}
      initial={reduce ? false : v.hidden}
      whileInView={v.show}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
