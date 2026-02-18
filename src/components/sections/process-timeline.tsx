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
    <section className="section-padding bg-slate-50/60 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">How It Works</h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400 sm:text-[17px]">Simple, transparent, and stress-free</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, i) => (
            <motion.div key={step.title}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative text-center lg:text-left">
              {/* Step number */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-[0_4px_20px_rgba(37,99,235,0.25)] lg:mx-0">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="absolute top-7 left-[calc(50%+2rem)] hidden w-[calc(100%-4rem)] lg:block">
                  <div className="h-px w-full bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-800" />
                </div>
              )}
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">{step.step}</span>
              <h3 className="mt-1.5 text-[15px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-slate-500 dark:text-slate-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
