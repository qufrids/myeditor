import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, PenTool, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

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
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">Our Services</h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive academic writing services tailored to UK university standards
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = iconMap[service.icon || "FileText"] || FileText;
            const color = colorMap[service.slug] || "from-blue-500 to-indigo-500";
            return (
              <Link key={service.id} href={`/services/${service.slug}`}
                className="group rounded-2xl border border-slate-200/50 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/5 dark:bg-slate-800/50">
                <div className={`inline-flex rounded-xl bg-gradient-to-r ${color} p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{service.title}</h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400">{service.shortDesc || service.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {services.length === 0 && (
          <p className="text-center text-slate-500 py-16">Services coming soon.</p>
        )}
      </div>
    </div>
  );
}
