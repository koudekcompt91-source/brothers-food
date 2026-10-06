// ─────────────────────────────────────────────────────────────
// BROTHERS FOOD — Brand & Restaurant config (edit everything here)
// ─────────────────────────────────────────────────────────────
export const BRAND = {
  name: "BROTHERS FOOD",
  tagline: "GOOD FOOD. GOOD MOOD. BROTHERS.",
  currency: "DA",
  logo: "/logo.png",
} as const;

export const RESTAURANT = {
  // Placeholders — replace with real info before launch
  phone: "+213 (0) 00 00 00 00",
  /** Placeholder only. Replace with a real WhatsApp number before launch. */
  whatsappNumber: "213000000000", // digits only, country code, no '+'
  address: "123 Brothers Street, Your City",
  city: "Your City",
  hours: "Every day · 11:00 — 23:00",
  deliveryTime: "20–35 MIN",
  pickupTime: "15–20 MIN",
  deliveryFee: 200,
  instagram: "https://instagram.com/brothersfood",
  facebook: "https://facebook.com/brothersfood",
  tiktok: "https://tiktok.com/@brothersfood",
  email: "hello@brothersfood.com",
} as const;

/** Configurable WhatsApp target. Not a real restaurant number. */
export const WHATSAPP_NUMBER = RESTAURANT.whatsappNumber;

export const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "MENU", href: "/menu" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
] as const;

export const MARQUEE_ITEMS = [
  "BROTHERS FOOD", "BURGERS", "CHICKEN", "TACOS", "FRIES", "COMBOS",
] as const;

export function formatPrice(price: number): string {
  return `${price.toLocaleString("fr-FR").replace(/\u202f/g, " ")} ${BRAND.currency}`;
}
