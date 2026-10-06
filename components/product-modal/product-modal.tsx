"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { EXTRAS, SIZES } from "@/types";
import { formatPrice } from "@/data/config";
import { useCart } from "@/lib/cart";
import ProductMedia from "@/components/food/product-media";

const infoStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};
const infoItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<"regular" | "large">("regular");
  const [extras, setExtras] = useState<string[]>([]);
  const { addItem, openCart } = useCart();

  const resetAndClose = () => {
    onClose();
    setTimeout(() => { setQty(1); setSize("regular"); setExtras([]); }, 350);
  };

  const toggleExtra = (id: string) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));

  const extrasTotal = EXTRAS.filter((e) => extras.includes(e.id)).reduce((s, e) => s + e.price, 0);
  const sizeDelta = size === "large" ? 200 : 0;
  const unitPrice = (product?.price ?? 0) + sizeDelta + extrasTotal;
  const total = unitPrice * qty;

  const handleAdd = () => {
    if (!product) return;
    addItem({ product, qty, size, extras });
    resetAndClose();
    setTimeout(openCart, 400);
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[87] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={resetAndClose}
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 60, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, y: 40, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-3xl bg-navy border border-white/10 max-h-[92svh] overflow-y-auto grid sm:grid-cols-2"
          >
            <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_55%,rgba(255,106,0,0.22),transparent_60%),#0c1224] sm:aspect-auto sm:min-h-[420px]">
              <motion.div
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-6"
              >
                <ProductMedia
                  id={product.id}
                  image={product.image}
                  alt={product.name}
                  usePhoto={product.usePhoto}
                  priority
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
              </motion.div>
              {product.popular && (
                <span className="absolute top-4 left-4 bg-orange text-black font-display text-xs tracking-widest px-3 py-1">
                  POPULAR
                </span>
              )}
            </div>

            <motion.div
              className="flex flex-col p-6 md:p-8"
              variants={infoStagger}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={infoItem} className="flex items-start justify-between gap-4">
                <h3 className="headline text-white text-2xl md:text-3xl leading-none">
                  {product.name.toUpperCase()}
                </h3>
                <button onClick={resetAndClose} aria-label="Close" className="shrink-0 p-1 text-white/60 hover:text-orange">
                  <X size={24} />
                </button>
              </motion.div>
              <motion.p variants={infoItem} className="mt-2 text-sm text-white/60">{product.description}</motion.p>

              {product.ingredients && (
                <motion.div variants={infoItem} className="mt-4">
                  <p className="font-display text-white/40 text-xs tracking-[0.25em] mb-2">INGREDIENTS</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ingredients.map((ing) => (
                      <span key={ing} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 text-white/70">
                        {ing}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div variants={infoItem} className="mt-5">
                <p className="font-display text-white/40 text-xs tracking-[0.25em] mb-2">SIZE</p>
                <div className="flex gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.id as "regular" | "large")}
                      className={
                        "flex-1 py-2.5 font-display text-sm tracking-wide border transition-colors " +
                        (size === s.id
                          ? "bg-orange text-black border-orange"
                          : "border-white/15 text-white/70 hover:border-orange")
                      }
                    >
                      {s.label.toUpperCase()}
                      {s.priceDelta > 0 && <span className="block text-[10px] font-body">+{s.priceDelta} DA</span>}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={infoItem} className="mt-5">
                <p className="font-display text-white/40 text-xs tracking-[0.25em] mb-2">EXTRAS</p>
                <div className="grid grid-cols-2 gap-2">
                  {EXTRAS.map((e) => {
                    const active = extras.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        onClick={() => toggleExtra(e.id)}
                        aria-pressed={active}
                        className={
                          "text-left px-3 py-2 border text-xs transition-colors " +
                          (active
                            ? "bg-orange/15 border-orange text-white"
                            : "border-white/10 text-white/60 hover:border-white/30")
                        }
                      >
                        <span className="block font-bold">{e.label}</span>
                        <span className="text-white/40">+{e.price} DA</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div variants={infoItem} className="mt-6 flex items-center gap-4">
                <div className="flex items-center border border-white/15">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="p-2.5 text-white/70 hover:text-orange">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="p-2.5 text-white/70 hover:text-orange">
                    <Plus size={16} />
                  </button>
                </div>
                <span className="font-display text-2xl text-orange">{formatPrice(total)}</span>
              </motion.div>

              <motion.button
                variants={infoItem}
                onClick={handleAdd}
                className="mt-5 inline-flex items-center justify-center gap-2 bg-orange py-4 font-display tracking-wide text-black transition-colors hover:bg-white"
              >
                <ShoppingBag size={18} /> ADD TO CART
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
