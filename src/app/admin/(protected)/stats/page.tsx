import { prisma } from "@/lib/prisma";
import { BarChart3, TrendingUp, Users, MessageSquare, CheckCircle, Clock, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminStatsPage() {
  const [
    totalInquiries,
    totalServices,
    totalTestimonials,
    totalBlogPosts,
    newInquiries,
    contactedInquiries,
    completedInquiries,
    inquiriesByService,
    recentInquiries,
  ] = await Promise.all([
    prisma.inquiry.count().catch(() => 0),
    prisma.service.count().catch(() => 0),
    prisma.testimonial.count().catch(() => 0),
    prisma.blogPost.count().catch(() => 0),
    prisma.inquiry.count({ where: { status: "new" } }).catch(() => 0),
    prisma.inquiry.count({ where: { status: "contacted" } }).catch(() => 0),
    prisma.inquiry.count({ where: { status: "completed" } }).catch(() => 0),
    prisma.inquiry.groupBy({
      by: ["service"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }).catch(() => [] as { service: string; _count: { id: number } }[]),
    prisma.inquiry.findMany({
      select: { createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    }).catch(() => [] as { createdAt: Date }[]),
  ]);

  // Last 7 days activity
  const now = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const dailyCounts = days.map((day) => {
    const count = recentInquiries.filter((inq) => {
      const d = new Date(inq.createdAt);
      return (
        d.getFullYear() === day.getFullYear() &&
        d.getMonth() === day.getMonth() &&
        d.getDate() === day.getDate()
      );
    }).length;
    return { label: day.toLocaleDateString("en-GB", { weekday: "short" }), count };
  });
  const maxCount = Math.max(...dailyCounts.map((d) => d.count), 1);

  const statusCards = [
    { label: "New", value: newInquiries, color: "bg-blue-600", light: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400", icon: MessageSquare },
    { label: "Contacted", value: contactedInquiries, color: "bg-amber-500", light: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400", icon: Clock },
    { label: "Completed", value: completedInquiries, color: "bg-emerald-600", light: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400", icon: CheckCircle },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Stats</h1>
        <p className="mt-0.5 text-[13px] text-slate-500">Overview of site activity and inquiries</p>
      </div>

      {/* Top counters */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Inquiries", value: totalInquiries, icon: MessageSquare, color: "from-blue-500 to-blue-600" },
          { label: "Services", value: totalServices, icon: FileText, color: "from-violet-500 to-indigo-600" },
          { label: "Testimonials", value: totalTestimonials, icon: Users, color: "from-amber-400 to-orange-500" },
          { label: "Blog Posts", value: totalBlogPosts, icon: TrendingUp, color: "from-emerald-500 to-teal-600" },
        ].map((stat) => (
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

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Inquiry status breakdown */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-white/[0.04] dark:bg-white/[0.02]">
          <div className="mb-5 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-slate-400" />
            <h2 className="text-[14px] font-semibold text-slate-900 dark:text-white">Inquiry Status</h2>
          </div>
          <div className="space-y-3">
            {statusCards.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <span className={`inline-flex w-24 shrink-0 justify-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${s.light}`}>{s.label}</span>
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.05]" style={{ height: 6 }}>
                    <div
                      className={`h-full rounded-full ${s.color} transition-all duration-500`}
                      style={{ width: totalInquiries ? `${(s.value / totalInquiries) * 100}%` : "0%" }}
                    />
                  </div>
                  <span className="w-6 text-right text-[13px] font-semibold text-slate-700 dark:text-slate-300">{s.value}</span>
                </div>
              </div>
            ))}
            {totalInquiries === 0 && (
              <p className="py-4 text-center text-[13px] text-slate-400">No inquiries yet</p>
            )}
          </div>
        </div>

        {/* Inquiries by service */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-white/[0.04] dark:bg-white/[0.02]">
          <div className="mb-5 flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-400" />
            <h2 className="text-[14px] font-semibold text-slate-900 dark:text-white">Inquiries by Service</h2>
          </div>
          <div className="space-y-3">
            {inquiriesByService.map((row) => {
              const pct = totalInquiries ? (row._count.id / totalInquiries) * 100 : 0;
              return (
                <div key={row.service} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 truncate text-[13px] capitalize text-slate-600 dark:text-slate-400">{row.service || "—"}</span>
                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.05]" style={{ height: 6 }}>
                      <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-6 text-right text-[13px] font-semibold text-slate-700 dark:text-slate-300">{row._count.id}</span>
                  </div>
                </div>
              );
            })}
            {inquiriesByService.length === 0 && (
              <p className="py-4 text-center text-[13px] text-slate-400">No data yet</p>
            )}
          </div>
        </div>

        {/* Last 7 days bar chart */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-white/[0.04] dark:bg-white/[0.02] lg:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-slate-400" />
            <h2 className="text-[14px] font-semibold text-slate-900 dark:text-white">Inquiries — Last 7 Days</h2>
          </div>
          <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
            {dailyCounts.map((day) => (
              <div key={day.label} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[11px] font-medium text-slate-500">{day.count > 0 ? day.count : ""}</span>
                <div className="relative w-full overflow-hidden rounded-t-md bg-slate-100 dark:bg-white/[0.05]" style={{ height: 88 }}>
                  <div
                    className="absolute bottom-0 w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-500"
                    style={{ height: `${(day.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400">{day.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
