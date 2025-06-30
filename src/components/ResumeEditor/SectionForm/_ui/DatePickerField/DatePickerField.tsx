import DatePicker from 'react-datepicker';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';

import { useDarkMode } from '@/hooks/useDarkMode.tsx';

import { ResumeSection } from '@/types';

type DateFields = 'startDate' | 'endDate' | 'startYear' | 'endYear';

interface Props {
  name: DateFields;
  control: Control<ResumeSection>;
  setValue: UseFormSetValue<ResumeSection>;
  section: ResumeSection;
  onUpdate: (section: ResumeSection) => void;
  placeholderText: string;
  minDate: Date;
  maxDate: Date;
  showYearPicker?: boolean;
  dateFormat?: string;
}

export const DatePickerField = ({
  name,
  control,
  setValue,
  section,
  onUpdate,
  placeholderText,
  minDate,
  maxDate,
  showYearPicker = false,
  dateFormat = 'yyyy-MM-dd',
}: Props) => {
  const isDarkMode = useDarkMode();
  const watchedDate = useWatch({
    control,
    name,
  });

  return (
    <DatePicker
      showYearPicker={showYearPicker}
      showMonthYearDropdown
      dateFormat={dateFormat}
      minDate={minDate}
      maxDate={maxDate}
      placeholderText={placeholderText}
      selected={watchedDate ? new Date(watchedDate) : null}
      onChange={(date) => {
        const iso = date?.toISOString().split('T')[0] ?? '';
        setValue(name, iso, { shouldDirty: true });
        onUpdate({
          ...section,
          [name]: iso,
        });
      }}
      calendarClassName={isDarkMode ? 'react-datepicker-dark' : ''}
      wrapperClassName={isDarkMode ? 'react-datepicker-wrapper-dark' : ''}
    />
  );
};
