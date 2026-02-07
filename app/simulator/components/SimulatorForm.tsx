"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import products from "@/data/products.json";

// Formato moneda
const formatCurrency = (value: number) => {
  return `$${value.toLocaleString("es-CO")}`;
};

export default function SimulatorForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  // Buscar producto en el JSON
  const product = products.find((p) => p.id === productId);

  const interestRate = product?.interestRate ?? 5; // tasa por defecto
  const productName = product?.name ?? "Ahorro digital";
  const minAmount = product?.minAmount ?? 700000;

  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [contributionError, setContributionError] = useState("");
  const [rateDescription, setRateDescription] = useState("");

  const handleCurrencyInput = (
    value: string,
    setter: (val: string) => void
  ) => {
    const numericValue = value.replace(/\D/g, "");
    setter(numericValue ? `$${numericValue}` : "");
  };

  const handleInitialBlur = () => {
    if (initialAmount === "") {
      setAmountError("No has escrito tu monto inicial.");
      return;
    }
    const numericValue = parseFloat(initialAmount.replace(/\D/g, ""));
    if (isNaN(numericValue)) {
      setAmountError("Ingrese un número válido.");
    } else if (numericValue < minAmount) {
      setAmountError(`El ahorro inicial debe ser al menos ${formatCurrency(minAmount)}.`);
    } else {
      setAmountError("");
    }
  };

  const handleContributionChange = (value: string) => {
    handleCurrencyInput(value, setMonthlyContribution);
    const numericValue = parseFloat(value.replace(/\D/g, ""));
    if (value === "") {
      setContributionError("");
    } else if (isNaN(numericValue) || numericValue < 0) {
      setContributionError("Ingrese un número positivo.");
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

    // tasa mensual desde tasa anual
    const monthlyRate = (interestRate / 100) / 12;
    const currentRateDesc = `anual del ${interestRate}% (${(monthlyRate * 100).toFixed(2)}% M.V.)`;

    let total = principal;
    for (let i = 0; i < totalMonths; i++) {
      total = (total + contribution) * (1 + monthlyRate);
    }

    setResult(total);
    setRateDescription(currentRateDesc);
  };

  return (
    <div className="flex flex-col gap-6 bg-white shadow-md p-6 rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800">
        Calcula tu ahorro - {productName}
      </h2>

      <p className="text-gray-600 text-sm">
        Ingresa tu monto inicial, aportes mensuales y duración de tu ahorro.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-gray-700 font-medium">
          ¿Cuál es su monto inicial? (mínimo {formatCurrency(minAmount)})
        </label>
        <input
          type="text"
          placeholder="$0"
          value={initialAmount}
          onChange={(e) => handleCurrencyInput(e.target.value, setInitialAmount)}
          onBlur={handleInitialBlur}
          className={`border p-2 rounded focus:ring-2 focus:ring-blue-400 ${
            amountError ? "border-red-500" : ""
          }`}
        />
        {amountError && <p className="text-red-500 text-sm">{amountError}</p>}

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

        <label className="text-gray-700 font-medium">
          ¿Cuál es su aporte mensual?
        </label>
        <input
          type="text"
          placeholder="$0"
          value={monthlyContribution}
          onChange={(e) => handleContributionChange(e.target.value)}
          className={`border p-2 rounded focus:ring-2 focus:ring-blue-400 ${
            contributionError ? "border-red-500" : ""
          }`}
        />
        {contributionError && <p className="text-red-500 text-sm">{contributionError}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition font-semibold"
          disabled={!!amountError || !!contributionError || !months}
        >
          Simular
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {result !== null && (
        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
          <p className="font-semibold text-gray-800">
            Estimación total de tu ahorro: {formatCurrency(result)}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Basado en una tasa de interés {rateDescription}.
          </p>
        </div>
      )}
    </div>
  );
}
