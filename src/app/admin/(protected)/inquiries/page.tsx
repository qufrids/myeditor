import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Inquiries</h1>
        <p className="mt-0.5 text-[13px] text-slate-500">{inquiries.length} total inquiries</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/60 bg-white dark:border-white/[0.04] dark:bg-white/[0.02]">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/[0.04]">
              {["Name", "Email", "Service", "Level", "Status", "Date"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.03]">
            {inquiries.map((inq) => (
              <tr key={inq.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.01]">
                <td className="px-5 py-3.5 text-[13px] font-medium text-slate-900 dark:text-white">{inq.name}</td>
                <td className="px-5 py-3.5 text-[13px] text-slate-500">{inq.email}</td>
                <td className="px-5 py-3.5 text-[13px] text-slate-500 capitalize">{inq.service || "—"}</td>
                <td className="px-5 py-3.5 text-[13px] text-slate-500 capitalize">{inq.academicLevel || "—"}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    inq.status === "new" ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" :
                    inq.status === "contacted" ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" :
                    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                  }`}>{inq.status}</span>
                </td>
                <td className="px-5 py-3.5 text-[13px] text-slate-400">{formatDate(inq.createdAt)}</td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-[13px] text-slate-400">No inquiries yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
