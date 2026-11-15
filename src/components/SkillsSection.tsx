import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';

const aiMlTiles = [
  { name: 'Python', abbr: 'Py', color: '#38bdf8', note: 'AI / ML & Backend' },
  { name: 'SQL', abbr: 'SQL', color: '#ef4444', note: 'Analytics & CTEs' },
  { name: 'Core Java', abbr: 'Jv', color: '#a78bfa', note: 'OOP & JDBC' },
  { name: 'TensorFlow', abbr: 'TF', color: '#2dd4bf', note: 'Neural Networks' },
  { name: 'PyTorch', abbr: 'PT', color: '#818cf8', note: 'Deep Embeddings' },
  { name: 'Scikit-Learn', abbr: 'SK', color: '#38bdf8', note: 'ML Modeling' },
  { name: 'Pandas', abbr: 'Pd', color: '#b9a6ff', note: 'EDA & Cleaning' },
  { name: 'NumPy', abbr: 'Np', color: '#4DABCF', note: 'Vector Math' },
  { name: 'Power BI', abbr: 'BI', color: '#ef4444', note: 'DAX Dashboards' },
  { name: 'FastAPI', abbr: 'FA', color: '#00c4a7', note: 'REST Endpoints' },
  { name: 'PostgreSQL', abbr: 'PG', color: '#60a5fa', note: 'Relational DB' },
  { name: 'Git / GitHub', abbr: 'Git', color: '#ef4444', note: 'Version Control' },
];

export const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<{
    category: string;
    name: string;
    proficiency: string;
    summary: string;
  }>({
    category: skillCategories[0].name,
    name: skillCategories[0].skills[0].name,
    proficiency: skillCategories[0].skills[0].proficiency,
    summary: skillCategories[0].skills[0].summary,
  });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mx', `${x}%`);
    e.currentTarget.style.setProperty('--my', `${y}%`);
  };

  return (
    <section id="skills" aria-label="Core applications, AI, ML, and Data Science languages" className="pt-24 sm:pt-36">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <header className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-[#a39dc2] font-medium">
            ( Core Applications · AI, ML &amp; Data Science Stack )
          </p>
          <h2 className="mt-4 text-3xl sm:text-5xl lg:text-[4rem] font-medium tracking-[-0.04em] leading-[1.03] text-[#f3efff] [text-wrap:balance]">
            Languages,{' '}
            <span className="serif-italic text-[#b9a6ff] text-[1.08em]">ML frameworks</span> &amp; data systems.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a39dc2] max-w-2xl mx-auto">
            Core AI, Machine Learning, Data Science, and software engineering languages applied across coursework, internships, and FinTech prototypes.
          </p>
        </header>

        {/* Glowing Dark Glass Icon Tiles (Sebin cap-grid style) */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-[1040px] mx-auto mb-14 sm:mb-16">
          {aiMlTiles.map(tile => (
            <div
              key={tile.name}
              style={{
                borderColor: `color-mix(in srgb, ${tile.color} 28%, rgba(255,255,255,0.1))`,
                backgroundColor: `color-mix(in srgb, ${tile.color} 8%, rgba(10,12,16,0.75))`,
              }}
              className="group w-[calc(25%-10px)] sm:w-[114px] aspect-square rounded-2xl border p-2.5 flex flex-col items-center justify-center gap-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_10px_28px_-8px_rgba(0,0,0,0.65)]"
            >
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-mono text-sm sm:text-base font-bold transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${tile.color}22`, color: tile.color }}
              >
                {tile.abbr}
              </div>
              <span className="font-mono text-[11px] sm:text-xs font-medium text-[#f3efff]/85 group-hover:text-white truncate max-w-full">
                {tile.name}
              </span>
            </div>
          ))}
        </div>

        {/* 4-Column Interactive Skill Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            return (
              <div
                key={cat.name}
                onMouseMove={handleCardMouseMove}
                style={{ '--mx': '50%', '--my': '0%' } as React.CSSProperties}
                className="group relative rounded-[22px] border border-white/15 bg-gradient-to-br from-[#242134]/85 to-[#0e0d16]/90 p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#ef4444]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_14px_40px_-12px_rgba(0,0,0,0.7)]"
              >
                {/* Mouse-follow glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(240px circle at var(--mx) var(--my), rgba(239,68,68,0.16), rgba(185,166,255,0.1) 45%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                <div className="relative">
                  <h3 className="text-base sm:text-lg font-medium tracking-tight text-[#f3efff] flex items-baseline gap-2 mb-2">
                    <span className="font-mono text-xs text-[#ef4444]">{num}</span>
                    <span>{cat.name}</span>
                  </h3>
                  <p className="text-xs text-[#a39dc2] leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <ul className="relative flex flex-wrap gap-1.5">
                  {cat.skills.map(skill => {
                    const isSelected = selectedSkill.name === skill.name;
                    return (
                      <li key={skill.name}>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedSkill({
                              category: cat.name,
                              name: skill.name,
                              proficiency: skill.proficiency,
                              summary: skill.summary,
                            })
                          }
                          className={`px-2.5 py-1 rounded-full border text-xs transition-colors text-left ${
                            isSelected
                              ? 'bg-[#ef4444] text-[#08080b] border-[#ef4444] font-medium'
                              : 'bg-white/[0.06] border-white/15 text-[#f3efff]/90 hover:border-[#b9a6ff]/60'
                          }`}
                        >
                          {skill.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Core Application Detail Strip */}
        <div className="mt-5 rounded-[22px] border border-white/15 bg-[#14131c]/90 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="uppercase tracking-[0.14em] text-[#ef4444]">
                Core Application Detail
              </span>
              <span className="text-white/25" aria-hidden="true">·</span>
              <span className="text-[#a39dc2]">{selectedSkill.category}</span>
              <span className="text-white/25" aria-hidden="true">·</span>
              <span className="text-[#b9a6ff]">{selectedSkill.proficiency}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-[#f3efff]">
              {selectedSkill.name}
            </h3>
            <p className="text-sm text-[#a39dc2] max-w-3xl leading-relaxed">
              {selectedSkill.summary}
            </p>
          </div>
          <span className="text-xs font-mono text-[#a39dc2] shrink-0">
            Click any skill tag above to inspect ↑
          </span>
        </div>

      </div>
    </section>
  );
};
