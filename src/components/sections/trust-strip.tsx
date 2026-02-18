"use client";

const universities = [
  "University of Oxford", "University of Cambridge", "Imperial College London",
  "UCL", "LSE", "University of Edinburgh", "King's College London",
  "University of Manchester", "University of Bristol", "University of Warwick",
  "University of Glasgow", "Durham University", "University of Birmingham",
  "University of Leeds", "University of Nottingham",
];

export function TrustStrip() {
  const items = [...universities, ...universities];

  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-white/60 py-5 dark:border-white/[0.04] dark:bg-slate-950/60">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent" />

      <div className="flex animate-marquee">
        {items.map((uni, i) => (
          <span key={i} className="mx-6 shrink-0 whitespace-nowrap text-[13px] font-medium tracking-wide text-slate-400/70 dark:text-slate-600 sm:mx-8">
            {uni}
          </span>
        ))}
      </div>
    </section>
  );
}
