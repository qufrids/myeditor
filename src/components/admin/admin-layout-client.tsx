"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Crown } from "lucide-react";
import { AdminSidebar } from "./admin-sidebar";

interface AdminLayoutClientProps {
  user: { name?: string | null; email?: string | null };
  children: React.ReactNode;
}

export function AdminLayoutClient({ user, children }: AdminLayoutClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50 dark:bg-[#070c18]">

      {/* ── Mobile top bar (hidden on lg+) ── */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200/80 bg-white px-4 lg:hidden dark:border-white/[0.04] dark:bg-[#0a0f1a]">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm">
            <Crown className="h-4 w-4 text-white" />
          </div>
          <span className="text-[13px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
            cambridgewriters
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/[0.06]"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* ── Sidebar ── */}
      <AdminSidebar
        user={user}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* ── Mobile backdrop ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Page content ── */}
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>

    </div>
  );
}
