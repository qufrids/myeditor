"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Trash2, ChevronLeft } from "lucide-react";

const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-[13px] text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/[0.06]";
const labelCls = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-400";

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex cursor-pointer items-center justify-between py-0.5">
      <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition-colors ${checked ? "bg-blue-500" : "bg-slate-200 dark:bg-white/10"}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-[18px]" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white dark:border-white/[0.04] dark:bg-white/[0.02]">
      <div className="border-b border-slate-100 px-6 py-4 dark:border-white/[0.04]">
        <h2 className="text-[13px] font-semibold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <div className="space-y-5 p-6">{children}</div>
    </div>
  );
}

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
      })
      .finally(() => setFetching(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
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
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/[0.06]">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Edit Blog Post</h1>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-medium text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/[0.08] disabled:opacity-50"
        >
          {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormCard title="Basic Info">
          <div>
            <label className={labelCls}>Title *</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Excerpt</label>
            <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={inputCls} />
          </div>
        </FormCard>

        <FormCard title="Content">
          <div>
            <label className={labelCls}>Body *</label>
            <textarea required rows={14} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={inputCls} />
          </div>
        </FormCard>

        <FormCard title="Media & SEO">
          <div>
            <label className={labelCls}>Cover Image URL</label>
            <input type="text" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} className={inputCls} placeholder="https://..." />
          </div>
          <div>
            <label className={labelCls}>Meta Title</label>
            <input type="text" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Meta Description</label>
            <input type="text" value={form.metaDesc} onChange={(e) => setForm({ ...form, metaDesc: e.target.value })} className={inputCls} />
          </div>
        </FormCard>

        <FormCard title="Publishing">
          <Toggle checked={form.isPublished} onChange={(v) => setForm({ ...form, isPublished: v })} label="Published (visible on site)" />
        </FormCard>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="inline-flex h-9 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 text-[13px] font-semibold text-white shadow-md transition-all hover:-translate-y-px hover:shadow-lg disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Save Changes
          </button>
          <Link href="/admin/blog" className="inline-flex h-9 items-center rounded-full border border-slate-200 px-5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/[0.04]">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
