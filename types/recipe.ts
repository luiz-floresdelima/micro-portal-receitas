import { SEOData } from "./seo";

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  prepTime?: number;
  servings?: number;
  teaser?: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
}

export interface RecipeDetails extends Recipe {
  description: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  seo: SEOData;
}

export interface RecipePageProps {
  params: { slug: string };
}
