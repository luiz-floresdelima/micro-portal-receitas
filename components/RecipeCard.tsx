import { Recipe } from "@/types/recipe";
import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({
  recipe,
  highlight = false,
}: {
  recipe: Recipe;
  highlight?: boolean;
}) {
  return (
    <Link
      href={`/receitas/${recipe.slug}`}
      className={`block rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all bg-white ${
        highlight ? "border-2 border-pink-400" : "border border-gray-200"
      }`}
      aria-label={`Ver receita de ${recipe.title}`}
    >
      <Image
        src="https://placehold.co/600x400"
        alt={`Foto de ${recipe.title}`}
        className="w-full h-48 object-cover"
        priority={highlight}
        loading={highlight ? "eager" : "lazy"}
        unoptimized
        width={600}
        height={400}
        title={recipe.title}
      />
      <div className="p-4">
        <span className="text-xs uppercase text-pink-600">{recipe.category}</span>
        <h3 className="text-lg font-semibold mt-1">{recipe.title}</h3>
        {recipe.teaser && <h4 className="text-sm text-gray-600 mt-2">{recipe.teaser}</h4>}
        <div className="text-xs text-gray-500 mt-3">
          Por {recipe.author} •{" "}
          {new Date(recipe.publishedAt).toLocaleDateString("pt-BR")}
        </div>
      </div>
    </Link>
  );
}
