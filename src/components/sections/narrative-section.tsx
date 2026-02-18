"use client";

import { motion } from "framer-motion";
import { AlertCircle, Lightbulb, Trophy } from "lucide-react";

const stories = [
  {
    icon: AlertCircle, title: "The Challenge", step: "01",
    description: "UK university standards are demanding. Students face tight deadlines, complex requirements, and intense academic pressure.",
    iconBg: "bg-red-50 dark:bg-red-500/[0.08]",
    iconColor: "text-red-500 dark:text-red-400",
  },
  {
    icon: Lightbulb, title: "Our Approach", step: "02",
    description: "We pair you with a specialist writer in your field who crafts original, research-driven work to your exact specifications.",
    iconBg: "bg-blue-50 dark:bg-blue-500/[0.08]",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Trophy, title: "The Result", step: "03",
    description: "Students consistently achieve higher grades, reduce stress, and gain deeper understanding through expertly crafted work.",
    iconBg: "bg-emerald-50 dark:bg-emerald-500/[0.08]",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export function NarrativeSection() {
  return (
    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">
            How We Help You Succeed
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {stories.map((story, i) => (
            <motion.div key={story.title}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl border border-slate-100 bg-slate-50/40 p-6 sm:p-7 dark:border-white/[0.04] dark:bg-white/[0.015]">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-600">{story.step}</span>
              <div className={`mt-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${story.iconBg}`}>
                <story.icon className={`h-5 w-5 ${story.iconColor}`} />
              </div>
              <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{story.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-slate-500 dark:text-slate-400">{story.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
