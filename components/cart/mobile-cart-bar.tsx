"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/config";

export default function MobileCartBar() {
  const { count, subtotal, openCart } = useCart();
  const pathname = usePathname();
  const show = count > 0 && pathname !== "/checkout";

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={openCart}
          className="md:hidden fixed bottom-4 left-4 right-4 z-[75] bg-orange text-black rounded-full px-5 py-4 flex items-center justify-between font-display shadow-xl shadow-black/40"
          aria-label="View cart"
        >
          <span className="text-sm tracking-wide">{count} ITEM{count > 1 ? "S" : ""}</span>
          <span className="text-base">{formatPrice(subtotal)}</span>
          <span className="text-sm tracking-wide">VIEW CART →</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
