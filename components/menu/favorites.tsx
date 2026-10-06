"use client";

import { useState } from "react";
import { getFavoriteProducts } from "@/data/products";
import type { Product } from "@/types";
import ProductCard from "@/components/product-card/product-card";
import ProductModal from "@/components/product-modal/product-modal";
import Reveal from "@/components/animations/reveal";

export default function Favorites() {
  const items = getFavoriteProducts();
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section className="bg-white py-16 text-navy md:py-24">
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <Reveal variant="clip">
          <p className="mb-3 font-display text-xs tracking-[0.3em] text-orange">FROM THE MENU</p>
        </Reveal>
        <h2 className="headline text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.9] text-navy">
          BROTHERS <span className="text-orange">FAVORITES</span>
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              featured={product.id === "tasty-crusty-brothers"}
              onSelect={setSelected}
              className={product.id === "tasty-crusty-brothers" ? "sm:col-span-2 lg:col-span-1" : undefined}
            />
          ))}
        </div>
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
