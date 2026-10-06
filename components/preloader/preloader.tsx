"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BRAND } from "@/data/config";

const DURATION = 1.4; // seconds

export default function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Lighter preloader if the site was already visited this session
    const seen = sessionStorage.getItem("bf_seen");
    if (!seen) {
      setShow(true);
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => {
        setShow(false);
        document.body.style.overflow = "";
        sessionStorage.setItem("bf_seen", "1");
      }, DURATION * 1000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-orange flex flex-col items-center justify-center overflow-hidden"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0, filter: "blur(12px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(60vw,320px)]"
          >
            <Image
              src={BRAND.logo}
              alt=""
              width={640}
              height={800}
              priority
              className="w-full h-auto"
            />
          </motion.div>
          <div className="mt-6 flex overflow-hidden" aria-hidden>
            {"BROTHERS FOOD".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="headline text-black text-[clamp(1.5rem,5vw,3rem)]"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
