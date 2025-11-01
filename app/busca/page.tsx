import RecipeCard from "@/components/RecipeCard";
import { searchRecipes } from "@/lib/api/search";
import { SearchPageProps } from "@/types/search";

export const revalidate = 60;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const term = q || "";
  const recipes = await searchRecipes(term);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        {term ? `Resultados para: "${term}"` : "Todas as receitas"}
      </h1>

      {recipes.length === 0 && <p>Nenhuma receita encontrada.</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((r) => (
          <RecipeCard key={r.slug} recipe={r} />
        ))}
      </div>
    </main>
  );
}
