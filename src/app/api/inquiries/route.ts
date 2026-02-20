import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendInquiryNotification, sendOrderConfirmation } from "@/lib/email";

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

    // Send both emails and log results clearly
    const [adminResult, confirmResult] = await Promise.allSettled([
      sendInquiryNotification(inquiry),
      sendOrderConfirmation(inquiry),
    ]);

    if (adminResult.status === "rejected") {
      console.error("[inquiries] Admin email failed:", adminResult.reason);
    }
    if (confirmResult.status === "rejected") {
      console.error("[inquiries] Confirmation email failed:", confirmResult.reason);
    }

    return NextResponse.json(inquiry, { status: 201 });
  } catch (err) {
    console.error("[inquiries POST]", err);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
