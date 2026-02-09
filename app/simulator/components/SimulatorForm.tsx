"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import products from "@/data/products.json";
import SimulationResultModal from "./SimulationResultModal";

// Formato moneda
const formatCurrency = (value: number) => {
  return `$${value.toLocaleString("es-CO")}`;
};

export default function SimulatorForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get("product");
  const product = products.find((p) => p.id === productId);

  // Si no hay producto, no se muestra el formulario
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center bg-white shadow-md p-6 rounded-md max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Selecciona un producto para simular
        </h2>
        <p className="text-gray-600 text-sm mt-2 text-center">
          Por favor vuelve a la sección de productos y elige uno para ver tu ahorro estimado.
        </p>
      </div>
    );
  }

  const { name: productName, interestRate, minAmount } = product;

  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [contributionError, setContributionError] = useState("");
  const [rateDescription, setRateDescription] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleCurrencyInput = (value: string, setter: (val: string) => void) => {
    const numericValue = value.replace(/\D/g, "");
    setter(numericValue ? `$${numericValue}` : "");
  };

  // Validación del monto inicial
  const handleInitialBlur = () => {
    if (initialAmount === "") {
      setAmountError("No has escrito tu monto inicial.");
      return;
    }

    const numericValue = parseFloat(initialAmount.replace(/\D/g, ""));

    if (isNaN(numericValue)) {
      setAmountError("Ingrese un número válido.");
    } else if (numericValue < minAmount) {
      setAmountError(
        `El ahorro inicial debe ser al menos ${formatCurrency(minAmount)}.`
      );
    } else {
      setAmountError("");
    }
  };

  // Validación del aporte mensual
  const handleContributionChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    setMonthlyContribution(numericValue ? `$${numericValue}` : "");

    const contributionNumber = parseFloat(numericValue || "0");

    if (value === "") {
      setContributionError(""); // vacío permitido
    } else if (isNaN(contributionNumber)) {
      setContributionError("Ingrese un número válido.");
    } else if (contributionNumber < 0) {
      setContributionError("El aporte mensual no puede ser negativo.");
    } else if (contributionNumber < 10000) { // ejemplo mínimo aporte
      setContributionError("El aporte mensual debe ser al menos $10.000.");
    } else {
      setContributionError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const principal = parseFloat(initialAmount.replace(/\D/g, ""));
    const contribution = parseFloat(monthlyContribution.replace(/\D/g, "") || "0");
    const totalMonths = parseInt(months);

    if (!principal) {
      setError("No has escrito tu monto inicial.");
      return;
    }

    if (!totalMonths) {
      setError("Selecciona un plazo de ahorro.");
      return;
    }

    if (principal < minAmount) {
      setError(`El ahorro inicial debe ser al menos ${formatCurrency(minAmount)}.`);
      return;
    }

    if (contribution < 0 || totalMonths <= 0) {
      setError("Los valores ingresados deben ser positivos.");
      return;
    }

    // Cálculo de interés compuesto mensual
    const monthlyRate = interestRate / 100 / 12;
    const currentRateDesc = `anual del ${interestRate}% (${(monthlyRate * 100).toFixed(2)}% M.V.)`;

    let total = principal;
    for (let i = 0; i < totalMonths; i++) {
      total = (total + contribution) * (1 + monthlyRate);
    }

    setResult(total);
    setRateDescription(currentRateDesc);
    setShowModal(true);
  };

  // Redirigir a onboarding - abrir cuenta
  const handleOpenAccount = () => {
    const principal = parseFloat(initialAmount.replace(/\D/g, ""));
    const contribution = parseFloat(monthlyContribution.replace(/\D/g, "") || "0");

    router.push(
      `/onboarding?product=${productId}&amount=${principal}&months=${months}&contribution=${contribution}`
    );
  };

  return (
    <>
      <div className="flex flex-col gap-6 bg-white shadow-md p-6 rounded-md max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-800">
          Calcula tu ahorro - {productName}
        </h2>

        <p className="text-gray-600 text-sm">
          Ingresa tu monto inicial, aportes mensuales y duración de tu ahorro.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* MONTO INICIAL */}
          <label className="text-gray-700 font-medium">
            ¿Cuál es su monto inicial? (mínimo {formatCurrency(minAmount)})
          </label>
          <input
            type="text"
            placeholder="$0"
            value={initialAmount}
            onChange={(e) => handleCurrencyInput(e.target.value, setInitialAmount)}
            onBlur={handleInitialBlur}
            className={`border p-2 rounded focus:ring-2 focus:ring-blue-400 ${amountError ? "border-red-500" : ""}`}
          />
          {amountError && <p className="text-red-500 text-sm">{amountError}</p>}

          {/* PLAZO */}
          <label className="text-gray-700 font-medium">
            Selecciona el plazo de ahorro (meses)
          </label>
          <select
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Selecciona un plazo --</option>
            <option value="6">6 meses</option>
            <option value="12">12 meses</option>
            <option value="18">18 meses</option>
            <option value="24">24 meses</option>
            <option value="36">36 meses</option>
          </select>

          {/* APORTE MENSUAL */}
          <label className="text-gray-700 font-medium">¿Cuál es su aporte mensual?</label>
          <input
            type="text"
            placeholder="$0"
            value={monthlyContribution}
            onChange={(e) => handleContributionChange(e.target.value)}
            className={`border p-2 rounded focus:ring-2 focus:ring-blue-400 ${contributionError ? "border-red-500" : ""}`}
          />
          {contributionError && <p className="text-red-500 text-sm">{contributionError}</p>}

          <button
            type="submit"
            className="bg-[#244672] hover:bg-[#1d385a] text-white font-semibold py-2 px-4 rounded-lg transition"
            disabled={!!amountError || !!contributionError || !months}
          >
            Simular
          </button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* MODAL */}
      <SimulationResultModal
        isOpen={showModal}
        result={result}
        rateDescription={rateDescription}
        formatCurrency={formatCurrency}
        onClose={() => setShowModal(false)}
        onConfirm={handleOpenAccount}
      />
    </>
  );
}
