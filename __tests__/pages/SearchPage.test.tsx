/**
 * @jest-environment jsdom
 */
import { mockSearchRecipes } from "@/__mocks__/api/search";
import "../../__mocks__/lib/recipes.mock";

import { cleanup, render, screen } from "@testing-library/react";
import SearchPage from "@/app/busca/page";

describe("Search Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it("should render heading for search results when query is provided", async () => {
    const searchParams = { q: "bolo" };
    render(await SearchPage({ searchParams }));

    expect(
      screen.getByRole("heading", { name: /Resultados para: "bolo"/i, level: 1 })
    ).toBeInTheDocument();
  });

  it("should render heading for all recipes when no query provided", async () => {
    const searchParams = {};
    render(await SearchPage({ searchParams }));

    expect(
      screen.getByRole("heading", { name: /Todas as receitas/i, level: 1 })
    ).toBeInTheDocument();
  });

  it("should call searchRecipes with provided term", async () => {
    const searchParams = { q: "pudim" };
    render(await SearchPage({ searchParams }));
    expect(mockSearchRecipes).toHaveBeenCalledWith("pudim");
    expect(mockSearchRecipes).toHaveBeenCalledTimes(1);
  });

  it("should call searchRecipes with empty string if no term", async () => {
    const searchParams = {};
    render(await SearchPage({ searchParams }));
    expect(mockSearchRecipes).toHaveBeenCalledWith("");
  });

  it("should render recipe cards when results exist", async () => {
    const searchParams = { q: "bolo" };
    render(await SearchPage({ searchParams }));

    const cards = screen.getAllByRole("link");
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should show "Nenhuma receita encontrada" when list is empty', async () => {
    mockSearchRecipes.mockResolvedValueOnce([]);
    const searchParams = { q: "nada" };
    render(await SearchPage({ searchParams }));

    expect(screen.getByText(/Nenhuma receita encontrada/i)).toBeInTheDocument();
  });
});
