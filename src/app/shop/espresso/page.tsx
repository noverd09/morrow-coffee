import { getProductsByCategory } from "@/lib/data/products";
import { ProductCard } from "@/components/products/product-card";

export default function EspressoPage() {
  const products = getProductsByCategory("espresso");

  return (
    <div className="py-12 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold text-espresso uppercase tracking-wider mb-4">
            Espresso
          </h1>
          <p className="text-coffee">
            Bold, rich coffees perfect for espresso and milk-based drinks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
