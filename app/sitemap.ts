import { MetadataRoute } from 'next'
import { SERVICES, LOCATIONS } from '@/lib/types'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://plusproservices.ca' // Update with your actual domain

  const routes = [
    '',
    '/services',
    '/about',
    '/reviews',
    '/contact',
    '/book-service',
    '/request-quote',
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

  const mainRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }))

  return [...mainRoutes, ...serviceRoutes, ...locationRoutes]
}

