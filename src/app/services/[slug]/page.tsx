import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

/** Safely parse a Prisma Json field into a string array.
 *  Handles: null, string[], double-encoded JSON strings, and {title,...}[] objects. */
function toStringArray(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val.map((item) =>
      typeof item === "string" ? item : (item as { title?: string }).title ?? String(item)
    );
  }
  if (typeof val === "string") {
    try {
      const parsed: unknown = JSON.parse(val);
      if (Array.isArray(parsed)) {
        return parsed.map((item) =>
          typeof item === "string" ? item : (item as { title?: string }).title ?? String(item)
        );
      }
    } catch {
      return [];
    }
  }
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const service = await prisma.service.findUnique({ where: { slug } });
    if (!service) return {};
    return { title: service.metaTitle || service.title, description: service.metaDesc || service.shortDesc };
  } catch {
    return {};
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let service;
  try {
    service = await prisma.service.findUnique({
      where: { slug },
      include: { faqs: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } },
    });
  } catch {
    return notFound();
  }

  if (!service) return notFound();

  const features = toStringArray(service.features);
  const benefits = toStringArray(service.benefits);

  return (
    <div>
      {/* Hero — theme-aware: light bg in light mode, dark in dark mode */}
      <section className="relative overflow-hidden bg-white dark:bg-[#020617] pt-28 pb-20 sm:pt-36 sm:pb-24">
        {/* Ambient light orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[10%] left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.07] dark:bg-blue-600/[0.10] blur-[120px]" />
          <div className="absolute bottom-[5%] right-[10%] h-[350px] w-[350px] rounded-full bg-indigo-500/[0.05] dark:bg-indigo-500/[0.08] blur-[90px]" />
        </div>
        {/* Dot grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.18] bg-[radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white dark:from-[#020617] to-transparent" />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white leading-[1.1]">
            {service.heroTitle || service.title}
          </h1>
          <p className="mt-4 text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            {service.heroSubtitle || service.shortDesc || service.description}
          </p>

          {/* Premium CTA button — matches homepage hero style */}
          <div className="mt-9 flex justify-center">
            <Link
              href="/order"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-[15px] text-[15px] font-bold tracking-tight text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_6px_32px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_10px_52px_rgba(37,99,235,0.62)] hover:brightness-110 active:scale-[0.98] active:translate-y-0 sm:px-9 sm:py-4 sm:text-[16px]"
            >
              {/* Top gloss highlight */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/[0.22] to-transparent" />
              {/* Sweeping shimmer streak */}
              <span
                className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.16] to-transparent"
                style={{ backgroundSize: "200% 100%" }}
              />
              <span className="relative">Order Now</span>
              <ArrowRight className="relative h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <p className="text-[clamp(1rem,2vw,1.1rem)] leading-[1.8] text-slate-600 dark:text-slate-300">{service.description}</p>
        </div>
      </section>

      {/* Features & Benefits */}
      {(features.length > 0 || benefits.length > 0) && (
        <section className="section-padding bg-slate-50/60 dark:bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
              {features.length > 0 && (
                <div>
                  <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Features</h2>
                  <ul className="mt-6 space-y-3">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
                          <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-[14px] leading-[1.7] text-slate-600 dark:text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {benefits.length > 0 && (
                <div>
                  <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Benefits</h2>
                  <ul className="mt-6 space-y-3">
                    {benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-[14px] leading-[1.7] text-slate-600 dark:text-slate-300">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="section-padding">
          <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em] text-slate-900 dark:text-white text-center mb-8 sm:mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {service.faqs.map((faq) => (
                <details key={faq.id} className="group rounded-xl border border-slate-200/60 bg-white p-5 transition-colors open:bg-slate-50/50 dark:border-white/[0.04] dark:bg-white/[0.02] dark:open:bg-white/[0.03]">
                  <summary className="cursor-pointer text-[15px] font-medium text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden list-none flex items-center justify-between">
                    {faq.question}
                    <span className="ml-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[14px] leading-[1.7] text-slate-500 dark:text-slate-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700" />
        <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold tracking-[-0.02em] text-white">Ready to Get Started?</h2>
          <p className="mt-3 text-[clamp(0.9rem,2vw,1.05rem)] text-blue-100/80">Place your order today and let our experts handle the rest.</p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/order"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-8 py-[14px] text-[15px] font-bold tracking-tight text-blue-600 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-blue-50 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] active:scale-[0.98] sm:px-9"
            >
              <span className="relative">Place Your Order</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
