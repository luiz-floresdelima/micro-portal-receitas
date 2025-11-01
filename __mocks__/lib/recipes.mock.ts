import { recipesMock } from "../data/recipes.mock";

export const mockGetAllRecipes = jest.fn().mockReturnValue(recipesMock);
export const mockGetRecipeBySlug = jest.fn().mockImplementation((slug: string) => {
  const recipe= recipesMock.find(r => r.slug === slug);
  return Promise.resolve(recipe || null);
});
export const mockGetRecipesByCategory = jest.fn().mockImplementation((slug: string) => {
  const recipe= recipesMock.find(r => r.slug === slug);
  return Promise.resolve(recipe || null);
});
export const mockGetRecipesByTag = jest.fn().mockImplementation((slug: string) => {
  const recipe= recipesMock.find(r => r.slug === slug);
  return Promise.resolve(recipe || null);
});

jest.mock('@/lib/recipes', () => ({
  getAllRecipes: mockGetAllRecipes,
  getRecipeBySlug: mockGetRecipeBySlug,
}));

