"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">What Students Say</h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400 sm:text-[17px]">Join thousands of satisfied students</p>
        </motion.div>

        <div className="relative mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="rounded-2xl border border-slate-100 bg-slate-50/40 p-7 text-center dark:border-white/[0.04] dark:bg-white/[0.015] sm:p-10">
              {/* Stars */}
              <div className="flex items-center justify-center gap-0.5">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              {/* Quote */}
              <p className="mt-6 text-[clamp(1rem,2.5vw,1.175rem)] leading-[1.7] text-slate-700 dark:text-slate-300">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>
              {/* Attribution */}
              <div className="mt-6">
                <p className="text-[15px] font-semibold text-slate-900 dark:text-white">{testimonials[current].name}</p>
                <p className="mt-0.5 text-[13px] text-slate-500 dark:text-slate-500">
                  {testimonials[current].course} &middot; {testimonials[current].university}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8">
            <button onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all hover:border-slate-300 hover:text-slate-600 dark:border-white/[0.08] dark:text-slate-500 dark:hover:border-white/[0.15] dark:hover:text-slate-300">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-blue-600" : "w-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"}`} />
              ))}
            </div>
            <button onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all hover:border-slate-300 hover:text-slate-600 dark:border-white/[0.08] dark:text-slate-500 dark:hover:border-white/[0.15] dark:hover:text-slate-300">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
