import Link from "next/link";
import { Product } from "../types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-xl hover:-translate-y-1">
      <span className="text-sm text-blue-700 font-medium">
        {product.type}
      </span>

      <h3 className="text-xl font-semibold mt-2">
        {product.name}
      </h3>

      <p className="text-gray-600 text-sm mt-2">
        {product.description}
      </p>

      <p className="mt-4 font-bold text-blue-900">
        {product.interestRate}% EA
      </p>

      <Link
        href={`/simulator?product=${product.id}`}
        className="block mt-4 bg-blue-900 text-white text-center py-2 rounded-lg hover:bg-blue-800 transition"
      >
        Simular
      </Link>
    </div>
  );
}
