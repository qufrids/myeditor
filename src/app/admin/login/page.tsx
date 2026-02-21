"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Crown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  const inputClass = "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 transition-colors focus:border-blue-500/70 focus:outline-none focus:ring-2 focus:ring-blue-500/10";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] p-4">
      <div className="pointer-events-none fixed inset-0 opacity-50 bg-[radial-gradient(circle_at_40%_30%,rgba(59,130,246,0.12),transparent_55%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-30 bg-[radial-gradient(circle_at_65%_70%,rgba(139,92,246,0.08),transparent_50%)]" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/20">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-[20px] font-bold tracking-[-0.02em] text-white">Admin Login</h1>
            <p className="mt-1.5 text-[13px] text-slate-500">Sign in to manage Cambridge Writers</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-[13px] text-red-400">
                {error}
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-slate-400">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
                placeholder="admin@cambridgewriters.co.uk"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-slate-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClass}
                placeholder="Enter your password"
              />
            </div>
            <div className="pt-1">
              <Button type="submit" variant="luxury" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
