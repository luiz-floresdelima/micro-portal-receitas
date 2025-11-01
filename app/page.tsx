import RecipeCard from "@/components/RecipeCard";
import { constants } from "@/data/constants";
import { generateBreadcrumbList, generateItemListLdJson, generateOrganizationLdJson, generateSiteNavigationLdJson, generateWebPage, generateWebSiteLdJson } from "@/lib/ld-json";
import { getAllRecipes } from "@/lib/recipes";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: constants.SITE_NAME,
    description:
      constants.SITE_DESCRIPTION,
    keywords: [
      "receitas",
      "culinária",
      "sobremesa",
      "doce",
      "comida caseira",
      "micro portal de receitas",
    ],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: constants.SITE_NAME,
      title: constants.SITE_NAME,
      description: constants.SITE_DESCRIPTION,
      images: [
        {
          url: constants.SITE_META_IMAGE,
          width: 1200,
          height: 630,
          alt: `Imagem de receitas deliciosas do ${constants.SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: constants.SITE_TWITTER,
      title: constants.SITE_NAME,
      description: constants.SITE_DESCRIPTION,
      images: [constants.SITE_META_IMAGE],
    },
    other: {
      "theme-color": "#ffffff",
    },
  };
}

export default async function HomePage() {
  const recipes = await getAllRecipes();

  const featured = recipes.slice(0, 3);
  const latest = [...recipes].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const itemListJsonLd = generateItemListLdJson(featured, "Receitas em destaque");
  const breadcrumbJsonLd = generateBreadcrumbList([
    { name: "Home", url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com" },
  ]);

  return (
    <main className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section>
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Destaques</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} highlight />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Últimas Receitas</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </main>
  );
}
