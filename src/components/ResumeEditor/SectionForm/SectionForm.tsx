import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';

import { AI_TIPS } from '@/components/ResumeEditor/SectionForm/const/aiTips.ts';

import { SectionFields } from './SectionFields/SectionFields.tsx';
import { ResumeSection, SectionType } from '@/types';

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

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onDelete}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:scale-110 transition-transform"
          aria-label="Delete section"
        >
          <FiX className="text-xl" />
        </button>
      </div>
    </form>
  );
};
