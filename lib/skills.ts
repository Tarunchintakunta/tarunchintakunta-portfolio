export type SkillColumn = { id: string; title: string; items: string[] };

export const skillColumns: SkillColumn[] = [
  { id: 'frontend', title: 'Frontend', items: ['TypeScript', 'React / Next.js', 'Svelte', 'CSS architecture', 'Tailwind'] },
  { id: 'graphics', title: 'Graphics', items: ['Three.js / R3F', 'GLSL shaders', 'WebGPU', 'GSAP / Lenis', 'Blender'] },
  { id: 'backend', title: 'Backend', items: ['Node / Bun', 'Python / FastAPI', 'Postgres', 'Edge functions', 'NestJS'] },
  { id: 'ai', title: 'AI', items: ['LLM apps', 'RAG pipelines', 'Evals', 'Agent tooling', 'Claude API', 'OpenAI / Gemini', 'Ollama / whisper.cpp'] },
  { id: 'infra', title: 'Infra', items: ['Docker', 'CI / CD', 'Cloudflare', 'Observability', 'Vercel / Railway', 'Kubernetes'] },
  { id: 'design', title: 'Design', items: ['Figma', 'Motion systems', 'Design tokens', 'Prototyping'] },
];

export const homeSkillOrder = ['frontend', 'graphics', 'backend', 'design', 'infra', 'ai'] as const;
export const skillsPageOrder = ['frontend', 'graphics', 'backend', 'ai', 'infra', 'design'] as const;

export function columnsIn(order: readonly string[], limit?: number) {
  return order.map((id) => {
    const column = skillColumns.find((item) => item.id === id);
    if (!column) throw new Error(`Unknown skill column ${id}`);
    return { ...column, items: limit ? column.items.slice(0, limit) : column.items };
  });
}
