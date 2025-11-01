import path from "path";
import fs from "fs";
import { RecipeDetails } from "@/types/recipe";
import { Tag } from "@/types/tag";

const recipesBySlugPath = path.join(process.cwd(), "data/recipes_by_slug.json");

async function getAllTags(): Promise<Tag[]> {
  const data = fs.readFileSync(recipesBySlugPath, "utf-8");
  const json = JSON.parse(data);
  const recipes: Record<string, RecipeDetails> = json;

  const tags = Object.values(recipes).map((recipe) => recipe.tags || []).flat();
  const uniqueTags = Array.from(new Set(tags));

  const tagMap = uniqueTags.map((cat) => {
    return {
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      slug: cat,
    };
  });

  return tagMap;
}

export { getAllTags }