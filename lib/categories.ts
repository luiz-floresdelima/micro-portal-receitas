import path from "path";
import fs from "fs";
import { Category } from "@/types/category";
import { Recipe } from "@/types/recipe";

const allRecipesPath = path.join(process.cwd(), "data/recipes.json");

async function getAllCategories(): Promise<Category[]> {
  const data = fs.readFileSync(allRecipesPath, "utf-8");
  const json = JSON.parse(data);
  const recipes: Recipe[] = json.items;

  const categories = recipes.map((recipe) => recipe.category);
  const uniqueCategories = Array.from(new Set(categories));

  const categoryMap = uniqueCategories.map((cat) => {
    return {
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      slug: cat,
    };
  });

  return categoryMap;
}

export { getAllCategories }