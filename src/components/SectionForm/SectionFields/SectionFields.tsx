import { Props } from './SectionFields.types.ts';
import {
  CertificatesFields,
  EducationFields,
  ExperienceFields,
  PersonalInfoFields,
  SkillsFields,
  SummaryFields,
} from './sections';

export const SectionFields = (props: Props) => {
  switch (props.section.type) {
    case 'personalInfo':
      return <PersonalInfoFields {...props} />;
    case 'summary':
      return <SummaryFields {...props} />;
    case 'experience':
      return <ExperienceFields {...props} />;
    case 'education':
      return <EducationFields {...props} />;
    case 'skills':
      return <SkillsFields {...props} />;
    case 'certificates':
      return <CertificatesFields {...props} />;
    default:
      return null;
  }
};
