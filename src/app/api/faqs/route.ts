import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { sortOrder: "asc" }, include: { service: true } });
  return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const faq = await prisma.fAQ.create({ data: body });
  return NextResponse.json(faq, { status: 201 });
}
