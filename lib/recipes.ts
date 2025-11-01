import { Recipe, RecipeDetails } from "@/types/recipe";
import fs from "fs";
import path from "path";

const allRecipesPath = path.join(process.cwd(), "data/recipes.json");
const recipesBySlugPath = path.join(process.cwd(), "data/recipes_by_slug.json");

async function getAllRecipes(): Promise<Recipe[]> {
  const data = fs.readFileSync(allRecipesPath, "utf-8");
  const json = JSON.parse(data);
  return json.items;
}

async function getRecipeBySlug(slug: string): Promise<RecipeDetails | null> {
  const data = fs.readFileSync(recipesBySlugPath, "utf-8");
  const json = JSON.parse(data);
  return json[slug] || null;
}

async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  const allRecipes = await getAllRecipes();
  return allRecipes.filter((recipe) => recipe.category === category);
}

export { getAllRecipes, getRecipeBySlug, getRecipesByCategory }