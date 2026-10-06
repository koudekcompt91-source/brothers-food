"use client";

import {
  createContext, useCallback, useContext, useMemo, useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/types";

export interface AddToCartInput {
  product: Product;
  qty: number;
  size: "regular" | "large";
  extras: string[];
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddToCartInput) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  lastAddedAt: number | null;
}

const CartContext = createContext<CartContextValue | null>(null);

export function itemKey(item: Pick<CartItem, "product" | "size" | "extras">): string {
  return `${item.product.id}__${item.size}__${[...item.extras].sort().join("_")}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedAt, setLastAddedAt] = useState<number | null>(null);

  const addItem = useCallback((input: AddToCartInput) => {
    const incoming: CartItem = {
      product: input.product,
      qty: input.qty,
      size: input.size,
      extras: input.extras,
    };
    const key = itemKey(incoming);
    setItems((prev) => {
      const idx = prev.findIndex((i) => itemKey(i) === key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + input.qty };
        return next;
      }
      return [...prev, incoming];
    });
    setLastAddedAt(Date.now());
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => itemKey(i) !== key));
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => itemKey(i) !== key)
        : prev.map((i) => (itemKey(i) === key ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.qty * i.product.price, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items, isOpen, openCart, closeCart, addItem, removeItem, updateQty, clear,
      count, subtotal, lastAddedAt,
    }),
    [items, isOpen, openCart, closeCart, addItem, removeItem, updateQty, clear, count, subtotal, lastAddedAt],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
