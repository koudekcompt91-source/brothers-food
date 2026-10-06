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
import Image from "next/image";
import MagneticButton from "@/components/ui/magnetic-button";
import { BurgerVisual, FriesVisual } from "@/components/food/food-visuals";
import { useCanParallax } from "@/lib/use-can-parallax";
import type { PublicImage } from "@/lib/public-asset";

const ease = [0.22, 1, 0.36, 1] as const;

const foodFrame =
  "relative z-10 mx-auto h-auto w-full max-w-[620px] bg-transparent object-contain drop-shadow-[0_35px_40px_rgba(17,26,53,0.35)]";

export default function Hero({ burgerImage = null }: { burgerImage?: PublicImage | null }) {
  const reduce = useReducedMotion();
  const parallax = useCanParallax();
  const ref = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 22 });
  const smy = useSpring(my, { stiffness: 50, damping: 22 });
  const foodX = useTransform(smx, [-0.5, 0.5], [-10, 10]);
  const foodYMouse = useTransform(smy, [-0.5, 0.5], [-6, 6]);
  const bitX = useTransform(smx, [-0.5, 0.5], [14, -14]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const foodScroll = useTransform(scrollYProgress, [0, 1], [0, 36]);

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
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_68%_46%,#ff8f33_0%,#ff6a00_42%,#e45700_100%)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-navy/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-shell items-center gap-10 px-5 pb-16 pt-28 md:min-h-[100svh] md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-6 md:px-10 md:py-24 lg:gap-10 lg:py-28">
        <div className="min-w-0 max-w-xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="font-display text-sm tracking-[0.28em] text-navy"
          >
            MORE THAN FOOD.
          </motion.p>

          <h1 className="headline mt-3 text-[clamp(2.75rem,5.4vw,5.25rem)] leading-[0.9] text-white">
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6, ease }}
            >
              BROTHERS
            </motion.span>
            <motion.span
              className="block text-navy"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6, ease }}
            >
              FOOD
            </motion.span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.5, ease }}
            className="mt-4 font-display text-[clamp(1.35rem,2.2vw,2rem)] leading-tight tracking-wide text-navy"
          >
            GOOD FOOD. GOOD MOOD.
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.5, ease }}
            className="mt-3 max-w-md text-base leading-relaxed text-navy/80 md:text-lg"
          >
            Burgers, sandwiches, and the signature Tasty Crusty box. Choose your favorite and order it the Brothers way.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="/menu"
              className="bg-navy px-7 py-4 text-base text-white transition-colors hover:bg-black focus-visible:outline-navy"
            >
              EXPLORE MENU →
            </MagneticButton>
            <MagneticButton
              href="/menu#menu"
              className="border-2 border-navy bg-white/90 px-7 py-4 text-base text-navy transition-colors hover:bg-white focus-visible:outline-navy"
            >
              ORDER NOW →
            </MagneticButton>
          </motion.div>
        </div>

        <div className="relative min-w-0">
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.85, duration: 0.55, ease }}
            style={parallax ? { x: bitX } : undefined}
            className="pointer-events-none absolute bottom-[14%] left-[24%] z-20 w-[18%] max-w-[108px]"
          >
            <FriesVisual className="h-auto w-full opacity-90 drop-shadow-lg" />
          </motion.div>

          <motion.div style={reduce ? undefined : { y: foodScroll }}>
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease }}
            >
              <motion.div style={parallax ? { x: foodX, y: foodYMouse } : undefined}>
                <motion.div
                  data-cursor="explore"
                  className="relative"
                  style={{ rotate: -4 }}
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={reduce ? undefined : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-[6%] left-1/2 z-0 h-8 w-[62%] -translate-x-1/2 rounded-full bg-navy/25 blur-xl"
                  />
                  {burgerImage ? (
                    <Image
                      src={burgerImage.src}
                      alt="Brothers signature burger"
                      width={burgerImage.width}
                      height={burgerImage.height}
                      priority
                      sizes="(max-width: 768px) 88vw, 620px"
                      className={foodFrame}
                    />
                  ) : (
                    <BurgerVisual label="Brothers signature burger" className={foodFrame} />
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
