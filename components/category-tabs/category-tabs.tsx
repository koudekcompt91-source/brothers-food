"use client";

import { LayoutGroup, motion } from "framer-motion";
import { CATEGORIES } from "@/data/categories";

interface CategoryTabsProps {
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <LayoutGroup>
      <div
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
        role="tablist"
        aria-label="Menu categories"
      >
        {CATEGORIES.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(c.id)}
              className={
                "relative shrink-0 overflow-hidden border px-5 py-2.5 font-display text-sm tracking-wide transition-colors duration-200 " +
                (isActive ? "border-orange text-black" : "border-white/15 text-white/70 hover:border-orange hover:text-white")
              }
            >
              {isActive && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 bg-orange"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{c.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
