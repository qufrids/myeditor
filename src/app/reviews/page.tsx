import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";

export const metadata = { title: "Reviews" };

export default async function ReviewsPage() {
  const testimonials = await prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" } });

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">Student Reviews</h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            See what our students have to say about their experience with EditorsForUK
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl border border-slate-200/50 bg-white p-6 dark:border-white/5 dark:bg-slate-800/50">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-4 border-t border-slate-100 pt-4 dark:border-white/5">
                <p className="font-medium text-slate-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-slate-500">{t.university}{t.course ? ` - ${t.course}` : ""}</p>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <p className="text-center text-slate-500 py-16">Reviews coming soon.</p>
        )}
      </div>
    </div>
  );
}
