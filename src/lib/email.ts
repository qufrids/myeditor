import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_TO = process.env.NOTIFICATION_EMAIL ?? "info@cambridgewriters.co.uk";
const FROM = process.env.EMAIL_FROM ?? "Cambridge Writers <onboarding@resend.dev>";
const CUSTOMER_FROM = "Cambridge Writers <info@cambridgewriters.co.uk>";
const ADMIN_URL = "https://cambridgewriters.co.uk/admin/inquiries";
const SITE_URL = "https://cambridgewriters.co.uk";

export interface InquiryData {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  academicLevel?: string | null;
  deadline?: string | null;
  wordCount?: number | null;
  instructions?: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cap(s?: string | null) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : null;
}

function row(label: string, value: string | null | undefined) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 0;color:#64748b;font-size:13px;width:140px;vertical-align:top">${label}</td>
      <td style="padding:8px 0;color:#0f172a;font-size:13px;font-weight:500;vertical-align:top">${value}</td>
    </tr>`;
}

// ─── Admin notification ───────────────────────────────────────────────────────

function buildInquiryText(data: InquiryData): string {
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
    `Service:        ${cap(data.service) ?? "—"}`,
    data.academicLevel ? `Academic Level: ${cap(data.academicLevel)}` : null,
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
  ].filter((l) => l !== null).join("\n");
}

function buildInquiryHtml(data: InquiryData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#3b82f6 0%,#6366f1 100%);border-radius:16px 16px 0 0;padding:28px 32px">
          <h1 style="margin:0 0 4px;color:#fff;font-size:20px;font-weight:700">New Inquiry Received</h1>
          <p style="margin:0;color:rgba(255,255,255,0.75);font-size:13px">${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#fff;padding:28px 32px">
          <h2 style="margin:0 0 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8">Customer</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f1f5f9;margin-bottom:20px">
            ${row("Name", data.name)}
            ${row("Email", `<a href="mailto:${data.email}" style="color:#3b82f6;text-decoration:none">${data.email}</a>`)}
            ${row("Phone", data.phone)}
          </table>

          <h2 style="margin:0 0 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8">Order Details</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f1f5f9;margin-bottom:20px">
            ${row("Service", cap(data.service))}
            ${row("Academic Level", cap(data.academicLevel))}
            ${row("Deadline", data.deadline)}
            ${row("Word Count", data.wordCount ? `${data.wordCount.toLocaleString()} words` : null)}
          </table>

          ${data.instructions ? `
          <h2 style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8">Instructions</h2>
          <div style="background:#f8fafc;border-radius:12px;padding:16px;margin-bottom:20px;border-left:3px solid #3b82f6">
            <p style="margin:0;color:#334155;font-size:13px;line-height:1.6;white-space:pre-wrap">${data.instructions}</p>
          </div>` : ""}

          <div style="text-align:center;margin-top:8px">
            <a href="${ADMIN_URL}" style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;text-decoration:none;font-size:13px;font-weight:600;padding:11px 28px;border-radius:100px">View in Admin Dashboard →</a>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8fafc;border-radius:0 0 16px 16px;padding:20px 32px;border-top:1px solid #e2e8f0">
          <p style="margin:0;color:#94a3b8;font-size:11px;text-align:center">
            Automated notification · Cambridge Writers<br>
            Reply directly to this email to contact the customer.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Customer confirmation ────────────────────────────────────────────────────

function buildConfirmationText(data: InquiryData): string {
  return [
    `Hi ${data.name},`,
    "",
    "Thank you for reaching out to Cambridge Writers. We have received your order and our team will review your requirements shortly.",
    "",
    "YOUR ORDER SUMMARY",
    `Service:        ${cap(data.service) ?? "—"}`,
    data.academicLevel ? `Academic Level: ${cap(data.academicLevel)}` : null,
    data.deadline      ? `Deadline:       ${data.deadline}` : null,
    data.wordCount     ? `Word Count:     ${data.wordCount.toLocaleString()} words` : null,
    "",
    "WHAT HAPPENS NEXT",
    "1. Our team reviews your requirements (within 2 hours)",
    "2. We match you with the best-suited expert",
    "3. We contact you to confirm details and get started",
    "",
    "Questions? Simply reply to this email or contact us at info@cambridgewriters.co.uk",
    "",
    "Best regards,",
    "The Cambridge Writers Team",
    SITE_URL,
  ].filter((l) => l !== null).join("\n");
}

function buildConfirmationHtml(data: InquiryData): string {
  const detailRow = (label: string, value: string | null | undefined) => {
    if (!value) return "";
    return `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #f1f5f9">
          <span style="font-size:12px;color:#94a3b8;display:block;margin-bottom:2px">${label}</span>
          <span style="font-size:14px;font-weight:600;color:#0f172a">${value}</span>
        </td>
      </tr>`;
  };

  const step = (n: string, title: string, desc: string) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f8fafc">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:top;padding-top:1px">
            <div style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:26px;margin-right:14px">${n}</div>
          </td>
          <td>
            <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#0f172a">${title}</p>
            <p style="margin:0;font-size:12px;color:#64748b">${desc}</p>
          </td>
        </tr></table>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Order Received – Cambridge Writers</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
  <tr><td align="center">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">

    <tr><td style="background:linear-gradient(135deg,#1e3a5f 0%,#1e1b4b 100%);border-radius:20px 20px 0 0;padding:40px 36px 36px">
      <div style="width:56px;height:56px;background:rgba(34,197,94,0.15);border-radius:50%;margin-bottom:16px;text-align:center;line-height:56px;font-size:28px">✅</div>
      <h1 style="margin:0 0 8px;color:#fff;font-size:26px;font-weight:800">Order Received!</h1>
      <p style="margin:0;color:rgba(255,255,255,0.65);font-size:15px;line-height:1.5">
        Hi <strong style="color:rgba(255,255,255,0.9)">${data.name}</strong> — thank you for choosing Cambridge Writers.<br>
        We've got your requirements and our team is already on it.
      </p>
    </td></tr>

    <tr><td style="background:#fff;padding:32px 36px 0">
      <h2 style="margin:0 0 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8">Your Order Summary</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;margin-bottom:28px">
        ${detailRow("Service", cap(data.service))}
        ${detailRow("Academic Level", cap(data.academicLevel))}
        ${detailRow("Deadline", data.deadline)}
        ${detailRow("Word Count", data.wordCount ? `${data.wordCount.toLocaleString()} words` : null)}
      </table>
    </td></tr>

    <tr><td style="background:#fff;padding:0 36px 28px">
      <h2 style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8">What Happens Next</h2>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${step("1", "Requirements Review", "Our team reviews your order within 2 hours")}
        ${step("2", "Expert Matched", "We assign the most suitable academic writer for your subject")}
        ${step("3", "We Contact You", "We reach out to confirm details and get started")}
      </table>
    </td></tr>

    <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:none;border-right:none;padding:20px 36px">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td>
          <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#0f172a">Have a question?</p>
          <p style="margin:0;font-size:13px;color:#64748b">Reply to this email or write to <a href="mailto:info@cambridgewriters.co.uk" style="color:#3b82f6;text-decoration:none;font-weight:500">info@cambridgewriters.co.uk</a></p>
        </td>
        <td align="right">
          <a href="${SITE_URL}" style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;text-decoration:none;font-size:12px;font-weight:600;padding:9px 20px;border-radius:100px;white-space:nowrap">Visit Website</a>
        </td>
      </tr></table>
    </td></tr>

    <tr><td style="background:#fff;border-radius:0 0 20px 20px;padding:24px 36px">
      <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;text-align:center">
        Cambridge Writers · <a href="${SITE_URL}" style="color:#94a3b8;text-decoration:none">${SITE_URL.replace("https://","")}</a>
      </p>
      <p style="margin:0;font-size:11px;color:#cbd5e1;text-align:center">
        You received this email because you submitted an order on our website.
      </p>
    </td></tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ─── Send functions ───────────────────────────────────────────────────────────

export async function sendInquiryNotification(data: InquiryData): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.error("[email] ❌ RESEND_API_KEY is not set — admin notification skipped");
    return;
  }

  const service = cap(data.service) ?? "General";

  const { data: sent, error } = await resend.emails.send({
    from: FROM,
    to: [NOTIFY_TO],
    replyTo: [data.email],
    subject: `New Inquiry from ${data.name} – ${service}`,
    html: buildInquiryHtml(data),
    text: buildInquiryText(data),
  });

  if (error) {
    console.error("[email] ❌ Admin notification failed:", JSON.stringify(error));
    throw new Error(`Resend admin error: ${JSON.stringify(error)}`);
  }

  console.log("[email] ✅ Admin notification sent, id:", sent?.id);
}

export async function sendOrderConfirmation(data: InquiryData): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.error("[email] ❌ RESEND_API_KEY is not set — customer confirmation skipped");
    return;
  }

  const { data: sent, error } = await resend.emails.send({
    from: CUSTOMER_FROM,
    to: [data.email],
    replyTo: [NOTIFY_TO],
    subject: `We've received your order, ${data.name} ✓`,
    html: buildConfirmationHtml(data),
    text: buildConfirmationText(data),
  });

  if (error) {
    console.error("[email] ❌ Customer confirmation failed:", JSON.stringify(error));
    throw new Error(`Resend confirmation error: ${JSON.stringify(error)}`);
  }

  console.log("[email] ✅ Customer confirmation sent to", data.email, "id:", sent?.id);
}
