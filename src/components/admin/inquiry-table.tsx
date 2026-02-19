"use client";

import { useState } from "react";
import type { Inquiry } from "@prisma/client";
import { Eye, X, Phone, Mail, BookOpen, Calendar, FileText, AlignLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function InquiryTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [selected, setSelected] = useState<Inquiry | null>(null);

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-slate-200/60 bg-white dark:border-white/[0.04] dark:bg-white/[0.02]">
        <table className="w-full min-w-[740px]">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/[0.04]">
              {["Name", "Email", "Service", "Level", "Status", "Date", ""].map((h, i) => (
                <th key={i} className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.03]">
            {inquiries.map((inq) => (
              <tr key={inq.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.01]">
                <td className="px-5 py-3.5 text-[13px] font-medium text-slate-900 dark:text-white">{inq.name}</td>
                <td className="px-5 py-3.5 text-[13px] text-slate-500">{inq.email}</td>
                <td className="px-5 py-3.5 text-[13px] text-slate-500 capitalize">{inq.service || "—"}</td>
                <td className="px-5 py-3.5 text-[13px] text-slate-500 capitalize">{inq.academicLevel || "—"}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    inq.status === "new" ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" :
                    inq.status === "contacted" ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" :
                    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                  }`}>{inq.status}</span>
                </td>
                <td className="px-5 py-3.5 text-[13px] text-slate-400">{formatDate(inq.createdAt)}</td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => setSelected(inq)}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-slate-200"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </button>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-[13px] text-slate-400">No inquiries yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg rounded-2xl border border-slate-200/60 bg-white shadow-2xl dark:border-white/[0.06] dark:bg-[#0d1425]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4 dark:border-white/[0.06]">
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white">{selected.name}</h3>
                <p className="mt-0.5 text-[12px] text-slate-400">{formatDate(selected.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                  selected.status === "new" ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" :
                  selected.status === "contacted" ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" :
                  "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                }`}>{selected.status}</span>
                <button
                  onClick={() => setSelected(null)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Details grid */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Detail icon={Mail} label="Email" value={selected.email} />
                <Detail icon={Phone} label="Phone" value={selected.phone || "—"} />
                <Detail icon={BookOpen} label="Service" value={selected.service || "—"} capitalize />
                <Detail icon={BookOpen} label="Academic Level" value={selected.academicLevel || "—"} capitalize />
                <Detail icon={Calendar} label="Deadline" value={selected.deadline || "—"} />
                <Detail icon={FileText} label="Word Count" value={selected.wordCount ? selected.wordCount.toLocaleString() : "—"} />
              </div>

              {selected.instructions ? (
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.03]">
                  <div className="mb-2 flex items-center gap-2">
                    <AlignLeft className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-slate-400">Instructions</span>
                  </div>
                  <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
                    {selected.instructions}
                  </p>
                </div>
              ) : (
                <p className="py-2 text-center text-[13px] text-slate-400">No additional instructions provided</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
  capitalize,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/[0.03]">
      <div className="mb-1 flex items-center gap-1.5">
        <Icon className="h-3 w-3 text-slate-400" />
        <span className="text-[10px] font-medium uppercase tracking-[0.06em] text-slate-400">{label}</span>
      </div>
      <p className={`text-[13px] font-medium text-slate-800 dark:text-slate-200 ${capitalize ? "capitalize" : ""}`}>
        {value}
      </p>
    </div>
  );
}
