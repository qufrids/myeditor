import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(inquiries);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const inquiry = await prisma.inquiry.create({ data: body });
  return NextResponse.json(inquiry, { status: 201 });
}
