export type SectionType = 'personalInfo' | 'summary' | 'experience' | 'education' | 'skills' | 'certificates';

export interface BaseSection {
  id: string;
  type: SectionType;
}

export interface PersonalInfoSection extends BaseSection {
  type: 'personalInfo';
  fullName: string;
  position: string;
  email: string;
  phoneNumber: string;
  location: string;
}

export interface SummarySection extends BaseSection {
  type: 'summary';
  text: string;
}

export interface ExperienceSection extends BaseSection {
  type: 'experience';
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrentlyWork: boolean;
}

export interface EducationSection extends BaseSection {
  type: 'education';
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  country: string;
  city: string;
  startYear: string;
  endYear: string;
}

export interface SkillsSection extends BaseSection {
  type: 'skills';
  skills: string[];
}

export interface CertificatesSection extends BaseSection {
  type: 'certificates';
  items: string[];
}

export type ResumeSection =
  | PersonalInfoSection
  | SummarySection
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | CertificatesSection;
