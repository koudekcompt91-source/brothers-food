"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 1]);

  return (
    <section ref={ref} className="relative bg-black py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-shell px-5 md:px-10 text-center">
        <motion.p
          style={reduce ? {} : { x: x1 }}
          className="headline text-white/90 text-[clamp(2.5rem,9vw,8rem)] leading-[0.9] whitespace-nowrap"
        >
          NOT JUST
        </motion.p>
        <motion.p
          style={reduce ? {} : { x: x2 }}
          className="headline text-orange text-[clamp(2.5rem,9vw,8rem)] leading-[0.9] whitespace-nowrap"
        >
          FAST FOOD.
        </motion.p>
        <motion.p
          style={reduce ? {} : { scale }}
          className="headline text-white text-[clamp(3rem,12vw,11rem)] leading-[0.9] mt-4"
        >
          BROTHERS
          <br />
          <span className="text-stroke">FOOD.</span>
        </motion.p>
      </div>
      <style jsx>{`
        .text-stroke {
          -webkit-text-stroke: 2px var(--color-orange);
          color: transparent;
        }
      `}</style>
    </section>
  );
}
