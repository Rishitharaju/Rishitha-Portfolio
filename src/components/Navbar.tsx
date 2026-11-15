import React, { useState, useEffect } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface NavbarProps {
  profile: ProfileData;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Internships', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(940px,calc(100%-32px))]">
      <div
        className={`relative flex items-center justify-between gap-3 rounded-full px-3 py-2.5 pl-5 backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0e0d16]/90 border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.55)]'
            : 'bg-[#0c0b12]/60 border border-white/5'
        }`}
      >
        {/* Brand with pulsing dot */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 font-medium tracking-tight text-[#f3efff] whitespace-nowrap shrink-0"
        >
          <span
            className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-[0_0_0_4px_rgba(239,68,68,0.32),0_0_0_5px_#08080b]"
            aria-hidden="true"
          />
          <span className="text-sm sm:text-base">{profile.name}</span>
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-sm text-[#a39dc2] hover:text-[#f3efff] hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-[#a39dc2] hover:text-[#f3efff] hover:bg-white/10 transition-colors"
            title="View Formatted Resume"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Résumé</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-[#f3efff] text-[#08080b] hover:bg-[#ef4444] hover:text-[#08080b] transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Let&apos;s talk</span>
            <span aria-hidden="true">↗</span>
          </a>

          {/* Mobile Burger */}
          <button
            type="button"
            onClick={() => setIsOpen(prev => !prev)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#f3efff] hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-[calc(100%+8px)] left-0 right-0 rounded-3xl bg-[#14131c]/95 border border-white/15 p-3 shadow-2xl backdrop-blur-xl flex flex-col gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-2xl text-base text-[#f3efff] hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenResume();
              }}
              className="mt-1 px-4 py-3 rounded-2xl text-left text-base font-medium bg-[#f3efff] text-[#08080b] hover:bg-[#ef4444] transition-colors flex items-center justify-between"
            >
              <span>View Formatted Résumé</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
