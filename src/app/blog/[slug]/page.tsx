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

        <div className="prose prose-slate dark:prose-invert mt-10 max-w-none prose-p:text-[15px] prose-p:leading-[1.8] prose-headings:tracking-[-0.02em]">
          {post.content.split("\n").map((paragraph, i) => (
            paragraph.trim() ? <p key={i}>{paragraph}</p> : null
          ))}
        </div>
      </article>

      <div className="h-20 sm:h-24" />
    </div>
  );
}
