import { getProductsByCategory } from "@/lib/data/products";
import { ProductCard } from "@/components/products/product-card";
import { PageHead } from "@/components/ui/page-head";

export default function FilterPage() {
  const products = getProductsByCategory("filter").sort((a, b) => a.hour - b.hour);

  return (
    <>
      <PageHead
        label="Shop / Filter"
        title={
          <>
            Filter, <em>bright and clean.</em>
          </>
        }
        intro="Coffees for pour-over, drip and French press."
      />
      <div className="wrap grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 pb-24 md:pb-32">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </>
  );
}
