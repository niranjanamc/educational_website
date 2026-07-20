import { useState } from 'react';
import { Landing3D } from './components/Landing3D';
import { SubjectDashboard } from './components/SubjectDashboard';
import { ChapterPlayer } from './components/ChapterPlayer';
import type { Chapter } from './data/kannada_data';
import { GraduationCap, Globe } from 'lucide-react';

type ViewState = 'landing' | 'dashboard' | 'chapter';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const handleSelectSubject = (subjectId: string) => {
    if (subjectId === 'kannada') {
      // Trigger smooth view transition if supported
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setView('dashboard');
        });
      } else {
        setView('dashboard');
      }
    }
  };

  const handleSelectChapter = (chapter: Chapter) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setSelectedChapter(chapter);
        setView('chapter');
      });
    } else {
      setSelectedChapter(chapter);
      setView('chapter');
    }
  };

  const handleBackToDashboard = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setSelectedChapter(null);
        setView('dashboard');
      });
    } else {
      setSelectedChapter(null);
      setView('dashboard');
    }
  };

  const handleBackToLanding = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setView('landing');
      });
    } else {
      setView('landing');
    }
  };

  return (
    <div className="min-h-vh flex flex-col justify-between">
      
      {/* Navigation bar */}
      <nav className="border-b border-white/5 bg-black/25 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            onClick={handleBackToLanding}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold">
              K
            </div>
            <span className="font-bold text-white tracking-wider group-hover:text-accent-cyan transition-colors">
              Nirvik Class 9
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-text-secondary">NCERT Curriculum Portal</span>
            <a 
              href="https://github.com/niranjanamc/educational_website" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-text-secondary hover:text-accent-cyan transition-colors"
            >
              <Globe size={14} /> Github
            </a>
          </div>
        </div>
      </nav>

      {/* Main View Area with transition wrap */}
      <main className="flex-1 flex flex-col view-transition-container">
        {view === 'landing' && (
          <Landing3D onSelectSubject={handleSelectSubject} />
        )}
        {view === 'dashboard' && (
          <SubjectDashboard
            onBack={handleBackToLanding}
            onSelectChapter={handleSelectChapter}
          />
        )}
        {view === 'chapter' && selectedChapter && (
          <ChapterPlayer
            chapter={selectedChapter}
            onBack={handleBackToDashboard}
          />
        )}
      </main>

      {/* Footer bar */}
      <footer className="border-t border-white/5 py-8 mt-12 bg-black/10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <div className="flex items-center gap-1.5">
            <GraduationCap size={16} className="text-[#66fcf1]" />
            <span>Nirvik EdTech Ecosystem © 2026. Made with ❤️ in India.</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Syllabus Guide</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
