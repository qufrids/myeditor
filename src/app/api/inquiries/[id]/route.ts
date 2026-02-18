import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const inquiry = await prisma.inquiry.update({ where: { id }, data: body });
  return NextResponse.json(inquiry);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.inquiry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
