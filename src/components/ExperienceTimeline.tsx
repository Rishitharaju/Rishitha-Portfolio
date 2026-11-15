import React from 'react';
import { experienceData } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const shortYears = ['2025–26', '2025', '2024', '2023–24'];

  return (
    <section id="experience" aria-label="Internship and graduate training timeline" className="pt-24 sm:pt-36">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12">
        
        <header className="max-w-3xl">
          <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-[#a39dc2] font-medium">
            ( Internships &amp; Training )
          </p>
          <h2 className="mt-4 text-3xl sm:text-5xl lg:text-[4.2rem] font-medium tracking-[-0.04em] leading-[1.02] text-[#f3efff] [text-wrap:balance]">
            Four milestones of{' '}
            <span className="serif-italic text-[#ef4444] text-[1.08em]">hands-on</span> engineering.
          </h2>
        </header>

        <div className="mt-8 sm:mt-14 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#a39dc2]">
          <div>
            <strong className="text-[#f3efff] font-semibold">Graduate record</strong>
            <span className="inline-block w-6 h-px bg-white/35 mx-2.5 align-middle" aria-hidden="true" />
            <span>2023 — 2026</span>
          </div>
          <div>04 internships &amp; trainee programs · chronological</div>
        </div>

        {/* Center-Spine Alternating Timeline */}
        <div className="relative mt-10 sm:mt-14 pt-4">
          {/* Vertical Spine on Desktop */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-[#ef4444]/60 via-white/15 to-transparent"
            aria-hidden="true"
          />

          <ol className="space-y-12 sm:space-y-16 relative">
            {experienceData.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              const yearLabel = shortYears[idx] || exp.period.slice(-4);

              return (
                <li
                  key={`${exp.company}-${exp.period}`}
                  className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-8"
                >
                  {/* Center Dot Node */}
                  <div
                    className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#08080b] border-2 border-[#ef4444] shadow-[0_0_0_6px_rgba(239,68,68,0.16)] z-10"
                    aria-hidden="true"
                  />

                  {/* Content Column */}
                  <div
                    className={`md:col-span-5 ${
                      isLeft
                        ? 'md:col-start-1 md:text-right md:pr-6'
                        : 'md:col-start-8 md:text-left md:pl-6'
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#a39dc2] ${
                        isLeft ? 'md:justify-end' : ''
                      }`}
                    >
                      <span>{exp.period}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#b9a6ff]">{exp.type}</span>
                    </div>

                    <div className="mt-1 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.05em] tabular-nums text-[#ef4444]/90 leading-none">
                      {yearLabel}
                    </div>

                    <h3 className="mt-3 text-lg sm:text-2xl font-semibold uppercase tracking-[-0.01em] text-[#f3efff]">
                      {exp.company}
                    </h3>
                    <p className="text-sm text-[#a39dc2] mt-0.5">
                      {exp.role} · {exp.location}
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-[#f3efff]/80 leading-relaxed">
                      {exp.highlights.map((hl, hIdx) => (
                        <li
                          key={hIdx}
                          className={`relative ${
                            isLeft ? 'md:pr-4' : 'pl-4'
                          } ${isLeft ? 'pl-4 md:pl-0' : ''}`}
                        >
                          <span
                            className={`absolute top-2 w-1.5 h-1.5 rounded-full bg-[#ef4444] ${
                              isLeft ? 'left-0 md:left-auto md:right-0' : 'left-0'
                            }`}
                            aria-hidden="true"
                          />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`mt-4 flex flex-wrap gap-1.5 ${
                        isLeft ? 'md:justify-end' : ''
                      }`}
                    >
                      {exp.technologies.map(t => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-[#a39dc2]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

      </div>
    </section>
  );
};
