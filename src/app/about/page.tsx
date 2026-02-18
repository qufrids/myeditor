import { Shield, Award, Users, BookOpen, Clock, Headphones } from "lucide-react";

export const metadata = { title: "About Us" };

const values = [
  { icon: Shield, title: "Integrity", description: "100% original, plagiarism-free work backed by detailed reports." },
  { icon: Award, title: "Excellence", description: "Only the best UK-qualified writers with Masters and PhD degrees." },
  { icon: Users, title: "Personalisation", description: "Every piece tailored to your specific requirements and voice." },
  { icon: BookOpen, title: "Knowledge", description: "Deep subject expertise across all academic disciplines." },
  { icon: Clock, title: "Reliability", description: "On-time delivery, every time. We never miss deadlines." },
  { icon: Headphones, title: "Support", description: "24/7 customer support via chat, email, and phone." },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-950 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">About EditorsForUK</h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            We are a team of passionate academics and writers dedicated to helping UK students achieve academic excellence. Founded with the mission of providing premium, bespoke academic writing services.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 dark:border-white/5 dark:bg-slate-900/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10">
                  <v.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Story</h2>
          <div className="mt-8 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>EditorsForUK was founded by a group of UK university graduates who understood the challenges students face. Having navigated the demanding UK academic system ourselves, we know what it takes to produce work that meets the highest standards.</p>
            <p>Today, we have helped over 15,000 students across more than 100 UK universities achieve their academic goals. Our team of 200+ expert writers covers every discipline, from business and law to STEM and humanities.</p>
            <p>We believe every student deserves access to premium academic support, and we are committed to making that a reality.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
