"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Check, Plus } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/data/config";
import { useCart } from "@/lib/cart";
import ProductMedia from "@/components/food/product-media";
import { flyToCart } from "@/lib/fly-to-cart";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  index?: number;
  featured?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  onSelect,
  index = 0,
  featured = false,
  className = "",
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCart();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 260, damping: 24 });
  const sry = useSpring(ry, { stiffness: 260, damping: 24 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  const handleMove = (e: MouseEvent) => {
    if (reduce) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  };

  const quickAdd = (e: MouseEvent) => {
    e.stopPropagation();
    addItem({ product, qty: 1, size: "regular", extras: [] });
    flyToCart((e.currentTarget as HTMLElement).getBoundingClientRect());
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
    window.setTimeout(openCart, 350);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`h-full [perspective:1000px] ${className}`}
    >
      <motion.div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`View ${product.name}`}
        data-cursor="view"
        onClick={() => onSelect(product)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(product);
          }
        }}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={reduce ? undefined : { y: -10 }}
        className={
          "group relative flex h-full flex-col overflow-hidden border border-white/10 bg-navy transition-shadow duration-300 " +
          "hover:border-orange/40 hover:shadow-[0_28px_60px_-18px_rgba(255,106,0,0.45)] " +
          (featured ? "min-h-[460px] sm:min-h-[520px]" : "min-h-[420px]")
        }
      >
        {product.popular && (
          <span className="absolute left-3 top-3 z-10 bg-orange px-3 py-1 font-display text-[11px] tracking-widest text-black">
            POPULAR
          </span>
        )}
        <div
          className={
            "relative overflow-hidden bg-[radial-gradient(circle_at_50%_58%,rgba(255,106,0,0.2),transparent_58%),#0c1224] " +
            (featured ? "min-h-[300px] flex-1" : "aspect-[5/4]")
          }
        >
          <motion.div
            className="absolute inset-3 md:inset-4"
            animate={{ scale: hovered && !reduce ? 1.08 : 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductMedia
              id={product.id}
              image={product.image}
              alt={product.name}
              usePhoto={product.usePhoto}
              sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, 33vw"}
            />
          </motion.div>
        </div>

        <div className={featured ? "p-5 md:p-7" : "p-4 md:p-5"}>
          <div className="flex items-start justify-between gap-3">
            <h3 className={`font-display leading-tight text-white ${featured ? "text-2xl md:text-4xl" : "text-lg md:text-xl"}`}>
              {product.name.toUpperCase()}
            </h3>
            <span className="whitespace-nowrap font-display text-lg text-orange">{formatPrice(product.price)}</span>
          </div>
          <p className={`mt-2 text-white/55 ${featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}>
            {product.description}
          </p>
          <button
            type="button"
            onClick={quickAdd}
            className={
              "mt-4 inline-flex w-full items-center justify-center gap-2 py-3 font-display tracking-wide transition-all duration-300 " +
              "max-md:translate-y-0 max-md:opacity-100 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 " +
              (added
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-orange hover:text-black")
            }
            aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
          >
            {added ? (
              <>
                <Check size={16} /> ADDED
              </>
            ) : (
              <>
                <Plus size={16} /> ADD
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
