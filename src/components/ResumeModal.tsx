import React, { useState, useEffect } from 'react';
import { X, Printer, Copy, Check, GraduationCap, Briefcase, Cpu, FolderGit2, Award, FileText } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { experienceData, educationData, skillCategories, certificationsData, projectsData } from '../data/portfolioData';

interface ResumeModalProps {
  profile: ProfileData;
  isOpen: boolean;
  onClose: () => void;
}

type ResumeTabId = 'all' | 'education' | 'skills' | 'experience' | 'projects' | 'certifications';

const resumeTabs: { id: ResumeTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'Full Résumé', icon: FileText },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'AI / ML Skills', icon: Cpu },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certifications', label: 'Credentials', icon: Award },
];

export const ResumeModal: React.FC<ResumeModalProps> = ({ profile, isOpen, onClose }) => {
  const [copiedMd, setCopiedMd] = useState(false);
  const [activeTab, setActiveTab] = useState<ResumeTabId>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setActiveTab('all');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownResume = () => {
    return `# ${profile.name}
${profile.email} | ${profile.phone} | [LinkedIn](${profile.linkedinUrl}) | [GitHub](${profile.githubUrl}) | ${profile.location}

---

## PROFESSIONAL SUMMARY
${profile.bio}

---

## TECHNICAL SKILLS
- **AI, ML & Data Science:** Python (AI/ML), Machine Learning, Neural Networks (TensorFlow / PyTorch), Scikit-Learn, Pandas, NumPy, EDA, Feature Engineering, Statistical Analysis, Generative AI Fundamentals
- **Programming Languages:** Python, Core Java, SQL, OOP Concepts, Data Structures & Algorithms, HTML, CSS, JavaScript, TypeScript
- **BI & Visualization:** Power BI (DAX), Tableau, Matplotlib, Seaborn, MS Excel
- **Databases & Cloud:** SQL Joins, Aggregations, Subqueries, CTEs, Query Optimization, MySQL, PostgreSQL, AWS, Azure
- **Tools & Frameworks:** REST APIs, FastAPI, Next.js, DBMS, Git, GitHub, Agile/Scrum, SDLC

---

## PROFESSIONAL EXPERIENCE
${experienceData
  .map(
    exp => `### ${exp.role} — ${exp.company} (${exp.period})
${exp.highlights.map(h => `● ${h}`).join('\n')}
`
  )
  .join('\n')}

---

## PROJECTS
${projectsData
  .map(
    proj => `### ${proj.title} (${proj.tags.join(', ')})
${proj.caseStudy.keyLearnings.map(d => `● ${d}`).join('\n')}
`
  )
  .join('\n')}

---

## EDUCATION
${educationData
  .map(
    edu => `### ${edu.degree} — ${edu.institution}
**${edu.grade}** | ${edu.period}
${edu.details.map(d => `● ${d}`).join('\n')}
`
  )
  .join('\n')}

---

## CERTIFICATIONS
${certificationsData.map(c => `● **${c.title}** – ${c.issuer} (${c.year})`).join('\n')}

---

## CORE COMPETENCIES
${profile.coreCompetencies.join(' • ')}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownResume());
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const showSection = (id: Exclude<ResumeTabId, 'all'>) => activeTab === 'all' || activeTab === id;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-[#08080b]/85 backdrop-blur-md print:static print:p-0 print:bg-white"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-[#0d0c14] text-[#f3efff] rounded-[24px] border border-white/15 shadow-[0_32px_90px_rgba(0,0,0,0.75)] flex flex-col overflow-hidden print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black"
        onClick={e => e.stopPropagation()}
      >
        {/* Fixed Non-Scrolling Actions + Tap Switcher Header */}
        <div className="shrink-0 px-5 sm:px-7 py-4 bg-[#14131c] border-b border-white/10 space-y-3 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#ef4444]" aria-hidden="true" />
              <span id="resume-title" className="font-semibold text-[#f3efff] text-sm">
                {profile.name} — Curriculum Vitae
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-[#f3efff] transition-colors"
              >
                {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#a39dc2]" />}
                <span>{copiedMd ? 'Copied Markdown' : 'Copy ATS Markdown'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print to PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-[#a39dc2] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Resume"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Tap-to-Switch Section Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Resume sections">
              {resumeTabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#ef4444] text-[#08080b] font-semibold'
                        : 'bg-white/5 text-[#a39dc2] hover:text-[#f3efff] hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrollable Content Pane (never pushes header upward) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 font-sans print:overflow-visible print:p-0">
          
          {/* Candidate Contact Header */}
          <div className="text-center border-b border-white/10 print:border-neutral-300 pb-5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide uppercase text-[#f3efff] print:text-black">
              {profile.name}
            </h1>
            <p className="text-xs font-mono text-[#b9a6ff] print:text-neutral-700 mt-1">
              {profile.title}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#a39dc2] print:text-neutral-600 mt-2.5">
              <a href={`mailto:${profile.email}`} className="text-[#ef4444] print:text-black font-medium hover:underline">
                {profile.email}
              </a>
              <span aria-hidden="true">|</span>
              <span>{profile.phone}</span>
              <span aria-hidden="true">|</span>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-[#f3efff] hover:underline">
                LinkedIn
              </a>
              <span aria-hidden="true">|</span>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="hover:text-[#f3efff] hover:underline">
                GitHub
              </a>
              <span aria-hidden="true">|</span>
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Professional Summary */}
          {activeTab === 'all' && (
            <div>
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#ef4444] print:text-black border-b border-white/10 print:border-neutral-300 pb-1.5 mb-2.5">
                PROFESSIONAL SUMMARY
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#a39dc2] print:text-neutral-800">
                {profile.bio}
              </p>
            </div>
          )}

          {/* Education (Prominent when Education tab tapped, and included in Full Résumé & Print) */}
          <div className={showSection('education') ? 'block' : 'hidden print:block'}>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#ef4444] print:text-black border-b border-white/10 print:border-neutral-300 pb-1.5 mb-3">
              EDUCATION
            </h3>
            <div className="space-y-4">
              {educationData.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#14131c] border border-white/10 print:p-0 print:bg-transparent print:border-none space-y-2"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-[#f3efff] print:text-black">
                      {edu.degree} — {edu.institution}
                    </span>
                    <span className="text-xs font-mono text-[#ef4444] print:text-black font-semibold">
                      {edu.grade} · {edu.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5 list-disc pl-4 text-xs sm:text-sm text-[#a39dc2] print:text-neutral-700 leading-relaxed">
                    {edu.details.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className={showSection('skills') ? 'block' : 'hidden print:block'}>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#ef4444] print:text-black border-b border-white/10 print:border-neutral-300 pb-1.5 mb-3">
              TECHNICAL SKILLS (AI, ML &amp; DATA SCIENCE)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:grid-cols-1 print:gap-1.5">
              {skillCategories.map(cat => (
                <div
                  key={cat.name}
                  className="p-3.5 rounded-2xl bg-[#14131c] border border-white/10 print:p-0 print:bg-transparent print:border-none"
                >
                  <div className="text-xs font-mono font-semibold text-[#b9a6ff] print:text-black mb-1">
                    {cat.name}
                  </div>
                  <div className="text-xs text-[#a39dc2] print:text-neutral-800 leading-relaxed">
                    {cat.skills.map(s => s.name).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className={showSection('experience') ? 'block' : 'hidden print:block'}>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#ef4444] print:text-black border-b border-white/10 print:border-neutral-300 pb-1.5 mb-3">
              EXPERIENCE &amp; INTERNSHIPS
            </h3>
            <div className="space-y-4">
              {experienceData.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#14131c] border border-white/10 print:p-0 print:bg-transparent print:border-none space-y-1.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-[#f3efff] print:text-black">
                      {exp.role} — <span className="text-[#b9a6ff] print:text-neutral-700">{exp.company}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#a39dc2] print:text-neutral-600 tabular-nums">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1 list-disc pl-4 text-xs text-[#a39dc2] print:text-neutral-700 leading-relaxed">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className={showSection('projects') ? 'block' : 'hidden print:block'}>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#ef4444] print:text-black border-b border-white/10 print:border-neutral-300 pb-1.5 mb-3">
              PROJECTS
            </h3>
            <div className="space-y-3">
              {projectsData.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#14131c] border border-white/10 print:p-0 print:bg-transparent print:border-none space-y-1.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-[#f3efff] print:text-black">
                      {proj.title}{' '}
                      <span className="font-normal font-mono text-[11px] text-[#b9a6ff] print:text-neutral-600">
                        ({proj.tags.join(', ')})
                      </span>
                    </span>
                    <span className="text-[11px] font-mono text-[#a39dc2] print:text-neutral-600 tabular-nums">
                      {proj.year}
                    </span>
                  </div>
                  <p className="text-xs text-[#a39dc2] print:text-neutral-700 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Competencies */}
          <div className={showSection('certifications') ? 'block' : 'hidden print:block'}>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#ef4444] print:text-black border-b border-white/10 print:border-neutral-300 pb-1.5 mb-3">
              CERTIFICATIONS &amp; CORE COMPETENCIES
            </h3>
            <div className="space-y-3">
              <ul className="space-y-1.5 list-disc pl-4 text-xs sm:text-sm text-[#a39dc2] print:text-neutral-800">
                {certificationsData.map((c, idx) => (
                  <li key={idx}>
                    <strong className="text-[#f3efff] print:text-black">{c.title}</strong> – {c.issuer} ({c.year})
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex flex-wrap gap-1.5 print:block">
                {profile.coreCompetencies.map(comp => (
                  <span
                    key={comp}
                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#b9a6ff] print:border-none print:bg-transparent print:text-black print:p-0 print:mr-3"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
