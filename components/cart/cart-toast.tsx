"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";

export default function CartToast() {
  const { lastAddedAt } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastAddedAt) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, [lastAddedAt]);

  return (
    <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[88] pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-white text-black font-display tracking-wide text-sm px-6 py-3 shadow-2xl"
          >
            ADDED TO CART <span className="text-orange">+1</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
