'use client';

import { useState } from 'react';
import { mailtoHref, sendMail } from '@/lib/mail';
import { EMAIL } from '@/lib/site';

export function EmailDrop({ subject, ok }: { subject: string; ok: string }) {
  const [status, setStatus] = useState<{ kind: 'ok' | 'err'; mailto?: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [label, setLabel] = useState('Send');

  return (
    <div>
    <form
      className="footer-input-group"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
        if (data._honey) return;
        delete data._honey;
        setPending(true);
        setStatus(null);
        try {
          await sendMail(data, subject);
          form.reset();
          setStatus({ kind: 'ok' });
          setLabel('Sent ✓');
          window.setTimeout(() => setLabel('Send'), 4000);
        } catch {
          setStatus({ kind: 'err', mailto: mailtoHref(subject, data) });
        } finally {
          setPending(false);
        }
      }}
    >
      <input type="email" name="email" placeholder="your@email.com" className="footer-input" required aria-label="Your email" />
      <input type="text" name="_honey" className="honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="footer-submit" type="submit" disabled={pending}>{pending ? 'Sending…' : label}</button>
    </form>
      <div className={`form-status${status ? ` ${status.kind}` : ''}`} role="status" aria-live="polite" style={{ fontSize: '0.85rem', minHeight: '1.3em', marginBottom: '0.5rem' }}>
        {status?.kind === 'ok' ? ok : null}
        {status?.kind === 'err' ? (
          <>
            Couldn’t send through the form. <a href={status.mailto}>Open this as an email</a> or write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </>
        ) : null}
      </div>
    </div>
  );
}
