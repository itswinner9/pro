import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar, Eye, User, ArrowLeft, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author: string | null;
  category: string | null;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  is_published: boolean;
  published_at: string | null;
  views: number;
  created_at: string;
  updated_at: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error) {
      console.error("Error fetching blog post:", error);
      if (error.code === 'PGRST116') {
        return null;
      }
      return null;
    }

    if (!data) {
      return null;
    }

    // Increment views (non-blocking) - only if views column exists
    try {
      if (data.views !== undefined) {
        const currentViews = typeof data.views === 'number' ? data.views : 0;
        await supabase
          .from("blogs")
          .update({ views: currentViews + 1 })
          .eq("id", data.id);
      }
    } catch (viewError) {
      console.warn("Failed to increment views:", viewError);
    }

    // Ensure all fields have safe defaults
    const blogData: BlogPost = {
      id: data.id || '',
      title: data.title || 'Untitled',
      slug: data.slug || '',
      excerpt: data.excerpt || null,
      content: data.content || '',
      featured_image: data.featured_image || null,
      author: data.author || null,
      category: data.category || null,
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [String(data.tags)] : []),
      meta_title: data.meta_title || null,
      meta_description: data.meta_description || null,
      meta_keywords: data.meta_keywords || null,
      is_published: data.is_published ?? (data.published !== undefined ? data.published : false),
      published_at: data.published_at || null,
      views: typeof data.views === 'number' ? data.views : 0,
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || data.created_at || new Date().toISOString(),
    };

    return blogData;
  } catch (err) {
    console.error("Error in getBlogPost:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogPost(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found | PlusPro Services",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://plusproservices.ca";
  
  return {
    title: blog.meta_title || `${blog.title} | PlusPro Services Blog`,
    description: blog.meta_description || blog.excerpt || `Read about ${blog.title} on PlusPro Services blog. Expert home repair tips for Lower Mainland BC.`,
    keywords: blog.meta_keywords || `${(blog.tags && Array.isArray(blog.tags) ? blog.tags.join(", ") : "")}, Lower Mainland BC, home repair, Vancouver, Surrey, Burnaby`,
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt || "",
      type: "article",
      url: `${siteUrl}/blog/${blog.slug}`,
      images: blog.featured_image ? [blog.featured_image] : [],
      publishedTime: blog.published_at || undefined,
      locale: "en_CA",
    },
    alternates: {
      canonical: `${siteUrl}/blog/${blog.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt || "",
      images: blog.featured_image ? [blog.featured_image] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogPost(slug);

  if (!blog) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://plusproservices.ca";
  const publishedDate = blog.published_at 
    ? new Date(blog.published_at) 
    : new Date(blog.created_at);
  
  // Structured data for blog post
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || blog.meta_description || "",
    image: blog.featured_image || "",
    datePublished: blog.published_at || blog.created_at,
    dateModified: blog.updated_at || blog.created_at,
    author: {
      "@type": "Organization",
      name: "PlusPro Services",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "PlusPro Services",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${blog.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      <div className="min-h-screen bg-white">
        {/* Header with Back Button */}
        <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-[var(--primary-color)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Blog</span>
            </Link>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 py-12" itemScope itemType="https://schema.org/BlogPosting">
          {/* Category Badge */}
          {blog.category && (
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                {blog.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="font-quantum text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight" itemProp="headline">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-8 pb-8 border-b border-slate-200">
            {blog.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span itemProp="author">{blog.author}</span>
              </div>
            )}
            {blog.published_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={blog.published_at} itemProp="datePublished">
                  {publishedDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{Math.ceil((blog.content.length || 0) / 1000)} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{blog.views || 0} views</span>
            </div>
          </div>

          {/* Featured Image */}
          {blog.featured_image && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative aspect-video">
                <Image
                  src={blog.featured_image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  itemProp="image"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                />
              </div>
            </div>
          )}

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-xl text-slate-700 mb-10 font-medium leading-relaxed border-l-4 border-[var(--primary-color)] pl-6" itemProp="description">
              {blog.excerpt}
            </p>
          )}

          {/* Content */}
          <div
            className="prose prose-lg prose-slate max-w-none mb-12 prose-headings:font-quantum prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-[var(--primary-color)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg prose-strong:text-slate-900 prose-ul:list-disc prose-ol:list-decimal"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-8 border-t border-slate-200 mb-12">
              <span className="text-sm font-semibold text-slate-700 mr-2">Tags:</span>
              {blog.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-[var(--primary-color)] hover:text-white transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Share Section */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="font-semibold text-lg text-slate-900 mb-4">Share this article</h3>
            <div className="flex items-center gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${siteUrl}/blog/${blog.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </a>
              <Link
                href="/contact"
                className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color)]/90 transition-colors font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
