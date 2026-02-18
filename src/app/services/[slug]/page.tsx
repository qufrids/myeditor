import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return {};
  return { title: service.metaTitle || service.title, description: service.metaDesc || service.shortDesc };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug }, include: { faqs: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } } });
  if (!service) notFound();

  const features = (service.features as string[] | null) || [];
  const benefits = (service.benefits as string[] | null) || [];

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{service.heroTitle || service.title}</h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">{service.heroSubtitle || service.shortDesc || service.description}</p>
          <div className="mt-8">
            <Button variant="luxury" size="xl" asChild>
              <Link href="/order" className="gap-2">Order Now <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      {(features.length > 0 || benefits.length > 0) && (
        <section className="py-16 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Features</h2>
                  <ul className="mt-6 space-y-3">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 mt-0.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {benefits.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Benefits</h2>
                  <ul className="mt-6 space-y-3">
                    {benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">{b}</span>
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
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {service.faqs.map((faq) => (
                <details key={faq.id} className="group rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-800/50">
                  <summary className="cursor-pointer font-medium text-slate-900 dark:text-white">{faq.question}</summary>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-blue-100">Place your order today and let our experts handle the rest.</p>
          <div className="mt-8">
            <Button size="xl" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl" asChild>
              <Link href="/order">Place Your Order</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
