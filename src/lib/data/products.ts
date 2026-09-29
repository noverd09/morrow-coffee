import { Product, Category, RoastLevel } from "@/lib/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Ethiopia Guji",
    slug: "ethiopia-guji",
    description: "A vibrant, fruit-forward coffee with delicate floral notes and a silky body. Grown at high altitudes in the Guji region, this natural-processed coffee showcases the best of Ethiopian coffee heritage.",
    price: 18,
    origin: "Guji, Ethiopia",
    process: "Natural",
    roastLevel: "light",
    category: "filter",
    tastingNotes: ["Strawberry", "Jasmine", "Honey"],
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    featured: true,
  },
  {
    id: "2",
    name: "House Blend",
    slug: "house-blend",
    description: "Our signature everyday coffee. A balanced blend of Central and South American beans roasted to bring out rich chocolate and nutty notes. Perfect for any brewing method.",
    price: 16,
    origin: "Blend",
    process: "Washed",
    roastLevel: "medium",
    category: "espresso",
    tastingNotes: ["Chocolate", "Caramel", "Hazelnut"],
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    featured: true,
  },
  {
    id: "3",
    name: "Colombia Huila",
    slug: "colombia-huila",
    description: "A classic Colombian coffee with bright acidity and sweet cocoa notes. Grown by small producers in the Huila region, this washed-process coffee delivers consistent quality in every cup.",
    price: 19,
    origin: "Huila, Colombia",
    process: "Washed",
    roastLevel: "medium",
    category: "filter",
    tastingNotes: ["Red Apple", "Cocoa", "Brown Sugar"],
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=80",
    featured: true,
  },
  {
    id: "4",
    name: "Guatemala Huehuetenango",
    slug: "guatemala-huehuetenango",
    description: "A complex, full-bodied coffee from Guatemala's renowned Huehuetenango region. This washed-process coffee offers a beautiful balance of fruit and chocolate with a clean finish.",
    price: 20,
    origin: "Huehuetenango, Guatemala",
    process: "Washed",
    roastLevel: "medium",
    category: "espresso",
    tastingNotes: ["Plum", "Toffee", "Citrus"],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    featured: true,
  },
  {
    id: "5",
    name: "Kenya AA",
    slug: "kenya-aa",
    description: "A bold, bright coffee with intense fruit notes and wine-like acidity. This AA-grade Kenyan coffee is fully washed and roasted to highlight its distinctive berry characteristics.",
    price: 22,
    origin: "Nyeri, Kenya",
    process: "Washed",
    roastLevel: "light",
    category: "filter",
    tastingNotes: ["Blackcurrant", "Grapefruit", "Wine"],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    featured: false,
  },
  {
    id: "6",
    name: "Brazil Sul de Minas",
    slug: "brazil-sul-de-minas",
    description: "A smooth, chocolatey coffee with low acidity. Perfect as a single-origin espresso or in milk-based drinks. Natural processing brings out sweet, nutty flavors.",
    price: 17,
    origin: "Sul de Minas, Brazil",
    process: "Natural",
    roastLevel: "dark",
    category: "espresso",
    tastingNotes: ["Milk Chocolate", "Almond", "Caramel"],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    featured: false,
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (category: Category): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductsByRoast = (roastLevel: RoastLevel): Product[] => {
  return products.filter((product) => product.roastLevel === roastLevel);
};
