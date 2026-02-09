import Link from "next/link";
import Image from "next/image";
import { Product } from "../types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition hover:shadow-lg hover:-translate-y-1 w-full h-full flex flex-col">

   
      <div className="relative w-full h-36">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      
      <div className="p-5 flex flex-col flex-grow">

        <span className="text-sm text-blue-700 font-medium capitalize">
          {product.type}
        </span>

        <h3 className="text-xl font-semibold mt-1">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <p className="mt-3 font-semibold text-[#244672]">
          {product.interestRate}% EA
        </p>

    
        <div className="flex-grow" />

        
        <div className="flex justify-center mt-5">
          <Link
            href={`/simulator?product=${product.id}`}
            className="bg-[#244672] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#1d385a] transition duration-200 shadow-sm hover:shadow-md"
          >
            Simular
          </Link>
        </div>

      </div>
    </div>
  );
}
