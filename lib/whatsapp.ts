import { WHATSAPP_NUMBER } from "@/data/config";
import type { Order } from "@/types";

// Future-ready: generates a WhatsApp order message. No real number is configured yet.
export function generateWhatsAppOrder(order: Order): string {
  const lines = [
    `NEW ORDER ${order.id}`,
    `Name: ${order.customer}`,
    `Phone: ${order.phone}`,
    `Type: ${order.type.toUpperCase()}`,
    ...(order.address ? [`Address: ${order.address}, ${order.city ?? ""}`] : []),
    "",
    "ITEMS:",
    ...order.items.map(
      (i) =>
        `- ${i.qty}x ${i.product.name} (${i.size})` +
        (i.extras.length ? ` + ${i.extras.join(", ")}` : ""),
    ),
    "",
    `Total: ${order.total} DA`,
    ...(order.notes ? [`Notes: ${order.notes}`] : []),
  ];
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join("\n"),
  )}`;
  return url;
}
