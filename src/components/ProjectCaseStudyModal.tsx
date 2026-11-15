import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Play, RefreshCw, ShieldAlert, LineChart, Brain, Filter, ArrowUpRight } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({ project, onClose }) => {
  // Trading Simulator State
  const [paperTrades, setPaperTrades] = useState<Array<{ id: number; symbol: string; type: 'BUY' | 'SELL'; price: number; signal: string }>>([
    { id: 1, symbol: 'NVDA/USD', type: 'BUY', price: 138.40, signal: 'RSI(42) + Bullish EMA Crossover' },
    { id: 2, symbol: 'AAPL/USD', type: 'BUY', price: 224.15, signal: 'Bollinger Lower Bounce (2σ)' }
  ]);
  const [simulatedAccountBalance, setSimulatedAccountBalance] = useState<number>(10450);

  // Fraud Detection Simulator State
  const [riskThreshold, setRiskThreshold] = useState<number>(75);

  // Customer Behavior RFM State
  const [activeCohort, setActiveCohort] = useState<'Champions' | 'Loyal' | 'At Risk' | 'Lost'>('Champions');

  // Neural Recommendation Simulator State
  const [selectedTopic, setSelectedTopic] = useState<'dsa' | 'ml' | 'cloud' | 'fullstack'>('ml');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleExecutePaperTrade = () => {
    const mockSymbols = ['MSFT/USD', 'GOOGL/USD', 'TSLA/USD', 'AMZN/USD'];
    const sym = mockSymbols[Math.floor(Math.random() * mockSymbols.length)];
    const price = Number((120 + Math.random() * 200).toFixed(2));
    const newTrade = {
      id: Date.now(),
      symbol: sym,
      type: 'BUY' as const,
      price,
      signal: 'MACD Histogram Expansion + High Confidence'
    };
    setPaperTrades(prev => [newTrade, ...prev.slice(0, 4)]);
    setSimulatedAccountBalance(prev => prev - price);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-[#08080b]/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0c0f17] rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Sticky Header */}
        <div className="shrink-0 px-6 py-4 bg-white/95 dark:bg-[#0c0f17]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span>Engineering Deep-Dive</span>
            <span aria-hidden="true">·</span>
            <span className="text-red-600 dark:text-red-400 font-semibold">{project.title}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Header block */}
          <div>
            <h2 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2 font-mono">
              {project.subtitle}
            </p>
            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {project.caseStudy.overview}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
            {project.caseStudy.metrics.map((metric, mIdx) => (
              <div key={mIdx}>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-0.5">
                  {metric.label}
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-neutral-900 dark:text-white tabular-nums">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Motivation vs Implementation Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
              <h4 className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-wider mb-2 font-mono">
                Project Motivation &amp; Challenge
              </h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {project.caseStudy.motivation}
              </p>
            </div>

            <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
              <h4 className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-wider mb-2 font-mono">
                Implementation &amp; Approach
              </h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {project.caseStudy.implementation}
              </p>
            </div>
          </div>

          {/* Key Learnings */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-3 font-mono">
              Key Technical Learnings &amp; Practical Experience
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.caseStudy.keyLearnings.map((learning, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800/80">
                  <CheckCircle2 className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {learning}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Project-Specific Simulator */}
          <div className="p-5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <LineChart className="w-4 h-4 text-red-600 dark:text-red-400" />
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-red-900 dark:text-red-300">
                  Interactive Logic Simulator: {project.title}
                </h4>
              </div>
              <span className="text-[11px] text-neutral-500 font-mono">Live Sandbox</span>
            </div>

            {/* Simulator 1: Trading Signal Tool */}
            {project.caseStudy.demoType === 'trading-signals' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Simulate the paper-trading execution pipeline. When indicators confirm bullish alignment, execute a virtual order to update portfolio allocation.
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div>
                    <span className="text-[11px] text-neutral-500 font-mono block">Virtual Paper Balance</span>
                    <span className="text-base font-bold font-mono text-red-600 dark:text-red-400 tabular-nums">
                      ${simulatedAccountBalance.toFixed(2)} USD
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecutePaperTrade}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded bg-red-400 hover:bg-red-300 text-neutral-950 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Execute Simulated Paper Trade</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-neutral-500">Recent Simulated Order Journal:</div>
                  {paperTrades.map(t => (
                    <div key={t.id} className="p-2.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono flex items-center justify-between">
                      <span className="font-bold text-red-600 dark:text-red-400">{t.type} {t.symbol} @ ${t.price}</span>
                      <span className="text-neutral-500 text-[11px]">{t.signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Simulator 2: Fraud Detection */}
            {project.caseStudy.demoType === 'fraud-detection' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Adjust the statistical anomaly threshold to observe how decision boundary tuning reduces false positives while preserving fraud detection recall:
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-700 dark:text-neutral-300">Anomaly Z-Score Decision Threshold:</span>
                    <span className="font-bold text-red-600 dark:text-red-400">{riskThreshold} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    value={riskThreshold}
                    onChange={e => setRiskThreshold(Number(e.target.value))}
                    className="w-full accent-red-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono">
                  <div>
                    <span className="text-neutral-500 block">False Positive Alert Rate</span>
                    <span className="text-base font-bold text-red-600 dark:text-red-400 tabular-nums">
                      {(24 - (riskThreshold - 50) * 0.36).toFixed(1)}% (-16% Net)
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Fraud Capture Recall</span>
                    <span className="text-base font-bold text-neutral-900 dark:text-white tabular-nums">
                      {(99.4 - (riskThreshold - 50) * 0.08).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Triage Queue Volume</span>
                    <span className="text-base font-bold text-red-600 dark:text-red-400 tabular-nums">
                      {Math.round(420 - (riskThreshold - 50) * 7)} tx/day
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Simulator 3: Customer Behavior */}
            {project.caseStudy.demoType === 'customer-behavior' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Filter by customer segmentation cohort derived from SQL multi-table joins and Recency-Frequency-Monetary (RFM) calculations:
                </p>

                <div className="flex flex-wrap gap-2">
                  {(['Champions', 'Loyal', 'At Risk', 'Lost'] as const).map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setActiveCohort(c)}
                      className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                        activeCohort === c
                          ? 'bg-red-400 text-neutral-950 font-bold'
                          : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      {c} Cohort
                    </button>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Segment Profile:</span>
                    <span className="font-bold text-red-600 dark:text-red-400">
                      {activeCohort === 'Champions' && 'High Frequency, High Monetary, Recency < 7 days'}
                      {activeCohort === 'Loyal' && 'Consistent Purchases, Average Basket > $150'}
                      {activeCohort === 'At Risk' && 'High Historical Value, Recency > 60 days'}
                      {activeCohort === 'Lost' && 'No Activity > 180 days, Target for Win-Back Email'}
                    </span>
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                    SQL CTE query groups 250k+ raw records into dynamic cohorts, ingested straight into Power BI for 40% faster reporting.
                  </div>
                </div>
              </div>
            )}

            {/* Simulator 4: Neural Recommendation */}
            {project.caseStudy.demoType === 'smart-recommendation' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Select a student curriculum pathway to observe neural embedding cosine similarity matching:
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'ml', label: 'Machine Learning & Neural Nets' },
                    { id: 'dsa', label: 'Data Structures & Algorithms' },
                    { id: 'fullstack', label: 'Full-Stack Web (FastAPI/Next.js)' },
                    { id: 'cloud', label: 'Cloud & Database Design' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTopic(t.id as any)}
                      className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                        selectedTopic === t.id
                          ? 'bg-red-400 text-neutral-950 font-bold'
                          : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono space-y-1.5">
                  <div className="text-neutral-500 text-[11px]">Neural Vector Distance Match (Top Recommendation):</div>
                  <div className="font-bold text-neutral-900 dark:text-white">
                    {selectedTopic === 'ml' && 'Deep Learning Foundations & Transformer Representations (Similarity: 0.94)'}
                    {selectedTopic === 'dsa' && 'Advanced Graph Algorithms & Memory-Efficient Heaps (Similarity: 0.92)'}
                    {selectedTopic === 'fullstack' && 'Asynchronous RESTful APIs with FastAPI & Next.js (Similarity: 0.95)'}
                    {selectedTopic === 'cloud' && 'Relational Database Normalization & Cloud Architectures (Similarity: 0.89)'}
                  </div>
                  <div className="text-red-600 dark:text-red-400 text-[11px]">
                    Evaluated against NDCG@10 (0.84 score) — Outperformed collaborative filtering by +28%.
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Tech Stack Matrix (Clean unboxed text) */}
          <div>
            <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 font-mono">
              Technologies &amp; Frameworks Deployed
            </h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-mono text-neutral-800 dark:text-neutral-200">
              {project.caseStudy.techStack.map((tech, tIdx, arr) => (
                <React.Fragment key={tech}>
                  <span>{tech}</span>
                  {tIdx < arr.length - 1 && <span className="text-neutral-400" aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/60 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.caseStudy.githubUrl && (
              <a
                href={project.caseStudy.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-200/80 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-md transition-colors"
          >
            Close Deep-Dive
          </button>
        </div>

      </div>
    </div>
  );
};
