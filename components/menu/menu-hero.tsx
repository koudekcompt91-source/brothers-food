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
import { BurgerVisual, CheeseBit, FriesVisual, OnionBit, SauceBit } from "@/components/food/food-visuals";
import MagneticButton from "@/components/ui/magnetic-button";
import { useCanParallax } from "@/lib/use-can-parallax";

export default function MenuHero() {
  const reduce = useReducedMotion();
  const parallax = useCanParallax();
  const ref = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 70, damping: 18 });
  const smy = useSpring(my, { stiffness: 70, damping: 18 });
  const foodX = useTransform(smx, [-0.5, 0.5], [-18, 18]);
  const foodYMouse = useTransform(smy, [-0.5, 0.5], [-12, 12]);
  const bitX = useTransform(smx, [-0.5, 0.5], [22, -22]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const foodScroll = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bitScroll = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0.45, 0.92], [1, 0]);

  const onMove = (e: React.MouseEvent) => {
    if (!parallax) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate min-h-[100svh] overflow-hidden bg-orange"
    >
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-shell items-center gap-6 px-5 pb-16 pt-28 md:px-10 lg:grid-cols-2 lg:gap-8 lg:pt-24"
      >
        <div className="relative z-20 max-w-xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="font-display text-xs tracking-[0.32em] text-black/70 md:text-sm"
          >
            BROTHERS FOOD / MENU
          </motion.p>
          <h1 className="headline mt-3 text-[clamp(4.2rem,9vw,8.5rem)] leading-[0.84] text-black">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                THE MENU
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-5 max-w-md text-lg text-black/80 md:text-xl"
          >
            BOLD FLAVORS.
            <br />
            BROTHERS STYLE.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className="mt-8 hidden lg:block"
          >
            <MagneticButton href="#menu" className="bg-black px-8 py-4 text-base text-white hover:bg-navy">
              ORDER NOW
            </MagneticButton>
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[640px] lg:max-w-none">
          <motion.div
            aria-hidden
            style={parallax ? { y: bitScroll, x: bitX } : undefined}
            className="pointer-events-none absolute -left-2 top-[8%] z-20 hidden w-24 sm:block md:w-28"
          >
            <FriesVisual className="h-auto w-full drop-shadow-xl" />
          </motion.div>
          <motion.div
            aria-hidden
            style={parallax ? { y: bitScroll } : undefined}
            className="pointer-events-none absolute right-[14%] top-[10%] z-20 w-14 md:w-16"
          >
            <CheeseBit className="h-auto w-full" />
          </motion.div>
          <motion.div
            aria-hidden
            style={parallax ? { y: bitScroll, x: bitX } : undefined}
            className="pointer-events-none absolute bottom-[12%] left-[6%] z-20 hidden w-12 sm:block"
          >
            <OnionBit className="h-auto w-full" />
          </motion.div>
          <motion.div
            aria-hidden
            style={parallax ? { y: bitScroll } : undefined}
            className="pointer-events-none absolute bottom-[18%] right-[2%] z-20 w-10"
          >
            <SauceBit className="h-auto w-full" />
          </motion.div>

          <motion.div style={reduce ? undefined : { y: foodScroll }} className="relative">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.86, y: 36, rotate: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: -8 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div style={parallax ? { x: foodX, y: foodYMouse } : undefined}>
              <motion.div
                animate={reduce ? undefined : { y: [0, -14, 0] }}
                transition={reduce ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <BurgerVisual
                  label="Brothers Burger, double beef with cheese and sauce"
                  className="mx-auto h-auto w-[86%] max-w-[560px] drop-shadow-[0_40px_40px_rgba(0,0,0,0.35)] sm:w-full"
                />
              </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5 }}
          className="lg:hidden"
        >
          <MagneticButton href="#menu" className="bg-black px-8 py-4 text-base text-white hover:bg-navy">
            ORDER NOW
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
