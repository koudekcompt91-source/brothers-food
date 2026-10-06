"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { getProductsByCategory } from "@/data/products";
import type { Product } from "@/types";
import { CrustyVisual } from "@/components/food/food-visuals";
import ProductCard from "@/components/product-card/product-card";
import ProductModal from "@/components/product-modal/product-modal";
import { useCanParallax } from "@/lib/use-can-parallax";

export default function TastyCrustySection() {
  const items = getProductsByCategory("tasty-crusty");
  const [selected, setSelected] = useState<Product | null>(null);
  const reduce = useReducedMotion();
  const parallax = useCanParallax();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const foodY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const bgY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section id="tasty-crusty" ref={ref} className="relative overflow-hidden bg-navy py-20 md:py-28">
      <motion.div
        aria-hidden
        style={parallax ? { y: bgY } : undefined}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,106,0,0.18),transparent_42%)]"
      />
      <div className="relative mx-auto grid max-w-shell items-center gap-10 px-5 md:px-10 lg:grid-cols-2">
        <motion.div style={reduce ? undefined : { y: foodY }} className="relative">
          <CrustyVisual
            label="Tasty Crusty box with crispy chicken and rice"
            variant="brothers"
            className="mx-auto h-auto w-full max-w-[560px] drop-shadow-[0_40px_50px_rgba(0,0,0,0.45)]"
          />
        </motion.div>
        <div>
          <p className="font-display text-xs tracking-[0.32em] text-orange">THE SIGNATURE BOX</p>
          <h2 className="headline mt-3 text-[clamp(3rem,7vw,6.2rem)] leading-[0.86] text-white">
            TASTY
            <br />
            <span className="text-orange">CRUSTY</span>
          </h2>
          <p className="mt-5 max-w-md font-display text-xl leading-tight text-white md:text-2xl">
            CRISPY CHICKEN.
            <br />
            PERFECT RICE.
            <br />
            BROTHERS SAUCE.
          </p>
          <Link
            href="/menu#menu"
            className="mt-8 inline-flex bg-orange px-8 py-4 font-display tracking-wide text-black transition-colors duration-300 hover:bg-white"
          >
            TRY TASTY CRUSTY →
          </Link>
        </div>
      </div>
      <div className="relative mx-auto mt-12 grid max-w-shell grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4 md:px-10">
        {items.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} onSelect={setSelected} />
        ))}
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
