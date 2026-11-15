export type ProjectCategory = 'all' | 'fullstack-web' | 'data-analytics' | 'ai-ml';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  overview: string;
  motivation: string;
  implementation: string;
  keyLearnings: string[];
  metrics: ProjectMetric[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoType: 'trading-signals' | 'customer-behavior' | 'fraud-detection' | 'smart-recommendation';
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  featured: boolean;
  year: string;
  summary: string;
  verifiedOutcome: string;
  tags: string[];
  caseStudy: CaseStudy;
  svgBadgeVariant: 'trading' | 'analytics' | 'fraud' | 'neural' | 'sql';
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    proficiency: 'Proficient' | 'Working Knowledge' | 'Academic Foundation';
    summary: string;
  }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Graduate Trainee' | 'Internship' | 'Project Contract';
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  details: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  skillsGained: string;
  linkText: string;
}

export interface GraduateInsight {
  title: string;
  domain: string;
  takeaway: string;
  practicalApplication: string;
}

export interface FinTechRoadmapItem {
  area: string;
  focus: string;
  foundationBuilt: string;
}

export interface ProfileData {
  name: string;
  title: string;
  roleKicker: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  availability: string;
  targetDegree: string;
  coreCompetencies: string[];
}
