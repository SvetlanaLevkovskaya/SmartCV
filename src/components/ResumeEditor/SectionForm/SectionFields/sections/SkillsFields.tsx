import { useEffect, useState } from 'react';

import { AutoTextArea } from '@/components/ResumeEditor/SectionForm/_ui';

import { isSkillsSection } from '@/types/resume.ts';

import { Props } from '../SectionFields.types.ts';

export const SkillsFields = ({ setValue, onUpdate, section, watchedSection }: Props) => {
  const [rawSkills, setRawSkills] = useState('');

  useEffect(() => {
    if (isSkillsSection(watchedSection)) {
      setRawSkills(watchedSection.skills?.join(', ') || '');
    }
  }, [watchedSection]);

  return (
    <AutoTextArea
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

        if (isSkillsSection(section)) {
          onUpdate({
            ...section,
            skills: skillsArray,
          });
        }
      }}
    />
  );
};
