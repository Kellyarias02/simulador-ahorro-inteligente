import Link from "next/link";
import Image from "next/image";

export function HomeHero() {
  return (
    <section className="w-full min-h-[28rem] md:min-h-[32rem] lg:min-h-[36rem] flex flex-col lg:flex-row">

      
      <div className="w-full lg:w-1/2 bg-[#d4e0f9] flex items-center">
        <div className="max-w-xl px-8 lg:px-16 py-12">

          <h1 className="text-4xl md:text-5xl font-bold text-[#244672] leading-tight">
            Aumenta tus ingresos con tu ahorro digital
          </h1>

          <p className="mt-4 text-[#244672]/80 text-lg">
            Simula cuánto puedes ganar con nuestros productos financieros y
            empieza a construir tu futuro hoy.
          </p>

          <ul className="mt-6 space-y-4">

            <li className="flex items-center gap-3 text-[#244672]">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold">
                ✓
              </span>
              Rentabilidad competitiva
            </li>

            <li className="flex items-center gap-3 text-[#244672]">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold">
                ✓
              </span>
              Simulación inmediata
            </li>

            <li className="flex items-center gap-3 text-[#244672]">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold">
                ✓
              </span>
              Apertura 100% digital
            </li>

          </ul>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href="/products"
              className="bg-[#244672] hover:bg-[#1d385a] text-white px-7 py-3 rounded-lg font-semibold shadow-md transition"
            >
              Conoce más
            </Link>

          </div>

        </div>
      </div>

      <div className="relative w-full lg:w-1/2 min-h-[20rem] lg:min-h-full">
        <Image
          src="/mujer-ahorrando.jpg"
          alt="Ahorro digital"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
      </div>

    </section>
  );
}
