import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};
  return { title: post.metaTitle || post.title, description: post.metaDesc || post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || !post.isPublished) notFound();

  return (
    <div className="pt-28 sm:pt-32">
      <article className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
        </Link>

        <div className="mt-8">
          {post.category && (
            <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em] text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              {post.category}
            </span>
          )}
          <h1 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.03em] leading-[1.15] text-slate-900 dark:text-white">{post.title}</h1>
          <p className="mt-3 text-[13px] text-slate-400">{formatDate(post.createdAt)}</p>
        </div>

        {post.coverImage && (
          <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
            <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
          </div>
        )}

        {/* Render stored HTML with full Tailwind prose styling */}
        <div
          className="prose prose-slate dark:prose-invert mt-10 max-w-none
            prose-headings:tracking-[-0.02em] prose-headings:font-bold
            prose-h1:text-[clamp(1.5rem,3vw,2rem)]
            prose-h2:text-[clamp(1.25rem,2.5vw,1.6rem)]
            prose-h3:text-[1.15rem]
            prose-p:text-[15px] prose-p:leading-[1.8] prose-p:text-slate-600 dark:prose-p:text-slate-300
            prose-li:text-[15px] prose-li:text-slate-600 dark:prose-li:text-slate-300
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400
            prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg dark:prose-blockquote:bg-blue-500/5
            prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[13px] dark:prose-code:bg-blue-500/10 dark:prose-code:text-blue-300
            prose-pre:bg-slate-900 prose-pre:rounded-xl
            prose-img:rounded-xl prose-img:shadow-md
            prose-hr:border-slate-200 dark:prose-hr:border-white/10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <div className="h-20 sm:h-24" />
    </div>
  );
}
