"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import Reveal from "@/components/animations/reveal";
import StaggerWords from "@/components/stagger-words";

export default function Testimonials() {
  return (
    <section className="bg-black py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <Reveal variant="clip">
          <p className="font-display text-orange tracking-[0.3em] text-xs mb-3">DEMO REVIEWS</p>
        </Reveal>
        <h2 className="headline text-white text-[clamp(2.6rem,7vw,6rem)] leading-[0.9]">
          <StaggerWords text="WHAT PEOPLE SAY" />
        </h2>
      </div>

      <div className="mt-10 md:mt-14 no-scrollbar flex gap-5 overflow-x-auto px-5 md:px-10 pb-4 snap-x">
        {TESTIMONIALS.map((t, i) => (
          <motion.article
            key={t.name}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="snap-start shrink-0 w-[85vw] sm:w-[380px] bg-navy border border-white/10 p-6 md:p-8 hover:border-orange/60 transition-colors"
          >
            <div className="flex gap-1 text-orange" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={16} fill={s < t.rating ? "currentColor" : "none"} aria-hidden />
              ))}
            </div>
            <p className="mt-4 text-white/80 text-lg leading-relaxed">"{t.text}"</p>
            <p className="mt-5 font-display text-white/40 text-xs tracking-[0.25em]">{t.name}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
