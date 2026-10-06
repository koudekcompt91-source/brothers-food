"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] bg-orange origin-left z-[80]"
      style={{ scaleX }}
    />
  );
}
