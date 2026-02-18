// Outer admin layout — intentionally a passthrough.
// Auth + sidebar live in src/app/admin/(protected)/layout.tsx.
// The login page at /admin/login uses this layout directly (no auth check).
export const metadata = {
  title: "Admin | EditorsForUK",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
