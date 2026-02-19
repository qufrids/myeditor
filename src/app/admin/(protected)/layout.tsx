import { redirect } from "next/navigation";
import { auth } from "@/lib/auth-options";
import { AdminLayoutClient } from "@/components/admin/admin-layout-client";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutClient user={session.user}>
      {children}
    </AdminLayoutClient>
  );
}

