"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { value: 15000, suffix: "+", label: "Students Helped" },
  { value: 50000, suffix: "+", label: "Papers Delivered" },
  { value: 4.9, suffix: "/5", label: "Average Rating", decimals: 1 },
  { value: 99, suffix: "%", label: "On-Time Delivery" },
];

export function StatsCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="section-padding bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-center">
              <div className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.04em] text-slate-900 dark:text-white">
                {inView && (
                  <CountUp end={stat.value} duration={2} decimals={stat.decimals || 0} suffix={stat.suffix} />
                )}
              </div>
              <p className="mt-1 text-[13px] font-medium tracking-wide text-slate-500 dark:text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
