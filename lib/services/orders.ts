// Backend-ready abstraction for orders.
// Today: simulates persistence locally. Tomorrow: POST to your API.
import type { Order, OrderType } from "@/types";
import { RESTAURANT } from "@/data/config";
import type { CartItem } from "@/types";

export interface CreateOrderInput {
  customer: string;
  phone: string;
  address?: string;
  city?: string;
  type: OrderType;
  items: CartItem[];
  notes?: string;
}

function computeTotals(items: CartItem[], type: OrderType) {
  const subtotal = items.reduce((s, i) => s + i.qty * i.product.price, 0);
  const deliveryFee = type === "delivery" ? RESTAURANT.deliveryFee : 0;
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}

export const ordersService = {
  async create(input: CreateOrderInput): Promise<Order> {
    const { subtotal, deliveryFee, total } = computeTotals(input.items, input.type);
    const order: Order = {
      id: `#BF${Math.floor(1000 + Math.random() * 9000)}`,
      customer: input.customer,
      phone: input.phone,
      address: input.address,
      city: input.city,
      type: input.type,
      items: input.items,
      subtotal,
      deliveryFee,
      total,
      notes: input.notes,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    // Simulated persistence — swap with a real API call later.
    if (typeof window !== "undefined") {
      const prev = JSON.parse(window.localStorage.getItem("bf_orders") ?? "[]");
      window.localStorage.setItem("bf_orders", JSON.stringify([...prev, order]));
    }
    return order;
  },
};
