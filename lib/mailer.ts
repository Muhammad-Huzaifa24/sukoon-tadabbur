import nodemailer from "nodemailer";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value)
    throw new Error(`[mailer] Missing required environment variable: ${name}`);
  return value;
}

function createTransport() {
  const port = Number(requireEnv("SMTP_PORT"));
  return nodemailer.createTransport({
    host: requireEnv("SMTP_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: requireEnv("SMTP_USER"),
      pass: requireEnv("SMTP_PASS"),
    },
  });
}

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail(options: MailOptions): Promise<void> {
  const from = requireEnv("MAIL_FROM");
  const transport = createTransport();
  await transport.sendMail({ from, ...options });
}

/** Admin alert destination — server-only, never sent to the client. */
export function adminEmail(): string {
  return requireEnv("ADMIN_EMAIL");
}
