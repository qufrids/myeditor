import { NextRequest, NextResponse } from "next/server";
import { sendInquiryNotification, sendOrderConfirmation } from "@/lib/email";

/**
 * Diagnostic endpoint — visit /api/test-email?to=your@email.com to verify
 * email sending works end-to-end. Remove or protect this route in production.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const to = searchParams.get("to") ?? "info@cambridgewriters.co.uk";

  const config = {
    RESEND_API_KEY: process.env.RESEND_API_KEY
      ? `set (starts with ${process.env.RESEND_API_KEY.slice(0, 8)}...)`
      : "❌ NOT SET",
    EMAIL_FROM: process.env.EMAIL_FROM ?? "❌ NOT SET (will use fallback onboarding@resend.dev)",
    NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL ?? "❌ NOT SET (will use info@cambridgewriters.co.uk)",
    NODE_ENV: process.env.NODE_ENV,
  };

  const testData = {
    name: "Test User",
    email: to,
    phone: "+44 7700 900 000",
    service: "essay",
    academicLevel: "undergraduate",
    deadline: "2026-03-01",
    wordCount: 2000,
    instructions: "This is a test email to verify the email system is working.",
  };

  const results: Record<string, unknown> = { config };

  // Test admin notification
  try {
    await sendInquiryNotification(testData);
    results.adminNotification = "✅ sent successfully";
  } catch (err) {
    results.adminNotification = `❌ FAILED: ${err instanceof Error ? err.message : String(err)}`;
  }

  // Test customer confirmation
  try {
    await sendOrderConfirmation(testData);
    results.customerConfirmation = `✅ sent to ${to}`;
  } catch (err) {
    results.customerConfirmation = `❌ FAILED: ${err instanceof Error ? err.message : String(err)}`;
  }

  return NextResponse.json(results, { status: 200 });
}
