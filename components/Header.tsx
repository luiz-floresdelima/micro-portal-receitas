import Link from "next/link";
import SearchBar from "./SearchBar";
import { getAllCategories } from "@/lib/categories";

export default async function Header() {
  const categories = await getAllCategories();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3 px-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="text-2xl font-bold text-pink-600 mx-auto">
            <h1>Portal de Receitas</h1>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        <div className="w-full md:w-64">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
