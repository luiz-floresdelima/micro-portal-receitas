"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) router.push(`/busca?q=${encodeURIComponent(term)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Buscar receitas..."
        className="border rounded-md px-3 py-2 flex-1"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        Buscar
      </button>
    </form>
  );
}
