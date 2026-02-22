"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", instructions: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSubmitted(true);
    setLoading(false);
  };

  const inputClass = "w-full rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-white dark:focus:border-blue-400";

  return (
    <div className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">
            Contact Us
          </h1>
          <p className="mt-4 text-[clamp(0.95rem,2vw,1.1rem)] text-slate-500 dark:text-slate-400">
            Get in touch with our team
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: Contact info */}
          <div>
            <h2 className="text-[clamp(1.25rem,3vw,1.5rem)] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Get in Touch</h2>
            <p className="mt-3 text-[14px] leading-[1.7] text-slate-500 dark:text-slate-400">Have a question or ready to place an order? Reach out to us through any of the channels below.</p>

            <div className="mt-8 space-y-5">
              {[
                { icon: Mail, label: "Email", value: "info@cambridgewriters.co.uk", href: "mailto:info@cambridgewriters.co.uk" },
                { icon: Phone, label: "Phone", value: "+44 7877 186551", href: "tel:+447877186551" },
                { icon: MapPin, label: "Location", value: "London, United Kingdom" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                    <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-slate-400">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[14px] font-medium text-slate-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">{item.value}</a>
                    ) : (
                      <p className="text-[14px] font-medium text-slate-900 dark:text-white">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-white/[0.04] dark:bg-white/[0.02] sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                  <Mail className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Thank You!</h3>
                <p className="mt-2 text-[14px] text-slate-500 max-w-xs">We&apos;ve received your inquiry and will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Full Name", key: "name", type: "text", required: true },
                  { label: "Email", key: "email", type: "email", required: true },
                  { label: "Phone (optional)", key: "phone", type: "tel" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">{field.label}</label>
                    <input type={field.type} required={field.required}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className={inputClass} />
                  </div>
                ))}
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Service Required</label>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} required
                    className={inputClass}>
                    <option value="">Select a service</option>
                    <option value="assignment">Assignment Help</option>
                    <option value="essay">Essay Writing</option>
                    <option value="coursework">Coursework Support</option>
                    <option value="dissertation">Dissertation Writing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Additional Details</label>
                  <textarea rows={4} value={form.instructions}
                    onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                    className={inputClass} />
                </div>
                <Button type="submit" variant="luxury" size="lg" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Inquiry"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="h-20 sm:h-24" />
    </div>
  );
}
