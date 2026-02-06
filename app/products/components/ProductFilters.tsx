"use client";

import { useEffect, useState } from "react";

interface Props {
  onFilter: (value: string) => void;
}

export function ProductFilters({ onFilter }: Props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilter(search);
    }, 500); // debounce

    return () => clearTimeout(timeout);
  }, [search, onFilter]);

  return (
    <div className="max-w-xl mx-auto py-8">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
}
