import { ProductCard } from "./ProductCard";
import { Product } from "../types";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
