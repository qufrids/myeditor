import { prisma } from "@/lib/prisma";
import { FileText, Star, MessageSquare, BookOpen } from "lucide-react";

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
    { label: "Services", value: services, icon: FileText, color: "bg-blue-500" },
    { label: "Testimonials", value: testimonials, icon: Star, color: "bg-amber-500" },
    { label: "Inquiries", value: inquiries, icon: MessageSquare, color: "bg-emerald-500" },
    { label: "Blog Posts", value: blogPosts, icon: BookOpen, color: "bg-purple-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Welcome to EditorsForUK Admin</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Inquiries</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {recentInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="bg-white dark:bg-slate-900">
                  <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{inquiry.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{inquiry.email}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{inquiry.service}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      inquiry.status === "new" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" :
                      inquiry.status === "contacted" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" :
                      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    }`}>
                      {inquiry.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentInquiries.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">No inquiries yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
