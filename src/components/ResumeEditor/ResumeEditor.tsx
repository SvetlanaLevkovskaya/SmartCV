import { SectionForm } from '../SectionForm/SectionForm.tsx';
import { SectionType } from '../../types';
import { useCallback, useState } from 'react';

import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { useResume } from '../../store/ResumeContext.tsx';
import { Select } from '../Select/Select.tsx';
import { createEmptySection } from '../../utils/createEmptySection.ts';
import { SortableSection } from './SortableSection/SortableSection.tsx';

export const ResumeEditor = () => {
  const { sections, addSection, updateSection, deleteSection, reorderSections } = useResume();
  const [newType, setNewType] = useState<SectionType>('personalInfo');

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAdd = useCallback(() => {
    const newSection = createEmptySection(newType);
    addSection(newSection);
  }, [newType, addSection]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex(s => s.id === active.id);
    const newIndex = sections.findIndex(s => s.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    reorderSections(arrayMove(sections, oldIndex, newIndex));

  }, [sections, reorderSections]);

  const sortableItems = sections.filter(s => s.type !== 'personalInfo').map(s => s.id);

  return (
    <section className="w-full p-6 pl-6 xl:pl-20 2xl:pl-40 border-r">
      <div className="flex gap-2 justify-between">
        <h2 className="text-xl font-bold mb-4">CV Editor</h2>

        <div className="flex gap-3 mb-4 items-center">
          <Select value={ newType } onChange={ setNewType } />

          <button
            onClick={ handleAdd }
            className="bg-yellow-300 shadow-[4px_4px_rgba(30,30,30)] text-gray-800 px-3 py-2 rounded transition hover:bg-yellow-400 focus:outline-none"
            aria-label="Add section"
          >
            Add section
          </button>
        </div>
      </div>


      <DndContext sensors={ sensors } collisionDetection={ closestCenter } onDragEnd={ handleDragEnd }>
        <SortableContext items={ sortableItems }
                         strategy={ verticalListSortingStrategy }>
          {sections.map(section => section.type === 'personalInfo'
            ? (
              <SectionForm
                key={section.id}
                section={section}
                onUpdate={updateSection}
                onDelete={() => deleteSection(section.id)}
              />
            )
            : (
              <SortableSection
                key={section.id}
                section={section}
                onUpdate={updateSection}
                onDelete={() => deleteSection(section.id)}
              />
            )
          )}
        </SortableContext>
      </DndContext>
    </section>
  );
};
