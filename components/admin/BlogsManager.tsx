"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, Eye, FileText, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import RichTextEditor from "./RichTextEditor";

interface Blog {
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

export default function BlogsManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    author: "",
    category: "",
    tags: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    is_published: false,
  });

  const supabase = createClient();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const blogData: any = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt || null,
        content: formData.content,
        featured_image: formData.featured_image || null,
        author: formData.author || null,
        category: formData.category || null,
        tags: tagsArray,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        meta_keywords: formData.meta_keywords || null,
        is_published: formData.is_published,
      };

      if (formData.is_published && !editing) {
        blogData.published_at = new Date().toISOString();
      }

      if (editing) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", editing);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blogs").insert(blogData);
        if (error) throw error;
      }

      setShowForm(false);
      setEditing(null);
      resetForm();
      loadBlogs();
    } catch (error: any) {
      console.error("Error saving blog:", error);
      alert(error.message || "Error saving blog. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      author: "",
      category: "",
      tags: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      is_published: false,
    });
  };

  const handleEdit = (blog: Blog) => {
    setEditing(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content,
      featured_image: blog.featured_image || "",
      author: blog.author || "",
      category: blog.category || "",
      tags: blog.tags.join(", "),
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || "",
      meta_keywords: blog.meta_keywords || "",
      is_published: blog.is_published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;
      loadBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Blog Posts</h2>
          <Button
            onClick={() => {
              setShowForm(true);
              setEditing(null);
              resetForm();
            }}
            className="bg-[#1e3a8a] hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="p-8 border-b border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">
                {editing ? "Edit Blog Post" : "Create New Blog Post"}
              </h3>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                  resetForm();
                }}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Close
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-semibold text-slate-900">
                  Title *
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                      slug: formData.slug || generateSlug(e.target.value),
                    })
                  }
                  required
                  className="text-lg"
                  placeholder="Enter blog post title"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-base font-semibold text-slate-900">
                  Slug (URL)
                </Label>
                <Input
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="auto-generated from title"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-slate-500">
                  URL-friendly version (e.g., &quot;my-blog-post&quot;)
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-base font-semibold text-slate-900">
                Excerpt
              </Label>
              <p className="text-sm text-slate-500 mb-2">
                A short preview text that appears on the blog listing page
              </p>
              <Textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                    placeholder="Write a brief summary of your blog post&hellip;"
                rows={3}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-base font-semibold text-slate-900">
                Content *
              </Label>
              <p className="text-sm text-slate-500 mb-4">
                Use the rich text editor below to format your content. You can add images, links, lists, and more.
              </p>
              <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) =>
                    setFormData({ ...formData, content: value })
                  }
                    placeholder="Start writing your blog post here&hellip;"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-semibold text-slate-900">
                  Featured Image URL
                </Label>
                <Input
                  value={formData.featured_image}
                  onChange={(e) =>
                    setFormData({ ...formData, featured_image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />
                <p className="text-xs text-slate-500">
                  Full URL to the featured image
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-base font-semibold text-slate-900">
                  Author
                </Label>
                <Input
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  placeholder="Author name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-semibold text-slate-900">
                  Category
                </Label>
                <Input
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g., Plumbing, Tips, News"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-base font-semibold text-slate-900">
                  Tags (comma-separated)
                </Label>
                <Input
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="plumbing, repair, tips, Lower Mainland"
                />
                <p className="text-xs text-slate-500">
                  Separate multiple tags with commas
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">SEO Settings</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Optimize your blog post for search engines. These fields help improve visibility in Google and other search engines.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-slate-900">
                    Meta Title
                  </Label>
                  <Input
                    value={formData.meta_title}
                    onChange={(e) =>
                      setFormData({ ...formData, meta_title: e.target.value })
                    }
                    placeholder="SEO title (defaults to blog title if empty)"
                    maxLength={60}
                  />
                  <p className="text-xs text-slate-500">
                    Recommended: 50-60 characters ({formData.meta_title.length}/60)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-slate-900">
                    Meta Description
                  </Label>
                  <Textarea
                    value={formData.meta_description}
                    onChange={(e) =>
                      setFormData({ ...formData, meta_description: e.target.value })
                    }
                    rows={3}
                    placeholder="SEO description that appears in search results&hellip;"
                    maxLength={160}
                    className="resize-none"
                  />
                  <p className="text-xs text-slate-500">
                    Recommended: 150-160 characters ({formData.meta_description.length}/160)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-slate-900">
                    Meta Keywords
                  </Label>
                  <Input
                    value={formData.meta_keywords}
                    onChange={(e) =>
                      setFormData({ ...formData, meta_keywords: e.target.value })
                    }
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-xs text-slate-500">
                    Comma-separated keywords related to your blog post
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) =>
                    setFormData({ ...formData, is_published: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-slate-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                />
                <div>
                  <span className="text-base font-semibold text-slate-900 block">Publish</span>
                  <span className="text-sm text-slate-500">
                    {formData.is_published 
                      ? "This post will be visible on the website" 
                      : "Save as draft (not visible to public)"}
                  </span>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                  resetForm();
                }}
                className="px-6"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[var(--primary-color)] hover:bg-blue-700 px-8 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editing ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </form>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-[#1e3a8a]" />
                    <h3 className="font-semibold text-slate-900">{blog.title}</h3>
                    {blog.is_published ? (
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">
                        Draft
                      </span>
                    )}
                  </div>
                  {blog.excerpt && (
                    <p className="text-sm text-slate-600 mb-2">{blog.excerpt}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>/{blog.slug}</span>
                    {blog.category && <span>Category: {blog.category}</span>}
                    <span>Views: {blog.views}</span>
                    <span>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {blog.is_published && (
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="p-2 hover:bg-blue-100 rounded"
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </Link>
                  )}
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 hover:bg-blue-100 rounded"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="p-2 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {blogs.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No blog posts yet. Click &quot;New Post&quot; to create one.
          </div>
        )}
      </div>
    </div>
  );
}

