import React, { useState, useEffect, useRef } from 'react';
import { Project, ProjectCategory } from '../types/portfolio';
import { Play, Pause, ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
}

const cardThemes = [
  {
    bg: 'bg-[#ef4444]',
    text: 'text-[#08080b]',
    muted: 'text-[#450a0a]',
    kind: 'text-[#450a0a]',
    border: 'border-[#08080b]/25',
    tagBg: 'bg-white/35 border-[#08080b]/20 text-[#08080b]',
    btnBg: 'bg-[#08080b] text-[#f3efff] hover:bg-[#f3efff] hover:text-[#08080b]',
  },
  {
    bg: 'bg-[#d4c8ff]',
    text: 'text-[#0b0b0f]',
    muted: 'text-[#443e63]',
    kind: 'text-[#5538c8]',
    border: 'border-[#0b0b0f]/15',
    tagBg: 'bg-white/55 border-[#0b0b0f]/15 text-[#0b0b0f]',
    btnBg: 'bg-[#0b0b0f] text-[#f3efff] hover:bg-[#6a4fdc] hover:text-white',
  },
  {
    bg: 'bg-[#f3efff]',
    text: 'text-[#0b0b0f]',
    muted: 'text-[#4f4a6b]',
    kind: 'text-[#6a4fdc]',
    border: 'border-[#0b0b0f]/15',
    tagBg: 'bg-white/70 border-[#0b0b0f]/15 text-[#0b0b0f]',
    btnBg: 'bg-[#0b0b0f] text-[#f3efff] hover:bg-[#ef4444] hover:text-[#08080b]',
  },
  {
    bg: 'bg-[#fca5a5]',
    text: 'text-[#08080b]',
    muted: 'text-[#450a0a]',
    kind: 'text-[#7f1d1d]',
    border: 'border-[#08080b]/20',
    tagBg: 'bg-white/45 border-[#08080b]/20 text-[#08080b]',
    btnBg: 'bg-[#08080b] text-[#f3efff] hover:bg-[#08080b]/80 hover:text-white',
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onOpenCaseStudy }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedMarket, setSelectedMarket] = useState<'US' | 'NSE' | 'CRYPTO'>('US');
  const [isPaused, setIsPaused] = useState(false);

  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const scrimRefs = useRef<(HTMLDivElement | null)[]>([]);

  const marketConfigs = {
    US: { symbol: 'TECH_BENCHMARK / USD', currency: '$', basePrice: 146.40, label: 'US Market' },
    NSE: { symbol: 'NIFTY_TECH / INR', currency: '₹', basePrice: 2845.50, label: 'NSE India' },
    CRYPTO: { symbol: 'ETH / USDT', currency: '$', basePrice: 3120.80, label: 'Crypto 24/7' },
  };

  const [simPrice, setSimPrice] = useState<number>(marketConfigs.US.basePrice);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setSimPrice(prev => {
        const vol = selectedMarket === 'NSE' ? 1.8 : selectedMarket === 'CRYPTO' ? 2.5 : 0.45;
        return Number((prev + (Math.random() - 0.48) * vol).toFixed(2));
      });
    }, 1200);
    return () => clearInterval(id);
  }, [selectedMarket, isPaused]);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Scroll-driven depth scale & dim on covered cards as the next sticky card rises up over them
  useEffect(() => {
    let rafId = 0;

    const updateStackDepth = () => {
      const count = filteredProjects.length;
      for (let i = 0; i < count; i++) {
        const card = cardRefs.current[i];
        const scrim = scrimRefs.current[i];
        if (!card) continue;

        const nextCard = cardRefs.current[i + 1];
        if (!nextCard) {
          card.style.transform = 'scale(1)';
          if (scrim) scrim.style.opacity = '0';
          continue;
        }

        const currRect = card.getBoundingClientRect();
        const nextRect = nextCard.getBoundingClientRect();
        const cardHeight = Math.max(1, currRect.height);

        // Progress from 0 (next card sits below current card) to 1 (next card reaches sticky top and covers current card)
        const overlap = Math.min(1, Math.max(0, (currRect.bottom - nextRect.top) / cardHeight));
        const scale = 1 - overlap * 0.045;
        const dimOpacity = overlap * 0.28;

        card.style.transform = `scale(${scale.toFixed(4)})`;
        if (scrim) scrim.style.opacity = dimOpacity.toFixed(3);
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateStackDepth);
    };

    updateStackDepth();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [filteredProjects.length, activeCategory]);

  const handleMarketSwitch = (m: 'US' | 'NSE' | 'CRYPTO', e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMarket(m);
    setSimPrice(marketConfigs[m].basePrice);
  };

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All (4)' },
    { id: 'fullstack-web', label: 'FinTech & Web' },
    { id: 'data-analytics', label: 'Data Science & BI' },
    { id: 'ai-ml', label: 'AI & Neural Nets' },
  ];

  const renderPreviewVisual = (project: Project) => {
    switch (project.svgBadgeVariant) {
      case 'trading':
        return (
          <div className="w-full h-full bg-[#09090f] text-[#f3efff] p-5 sm:p-7 flex flex-col justify-between rounded-[22px] border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#a39dc2]">
                  Simulated Indicator Tick
                </div>
                <div className="font-mono text-sm sm:text-base font-semibold text-[#f3efff] mt-0.5">
                  {marketConfigs[selectedMarket].symbol}
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full">
                {(['US', 'NSE', 'CRYPTO'] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={e => handleMarketSwitch(m, e)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-colors ${
                      selectedMarket === m
                        ? 'bg-[#ef4444] text-[#08080b] font-semibold'
                        : 'text-[#a39dc2] hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setIsPaused(p => !p);
                  }}
                  className="p-1.5 rounded-full text-[#a39dc2] hover:text-white"
                  title={isPaused ? 'Resume live simulation' : 'Pause simulation'}
                >
                  {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="my-4 flex items-baseline justify-between">
              <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums text-[#f3efff]">
                {marketConfigs[selectedMarket].currency}
                {simPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-xs font-mono text-[#ef4444]">+1.84% · Signal Active</span>
            </div>

            <svg viewBox="0 0 360 110" className="w-full h-28 overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="projTradeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 86 Q 40 78, 70 72 T 135 58 T 205 64 T 275 34 T 360 16 L 360 110 L 0 110 Z"
                fill="url(#projTradeGrad)"
              />
              <path
                d="M0 86 Q 40 78, 70 72 T 135 58 T 205 64 T 275 34 T 360 16"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
              />
              <path
                d="M0 92 Q 70 84, 150 74 T 280 50 T 360 36"
                fill="none"
                stroke="#b9a6ff"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">RSI (14)</div>
                <div className="text-emerald-400 font-semibold mt-0.5">58.4</div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">EMA Cross</div>
                <div className="text-[#f3efff] font-semibold mt-0.5">9 &gt; 21</div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">Mode</div>
                <div className="text-[#b9a6ff] font-semibold mt-0.5">Paper Sim</div>
              </div>
            </div>
          </div>
        );

      case 'fraud':
        return (
          <div className="w-full h-full bg-[#09090f] text-[#f3efff] p-5 sm:p-7 flex flex-col justify-between rounded-[22px] border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#a39dc2]">
                  Anomaly Z-Score Thresholding
                </div>
                <div className="font-mono text-sm sm:text-base font-semibold text-[#f3efff] mt-0.5">
                  Transaction Risk Distribution
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-xs">
                -16% False Alerts
              </span>
            </div>

            <svg viewBox="0 0 360 140" className="w-full h-36 my-3" aria-hidden="true">
              {[
                { x: 20, h: 90, c: '#b9a6ff', lbl: 'Low' },
                { x: 75, h: 112, c: '#b9a6ff', lbl: 'Normal' },
                { x: 130, h: 78, c: '#b9a6ff', lbl: 'Mild' },
                { x: 185, h: 48, c: '#38bdf8', lbl: 'Review' },
                { x: 240, h: 32, c: '#ef4444', lbl: 'Flag' },
                { x: 295, h: 20, c: '#ef4444', lbl: 'Block' },
              ].map(bar => (
                <g key={bar.lbl}>
                  <rect
                    x={bar.x}
                    y={120 - bar.h}
                    width="36"
                    height={bar.h}
                    rx="6"
                    fill={bar.c}
                    fillOpacity="0.85"
                  />
                  <text
                    x={bar.x + 18}
                    y="136"
                    textAnchor="middle"
                    fill="#a39dc2"
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {bar.lbl}
                  </text>
                </g>
              ))}
              <line x1="175" y1="10" x2="175" y2="122" stroke="#ef4444" strokeDasharray="4 4" strokeWidth="1.5" />
            </svg>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">Filter</div>
                <div className="text-[#f3efff] font-semibold mt-0.5">Z-Score / IQR</div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">Engine</div>
                <div className="text-[#b9a6ff] font-semibold mt-0.5">Pandas + SQL</div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">Precision</div>
                <div className="text-emerald-400 font-semibold mt-0.5">+16% Gain</div>
              </div>
            </div>
          </div>
        );

      case 'neural':
        return (
          <div className="w-full h-full bg-[#09090f] text-[#f3efff] p-5 sm:p-7 flex flex-col justify-between rounded-[22px] border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#a39dc2]">
                  B.Tech Final Year Capstone (Feb 2025)
                </div>
                <div className="font-mono text-sm sm:text-base font-semibold text-[#f3efff] mt-0.5">
                  Dual-Embedding Neural Recommender
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#b9a6ff]/15 text-[#b9a6ff] font-mono text-xs">
                Distinction
              </span>
            </div>

            <svg viewBox="0 0 360 150" className="w-full h-36 my-3" aria-hidden="true">
              {[35, 75, 115].map(y1 =>
                [30, 60, 90, 120].map(y2 => (
                  <line
                    key={`e1-${y1}-${y2}`}
                    x1="58"
                    y1={y1}
                    x2="170"
                    y2={y2}
                    stroke="#b9a6ff"
                    strokeOpacity="0.28"
                    strokeWidth="1.2"
                  />
                ))
              )}
              {[30, 60, 90, 120].map(y1 =>
                [48, 102].map(y2 => (
                  <line
                    key={`e2-${y1}-${y2}`}
                    x1="184"
                    y1={y1}
                    x2="296"
                    y2={y2}
                    stroke="#ef4444"
                    strokeOpacity="0.45"
                    strokeWidth="1.4"
                  />
                ))
              )}
              {[35, 75, 115].map((y, idx) => (
                <circle key={`in-${idx}`} cx="50" cy={y} r="9" fill="#14131c" stroke="#b9a6ff" strokeWidth="2" />
              ))}
              {[30, 60, 90, 120].map((y, idx) => (
                <circle key={`hid-${idx}`} cx="177" cy={y} r="9" fill="#b9a6ff" />
              ))}
              {[48, 102].map((y, idx) => (
                <circle key={`out-${idx}`} cx="304" cy={y} r="11" fill="#ef4444" />
              ))}
              <text x="50" y="142" textAnchor="middle" fill="#a39dc2" fontSize="10" fontFamily="JetBrains Mono, monospace">
                Learner Vector
              </text>
              <text x="177" y="142" textAnchor="middle" fill="#a39dc2" fontSize="10" fontFamily="JetBrains Mono, monospace">
                Dense Hidden
              </text>
              <text x="304" y="142" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="JetBrains Mono, monospace">
                Top-K Books
              </text>
            </svg>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">Framework</div>
                <div className="text-[#f3efff] font-semibold mt-0.5">TF / PyTorch</div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">Cold Start</div>
                <div className="text-[#b9a6ff] font-semibold mt-0.5">Hybrid Match</div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">API</div>
                <div className="text-[#ef4444] font-semibold mt-0.5">FastAPI</div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
      default:
        return (
          <div className="w-full h-full bg-[#09090f] text-[#f3efff] p-5 sm:p-7 flex flex-col justify-between rounded-[22px] border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#a39dc2]">
                  Besant Technologies Internship
                </div>
                <div className="font-mono text-sm sm:text-base font-semibold text-[#f3efff] mt-0.5">
                  RFM Cohort &amp; Power BI Automation
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-400/15 text-emerald-300 font-mono text-xs">
                -40% Reporting Time
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-3">
              <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                <div className="text-[11px] font-mono text-[#a39dc2]">SQL Pipeline</div>
                <div className="text-lg font-semibold text-[#f3efff] mt-1">CTEs + Joins</div>
                <div className="text-[11px] text-[#b9a6ff] mt-1">Automated extraction</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                <div className="text-[11px] font-mono text-[#a39dc2]">Power BI DAX</div>
                <div className="text-lg font-semibold text-[#ef4444] mt-1">40% Faster</div>
                <div className="text-[11px] text-[#a39dc2] mt-1">Executive KPIs</div>
              </div>
            </div>

            <div className="space-y-2.5 my-2">
              {[
                { label: 'Champions Cohort', pct: 84, color: '#ef4444' },
                { label: 'Loyal Repeat Buyers', pct: 68, color: '#b9a6ff' },
                { label: 'At-Risk Retention Target', pct: 42, color: '#f3efff' },
              ].map(row => (
                <div key={row.label} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-[#a39dc2]">{row.label}</span>
                    <span className="text-[#f3efff]">{row.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.pct}%`, backgroundColor: row.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">Cleaning</div>
                <div className="text-[#f3efff] font-semibold mt-0.5">Python Pandas</div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">Queries</div>
                <div className="text-[#b9a6ff] font-semibold mt-0.5">MySQL / PG</div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[#a39dc2] text-[10px]">BI Output</div>
                <div className="text-[#ef4444] font-semibold mt-0.5">Power BI</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="work" className="pt-20 sm:pt-32">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header + Category Filter */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-[#a39dc2] font-medium">
              ( Selected work )
            </p>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-[4.2rem] font-medium tracking-[-0.04em] leading-[1.02] text-[#f3efff] [text-wrap:balance]">
              Systems &amp; models built to solve{' '}
              <span className="serif-italic text-[#ef4444] text-[1.08em]">real problems</span>.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#14131c] border border-white/10 self-start lg:self-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#f3efff] text-[#08080b]'
                    : 'text-[#a39dc2] hover:text-[#f3efff]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        {/* Scroll-Driven Covering Sticky Stack (scrolling brings next card up over previous one) */}
        <div className="relative pb-6">
          {filteredProjects.map((project, idx) => {
            const theme = cardThemes[idx % cardThemes.length];
            const indexLabel = String(idx + 1).padStart(2, '0');

            return (
              <article
                key={project.id}
                ref={el => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => onOpenCaseStudy(project)}
                style={{
                  top: `calc(78px + ${idx * 16}px)`,
                  zIndex: idx + 1,
                  transformOrigin: 'top center',
                }}
                className={`sticky mb-14 sm:mb-20 last:mb-0 rounded-[30px] sm:rounded-[34px] p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 min-h-[480px] lg:h-[clamp(540px,100svh-140px,650px)] overflow-hidden shadow-[0_-16px_48px_rgba(0,0,0,0.58)] border border-white/10 cursor-pointer will-change-transform transition-[box-shadow] duration-300 ${theme.bg} ${theme.text}`}
              >
                {/* Dynamic Darkening Scrim as next card rises over this card */}
                <div
                  ref={el => {
                    scrimRefs.current[idx] = el;
                  }}
                  aria-hidden="true"
                  className="absolute inset-0 bg-black pointer-events-none rounded-[inherit] z-20 transition-opacity duration-75"
                  style={{ opacity: 0 }}
                />

                {/* Left Copy Column */}
                <div className="relative z-10 lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className={`flex items-center justify-between text-xs sm:text-sm font-mono ${theme.muted}`}>
                      <span className="tabular-nums font-semibold">
                        {indexLabel} / {String(filteredProjects.length).padStart(2, '0')}
                      </span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="mt-4 sm:mt-6 text-2xl sm:text-4xl lg:text-[2.95rem] font-medium tracking-[-0.045em] leading-[1.02]">
                      {project.title}
                    </h3>

                    <p className={`mt-2 text-sm sm:text-lg font-medium ${theme.kind}`}>
                      {project.subtitle}
                    </p>

                    <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-[46ch] ${theme.muted}`}>
                      {project.summary}
                    </p>

                    <ul className="mt-3.5 space-y-1.5 text-xs sm:text-sm">
                      {project.caseStudy.keyLearnings.slice(0, 3).map((pt, i) => (
                        <li key={i} className="pl-5 relative leading-snug">
                          <span className="absolute left-0 font-semibold" aria-hidden="true">→</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/15 flex flex-col gap-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium border ${theme.tagBg}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          onOpenCaseStudy(project);
                        }}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${theme.btnBg}`}
                      >
                        <span>Explore case study &amp; interactive demo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Media / Interactive Visual Column */}
                <div className="relative z-10 lg:col-span-6 min-h-[280px] sm:min-h-[340px] flex items-stretch">
                  {renderPreviewVisual(project)}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
