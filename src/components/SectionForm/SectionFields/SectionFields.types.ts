import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { ResumeSection } from '../../../types';

export interface Props {
  section: ResumeSection;
  register: UseFormRegister<ResumeSection>;
  watchedSection: ResumeSection;
  setValue: UseFormSetValue<ResumeSection>;
  onBlur: () => void;
  onUpdate: (section: ResumeSection) => void;
  control: Control<ResumeSection>;
}
