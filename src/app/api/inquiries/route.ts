import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(inquiries);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const inquiry = await prisma.inquiry.create({
      data: {
        name: body.name ?? "",
        email: body.email ?? "",
        phone: body.phone || null,
        service: body.service || "general",
        academicLevel: body.academicLevel || null,
        deadline: body.deadline || null,
        wordCount: body.wordCount ? Number(body.wordCount) : null,
        instructions: body.instructions || null,
      },
    });
    return NextResponse.json(inquiry, { status: 201 });
  } catch (err) {
    console.error("[inquiries POST]", err);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
