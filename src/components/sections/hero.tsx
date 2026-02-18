"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-white dark:bg-[#020617]">
      {/* Ambient light orbs — subtle in light mode, more visible in dark */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[15%] left-[20%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.06] dark:bg-blue-600/[0.07] blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[10%] right-[15%] h-[400px] w-[400px] rounded-full bg-indigo-500/[0.05] dark:bg-indigo-500/[0.06] blur-[100px] animate-pulse-glow delay-1000" />
        <div className="absolute top-[40%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-500/[0.04] blur-[80px] animate-pulse-glow delay-500" />
      </div>

      {/* Dot grid pattern — dark dots on light, white dots on dark */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.25] bg-[radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Gradient fade at bottom — fades to page background color */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-[#020617] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-24 text-center sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-1.5 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.03] sm:mb-10">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 dark:text-amber-400" />
          <span className="text-[13px] font-medium tracking-wide text-slate-600 dark:text-slate-400">Trusted by 15,000+ UK Students</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.06] tracking-[-0.04em] text-slate-900 dark:text-white">
          Premium Academic{" "}
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Writing Services
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto mt-5 max-w-xl text-[clamp(1rem,2.2vw,1.175rem)] leading-[1.65] text-slate-600 dark:text-slate-400 sm:mt-6">
          Expert writers, guaranteed quality, delivered on time. Elevate your grades with bespoke work tailored to UK university standards.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-9 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">

          {/* Premium CTA button with shimmer + glow */}
          <Link
            href="/order"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-[15px] text-[15px] font-bold tracking-tight text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_6px_32px_rgba(37,99,235,0.48)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_10px_52px_rgba(37,99,235,0.65)] hover:brightness-110 active:scale-[0.98] active:translate-y-0 sm:px-9 sm:py-4 sm:text-[16px]"
          >
            {/* Top gloss highlight */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/[0.22] to-transparent" />
            {/* Sweeping shimmer streak */}
            <span
              className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.16] to-transparent"
              style={{ backgroundSize: "200% 100%" }}
            />
            <span className="relative">Get Started</span>
            <ArrowRight className="relative h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <Button
            variant="outline"
            size="xl"
            className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-white/[0.12] dark:text-white dark:hover:bg-white/[0.06]"
            asChild>
            <Link href="/services">Explore Services</Link>
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-16 sm:gap-x-8">
          {["4.9/5 Rating", "100% Confidential", "On-Time Delivery", "Expert UK Writers"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-500">
              <div className="h-1 w-1 rounded-full bg-emerald-500" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
