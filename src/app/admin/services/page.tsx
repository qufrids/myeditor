import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Services</h1>
          <p className="mt-1 text-sm text-slate-500">{services.length} services</p>
        </div>
        <Button variant="luxury" asChild>
          <Link href="/admin/services/new"><Plus className="mr-2 h-4 w-4" /> Add Service</Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Slug</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {services.map((service) => (
              <tr key={service.id} className="bg-white dark:bg-slate-900">
                <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{service.title}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{service.slug}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${service.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"}`}>
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/services/${service.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400">Edit</Link>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">No services yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
