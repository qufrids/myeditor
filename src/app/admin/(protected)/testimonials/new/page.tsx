"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", university: "", course: "", rating: 5, content: "",
    isVerified: true, isFeatured: false, isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    router.push("/admin/testimonials");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">New Testimonial</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {[
          { label: "Name", key: "name", required: true },
          { label: "University", key: "university" },
          { label: "Course", key: "course" },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{field.label}</label>
            <input type="text" required={field.required}
              value={form[field.key as keyof typeof form] as string}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rating (1-5)</label>
          <input type="number" min={1} max={5} value={form.rating}
            onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content</label>
          <textarea rows={4} required value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="rounded" /> Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded" /> Active
          </label>
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="luxury" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Testimonial"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
