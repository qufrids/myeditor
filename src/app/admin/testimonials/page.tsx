import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Testimonials</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">{testimonials.length} testimonials</p>
        </div>
        <Button variant="luxury" size="sm" asChild>
          <Link href="/admin/testimonials/new"><Plus className="mr-1.5 h-3.5 w-3.5" /> Add Testimonial</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-slate-200/60 bg-white p-5 dark:border-white/[0.04] dark:bg-white/[0.02]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-slate-900 truncate dark:text-white">{t.name}</p>
                <p className="text-[12px] text-slate-400 truncate">{t.university}{t.course ? ` · ${t.course}` : ""}</p>
              </div>
              <div className="flex shrink-0 gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="mt-3 text-[13px] leading-[1.6] text-slate-600 dark:text-slate-400 line-clamp-3">{t.content}</p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5 dark:border-white/[0.04]">
              <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${t.isActive ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-slate-400"}`}>
                {t.isActive ? "Active" : "Inactive"}
              </span>
              <Link href={`/admin/testimonials/${t.id}`} className="text-[13px] font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Edit</Link>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="col-span-full py-10 text-center text-[13px] text-slate-400">No testimonials yet</p>
        )}
      </div>
    </div>
  );
}
