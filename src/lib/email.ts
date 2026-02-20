import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_TO = process.env.NOTIFICATION_EMAIL ?? "info@cambridgewriters.co.uk";
const FROM = process.env.EMAIL_FROM ?? "Cambridge Writers <onboarding@resend.dev>";
const ADMIN_URL = "https://cambridgewriters.co.uk/admin/inquiries";

interface InquiryData {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  academicLevel?: string | null;
  deadline?: string | null;
  wordCount?: number | null;
  instructions?: string | null;
}

function row(label: string, value: string | null | undefined) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 0;color:#64748b;font-size:13px;width:140px;vertical-align:top">${label}</td>
      <td style="padding:8px 0;color:#0f172a;font-size:13px;font-weight:500;vertical-align:top">${value}</td>
    </tr>`;
}

function buildInquiryText(data: InquiryData): string {
  const capitalize = (s?: string | null) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";
  const date = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return [
    "CAMBRIDGE WRITERS — NEW INQUIRY",
    date,
    "",
    "CUSTOMER",
    `Name:   ${data.name}`,
    `Email:  ${data.email}`,
    data.phone ? `Phone:  ${data.phone}` : null,
    "",
    "ORDER DETAILS",
    `Service:        ${capitalize(data.service)}`,
    data.academicLevel ? `Academic Level: ${capitalize(data.academicLevel)}` : null,
    data.deadline     ? `Deadline:       ${data.deadline}` : null,
    data.wordCount    ? `Word Count:     ${data.wordCount.toLocaleString()} words` : null,
    "",
    data.instructions ? "INSTRUCTIONS\n" + data.instructions : null,
    "",
    `View in admin: ${ADMIN_URL}`,
    "",
    "---",
    "Automated notification from cambridgewriters.co.uk",
    "Reply to this email to contact the customer directly.",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function buildInquiryHtml(data: InquiryData): string {
  const capitalize = (s?: string | null) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#3b82f6 0%,#6366f1 100%);border-radius:16px 16px 0 0;padding:28px 32px">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <div style="display:inline-flex;align-items:center;gap:8px">
                  <div style="background:linear-gradient(135deg,#fbbf24,#f97316);border-radius:8px;width:28px;height:28px;display:inline-block;line-height:28px;text-align:center;font-size:14px">✏️</div>
                  <span style="color:#fff;font-size:13px;font-weight:700;letter-spacing:-0.01em">cambridgewriters</span>
                </div>
                <h1 style="margin:12px 0 4px;color:#fff;font-size:20px;font-weight:700;letter-spacing:-0.02em">New Inquiry Received</h1>
                <p style="margin:0;color:rgba(255,255,255,0.75);font-size:13px">${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
              </td>
              <td align="right" valign="top">
                <div style="background:rgba(255,255,255,0.15);border-radius:20px;padding:4px 12px;display:inline-block;color:#fff;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em">New</div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#fff;padding:28px 32px">

          <!-- Customer -->
          <h2 style="margin:0 0 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8">Customer</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f1f5f9;margin-bottom:20px">
            ${row("Name", data.name)}
            ${row("Email", `<a href="mailto:${data.email}" style="color:#3b82f6;text-decoration:none">${data.email}</a>`)}
            ${row("Phone", data.phone)}
          </table>

          <!-- Order details -->
          <h2 style="margin:0 0 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8">Order Details</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f1f5f9;margin-bottom:20px">
            ${row("Service", capitalize(data.service))}
            ${row("Academic Level", capitalize(data.academicLevel))}
            ${row("Deadline", data.deadline)}
            ${row("Word Count", data.wordCount ? `${data.wordCount.toLocaleString()} words` : null)}
          </table>

          <!-- Instructions -->
          ${data.instructions ? `
          <h2 style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8">Instructions</h2>
          <div style="background:#f8fafc;border-radius:12px;padding:16px;margin-bottom:20px;border-left:3px solid #3b82f6">
            <p style="margin:0;color:#334155;font-size:13px;line-height:1.6;white-space:pre-wrap">${data.instructions}</p>
          </div>` : ""}

          <!-- CTA -->
          <div style="text-align:center;margin-top:8px">
            <a href="${ADMIN_URL}" style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;text-decoration:none;font-size:13px;font-weight:600;padding:11px 28px;border-radius:100px;letter-spacing:-0.01em">View in Admin Dashboard →</a>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8fafc;border-radius:0 0 16px 16px;padding:20px 32px;border-top:1px solid #e2e8f0">
          <p style="margin:0;color:#94a3b8;font-size:11px;text-align:center">
            This is an automated notification from your Cambridge Writers website.<br>
            Reply directly to this email to contact the customer.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendInquiryNotification(data: InquiryData): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping notification email");
    return;
  }

  try {
    const service = data.service
      ? data.service.charAt(0).toUpperCase() + data.service.slice(1)
      : "General";

    const { error } = await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: data.email,
      subject: `Inquiry from ${data.name} – ${service}`,
      html: buildInquiryHtml(data),
      text: buildInquiryText(data),
    });

    if (error) {
      console.error("[email] Resend error:", error);
    } else {
      console.log(`[email] Notification sent for inquiry from ${data.email}`);
    }
  } catch (err) {
    // Never block the main request — log and continue
    console.error("[email] Failed to send notification:", err);
  }
}
