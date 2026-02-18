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
    <section className="section-padding bg-slate-50/60 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">
              Everything You Need,{" "}
              <span className="text-gradient">Included Free</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-[17px] max-w-md">
              We believe in transparent pricing with no hidden costs. Every order comes with premium features at no extra charge.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {benefits.map((benefit, i) => (
                <motion.div key={benefit}
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.04 }}
                  className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-transparent hover:border-slate-100 transition-colors dark:bg-white/[0.03] dark:hover:bg-white/[0.05]">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10 mt-0.5">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-[14px] leading-snug text-slate-700 dark:text-slate-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
