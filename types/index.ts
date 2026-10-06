import type { CategoryId } from "@/data/categories";

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  price: number; // in DA
  image: string;
  /** Set true after replacing the placeholder with a real photo at `image`. */
  usePhoto?: boolean;
  featured?: boolean;
  badge?: string;
  available?: boolean;
  popular?: boolean;
  ingredients?: string[];
}

export interface CartItem {
  product: Product;
  qty: number;
  size: "regular" | "large";
  extras: string[];
}

export type OrderType = "delivery" | "pickup";

export type OrderStatus =
  | "pending" | "confirmed" | "preparing" | "ready"
  | "out_for_delivery" | "completed" | "cancelled";

export interface Order {
  id: string;
  customer: string;
  phone: string;
  address?: string;
  city?: string;
  type: OrderType;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
  status: OrderStatus;
  createdAt: string; // ISO
}

export const EXTRAS = [
  { id: "extra-cheese", label: "Extra Cheese", price: 100 },
  { id: "extra-meat", label: "Extra Meat", price: 250 },
  { id: "extra-sauce", label: "Extra Sauce", price: 50 },
  { id: "fries", label: "Fries", price: 200 },
  { id: "drink", label: "Drink", price: 150 },
] as const;

export const SIZES = [
  { id: "regular", label: "Regular", priceDelta: 0 },
  { id: "large", label: "Large", priceDelta: 200 },
] as const;
