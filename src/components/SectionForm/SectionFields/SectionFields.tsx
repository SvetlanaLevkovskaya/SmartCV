import { CertificatesFields } from './CertificatesFields';
import { EducationFields } from './EducationFields';
import { ExperienceFields } from './ExperienceFields';
import { PersonalInfoFields } from './PersonalInfoFields';
import { Props } from './SectionFields.types';
import { SkillsFields } from './SkillsFields';
import { SummaryFields } from './SummaryFields.tsx';

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
