import { MetadataRoute } from "next";
import { SERVICES, LOCATIONS } from "@/lib/types";
import { getPublishedBlogPosts } from "@/lib/blog-posts";
import { SERVICE_CITY_SLUGS, AREA_SLUGS } from "@/lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pluspro.ca";

  const routes = [
    "",
    "/services",
    "/areas",
    "/about",
    "/reviews",
    "/contact",
    "/book-service",
    "/request-quote",
    "/blog",
  ];

  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceCityRoutes = SERVICE_CITY_SLUGS.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const areaRoutes = AREA_SLUGS.map((slug) => ({
    url: `${baseUrl}/areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const locationRoutes = LOCATIONS.map((location) => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogs = getPublishedBlogPosts();
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updated_at || blog.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const mainRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : 0.9,
  }));

  return [...mainRoutes, ...serviceRoutes, ...serviceCityRoutes, ...areaRoutes, ...locationRoutes, ...blogRoutes];
}
