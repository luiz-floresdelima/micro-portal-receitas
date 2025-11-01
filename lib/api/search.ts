import { RecipeDetails } from "@/types/recipe";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data/recipes.json");

async function searchRecipes(term: string): Promise<RecipeDetails[]> {
  await new Promise((res) => setTimeout(res, 100));

  const file = fs.readFileSync(dataPath, "utf-8");
  const data = JSON.parse(file);
  const recipes: RecipeDetails[] = data.items;

  if (!term) return recipes;

  const lowerTerm = term.toLowerCase();

  return recipes.filter((r) => {
    const inTitle = r.title.toLowerCase().includes(lowerTerm);
    const inDesc = r.description?.toLowerCase().includes(lowerTerm);
    const inTags = r.tags?.some((tag) => tag.toLowerCase().includes(lowerTerm));
    return inTitle || inDesc || inTags;
  });
}

export { searchRecipes };