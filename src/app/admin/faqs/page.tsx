import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminFAQsPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { sortOrder: "asc" }, include: { service: true } });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">FAQs</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">{faqs.length} questions</p>
        </div>
        <Button variant="luxury" size="sm" asChild>
          <Link href="/admin/faqs/new"><Plus className="mr-1.5 h-3.5 w-3.5" /> Add FAQ</Link>
        </Button>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq) => (
          <div key={faq.id} className="rounded-2xl border border-slate-200/60 bg-white p-5 dark:border-white/[0.04] dark:bg-white/[0.02]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-slate-900 dark:text-white">{faq.question}</p>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-slate-500 dark:text-slate-400 line-clamp-2">{faq.answer}</p>
                {faq.service && (
                  <span className="mt-2.5 inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    {faq.service.title}
                  </span>
                )}
              </div>
              <Link href={`/admin/faqs/${faq.id}`} className="shrink-0 text-[13px] font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Edit</Link>
            </div>
          </div>
        ))}
        {faqs.length === 0 && (
          <div className="rounded-2xl border border-slate-200/60 bg-white px-5 py-10 text-center dark:border-white/[0.04] dark:bg-white/[0.02]">
            <p className="text-[13px] text-slate-400">No FAQs yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
