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
    <section className="relative py-24 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Why Choose EditorsForUK?</h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            We set the standard for premium academic writing services in the UK
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div key={feature.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-6 transition-all duration-300 hover:border-blue-100 hover:bg-blue-50/30 dark:border-white/5 dark:bg-slate-900/50 dark:hover:border-blue-500/20 dark:hover:bg-blue-500/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 transition-transform group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
