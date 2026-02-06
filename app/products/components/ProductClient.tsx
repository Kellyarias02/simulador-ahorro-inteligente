"use client";

import { useState } from "react";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { EmptyState } from "./EmptyState";
import { Product } from "../types";

export default function ProductClient({ products }: { products: Product[] }) {
  const [filtered, setFiltered] = useState(products);

  const handleFilter = (value: string) => {
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(result);
  };

  return (
    <>
      <ProductFilters onFilter={handleFilter} />
      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <EmptyState />
      )}
    </>
  );
}
