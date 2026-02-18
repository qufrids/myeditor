"use client";

import { motion } from "framer-motion";

const disciplines = [
  "Business & Management", "Law", "Nursing & Healthcare", "Engineering",
  "Computer Science", "Psychology", "Economics", "Marketing",
  "Sociology", "English Literature", "History", "Political Science",
  "Accounting & Finance", "Education", "Architecture", "Media Studies",
  "Environmental Science", "Mathematics", "Philosophy", "Criminology",
];

export function DisciplinesSection() {
  return (
    <section className="section-padding bg-slate-50/60 dark:bg-slate-900/30">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">
            We Cover Every Discipline
          </h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400 sm:text-[17px]">Expert writers across all academic subjects</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {disciplines.map((discipline, i) => (
            <motion.span key={discipline}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.02, duration: 0.3 }}
              className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:text-blue-700 hover:shadow-sm dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-slate-400 dark:hover:border-blue-500/20 dark:hover:text-blue-400 sm:text-sm">
              {discipline}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
