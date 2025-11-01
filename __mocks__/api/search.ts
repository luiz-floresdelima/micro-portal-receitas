export const mockSearchRecipes = jest.fn(async (term: string) => {
  if (term === "nada") return [];
  return [
    {
      slug: "bolo-de-cenoura",
      title: "Bolo de Cenoura",
      description: "Bolo de cenoura com calda de chocolate",
      image: "/images/bolo.jpg",
      author: "Chef Teste",
      category: "doce",
      publishedAt: "2025-01-01T00:00:00Z",
      tags: ["bolo", "caseiro"],
      teaser: "Simples e delicioso",
    },
  ];
});

jest.mock('@/lib/api/search', () => ({
  searchRecipes: mockSearchRecipes,
}));