export type RoastLevel = "light" | "medium" | "dark";
export type Category = "espresso" | "filter";
export type Size = "250g" | "500g" | "1kg";
export type Grind = "whole-bean" | "espresso" | "filter";

export interface ProductVariant {
  id: string;
  size: Size;
  grind: Grind;
  priceModifier: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  origin: string;
  process: string;
  roastLevel: RoastLevel;
  category: Category;
  tastingNotes: string[];
  image: string;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  size: Size;
  grind: Grind;
  quantity: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}
