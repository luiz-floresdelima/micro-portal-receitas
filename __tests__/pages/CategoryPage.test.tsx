import { render, screen } from "@testing-library/react";
import '../../__mocks__/lib/ld-json.mock';
import CategoryPage, {
    generateStaticParams,
    generateMetadata,
} from "@/app/categorias/[category]/page";
import { getAllCategories } from "@/lib/categories";
import { getRecipesByCategory } from "@/lib/recipes";
import { generateItemListLdJson, generateBreadcrumbList } from "@/lib/ld-json";
import { constants } from "@/data/constants";
import { recipesMock } from "@/__mocks__/data/recipes.mock";

jest.mock("@/lib/categories");
jest.mock("@/lib/recipes");
jest.mock("@/components/RecipeCard", () => ({
    __esModule: true,
    default: ({ recipe }: any) => <div data-testid="recipe-card">{recipe.title}</div>,
}));

describe("CategoryPage", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        (getRecipesByCategory as jest.Mock).mockResolvedValue(recipesMock.slice(0, 2));
    });

    it("deve renderizar corretamente o título e as receitas", async () => {
        const { findAllByTestId, findByText } = render(
            await CategoryPage({ params: { category: "sobremesas" } })
        );

        expect(await findByText("Categoria: sobremesas")).toBeInTheDocument();
        const cards = await findAllByTestId("recipe-card");
        expect(cards).toHaveLength(2);
        expect(cards[0]).toHaveTextContent("Bolo de Chocolate");
        expect(cards[1]).toHaveTextContent("Torta de Frutas");
    });

    it("deve exibir mensagem quando não houver receitas", async () => {
        (getRecipesByCategory as jest.Mock).mockResolvedValue([]);
        render(await CategoryPage({ params: { category: "massas" } }));

        expect(await screen.findByText("Nenhuma receita encontrada nesta categoria.")).toBeInTheDocument();
    });

    it("deve gerar metadados corretos", async () => {
        const result = await generateMetadata({ params: { category: "bebidas" } });

        expect(result.title).toBe(`Receitas de Bebidas | ${constants.SITE_NAME}`);
        expect(result.description).toContain("deliciosas receitas de bebidas");
        expect(result.openGraph?.url).toBe("/category/bebidas");
    });

    it("deve retornar as categorias corretamente", async () => {
        (getAllCategories as jest.Mock).mockResolvedValue([
            { slug: "massas", label: "Massas" },
            { slug: "sobremesas", label: "Sobremesas" },
        ]);

        const params = await generateStaticParams();
        expect(params).toEqual([{ category: "massas" }, { category: "sobremesas" }]);
    });
});

