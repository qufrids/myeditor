"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const benefits = [
  "Free plagiarism report with every order",
  "Free title page and bibliography",
  "Free formatting (APA, Harvard, MLA, Chicago)",
  "Free unlimited revisions",
  "Free 24/7 customer support",
  "Free quality check before delivery",
  "Free outline and draft review",
  "Secure and confidential service",
];

export function BenefitsSection() {
  return (
    <section className="relative py-24 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Everything You Need,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Included Free</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
              We believe in transparent pricing with no hidden costs. Every order comes with these premium features at no extra charge.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((benefit, i) => (
                <motion.div key={benefit}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-xl bg-white p-3 dark:bg-slate-800/50">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
