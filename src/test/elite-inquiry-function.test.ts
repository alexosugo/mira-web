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
    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    const sectionText = body.blocks[1].text.text as string;
    expect(sectionText).not.toContain('<!channel>');
    expect(sectionText).toContain('Nia Thrifts');
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
