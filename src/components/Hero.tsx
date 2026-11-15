import React, { useState, useRef } from 'react';
import { ProfileData } from '../types/portfolio';

interface HeroProps {
  profile: ProfileData;
  onOpenResume: () => void;
}

interface StickerItem {
  id: string;
  label: string;
  variant: 'red' | 'lavender' | 'light';
  initialTop: string;
  initialLeft: string;
  rotate: string;
  delay: string;
}

const initialStickers: StickerItem[] = [
  { id: 'py', label: 'Python · AI/ML', variant: 'red', initialTop: '-6%', initialLeft: '68%', rotate: '-4deg', delay: '0s' },
  { id: 'ml', label: 'Machine Learning', variant: 'lavender', initialTop: '24%', initialLeft: '78%', rotate: '5deg', delay: '-0.8s' },
  { id: 'sql', label: 'SQL & Analytics', variant: 'light', initialTop: '56%', initialLeft: '64%', rotate: '-3deg', delay: '-1.6s' },
  { id: 'nn', label: 'Neural Networks', variant: 'lavender', initialTop: '78%', initialLeft: '79%', rotate: '4deg', delay: '-2.3s' },
  { id: 'ft', label: "FinTech M.S.", variant: 'red', initialTop: '76%', initialLeft: '47%', rotate: '-2deg', delay: '-3.1s' },
];

