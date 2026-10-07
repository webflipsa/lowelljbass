import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/* --------------------------------------------------------------- helpers */

export const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status });

/** Escape text for the HTML part of an email. */
export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

/** Collapse to a single line (safe for subjects / headers). */
export const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim();

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 200;

/** Reject cross-site browser posts. Requests with no Origin header (curl, server-to-server) pass. */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get('host');
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------ rate limit */

// Best-effort, per server instance (resets on cold start). Enough to blunt casual abuse;
// put Vercel's WAF / Upstash in front of the routes if spam ever becomes a problem.
const hits = new Map<string, number[]>();

export function rateLimited(req: Request, bucket: string, limit = 5, windowMs = 10 * 60_000): boolean {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return recent.length > limit;
}

/* ---------------------------------------------------------------- resend */

export type MailArgs = { subject: string; text: string; html: string; replyTo?: string };

/**
 * Sends a notification email to Lowell through Resend.
 * Returns `ok: false` with a user-safe message instead of throwing.
 */
export async function sendToOwner({ subject, text, html, replyTo }: MailArgs): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'Lowell Jeffery Website <onboarding@resend.dev>';

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[mail] RESEND_API_KEY / CONTACT_TO_EMAIL not set — logging instead of sending:\n', subject, '\n', text);
      return { ok: true };
    }
    console.error('[mail] RESEND_API_KEY / CONTACT_TO_EMAIL are not configured');
    return { ok: false, error: 'Messaging is temporarily unavailable. Please try again later.' };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to, subject, text, html, replyTo });
    if (error) {
      console.error('[mail] Resend error', error);
      return { ok: false, error: "Couldn't send your message. Please try again." };
    }
    return { ok: true };
  } catch (err) {
    console.error('[mail] Resend threw', err);
    return { ok: false, error: "Couldn't send your message. Please try again." };
  }
}
