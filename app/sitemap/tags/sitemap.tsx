import { MetadataRoute } from 'next'
import { getAllTags } from '@/lib/tags'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tags/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))
}
