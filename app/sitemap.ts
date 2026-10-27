import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { getSiteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const pages = ['/', '/work', '/skills', '/about', '/contact', ...projects.map((project) => `/work/${project.slug}`)];
  return pages.map((path) => ({
    url: `${base}${path === '/' ? '/' : path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
