import { SectionForm } from '../SectionForm/SectionForm.tsx';
import { ResumeSection, SectionType } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { useResume } from '../../store/ResumeContext.tsx';

const createEmptySection = (type: SectionType): ResumeSection => {
  const id = uuidv4();
  switch (type) {
    case 'personalInfo':
      return { id, type, fullName: '', position: '', email: '', phoneNumber: '', location: '' };
    case 'summary':
      return { id, type, text: '' }
    case 'experience':
      return {
        id,
        type,
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        isCurrentlyWork: false,
      };
    case 'education':
      return {
        id,
        type,
        schoolName: '',
        degree: '',
        fieldOfStudy: '',
        country: '',
        city: '',
        startYear: '',
        endYear: '',
      };
    case 'skills':
      return { id, type, skills: [] };
    case 'certificates':
      return { id, type, text: [] };
  }
};

function SortableSection({ section, onUpdate, onDelete }: {
  section: ResumeSection;
  onUpdate: (section: ResumeSection) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={ setNodeRef } style={ style } { ...attributes } className="relative">
      <div { ...listeners } className="absolute left-2 top-2 cursor-grab text-gray-400 text-lg"> ⠿</div>
      <SectionForm
        section={ section }
        onUpdate={ onUpdate }
        onDelete={ onDelete }
      />
    </div>
  )
    ;
}

export const ResumeEditor = () => {
  const { sections, addSection, updateSection, deleteSection, reorderSections } = useResume();
  const [newType, setNewType] = useState<SectionType>('personalInfo');

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAdd = () => {
    const newSection = createEmptySection(newType);
    addSection(newSection);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id === over.id);

      const newOrder = arrayMove(sections, oldIndex, newIndex);
      reorderSections(newOrder);
    }
  };

  return (
    <div className="w-full p-6 pl-6 xl:pl-20 2xl:pl-40 border-r">
      <div className="flex gap-2 justify-between">
        <h2 className="text-xl font-bold mb-4">CV Editor</h2>

        <div className="flex gap-3 mb-4 items-center">
          <label htmlFor="section-select" className="sr-only" />
          <select
            id="section-select"
            value={ newType }
            onChange={ e => setNewType(e.target.value as SectionType) }
            className="border p-1 rounded"
          >
            <option value="personalInfo">Personal Info</option>
            <option value="summary">Summary</option>
            <option value="experience">Experience</option>
            <option value="education">Education</option>
            <option value="skills">Skills</option>
            <option value="certificates">Certificates</option>
          </select>

          <button
            onClick={ handleAdd }
            className="bg-yellow-300 shadow-[4px_4px_rgba(30,30,30)] text-gray-800 px-3 py-1 rounded transition hover:bg-yellow-400 focus:outline-none"
            aria-label="Add section"
          >
            Add section
          </button>
        </div>
      </div>


      <DndContext sensors={ sensors } collisionDetection={ closestCenter } onDragEnd={ handleDragEnd }>
        <SortableContext items={ sections.filter(s => s.type !== 'personalInfo').map(s => s.id) }
                         strategy={ verticalListSortingStrategy }>
          { sections.map(section => {
            if (section.type === 'personalInfo') {
              return (
                <div key={ section.id }>
                  <SectionForm
                    section={ section }
                    onUpdate={ updateSection }
                    onDelete={ () => deleteSection(section.id) }
                  />
                </div>
              );
            }

            return (
              <SortableSection
                key={ section.id }
                section={ section }
                onUpdate={ updateSection }
                onDelete={ () => deleteSection(section.id) }
              />
            );
          }) }
        </SortableContext>
      </DndContext>
    </div>
  );
};
