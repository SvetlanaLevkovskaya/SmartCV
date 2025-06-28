/*
import { useState, useEffect } from 'react';
import { ResumeSection } from '../types';

export const useResume = () => {
  const [sections, setSections] = useState<ResumeSection[]>(() => {
    const saved = localStorage.getItem('resume');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('resume', JSON.stringify(sections));
  }, [sections]);

  const addSection = (newSection: ResumeSection) => {
    setSections([...sections, newSection]);
  };

  const updateSection = (updated: ResumeSection) => {
    setSections(prev => prev.map(s => (s.id === updated.id ? updated : s)));
  };

  const deleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const reorderSections = (newOrder: ResumeSection[]) => {
    setSections(newOrder);
  };

  return { sections, addSection, updateSection, deleteSection, reorderSections };
};
*/
