"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Users, FileCheck, Star, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: 15000, suffix: "+", label: "Students Helped" },
  { icon: FileCheck, value: 50000, suffix: "+", label: "Papers Delivered" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Average Rating", decimals: 1 },
  { icon: Clock, value: 99, suffix: "%", label: "On-Time Delivery" },
];

export function StatsCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="relative py-20 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10">
                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                {inView && (
                  <CountUp end={stat.value} duration={2.5} decimals={stat.decimals || 0} suffix={stat.suffix} />
                )}
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
