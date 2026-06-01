import { google } from 'googleapis';

const GMAIL_SEND_SCOPE = 'https://www.googleapis.com/auth/gmail.send';

export type ContactEmailPayload = {
  name: string;
  email: string;
  message: string;
  locale?: 'es' | 'en';
};

function getGmailConfig() {
  return {
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    senderEmail: process.env.GMAIL_USER?.trim(),
    inboxEmail:
      process.env.CONTACT_INBOX_EMAIL?.trim() || 'marcelo.ull@antoapps.com',
  };
}

export function isGmailConfigured(): boolean {
  const { clientId, clientSecret, refreshToken, senderEmail } = getGmailConfig();
  return Boolean(clientId && clientSecret && refreshToken && senderEmail);
}

function encodeMimeHeader(value: string): string {
  return `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`;
}

function buildRawMessage(input: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  body: string;
}): string {
  const lines = [
    `From: Anto Contacto <${input.from}>`,
    `To: ${input.to}`,
    `Reply-To: ${input.replyTo}`,
    `Subject: ${encodeMimeHeader(input.subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 8bit',
    '',
    input.body,
  ];

  return Buffer.from(lines.join('\r\n'), 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getGmailClient() {
  const { clientId, clientSecret, refreshToken } = getGmailConfig();

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('GMAIL_NOT_CONFIGURED');
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret);
  auth.setCredentials({
    refresh_token: refreshToken,
    scope: GMAIL_SEND_SCOPE,
  });

  return google.gmail({ version: 'v1', auth });
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
  const { senderEmail, inboxEmail } = getGmailConfig();

  if (!isGmailConfigured() || !senderEmail) {
    throw new Error('GMAIL_NOT_CONFIGURED');
  }

  const subject =
    payload.locale === 'en'
      ? `[Anto Contact] Message from ${payload.name}`
      : `[Anto Contacto] Mensaje de ${payload.name}`;

  const body = [
    `Nombre / Name: ${payload.name}`,
    `Email: ${payload.email}`,
    '',
    'Mensaje / Message:',
    payload.message,
  ].join('\n');

  const raw = buildRawMessage({
    from: senderEmail,
    to: inboxEmail,
    replyTo: `${payload.name} <${payload.email}>`,
    subject,
    body,
  });

  const gmail = await getGmailClient();

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'unknown_gmail_error';
    console.error('[gmail][contact]', { detail });
    throw new Error('GMAIL_SEND_FAILED');
  }
}
