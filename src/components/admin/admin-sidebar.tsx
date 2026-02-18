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
      "flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-white/10 dark:bg-slate-900",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-amber-500" />
          {!collapsed && <span className="font-bold text-slate-900 dark:text-white">Admin</span>}
        </Link>
        <button onClick={() => setCollapsed(!collapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">
          <ChevronLeft className={cn("h-4 w-4 text-slate-500 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5"
              )}>
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-3 dark:border-white/10">
        {!collapsed && (
          <div className="mb-3 px-3">
            <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name || "Admin"}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
        )}
        <button onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10">
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </aside>
  );
}
