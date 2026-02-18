"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, PenTool, BookOpen, GraduationCap, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: FileText, title: "Assignment Help",
    description: "Expert assistance with assignments across all disciplines, from business to STEM.",
    href: "/services/assignment",
    gradient: "from-blue-500/10 to-cyan-500/10 dark:from-blue-500/[0.06] dark:to-cyan-500/[0.06]",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: PenTool, title: "Essay Writing",
    description: "Compelling, well-researched essays crafted by subject-matter experts.",
    href: "/services/essay",
    gradient: "from-violet-500/10 to-purple-500/10 dark:from-violet-500/[0.06] dark:to-purple-500/[0.06]",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: BookOpen, title: "Coursework Support",
    description: "Comprehensive coursework guidance to help you achieve top marks.",
    href: "/services/coursework",
    gradient: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/[0.06] dark:to-orange-500/[0.06]",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: GraduationCap, title: "Dissertation Writing",
    description: "PhD-level expertise for your dissertation, from proposal to final chapter.",
    href: "/services/dissertation",
    gradient: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/[0.06] dark:to-teal-500/[0.06]",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export function ServicesGrid() {
  return (
    <section className="section-padding bg-slate-50/60 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">Our Services</h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto sm:text-[17px]">
            Comprehensive academic support tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {services.map((service, i) => (
            <motion.div key={service.title}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <Link href={service.href}
                className="group flex flex-col rounded-2xl border border-slate-200/60 bg-white p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] dark:border-white/[0.06] dark:bg-slate-900/60 dark:hover:bg-slate-900/80 dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient}`}>
                  <service.icon className={`h-5 w-5 ${service.iconColor}`} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{service.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 flex-1">{service.description}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 dark:text-blue-400">
                  Learn more <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
