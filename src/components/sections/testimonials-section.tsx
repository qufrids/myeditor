"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah M.", university: "University of Oxford", course: "English Literature", rating: 5, content: "Absolutely outstanding work. The essay was brilliantly structured with exceptional arguments. I received a first-class mark and my tutor specifically praised the depth of analysis." },
  { name: "James K.", university: "Imperial College London", course: "Engineering", rating: 5, content: "The technical report was impeccable. Every calculation was verified, and the methodology section was far beyond what I expected. Truly professional quality." },
  { name: "Emily R.", university: "University of Edinburgh", course: "Business Management", rating: 5, content: "My dissertation was delivered ahead of schedule with incredible attention to detail. The research methodology was exactly what my supervisor recommended." },
  { name: "David L.", university: "UCL", course: "Law", rating: 5, content: "The case analysis was thorough and the legal arguments were compelling. I've never seen such quality from a writing service. Highly recommended!" },
  { name: "Priya S.", university: "LSE", course: "Economics", rating: 5, content: "Perfect econometric analysis with clear explanations. The writer clearly had deep knowledge of the subject. Will definitely use again." },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">What Students Say</h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">Join thousands of satisfied students</p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 text-center dark:border-white/5 dark:bg-slate-900/50 md:p-12">
              <Quote className="mx-auto h-8 w-8 text-blue-200 dark:text-blue-800" />
              <div className="mt-4 flex items-center justify-center gap-1">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>
              <div className="mt-6">
                <p className="font-semibold text-slate-900 dark:text-white">{testimonials[current].name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {testimonials[current].course} - {testimonials[current].university}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-colors hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5">
              <ChevronLeft className="h-5 w-5 text-slate-500" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-blue-600" : "w-2 bg-slate-300 dark:bg-slate-700"}`} />
              ))}
            </div>
            <button onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-colors hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5">
              <ChevronRight className="h-5 w-5 text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
