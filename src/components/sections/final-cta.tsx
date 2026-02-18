"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            Join 15,000+ students who trust EditorsForUK for premium academic writing. Get started today.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-full" asChild>
              <Link href="/order" className="gap-2">
                Place Your Order <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10 rounded-full" asChild>
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
