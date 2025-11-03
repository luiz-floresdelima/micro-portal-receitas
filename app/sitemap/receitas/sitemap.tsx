import { MetadataRoute } from "next";
import { getAllRecipes } from "@/lib/recipes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = await getAllRecipes();

  return recipes.map((recipe) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/receitas/${recipe.slug}`,
    lastModified: new Date(recipe.publishedAt || new Date()),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}
