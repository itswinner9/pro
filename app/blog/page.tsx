import { getPublishedBlogPosts } from "@/lib/blog-posts";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog | PlusPro Services - Home Repair Tips for Lower Mainland BC",
  description: "Expert home repair tips, plumbing advice, and maintenance guides for Lower Mainland BC homeowners. Serving Vancouver, Surrey, Burnaby, and surrounding areas.",
  keywords: "home repair blog Lower Mainland, plumbing tips Vancouver, maintenance advice BC, home improvement Surrey, handyman tips Burnaby",
  openGraph: {
    title: "Blog | PlusPro Services - Home Repair Tips for Lower Mainland BC",
    description: "Expert home repair tips, plumbing advice, and maintenance guides for Lower Mainland BC homeowners.",
    type: "website",
    locale: "en_CA",
  },
  alternates: {
    canonical: "https://pluspro.ca/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | PlusPro Services - Home Repair Tips for Lower Mainland BC",
    description: "Expert home repair tips, plumbing advice, and maintenance guides for Lower Mainland BC homeowners.",
    images: ["https://pluspro.ca/og.png"],
  },
};

export default function BlogPage() {
  const blogs = getPublishedBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[var(--primary-color)] to-blue-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-quantum text-4xl md:text-6xl font-bold mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Expert tips, news, and insights about home repair and maintenance in Lower Mainland, BC
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const publishedDate = blog.published_at
                ? new Date(blog.published_at)
                : new Date(blog.created_at);
              const timeAgo = getTimeAgo(publishedDate);

              return (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-[var(--primary-color)]/30 transition-all duration-300 flex flex-col"
                >
                  {/* Featured Image */}
                  {blog.featured_image ? (
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <Image
                        src={blog.featured_image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {blog.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--primary-color)] text-white backdrop-blur-sm">
                            {blog.category}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-[var(--primary-color)] to-blue-700 flex items-center justify-center relative">
                      {blog.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
                            {blog.category}
                          </span>
                        </div>
                      )}
                      <div className="text-white/50 text-4xl">📝</div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="font-semibold text-xl text-slate-900 mb-3 group-hover:text-[var(--primary-color)] transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    {blog.excerpt && (
                      <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
                        {blog.excerpt}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        {blog.author && (
                          <span className="flex items-center gap-1">
                            <span>{blog.author}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {timeAgo}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{blog.views ?? 0}</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="mt-4 flex items-center text-[var(--primary-color)] font-semibold text-sm group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">No blog posts yet</h2>
            <p className="text-slate-500">Check back soon for expert tips and insights!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
