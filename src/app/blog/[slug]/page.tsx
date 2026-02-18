import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

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
    <div className="pt-24 pb-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">&larr; Back to Blog</Link>

        <div className="mt-8">
          {post.category && (
            <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              {post.category}
            </span>
          )}
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{post.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{formatDate(post.createdAt)}</p>
        </div>

        {post.coverImage && (
          <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
            <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">
          {post.content.split("\n").map((paragraph, i) => (
            paragraph.trim() ? <p key={i}>{paragraph}</p> : null
          ))}
        </div>
      </article>
    </div>
  );
}
