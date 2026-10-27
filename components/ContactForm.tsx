'use client';

import { useState } from 'react';
import { mailtoHref, sendMail } from '@/lib/mail';
import { EMAIL, SUBJECTS } from '@/lib/site';

const OK = 'Sent. I’ll reply within a day.';

export function ContactForm() {
  const [status, setStatus] = useState<{ kind: 'ok' | 'err'; mailto?: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [label, setLabel] = useState('Send message');

  return (
    <form
      className="form reveal in"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
        if (data._honey) return;
        delete data._honey;
        setPending(true);
        setStatus(null);
        setLabel('Sending…');
        try {
          await sendMail(data, SUBJECTS.contact);
          form.reset();
          setStatus({ kind: 'ok' });
          setLabel('Sent ✓');
          window.setTimeout(() => setLabel('Send message'), 4000);
        } catch {
          setStatus({ kind: 'err', mailto: mailtoHref(SUBJECTS.contact, data) });
          setLabel('Send message');
        } finally {
          setPending(false);
        }
      }}
    >
      <div className="field"><label htmlFor="f-name">Name</label><input id="f-name" name="name" type="text" autoComplete="name" required placeholder="Your name" /></div>
      <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></div>
      <div className="field"><label htmlFor="f-company">Company / brand</label><input id="f-company" name="company" type="text" autoComplete="organization" placeholder="Optional" /></div>
      <div className="field">
        <label htmlFor="f-type">What do you need?</label>
        <select id="f-type" name="project_type" required defaultValue="">
          <option value="" disabled>Choose one</option>
          <option>Website / landing page</option>
          <option>Cinematic WebGL site</option>
          <option>Web app / SaaS product</option>
          <option>AI integration</option>
          <option>Ongoing engineering help</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-budget">Budget</label>
        <select id="f-budget" name="budget" defaultValue="">
          <option value="">Not sure yet</option>
          <option>Under ₹1L / $1.5k</option>
          <option>₹1L – ₹3L / $1.5k – $4k</option>
          <option>₹3L – ₹8L / $4k – $10k</option>
          <option>₹8L+ / $10k+</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-when">Timeline</label>
        <select id="f-when" name="timeline" defaultValue="">
          <option value="">Flexible</option>
          <option>Within 2 weeks</option>
          <option>Within a month</option>
          <option>1 – 3 months</option>
          <option>Later this year</option>
        </select>
      </div>
      <div className="field full">
        <label htmlFor="f-msg">The project</label>
        <textarea id="f-msg" name="message" required minLength={20} placeholder="What are you building, who is it for, and what does done look like? Links welcome." />
      </div>
      <input type="text" name="_honey" className="honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-foot">
        <button className="btn btn-solid" type="submit" disabled={pending}>{label}</button>
        <span className="form-note">Goes straight to my inbox. No newsletter, no CRM.</span>
      </div>
      <div className={`form-status${status ? ` ${status.kind}` : ''}`} role="status" aria-live="polite">
        {status?.kind === 'ok' ? OK : null}
        {status?.kind === 'err' ? (
          <>
            Couldn’t send through the form. <a href={status.mailto}>Open this as an email</a> or write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </>
        ) : null}
      </div>
    </form>
  );
}
