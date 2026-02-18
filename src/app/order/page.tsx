"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2, Shield, Clock, Award, CheckCircle, ArrowRight, ArrowLeft,
  FileText, PenTool, BookOpen, GraduationCap, User, Mail, Phone,
  Calendar, Type, AlignLeft, Sparkles, Star, Lock,
} from "lucide-react";

const SERVICES = [
  { value: "assignment", label: "Assignment Help", icon: FileText, color: "from-blue-500 to-cyan-500", desc: "Any subject, any level" },
  { value: "essay", label: "Essay Writing", icon: PenTool, color: "from-violet-500 to-purple-500", desc: "Compelling, well-argued" },
  { value: "coursework", label: "Coursework", icon: BookOpen, color: "from-amber-500 to-orange-500", desc: "Full module coverage" },
  { value: "dissertation", label: "Dissertation", icon: GraduationCap, color: "from-emerald-500 to-teal-500", desc: "PhD-level expertise" },
];

const LEVELS = ["Undergraduate", "Masters", "PhD", "Other"];

const STEPS = [
  { label: "Service", hint: "What do you need?" },
  { label: "Details", hint: "About you" },
  { label: "Project", hint: "Your requirements" },
];

const TRUST = [
  {
    icon: Shield, label: "100% Confidential",
    desc: "All data is encrypted. Your university will never know.",
    iconCn: "text-blue-600 dark:text-blue-400", bgCn: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    icon: Clock, label: "24hr Turnaround",
    desc: "We work around your deadline — even urgent orders.",
    iconCn: "text-violet-600 dark:text-violet-400", bgCn: "bg-violet-50 dark:bg-violet-500/10",
  },
  {
    icon: Award, label: "Quality Guaranteed",
    desc: "Unlimited free revisions until you're fully satisfied.",
    iconCn: "text-emerald-600 dark:text-emerald-400", bgCn: "bg-emerald-50 dark:bg-emerald-500/10",
  },
];

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 36 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -36 }),
};

const inputWrap = "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/[0.08] dark:border-white/[0.08] dark:bg-white/[0.03]";
const inputBase = "w-full bg-transparent text-[14px] text-slate-900 placeholder:text-slate-400/80 focus:outline-none dark:text-white";
const microLabel = "block text-[10.5px] font-bold uppercase tracking-wider mb-0.5";

