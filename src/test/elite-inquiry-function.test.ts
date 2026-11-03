import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);
const WEBHOOK_URL = 'https://hooks.slack.com/fake';

async function importHandler() {
  const mod = await import('../../netlify/functions/elite-inquiry?t=' + Date.now());
  return mod.handler;
}

function makeEvent(body: unknown, method = 'POST') {
  return { httpMethod: method, body: body === null ? null : JSON.stringify(body) } as Parameters<
    Awaited<ReturnType<typeof importHandler>>
  >[0];
}

type SlackText = { type: string; text: string };

function sentSlackTexts(): SlackText[] {
  const body = JSON.parse(mockFetch.mock.calls[0][1].body as string) as {
    blocks: Array<{ text?: SlackText; fields?: SlackText[] }>;
  };
  return body.blocks.flatMap((block) => [...(block.text ? [block.text] : []), ...(block.fields ?? [])]);
}

const validPayload = {
  shop_name: 'Nia Thrifts',
  contact_name: 'Nia Wanjiku',
  email: 'nia@example.com',
  message: 'We sell thrift fashion in Nairobi.',
  opt_in_updates: true,
};

describe('elite-inquiry function — server-side validation', () => {
  beforeEach(() => {
    process.env.SLACK_ELITE_WEBHOOK_URL = WEBHOOK_URL;
    mockFetch.mockResolvedValue({ ok: true, text: async () => '' });
  });

  afterEach(() => {
    delete process.env.SLACK_ELITE_WEBHOOK_URL;
    mockFetch.mockReset();
    vi.resetModules();
  });

  it('returns 405 for non-POST methods', async () => {
    const handler = await importHandler();
    const res = await handler(makeEvent(validPayload, 'GET'), {} as never);
    expect(res?.statusCode).toBe(405);
  });

  it('returns 400 for missing shop_name', async () => {
    const handler = await importHandler();
    const res = await handler(
      makeEvent({ contact_name: validPayload.contact_name, email: validPayload.email, message: validPayload.message, opt_in_updates: validPayload.opt_in_updates }),
      {} as never,
    );
    expect(res?.statusCode).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('returns 400 for invalid email', async () => {
    const handler = await importHandler();
    const res = await handler(makeEvent({ ...validPayload, email: 'notanemail' }), {} as never);
    expect(res?.statusCode).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('returns 400 for missing message', async () => {
    const handler = await importHandler();
    const res = await handler(makeEvent({ ...validPayload, message: '' }), {} as never);
    expect(res?.statusCode).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('strips Slack mrkdwn injection from shop_name before sending', async () => {
    const handler = await importHandler();
    await handler(
      makeEvent({ ...validPayload, shop_name: '<!channel> Nia Thrifts' }),
      {} as never,
    );
    expect(mockFetch).toHaveBeenCalledOnce();
    const allText = sentSlackTexts().map((t) => t.text).join('\n');
    expect(allText).not.toContain('<!channel>');
    expect(allText).toContain('Nia Thrifts');
  });

  it('does not let user fields forge extra labelled lines in the Slack message', async () => {
    const handler = await importHandler();
    const res = await handler(
      makeEvent({
        ...validPayload,
        shop_name: 'Nia\n*Email:* attacker@example.com',
        contact_name: 'Nia _Wanjiku_',
        phone: '0712\n*Opt-in updates:* Yes',
        message: 'Hello\n*Email:* attacker@example.com\n~struck~ `code`',
      }),
      {} as never,
    );
    expect(res?.statusCode).toBe(200);
    const mrkdwnTexts = sentSlackTexts().filter((t) => t.type === 'mrkdwn').map((t) => t.text);
    expect(mrkdwnTexts.filter((text) => text.includes('*Email:*'))).toHaveLength(1);
    expect(mrkdwnTexts.filter((text) => text.includes('*Opt-in updates:*'))).toHaveLength(1);
    expect(mrkdwnTexts.join('\n')).not.toContain('attacker@example.com');
    expect(mrkdwnTexts.join('\n')).not.toContain('Wanjiku');
    const allText = sentSlackTexts().map((t) => t.text).join('\n');
    expect(allText).toContain('Nia *Email:* attacker@example.com');
  });

  it.each(['shop_name', 'contact_name', 'message'])('returns 400 when %s is only angle brackets', async (field) => {
    const handler = await importHandler();
    const res = await handler(makeEvent({ ...validPayload, [field]: '<>' }), {} as never);
    expect(res?.statusCode).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('returns 200 and calls the Slack webhook for a valid payload', async () => {
    const handler = await importHandler();
    const res = await handler(makeEvent(validPayload), {} as never);
    expect(res?.statusCode).toBe(200);
    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch.mock.calls[0][0]).toBe(WEBHOOK_URL);
  });

  it('returns 400 for an email carrying a Slack mention suffix', async () => {
    const handler = await importHandler();
    const res = await handler(
      makeEvent({ ...validPayload, email: 'nia@example.com<!channel>' }),
      {} as never,
    );
    expect(res?.statusCode).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('returns 400 for an oversized phone', async () => {
    const handler = await importHandler();
    const res = await handler(makeEvent({ ...validPayload, phone: '7'.repeat(3000) }), {} as never);
    expect(res?.statusCode).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('accepts null phone (optional field)', async () => {
    const handler = await importHandler();
    const res = await handler(makeEvent({ ...validPayload, phone: null }), {} as never);
    expect(res?.statusCode).toBe(200);
  });
});
