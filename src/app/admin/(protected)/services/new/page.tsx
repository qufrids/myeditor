"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ChevronLeft } from "lucide-react";

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
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/services" className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/[0.06]">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Add Service</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormCard title="Basic Info">
          <div>
            <label className={labelCls}>Title *</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="e.g. Dissertation Writing" />
          </div>
          <div>
            <label className={labelCls}>Short Description</label>
            <input type="text" value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} className={inputCls} placeholder="One-line summary shown in cards" />
          </div>
          <div>
            <label className={labelCls}>Full Description *</label>
            <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} placeholder="Detailed description of this service..." />
          </div>
        </FormCard>

        <FormCard title="Page Content">
          <div>
            <label className={labelCls}>Icon (Lucide name)</label>
            <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputCls} placeholder="e.g. BookOpen, FileText, GraduationCap" />
          </div>
          <div>
            <label className={labelCls}>Hero Title</label>
            <input type="text" value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} className={inputCls} placeholder="Main headline on the service page" />
          </div>
          <div>
            <label className={labelCls}>Hero Subtitle</label>
            <input type="text" value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} className={inputCls} placeholder="Subheading below the hero title" />
          </div>
        </FormCard>

        <FormCard title="SEO">
          <div>
            <label className={labelCls}>Meta Title</label>
            <input type="text" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} className={inputCls} placeholder="Browser tab / search result title" />
          </div>
          <div>
            <label className={labelCls}>Meta Description</label>
            <input type="text" value={form.metaDesc} onChange={(e) => setForm({ ...form, metaDesc: e.target.value })} className={inputCls} placeholder="Search result snippet (150–160 chars)" />
          </div>
        </FormCard>

        <FormCard title="Settings">
          <div>
            <label className={labelCls}>Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} className="w-28 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-[13px] text-slate-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white" />
          </div>
          <Toggle checked={form.isActive} onChange={(v) => setForm({ ...form, isActive: v })} label="Active (visible on site)" />
        </FormCard>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="inline-flex h-9 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 text-[13px] font-semibold text-white shadow-md transition-all hover:-translate-y-px hover:shadow-lg disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Create Service
          </button>
          <Link href="/admin/services" className="inline-flex h-9 items-center rounded-full border border-slate-200 px-5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/[0.04]">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
