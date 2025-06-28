import { useState } from 'react';
import { SectionType } from '../../types';

const SECTION_OPTIONS: { label: string; value: SectionType }[] = [
  { value: 'personalInfo', label: 'Personal Info' },
  { value: 'summary', label: 'Summary' },
  { value: 'experience', label: 'Experience' },
  { value: 'education', label: 'Education' },
  { value: 'skills', label: 'Skills' },
  { value: 'certificates', label: 'Certificates' },
];

interface Props {
  value: SectionType;
  onChange: (value: SectionType) => void;
}

export const Select = ({ value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const selected = SECTION_OPTIONS.find(opt => opt.value === value);

  return (
    <div className="relative inline-block w-48 text-left">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full border px-3 py-2 rounded focus:outline-none flex justify-between items-center"
      >
        {selected?.label || 'Select section'}
        <svg
          className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-stone-50 border rounded">
          {SECTION_OPTIONS.map(option => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-200 ${
                option.value === value ? 'bg-gray-600 font-semibold' : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
