import { useState, useEffect } from 'react';

export interface SectionProgress {
  [sectionId: string]: {
    completed: boolean;
    timestamp: number;
  };
}

const PROGRESS_STORAGE_KEY = 'helpdesk_guide_progress';

export function useProgress() {
  const [progress, setProgress] = useState<SectionProgress>(() => {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  // Salvar progresso no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markSectionComplete = (sectionId: string) => {
    setProgress(prev => ({
      ...prev,
      [sectionId]: {
        completed: true,
        timestamp: Date.now(),
      },
    }));
  };

  const markSectionIncomplete = (sectionId: string) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[sectionId];
      return newProgress;
    });
  };

  const getProgress = () => {
    const sections = [
      'introducao',
      'gestao-atendimento',
      'hardware',
      'servidores-redes',
      'sistemas-senior',
      'backup-projetos',
      'conclusao',
    ];
    const completed = sections.filter(s => progress[s]?.completed).length;
    const total = sections.length;
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  };

  const resetProgress = () => {
    setProgress({});
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
  };

  return {
    progress,
    markSectionComplete,
    markSectionIncomplete,
    getProgress,
    resetProgress,
  };
}
