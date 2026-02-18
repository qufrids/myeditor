"use client";

import { useState } from "react";
import { Loader2, Shield, Clock, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", academicLevel: "",
    deadline: "", wordCount: "", instructions: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, wordCount: form.wordCount ? parseInt(form.wordCount) : null }),
    });
    setSubmitted(true);
    setLoading(false);
  };

  const inputClass = "w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-white dark:focus:border-blue-400";

  if (submitted) {
    return (
      <div className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-10 dark:border-emerald-500/10 dark:bg-emerald-500/5 sm:p-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
              <CheckCircle className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="mt-5 text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Order Received!</h1>
            <p className="mt-3 text-[14px] leading-[1.7] text-slate-600 dark:text-slate-300 max-w-md mx-auto">Thank you for your order. Our team will review your requirements and contact you within 2 hours with a quote and writer match.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">
            Place Your Order
          </h1>
          <p className="mt-4 text-[clamp(0.95rem,2vw,1.1rem)] text-slate-500 dark:text-slate-400">
            Fill in your requirements and we&apos;ll match you with the perfect writer
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-white/[0.04] dark:bg-white/[0.02] sm:p-8 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone (optional)</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Service</label>
                  <select required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputClass}>
                    <option value="">Select a service</option>
                    <option value="assignment">Assignment Help</option>
                    <option value="essay">Essay Writing</option>
                    <option value="coursework">Coursework Support</option>
                    <option value="dissertation">Dissertation Writing</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Academic Level</label>
                  <select value={form.academicLevel} onChange={(e) => setForm({ ...form, academicLevel: e.target.value })} className={inputClass}>
                    <option value="">Select level</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="masters">Masters</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Deadline</label>
                  <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Word Count</label>
                  <input type="number" value={form.wordCount} onChange={(e) => setForm({ ...form, wordCount: e.target.value })} placeholder="e.g. 2000" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Instructions & Requirements</label>
                <textarea rows={6} value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                  placeholder="Describe your requirements, marking criteria, specific instructions..."
                  className={inputClass} />
              </div>
              <Button type="submit" variant="luxury" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Order"}
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {[
              { icon: Shield, title: "100% Confidential", desc: "Your personal information and orders are completely secure and private." },
              { icon: Clock, title: "Fast Turnaround", desc: "We can handle urgent orders with delivery as fast as 24 hours." },
              { icon: Award, title: "Quality Guaranteed", desc: "Free revisions until you are fully satisfied with the work." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200/60 bg-white p-5 dark:border-white/[0.04] dark:bg-white/[0.02] sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                  <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.7] text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-20 sm:h-24" />
    </div>
  );
}
