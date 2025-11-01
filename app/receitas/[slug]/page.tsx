import { generateBreadcrumbList, generateRecipeLdJson } from "@/lib/ld-json";
import { getRecipeBySlug, getAllRecipes } from "@/lib/recipes";
import { RecipePageProps } from "@/types/recipe";
import { Metadata } from "next";

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) {
    return { title: "Receita não encontrada" };
  }

  const seo = recipe.seo;

  return {
    title: seo.title || recipe.title,
    description: seo.description || recipe.teaser,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${seo.canonical}`,
    },
    openGraph: {
      title: seo.title || recipe.title,
      description: seo.description || recipe.teaser,
      type: "article",
      url: process.env.NEXT_PUBLIC_SITE_URL,
      images: [recipe.image],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title || recipe.title,
      description: seo.description || recipe.teaser,
      images: [recipe.image],
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  const recipeJsonLd = generateRecipeLdJson(recipe);
  const breadcrumbJsonLd = generateBreadcrumbList([
    { name: "Home", url: `${process.env.NEXT_PUBLIC_SITE_URL}` },
    { name: `${recipe? recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1) : "Categoria"}`, url: `${process.env.NEXT_PUBLIC_SITE_URL}/categorias/${recipe?.category}` },
    { name: `${recipe? recipe.title : "Receita"}`, url: `${process.env.NEXT_PUBLIC_SITE_URL}/receitas/${recipe?.slug}` },
  ]);

  if (!recipe) {
    return <div className="text-center text-red-600 mt-10">Receita não encontrada 😢</div>;
  }

  return (
    <main className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <img
        src="https://placehold.co/600x400"
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold text-pink-600 mb-4">{recipe.title}</h1>

      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <p>{recipe.author}</p>
        <p>
          {recipe.prepTime} min • {recipe.servings} porções
        </p>
      </div>

      <p className="text-gray-700 mb-6">{recipe.description}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ingredientes</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {recipe.ingredients.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Modo de preparo</h2>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          {recipe.steps.map((step: string, i: number) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      {recipe.tags?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm uppercase text-gray-500 mb-1">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
