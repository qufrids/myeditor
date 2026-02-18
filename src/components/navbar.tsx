"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Menu, X, Sun, Moon, ChevronDown, Crown,
  FileText, PenTool, BookOpen, GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const services = [
  { name: "Assignment Help", href: "/services/assignment", icon: FileText, description: "Expert assignment assistance across all disciplines" },
  { name: "Essay Writing", href: "/services/essay", icon: PenTool, description: "Compelling essays crafted to perfection" },
  { name: "Coursework Support", href: "/services/coursework", icon: BookOpen, description: "Comprehensive coursework guidance & support" },
  { name: "Dissertation Writing", href: "/services/dissertation", icon: GraduationCap, description: "PhD-level dissertation expertise" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Reviews", href: "/reviews" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl",
      scrolled
        ? "bg-white/80 dark:bg-slate-950/85 shadow-[0_1px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_40px_rgba(0,0,0,0.3)]"
        : "bg-white/50 dark:bg-slate-950/50"
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between lg:h-20">
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative flex items-center">
              <Crown className="h-5 w-5 text-amber-500 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-white dark:to-slate-300">
              EditorsForUK
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}>
                  <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    {link.name}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full pt-3 -translate-x-1/2 w-[420px]">
                        <div className="overflow-hidden rounded-2xl border p-2 border-white/20 bg-white/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-slate-900/90">
                          {services.map((service) => (
                            <Link key={service.name} href={service.href}
                              className="group/item flex items-start gap-4 rounded-xl p-3.5 transition-colors hover:bg-slate-100/80 dark:hover:bg-white/5">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 transition-transform group-hover/item:scale-105">
                                <service.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{service.name}</p>
                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{service.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.name} href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                  {link.name}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Toggle theme">
              {mounted && (
                <AnimatePresence mode="wait">
                  <motion.div key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
                  </motion.div>
                </AnimatePresence>
              )}
            </button>

            <div className="hidden lg:block">
              <Button variant="luxury" size="md" asChild>
                <Link href="/order">Order Now</Link>
              </Button>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl lg:hidden text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
              aria-label="Toggle menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full w-[320px] lg:hidden bg-white/95 backdrop-blur-2xl dark:bg-slate-950/95 border-l border-slate-200/50 dark:border-white/10">
              <div className="flex h-18 items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <Crown className="h-5 w-5 text-amber-500" />
                  <span className="text-lg font-bold text-slate-900 dark:text-white">EditorsForUK</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.name}>
                      <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5">
                        {link.name}
                        <ChevronDown className={cn("h-4 w-4 transition-transform", mobileServicesOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="flex flex-col gap-1 py-1 pl-4">
                              {services.map((service) => (
                                <Link key={service.name} href={service.href} onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5">
                                  <service.icon className="h-4 w-4 text-blue-500" />
                                  {service.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5">
                      {link.name}
                    </Link>
                  )
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200/50 p-6 dark:border-white/10">
                <Button variant="luxury" size="lg" className="w-full" asChild>
                  <Link href="/order" onClick={() => setMobileOpen(false)}>Order Now</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
