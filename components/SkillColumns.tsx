import { columnsIn } from '@/lib/skills';

export function SkillColumns({ order, limit }: { order: readonly string[]; limit?: number }) {
  const columns = columnsIn(order, limit);
  return (
    <div className="skill-grid">
      {columns.map((column) => (
        <div key={column.id}>
          <div className="skill-col-title">{column.title}</div>
          <div className="skill-col">
            {column.items.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Stats() {
  return (
    <div className="stats">
      <div className="stat-col">
        <div className="stat-num">40+</div>
        <div className="stat-desc">products shipped<br /><span className="stat-sub">*web, mobile, internal</span></div>
      </div>
      <div className="stat-col">
        <div className="stat-num">60fps</div>
        <div className="stat-desc">the only acceptable<br />frame budget</div>
      </div>
      <div className="stat-col">
        <div className="stat-num">2+</div>
        <div className="stat-desc">years building<br /><span className="stat-sub">*and still counting</span></div>
      </div>
    </div>
  );
}
