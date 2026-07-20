import React, { useState } from 'react';
import { ArrowLeft, Headphones, MessageSquare, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';
import type { Chapter } from '../data/kannada_data';
import { WaveformPlayer } from './WaveformPlayer';

interface ChapterPlayerProps {
  chapter: Chapter;
  onBack: () => void;
}

export const ChapterPlayer: React.FC<ChapterPlayerProps> = ({ chapter, onBack }) => {
  const [openExerciseIndex, setOpenExerciseIndex] = useState<number | null>(0);

  const toggleExercise = (index: number) => {
    setOpenExerciseIndex(openExerciseIndex === index ? null : index);
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto py-8 px-4 flex flex-col space-y-8 bg-[#07080f]">
      
      {/* breadcrumb header */}
      <div className="text-left border-b border-white/5 pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-accent-cyan text-xs hover:underline cursor-pointer mb-2 font-semibold uppercase tracking-wider"
          >
            <ArrowLeft size={14} /> Back to Chapters
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              {chapter.type === 'prose' ? 'গದ್ಯ (Prose)' : chapter.type === 'poetry' ? 'ಪದ್ಯ (Poetry)' : 'ಪೂರಕ (Supplementary)'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
            {chapter.kannadaTitle} <span className="text-text-secondary text-xl font-normal">— {chapter.title}</span>
          </h1>
          <p className="text-text-secondary text-xs mt-0.5">
            By {chapter.author} | Class 9 NCERT First Language Kannada
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3 bg-[#111320] border border-white/5 px-4 py-2.5 rounded-xl glass-panel text-xs text-text-secondary">
          <span className="flex items-center gap-1 text-cyan-400 font-semibold uppercase tracking-wider">
            <Headphones size={13} className="animate-pulse" /> Audiobook Online
          </span>
          <span className="w-1 h-4 bg-white/5" />
          <span className="flex items-center gap-1 text-emerald-400 font-semibold uppercase tracking-wider">
            <CheckCircle size={13} /> {chapter.exercises.length} Solved Q&A
          </span>
        </div>
      </div>

      {/* Main split display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Audiobook Waveform Player (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-5 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border-cyan-500/10 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-accent-cyan shadow-[0_0_10px_rgba(102,252,241,0.15)]">
              <Headphones size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Chapter Audiobook</h4>
              <p className="text-text-secondary text-xs">High-fidelity voice synthesis of the textbook.</p>
            </div>
          </div>

          <WaveformPlayer
            audioUrl={chapter.audioPath}
            title={chapter.kannadaTitle}
            subtitle={`ಅಧ್ಯಾಯದ ಧ್ವನಿಪುಸ್ತಕ — By ${chapter.author}`}
          />

          {/* Chapter description intro */}
          <div className="glass-panel p-6 text-left space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest border-b border-white/5 pb-2">
              ಅಧ್ಯಾಯದ ಪರಿಚಯ (Chapter Introduction)
            </h4>
            <p className="text-text-secondary text-xs leading-relaxed font-normal">
              {chapter.intro}
            </p>
          </div>
        </div>

        {/* Right Column: Solved Q&A (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Exercises intro card */}
          <div className="glass-panel p-5 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border-emerald-500/10 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.15)]">
              <MessageSquare size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Solved Exercises</h4>
              <p className="text-text-secondary text-xs">Text and speech sync for textbook questions.</p>
            </div>
          </div>

          {/* Exercises dictation audio player */}
          <div className="space-y-3">
            <WaveformPlayer
              audioUrl={chapter.exercisesAudioPath}
              title={`${chapter.kannadaTitle} — ಅಭ್ಯಾಸ ಧ್ವನಿ`}
              subtitle="ಪ್ರಶ್ನೆ ಮತ್ತು ಉತ್ತರಗಳ ಧ್ವನಿಮುದ್ರಿಕೆ"
            />
          </div>

          {/* Accordion List Q&A */}
          <div className="space-y-4">
            {chapter.exercises.map((qa, index) => {
              const isOpen = openExerciseIndex === index;
              return (
                <div
                  key={index}
                  className={`glass-panel border overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-emerald-500/30 shadow-[0_4px_12px_rgba(52,211,153,0.06)]' : 'border-white/5'
                  }`}
                >
                  {/* Accordion header button */}
                  <button
                    onClick={() => toggleExercise(index)}
                    className={`w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer transition-colors ${
                      isOpen ? 'bg-emerald-500/5' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="text-sm font-semibold text-white flex gap-2.5 items-start">
                      <HelpCircle size={16} className={`text-emerald-400 mt-0.5 flex-shrink-0 ${isOpen ? 'animate-pulse' : ''}`} />
                      <span>{qa.question}</span>
                    </span>
                    <span className="text-text-secondary ml-4">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  {/* Accordion body panel */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-3 border-t border-white/5 bg-[#141829]/40 text-left animate-fade-in space-y-2">
                      <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase block">
                        ಉತ್ತರ (Solved Answer):
                      </span>
                      <p className="text-text-secondary text-sm leading-relaxed font-normal">
                        {qa.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
