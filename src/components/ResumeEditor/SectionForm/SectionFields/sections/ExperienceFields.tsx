import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useWatch } from 'react-hook-form';

import { AutoTextArea } from '@/components/ResumeEditor/SectionForm/_ui';

import { useDarkMode } from '@/hooks/useDarkMode.tsx';

import { isExperienceSection } from '@/types/resume.ts';

import { Props } from '../SectionFields.types.ts';

export const ExperienceFields = ({ register, setValue, control, onBlur, section, onUpdate }: Props) => {
  const isDarkMode = useDarkMode();

  const watchedStartDate = useWatch({ control, name: 'startDate' });
  const watchedEndDate = useWatch({ control, name: 'endDate' });
  const description = useWatch({ control, name: 'description' });

  return (
    <>
      <input placeholder="Position" {...register('position')} onBlur={onBlur} className="input" />
      <input placeholder="Company" {...register('company')} onBlur={onBlur} className="input" />

      <DatePicker
        showMonthYearDropdown
        minDate={new Date('2010-01-01')}
        maxDate={new Date('2025-12-31')}
        placeholderText="Start Date"
        selected={watchedStartDate ? new Date(watchedStartDate) : null}
        onChange={(date) => {
          const iso = date?.toISOString().split('T')[0] ?? '';
          setValue('startDate', iso, { shouldDirty: true });
          if (isExperienceSection(section)) {
            onUpdate({
              ...section,
              startDate: iso,
            });
          }
        }}
        calendarClassName={isDarkMode ? 'react-datepicker-dark' : ''}
        wrapperClassName={isDarkMode ? 'react-datepicker-wrapper-dark' : ''}
      />
      <DatePicker
        showMonthYearDropdown
        minDate={new Date('2010-01-01')}
        maxDate={new Date('2025-12-31')}
        placeholderText="End Date"
        selected={watchedEndDate ? new Date(watchedEndDate) : null}
        onChange={(date) => {
          const iso = date?.toISOString().split('T')[0] ?? '';
          setValue('endDate', iso, { shouldDirty: true });
          if (isExperienceSection(section)) {
            onUpdate({
              ...section,
              endDate: iso,
            });
          }
        }}
        calendarClassName={isDarkMode ? 'react-datepicker-dark' : ''}
        wrapperClassName={isDarkMode ? 'react-datepicker-wrapper-dark' : ''}
      />

      <div className="flex gap-2">
        <input type="checkbox" {...register('isCurrentlyWork')} onBlur={onBlur} className="checkbox" />
        <label>I currently work here</label>
      </div>

      <AutoTextArea
        placeholder="Description"
        {...register('description')}
        value={description}
        onBlur={onBlur}
        className="textarea"
      />
    </>
  );
};
