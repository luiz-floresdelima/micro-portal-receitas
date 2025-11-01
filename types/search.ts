export interface SearchBarProps {
  onSearch: (term: string) => void;
}

export interface SearchPageProps {
  searchParams: { q?: string };
}