import Link from "next/link";
import { Mail, Phone, MapPin, Crown } from "lucide-react";

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

export function Footer() {
  return (
    <footer className="relative bg-slate-50 text-slate-600 dark:bg-[#020617] dark:text-slate-400">
      {/* Top separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/[0.06]" />

      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500 transition-transform duration-300 group-hover:rotate-[-6deg]" />
              <span className="text-[15px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">cambridgewriters</span>
            </Link>
            <p className="mt-4 max-w-[260px] text-[13px] leading-[1.7] text-slate-500 dark:text-slate-500">
              Connecting students with world-class academic writers. Bespoke work tailored to UK university standards.
            </p>

            {/* Contact */}
            <div className="mt-6 flex flex-col gap-2.5">
              <a href="mailto:info@cambridgewriters.co.uk" className="flex items-center gap-2.5 text-[13px] text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-white">
                <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600" /> info@cambridgewriters.co.uk
              </a>
              <a href="tel:+44123456789" className="flex items-center gap-2.5 text-[13px] text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-white">
                <Phone className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600" /> +44 123 456 789
              </a>
              <div className="flex items-center gap-2.5 text-[13px] text-slate-500 dark:text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600" /> London, United Kingdom
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">Quick Links</h3>
            <ul className="mt-4 flex flex-col gap-2.5 sm:mt-5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] text-slate-500 transition-colors duration-200 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">Services</h3>
            <ul className="mt-4 flex flex-col gap-2.5 sm:mt-5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] text-slate-500 transition-colors duration-200 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Trust */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">Trusted</h3>
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/[0.04] dark:bg-white/[0.02] sm:mt-5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-[12px] font-medium text-slate-500 dark:text-slate-400">4.9/5</span>
              </div>
              <p className="mt-2 text-[13px] text-slate-500 dark:text-slate-500">Trusted by 15,000+ students across 100+ UK universities</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-slate-200 pt-6 dark:border-white/[0.04] sm:mt-14">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[12px] text-slate-400 dark:text-slate-600">&copy; {new Date().getFullYear()} cambridgewriters. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              {legalLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-[12px] text-slate-400 transition-colors hover:text-slate-700 dark:text-slate-600 dark:hover:text-slate-400">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
