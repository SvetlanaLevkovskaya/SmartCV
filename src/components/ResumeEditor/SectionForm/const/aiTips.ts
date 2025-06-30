import { ResumeSection } from '@/types';

export const AI_TIPS: Record<ResumeSection['type'], Partial<ResumeSection>> = {
  personalInfo: {
    fullName: 'John Doe',
    position: 'Frontend Developer',
    email: 'john.doe@example.com',
    phoneNumber: '+1 234 567 8900',
    location: 'New York, USA',
  },
  summary: {
    text: 'Experienced frontend developer with a passion for creating sleek and performant web applications.',
  },
  experience: {
    position: 'Software Engineer',
    company: 'TechCorp',
    startDate: '2020-01-01',
    endDate: '2023-05-31',
    description:
      'Worked on building scalable React applications, improving UI/UX, and collaborating with cross-functional teams.',
    isCurrentlyWork: false,
  },
  education: {
    schoolName: 'University of Technology',
    degree: 'Bachelor of Science',
    fieldOfStudy: 'Computer Science',
    country: 'USA',
    city: 'Boston',
    startYear: '2016-09-01',
    endYear: '2020-06-30',
  },
  skills: {
    skills: [
      'React JS',
      'Typescript',
      'React Router Dom',
      'Vite',
      'Redux Toolkit Query',
      'React HookForm',
      'yup',
      'Ant Design',
      'Styled Components',
      'ESLint',
      'Prettier',
    ],
  },
  certificates: {
    items: [
      'Certified React Developer',
      'JavaScript Algorithms and Data Structure',
      'Responsive Web Design',
      'Typescript for Professionals',
    ],
  },
};
