import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reviews" };

export default async function ReviewsPage() {
  const testimonials = await prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" } });

  return (
    <div className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">
            Student Reviews
          </h1>
          <p className="mt-4 text-[clamp(0.95rem,2vw,1.1rem)] text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            See what our students have to say about their experience with EditorsForUK
          </p>
        </div>

        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {testimonials.map((t) => (
            <div key={t.id} className="mb-5 break-inside-avoid rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-white/[0.04] dark:bg-white/[0.02] sm:p-7">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-[14px] leading-[1.75] text-slate-600 dark:text-slate-300">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-5 border-t border-slate-100 pt-4 dark:border-white/[0.04]">
                <p className="text-[14px] font-semibold text-slate-900 dark:text-white">{t.name}</p>
                <p className="mt-0.5 text-[12px] text-slate-500">{t.university}{t.course ? ` · ${t.course}` : ""}</p>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <p className="text-center text-slate-500 py-20 text-[15px]">Reviews coming soon.</p>
        )}
      </div>

      <div className="h-20 sm:h-24" />
    </div>
  );
}
