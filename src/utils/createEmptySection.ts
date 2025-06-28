import { v4 as uuidv4 } from 'uuid';

import { ResumeSection, SectionType } from '../types';

export const createEmptySection = (type: SectionType): ResumeSection => {
  const id = uuidv4();
  switch (type) {
    case 'personalInfo':
      return { id, type, fullName: '', position: '', email: '', phoneNumber: '', location: '' };
    case 'summary':
      return { id, type, text: '' };
    case 'experience':
      return {
        id,
        type,
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        isCurrentlyWork: false,
      };
    case 'education':
      return {
        id,
        type,
        schoolName: '',
        degree: '',
        fieldOfStudy: '',
        country: '',
        city: '',
        startYear: '',
        endYear: '',
      };
    case 'skills':
      return { id, type, skills: [] };
    case 'certificates':
      return { id, type, items: [] };
  }
};
