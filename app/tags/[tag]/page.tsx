import { getAllTags } from "@/lib/tags";
import { getRecipesByTag } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";
import { generateBreadcrumbList, generateItemListLdJson } from "@/lib/ld-json";
import { TagPageProps } from "@/types/tag";
import { Metadata } from "next";
import { constants } from "@/data/constants";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getAllTags();
  return categories.map((tag) => ({
    tag: tag.slug,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const title = `Receitas de ${tag.charAt(0).toUpperCase() + tag.slice(1)} | ${constants.SITE_NAME}`;
  const description = `Confira deliciosas receitas de ${tag}. Encontre ideias e inspirações para seu cardápio.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/tags/${tag}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TagPage({ params }: TagPageProps ) {
  const { tag } = await params;
  const recipes = await getRecipesByTag(tag);

  const itemListJsonLd = generateItemListLdJson(recipes, `Receitas de ${tag}`);
  const breadcrumbJsonLd = generateBreadcrumbList([
    { name: "Home", url: `${process.env.NEXT_PUBLIC_SITE_URL}` },
    { name: tag.charAt(0).toUpperCase() + tag.slice(1), url: `${process.env.NEXT_PUBLIC_SITE_URL}/tags/${tag}` },
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
        Tag: {tag}
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
