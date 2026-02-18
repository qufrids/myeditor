import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { createdAt: "desc" } });

  return (
    <div className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">Blog</h1>
          <p className="mt-4 text-[clamp(0.95rem,2vw,1.1rem)] text-slate-500 dark:text-slate-400">Academic tips, guides, and insights</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-slate-200/60 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-slate-200 dark:border-white/[0.04] dark:bg-white/[0.02] dark:hover:border-white/[0.08]">
              {post.coverImage && (
                <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
              )}
              <div className="p-6 sm:p-7">
                {post.category && (
                  <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em] text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    {post.category}
                  </span>
                )}
                <h2 className="mt-2.5 text-[16px] font-semibold tracking-[-0.01em] text-slate-900 leading-snug transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-[17px]">{post.title}</h2>
                {post.excerpt && <p className="mt-2 text-[13px] leading-[1.7] text-slate-500 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>}
                <p className="mt-4 text-[12px] text-slate-400">{formatDate(post.createdAt)}</p>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-slate-500 py-20 text-[15px]">Blog posts coming soon.</p>
        )}
      </div>

      <div className="h-20 sm:h-24" />
    </div>
  );
}
