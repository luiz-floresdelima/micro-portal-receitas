import RecipeCard from "@/components/RecipeCard";
import { constants } from "@/data/constants";
import { getAllCategories } from "@/lib/categories";
import { generateBreadcrumbList, generateItemListLdJson, generateOrganizationLdJson, generateSiteNavigationLdJson, generateWebPage, generateWebSiteLdJson } from "@/lib/ld-json";
import { getRecipesByCategory } from "@/lib/recipes";
import { CategoryPageProps } from "@/types/category";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const title = `Receitas de ${category.charAt(0).toUpperCase() + category.slice(1)} | ${constants.SITE_NAME}`;
  const description = `Confira deliciosas receitas de ${category}. Encontre ideias e inspirações para seu cardápio.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/category/${category}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const recipes = await getRecipesByCategory(category);

  const itemListJsonLd = generateItemListLdJson(recipes, `Receitas de ${category}`);
  const breadcrumbJsonLd = generateBreadcrumbList([
    { name: "Home", url: `${process.env.NEXT_PUBLIC_SITE_URL}` },
    { name: category.charAt(0).toUpperCase() + category.slice(1), url: `${process.env.NEXT_PUBLIC_SITE_URL}/category/${category}` },
  ]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <h1 className="text-2xl font-bold mb-4 capitalize">
        Categoria: {category}
      </h1>

      {recipes.length === 0 && (
        <p>Nenhuma receita encontrada nesta categoria.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((r) => (
          <RecipeCard key={r.slug} recipe={r} />
        ))}
      </div>
    </main>
  );
}
