import React, { useState } from 'react';
import { ProfileData } from '../types/portfolio';
import { Mail, Phone, Linkedin, Github, FileText, Check, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  profile: ProfileData;
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onOpenResume }) => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('a Data Science / ML role');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleTileMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mx', `${x}%`);
    e.currentTarget.style.setProperty('--my', `${y}%`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry: ${topic} — from ${name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Rishitha,\n\nI'm ${name || 'reaching out'} regarding ${topic}.\nMy email: ${email}\n\n${note ? `Note:\n${note}\n\n` : ''}Best regards,\n${name}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="pt-24 sm:pt-36">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3.5">
            <div className="w-14 h-14 rounded-full border-2 border-[#ef4444] shadow-[0_0_0_5px_rgba(239,68,68,0.18)] bg-[#14131c] flex items-center justify-center">
              <span className="serif-italic text-2xl text-[#f3efff]">RA</span>
            </div>
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-[#14131c]/90 text-xs sm:text-sm text-[#a39dc2]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ef4444] ring-1 ring-[#f3efff]" />
              </span>
              <span>Preparing for Master&apos;s in FinTech · Open to Roles &amp; Research</span>
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-[5.5rem] font-medium tracking-[-0.05em] leading-[0.98] text-[#f3efff]">
            Let&apos;s build something
            <br />
            <span className="serif-italic text-[#ef4444] text-[1.08em]">intelligent</span>.
          </h2>
        </header>

        {/* Contact Grid: Interactive Sentence Card + Right Side Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 mt-10 sm:mt-14 items-stretch">
          
          {/* Left: Conic Animated Border Fill-in-the-Blank Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 conic-card rounded-[28px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#ef4444] mb-5">
                Tell me about the opportunity
              </p>

              <p className="text-2xl sm:text-3xl lg:text-[2.6rem] font-medium tracking-[-0.035em] leading-[1.32] text-[#f3efff]">
                Hi Rishitha, I&apos;m{' '}
                <input
                  required
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="your name"
                  aria-label="Your name"
                  className="bg-transparent border-0 border-b-2 border-[#ef4444]/55 focus:border-[#ef4444] text-[#ef4444] placeholder:text-[#ef4444]/45 outline-none px-1 w-40 sm:w-52 transition-colors"
                />
                . I&apos;d like to discuss{' '}
                <select
                  aria-label="Opportunity type"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="bg-transparent border-0 border-b-2 border-[#ef4444]/55 focus:border-[#ef4444] text-[#ef4444] outline-none px-1 cursor-pointer [&>option]:bg-[#14131c] [&>option]:text-[#f3efff]"
                >
                  <option value="a Data Science / ML role">a Data Science / ML role</option>
                  <option value="a Software Engineer role">a Software Engineer role</option>
                  <option value="a FinTech / Quantitative project">a FinTech / Quantitative project</option>
                  <option value="FinTech Master's collaboration">FinTech Master&apos;s collaboration</option>
                </select>
                . You can reach me at{' '}
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  aria-label="Your email"
                  className="bg-transparent border-0 border-b-2 border-[#ef4444]/55 focus:border-[#ef4444] text-[#ef4444] placeholder:text-[#ef4444]/45 outline-none px-1 w-52 sm:w-64 transition-colors"
                />
                .
              </p>

              <input
                type="text"
                name="note"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Anything else I should know? (optional)"
                aria-label="Optional note"
                className="mt-8 w-full bg-white/[0.04] border border-white/15 focus:border-[#ef4444]/70 rounded-2xl px-4 py-3.5 text-sm sm:text-base text-[#f3efff] placeholder:text-[#a39dc2]/60 outline-none transition-colors"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="group inline-flex items-center gap-3.5 pl-7 pr-2 py-2 rounded-full bg-[#f3efff] text-[#08080b] hover:bg-[#ef4444] transition-all duration-300 hover:-translate-y-0.5 font-medium text-base"
              >
                <span>{submitted ? 'Opening mail app...' : 'Send it'}</span>
                <span className="w-10 h-10 rounded-full bg-[#ef4444] text-[#08080b] group-hover:bg-[#08080b] group-hover:text-[#ef4444] grid place-items-center transition-all duration-300 group-hover:rotate-45">
                  ↗
                </span>
              </button>
              <small className="text-xs sm:text-sm text-[#a39dc2]">
                Opens your email app with the message pre-filled.
              </small>
            </div>
          </form>

          {/* Right: 5 Interactive Contact Tiles */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            
            <button
              type="button"
              onClick={handleCopyEmail}
              onMouseMove={handleTileMouseMove}
              style={{ '--mx': '50%', '--my': '0%' } as React.CSSProperties}
              className="group relative rounded-[24px] border border-white/15 bg-[#14131c]/90 p-4 sm:p-5 flex items-center gap-4 text-left overflow-hidden hover:border-[#ef4444]/65 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="w-11 h-11 rounded-2xl bg-[#ef4444]/15 text-[#ef4444] group-hover:bg-[#ef4444] group-hover:text-[#08080b] grid place-items-center shrink-0 transition-colors">
                {copiedEmail ? <Check className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
              </span>
              <span className="min-w-0">
                <em className="block not-italic text-[11px] font-mono uppercase tracking-[0.12em] text-[#a39dc2]">
                  {copiedEmail ? 'Copied to clipboard' : 'Email · click to copy'}
                </em>
                <b className="block font-medium text-sm sm:text-base text-[#f3efff] truncate">
                  {profile.email}
                </b>
              </span>
            </button>

            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              onMouseMove={handleTileMouseMove}
              className="group relative rounded-[24px] border border-white/15 bg-[#14131c]/90 p-4 sm:p-5 flex items-center gap-4 text-left overflow-hidden hover:border-[#ef4444]/65 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="w-11 h-11 rounded-2xl bg-[#ef4444]/15 text-[#ef4444] group-hover:bg-[#ef4444] group-hover:text-[#08080b] grid place-items-center shrink-0 transition-colors">
                <Phone className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <em className="block not-italic text-[11px] font-mono uppercase tracking-[0.12em] text-[#a39dc2]">
                  Call
                </em>
                <b className="block font-medium text-sm sm:text-base text-[#f3efff]">
                  {profile.phone}
                </b>
              </span>
            </a>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onMouseMove={handleTileMouseMove}
              className="group relative rounded-[24px] border border-white/15 bg-[#14131c]/90 p-4 sm:p-5 flex items-center gap-4 text-left overflow-hidden hover:border-[#ef4444]/65 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="w-11 h-11 rounded-2xl bg-[#ef4444]/15 text-[#ef4444] group-hover:bg-[#ef4444] group-hover:text-[#08080b] grid place-items-center shrink-0 transition-colors">
                <Linkedin className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <em className="block not-italic text-[11px] font-mono uppercase tracking-[0.12em] text-[#a39dc2]">
                  LinkedIn
                </em>
                <b className="block font-medium text-sm sm:text-base text-[#f3efff] truncate">
                  rishitha-ayyapparaju-9040b4299
                </b>
              </span>
              <ArrowUpRight className="w-4 h-4 ml-auto text-[#a39dc2] group-hover:text-[#ef4444] transition-colors shrink-0" />
            </a>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              onMouseMove={handleTileMouseMove}
              className="group relative rounded-[24px] border border-white/15 bg-[#14131c]/90 p-4 sm:p-5 flex items-center gap-4 text-left overflow-hidden hover:border-[#ef4444]/65 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="w-11 h-11 rounded-2xl bg-[#ef4444]/15 text-[#ef4444] group-hover:bg-[#ef4444] group-hover:text-[#08080b] grid place-items-center shrink-0 transition-colors">
                <Github className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <em className="block not-italic text-[11px] font-mono uppercase tracking-[0.12em] text-[#a39dc2]">
                  GitHub
                </em>
                <b className="block font-medium text-sm sm:text-base text-[#f3efff] truncate">
                  Rishitharaju
                </b>
              </span>
              <ArrowUpRight className="w-4 h-4 ml-auto text-[#a39dc2] group-hover:text-[#ef4444] transition-colors shrink-0" />
            </a>

            <button
              type="button"
              onClick={onOpenResume}
              className="group sm:col-span-2 lg:col-span-1 rounded-[24px] border border-white/15 bg-[#14131c]/90 p-4 sm:p-5 flex items-center gap-4 text-left hover:border-[#b9a6ff]/70 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="w-11 h-11 rounded-2xl bg-[#b9a6ff]/15 text-[#b9a6ff] group-hover:bg-[#b9a6ff] group-hover:text-[#08080b] grid place-items-center shrink-0 transition-colors">
                <FileText className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <em className="block not-italic text-[11px] font-mono uppercase tracking-[0.12em] text-[#a39dc2]">
                  Curriculum Vitae
                </em>
                <b className="block font-medium text-sm sm:text-base text-[#f3efff]">
                  View Formatted Résumé
                </b>
              </span>
              <ArrowUpRight className="w-4 h-4 ml-auto text-[#a39dc2] group-hover:text-[#b9a6ff] transition-colors shrink-0" />
            </button>

          </div>
        </div>

        {/* Bottom 3-Column Facts Strip */}
        <ul className="mt-5 rounded-[22px] border border-white/15 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15 overflow-hidden bg-[#14131c]/50">
          <li className="px-6 py-4">
            <b className="block text-lg sm:text-xl font-medium tracking-tight text-[#f3efff]">
              {profile.location}
            </b>
            <span className="text-xs text-[#a39dc2]">Open to relocation &amp; remote</span>
          </li>
          <li className="px-6 py-4">
            <b className="block text-lg sm:text-xl font-medium tracking-tight text-[#f3efff]">
              8.76 / 10 GPA
            </b>
            <span className="text-xs text-[#a39dc2]">B.Tech CSE (AI &amp; Data Science)</span>
          </li>
          <li className="px-6 py-4">
            <b className="block text-lg sm:text-xl font-medium tracking-tight text-[#ef4444]">
              FinTech M.S.
            </b>
            <span className="text-xs text-[#a39dc2]">Graduate preparation &amp; research</span>
          </li>
        </ul>

      </div>
    </section>
  );
};
