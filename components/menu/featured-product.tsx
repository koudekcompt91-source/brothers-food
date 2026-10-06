"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/data/config";
import { useCart } from "@/lib/cart";
import { BurgerVisual, CheeseBit, FriesVisual, OnionBit, SauceBit } from "@/components/food/food-visuals";
import { useCanParallax } from "@/lib/use-can-parallax";
import MagneticButton from "@/components/ui/magnetic-button";

const NOTES = ["Double Beef", "Special Sauce", "Cheese"];

export default function FeaturedProduct() {
  const product = getProductById("burger-01");
  const { addItem, openCart } = useCart();
  const reduce = useReducedMotion();
  const parallax = useCanParallax();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const foodY = useTransform(scrollYProgress, [0, 1], [40, -50]);
  const bitY = useTransform(scrollYProgress, [0, 1], [70, -90]);
  const textY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  if (!product) return null;

  const order = () => {
    addItem({ product, qty: 1, size: "regular", extras: [] });
    setTimeout(openCart, 280);
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <span className="headline absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[16vw] leading-none text-white/[0.04]">
          BROTHERS
        </span>
      </div>

      <div className="relative mx-auto grid max-w-shell items-center gap-8 px-5 md:px-10 lg:grid-cols-2 lg:gap-6">
        <div className="relative order-1 mx-auto w-full max-w-[560px] lg:order-none lg:max-w-none">
          <motion.div style={parallax ? { y: bitY } : undefined} className="absolute left-0 top-6 z-20 w-20 md:w-28" aria-hidden>
            <FriesVisual className="h-auto w-full" />
          </motion.div>
          <motion.div style={parallax ? { y: bitY } : undefined} className="absolute right-2 top-2 z-20 w-14" aria-hidden>
            <CheeseBit className="h-auto w-full" />
          </motion.div>
          <motion.div style={parallax ? { y: bitY } : undefined} className="absolute bottom-10 left-6 z-20 hidden w-12 sm:block" aria-hidden>
            <OnionBit className="h-auto w-full" />
          </motion.div>
          <motion.div style={parallax ? { y: bitY } : undefined} className="absolute bottom-16 right-0 z-20 w-10" aria-hidden>
            <SauceBit className="h-auto w-full" />
          </motion.div>

          <motion.div
            style={reduce ? undefined : { y: foodY }}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-6, -3, -6] }}
              transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <BurgerVisual
                label="Brothers Burger"
                className="relative z-10 mx-auto h-auto w-[88%] drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div style={reduce ? undefined : { y: textY }} className="relative z-10">
          <p className="font-display text-xs tracking-[0.32em] text-orange">THE ONE</p>
          <h2 className="headline mt-3 text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.86] text-white">
            BROTHERS
            <br />
            <span className="text-orange">BURGER</span>
          </h2>
          <ul className="mt-6 flex flex-col gap-2">
            {NOTES.map((note) => (
              <li key={note} className="font-display text-lg tracking-wide text-white/80 md:text-2xl">
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-display text-4xl text-orange md:text-5xl">{formatPrice(product.price)}</p>
          <MagneticButton onClick={order} className="mt-8 bg-orange px-8 py-4 text-base text-black hover:bg-white">
            ORDER NOW
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
