import type { Product } from "@/types";

// Demo data — swap with a real API later (see lib/services/products.ts).
// Food art is illustrated until you drop a real photo at `image` and set usePhoto: true.
export const PRODUCTS: Product[] = [
  {
    id: "burger-01", name: "Brothers Burger", category: "burgers",
    description: "Double beef, melted cheddar, pickles, Brothers special sauce.",
    price: 850, image: "/images/products/brothers-burger.jpg", popular: true,
    ingredients: ["Double beef", "Cheddar", "Pickles", "Brothers sauce", "Brioche bun"],
  },
  {
    id: "burger-02", name: "Cheese Blast", category: "burgers",
    description: "Crispy beef patty drowned in double cheese sauce.",
    price: 750, image: "/images/products/cheese-blast.jpg",
    ingredients: ["Beef", "Double cheese sauce", "Onions", "Brioche bun"],
  },
  {
    id: "burger-03", name: "Double Smash", category: "burgers",
    description: "Two smashed patties, caramelized onions, house mayo.",
    price: 950, image: "/images/products/double-smash.jpg", popular: true,
    ingredients: ["Double smashed beef", "Caramelized onions", "House mayo", "Lettuce"],
  },
  {
    id: "chicken-01", name: "Crispy Chicken", category: "chicken",
    description: "Golden crispy chicken fillet, coleslaw, spicy mayo.",
    price: 700, image: "/images/products/crispy-chicken.jpg", popular: true,
    ingredients: ["Crispy chicken fillet", "Coleslaw", "Spicy mayo", "Brioche bun"],
  },
  {
    id: "chicken-02", name: "Spicy Wings x6", category: "chicken",
    description: "Six fiery wings tossed in Brothers hot glaze.",
    price: 650, image: "/images/products/spicy-wings.jpg",
    ingredients: ["Chicken wings", "Hot glaze", "Sesame"],
  },
  {
    id: "tacos-01", name: "Tacos Trio", category: "tacos",
    description: "Three street tacos, beef, fresh salsa, lime crema.",
    price: 600, image: "/images/products/tacos-trio.jpg", popular: true,
    ingredients: ["Tortillas", "Beef", "Salsa", "Lime crema"],
  },
  {
    id: "tacos-02", name: "Chicken Tacos", category: "tacos",
    description: "Grilled chicken, crunchy slaw, chipotle sauce.",
    price: 580, image: "/images/products/chicken-tacos.jpg",
    ingredients: ["Grilled chicken", "Slaw", "Chipotle sauce"],
  },
  {
    id: "pizza-01", name: "Margherita", category: "pizza",
    description: "Classic margherita with fresh mozzarella and basil.",
    price: 900, image: "/images/products/margherita.jpg",
    ingredients: ["Tomato sauce", "Mozzarella", "Basil", "Olive oil"],
  },
  {
    id: "fries-01", name: "Loaded Fries", category: "fries",
    description: "Fries topped with cheese sauce, beef bits and sauce.",
    price: 450, image: "/images/products/loaded-fries.jpg", popular: true,
    ingredients: ["Fries", "Cheese sauce", "Beef bits", "Brothers sauce"],
  },
  {
    id: "fries-02", name: "Classic Fries", category: "fries",
    description: "Golden crispy fries with house seasoning.",
    price: 250, image: "/images/products/classic-fries.jpg",
    ingredients: ["Potatoes", "House seasoning"],
  },
  {
    id: "combo-01", name: "Brothers Combo", category: "combos",
    description: "Brothers Burger + Fries + Drink. The full experience.",
    price: 1100, image: "/images/products/brothers-combo.jpg", popular: true,
    ingredients: ["Brothers Burger", "Classic Fries", "Drink of choice"],
  },
  {
    id: "combo-02", name: "Family Box", category: "combos",
    description: "2 burgers, 2 fries, 4 wings, 2 drinks. Feed the crew.",
    price: 2400, image: "/images/products/family-box.jpg",
    ingredients: ["2 Burgers", "2 Fries", "4 Wings", "2 Drinks"],
  },
  {
    id: "drink-01", name: "Orange Soda", category: "drinks",
    description: "Ice-cold orange soda. The Brothers way.",
    price: 150, image: "/images/products/orange-soda.jpg",
    ingredients: ["Orange soda", "Ice"],
  },
  {
    id: "drink-02", name: "Milkshake", category: "drinks",
    description: "Thick vanilla milkshake, whipped cream on top.",
    price: 350, image: "/images/products/milkshake.jpg",
    ingredients: ["Milk", "Vanilla ice cream", "Whipped cream"],
  },
  {
    id: "sauce-01", name: "Brothers Sauce", category: "sauces",
    description: "Our signature secret sauce. Addictive.",
    price: 100, image: "/images/products/special-sauce.jpg",
    ingredients: ["Secret recipe"],
  },
];

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getPopularProducts(): Product[] {
  return PRODUCTS.filter((p) => p.popular);
}
