"use client";

import { motion } from "framer-motion";
import { ClipboardList, Search, PenTool, CheckCircle } from "lucide-react";

const steps = [
  { icon: ClipboardList, step: "01", title: "Place Your Order", description: "Fill in your requirements, deadline, and academic level. It takes just 2 minutes." },
  { icon: Search, step: "02", title: "Writer Matching", description: "We assign the best-qualified writer in your subject area to your project." },
  { icon: PenTool, step: "03", title: "Research & Writing", description: "Your writer crafts original, well-researched content following your specifications." },
  { icon: CheckCircle, step: "04", title: "Quality & Delivery", description: "After rigorous quality checks, your work is delivered on time with a plagiarism report." },
];

export function ProcessTimeline() {
  return (
    <section className="relative py-24 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">Simple, transparent, and stress-free</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div key={step.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
                <step.icon className="h-7 w-7 text-white" />
              </div>
              <span className="mt-4 block text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">{step.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-[60%] hidden w-[calc(100%-20%)] border-t-2 border-dashed border-blue-200 dark:border-blue-800 lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
