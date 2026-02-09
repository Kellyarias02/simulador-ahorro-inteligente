"use client";

type Props = {
  isOpen: boolean;
  result: number | null;
  rateDescription: string;
  formatCurrency: (value: number) => string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function SimulationResultModal({
  isOpen,
  result,
  rateDescription,
  formatCurrency,
  onClose,
  onConfirm,
}: Props) {
  if (!isOpen || result === null) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4 relative">

        <h3 className="text-xl font-bold text-[#1a3d6b] pr-8">
          Resultado de tu simulación
        </h3>


        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition"
          aria-label="Cerrar"
        >
          <span className="text-xl font-bold">×</span>
        </button>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
          <p className="font-semibold text-gray-800">
            Estimación total: {formatCurrency(result)}
          </p>

          <p className="text-gray-600 text-sm">
            Basado en una tasa {rateDescription}
          </p>
        </div>

        <div className="flex flex-col gap-3">

          <button
            onClick={onConfirm}
            className="bg-[#08a8c5] hover:bg-[#0799b0] text-white font-semibold py-2 px-4 rounded-lg transition shadow-sm mx-auto w-full sm:w-auto"
          >
            Comienza tu ahorro
          </button>

        </div>

      </div>
    </div>
  );
}
