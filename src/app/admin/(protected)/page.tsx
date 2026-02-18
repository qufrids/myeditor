import { prisma } from "@/lib/prisma";
import { FileText, Star, MessageSquare, BookOpen } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboard() {
  const [services, testimonials, inquiries, blogPosts] = await Promise.all([
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.inquiry.count(),
    prisma.blogPost.count(),
  ]);

  const recentInquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const stats = [
    { label: "Services", value: services, icon: FileText, color: "from-blue-500 to-blue-600" },
    { label: "Testimonials", value: testimonials, icon: Star, color: "from-amber-400 to-orange-500" },
    { label: "Inquiries", value: inquiries, icon: MessageSquare, color: "from-emerald-500 to-teal-500" },
    { label: "Blog Posts", value: blogPosts, icon: BookOpen, color: "from-purple-500 to-indigo-500" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Dashboard</h1>
        <p className="mt-0.5 text-[13px] text-slate-500">Welcome back to EditorsForUK Admin</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200/60 bg-white p-5 dark:border-white/[0.04] dark:bg-white/[0.02]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-slate-400">{stat.label}</p>
                <p className="mt-2 text-[28px] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-sm`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-[15px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">Recent Inquiries</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white dark:border-white/[0.04] dark:bg-white/[0.02]">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/[0.04]">
                <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400">Name</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400">Email</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400">Service</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400">Date</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.03]">
              {recentInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.01]">
                  <td className="px-5 py-3.5 text-[13px] font-medium text-slate-900 dark:text-white">{inquiry.name}</td>
                  <td className="px-5 py-3.5 text-[13px] text-slate-500">{inquiry.email}</td>
                  <td className="px-5 py-3.5 text-[13px] text-slate-500 capitalize">{inquiry.service || "—"}</td>
                  <td className="px-5 py-3.5 text-[13px] text-slate-400">{formatDate(inquiry.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                      inquiry.status === "new" ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" :
                      inquiry.status === "contacted" ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" :
                      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    }`}>
                      {inquiry.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentInquiries.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-[13px] text-slate-400">No inquiries yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
