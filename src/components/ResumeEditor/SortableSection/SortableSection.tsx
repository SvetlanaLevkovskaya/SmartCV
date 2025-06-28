import { memo } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ResumeSection } from '../../../types';
import { SectionForm } from '../../SectionForm/SectionForm.tsx';

interface Props {
  section: ResumeSection;
  onUpdate: (section: ResumeSection) => void;
  onDelete: () => void;
}

export const SortableSectionComponent = ({ section, onUpdate, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative">
      <button
        type="button"
        {...listeners}
        aria-label="Drag section"
        className="absolute left-2 top-2 cursor-grab text-gray-400 text-lg"
      >
        ⠿
      </button>
      <SectionForm section={section} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
};

export const SortableSection = memo(SortableSectionComponent);
