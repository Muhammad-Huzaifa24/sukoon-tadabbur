/** Escape user-supplied strings before embedding in HTML. */
function esc(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const CREAM      = "#faf6ef";
const TERRACOTTA = "#b5533c";
const INK        = "#3a3228";
const MUTED      = "#7a6e65";

function layout(heading: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:${CREAM};font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr>
          <td style="background:${CREAM};padding:28px 40px 20px;border-bottom:2px solid ${TERRACOTTA};">
            <span style="font-size:22px;font-weight:700;color:${INK};letter-spacing:-0.5px;">
              sukoon<span style="color:${TERRACOTTA};">.</span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px 28px;">
            <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${INK};line-height:1.3;">${heading}</h1>
            ${body}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px 28px;border-top:1px solid #e8e0d6;">
            <p style="margin:0;font-size:12px;color:${MUTED};line-height:1.6;">
              You are receiving this because you interacted with sukoon.<br />
              If this was not you, you can safely ignore this email.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function p(text: string): string {
  return `<p style="margin:0 0 14px;font-size:15px;color:#4a4038;line-height:1.7;">${text}</p>`;
}

// ── Visitor emails ──────────────────────────────────────────────────────────

export function subscribeWelcome(email: string): { subject: string; html: string } {
  return {
    subject: "You're on the list — sukoon.",
    html: layout(
      "Welcome.",
      p(`We've added <strong>${esc(email)}</strong> to the list.`) +
      p("You'll hear from us when there's something worth returning to — a reminder, a new series, or a quiet note for the season you're in.") +
      p(`With care,<br /><strong style="color:${TERRACOTTA};">sukoon.</strong>`),
    ),
  };
}

export function interestConfirmation({
  name,
  kindLabel,
}: {
  name: string;
  kindLabel: string;
}): { subject: string; html: string } {
  const greeting = name ? `Hi ${esc(name)},` : "Hello,";
  return {
    subject: `Your ${esc(kindLabel)} request — sukoon.`,
    html: layout(
      `${esc(kindLabel)} confirmed.`,
      p(greeting) +
      p(`We've received your <strong>${esc(kindLabel)}</strong> request and will be in touch when the time is right.`) +
      p(`With care,<br /><strong style="color:${TERRACOTTA};">sukoon.</strong>`),
    ),
  };
}

export function consultationConfirmation({
  name,
  message,
}: {
  name: string;
  message: string;
}): { subject: string; html: string } {
  const greeting = name ? `Hi ${esc(name)},` : "Hello,";
  const messageBlock = message
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px;">
        <tr>
          <td style="background:#f5f0e8;border-left:3px solid ${TERRACOTTA};border-radius:4px;padding:12px 16px;font-size:14px;color:#4a4038;line-height:1.7;font-style:italic;">
            ${esc(message)}
          </td>
        </tr>
      </table>`
    : "";
  return {
    subject: "Your consultation note — sukoon.",
    html: layout(
      "Note received.",
      p(greeting) +
      p("Your note is on its way to us. Here's what you shared:") +
      messageBlock +
      p("We'll be in touch soon.") +
      p(`With care,<br /><strong style="color:${TERRACOTTA};">sukoon.</strong>`),
    ),
  };
}

// ── Admin alerts ────────────────────────────────────────────────────────────

function adminRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 12px 6px 0;font-size:13px;color:${MUTED};white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;font-size:13px;color:${INK};word-break:break-all;">${esc(value)}</td>
  </tr>`;
}

function adminTable(rows: string): string {
  return `<table cellpadding="0" cellspacing="0" style="margin:16px 0;width:100%;">${rows}</table>`;
}

export function adminSubscribeAlert({
  email,
  submittedAt,
}: {
  email: string;
  submittedAt: string;
}): { subject: string; html: string } {
  return {
    subject: `[sukoon] New subscriber: ${email}`,
    html: layout(
      "New subscriber.",
      p("Someone just joined the list.") +
      adminTable(
        adminRow("Email", email) +
        adminRow("Submitted at", submittedAt),
      ),
    ),
  };
}

export function adminInterestAlert({
  email,
  name,
  kindLabel,
  message,
  submittedAt,
}: {
  email: string;
  name: string;
  kindLabel: string;
  message: string;
  submittedAt: string;
}): { subject: string; html: string } {
  return {
    subject: `[sukoon] New ${kindLabel} request from ${email}`,
    html: layout(
      `New ${esc(kindLabel)} request.`,
      p("A new interest request has been submitted.") +
      adminTable(
        adminRow("Email", email) +
        adminRow("Name", name || "—") +
        adminRow("Kind", kindLabel) +
        adminRow("Message", message || "—") +
        adminRow("Submitted at", submittedAt),
      ),
    ),
  };
}

export function adminConsultationAlert({
  email,
  name,
  message,
  submittedAt,
}: {
  email: string;
  name: string;
  message: string;
  submittedAt: string;
}): { subject: string; html: string } {
  return {
    subject: `[sukoon] New consultation request from ${email}`,
    html: layout(
      "New consultation request.",
      p("Someone has requested a conversation.") +
      adminTable(
        adminRow("Email", email) +
        adminRow("Name", name || "—") +
        adminRow("Message", message || "—") +
        adminRow("Submitted at", submittedAt),
      ),
    ),
  };
}
