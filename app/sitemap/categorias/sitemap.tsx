import { MetadataRoute } from 'next'
import { getAllCategories } from '@/lib/categories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getAllCategories()
  return categories.map((cat) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/categorias/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))
}
