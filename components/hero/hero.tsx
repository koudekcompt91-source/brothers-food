"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticButton from "@/components/ui/magnetic-button";
import { BurgerVisual, CheeseBit, FriesVisual, OnionBit, SauceBit } from "@/components/food/food-visuals";
import { useCanParallax } from "@/lib/use-can-parallax";

export default function Hero() {
  const reduce = useReducedMotion();
  const parallax = useCanParallax();
  const ref = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const burgerX = useTransform(smx, [-0.5, 0.5], [-20, 20]);
  const burgerY = useTransform(smy, [-0.5, 0.5], [-12, 12]);
  const bitX = useTransform(smx, [-0.5, 0.5], [26, -26]);
  const typeX = useTransform(smx, [-0.5, 0.5], [-10, 10]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const foodY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bitY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const heroOpacity = useTransform(scrollYProgress, [0.4, 0.92], [1, 0]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!parallax) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-orange"
    >
      <motion.div
        aria-hidden
        style={parallax ? { x: typeX, y: typeY } : reduce ? undefined : { y: typeY }}
        className="pointer-events-none absolute inset-y-0 right-0 flex w-[70%] items-center justify-center overflow-hidden lg:w-[52%]"
      >
        <p className="headline select-none text-center text-[18vw] leading-none text-black/[0.08] lg:text-[11vw]">
          FOOD
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-shell flex-1 items-center gap-4 px-5 pb-20 pt-28 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:pt-24"
      >
        <div className="relative z-20">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-3 font-display text-xs tracking-[0.3em] text-black/70 md:text-sm"
          >
            BROTHERS FOOD
          </motion.p>
          <h1 className="headline text-[clamp(3.6rem,8vw,7.4rem)] leading-[0.84] text-white">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                BROTHERS
              </motion.span>
            </span>
            <span className="block overflow-hidden text-black">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                FOOD
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.45 }}
            className="mt-4 font-display text-lg tracking-wide text-black md:text-2xl"
          >
            GOOD FOOD.
            <br />
            GOOD MOOD.
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.45 }}
            className="mt-3 max-w-md text-base text-black/75 md:text-lg"
          >
            Choose your favorite. Build your order. Enjoy the Brothers experience.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.45 }}
            className="mt-8 hidden flex-wrap items-center gap-4 lg:flex"
          >
            <MagneticButton href="/menu" className="bg-black px-8 py-4 text-base text-white hover:bg-navy">
              ORDER NOW
            </MagneticButton>
            <MagneticButton
              href="/menu"
              className="border-2 border-black px-8 py-4 text-base text-black hover:bg-black hover:text-white"
            >
              VIEW MENU
            </MagneticButton>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.55 }}
            style={parallax ? { x: bitX, y: bitY } : undefined}
            className="absolute left-0 top-[6%] z-20 w-[28%] max-w-[150px]"
          >
            <motion.div animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-6, -2, -6] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}>
              <FriesVisual className="h-auto w-full drop-shadow-xl" />
            </motion.div>
          </motion.div>
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.82, duration: 0.5 }}
            style={parallax ? { y: bitY, x: bitX } : undefined}
            className="absolute right-[8%] top-[6%] z-20 w-14 md:w-16"
          >
            <motion.div animate={reduce ? undefined : { y: [0, -14, 0], rotate: [8, 14, 8] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}>
              <CheeseBit className="w-full" />
            </motion.div>
          </motion.div>
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            style={parallax ? { y: bitY } : undefined}
            className="absolute bottom-[8%] left-[8%] z-20 hidden w-12 sm:block"
          >
            <motion.div animate={reduce ? undefined : { y: [0, 8, 0], rotate: [0, -8, 0] }} transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}>
              <OnionBit className="w-full" />
            </motion.div>
          </motion.div>
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.98, duration: 0.5 }}
            style={parallax ? { x: bitX, y: bitY } : undefined}
            className="absolute bottom-[16%] right-[6%] z-20 w-10"
          >
            <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}>
              <SauceBit className="w-full" />
            </motion.div>
          </motion.div>

          <motion.div style={reduce ? undefined : { y: foodY }} data-cursor="explore">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.84, rotate: -16, y: 30 }}
              animate={{ opacity: 1, scale: 1, rotate: -7, y: 0 }}
              transition={{ delay: 0.42, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                style={parallax ? { x: burgerX, y: burgerY } : undefined}
                animate={reduce ? undefined : { y: [0, -12, 0] }}
                transition={reduce ? undefined : { duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <BurgerVisual
                  label="Brothers Burger — signature double beef burger"
                  className="relative z-10 mx-auto h-auto w-[92%] max-w-[640px] drop-shadow-[0_45px_40px_rgba(0,0,0,0.35)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.45 }}
          className="flex flex-wrap items-center gap-3 lg:hidden"
        >
          <MagneticButton href="/menu" className="bg-black px-7 py-4 text-base text-white hover:bg-navy">
            ORDER NOW
          </MagneticButton>
          <MagneticButton
            href="/menu"
            className="border-2 border-black px-7 py-4 text-base text-black hover:bg-black hover:text-white"
          >
            VIEW MENU
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-black/70"
      >
        <span className="font-display text-xs tracking-[0.3em]">SCROLL</span>
        <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
