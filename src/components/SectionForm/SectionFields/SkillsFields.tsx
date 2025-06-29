import { useEffect, useState } from 'react';

import { SkillsSection } from '../../../types';
import { AutoTextarea } from '../AutoTextArea/AutoTextarea.tsx';

import { Props } from './SectionFields.types.ts';

export const SkillsFields = ({ setValue, onUpdate, section, watchedSection }: Props) => {
  const [rawSkills, setRawSkills] = useState('');

  useEffect(() => {
    setRawSkills((watchedSection as SkillsSection).skills?.join(', ') || '');
  }, [watchedSection]);

  return (
    <AutoTextarea
      placeholder="Enter skills separated by commas"
      value={rawSkills}
      onChange={(e) => setRawSkills(e.target.value)}
      onBlur={(e) => {
        const inputValue = e.target.value;
        const skillsArray = inputValue
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
        setValue('skills', skillsArray, { shouldDirty: true });
        onUpdate({
          ...section,
          skills: skillsArray,
        } as SkillsSection);
      }}
    />
  );
};
