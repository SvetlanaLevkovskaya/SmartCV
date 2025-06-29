import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useWatch } from 'react-hook-form';

import { useDarkMode } from '../../../hooks/useDarkMode.tsx';

import { Props } from './SectionFields.types.ts';

export const EducationFields = ({ register, setValue, control, onBlur, section, onUpdate }: Props) => {
  const isDarkMode = useDarkMode();

  const watchedStartYear = useWatch({ control, name: 'startYear' });
  const watchedEndYear = useWatch({ control, name: 'endYear' });

  return (
    <>
      <input placeholder="School Name" {...register('schoolName')} onBlur={onBlur} className="input" />
      <input placeholder="Degree" {...register('degree')} onBlur={onBlur} className="input" />
      <input placeholder="Field of Study" {...register('fieldOfStudy')} onBlur={onBlur} className="input" />
      <input placeholder="Country" {...register('country')} onBlur={onBlur} className="input" />
      <input placeholder="City" {...register('city')} onBlur={onBlur} className="input" />

      <DatePicker
        showMonthYearDropdown
        dateFormat="yyyy"
        minDate={new Date('2010-01-01')}
        maxDate={new Date('2025-12-31')}
        placeholderText="Start Year"
        selected={watchedStartYear ? new Date(watchedStartYear) : null}
        onChange={(date) => {
          const iso = date?.toISOString().split('T')[0] ?? '';
          setValue('startYear', iso, { shouldDirty: true });
          if (section.type === 'education') {
            onUpdate({
              ...section,
              startYear: iso,
            });
          }
        }}
        calendarClassName={isDarkMode ? 'react-datepicker-dark' : ''}
        wrapperClassName={isDarkMode ? 'react-datepicker-wrapper-dark' : ''}
      />
      <DatePicker
        showMonthYearDropdown
        dateFormat="yyyy"
        minDate={new Date('2010-01-01')}
        maxDate={new Date('2025-12-31')}
        placeholderText="End Year"
        selected={watchedEndYear ? new Date(watchedEndYear) : null}
        onChange={(date) => {
          const iso = date?.toISOString().split('T')[0] ?? '';
          setValue('endYear', iso, { shouldDirty: true });
          if (section.type === 'education') {
            onUpdate({
              ...section,
              endYear: iso,
            });
          }
        }}
        calendarClassName={isDarkMode ? 'react-datepicker-dark' : ''}
        wrapperClassName={isDarkMode ? 'react-datepicker-wrapper-dark' : ''}
      />
    </>
  );
};
