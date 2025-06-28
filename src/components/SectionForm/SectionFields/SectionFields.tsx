import { useEffect, useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { CertificatesSection, ResumeSection, SkillsSection } from '../../../types';
import { AutoTextarea } from '../AutoTextArea/AutoTextarea.tsx';

interface SectionFieldsProps {
  section: ResumeSection;
  register: UseFormRegister<ResumeSection>;
  watchedSection: ResumeSection;
  setValue: UseFormSetValue<ResumeSection>;
  onBlur: () => void;
  onUpdate: any;
}

export const SectionFields = ({
  section,
  watchedSection,
  register,
  setValue,
  onBlur,
  onUpdate,
}: SectionFieldsProps) => {
  const [rawSkills, setRawSkills] = useState('');
  const [rawItems, setRawItems] = useState('');

  useEffect(() => {
    setRawSkills((watchedSection as SkillsSection).skills?.join(', ') || '');
  }, [watchedSection]);

  useEffect(() => {
    setRawItems((watchedSection as CertificatesSection).items?.join(', ') || '');
  }, [watchedSection]);

  switch (section.type) {
    case 'personalInfo':
      return (
        <>
          <input placeholder="Full Name" {...register('fullName')} onBlur={onBlur} className="input" />
          <input placeholder="Job Title" {...register('position')} onBlur={onBlur} className="input" />
          <input placeholder="Email" {...register('email')} onBlur={onBlur} className="input" />
          <input placeholder="Phone Number" {...register('phoneNumber')} onBlur={onBlur} className="input" />
          <input placeholder="Location" {...register('location')} onBlur={onBlur} className="input" />
        </>
      );
    case 'summary':
      return <AutoTextarea placeholder="Summary" {...register('text')} onBlur={onBlur} className="textarea" />;
    case 'experience':
      return (
        <>
          <input placeholder="Position" {...register('position')} onBlur={onBlur} className="input" />
          <input placeholder="Company" {...register('company')} onBlur={onBlur} className="input" />
          <input type="date" {...register('startDate')} onBlur={onBlur} className="input" />
          <input type="date" {...register('endDate')} onBlur={onBlur} className="input" />
          <div className="flex gap-2">
            <input type="checkbox" {...register('isCurrentlyWork')} onBlur={onBlur} className="checkbox" />
            <label>I currently work here</label>
          </div>
          <AutoTextarea placeholder="Description" {...register('description')} onBlur={onBlur} className="textarea" />
        </>
      );
    case 'education':
      return (
        <>
          <input placeholder="School Name" {...register('schoolName')} onBlur={onBlur} className="input" />
          <input placeholder="Degree" {...register('degree')} onBlur={onBlur} className="input" />
          <input placeholder="Field of Study" {...register('fieldOfStudy')} onBlur={onBlur} className="input" />
          <input placeholder="Country" {...register('country')} onBlur={onBlur} className="input" />
          <input placeholder="City" {...register('city')} onBlur={onBlur} className="input" />
          <input type="date" {...register('startYear')} onBlur={onBlur} className="input" />
          <input type="date" {...register('endYear')} onBlur={onBlur} className="input" />
        </>
      );
    case 'skills':
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
    case 'certificates':
      return (
        <AutoTextarea
          placeholder="Enter certificates separated by commas"
          value={rawItems}
          onChange={(e) => setRawItems(e.target.value)}
          onBlur={(e) => {
            const itemsArray = e.target.value
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean);

            setValue('items', itemsArray, { shouldDirty: true });

            onUpdate({
              ...section,
              items: itemsArray,
            } as CertificatesSection);
          }}
        />
      );
    default:
      return null;
  }
};
