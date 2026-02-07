"use client";

import { Suspense } from "react";
import SimulatorForm from "./components/SimulatorForm";

export default function SimulatorPage() {
  return (
    <main className="w-full">

      {/* HERO / BANNER */}
      <section className="w-full bg-[#f7fbff] pt-4">
        <div className="max-w-[90rem] mx-auto h-[28rem] md:h-[34rem] lg:h-[40rem] grid grid-cols-1 lg:grid-cols-2 items-center">

          {/* LADO IZQUIERDO */}
          <div className="relative flex items-center px-10 lg:px-20">

           

            {/* PERSONA */}
            <img
              src="/personaa.png"
              alt="Persona usando celular"
              className="relative z-10 w-[340px] md:w-[380px] lg:w-[420px] mx-auto"
            />

            {/* TEXTO */}
            <div className="ml-12 max-w-md">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#1a3d6b] leading-tight">
                Descubre cuánto puede <br />
                crecer tu ahorro digital
              </h1>

              <ul className="mt-6 space-y-2 text-[#1a3d6b] text-lg">
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
          </div>

          {/* LADO DERECHO FORM */}
          <div className="flex items-center justify-center px-6">
            <div className="w-full max-w-sm bg-white p-7 rounded-2xl shadow-xl">
              <Suspense fallback={<div className="text-center p-4 text-gray-500">Cargando simulador...</div>}>
                <SimulatorForm />
              </Suspense>
            </div>
          </div>

        </div>
      </section>

      {/* INFO */}
      <section className="max-w-7xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-6">
        <div className="flex-1 p-6 rounded-xl shadow-md bg-white border-l-4 border-[#06d1f3]">
          <h3 className="font-semibold mb-2 text-[#1a3d6b]">
            Ahorra de forma constante
          </h3>
          <p className="text-gray-600 text-sm">
            Ajusta tu monto y plazo para ver cómo crece tu ahorro con interés simulado.
          </p>
        </div>

        <div className="flex-1 p-6 rounded-xl shadow-md bg-white border-l-4 border-[#33acc8]">
          <h3 className="font-semibold mb-2 text-[#1a3d6b]">
            Planifica tu ahorro
          </h3>
          <p className="text-gray-600 text-sm">
            Determina tus aportes mensuales y plazo según tus objetivos.
          </p>
        </div>

        <div className="flex-1 p-6 rounded-xl shadow-md bg-white border-l-4 border-[#06d1f3]">
          <h3 className="font-semibold mb-2 text-[#1a3d6b]">
            Registra tu interés
          </h3>
          <p className="text-gray-600 text-sm">
            Ajusta tus aportes y plazo para planificar tu futuro financiero.
          </p>
        </div>
      </section>

    </main>
  );
}
