"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const inputCls = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

export default function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    question: "", answer: "", category: "", sortOrder: 0, isActive: true,
  });

  useEffect(() => {
    fetch(`/api/faqs/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          question: data.question ?? "",
          answer: data.answer ?? "",
          category: data.category ?? "",
          sortOrder: data.sortOrder ?? 0,
          isActive: data.isActive ?? true,
        });
        setFetching(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/faqs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/admin/faqs");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this FAQ? This cannot be undone.")) return;
    setDeleting(true);
    await fetch(`/api/faqs/${id}`, { method: "DELETE" });
    router.push("/admin/faqs");
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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit FAQ</h1>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-[13px] text-red-500 transition-colors hover:text-red-700 dark:hover:text-red-400 disabled:opacity-50"
        >
          {deleting ? "Deleting…" : "Delete FAQ"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Question</label>
          <input
            type="text"
            required
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            className={inputCls}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Answer</label>
          <textarea
            rows={5}
            required
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            className={inputCls}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={inputCls}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Sort Order</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            className={inputCls}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="rounded"
          />
          Active
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
