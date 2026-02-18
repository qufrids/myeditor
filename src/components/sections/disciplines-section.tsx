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
    <section className="relative py-24 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">We Cover Every Discipline</h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">Expert writers across all academic subjects</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3">
          {disciplines.map((discipline, i) => (
            <motion.span key={discipline}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.03 }}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-300">
              {discipline}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
