import { prisma } from "@/lib/prisma";
import { InquiryTable } from "@/components/admin/inquiry-table";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Inquiries</h1>
        <p className="mt-0.5 text-[13px] text-slate-500">{inquiries.length} total inquiries</p>
      </div>

      <InquiryTable inquiries={inquiries} />
    </div>
  );
}
