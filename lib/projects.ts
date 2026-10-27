import raw from './projects.json';

export type Kind = 'product' | 'client' | 'research';

export type Project = {
  slug: string;
  title: string;
  kind: Kind;
  status: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  live?: string;
  repo?: string;
  image?: string;
  chapters?: [string, string[]][];
};

export const projects = raw as Project[];

export const KIND_LABEL: Record<Kind, string> = {
  product: 'Product',
  client: 'Client site',
  research: 'Research',
};

export const workProjects = projects.filter((project) => project.kind !== 'research');
export const researchProjects = projects.filter((project) => project.kind === 'research');

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function projectNumber(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return index < 0 ? '' : String(index + 1).padStart(3, '0');
}

export function nextIn(list: Project[], slug: string) {
  const index = list.findIndex((project) => project.slug === slug);
  if (index < 0) return undefined;
  return list[(index + 1) % list.length];
}
