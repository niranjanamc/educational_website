import React, { useState } from 'react';
import { ArrowLeft, Headphones, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
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
    <div className="flex-1 w-full max-w-5xl mx-auto py-8 px-4 flex flex-col space-y-6">
      
      {/* Title breadcrumb */}
      <div className="text-left border-b border-white/5 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-accent-cyan text-sm hover:underline cursor-pointer mb-2"
        >
          <ArrowLeft size={16} /> Back to Chapters
        </button>
        <span className="text-xs font-bold text-accent-cyan tracking-wider uppercase">
          {chapter.type === 'prose' ? 'ಗದ್ಯ (Prose)' : chapter.type === 'poetry' ? 'ಪದ್ಯ (Poetry)' : 'ಪೂರಕ (Supplementary)'}
        </span>
        <h1 className="text-3xl font-bold text-white tracking-tight mt-1">
          {chapter.kannadaTitle} <span className="text-text-secondary text-lg font-normal">— {chapter.title}</span>
        </h1>
        <p className="text-text-secondary text-xs mt-1">
          By {chapter.author} | Class 9 NCERT First Language Kannada
        </p>
      </div>

      {/* Main split display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Audiobook Player (takes 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-5 bg-cyan-500/5 border-cyan-500/10 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-accent-cyan">
              <Headphones size={22} />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-semibold text-white">Full Textbook Audiobook</h4>
              <p className="text-text-secondary text-xs">Listen to the correct pronunciation of the core text.</p>
            </div>
          </div>

          <WaveformPlayer
            audioUrl={chapter.audioPath}
            title={chapter.kannadaTitle}
            subtitle={`ಅಧ್ಯಾಯದ ಧ್ವನಿಪುಸ್ತಕ — By ${chapter.author}`}
          />

          {/* Chapter introduction */}
          <div className="glass-panel p-6 text-left space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              ಅಧ್ಯಾಯದ ಪರಿಚಯ (Introduction)
            </h4>
            <p className="text-text-secondary text-xs leading-relaxed">
              {chapter.intro}
            </p>
          </div>
        </div>

        {/* Right Column: Exercises & Q&A (takes 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Exercises Header with its Audio Track */}
          <div className="glass-panel p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-emerald-400">
            <div className="flex items-center gap-3 text-left">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                <MessageSquare size={22} />
              </div>
              <div>
                <h3 className="font-bold text-white">ಅಭ್ಯಾಸ ಪ್ರಶ್ನೋತ್ತರಗಳು</h3>
                <p className="text-text-secondary text-xs">Solved Q&A exercises in both text and speech.</p>
              </div>
            </div>
          </div>

          {/* Exercises Audio Player Card */}
          <div className="glass-panel p-5 border border-white/5 text-left space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="text-xs font-semibold text-white">Listen to Solved Questions & Answers</h4>
            </div>
            <WaveformPlayer
              audioUrl={chapter.exercisesAudioPath}
              title={`${chapter.kannadaTitle} — ಅಭ್ಯಾಸ ಧ್ವನಿ`}
              subtitle="ಪ್ರಶ್ನೆ ಮತ್ತು ಉತ್ತರಗಳ ವಿವರಣೆ"
            />
          </div>

          {/* Accordion Questions List */}
          <div className="space-y-3">
            {chapter.exercises.map((qa, index) => {
              const isOpen = openExerciseIndex === index;
              return (
                <div
                  key={index}
                  className={`glass-panel border overflow-hidden transition-all duration-200 ${
                    isOpen ? 'border-emerald-500/30' : 'border-white/5'
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleExercise(index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm font-semibold text-white flex gap-2">
                      <span className="text-emerald-400">Q{index + 1}.</span> {qa.question}
                    </span>
                    <span className="text-text-secondary">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 border-t border-white/5 bg-white/5 text-left animate-fade-in">
                      <span className="text-xs font-bold text-emerald-400 block mb-1">ಉತ್ತರ (Answer):</span>
                      <p className="text-text-secondary text-sm leading-relaxed">
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
