import products from "@/data/products.json";
import { ProductGrid } from "./products/components/ProductGrid";
import { HomeHero } from "./components/HomeHero";
import Link from "next/link";
import { Lightbulb, TrendingUp, BookOpen } from "lucide-react";

export default function Home() {

  const featuredProducts = products.slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">

      <HomeHero />

      {/* Productos destacados */}
      <section className="py-16">

        <h2 className="text-2xl font-bold text-center mb-10">
          Descubre nuestros productos destacados
        </h2>

        <ProductGrid products={featuredProducts} />

   
      </section>

      
     <section className="w-full bg-[#244672] py-12">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">

    {/* TIP 1 */}
    <div className="flex flex-col items-center p-6 bg-[#244672]/90 rounded-xl transition-transform transform hover:-translate-y-2 hover:shadow-lg">
      <div className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full mb-4 text-white">
        <Lightbulb size={32} />
      </div>
      <h4 className="font-semibold text-lg mb-2">Pequeños hábitos</h4>
      <p className="text-white/90 text-sm">
        Aprende a ahorrar regularmente para crear grandes resultados.
      </p>
    </div>

    {/* TIP 2 */}
    <div className="flex flex-col items-center p-6 bg-[#244672]/90 rounded-xl transition-transform transform hover:-translate-y-2 hover:shadow-lg">
      <div className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full mb-4 text-white">
        <TrendingUp size={32} />
      </div>
      <h4 className="font-semibold text-lg mb-2">Ahorro fácil</h4>
      <p className="text-white/90 text-sm">
        Descubre cómo con simples pasos puedes aumentar tus ingresos digitales.
      </p>
    </div>

    {/* TIP 3 */}
    <div className="flex flex-col items-center p-6 bg-[#244672]/90 rounded-xl transition-transform transform hover:-translate-y-2 hover:shadow-lg">
      <div className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full mb-4 text-white">
        <BookOpen size={32} />
      </div>
      <h4 className="font-semibold text-lg mb-2">Educación financiera</h4>
      <p className="text-white/90 text-sm">
        Tips rápidos y claros para tomar decisiones financieras inteligentes.
      </p>
    </div>

  </div>
</section>

    </main>
  );
}
