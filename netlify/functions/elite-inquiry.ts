import type { Handler, HandlerEvent } from '@netlify/functions';

interface EliteInquiryPayload {
  shop_name: string;
  email: string;
  phone?: string | null;
  contact_name: string;
  message: string;
  opt_in_updates: boolean;
}

function buildSlackMessage(inquiry: EliteInquiryPayload): object {
  const lines = [
    `*Shop:* ${inquiry.shop_name}`,
    `*Contact:* ${inquiry.contact_name}`,
    `*Email:* ${inquiry.email}`,
    inquiry.phone ? `*Phone:* ${inquiry.phone}` : null,
    `*Opt-in updates:* ${inquiry.opt_in_updates ? 'Yes' : 'No'}`,
  ].filter(Boolean).join('\n');

  return {
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: '🌿 New Elite inquiry' },
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: lines },
      },
      {
        type: 'section',
        // Slack caps section blocks at 3000 chars. Truncate message content so
        // the prefix + body never exceeds that, rather than letting long inputs
        // silently fail the webhook.
        text: { type: 'mrkdwn', text: `*About their shop:*\n${inquiry.message.slice(0, 2980)}` },
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

  let inquiry: EliteInquiryPayload;
  try {
    inquiry = JSON.parse(event.body ?? '');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildSlackMessage(inquiry)),
  });

  if (!response.ok) {
    console.error('Slack webhook failed:', response.status, await response.text());
    return { statusCode: 502, body: JSON.stringify({ error: 'Failed to send to Slack' }) };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
