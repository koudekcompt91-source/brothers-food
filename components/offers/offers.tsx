"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { formatPrice } from "@/data/config";
import { PRODUCTS } from "@/data/products";
import Reveal from "@/components/animations/reveal";
import { CrustyVisual } from "@/components/food/food-visuals";

export default function Offers() {
  const combo = PRODUCTS.find((p) => p.id === "tasty-crusty-brothers");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  if (!combo) return null;

  return (
    <section ref={ref} className="relative bg-navy overflow-hidden py-20 md:py-32">
      <span
        aria-hidden
        className="absolute -top-8 left-0 headline text-white/[0.04] text-[24vw] leading-none whitespace-nowrap select-none"
      >
        SPECIAL DEAL
      </span>

      <div className="relative mx-auto max-w-shell px-5 md:px-10 grid md:grid-cols-2 gap-10 md:gap-6 items-center">
        <motion.div style={reduce ? {} : { y: imgY }} className="relative z-10 order-2 md:order-1">
          <Reveal variant="scale">
            <CrustyVisual
              label={combo.name}
              variant="brothers"
              className="mx-auto h-auto w-full max-w-[480px] drop-shadow-[0_50px_60px_rgba(0,0,0,0.5)]"
            />
          </Reveal>
        </motion.div>

        <motion.div style={reduce ? {} : { y: textY }} className="relative z-10 order-1 md:order-2">
          <Reveal variant="left">
            <p className="font-display text-orange tracking-[0.3em] text-xs mb-3">THE SIGNATURE BOX</p>
            <h2 className="headline text-white text-[clamp(3rem,8vw,7rem)] leading-[0.9]">
              {combo.name}
            </h2>
            <p className="mt-5 text-white/60 max-w-md">{combo.description}</p>
            <p className="mt-6 headline text-orange text-5xl md:text-6xl">{formatPrice(combo.price)}</p>
            <Link
              href="/menu#tasty-crusty"
              className="mt-8 inline-block bg-orange text-black font-display tracking-wide px-10 py-4 text-lg hover:bg-white transition-colors"
            >
              TRY TASTY CRUSTY
            </Link>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
