import { esc, isEmail, json, rateLimited, sameOrigin, sendToOwner } from '@/lib/api';

export const runtime = 'nodejs';

type Body = { email?: unknown; company?: unknown };

/**
 * "Notify me when the next course drops."
 *
 * For now each sign-up is emailed to Lowell via Resend. When Supabase (or a Resend Audience) is
 * added, persist the address here instead of / as well as sending the notification.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: 'Forbidden' }, 403);
  if (rateLimited(req, 'subscribe', 5, 10 * 60_000)) return json({ error: 'Too many requests — please try again later.' }, 429);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  if (typeof body.company === 'string' && body.company.trim() !== '') return json({ ok: true });

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!isEmail(email)) return json({ error: 'Please enter a valid email address.' }, 400);

  const result = await sendToOwner({
    subject: `Course sign-up — ${email}`,
    replyTo: email,
    text: `New "notify me" sign-up for the next course:\n\n${email}\n`,
    html: `<p>New &ldquo;notify me&rdquo; sign-up for the next course:</p><p><strong>${esc(email)}</strong></p>`,
  });

  return result.ok ? json({ ok: true }) : json({ error: result.error }, 502);
}
