export type CategoryId =
  | "burgers" | "chicken" | "tacos" | "pizza"
  | "fries" | "combos" | "drinks" | "sauces";

export interface Category {
  id: CategoryId;
  label: string;
}

export const CATEGORIES: Category[] = [
  { id: "burgers", label: "BURGERS" },
  { id: "chicken", label: "CHICKEN" },
  { id: "tacos", label: "TACOS" },
  { id: "pizza", label: "PIZZA" },
  { id: "fries", label: "FRIES" },
  { id: "combos", label: "COMBOS" },
  { id: "drinks", label: "DRINKS" },
  { id: "sauces", label: "SAUCES" },
];
