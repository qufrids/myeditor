"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Star, MessageSquare, BookOpen,
  HelpCircle, Settings, LogOut, Crown, ChevronLeft, BarChart3,
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
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleSignOut = async () => {
    const { signOut } = await import("next-auth/react");
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <aside className={cn(
      "flex h-full flex-col border-r border-slate-200/80 bg-white transition-all duration-300 dark:border-white/[0.04] dark:bg-[#0a0f1a]",
      collapsed ? "w-[72px]" : "w-60"
    )}>
      {/* Brand */}
      <div className="flex h-14 items-center justify-between border-b border-slate-200/80 px-4 dark:border-white/[0.04]">
        <Link href="/admin" className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm">
            <Crown className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <span className="text-[13px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">EditorsForUK</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-white/[0.05]"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")} />
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
                title={collapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-150",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-200"
                )}
              >
                <item.icon className={cn("h-4.5 w-4.5 shrink-0", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400")} style={{ width: 18, height: 18 }} />
                {!collapsed && item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200/80 p-2.5 dark:border-white/[0.04]">
        {!collapsed && (
          <div className="mb-1 rounded-xl px-3 py-2">
            <p className="text-[13px] font-semibold text-slate-900 dark:text-white truncate">{user.name || "Admin"}</p>
            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleSignOut}
          title={collapsed ? "Sign Out" : undefined}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/[0.08]"
        >
          <LogOut style={{ width: 18, height: 18 }} className="shrink-0" />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </aside>
  );
}