export default function OrderPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "",
    academicLevel: "", deadline: "", wordCount: "", instructions: "",
  });

  const go = (next: number) => { setDir(next > step ? 1 : -1); setStep(next); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, wordCount: form.wordCount ? parseInt(form.wordCount) : null }),
      });
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  };

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 220 }}
          className="w-full max-w-md rounded-3xl border border-emerald-200/60 bg-gradient-to-b from-emerald-50 to-white p-10 text-center shadow-[0_20px_60px_rgba(16,185,129,0.10)] dark:border-emerald-500/10 dark:from-emerald-500/5 dark:to-transparent sm:p-14"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/15">
            <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="mt-6 text-[1.75rem] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">Order Received!</h1>
          <p className="mt-3 text-[14px] leading-[1.75] text-slate-500 dark:text-slate-400">
            Thank you! Our team will review your requirements and contact you within{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">2 hours</span>{" "}
            with a quote and matched writer.
          </p>
          <div className="mt-5 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
          </div>
          <p className="mt-1 text-[12px] text-slate-400">Trusted by 15,000+ UK students</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-24 sm:pt-28">
      {/* Subtle page glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.05),transparent)]" />

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-10 text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 dark:border-blue-500/20 dark:bg-blue-500/10">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[11.5px] font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Expert Writers Standing By</span>
          </div>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-[-0.035em] text-slate-900 dark:text-white">
            Place Your Order
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[clamp(0.9rem,2vw,1rem)] text-slate-500 dark:text-slate-400">
            Takes 2 minutes. We&apos;ll match you with the perfect writer instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">

          {/* ── Form card ── */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_4px_40px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.02)] dark:border-white/[0.06] dark:bg-slate-950/60">

            {/* Step progress bar */}
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-white/[0.05] dark:bg-white/[0.01] sm:px-8">
              <div className="flex items-center gap-0">
                {STEPS.map((s, i) => (
                  <div key={s.label} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => i < step && go(i)}
                      disabled={i >= step}
                      className="flex items-center gap-2.5 disabled:cursor-default"
                    >
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ring-2 transition-all duration-300 ${
                        i < step
                          ? "bg-blue-600 text-white ring-blue-100 dark:ring-blue-500/20"
                          : i === step
                          ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-500/20"
                          : "bg-slate-100 text-slate-400 ring-slate-100 dark:bg-white/[0.05] dark:text-slate-600 dark:ring-white/[0.03]"
                      }`}>
                        {i < step ? <CheckCircle className="h-3.5 w-3.5" /> : i + 1}
                      </div>
                      <div className="hidden text-left sm:block">
                        <div className={`text-[12px] font-semibold leading-tight transition-colors duration-200 ${i === step ? "text-slate-900 dark:text-white" : i < step ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-600"}`}>{s.label}</div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-600">{s.hint}</div>
                      </div>
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className="mx-3 h-px w-8 rounded-full transition-colors duration-500 sm:w-14 md:w-20 lg:w-10 xl:w-16" style={{ background: i < step ? "rgb(37,99,235)" : "rgb(226,232,240)" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="min-h-[380px] px-6 py-7 sm:px-8 sm:py-8">
                <AnimatePresence mode="wait" custom={dir}>

                  {/* ── STEP 0: Choose service ── */}
                  {step === 0 && (
                    <motion.div key="s0" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: "easeInOut" }}>
                      <p className="mb-1 text-[15px] font-semibold text-slate-900 dark:text-white">What do you need help with?</p>
                      <p className="mb-5 text-[13px] text-slate-400">Choose a service type to get started</p>

                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {SERVICES.map((svc) => (
                          <button
                            key={svc.value}
                            type="button"
                            onClick={() => setForm({ ...form, service: svc.value })}
                            className={`group flex items-center gap-3.5 rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                              form.service === svc.value
                                ? "border-blue-500 bg-blue-50/60 dark:border-blue-500 dark:bg-blue-500/10"
                                : "border-slate-200/80 hover:border-blue-200 hover:bg-slate-50/60 dark:border-white/[0.06] dark:hover:border-blue-500/30 dark:hover:bg-white/[0.02]"
                            }`}
                          >
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${svc.color} shadow-sm`}>
                              <svc.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[13.5px] font-semibold text-slate-900 dark:text-white">{svc.label}</div>
                              <div className="mt-0.5 text-[11.5px] text-slate-400 dark:text-slate-500">{svc.desc}</div>
                            </div>
                            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                              form.service === svc.value
                                ? "border-blue-500 bg-blue-500"
                                : "border-slate-300 dark:border-white/20"
                            }`}>
                              {form.service === svc.value && <div className="h-2 w-2 rounded-full bg-white" />}
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="mt-6">
                        <p className="mb-2.5 text-[12.5px] font-semibold text-slate-600 dark:text-slate-400">Academic Level</p>
                        <div className="flex flex-wrap gap-2">
                          {LEVELS.map((lv) => (
                            <button
                              key={lv}
                              type="button"
                              onClick={() => setForm({ ...form, academicLevel: lv.toLowerCase().replace(" ", "_") })}
                              className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-all duration-150 ${
                                form.academicLevel === lv.toLowerCase().replace(" ", "_")
                                  ? "border-blue-500 bg-blue-600 text-white shadow-sm"
                                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-400 dark:hover:border-blue-500/40 dark:hover:text-blue-400"
                              }`}
                            >
                              {lv}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 1: Personal details ── */}
                  {step === 1 && (
                    <motion.div key="s1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: "easeInOut" }}>
                      <p className="mb-1 text-[15px] font-semibold text-slate-900 dark:text-white">Your details</p>
                      <p className="mb-6 text-[13px] text-slate-400">We&apos;ll use this to send you order updates</p>

                      <div className="space-y-3">
                        {/* Name */}
                        <div className={inputWrap}>
                          <User className="h-4 w-4 shrink-0 text-slate-400" />
                          <div className="flex-1 min-w-0">
                            <label className={`${microLabel} text-blue-600 dark:text-blue-400`}>Full Name *</label>
                            <input type="text" required value={form.name} placeholder="John Smith"
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className={inputBase} />
                          </div>
                        </div>

                        {/* Email */}
                        <div className={inputWrap}>
                          <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                          <div className="flex-1 min-w-0">
                            <label className={`${microLabel} text-blue-600 dark:text-blue-400`}>Email Address *</label>
                            <input type="email" required value={form.email} placeholder="john@university.ac.uk"
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className={inputBase} />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className={inputWrap}>
                          <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                          <div className="flex-1 min-w-0">
                            <label className={`${microLabel} text-slate-400`}>Phone <span className="normal-case font-normal">(optional)</span></label>
                            <input type="tel" value={form.phone} placeholder="+44 7700 900 000"
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              className={inputBase} />
                          </div>
                        </div>
                      </div>

                      {/* Privacy notice */}
                      <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 dark:bg-white/[0.02]">
                        <Lock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <p className="text-[11.5px] text-slate-500 dark:text-slate-500">
                          Details are encrypted end-to-end and never shared with third parties.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 2: Project specifics ── */}
                  {step === 2 && (
                    <motion.div key="s2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: "easeInOut" }}>
                      <p className="mb-1 text-[15px] font-semibold text-slate-900 dark:text-white">Project specifics</p>
                      <p className="mb-6 text-[13px] text-slate-400">Help us understand exactly what you need</p>

                      <div className="space-y-3">
                        {/* Deadline + Word Count */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className={inputWrap}>
                            <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                            <div className="flex-1 min-w-0">
                              <label className={`${microLabel} text-blue-600 dark:text-blue-400`}>Deadline</label>
                              <input type="date" value={form.deadline}
                                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                                className={`${inputBase} dark:[color-scheme:dark]`} />
                            </div>
                          </div>
                          <div className={inputWrap}>
                            <Type className="h-4 w-4 shrink-0 text-slate-400" />
                            <div className="flex-1 min-w-0">
                              <label className={`${microLabel} text-blue-600 dark:text-blue-400`}>Word Count</label>
                              <input type="number" value={form.wordCount} placeholder="e.g. 2000"
                                onChange={(e) => setForm({ ...form, wordCount: e.target.value })}
                                className={inputBase} />
                            </div>
                          </div>
                        </div>

                        {/* Instructions */}
                        <div className={`${inputWrap} !items-start`}>
                          <AlignLeft className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                          <div className="flex-1 min-w-0">
                            <label className={`${microLabel} text-blue-600 dark:text-blue-400`}>Instructions & Requirements</label>
                            <textarea rows={7} value={form.instructions}
                              placeholder="Describe your topic, marking criteria, referencing style (Harvard, APA…), word distribution, modules covered, any specific sources to include..."
                              onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                              className={`${inputBase} resize-none`} />
                            <div className="mt-1 text-right text-[11px] text-slate-400">
                              {form.instructions.length} chars
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Step footer nav */}
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-white/[0.05] sm:px-8">
                {step > 0 ? (
                  <button type="button" onClick={() => go(step - 1)}
                    className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/[0.04] dark:hover:text-slate-300">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                ) : <div />}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={() => go(step + 1)}
                    disabled={step === 0 && !form.service}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.35)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_6px_24px_rgba(37,99,235,0.48)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    Continue <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !form.name || !form.email}
                    className="group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-7 py-2.5 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(37,99,235,0.42)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_36px_rgba(37,99,235,0.58)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" style={{ backgroundSize: "200% 100%" }} />
                    {loading
                      ? <Loader2 className="h-4 w-4 animate-spin" />
                      : <><span className="relative">Submit Order</span><ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></>
                    }
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ── Sidebar ── */}
          <div className="flex flex-col gap-3">
            {TRUST.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200/60 bg-white p-5 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/[0.06] dark:bg-white/[0.02]">
                <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${item.bgCn}`}>
                  <item.icon className={`h-[18px] w-[18px] ${item.iconCn}`} />
                </div>
                <h3 className="mt-3 text-[13.5px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{item.label}</h3>
                <p className="mt-1 text-[12px] leading-[1.7] text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}

            {/* Mini testimonial */}
            <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-orange-50/40 p-5 dark:border-amber-500/10 dark:from-amber-500/[0.06] dark:to-transparent">
              <div className="flex items-center gap-1 mb-2.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1.5 text-[12px] font-semibold text-amber-700 dark:text-amber-400">4.9/5</span>
              </div>
              <p className="text-[12px] italic leading-[1.75] text-slate-600 dark:text-slate-400">
                &ldquo;Delivered in 12 hours — my professor was genuinely impressed. Outstanding quality.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-[11px] font-bold text-white">SM</div>
                <div>
                  <div className="text-[11.5px] font-semibold text-slate-700 dark:text-slate-300">Sarah M.</div>
                  <div className="text-[11px] text-slate-400">Univ. of Manchester</div>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { value: "15,000+", label: "Orders Delivered" },
                { value: "500+", label: "Expert Writers" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "< 2hr", label: "Response Time" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-slate-200/60 bg-white px-3 py-3 text-center dark:border-white/[0.05] dark:bg-white/[0.02]">
                  <div className="text-[15px] font-bold text-slate-900 dark:text-white">{s.value}</div>
                  <div className="mt-0.5 text-[10.5px] text-slate-400 dark:text-slate-500 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
