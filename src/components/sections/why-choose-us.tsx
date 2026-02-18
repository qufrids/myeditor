"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Award, Users, BookOpen, Headphones } from "lucide-react";

const features = [
  { icon: Shield, title: "100% Plagiarism-Free", description: "Every piece is original, checked with premium plagiarism detection tools." },
  { icon: Clock, title: "On-Time, Every Time", description: "We respect deadlines. Your work is delivered when promised, no exceptions." },
  { icon: Award, title: "Expert UK Writers", description: "Masters & PhD graduates from top UK universities in your subject area." },
  { icon: Users, title: "Personalised Approach", description: "Tailored to your specific requirements, voice, and academic level." },
  { icon: BookOpen, title: "Free Revisions", description: "Unlimited revisions until you're completely satisfied with the result." },
  { icon: Headphones, title: "24/7 Support", description: "Round-the-clock assistance via chat, email, and phone." },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">
            Why Choose EditorsForUK?
          </h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto sm:text-[17px]">
            We set the standard for premium academic writing in the UK
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((feature, i) => (
            <motion.div key={feature.title}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group rounded-2xl border border-slate-100 bg-slate-50/40 p-6 sm:p-7 transition-all duration-300 hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-slate-200/80 dark:border-white/[0.04] dark:bg-white/[0.015] dark:hover:bg-white/[0.03] dark:hover:border-white/[0.08]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/[0.08] transition-transform duration-300 group-hover:scale-105">
                <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-slate-500 dark:text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
