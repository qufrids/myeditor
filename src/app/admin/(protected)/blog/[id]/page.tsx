"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const inputCls = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", category: "", coverImage: "",
    metaTitle: "", metaDesc: "", isPublished: false,
  });

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title ?? "",
          excerpt: data.excerpt ?? "",
          content: data.content ?? "",
          category: data.category ?? "",
          coverImage: data.coverImage ?? "",
          metaTitle: data.metaTitle ?? "",
          metaDesc: data.metaDesc ?? "",
          isPublished: data.isPublished ?? false,
        });
        setFetching(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/admin/blog");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    setDeleting(true);
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    router.push("/admin/blog");
    router.refresh();
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Blog Post</h1>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-[13px] text-red-500 transition-colors hover:text-red-700 dark:hover:text-red-400 disabled:opacity-50"
        >
          {deleting ? "Deleting…" : "Delete Post"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Title", key: "title", required: true },
          { label: "Category", key: "category" },
          { label: "Cover Image URL", key: "coverImage" },
          { label: "Meta Title", key: "metaTitle" },
          { label: "Meta Description", key: "metaDesc" },
        ].map((field) => (
          <div key={field.key}>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{field.label}</label>
            <input
              type="text"
              required={field.required}
              value={form[field.key as keyof typeof form] as string}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className={inputCls}
            />
          </div>
        ))}

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Excerpt</label>
          <textarea
            rows={2}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className={inputCls}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Content</label>
          <textarea
            rows={12}
            required
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className={inputCls}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
            className="rounded"
          />
          Published
        </label>

        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="luxury" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
