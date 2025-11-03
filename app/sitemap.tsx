import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  return [
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}`, lastModified: new Date() },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap/receitas/sitemap.xml`, lastModified: new Date() },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap/categorias/sitemap.xml`, lastModified: new Date() },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap/tags/sitemap.xml`, lastModified: new Date() },
  ];
}
