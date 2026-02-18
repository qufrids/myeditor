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
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#020617] pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_70%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-white leading-[1.1]">
            About EditorsForUK
          </h1>
          <p className="mt-5 text-[clamp(0.95rem,2vw,1.1rem)] leading-[1.7] text-slate-400 max-w-xl mx-auto">
            We are a team of passionate academics and writers dedicated to helping UK students achieve academic excellence. Founded with the mission of providing premium, bespoke academic writing services.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-200/60 bg-white p-6 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:border-white/[0.04] dark:bg-white/[0.02] dark:hover:bg-white/[0.03] sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10">
                  <v.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{v.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-slate-500 dark:text-slate-400">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-slate-50/60 dark:bg-slate-900/30">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">Our Story</h2>
          <div className="mt-8 space-y-5 text-[clamp(0.95rem,2vw,1.05rem)] leading-[1.8] text-slate-600 dark:text-slate-300">
            <p>EditorsForUK was founded by a group of UK university graduates who understood the challenges students face. Having navigated the demanding UK academic system ourselves, we know what it takes to produce work that meets the highest standards.</p>
            <p>Today, we have helped over 15,000 students across more than 100 UK universities achieve their academic goals. Our team of 200+ expert writers covers every discipline, from business and law to STEM and humanities.</p>
            <p>We believe every student deserves access to premium academic support, and we are committed to making that a reality.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
