import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Inquiries</h1>
      <p className="mt-1 text-sm text-slate-500">{inquiries.length} inquiries</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Service</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Level</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {inquiries.map((inq) => (
              <tr key={inq.id} className="bg-white dark:bg-slate-900">
                <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{inq.name}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{inq.email}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{inq.service}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{inq.academicLevel || "-"}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    inq.status === "new" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" :
                    inq.status === "contacted" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" :
                    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                  }`}>{inq.status}</span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">{formatDate(inq.createdAt)}</td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">No inquiries yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
