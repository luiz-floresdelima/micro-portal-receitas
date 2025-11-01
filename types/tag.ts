import { BaseTaxonomy } from "./taxonomy";

export type Tag = BaseTaxonomy

export interface TagPageProps {
  params: { tag: string };
}
