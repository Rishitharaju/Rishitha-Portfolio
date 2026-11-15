import React, { useState, useEffect } from 'react';
import { initialProfileData, projectsData } from './data/portfolioData';
import { ProfileData, Project } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutBentoSection } from './components/AboutBentoSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectCaseStudyModal } from './components/ProjectCaseStudyModal';
import { ResumeModal } from './components/ResumeModal';
import { ProfileCustomizerModal } from './components/ProfileCustomizerModal';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Profile data state
  const [profile, setProfile] = useState<ProfileData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rishitha_profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as ProfileData;
          if (parsed.githubUrl === 'https://github.com/rishitha-ayyapparaju') {
            parsed.githubUrl = initialProfileData.githubUrl;
          }
          if (parsed.linkedinUrl === 'https://linkedin.com/in/rishitha-ayyapparaju') {
            parsed.linkedinUrl = initialProfileData.linkedinUrl;
          }
          return parsed;
        } catch {
          return initialProfileData;
        }
      }
    }
    return initialProfileData;
  });

  // Modals state
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  // Ensure dark editorial class on html root
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Top reading progress bar listener
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(ratio);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    localStorage.setItem('rishitha_profile', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#08080b] text-[#f3efff] flex flex-col font-sans relative">
      
      {/* Top Scroll Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#ef4444] origin-left z-[120] pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Ambient Drifting Background Orbs */}
      <div className="ambient-orbs" aria-hidden="true">
        <i className="orb-a" />
        <i className="orb-b" />
        <i className="orb-c" />
      </div>

      {/* Floating Pill Navbar */}
      <Navbar
        profile={profile}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <main className="flex-1 relative z-10">
        {/* Monumental Hero + Draggable Skill Pills + AI/ML Marquee */}
        <Hero
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Selected Work: Vibrant Alternating Stacked Editorial Project Cards */}
        <ProjectsSection
          projects={projectsData}
          onOpenCaseStudy={proj => setSelectedCaseStudy(proj)}
        />

        {/* About, Education, FinTech Master's Roadmap, Certifications & Core Languages Bento */}
        <AboutBentoSection profile={profile} />

        {/* Internships & Graduate Training Center-Spine Timeline */}
        <ExperienceTimeline />

        {/* Core Applications, AI, ML & Data Science Languages + Spotlight Cards */}
        <SkillsSection />

        {/* Editorial Statement Band */}
        <section aria-label="Engineering Statement" className="pt-24 sm:pt-36">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-8 lg:px-12">
            <p className="text-3xl sm:text-5xl lg:text-[3.8rem] font-medium tracking-[-0.04em] leading-[1.12] text-[#f3efff] [text-wrap:balance]">
              I combine{' '}
              <span className="serif-italic text-[#ef4444] text-[1.08em]">
                AI, Machine Learning
              </span>
              , and clean software engineering to turn complex financial and operational data into reliable,{' '}
              <span className="serif-italic text-[#ef4444] text-[1.08em]">
                actionable systems
              </span>
              .
            </p>
          </div>
        </section>

        {/* Interactive Fill-in-the-Blank Contact Section */}
        <ContactSection
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </main>

      {/* Compact Editorial Footer */}
      <Footer
        profile={profile}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Case Study Deep-Dive Modal with Project Simulators */}
      <ProjectCaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Formatted Printable Resume Modal */}
      <ResumeModal
        profile={profile}
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Profile Details Personalization Drawer */}
      <ProfileCustomizerModal
        profile={profile}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
