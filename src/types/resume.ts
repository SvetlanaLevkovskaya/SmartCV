import type {
  CertificatesSection,
  EducationSection,
  ExperienceSection,
  PersonalInfoSection,
  ResumeSection,
  SkillsSection,
  SummarySection,
} from './index';

export const isPersonalInfoSection = (section: ResumeSection): section is PersonalInfoSection =>
  section.type === 'personalInfo';

export const isSummarySection = (section: ResumeSection): section is SummarySection => section.type === 'summary';

export const isExperienceSection = (section: ResumeSection): section is ExperienceSection =>
  section.type === 'experience';

export const isEducationSection = (section: ResumeSection): section is EducationSection => section.type === 'education';

export const isSkillsSection = (section: ResumeSection): section is SkillsSection => section.type === 'skills';

export const isCertificatesSection = (section: ResumeSection): section is CertificatesSection =>
  section.type === 'certificates';

export function isSection<T extends ResumeSection['type']>(
  section: ResumeSection,
  type: T
): section is Extract<ResumeSection, { type: T }> {
  return section.type === type;
}
