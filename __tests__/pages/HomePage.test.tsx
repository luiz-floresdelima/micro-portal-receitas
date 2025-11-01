/**
 * @jest-environment jsdom
*/
import '../../__mocks__/lib/ld-json.mock';
import '../../__mocks__/lib/recipes.mock';

import HomePage, { generateMetadata } from '@/app/page';
import { cleanup, render, screen } from '@testing-library/react'
import { mockGetAllRecipes } from '../../__mocks__/lib/recipes.mock';
import { mockGenerateBreadcrumbList, mockGenerateItemListLdJson } from '../../__mocks__/lib/ld-json.mock';

describe('Home Page', () => {

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterEach(cleanup); 

  it('should render correctly', async () => {
    render(await HomePage())
    expect(screen.getByRole('heading', { name: /Destaques/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Últimas Receitas/i, level: 2 })).toBeInTheDocument();
  });

  it('should display only 3 featured recipes', async () => {
    render(await HomePage())
    const featuredCards = screen.getByRole("heading", { name: /Destaques/i }).closest('section')!.querySelectorAll('a');
    expect(featuredCards.length).toBe(3);
  });

  it('should display all latest recipes', async () => {
    render(await HomePage())
    const latestCards = screen.getByRole("heading", { name: /Últimas Receitas/i }).closest('section')!.querySelectorAll('a');
    expect(latestCards.length).toBe(4);
  });

  it('should include JSON-LD scripts', async () => {
    const { container } = render(await HomePage())
    const jsonLdScripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(jsonLdScripts.length).toBe(2);
  });

  it('should generate correct JSON-LD for ItemList and BreadcrumbList', async () => {
    render(await HomePage())
    expect(mockGenerateItemListLdJson).toHaveBeenCalledTimes(1);
    expect(mockGenerateBreadcrumbList).toHaveBeenCalledTimes(1);
  });

  it('should get all recipes on server side', async () => {
    render(await HomePage())
    expect(mockGetAllRecipes).toHaveBeenCalledTimes(1);
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata();
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.twitter).toBeDefined();
  });
});