const marqueeItems = [
  { name: 'Python', color: '#38bdf8', badge: 'Py' },
  { name: 'SQL', color: '#ef4444', badge: 'SQL' },
  { name: 'Core Java', color: '#a78bfa', badge: 'Jv' },
  { name: 'TensorFlow', color: '#2dd4bf', badge: 'TF' },
  { name: 'PyTorch', color: '#818cf8', badge: 'PT' },
  { name: 'Scikit-Learn', color: '#38bdf8', badge: 'SK' },
  { name: 'Pandas', color: '#b9a6ff', badge: 'Pd' },
  { name: 'NumPy', color: '#4DABCF', badge: 'Np' },
  { name: 'Power BI', color: '#ef4444', badge: 'BI' },
  { name: 'FastAPI', color: '#00c4a7', badge: 'FA' },
  { name: 'Next.js', color: '#f3efff', badge: 'Nx' },
  { name: 'PostgreSQL', color: '#60a5fa', badge: 'PG' },
  { name: 'AWS & Azure', color: '#b9a6ff', badge: 'CL' },
  { name: 'Git & GitHub', color: '#ef4444', badge: 'Git' },
];

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume }) => {
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragOrigin = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);

  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const curr = offsets[id] || { x: 0, y: 0 };
    dragOrigin.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      origX: curr.x,
      origY: curr.y,
    };
    setDraggingId(id);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragOrigin.current) return;
    const { id, startX, startY, origX, origY } = dragOrigin.current;
    setOffsets(prev => ({
      ...prev,
      [id]: {
        x: origX + (e.clientX - startX),
        y: origY + (e.clientY - startY),
      },
    }));
  };

  const handlePointerUp = () => {
    dragOrigin.current = null;
    setDraggingId(null);
  };

  const getStickerStyle = (variant: StickerItem['variant']) => {
    switch (variant) {
      case 'red':
        return 'bg-[#ef4444] text-[#08080b]';
      case 'lavender':
        return 'bg-[#b9a6ff] text-[#08080b]';
      case 'light':
      default:
        return 'bg-[#f3efff] text-[#08080b]';
    }
  };

  return (
    <section id="top" className="relative pt-24 sm:pt-28 pb-0">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12 min-h-[calc(100svh-96px)] flex flex-col justify-between gap-8 sm:gap-10">
        
        {/* Top Status Badge */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-[#14131c]/90 text-xs sm:text-sm text-[#a39dc2]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ef4444] ring-1 ring-[#f3efff]" />
            </span>
            <span>{profile.roleKicker} · Tirupati, India</span>
          </div>
        </div>

        {/* Monumental Display Headline + Draggable Skill Stickers */}
        <div className="relative my-2 sm:my-4">
          <h1 className="relative z-10 font-medium tracking-[-0.045em] text-[clamp(2.5rem,7.2vw,6.8rem)] leading-[0.95] text-[#f3efff] max-w-[16ch] lg:max-w-none [text-wrap:balance]">
            Applying{' '}
            <span className="serif-italic text-[#ef4444] text-[1.08em]">
              AI, Machine Learning
            </span>
            <br className="hidden lg:block" />{' '}
            &amp; Data Science to build{' '}
            <span className="serif-italic text-[#b9a6ff] text-[1.08em]">
              FinTech
            </span>{' '}
            systems.
          </h1>

          {/* Draggable floating sticker pills on desktop, clean wrapped pills on mobile */}
          <div className="lg:absolute lg:inset-0 lg:z-20 lg:pointer-events-none flex flex-wrap gap-2.5 mt-6 lg:mt-0">
            {initialStickers.map(st => {
              const offset = offsets[st.id] || { x: 0, y: 0 };
              const isGrabbed = draggingId === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onPointerDown={e => handlePointerDown(st.id, e)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  style={{
                    top: st.initialTop,
                    left: st.initialLeft,
                    transform: `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${st.rotate})`,
                  }}
                  className={`lg:pointer-events-auto lg:absolute touch-none select-none ${
                    isGrabbed ? 'cursor-grabbing z-30 scale-110' : 'cursor-grab hover:scale-105'
                  } transition-transform duration-200`}
                  title="Drag pill"
                >
                  <span
                    style={{ animationDelay: st.delay }}
                    className={`block px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap shadow-[0_12px_28px_rgba(0,0,0,0.45)] ${
                      isGrabbed ? '' : 'sticker-bob'
                    } ${getStickerStyle(st.variant)}`}
                  >
                    {st.label}
                  </span>
                </button>
              );
            })}
            <span className="hidden lg:block absolute -bottom-7 right-2 text-[11px] uppercase tracking-[0.14em] text-[#a39dc2]/70 pointer-events-none">
              Drag pills ↗
            </span>
          </div>
        </div>

        {/* Lower Split Row: Bio & CTAs on Left, Stats Strip on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-4">
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-[#a39dc2] max-w-[58ch] leading-relaxed">
              I&apos;m <strong className="text-[#f3efff] font-medium">{profile.name}</strong>, a Computer Science &amp; Engineering graduate specializing in{' '}
              <strong className="text-[#f3efff] font-medium">AI &amp; Data Science (GPA: 8.76 / 10)</strong>. With graduate training and internships at{' '}
              <strong className="text-[#f3efff] font-medium">Infosys India</strong>,{' '}
              <strong className="text-[#f3efff] font-medium">Besant Technologies</strong>, and{' '}
              <strong className="text-[#f3efff] font-medium">Swentic Educo</strong>, I am preparing for my Master&apos;s in FinTech while building Python, SQL, and ML applications.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm sm:text-base font-medium bg-[#f3efff] text-[#08080b] hover:bg-[#ef4444] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>View selected work</span>
                <span aria-hidden="true">↓</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm sm:text-base font-medium border border-[#f3efff]/60 text-[#f3efff] hover:bg-[#f3efff] hover:text-[#08080b] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>View résumé</span>
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>

          <dl className="lg:col-span-5 flex flex-wrap lg:justify-end gap-8 sm:gap-12 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
            <div>
              <dt className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.04em] text-[#f3efff] tabular-nums">
                8.76
              </dt>
              <dd className="text-xs sm:text-sm text-[#a39dc2] mt-1.5">B.Tech GPA (AI &amp; DS)</dd>
            </div>
            <div>
              <dt className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.04em] text-[#f3efff] tabular-nums">
                04
              </dt>
              <dd className="text-xs sm:text-sm text-[#a39dc2] mt-1.5">Internships &amp; training</dd>
            </div>
            <div>
              <dt className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.04em] text-[#f3efff] tabular-nums">
                04
              </dt>
              <dd className="text-xs sm:text-sm text-[#a39dc2] mt-1.5">Selected case studies</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Full-bleed Infinite Marquee of AI, ML, Data Science & Engineering Languages */}
      <div
        className="marquee-wrapper border-y border-white/15 bg-white/[0.03] mt-8 sm:mt-12 overflow-hidden"
        aria-label="AI, ML, Data Science and Software Tools"
      >
        <div className="marquee-track">
          {[0, 1].map(loopIdx => (
            <ul key={loopIdx} aria-hidden={loopIdx === 1} className="flex items-center gap-12 px-6 py-5">
              {marqueeItems.map(item => (
                <li
                  key={`${loopIdx}-${item.name}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap text-sm sm:text-base font-medium text-[#f3efff]"
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold border border-white/15"
                    style={{ backgroundColor: `${item.color}22`, color: item.color }}
                  >
                    {item.badge}
                  </span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};
