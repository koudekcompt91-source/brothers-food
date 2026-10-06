import type { Product } from "@/types";
/**
 * Single source of truth for the menu.
 * PLACEHOLDER PRICES — replace `price` before launch. These are not real prices.
 * To use a real photo: drop the file at `image` and set usePhoto: true.
 */
export const PRODUCTS: Product[] = [
  {
    id: "brothers-classic",
    name: "BROTHERS CLASSIC",
    category: "burgers",
    description: "Beef patty, cheddar, lettuce, tomato, pickles and signature sauce.",
    price: 650,
    image: "/images/menu/brothers-classic.jpg",
    featured: true,
    badge: "FAVORITE",
    available: true,
  },
  {
    id: "brothers-double",
    name: "BROTHERS DOUBLE",
    category: "burgers",
    description: "Double beef patty, double cheddar, pickles and signature sauce.",
    price: 850,
    image: "/images/menu/brothers-double.jpg",
    available: true,
  },
  {
    id: "brothers-crispy",
    name: "BROTHERS CRISPY",
    category: "burgers",
    description: "Crispy chicken, cheddar, lettuce and signature sauce.",
    price: 700,
    image: "/images/menu/brothers-crispy.jpg",
    featured: true,
    available: true,
  },
  {
    id: "brothers-special",
    name: "BROTHERS SPECIAL",
    category: "burgers",
    description: "Beef patty, cheddar, crispy onions and Brothers special sauce.",
    price: 800,
    image: "/images/menu/brothers-special.jpg",
    available: true,
  },
  {
    id: "crispy-chicken",
    name: "CRISPY CHICKEN",
    category: "sandwiches",
    description: "Crispy chicken, lettuce, cheese and signature sauce.",
    price: 550,
    image: "/images/menu/crispy-chicken.jpg",
    available: true,
  },
  {
    id: "chicken-tender",
    name: "CHICKEN TENDER",
    category: "sandwiches",
    description: "Chicken tenders, cheese, lettuce and signature sauce.",
    price: 580,
    image: "/images/menu/chicken-tender.jpg",
    available: true,
  },
  {
    id: "brothers-chicken",
    name: "BROTHERS CHICKEN",
    category: "sandwiches",
    description: "Chicken, cheese, fresh vegetables and house sauce.",
    price: 600,
    image: "/images/menu/brothers-chicken.jpg",
    available: true,
  },
  {
    id: "the-brothers",
    name: "THE BROTHERS",
    category: "sandwiches",
    description: "Chicken, cheese, crispy onions and special Brothers sauce.",
    price: 650,
    image: "/images/menu/the-brothers.jpg",
    available: true,
  },
  {
    id: "tasty-crusty-original",
    name: "TASTY CRUSTY ORIGINAL",
    category: "tasty-crusty",
    description: "Crispy chicken, seasoned rice and signature sauce.",
    price: 750,
    image: "/images/menu/tasty-crusty-original.jpg",
    available: true,
  },
  {
    id: "tasty-crusty-cheese",
    name: "TASTY CRUSTY CHEESE",
    category: "tasty-crusty",
    description: "Crispy chicken, rice, melted cheese and signature sauce.",
    price: 850,
    image: "/images/menu/tasty-crusty-cheese.jpg",
    available: true,
  },
  {
    id: "tasty-crusty-spicy",
    name: "TASTY CRUSTY SPICY",
    category: "tasty-crusty",
    description: "Crispy chicken, rice, spicy sauce and crispy toppings.",
    price: 800,
    image: "/images/menu/tasty-crusty-spicy.jpg",
    available: true,
  },
  {
    id: "tasty-crusty-brothers",
    name: "TASTY CRUSTY BROTHERS",
    category: "tasty-crusty",
    description: "Crispy chicken, rice, cheese and special Brothers sauce.",
    price: 950,
    image: "/images/menu/tasty-crusty-brothers.jpg",
    featured: true,
    badge: "SIGNATURE",
    available: true,
  },
];

export const FAVORITE_IDS = [
  "brothers-classic",
  "brothers-crispy",
  "tasty-crusty-brothers",
] as const;

export function getAvailableProducts(): Product[] {
  return PRODUCTS.filter((p) => p.available !== false);
}

export function getProductsByCategory(category: string): Product[] {
  const available = getAvailableProducts();
  if (category === "all") return available;
  return available.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getFavoriteProducts(): Product[] {
  return FAVORITE_IDS.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));
}

export function getPopularProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured || p.popular);
}
