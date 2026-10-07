'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** "More courses in production — get a note when the next one drops." Posts to /api/subscribe. */
export default function NotifyForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error('subscribe failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const label = status === 'sending' ? 'Sending…' : status === 'sent' ? 'Thanks — sent' : status === 'error' ? 'Try again' : 'Notify me';

  return (
    <form
      className="notify-form"
      onSubmit={onSubmit}
      onChange={() => (status === 'sent' || status === 'error') && setStatus('idle')}
    >
      <input type="email" name="email" placeholder="you@email.com" aria-label="Email" required maxLength={200} autoComplete="email" />
      <div className="hp" aria-hidden="true">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" disabled={status === 'sending'}>
        {label}
      </button>
    </form>
  );
}
