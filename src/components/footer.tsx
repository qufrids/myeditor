import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, Crown, Shield, Award, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Reviews", href: "/reviews" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const serviceLinks = [
  { name: "Assignment Help", href: "/services/assignment" },
  { name: "Essay Writing", href: "/services/essay" },
  { name: "Coursework Support", href: "/services/coursework" },
  { name: "Dissertation Writing", href: "/services/dissertation" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Refund Policy", href: "/refund" },
];

const trustBadges = [
  { icon: Shield, label: "100% Confidential" },
  { icon: Award, label: "Expert Writers" },
  { icon: Clock, label: "On-Time Delivery" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0A1628]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-slate-950/40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <Crown className="h-6 w-6 text-amber-400 transition-transform duration-300 group-hover:scale-110" />
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                EditorsForUK
              </span>
            </Link>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400">Premium Academic Excellence</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              Connecting students with world-class academic writers and editors. Elevate your academic journey with bespoke, expertly crafted work tailored to UK university standards.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2.5 text-slate-400">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5">
                    <badge.icon className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <span className="text-xs font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300">Quick Links</h3>
            <ul className="mt-6 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={cn("group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white")}>
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300">Our Services</h3>
            <ul className="mt-6 flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white">
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300">Get in Touch</h3>
            <ul className="mt-6 flex flex-col gap-4">
              <li>
                <a href="mailto:hello@editorsforuk.com" className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-white">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 group-hover:bg-blue-500/10">
                    <Mail className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-sm">hello@editorsforuk.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+44123456789" className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-white">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 group-hover:bg-blue-500/10">
                    <Phone className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-sm">+44 123 456 789</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-sm">London, United Kingdom</span>
                </div>
              </li>
            </ul>
            <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <p className="text-xs font-medium text-slate-300">Trusted by 15,000+ Students</p>
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1.5 text-xs text-slate-500">4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-16">
          <div className="w-full border-t border-white/[0.06]" />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} EditorsForUK. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-xs text-slate-500 transition-colors hover:text-slate-300">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
