import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { ResumeSection } from '@/types';

interface ResumeContextType {
  sections: ResumeSection[];
  addSection: (section: ResumeSection) => void;
  updateSection: (section: ResumeSection) => void;
  deleteSection: (id: string) => void;
  reorderSections: (newOrder: ResumeSection[]) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<ResumeSection[]>(() => {
    const saved = localStorage.getItem('resume');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('resume', JSON.stringify(sections));
  }, [sections]);

  const addSection = (section: ResumeSection) => {
    setSections((prev) => [...prev, section]);
  };

  const updateSection = (section: ResumeSection) => {
    setSections((prev) => prev.map((s) => (s.id === section.id ? section : s)));
  };

  const deleteSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const reorderSections = (newOrder: ResumeSection[]) => {
    setSections(newOrder);
  };

  return (
    <ResumeContext.Provider value={{ sections, addSection, updateSection, deleteSection, reorderSections }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('ResumeProvider is missing in the component tree');
  }
  return context;
};
