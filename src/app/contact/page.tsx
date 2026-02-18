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

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">Get in touch with our team</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Get in Touch</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Have a question or ready to place an order? Reach out to us through any of the channels below.</p>

            <div className="mt-8 space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@editorsforuk.com", href: "mailto:hello@editorsforuk.com" },
                { icon: Phone, label: "Phone", value: "+44 123 456 789", href: "tel:+44123456789" },
                { icon: MapPin, label: "Location", value: "London, United Kingdom" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                    <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-slate-900 dark:text-white hover:text-blue-600">{item.value}</a>
                    ) : (
                      <p className="text-slate-900 dark:text-white">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-slate-800/50">
            {submitted ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Thank You!</h3>
                <p className="mt-2 text-slate-500">We&apos;ve received your inquiry and will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Full Name", key: "name", type: "text", required: true },
                  { label: "Email", key: "email", type: "email", required: true },
                  { label: "Phone (optional)", key: "phone", type: "tel" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{field.label}</label>
                    <input type={field.type} required={field.required}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Service Required</label>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select a service</option>
                    <option value="assignment">Assignment Help</option>
                    <option value="essay">Essay Writing</option>
                    <option value="coursework">Coursework Support</option>
                    <option value="dissertation">Dissertation Writing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Additional Details</label>
                  <textarea rows={4} value={form.instructions}
                    onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <Button type="submit" variant="luxury" size="lg" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Inquiry"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
