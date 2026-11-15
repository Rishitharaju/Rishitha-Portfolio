import React from 'react';
import { ProfileData } from '../types/portfolio';

interface FooterProps {
  profile: ProfileData;
  onOpenCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenCustomizer }) => {
  return (
    <footer className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12 mt-16 sm:mt-24 pt-5 pb-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#a39dc2]">
      <div>
        © {new Date().getFullYear()} {profile.name}
      </div>

      <div>
        {profile.roleKicker}
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={onOpenCustomizer}
          className="hover:text-[#ef4444] transition-colors"
        >
          Customize profile
        </button>
        <a href="#top" className="hover:text-[#ef4444] transition-colors">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};
