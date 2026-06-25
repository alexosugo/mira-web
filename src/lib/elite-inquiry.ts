export interface EliteInquiry {
  shop_name: string;
  email: string;
  phone?: string | null;
  contact_name: string;
  message: string;
  opt_in_updates: boolean;
}

/**
 * Posts an elite inquiry to the Netlify function, which relays it to Slack.
 * Throws on network error or non-2xx response.
 */
export async function submitEliteInquiry(inquiry: EliteInquiry): Promise<void> {
  const response = await fetch('/.netlify/functions/elite-inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiry),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `Request failed (${response.status})`);
  }
}
