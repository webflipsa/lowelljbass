import { esc, isEmail, json, oneLine, rateLimited, sameOrigin, sendToOwner } from '@/lib/api';
import { INTEREST_OPTIONS } from '@/lib/site';

export const runtime = 'nodejs';

type Body = { name?: unknown; email?: unknown; interest?: unknown; message?: unknown; company?: unknown };

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: 'Forbidden' }, 403);
  if (rateLimited(req, 'contact')) return json({ error: 'Too many messages — please try again in a few minutes.' }, 429);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Honeypot: pretend success so bots don't retry.
  if (typeof body.company === 'string' && body.company.trim() !== '') return json({ ok: true });

  const name = typeof body.name === 'string' ? oneLine(body.name) : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const interest = typeof body.interest === 'string' ? body.interest : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || name.length > 120) return json({ error: 'Please enter your name.' }, 400);
  if (!isEmail(email)) return json({ error: 'Please enter a valid email address.' }, 400);
  if (!(INTEREST_OPTIONS as readonly string[]).includes(interest)) return json({ error: 'Please choose what you are interested in.' }, 400);
  if (!message || message.length > 5000) return json({ error: 'Please enter a message (up to 5000 characters).' }, 400);

  const result = await sendToOwner({
    subject: `Website enquiry — ${interest} — ${name}`,
    replyTo: email,
    text: `From: ${name} <${email}>\nInterested in: ${interest}\n\n${message}\n`,
    html:
      `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;<br>Interested in: <strong>${esc(interest)}</strong></p>` +
      `<p style="white-space:pre-wrap">${esc(message)}</p>`,
  });

  return result.ok ? json({ ok: true }) : json({ error: result.error }, 502);
}
