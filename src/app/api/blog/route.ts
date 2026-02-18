import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function GET() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const slug = slugify(body.title, { lower: true, strict: true });
  const post = await prisma.blogPost.create({ data: { ...body, slug } });
  return NextResponse.json(post, { status: 201 });
}
