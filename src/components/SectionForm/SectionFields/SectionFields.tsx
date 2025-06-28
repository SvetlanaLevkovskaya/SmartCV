import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { CertificatesSection, ResumeSection, SkillsSection } from '../../../types';
import { AutoTextarea } from '../AutoTextArea/AutoTextarea.tsx';

interface SectionFieldsProps {
  section: ResumeSection;
  register: UseFormRegister<ResumeSection>;
  watchedSection: ResumeSection;
  setValue: UseFormSetValue<ResumeSection>;
}

export const SectionFields = ({ section, register, watchedSection, setValue }: SectionFieldsProps) => {
  switch (section.type) {
    case 'personalInfo':
      return (
        <>
          <input placeholder="Full Name" {...register('fullName')} className="input" />
          <input placeholder="Job Title" {...register('position')} className="input" />
          <input placeholder="Email" {...register('email')} className="input" />
          <input placeholder="Phone Number" {...register('phoneNumber')} className="input" />
          <input placeholder="Location" {...register('location')} className="input" />
        </>
      );
    case 'summary':
      return <AutoTextarea placeholder="Summary" {...register('text')} className="textarea" />;
    case 'experience':
      return (
        <>
          <input placeholder="Position" {...register('position')} className="input" />
          <input placeholder="Company" {...register('company')} className="input" />
          <input type="date" {...register('startDate')} className="input" />
          <input type="date" {...register('endDate')} className="input" />
          <div className="flex gap-2">
            <input type="checkbox" {...register('isCurrentlyWork')} className="checkbox" />
            <label>I currently work here</label>
          </div>
          <AutoTextarea placeholder="Description" {...register('description')} className="textarea" />
        </>
      );
    case 'education':
      return (
        <>
          <input placeholder="School Name" {...register('schoolName')} className="input" />
          <input placeholder="Degree" {...register('degree')} className="input" />
          <input placeholder="Field of Study" {...register('fieldOfStudy')} className="input" />
          <input placeholder="Country" {...register('country')} className="input" />
          <input placeholder="City" {...register('city')} className="input" />
          <input type="date" {...register('startYear')} className="input" />
          <input type="date" {...register('endYear')} className="input" />
        </>
      );
    case 'skills':
      return (
        <AutoTextarea
          placeholder="Enter skills separated by commas"
          value={ (watchedSection as SkillsSection).skills?.join(', ') || '' }
          onChange={ e => setValue('skills', e.target.value.split(',').map(t => t.trim())) }
         />
      );
    case 'certificates':
      return (
        <AutoTextarea
          placeholder="Enter certificates separated by commas"
          value={ (watchedSection as CertificatesSection).text?.join(', ') || '' }
          onChange={ e => setValue('text', e.target.value.split(',').map(t => t.trim())) }
          className="textarea"
        />
      );
    default:
      return null;
  }
};
