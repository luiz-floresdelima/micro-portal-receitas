import { constants } from "@/data/constants";
import { RecipeDetails } from "@/types/recipe";
import { getAllCategories } from "./categories";
import { ItemListBase } from "@/types/item-list";

const generateWebSiteLdJson = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": constants.SITE_NAME,
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.NEXT_PUBLIC_SITE_URL}/busca?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

const generateItemListLdJson = (list: ItemListBase[], description: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": description,
    "numberOfItems": list.length,
    "itemListElement": list.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${item.slug}`,
      "name": item.title,
      "image": item.image,
      "description": item.description || item.teaser,
    })),
  };
}

const generateOrganizationLdJson = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": constants.SITE_NAME,
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
    },
    "sameAs": [
      constants.SITE_FACEBOOK,
      constants.SITE_INSTAGRAM,
      constants.SITE_TWITTER
    ],
  }
}

const generateRecipeLdJson = (recipe: RecipeDetails | null) => {
  if (!recipe) {
    return {};
  }

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe?.title,
    "image": [recipe?.image],
    "description": recipe?.description,
    "author": {
      "@type": "Person",
      "name": recipe?.author || "Equipe MicroPortal",
    },
    "datePublished": recipe?.publishedAt || "2025-01-01",
    "prepTime": recipe?.prepTime ? `PT${recipe.prepTime}M` : undefined,
    "totalTime": recipe?.prepTime ? `PT${recipe.prepTime}M` : undefined,
    "recipeYield": recipe?.servings ? `${recipe.servings} porções` : undefined,
    "recipeCategory": recipe?.category,
    "keywords": recipe?.tags?.join(", "),
    "recipeIngredient": recipe?.ingredients,
    "recipeInstructions": recipe?.steps.map((step: string) => ({
      "@type": "HowToStep",
      "text": step,
    })),
  };
}

const generateSiteNavigationLdJson = async () => {

  const categories = await getAllCategories();

  const categoryElements = categories.map((category, index) => ({
    "@type": "SiteNavigationElement",
    "position": index + 2,
    "name": category.label,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/categoria/${category.slug}`
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Home",
        "url": process.env.NEXT_PUBLIC_SITE_URL
      },
      ...categoryElements,
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Busca",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/busca`
      }
    ]
  }
}

const generateBreadcrumbList = (items: { name: string; url: string }[]) => {
  const itemListElements = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemListElements,
  };
}

const generateWebPage = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": constants.SITE_NAME,
    "description": constants.SITE_DESCRIPTION,
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "isPartOf": {
      "@type": "WebSite",
      "name": constants.SITE_NAME,
      "url": process.env.NEXT_PUBLIC_SITE_URL
    },
    "about": {
      "@type": "Thing",
      "name": "Culinária"
    }
  }
}

export { generateWebSiteLdJson, generateItemListLdJson, generateOrganizationLdJson, generateRecipeLdJson, generateSiteNavigationLdJson, generateBreadcrumbList, generateWebPage };
