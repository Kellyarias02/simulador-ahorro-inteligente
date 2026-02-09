"use client";

import { Suspense } from "react";
import SimulatorForm from "./components/SimulatorForm";

export default function SimulatorPage() {
  return (
    <main className="w-full bg-[#f7fbff]">

      <section className="w-full py-16 flex flex-col md:flex-row items-center justify-center">

    
        <div className="max-w-lg px-6 md:mr-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a3d6b] leading-tight">
            Descubre cuánto puede <br />
            crecer tu ahorro digital
          </h1>

          <ul className="mt-6 space-y-3 text-[#1a3d6b] text-lg">
            <li className="flex items-center gap-2">
              <span className="text-[#27b3c9] font-bold">✔</span>
              Visualiza cómo crece tu ahorro
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#27b3c9] font-bold">✔</span>
              Ajusta monto y plazo fácilmente
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#27b3c9] font-bold">✔</span>
              Planifica tu futuro financiero
            </li>
          </ul>
        </div>

       
        <div className="w-full max-w-sm bg-white p-7 rounded-2xl shadow-xl mt-10 md:mt-0">
          <Suspense fallback={<div className="text-center p-4 text-gray-500">Cargando simulador...</div>}>
            <SimulatorForm />
          </Suspense>
        </div>

      </section>

      {/* DATOS CURIOSOS */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-[#1a3d6b] text-center mb-10">
          Datos curiosos
        </h2>

        <div className="flex flex-col md:flex-row gap-6">

          <div className="flex-1 p-6 rounded-xl shadow-md bg-white border-l-4 border-[#06d1f3]">
            <h3 className="font-semibold mb-2 text-[#1a3d6b]">Ahorro constante</h3>
            <p className="text-gray-600 text-sm">
              Pequeñas aportaciones diarias generan grandes resultados a largo plazo.
            </p>
          </div>

          <div className="flex-1 p-6 rounded-xl shadow-md bg-white border-l-4 border-[#33acc8]">
            <h3 className="font-semibold mb-2 text-[#1a3d6b]">Planificación financiera</h3>
            <p className="text-gray-600 text-sm">
              Organizar tus ingresos y gastos reduce el estrés financiero y mejora tu bienestar.
            </p>
          </div>

          <div className="flex-1 p-6 rounded-xl shadow-md bg-white border-l-4 border-[#06d1f3]">
            <h3 className="font-semibold mb-2 text-[#1a3d6b]">Intereses compuestos</h3>
            <p className="text-gray-600 text-sm">
              Ahorrar regularmente puede generar hasta 3x más intereses que guardar dinero en casa.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
