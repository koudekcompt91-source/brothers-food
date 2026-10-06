// Backend-ready abstraction for products.
// Today: local demo data. Tomorrow: replace the body with `fetch("/api/products")`.
import { PRODUCTS, getProductById, getProductsByCategory } from "@/data/products";
import type { Product } from "@/types";

export interface ProductsService {
  list(): Promise<Product[]>;
  byCategory(category: string): Promise<Product[]>;
  byId(id: string): Promise<Product | undefined>;
}

export const productsService: ProductsService = {
  async list() {
    return PRODUCTS;
  },
  async byCategory(category: string) {
    return getProductsByCategory(category);
  },
  async byId(id: string) {
    return getProductById(id);
  },
};
