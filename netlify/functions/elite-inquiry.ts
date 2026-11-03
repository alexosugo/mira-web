import type { Handler, HandlerEvent } from '@netlify/functions';

interface EliteInquiryPayload {
  shop_name: string;
  email: string;
  phone?: string | null;
  contact_name: string;
  message: string;
  opt_in_updates: boolean;
}

function sanitize(value: string): string {
  return value.replace(/</g, '').replace(/>/g, '').trim();
}

function sanitizeLine(value: string): string {
  return sanitize(value).replace(/\s+/g, ' ');
}

function validatePayload(raw: unknown): { ok: true; inquiry: EliteInquiryPayload } | { ok: false; error: string } {
  if (typeof raw !== 'object' || raw === null) {
    return { ok: false, error: 'Invalid payload' };
  }
  const { shop_name, email, contact_name, message, opt_in_updates, phone } = raw as Record<string, unknown>;

  if (typeof shop_name !== 'string' || !sanitizeLine(shop_name)) return { ok: false, error: 'shop_name is required' };
  if (shop_name.length > 200) return { ok: false, error: 'shop_name too long' };

  if (typeof contact_name !== 'string' || !sanitizeLine(contact_name)) return { ok: false, error: 'contact_name is required' };
  if (contact_name.length > 200) return { ok: false, error: 'contact_name too long' };

  if (typeof email !== 'string' || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email.trim())) {
    return { ok: false, error: 'valid email is required' };
  }
  if (email.length > 255) return { ok: false, error: 'email too long' };

  if (typeof message !== 'string' || !sanitize(message)) return { ok: false, error: 'message is required' };
  if (message.length > 5000) return { ok: false, error: 'message too long' };

  if (phone !== undefined && phone !== null && typeof phone !== 'string') {
    return { ok: false, error: 'invalid phone' };
  }
  if (typeof phone === 'string' && phone.length > 50) return { ok: false, error: 'phone too long' };

  return {
    ok: true,
    inquiry: {
      shop_name: sanitizeLine(shop_name),
      email: email.trim(),
      contact_name: sanitizeLine(contact_name),
      message: sanitize(message),
      opt_in_updates: opt_in_updates === true,
      phone: typeof phone === 'string' && sanitizeLine(phone) ? sanitizeLine(phone) : null,
    },
  };
}

function buildSlackMessage(inquiry: EliteInquiryPayload): object {
  const rows: Array<[string, string]> = [
    ['Shop', inquiry.shop_name],
    ['Contact', inquiry.contact_name],
    ['Email', inquiry.email],
    ...(inquiry.phone ? [['Phone', inquiry.phone] as [string, string]] : []),
    ['Opt-in updates', inquiry.opt_in_updates ? 'Yes' : 'No'],
  ];

  return {
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: '🌿 New Elite inquiry' },
      },
      {
        type: 'section',
        fields: rows.flatMap(([label, value]) => [
          { type: 'mrkdwn', text: `*${label}:*` },
          { type: 'plain_text', text: value, emoji: false },
        ]),
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: '*About their shop:*' },
      },
      {
        type: 'section',
        // Slack caps section text at 3000 chars; truncate rather than let long inputs fail the webhook.
        text: { type: 'plain_text', text: inquiry.message.slice(0, 3000), emoji: false },
      },
    ],
  };
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const webhookUrl = process.env.SLACK_ELITE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('SLACK_ELITE_WEBHOOK_URL is not set');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(event.body ?? '');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const validation = validatePayload(parsed);
  if (!validation.ok) {
    return { statusCode: 400, body: JSON.stringify({ error: validation.error }) };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildSlackMessage(validation.inquiry)),
  });

  if (!response.ok) {
    console.error('Slack webhook failed:', response.status, await response.text());
    return { statusCode: 502, body: JSON.stringify({ error: 'Failed to send to Slack' }) };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
