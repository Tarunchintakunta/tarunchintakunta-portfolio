import { EMAIL, FORM_ENDPOINT } from './site';

export async function sendMail(fields: Record<string, string>, subject: string) {
  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...fields,
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      _replyto: fields.email || '',
    }),
  });
  const json = await response.json().catch(() => ({} as { success?: string; message?: string }));
  if (!response.ok || String(json.success) === 'false') {
    throw new Error(json.message || `HTTP ${response.status}`);
  }
}

export function mailtoHref(subject: string, fields: Record<string, string>) {
  const body = Object.entries(fields).map(([key, value]) => `${key}: ${value}`).join('\n');
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
