export type CategoryId = "burgers" | "sandwiches" | "tasty-crusty";

export interface Category {
  id: CategoryId;
  label: string;
}

export const CATEGORIES: Category[] = [
  { id: "burgers", label: "BURGERS" },
  { id: "sandwiches", label: "SANDWICHES" },
  { id: "tasty-crusty", label: "TASTY CRUSTY" },
];

/** Menu filters. "all" is a view, not a stored product category. */
export const MENU_FILTERS = [
  { id: "all", label: "ALL" },
  ...CATEGORIES,
] as const;

export type MenuFilterId = (typeof MENU_FILTERS)[number]["id"];
