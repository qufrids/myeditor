"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700" />
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 sm:py-24 lg:py-28">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.03em] text-white leading-[1.15]">
            Ready to Elevate Your Grades?
          </h2>
          <p className="mt-4 text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed text-blue-100/80 max-w-xl mx-auto">
            Join 15,000+ students who trust Cambridge Writers for premium academic writing. Get started today.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            {/* Primary — white pill with hover lift, matches site's premium style */}
            <Link
              href="/order"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-8 py-[14px] text-[15px] font-bold tracking-tight text-blue-600 shadow-[0_4px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-blue-50 hover:shadow-[0_8px_36px_rgba(0,0,0,0.24)] active:scale-[0.98] active:translate-y-0 sm:px-9 sm:text-[15.5px]"
            >
              {/* Subtle gloss */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 to-transparent" />
              <span className="relative">Place Your Order</span>
              <ArrowRight className="relative h-[17px] w-[17px] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Secondary — ghost white outline */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.08] px-8 py-[14px] text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-[1px] hover:border-white/50 hover:bg-white/[0.15] active:scale-[0.98] sm:px-9"
            >
              Talk to an Expert
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
