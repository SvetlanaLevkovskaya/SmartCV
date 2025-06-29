import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form';

import { useDarkMode } from '../../../hooks/useDarkMode.tsx';
import { ResumeSection } from '../../../types';

interface Props {
  section: ResumeSection;
  register: UseFormRegister<ResumeSection>;
  watchedSection: ResumeSection;
  setValue: UseFormSetValue<ResumeSection>;
  onBlur: () => void;
  onUpdate: (section: ResumeSection) => void;
  control: Control<ResumeSection>;
}

export const ExperienceFields = ({ register, setValue, control, onBlur, section, onUpdate }: Props) => {
  const isDarkMode = useDarkMode();

  const watchedStartDate = useWatch({ control, name: 'startDate' });
  const watchedEndDate = useWatch({ control, name: 'endDate' });

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
          if (section.type === 'experience') {
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
          if (section.type === 'experience') {
            onUpdate({
              ...section,
              endDate: iso,
            });
          }
        }}
        calendarClassName={isDarkMode ? 'react-datepicker-dark' : ''}
        wrapperClassName={isDarkMode ? 'react-datepicker-wrapper-dark' : ''}
      />

      <textarea placeholder="Description" {...register('description')} onBlur={onBlur} className="input" />
    </>
  );
};
