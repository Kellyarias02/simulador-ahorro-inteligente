"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const generateUUID = () => crypto.randomUUID();

export default function OnboardingPage() {
  const searchParams = useSearchParams();

  const product = searchParams.get("product");
  const amount = searchParams.get("amount");
  const months = searchParams.get("months");
  const contribution = searchParams.get("contribution");

  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    document: "",
    email: "",
    recaptcha: ""
  });

  const [successCode, setSuccessCode] = useState("");

  //VALIDACIONES

  const validateName = (value: string) => {
    if (!value.trim()) return "El nombre es obligatorio.";
    if (value.trim().length < 3) return "Debe tener mínimo 3 caracteres.";
    return "";
  };

  const validateDocument = (value: string) => {
    if (!value) return "El documento es obligatorio.";
    if (value.length < 6) return "Documento inválido.";
    return "";
  };

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "El correo es obligatorio.";
    if (!regex.test(value)) return "Correo inválido.";
    return "";
  };

  // HANDLERS 

  const handleNameChange = (value: string) => {
    setName(value);
    setErrors(prev => ({ ...prev, name: validateName(value) }));
  };

  const handleDocumentChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    setDocument(cleanValue);
    setErrors(prev => ({ ...prev, document: validateDocument(cleanValue) }));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handleRecaptchaChange = (checked: boolean) => {
    const token = checked ? "OK" : "";
    setRecaptchaToken(token);
    setErrors(prev => ({
      ...prev,
      recaptcha: checked ? "" : "Debes confirmar que no eres un robot."
    }));
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(name),
      document: validateDocument(document),
      email: validateEmail(email),
      recaptcha: recaptchaToken === "OK"
        ? ""
        : "Debes confirmar que no eres un robot."
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) return;

    setSuccessCode(generateUUID());
  };


  return (
    <main className="min-h-screen bg-[#fcfcfc] flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-8 flex flex-col gap-6">

        <h1 className="text-2xl font-bold text-[#1a3d6b]">
          ¡Empieza hoy a cumplir tu meta!
        </h1>
        

        {/* RESUMEN DE LA SIMULACIÓN */}
        {(product || amount) && (
          <div className="bg-blue-50 border-l-4 border-[#06d1f3] p-4 rounded text-sm">
            <p className="font-semibold text-[#1a3d6b] mb-1">
              Resumen de simulación
            </p>

            <p>Producto: {product ?? "Ahorro digital"}</p>

            {amount && (
              <p>Monto inicial: ${Number(amount).toLocaleString("es-CO")}</p>
            )}

            {months && <p>Plazo: {months} meses</p>}

            {contribution && (
              <p>
                Aporte mensual: ${Number(contribution).toLocaleString("es-CO")}
              </p>
            )}
          </div>
        )}

        {!successCode ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Nombre completo <span className="text-red-500">*</span>
              </label>

              <input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                onBlur={() =>
                  setErrors(prev => ({
                    ...prev,
                    name: validateName(name)
                  }))
                }
                className={`w-full border p-2 rounded focus:ring-2 focus:ring-[#33acc8]
                  ${errors.name ? "border-red-500" : ""}
                `}
                placeholder="Ej: María Gómez"
              />

              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Documento <span className="text-red-500">*</span>
              </label>

              <input
                value={document}
                onChange={(e) => handleDocumentChange(e.target.value)}
                onBlur={() =>
                  setErrors(prev => ({
                    ...prev,
                    document: validateDocument(document)
                  }))
                }
                className={`w-full border p-2 rounded focus:ring-2 focus:ring-[#33acc8]
                  ${errors.document ? "border-red-500" : ""}
                `}
                placeholder="Número de documento"
              />

              {errors.document && (
                <p className="text-red-500 text-sm">{errors.document}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Correo electrónico <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={() =>
                  setErrors(prev => ({
                    ...prev,
                    email: validateEmail(email)
                  }))
                }
                className={`w-full border p-2 rounded focus:ring-2 focus:ring-[#33acc8]
                  ${errors.email ? "border-red-500" : ""}
                `}
                placeholder="correo@email.com"
              />

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* RECAPTCHA */}
            <div className="border rounded-md p-4 bg-gray-50 flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
                onChange={(e) => handleRecaptchaChange(e.target.checked)}
              />

              <span className="text-sm text-gray-700 font-medium">
                No soy un robot <span className="text-red-500">*</span>
              </span>

              <div className="ml-auto text-xs text-gray-400 text-right">
                reCAPTCHA
                <br />
                simulado
              </div>
            </div>

            {errors.recaptcha && (
              <p className="text-red-500 text-sm">{errors.recaptcha}</p>
            )}

            <button
              type="submit"
              className="bg-[#08a8c5] hover:bg-[#0799b0] text-white font-semibold py-2.5 px-6 rounded-lg transition shadow-sm hover:shadow-md mx-auto w-full sm:w-auto"
            >
              Enviar solicitud
            </button>

          </form>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded text-center">
            <p className="text-lg font-semibold text-green-700">
              ¡Solicitud registrada con éxito!
            </p>

            <p className="text-gray-700 mt-2">
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
