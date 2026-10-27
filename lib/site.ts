export const EMAIL = 'tarunchintakunta@gmail.com';
export const GITHUB = 'https://github.com/Tarunchintakunta';
export const STREAMLINE_URL = 'https://www.streamlineos.in';
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

export const SUBJECTS = {
  contact: 'New project enquiry — portfolio',
  footer: 'Email drop — portfolio',
  home: 'Email drop — portfolio home',
} as const;

export const STACK = [
  'TypeScript', 'Three.js', 'GLSL', 'React', 'Next.js', 'Node', 'Python', 'Postgres', 'GSAP', 'Figma', 'Docker',
];

export const NAV = [
  { href: '/work', label: 'work' },
  { href: '/skills', label: 'skills' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
] as const;

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}
