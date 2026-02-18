import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Blog Posts</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">{posts.length} posts</p>
        </div>
        <Button variant="luxury" size="sm" asChild>
          <Link href="/admin/blog/new"><Plus className="mr-1.5 h-3.5 w-3.5" /> New Post</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/60 bg-white dark:border-white/[0.04] dark:bg-white/[0.02]">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/[0.04]">
              {["Title", "Category", "Status", "Date", ""].map((h, i) => (
                <th key={i} className={`px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.07em] text-slate-400 ${i === 4 ? "text-right" : "text-left"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.03]">
            {posts.map((post) => (
              <tr key={post.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.01]">
                <td className="px-5 py-3.5 text-[13px] font-medium text-slate-900 dark:text-white max-w-[280px] truncate">{post.title}</td>
                <td className="px-5 py-3.5 text-[13px] text-slate-500">{post.category || "—"}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${post.isPublished ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"}`}>
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-[13px] text-slate-400">{formatDate(post.createdAt)}</td>
                <td className="px-5 py-3.5 text-right">
                  <Link href={`/admin/blog/${post.id}`} className="text-[13px] font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Edit</Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-[13px] text-slate-400">No blog posts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
