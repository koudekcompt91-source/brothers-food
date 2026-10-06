"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import type { MenuFilterId } from "@/data/categories";
import type { Product } from "@/types";
import CategoryTabs from "@/components/category-tabs/category-tabs";
import ProductCard from "@/components/product-card/product-card";
import ProductModal from "@/components/product-modal/product-modal";
import Reveal from "@/components/animations/reveal";

export default function MenuSection({
  limit,
  cinematic = false,
}: {
  limit?: number;
  cinematic?: boolean;
}) {
  const [active, setActive] = useState<MenuFilterId>("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const reduce = useReducedMotion();

  const items = useMemo(() => {
    const filtered = getProductsByCategory(active);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [active, limit]);

  const editorial = items.length >= 3;

  return (
    <motion.section
      id="menu"
      className="relative bg-navy py-16 md:py-24"
      initial={
        cinematic && !reduce
          ? { opacity: 0.4, y: 72, scale: 0.97, clipPath: "inset(10% 0 0 0 round 28px)" }
          : false
      }
      whileInView={{ opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0 0 round 0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <Reveal variant="clip">
          <p className="mb-3 font-display text-xs tracking-[0.3em] text-orange">STRAIGHT FROM THE GRILL</p>
        </Reveal>
        <h2 className="headline text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] text-white">
          WHAT ARE YOU <span className="text-orange">HAVING?</span>
        </h2>

        <div className="mt-8 md:mt-10">
          <CategoryTabs active={active} onChange={(id) => setActive(id as MenuFilterId)} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          >
            {items.map((p, i) => {
              const featured = editorial && i === 0;
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={setSelected}
                  index={i}
                  featured={featured}
                  className={featured ? "sm:col-span-2 lg:row-span-2" : undefined}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>

        {limit && (
          <Reveal variant="up" className="mt-12 flex justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 border-2 border-orange px-8 py-4 font-display tracking-wide text-orange transition-colors hover:bg-orange hover:text-black"
            >
              FULL MENU <ArrowRight size={18} />
            </Link>
          </Reveal>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </motion.section>
  );
}
