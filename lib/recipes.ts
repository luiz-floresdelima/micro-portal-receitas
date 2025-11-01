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

async function getAllRecipesDetails(): Promise<Record<string, RecipeDetails>> {
  const data = fs.readFileSync(recipesBySlugPath, "utf-8");
  const json = JSON.parse(data);
  return json || null;
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

async function getRecipesByTag(tag: string): Promise<Recipe[]> {
  const allRecipes = await getAllRecipesDetails();
  if (!allRecipes) {
    return [];
  }
  return Object.values(allRecipes).filter((recipe) => recipe.tags?.includes(tag));
}

export { getAllRecipes, getRecipeBySlug, getRecipesByCategory, getRecipesByTag }