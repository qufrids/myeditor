import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Services</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">{services.length} services</p>
        </div>
        <Button variant="luxury" size="sm" asChild>
          <Link href="/admin/services/new"><Plus className="mr-1.5 h-3.5 w-3.5" /> Add Service</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white dark:border-white/[0.04] dark:bg-white/[0.02]">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/[0.04]">
              <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400">Title</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400">Slug</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400">Status</th>
              <th className="px-5 py-3.5 text-right text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.03]">
            {services.map((service) => (
              <tr key={service.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.01]">
                <td className="px-5 py-3.5 text-[13px] font-medium text-slate-900 dark:text-white">{service.title}</td>
                <td className="px-5 py-3.5 text-[13px] text-slate-500 font-mono">{service.slug}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${service.isActive ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-slate-400"}`}>
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link href={`/admin/services/${service.id}`} className="text-[13px] font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Edit</Link>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-[13px] text-slate-400">No services yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
