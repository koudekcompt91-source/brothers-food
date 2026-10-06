"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/animations/reveal";
import { BRAND } from "@/data/config";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [120, -60]);
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative bg-orange overflow-hidden py-20 md:py-32">
      <motion.span
        style={reduce ? {} : { y: bgY }}
        aria-hidden
        className="absolute top-10 left-1/2 -translate-x-1/2 headline text-black/[0.06] text-[26vw] leading-none whitespace-nowrap select-none"
      >
        BROTHERS
      </motion.span>

      <div className="relative mx-auto max-w-shell px-5 md:px-10 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          style={reduce ? {} : { y: logoY }}
          className="relative z-10"
        >
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[420px] mx-auto"
          >
            <Image
              src={BRAND.logo}
              alt="Brothers Food logo with the two brothers"
              width={640}
              height={800}
              className="w-full h-auto drop-shadow-[0_40px_50px_rgba(0,0,0,0.25)]"
            />
          </motion.div>
        </motion.div>

        <div className="relative z-10">
          <Reveal variant="right">
            <h2 className="headline text-black text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.9]">
              MORE THAN FOOD.
              <br />
              <span className="text-white">WE'RE BROTHERS.</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.15}>
            <p className="mt-6 text-black/80 text-lg leading-relaxed max-w-lg">
              {/* Placeholder brand story — replace with the real one */}
              It started with two brothers, one grill, and a simple idea: make fast food
              the way it should be — bold, honest, and made with love. Every recipe is
              ours, every sauce is signature, every order is personal. This isn't just a
              restaurant. It's family.
            </p>
            <p className="mt-4 font-display text-black tracking-widest text-sm">
              [ PLACEHOLDER STORY — EDIT IN components/about/about-section.tsx ]
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
