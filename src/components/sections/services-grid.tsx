"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, PenTool, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Assignment Help",
    description: "Expert assistance with assignments across all disciplines, from business to STEM.",
    href: "/services/assignment",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: PenTool,
    title: "Essay Writing",
    description: "Compelling, well-researched essays crafted by subject-matter experts.",
    href: "/services/essay",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BookOpen,
    title: "Coursework Support",
    description: "Comprehensive coursework guidance to help you achieve top marks.",
    href: "/services/coursework",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: GraduationCap,
    title: "Dissertation Writing",
    description: "PhD-level expertise for your dissertation, from proposal to final chapter.",
    href: "/services/dissertation",
    color: "from-emerald-500 to-teal-500",
  },
];

export function ServicesGrid() {
  return (
    <section className="relative py-24 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive academic support tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div key={service.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link href={service.href}
                className="group block rounded-2xl border border-slate-200/50 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/5 dark:bg-slate-800/50 dark:hover:bg-slate-800/80">
                <div className={`inline-flex rounded-xl bg-gradient-to-r ${service.color} p-3`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{service.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
