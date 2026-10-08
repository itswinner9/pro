import { MetadataRoute } from "next";
import { SERVICES, LOCATIONS } from "@/lib/types";
import { getPublishedBlogPosts } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const routes = [
    "",
    "/services",
    "/about",
    "/careers",
    "/contact",
    "/reviews",
    "/book-service",
    "/request-quote",
    "/blog",
    "/privacy",
  ];

  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
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

  return [...mainRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes];
}
