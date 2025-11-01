export const mockGenerateItemListLdJson = jest.fn().mockReturnValue({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Test description",
  "numberOfItems": 4,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": `www.example.com`,
      "name": 'Test Item 1',
      "image": 'www.example.com/image1.jpg',
      "description": 'Description for Test Item 1',
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": `www.example.com`,
      "name": 'Test Item 2',
      "image": 'www.example.com/image2.jpg',
      "description": 'Description for Test Item 2',
    },
    {
      "@type": "ListItem",
      "position": 3,
      "url": `www.example.com`,
      "name": 'Test Item 3',
      "image": 'www.example.com/image3.jpg',
      "description": 'Description for Test Item 3',
    },
    {
      "@type": "ListItem",
      "position": 4,
      "url": `www.example.com`,
      "name": 'Test Item 4',
      "image": 'www.example.com/image4.jpg',
      "description": 'Description for Test Item 4',
    },
  ]
});

export const mockGenerateBreadcrumbList = jest.fn().mockReturnValue({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "www.example.com",
    }
  ],
});

export const mockGenerateRecipeLdJson = jest.fn().mockReturnValue({
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Test Recipe",
  "image": [
    "www.example.com/recipe-image.jpg"
  ],
  "author": {
    "@type": "Person",
    "name": "Test Author"
  },
  "description": "This is a test recipe description.",
  "prepTime": "PT30M",
  "cookTime": "PT1H",
  "recipeYield": "4 porções",
  "recipeCategory": "Test Category",
  "keywords": "test, recipe, mock",
  "recipeIngredient": [
    "1 cup of test ingredient",
    "2 tablespoons of mock ingredient"
  ],
  "recipeInstructions": [
    {
      "@type": "HowToStep",
      "text": "Mix all test ingredients."
    },
    {
      "@type": "HowToStep",
      "text": "Cook the mixture for 1 hour."
    }
  ]
});

jest.mock('@/lib/ld-json', () => ({
  generateItemListLdJson: mockGenerateItemListLdJson,
  generateBreadcrumbList: mockGenerateBreadcrumbList,
  generateRecipeLdJson: mockGenerateRecipeLdJson,
}));