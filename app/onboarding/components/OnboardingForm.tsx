"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

// Generador UUID simulado
const generateUUID = () => {
  return crypto.randomUUID();
};

export default function OnboardingPage() {
  const searchParams = useSearchParams();

  // Datos que llegan desde simulator
  const product = searchParams.get("product");
  const amount = searchParams.get("amount");
  const months = searchParams.get("months");
  const contribution = searchParams.get("contribution");

  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const [error, setError] = useState("");
  const [successCode, setSuccessCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !document || !email) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (recaptchaToken !== "OK") {
      setError("Debes confirmar que no eres un robot.");
      return;
    }

    const uuid = generateUUID();
    setSuccessCode(uuid);
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-8 flex flex-col gap-6">

        {/* TITULO */}
        <h1 className="text-2xl font-bold text-[#1a3d6b]">
          Registro de intención de apertura
        </h1>

        <p className="text-gray-600 text-sm">
          Completa tus datos para continuar con la apertura de tu producto digital.
        </p>

        {/* RESUMEN SIMULACIÓN */}
        {(product || amount) && (
          <div className="bg-blue-50 border-l-4 border-[#06d1f3] p-4 rounded text-sm">
            <p className="font-semibold text-[#1a3d6b] mb-1">
              Resumen de simulación
            </p>

            <p>Producto: {product ?? "Ahorro digital"}</p>

            {amount && (
              <p>
                Monto inicial: $
                {Number(amount).toLocaleString("es-CO")}
              </p>
            )}

            {months && <p>Plazo: {months} meses</p>}

            {contribution && (
              <p>
                Aporte mensual: $
                {Number(contribution).toLocaleString("es-CO")}
              </p>
            )}
          </div>
        )}

        {!successCode ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Nombre */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Nombre completo
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-[#33acc8]"
              />
            </div>

            {/* Documento */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Documento
              </label>

              <input
                type="text"
                value={document}
                onChange={(e) =>
                  setDocument(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Número de documento"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-[#33acc8]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Correo electrónico
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@email.com"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-[#33acc8]"
              />
            </div>

            {/* ⭐ RECAPTCHA SIMULADO */}
            <div className="border rounded-md p-4 bg-gray-50 flex items-center gap-3">
              
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
                onChange={(e) =>
                  setRecaptchaToken(e.target.checked ? "OK" : "")
                }
              />

              <span className="text-sm text-gray-700 font-medium">
                No soy un robot
              </span>

              <div className="ml-auto text-xs text-gray-400 text-right">
                reCAPTCHA
                <br />
                simulado
              </div>

            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* BOTON */}
            <button
              type="submit"
              className="bg-[#06d1f3] text-white py-2 rounded-lg font-semibold hover:bg-[#33acc8] transition"
            >
              Enviar solicitud
            </button>

          </form>
        ) : (
          /* SUCCESS */
          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded flex flex-col gap-2 text-center">
            <p className="text-lg font-semibold text-green-700">
              ¡Solicitud registrada con éxito!
            </p>

            <p className="text-gray-700">
              Código de solicitud:
            </p>

            <p className="font-bold text-[#1a3d6b] text-lg">
              {successCode}
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
