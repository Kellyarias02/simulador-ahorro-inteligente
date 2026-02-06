import { ProductCard } from "./ProductCard";
import { Product } from "../types";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 px-6 pb-16">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

}
