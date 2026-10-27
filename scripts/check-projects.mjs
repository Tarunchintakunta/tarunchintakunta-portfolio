import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const snapshot = JSON.parse(readFileSync(join(root, 'scripts/projects.snapshot.json'), 'utf8'));
const current = JSON.parse(readFileSync(join(root, 'lib/projects.json'), 'utf8'));

function sortValue(value) {
  if (Array.isArray(value)) return value.map(sortValue);
  if (value && typeof value === 'object') {
    return Object.keys(value).sort().reduce((acc, key) => {
      acc[key] = sortValue(value[key]);
      return acc;
    }, {});
  }
  return value;
}

function norm(list) {
  return list.map((project) => {
    const copy = { ...project };
    if (copy.image) copy.image = String(copy.image).replace(/^\//, '');
    return copy;
  });
}

const left = JSON.stringify(sortValue(norm(snapshot)));
const right = JSON.stringify(sortValue(norm(current)));
if (left !== right) {
  console.error('lib/projects.json does not match scripts/projects.snapshot.json');
  process.exit(1);
}

for (const project of current) {
  if (!project.image) continue;
  const file = join(root, 'public', String(project.image).replace(/^\//, ''));
  if (!existsSync(file)) {
    console.error('Missing screenshot', file);
    process.exit(1);
  }
}

const counts = current.reduce((acc, project) => {
  acc[project.kind] = (acc[project.kind] || 0) + 1;
  return acc;
}, {});
if (current.length !== 15 || counts.product !== 5 || counts.client !== 5 || counts.research !== 5) {
  console.error('Unexpected project counts', current.length, counts);
  process.exit(1);
}

console.log('projects ok', current.length);
