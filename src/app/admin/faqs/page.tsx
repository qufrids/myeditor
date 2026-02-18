import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminFAQsPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { sortOrder: "asc" }, include: { service: true } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">FAQs</h1>
          <p className="mt-1 text-sm text-slate-500">{faqs.length} questions</p>
        </div>
        <Button variant="luxury" asChild>
          <Link href="/admin/faqs/new"><Plus className="mr-2 h-4 w-4" /> Add FAQ</Link>
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-white">{faq.question}</p>
                <p className="mt-1 text-sm text-slate-500 line-clamp-2">{faq.answer}</p>
                {faq.service && (
                  <span className="mt-2 inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    {faq.service.title}
                  </span>
                )}
              </div>
              <Link href={`/admin/faqs/${faq.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 shrink-0">Edit</Link>
            </div>
          </div>
        ))}
        {faqs.length === 0 && <p className="text-center text-sm text-slate-500 py-8">No FAQs yet</p>}
      </div>
    </div>
  );
}
