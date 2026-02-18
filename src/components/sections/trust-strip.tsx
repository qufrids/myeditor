"use client";

import { motion } from "framer-motion";

const universities = [
  "University of Oxford", "University of Cambridge", "Imperial College London",
  "UCL", "LSE", "University of Edinburgh", "King's College London",
  "University of Manchester", "University of Bristol", "University of Warwick",
  "University of Glasgow", "Durham University", "University of Birmingham",
  "University of Leeds", "University of Nottingham",
];

export function TrustStrip() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200/50 bg-slate-50/50 py-6 dark:border-white/5 dark:bg-slate-900/50">
      <div className="flex">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 items-center gap-12">
          {[...universities, ...universities].map((uni, i) => (
            <span key={i} className="whitespace-nowrap text-sm font-medium text-slate-400 dark:text-slate-500">
              {uni}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
