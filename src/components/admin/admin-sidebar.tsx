"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Star, MessageSquare, BookOpen,
  HelpCircle, Settings, LogOut, Crown, ChevronLeft, BarChart3, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Services", href: "/admin/services", icon: FileText },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Blog Posts", href: "/admin/blog", icon: BookOpen },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { name: "Stats", href: "/admin/stats", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  user: { name?: string | null; email?: string | null };
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AdminSidebar({ user, mobileOpen = false, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const close = () => onMobileClose?.();

  const handleSignOut = async () => {
    const { signOut } = await import("next-auth/react");
    // Use window.location.origin so the redirect always goes to the actual
    // domain (production or local) rather than relying on NEXTAUTH_URL.
    signOut({ callbackUrl: `${window.location.origin}/admin/login` });
  };

  return (
    <aside
      className={cn(
        // Base
        "flex flex-col border-r border-slate-200/80 bg-white dark:border-white/[0.04] dark:bg-[#0a0f1a]",
        // Mobile: fixed overlay drawer, slide in/out
        "fixed inset-y-0 left-0 z-50 w-[280px] transition-transform duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop: back in normal flex flow, no translate
        "lg:relative lg:inset-auto lg:z-auto lg:translate-x-0 lg:transition-[width] lg:duration-300",
        collapsed ? "lg:w-[72px]" : "lg:w-60",
      )}
    >
      {/* Brand header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 px-4 dark:border-white/[0.04]">
        <Link href="/admin" onClick={close} className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm">
            <Crown className="h-4 w-4 text-white" />
          </div>
          <span className={cn(
            "truncate text-[13px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white",
            collapsed && "lg:hidden",
          )}>
            cambridgewriters
          </span>
        </Link>

        {/* Desktop: collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-white/[0.05] lg:flex"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")} />
        </button>

        {/* Mobile: close button */}
        <button
          onClick={close}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-white/[0.05] lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3">
        <div className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={close}
                title={collapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-150",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-200",
                )}
              >
                <item.icon
                  className={cn("shrink-0", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400")}
                  style={{ width: 18, height: 18 }}
                />
                <span className={cn(collapsed && "lg:hidden")}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-slate-200/80 p-2.5 dark:border-white/[0.04]">
        <div className={cn("mb-1 rounded-xl px-3 py-2", collapsed && "lg:hidden")}>
          <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">{user.name || "Admin"}</p>
          <p className="truncate text-[11px] text-slate-400">{user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          title={collapsed ? "Sign Out" : undefined}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/[0.08]"
        >
          <LogOut style={{ width: 18, height: 18 }} className="shrink-0" />
          <span className={cn(collapsed && "lg:hidden")}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
