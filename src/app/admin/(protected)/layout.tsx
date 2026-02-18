import { redirect } from "next/navigation";
import { auth } from "@/lib/auth-options";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50 dark:bg-[#070c18]">
      <AdminSidebar user={session.user} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
