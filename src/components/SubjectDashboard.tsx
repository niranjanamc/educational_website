import React, { useState } from 'react';
import { ArrowLeft, Headphones, CheckCircle } from 'lucide-react';
import { KANNADA_DATA } from '../data/kannada_data';
import type { Chapter } from '../data/kannada_data';

interface SubjectDashboardProps {
  onBack: () => void;
  onSelectChapter: (chapter: Chapter) => void;
}

export const SubjectDashboard: React.FC<SubjectDashboardProps> = ({ onBack, onSelectChapter }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'prose' | 'poetry' | 'supplementary'>('all');

  const filteredChapters = KANNADA_DATA.filter(
    (chapter) => activeTab === 'all' || chapter.type === activeTab
  );



  const getTypeName = (type: 'prose' | 'poetry' | 'supplementary') => {
    switch (type) {
      case 'prose':
        return 'ಗದ್ಯ (Prose)';
      case 'poetry':
        return 'ಪದ್ಯ (Poetry)';
      case 'supplementary':
        return 'ಪೂರಕ (Supplementary)';
    }
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto py-8 px-4 flex flex-col space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="space-y-1 text-left">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-accent-cyan text-sm hover:underline cursor-pointer mb-2"
          >
            <ArrowLeft size={16} /> Back to Space Portal
          </button>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            ಪ್ರಥಮ ಭಾಷೆ ಕನ್ನಡ <span className="text-text-secondary text-lg font-normal">Class 9</span>
          </h1>
          <p className="text-text-secondary text-sm">
            Access 11 digitized chapters with premium audiobooks and solved Q&A.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 bg-var(--bg-secondary) p-1 rounded-xl border border-white/5 glass-panel">
          {(['all', 'prose', 'poetry', 'supplementary'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === tab
                  ? 'bg-[#66fcf1] text-[#0b0c10] shadow-[0_0_10px_rgba(102,252,241,0.3)]'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {tab === 'all' && 'All Chapters'}
              {tab === 'prose' && 'Prose (ಗದ್ಯ)'}
              {tab === 'poetry' && 'Poetry (ಪದ್ಯ)'}
              {tab === 'supplementary' && 'Supplementary (ಪೂರಕ)'}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((chapter, index) => (
          <div
            key={chapter.id}
            onClick={() => onSelectChapter(chapter)}
            className="glass-panel p-6 flex flex-col justify-between text-left group cursor-pointer border border-white/5 hover:border-cyan-500/30 hover:scale-[1.02] transform transition-all duration-300"
          >
            <div className="space-y-4">
              
              {/* Card top details */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/5 text-text-secondary">
                  {getTypeName(chapter.type)}
                </span>
                <span className="text-xs text-text-secondary font-mono">
                  #{index + 1}
                </span>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">
                  {chapter.kannadaTitle}
                </h3>
                <p className="text-xs text-text-secondary font-medium tracking-wide">
                  {chapter.title} — By {chapter.author}
                </p>
              </div>

              {/* Intro summary */}
              <p className="text-text-secondary text-xs line-clamp-3 leading-relaxed">
                {chapter.intro}
              </p>
            </div>

            {/* Bottom status bars */}
            <div className="border-t border-white/5 mt-6 pt-4 flex items-center justify-between text-xs text-text-secondary">
              <span className="flex items-center gap-1 text-cyan-400/90 font-medium">
                <Headphones size={13} className="animate-pulse" /> Audiobook
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle size={13} /> {chapter.exercises.length} Exercises Solved
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
