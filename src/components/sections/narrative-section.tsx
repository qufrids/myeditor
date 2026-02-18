"use client";

import { motion } from "framer-motion";
import { AlertCircle, Lightbulb, Trophy } from "lucide-react";

const stories = [
  {
    icon: AlertCircle,
    title: "The Challenge",
    description: "UK university standards are demanding. Students face tight deadlines, complex requirements, and intense academic pressure that can feel overwhelming.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Lightbulb,
    title: "Our Approach",
    description: "We pair you with a specialist writer in your field. They craft original, research-driven work that meets your exact specifications and university guidelines.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Trophy,
    title: "The Result",
    description: "Students consistently achieve higher grades, reduce stress, and gain deeper understanding of their subjects through our expertly crafted academic work.",
    color: "from-emerald-500 to-teal-500",
  },
];

export function NarrativeSection() {
  return (
    <section className="relative py-24 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">How We Help You Succeed</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stories.map((story, i) => (
            <motion.div key={story.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.2 }}
              className="relative rounded-2xl border border-slate-100 bg-slate-50/50 p-8 dark:border-white/5 dark:bg-slate-900/50">
              <div className={`inline-flex rounded-xl bg-gradient-to-r ${story.color} p-3`}>
                <story.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{story.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{story.description}</p>
              {i < stories.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-slate-300 dark:text-slate-700 md:block">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
