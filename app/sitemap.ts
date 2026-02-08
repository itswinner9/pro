import { MetadataRoute } from 'next'
import { SERVICES, LOCATIONS } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://plusproservices.ca' // Update with your actual domain

  const routes = [
    '',
    '/services',
    '/about',
    '/reviews',
    '/contact',
    '/book-service',
    '/request-quote',
    '/blog',
  ]

  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const locationRoutes = LOCATIONS.map((location) => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Fetch published blog posts
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const supabase = await createClient()
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug, updated_at')
      .eq('is_published', true)

    if (blogs) {
      blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error)
  }

  const mainRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }))

  return [...mainRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes]
}

