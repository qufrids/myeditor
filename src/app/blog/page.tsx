import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { createdAt: "desc" } });

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">Blog</h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">Academic tips, guides, and insights</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-slate-200/50 bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/5 dark:bg-slate-800/50">
              {post.coverImage && (
                <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
              )}
              <div className="p-6">
                {post.category && (
                  <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    {post.category}
                  </span>
                )}
                <h2 className="mt-2 text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{post.title}</h2>
                {post.excerpt && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>}
                <p className="mt-4 text-xs text-slate-400">{formatDate(post.createdAt)}</p>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-slate-500 py-16">Blog posts coming soon.</p>
        )}
      </div>
    </div>
  );
}
