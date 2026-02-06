import SimulatorForm from "./components/SimulatorForm";

export default function SimulatorPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Simula tu ahorro digital de manera libre
      </h1>
      <SimulatorForm />
    </div>
  );
}
