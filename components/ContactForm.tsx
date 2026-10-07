'use client';

import { useState, type FormEvent } from 'react';
import { INTEREST_OPTIONS } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Contact form from the footer ("the body"). Posts to /api/contact, which emails Lowell via Resend. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  const label = status === 'sending' ? 'Sending…' : status === 'sent' ? 'Thanks — sent' : 'Send message';

  return (
    <form
      className="contact-form"
      data-reveal=""
      onSubmit={onSubmit}
      onChange={() => status === 'sent' && setStatus('idle')}
    >
      <div className="cf-row">
        <label>
          Name
          <input type="text" name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label>
          Email
          <input type="email" name="email" required maxLength={200} autoComplete="email" />
        </label>
      </div>
      <label>
        I&apos;m interested in
        <select name="interest" defaultValue={INTEREST_OPTIONS[0]}>
          {INTEREST_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label>
        Message
        <textarea name="message" rows={4} required maxLength={5000} />
      </label>
      {/* Honeypot: real visitors never see or fill this; bots do. */}
      <div className="hp" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button type="submit" disabled={status === 'sending'}>
        {label}
      </button>
      <p className="form-note" role="status" aria-live="polite">
        {status === 'error' ? error : ''}
      </p>
    </form>
  );
}
