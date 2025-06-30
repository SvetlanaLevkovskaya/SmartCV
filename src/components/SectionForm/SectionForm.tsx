import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';

import { ResumeSection, SectionType } from '../../types';

import { SectionFields } from './SectionFields/SectionFields.tsx';
import { AI_TIPS } from './const/aiTips.ts';

interface Props {
  section: ResumeSection;
  onUpdate: (section: ResumeSection) => void;
  onDelete: () => void;
}

const sectionLabels: Record<SectionType, string> = {
  personalInfo: 'Personal Info',
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  certificates: 'Certificates',
};

export const SectionForm = ({ section, onUpdate, onDelete }: Props) => {
  const { register, handleSubmit, reset, watch, setValue, control } = useForm<ResumeSection>({
    defaultValues: section,
  });

  const watchedSection = watch();

  const handleAITips = () => {
    const updates = AI_TIPS[section.type] as Omit<typeof section, 'id' | 'type'>;
    reset({ ...watchedSection, ...updates });
    onUpdate({ ...watchedSection, ...updates });
  };

  useEffect(() => {
    reset(section);
  }, [reset, section, section.id]);

  const onSubmit = (data: ResumeSection) => {
    onUpdate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border rounded p-4 pl-8 mb-4 bg-white">
      <div className="flex items-center justify-between gap-3 mb-2">
        <h3 className="font-semibold">{sectionLabels[section.type]}</h3>
        <button
          type="button"
          onClick={handleAITips}
          className="text-blue-600 hover:underline"
          aria-label="Fill with AI tips"
        >
          AI tips
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <SectionFields
          section={section}
          register={register}
          watchedSection={watchedSection}
          setValue={setValue}
          onBlur={() => onUpdate(watchedSection)}
          onUpdate={onUpdate}
          control={control}
        />
      </div>

      <button
        type="button"
        onClick={onDelete}
        className="w-full flex justify-end text-gray-500 select-none transition-transform duration-200 ease-in-out hover:scale-110"
        aria-label="Delete section"
        style={{ transformOrigin: 'center right' }}
      >
        <FiX className="text-xl" />
      </button>
    </form>
  );
};
