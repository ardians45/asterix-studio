import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.asterixstudio.site'

  // Fetch all published posts for dynamic blog routes
  let postEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      select: { slug: true, publishedAt: true }
    })

    postEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Sitemap: Error fetching posts', error)
  }

  // Static routes
  const staticRoutes = [
    '',
    '/blog',
    '/contact',
    '/portfolio',
    '/pricing',
    '/services',
    '/projects',
  ]

  // Project detail pages (based on folder structure)
  const projectRoutes = [
    '/projects/3d-tetris-grunge',
    '/projects/bantu-platform',
    '/projects/cactastic',
    '/projects/career-connect',
    '/projects/gogo-groceries',
    '/projects/greenify',
    '/projects/link-aja-kas',
    '/projects/rapor-lamaholot',
  ]

  const pages = [...staticRoutes, ...projectRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  return [...pages, ...postEntries]
}
