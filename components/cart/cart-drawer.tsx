"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart, itemKey } from "@/lib/cart";
import { formatPrice, RESTAURANT } from "@/data/config";
import ProductMedia from "@/components/food/product-media";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 z-[86] w-full sm:max-w-md bg-navy flex flex-col border-l border-white/10"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/10">
              <h2 className="headline text-white text-xl">YOUR CART</h2>
              <button onClick={closeCart} aria-label="Close cart" className="p-2 text-white/70 hover:text-orange">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <span className="headline text-white/20 text-4xl">YOUR CART IS EMPTY.</span>
                  <p className="text-white/50 text-sm">The brothers are waiting for you.</p>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="font-display bg-orange text-black px-6 py-3 text-sm tracking-wide hover:bg-white transition-colors"
                  >
                    EXPLORE MENU
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const key = itemKey(item);
                      return (
                        <motion.li
                          key={key}
                          layout
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40, height: 0, marginBottom: -16 }}
                          className="flex gap-4 bg-black/40 border border-white/10 p-3"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#0c1224]">
                            <ProductMedia
                              id={item.product.id}
                              image={item.product.image}
                              alt={item.product.name}
                              usePhoto={item.product.usePhoto}
                              sizes="80px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-display text-white text-sm leading-tight">
                                {item.product.name.toUpperCase()}
                              </h3>
                              <button
                                onClick={() => removeItem(key)}
                                aria-label={`Remove ${item.product.name}`}
                                className="text-white/40 hover:text-orange shrink-0"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <p className="text-white/40 text-xs mt-0.5">
                              {item.size === "large" ? "Large" : "Regular"}
                              {item.extras.length > 0 && ` · +${item.extras.length} extras`}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2 border border-white/15">
                                <button
                                  onClick={() => updateQty(key, item.qty - 1)}
                                  aria-label="Decrease quantity"
                                  className="p-1.5 text-white/70 hover:text-orange"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                                <button
                                  onClick={() => updateQty(key, item.qty + 1)}
                                  aria-label="Increase quantity"
                                  className="p-1.5 text-white/70 hover:text-orange"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <span className="text-orange font-display">
                                {formatPrice(item.product.price * item.qty)}
                              </span>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 flex flex-col gap-3">
                <div className="flex justify-between text-sm text-white/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-white/60">
                  <span>Delivery</span>
                  <span>{formatPrice(RESTAURANT.deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-display text-xl text-white">
                  <span>TOTAL</span>
                  <span className="text-orange">{formatPrice(subtotal + RESTAURANT.deliveryFee)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="mt-1 inline-flex items-center justify-center gap-2 bg-orange text-black font-display tracking-wide py-4 hover:bg-white transition-colors"
                >
                  CHECKOUT <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
