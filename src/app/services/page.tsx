import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, PenTool, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const iconMap: Record<string, React.ElementType> = {
  FileText, PenTool, BookOpen, GraduationCap,
};

const colorMap: Record<string, string> = {
  assignment: "from-blue-500 to-cyan-500",
  essay: "from-purple-500 to-pink-500",
  coursework: "from-amber-500 to-orange-500",
  dissertation: "from-emerald-500 to-teal-500",
};

export const metadata = { title: "Our Services" };

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });

  return (
    <div className="pt-28 sm:pt-32">
      {/* Page header */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">
            Our Services
          </h1>
          <p className="mt-4 text-[clamp(0.95rem,2vw,1.1rem)] text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Comprehensive academic writing services tailored to UK university standards
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon || "FileText"] || FileText;
            const color = colorMap[service.slug] || "from-blue-500 to-indigo-500";
            return (
              <Link key={service.id} href={`/services/${service.slug}`}
                className="group rounded-2xl border border-slate-200/60 bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-slate-200 dark:border-white/[0.04] dark:bg-white/[0.02] dark:hover:border-white/[0.08] dark:hover:bg-white/[0.03] sm:p-8">
                <div className={`inline-flex rounded-xl bg-gradient-to-br ${color} p-3 shadow-sm`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="mt-5 text-[17px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white sm:text-lg">{service.title}</h2>
                <p className="mt-2 text-[14px] leading-[1.7] text-slate-500 dark:text-slate-400">{service.shortDesc || service.description}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-blue-600 dark:text-blue-400">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {services.length === 0 && (
          <p className="text-center text-slate-500 py-20 text-[15px]">Services coming soon.</p>
        )}
      </div>

      {/* Bottom spacing */}
      <div className="h-20 sm:h-24" />
    </div>
  );
}
