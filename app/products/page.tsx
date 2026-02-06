import products from "@/data/products.json";
import { ProductHero } from "./components/ProductHero";
import ProductClient from "./components/ProductClient";

export const revalidate = 60; // Usamos ISR cada 60 segundos en caso de que haya alguna actualización  

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ProductHero />
      <ProductClient products={products} />
    </main>
  );
}

