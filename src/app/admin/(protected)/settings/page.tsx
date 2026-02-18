"use client";

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Settings</h1>
        <p className="mt-0.5 text-[13px] text-slate-500">Manage site configuration</p>
      </div>

      <div className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-white/[0.04] dark:bg-white/[0.02]">
        <p className="text-[13px] leading-[1.7] text-slate-500 dark:text-slate-400">
          Site settings management coming soon. You can manage your site configuration directly from the database.
        </p>
      </div>
    </div>
  );
}
