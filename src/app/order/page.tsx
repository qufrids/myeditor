"use client";

import { useState } from "react";
import { Loader2, Shield, Clock, Award } from "lucide-react";
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

  if (submitted) {
    return (
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8 py-20">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-12 dark:border-emerald-500/20 dark:bg-emerald-500/5">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Order Received!</h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">Thank you for your order. Our team will review your requirements and contact you within 2 hours with a quote and writer match.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">Place Your Order</h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">Fill in your requirements and we&apos;ll match you with the perfect writer</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-slate-800/50 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone (optional)</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Service</label>
                  <select required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select a service</option>
                    <option value="assignment">Assignment Help</option>
                    <option value="essay">Essay Writing</option>
                    <option value="coursework">Coursework Support</option>
                    <option value="dissertation">Dissertation Writing</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Academic Level</label>
                  <select value={form.academicLevel} onChange={(e) => setForm({ ...form, academicLevel: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select level</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="masters">Masters</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Deadline</label>
                  <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Word Count</label>
                  <input type="number" value={form.wordCount} onChange={(e) => setForm({ ...form, wordCount: e.target.value })}
                    placeholder="e.g. 2000"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Instructions & Requirements</label>
                <textarea rows={6} value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                  placeholder="Describe your requirements, marking criteria, specific instructions..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <Button type="submit" variant="luxury" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Order"}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            {[
              { icon: Shield, title: "100% Confidential", desc: "Your personal information and orders are completely secure and private." },
              { icon: Clock, title: "Fast Turnaround", desc: "We can handle urgent orders with delivery as fast as 24 hours." },
              { icon: Award, title: "Quality Guaranteed", desc: "Free revisions until you are fully satisfied with the work." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-800/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
                  <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
