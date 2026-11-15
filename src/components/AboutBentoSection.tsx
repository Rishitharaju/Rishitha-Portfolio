import React, { useState } from 'react';
import { ProfileData } from '../types/portfolio';
import { educationData, fintechRoadmapData, certificationsData, graduateInsightsData } from '../data/portfolioData';
import { GraduationCap, Award, Compass, Sparkles } from 'lucide-react';

interface AboutBentoSectionProps {
  profile: ProfileData;
}

type AboutTabId = 'education' | 'fintech' | 'certifications' | 'takeaways';

const coreLanguageRows = [
  { name: 'Python', context: 'AI, ML, FastAPI & Automation' },
  { name: 'SQL', context: 'Multi-table Joins, CTEs & Tuning' },
  { name: 'Core Java', context: 'OOP, Collections & JDBC' },
  { name: 'TensorFlow / PyTorch', context: 'Neural Network Embeddings' },
  { name: 'Scikit-Learn & Pandas', context: 'EDA, Features & Modeling' },
  { name: 'Power BI & Seaborn', context: 'DAX Dashboards & Risk Visuals' },
];

const aboutTabs: { id: AboutTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'education', label: 'B.Tech Education', icon: GraduationCap },
  { id: 'fintech', label: "FinTech Master's", icon: Compass },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'takeaways', label: 'Takeaways', icon: Sparkles },
];

export const AboutBentoSection: React.FC<AboutBentoSectionProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<AboutTabId>('education');
  const edu = educationData[0];

  return (
    <section id="about" className="pt-24 sm:pt-36">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12">
        
        <header className="max-w-4xl mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-[#a39dc2] font-medium">
            ( About &amp; FinTech Vision )
          </p>
          <h2 className="mt-4 text-3xl sm:text-5xl lg:text-[4.2rem] font-medium tracking-[-0.04em] leading-[1.02] text-[#f3efff] [text-wrap:balance]">
            A Computer Science graduate turning AI &amp; data into{' '}
            <span className="serif-italic text-[#ef4444] text-[1.08em]">quantitative</span> systems.
          </h2>
        </header>

        {/* 12-Column Editorial Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          
          {/* Tile 1: Editorial Identity Card (4 cols) */}
          <figure className="lg:col-span-4 rounded-[28px] border border-white/15 bg-gradient-to-br from-[#191627] via-[#100f18] to-[#08080b] p-7 flex flex-col justify-between min-h-[380px] relative overflow-hidden">
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#ef4444]/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-[#b9a6ff]/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#a39dc2]">
                Academic Profile
              </span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#ef4444]">
                GPA {edu.grade.replace('GPA: ', '')}
              </span>
            </div>

            <div className="relative my-8 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border border-white/15 bg-[#14131c]/90 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(239,68,68,0.16)]">
                <span className="serif-italic text-5xl text-[#f3efff]">RA</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ef4444] mt-1">
                  AI &amp; DS · FinTech
                </span>
              </div>
            </div>

            <figcaption className="relative border-t border-white/10 pt-5">
              <div className="text-xl font-medium tracking-tight text-[#f3efff]">
                {profile.name}
              </div>
              <div className="text-sm text-[#a39dc2] mt-1">
                {edu.degree}
              </div>
              <div className="text-xs font-mono text-[#b9a6ff] mt-2">
                {edu.institution} · {edu.period}
              </div>
            </figcaption>
          </figure>

          {/* Tile 2: Tap-to-Switch Academic, FinTech Master's & Credentials Panel (8 cols) */}
          <div className="lg:col-span-8 rounded-[28px] border border-white/15 bg-[#14131c]/90 p-6 sm:p-8 flex flex-col justify-between min-h-[380px]">
            {/* Top Tap Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Academic and FinTech sections">
                {aboutTabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
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

            {/* Active Panel View */}
            <div className="py-6 flex-1 flex flex-col justify-center">
              {activeTab === 'education' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-[#ef4444] font-mono">
                        Undergraduate Degree · {edu.period}
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] leading-[1.15] text-[#f3efff] mt-1">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-[#b9a6ff] mt-1 font-mono">
                        {edu.institution} · {edu.grade}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#a39dc2] leading-relaxed">
                    {profile.bio}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {edu.details.map((d, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-2.5"
                      >
                        <GraduationCap className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#f3efff]/90 leading-snug">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'fintech' && (
                <div className="space-y-5">
                  <div className="rounded-2xl bg-[#ef4444] text-[#08080b] p-5 sm:p-6">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#08080b]/75 font-semibold mb-2 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Target Master&apos;s Program</span>
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] leading-[1.1]">
                      Preparing for M.S. in Financial Technology (FinTech)
                    </h3>
                    <p className="mt-2.5 text-sm text-[#08080b]/85 leading-relaxed">
                      Bridging undergraduate AI &amp; Data Science foundations with quantitative trading logic, financial crime detection, and scalable SQL data systems.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fintechRoadmapData.map(item => (
                      <div
                        key={item.area}
                        className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10"
                      >
                        <div className="text-sm font-medium text-[#f3efff]">{item.area}</div>
                        <div className="text-[11px] font-mono text-[#ef4444] mt-0.5">{item.focus}</div>
                        <p className="text-xs text-[#a39dc2] mt-1.5 leading-relaxed">
                          {item.foundationBuilt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'certifications' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#ef4444] font-mono">
                      Verified Industry Credentials
                    </p>
                    <h3 className="text-2xl font-medium tracking-[-0.03em] text-[#f3efff] mt-1">
                      Cloud AI, Data Science &amp; Analytics Certifications
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {certificationsData.map(cert => (
                      <div
                        key={cert.title}
                        className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#ef4444] mt-2 shrink-0" aria-hidden="true" />
                          <div>
                            <div className="text-sm sm:text-base font-medium text-[#f3efff]">
                              {cert.title}
                            </div>
                            <div className="text-xs text-[#a39dc2] mt-0.5">{cert.issuer}</div>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#b9a6ff] self-start sm:self-center">
                          {cert.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'takeaways' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#b9a6ff] font-mono">
                      Hands-On Applied Experience
                    </p>
                    <h3 className="text-2xl font-medium tracking-[-0.03em] text-[#f3efff] mt-1">
                      Key Internship &amp; Engineering Takeaways
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {graduateInsightsData.map(item => (
                      <div key={item.title} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                        <div className="text-sm font-medium text-[#f3efff]">{item.title}</div>
                        <div className="text-[11px] font-mono text-[#ef4444] mt-0.5">{item.domain}</div>
                        <p className="text-xs text-[#a39dc2] mt-2 leading-relaxed">
                          {item.practicalApplication}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tile 3: Core AI, ML & Programming Languages (12 cols) */}
          <div className="lg:col-span-12 rounded-[28px] border border-white/15 bg-[#14131c]/90 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.14em] text-[#a39dc2] font-medium mb-4">
              Core AI, ML &amp; Data Science Languages
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
              {coreLanguageRows.map(lang => (
                <li
                  key={lang.name}
                  className="py-3 border-b border-white/10 flex items-baseline justify-between gap-3"
                >
                  <span className="font-medium text-sm sm:text-base text-[#f3efff]">
                    {lang.name}
                  </span>
                  <em className="not-italic text-xs text-[#a39dc2] text-right">
                    {lang.context}
                  </em>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};
