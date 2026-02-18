"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function NewServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", shortDesc: "", icon: "", heroTitle: "", heroSubtitle: "",
    metaTitle: "", metaDesc: "", isActive: true, sortOrder: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    router.push("/admin/services");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">New Service</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {[
          { label: "Title", key: "title", required: true },
          { label: "Short Description", key: "shortDesc" },
          { label: "Icon (Lucide name)", key: "icon" },
          { label: "Hero Title", key: "heroTitle" },
          { label: "Hero Subtitle", key: "heroSubtitle" },
          { label: "Meta Title", key: "metaTitle" },
          { label: "Meta Description", key: "metaDesc" },
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
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
          <textarea rows={5} required value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
          <label className="text-sm text-slate-700 dark:text-slate-300">Active</label>
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="luxury" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Service"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
