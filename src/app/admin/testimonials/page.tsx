import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Testimonials</h1>
          <p className="mt-1 text-sm text-slate-500">{testimonials.length} testimonials</p>
        </div>
        <Button variant="luxury" asChild>
          <Link href="/admin/testimonials/new"><Plus className="mr-2 h-4 w-4" /> Add Testimonial</Link>
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-slate-500">{t.university} - {t.course}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{t.content}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${t.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-100 text-slate-600"}`}>
                {t.isActive ? "Active" : "Inactive"}
              </span>
              <Link href={`/admin/testimonials/${t.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400">Edit</Link>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="col-span-full text-center text-sm text-slate-500 py-8">No testimonials yet</p>
        )}
      </div>
    </div>
  );
}
