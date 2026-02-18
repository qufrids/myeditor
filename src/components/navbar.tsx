"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Menu, X, Sun, Moon, ChevronDown, Crown,
  FileText, PenTool, BookOpen, GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const services = [
  { name: "Assignment Help", href: "/services/assignment", icon: FileText, description: "Expert assistance across all disciplines" },
  { name: "Essay Writing", href: "/services/essay", icon: PenTool, description: "Compelling essays crafted to perfection" },
  { name: "Coursework Support", href: "/services/coursework", icon: BookOpen, description: "Comprehensive coursework guidance" },
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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled
        ? "bg-white/85 dark:bg-slate-950/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.04),0_4px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_rgba(255,255,255,0.03)]"
        : "bg-transparent"
    )}>
      {/* Subtle bottom border on scroll */}
      <div className={cn(
        "absolute inset-x-0 bottom-0 h-px transition-opacity duration-500",
        scrolled ? "opacity-100 bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/[0.06]" : "opacity-0"
      )} />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-[72px]">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0">
            <div className="relative">
              <Crown className="h-5 w-5 text-amber-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]" />
            </div>
            <span className="text-[17px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">
              EditorsForUK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}>
                  <button className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200",
                    isActive(link.href)
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  )}>
                    {link.name}
                    <ChevronDown className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      servicesOpen && "rotate-180"
                    )} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-1/2 top-full pt-2 -translate-x-1/2 w-[380px]">
                        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/95 p-1.5 backdrop-blur-2xl shadow-[0_16px_64px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-slate-900/95 dark:shadow-[0_16px_64px_rgba(0,0,0,0.4)]">
                          {services.map((service) => (
                            <Link key={service.name} href={service.href}
                              className="group/item flex items-center gap-3.5 rounded-xl p-3 transition-all duration-150 hover:bg-slate-50 dark:hover:bg-white/[0.04]">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 transition-transform duration-200 group-hover/item:scale-105">
                                <service.icon className="h-[18px] w-[18px] text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-[13px] font-semibold text-slate-900 dark:text-white">{service.name}</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-500 leading-snug">{service.description}</p>
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
                  className={cn(
                    "rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200",
                    isActive(link.href)
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  )}>
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/[0.06] dark:hover:text-slate-300"
              aria-label="Toggle theme">
              {mounted && (
                <AnimatePresence mode="wait">
                  <motion.div key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </motion.div>
                </AnimatePresence>
              )}
            </button>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Button variant="luxury" size="sm" asChild>
                <Link href="/order">Order Now</Link>
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full lg:hidden text-slate-500 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
              aria-label="Toggle menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[min(85vw,360px)] flex-col lg:hidden bg-white dark:bg-slate-950 border-l border-slate-200/50 dark:border-white/[0.06] shadow-[-16px_0_48px_rgba(0,0,0,0.06)]">

              {/* Drawer Header */}
              <div className="flex h-16 items-center justify-between px-5 border-b border-slate-100 dark:border-white/[0.06]">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <Crown className="h-5 w-5 text-amber-500" />
                  <span className="text-[15px] font-bold text-slate-900 dark:text-white">EditorsForUK</span>
                </Link>
                <button onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06]">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <div className="flex flex-col gap-0.5">
                  {navLinks.map((link, i) =>
                    link.hasDropdown ? (
                      <div key={link.name}>
                        <motion.button
                          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                            isActive(link.href)
                              ? "text-slate-900 dark:text-white bg-slate-50 dark:bg-white/[0.04]"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                          )}>
                          {link.name}
                          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileServicesOpen && "rotate-180")} />
                        </motion.button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                              <div className="flex flex-col gap-0.5 py-1 pl-3">
                                {services.map((service) => (
                                  <Link key={service.name} href={service.href} onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-[13px] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.03] hover:text-slate-900 dark:hover:text-white transition-colors">
                                    <service.icon className="h-4 w-4 text-blue-500 shrink-0" />
                                    {service.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.div key={link.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                        <Link href={link.href} onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                            isActive(link.href)
                              ? "text-slate-900 dark:text-white bg-slate-50 dark:bg-white/[0.04]"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                          )}>
                          {link.name}
                        </Link>
                      </motion.div>
                    )
                  )}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-slate-100 dark:border-white/[0.06] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
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
