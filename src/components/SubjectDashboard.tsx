import React, { useState, useRef } from 'react';
import { ArrowLeft, Headphones, CheckCircle, ChevronRight } from 'lucide-react';
import { KANNADA_DATA } from '../data/kannada_data';
import type { Chapter } from '../data/kannada_data';

interface SubjectDashboardProps {
  onBack: () => void;
  onSelectChapter: (chapter: Chapter) => void;
}

// PREMIUM 3D TILT CARD COMPONENT WITH CURSOR SPOTLIGHT GLOW
interface TiltCardProps {
  chapter: Chapter;
  index: number;
  onClick: () => void;
  getTypeName: (type: 'prose' | 'poetry' | 'supplementary') => string;
}

const TiltCard: React.FC<TiltCardProps> = ({ chapter, index, onClick, getTypeName }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({
    opacity: 0
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 3D Tilt calculation
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 14; // max tilt 14 deg
    const angleY = (x - xc) / 14;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.05s ease'
    });

    // Spotlight cursor tracking
    setSpotlightStyle({
      opacity: 1,
      background: `radial-gradient(150px circle at ${x}px ${y}px, rgba(102, 252, 241, 0.08), transparent 80%)`,
      transition: 'opacity 0.2s ease'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
    setSpotlightStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease'
    });
  };

  // Color mapping based on chapter type
  const getTypeColor = (type: 'prose' | 'poetry' | 'supplementary') => {
    switch (type) {
      case 'prose': return 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5';
      case 'poetry': return 'text-purple-400 border-purple-500/20 bg-purple-500/5';
      case 'supplementary': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={tiltStyle}
      className="glass-panel p-6 flex flex-col justify-between text-left group cursor-pointer border border-white/5 relative overflow-hidden h-[240px]"
    >
      {/* Background Spotlight hover effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={spotlightStyle}
      />

      <div className="space-y-4 z-10">
        {/* Card Header details */}
        <div className="flex items-center justify-between">
          <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getTypeColor(chapter.type)}`}>
            {getTypeName(chapter.type)}
          </span>
          <span className="text-[10px] text-text-secondary font-mono tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
            CH {index + 1}
          </span>
        </div>

        {/* Title details */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors flex items-center gap-1">
            {chapter.kannadaTitle}
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-[11px] text-text-secondary font-medium tracking-wide">
            {chapter.title} — {chapter.author}
          </p>
        </div>

        {/* Short intro description */}
        <p className="text-text-secondary text-xs line-clamp-3 leading-relaxed">
          {chapter.intro}
        </p>
      </div>

      {/* Footer details */}
      <div className="border-t border-white/5 mt-4 pt-4 flex items-center justify-between text-[10px] text-text-secondary z-10">
        <span className="flex items-center gap-1 text-cyan-400 font-semibold uppercase tracking-wider">
          <Headphones size={12} className="animate-pulse" /> Audiobook Ready
        </span>
        <span className="flex items-center gap-1 text-emerald-400 font-semibold uppercase tracking-wider">
          <CheckCircle size={12} /> {chapter.exercises.length} Q&A Solved
        </span>
      </div>
    </div>
  );
};

export const SubjectDashboard: React.FC<SubjectDashboardProps> = ({ onBack, onSelectChapter }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'prose' | 'poetry' | 'supplementary'>('all');

  const filteredChapters = KANNADA_DATA.filter(
    (chapter) => activeTab === 'all' || chapter.type === activeTab
  );

  const getTypeName = (type: 'prose' | 'poetry' | 'supplementary') => {
    switch (type) {
      case 'prose': return 'ಗದ್ಯ (Prose)';
      case 'poetry': return 'ಪದ್ಯ (Poetry)';
      case 'supplementary': return 'ಪೂರಕ (Supplementary)';
    }
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto py-8 px-4 flex flex-col space-y-8 bg-[#07080f]">
      
      {/* Subject Dashboard Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-1 text-left">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-accent-cyan text-xs hover:underline cursor-pointer mb-2 font-semibold tracking-wider uppercase"
          >
            <ArrowLeft size={14} /> Back to Cosmic Portal
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-[#0b0c10] font-black text-xl shadow-[0_0_15px_rgba(102,252,241,0.3)]">
              KA
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                ಪ್ರಥಮ ಭಾಷೆ ಕನ್ನಡ <span className="text-text-secondary text-lg font-normal">Class 9</span>
              </h1>
              <p className="text-text-secondary text-xs md:text-sm mt-0.5">
                Volumetric digital library of 11 chapters, audiobooks, and interactive exercises.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex bg-[#111320] p-1.5 rounded-xl border border-white/5 glass-panel">
          {(['all', 'prose', 'poetry', 'supplementary'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_15px_rgba(102,252,241,0.25)]'
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

      {/* Subject Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 text-center space-y-1">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Chapters</span>
          <p className="text-2xl font-black text-white">11</p>
        </div>
        <div className="glass-panel p-4 text-center space-y-1">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Audiobooks</span>
          <p className="text-2xl font-black text-cyan-400">11</p>
        </div>
        <div className="glass-panel p-4 text-center space-y-1">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Solved Q&A</span>
          <p className="text-2xl font-black text-emerald-400">30+</p>
        </div>
        <div className="glass-panel p-4 text-center space-y-1">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Completed</span>
          <p className="text-2xl font-black text-purple-400">100%</p>
        </div>
      </div>

      {/* Chapters Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {filteredChapters.map((chapter, index) => (
          <TiltCard
            key={chapter.id}
            chapter={chapter}
            index={index}
            onClick={() => onSelectChapter(chapter)}
            getTypeName={getTypeName}
          />
        ))}
      </div>
    </div>
  );
};
