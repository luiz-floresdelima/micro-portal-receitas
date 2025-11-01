import { BaseTaxonomy } from "./taxonomy";

export type Category = BaseTaxonomy

export interface CategoryPageProps {
  params: { category: string };
}
