import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blog Posts</h1>
          <p className="mt-1 text-sm text-slate-500">{posts.length} posts</p>
        </div>
        <Button variant="luxury" asChild>
          <Link href="/admin/blog/new"><Plus className="mr-2 h-4 w-4" /> New Post</Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Date</th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {posts.map((post) => (
              <tr key={post.id} className="bg-white dark:bg-slate-900">
                <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{post.title}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{post.category || "-"}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${post.isPublished ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"}`}>
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">{formatDate(post.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/blog/${post.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400">Edit</Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">No blog posts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
