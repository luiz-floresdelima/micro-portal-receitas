export interface Category {
    label: string;
    slug: string;
}

export interface CategoryPageProps {
  params: { category: string };
}
