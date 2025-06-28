import { useState } from 'react';
import { CertificatesSection, EducationSection, ResumeSection, SectionType, SkillsSection } from '../../types';
import { FiX } from 'react-icons/fi';


interface SectionFormProps {
  section: ResumeSection;
  onUpdate: (section: ResumeSection) => void;
  onDelete: () => void;

}

type SectionUpdates<T extends SectionType> = Partial<
  Extract<ResumeSection, { type: T }>
>;

export const SectionForm = ({ section, onUpdate, onDelete }: SectionFormProps) => {
  const [localSection, setLocalSection] = useState(section);

  const handleChange = (field: string, value: string | string[] | boolean) => {
    setLocalSection(prev => ({ ...prev, [field]: value }));
    onUpdate({ ...localSection, [field]: value });
  };

  const AITips = () => {
    let updates: SectionUpdates<typeof section.type> = {};

    switch (section.type) {
      case 'personalInfo':
        updates = {
          fullName: 'John Doe',
          position: 'Frontend Developer',
          email: 'john.doe@example.com',
          phoneNumber: '+1 234 567 8900',
          location: 'New York, USA',
        };
        break;
      case 'summary':
        updates = {
          text: 'Experienced frontend developer with a passion for creating sleek and performant web applications.',
        };
        break;
      case 'experience':
        updates = {
          position: 'Software Engineer',
          company: 'TechCorp Inc.',
          startDate: '2020-01-01',
          endDate: '2023-05-31',
          description:
            'Worked on building scalable React applications, improving UI/UX, and collaborating with cross-functional teams.',
          isCurrentlyWork: false,
        };
        break;
      case 'education':
        updates = {
          schoolName: 'University of Technology',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          country: 'USA',
          city: 'Boston',
          startYear: '2016-09-01',
          endYear: '2020-06-30',
        };
        break;
      case 'skills':
        updates = {
          skills: ['JavaScript', 'React', 'TypeScript', 'CSS'],
        };
        break;
      case 'certificates':
        updates = {
          text: ['Certified React Developer', 'AWS Solutions Architect'],
        };
        break;
      default:
        break;
    }

    const newSection = { ...localSection, ...updates } as ResumeSection;
    setLocalSection(newSection);
    onUpdate(newSection);
  }


    return (
      <>
        <div className="border rounded p-4 pl-8 mb-4 bg-white">

          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="font-semibold capitalize ">{ section.type }</h3>

            <button
              onClick={ AITips }
              type="button"
              className="text-blue-600 hover:underline focus:outline-none"
              aria-label={ `AI tips ${ section.type }` }
            >
              AI tips
            </button>
          </div>


          <div className="flex flex-col gap-2">
            { section.type === 'personalInfo' && (
              <>
                <input
                  placeholder="Full Name"
                  value={ 'fullName' in localSection ? localSection.fullName : '' }
                  onChange={ e => handleChange('fullName', e.target.value) }
                  className="input"
                />
                <input
                  placeholder="Job Title"
                  value={ 'position' in localSection ? localSection.position : '' }
                  onChange={ e => handleChange('position', e.target.value) }
                  className="input"
                />
                <input
                  placeholder="Email"
                  value={ 'email' in localSection ? localSection.email : '' }
                  onChange={ e => handleChange('email', e.target.value) }
                  className="input"
                />
                <input
                  placeholder="Phone Number"
                  value={ 'phoneNumber' in localSection ? localSection.phoneNumber : '' }
                  onChange={ e => handleChange('phoneNumber', e.target.value) }
                  className="input"

                />
                <input
                  placeholder="Location"
                  value={ 'location' in localSection ? localSection.location : '' }
                  onChange={ e => handleChange('location', e.target.value) }
                  className="input"
                />
              </>
            ) }

            { section.type === 'summary' && (
              <textarea
                placeholder="Summary"
                value={ 'text' in localSection ? localSection.text : '' }
                onChange={ e => handleChange('text', e.target.value) }
                className="textarea"
              />
            ) }

            { section.type === 'experience' && (
              <>
                <input
                  placeholder="e.g. Frontend Developer"
                  value={ 'position' in localSection ? localSection.position : '' }
                  onChange={ e => handleChange('position', e.target.value) }
                  className="input"
                />
                <input
                  placeholder="e.g. Marriott International"
                  value={ 'company' in localSection ? localSection.company : '' }
                  onChange={ e => handleChange('company', e.target.value) }
                  className="input"
                />
                <input
                  type="date"
                  value={ 'startDate' in localSection ? localSection.startDate : '' }
                  onChange={ e => handleChange('startDate', e.target.value) }
                  className="input"
                />
                <input
                  type="date"
                  value={ 'endDate' in localSection ? localSection.endDate : '' }
                  onChange={ e => handleChange('endDate', e.target.value) }
                  className="input"
                />
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={ 'isCurrentlyWork' in localSection ? localSection.isCurrentlyWork : false }
                    onChange={ e => handleChange('isCurrentlyWork', e.target.checked) }
                    className="checkbox"
                  />
                  <label>I currently work here</label>
                </div>

                <textarea
                  placeholder="Write your own bullets to describe your role"
                  value={ 'description' in localSection ? localSection.description : '' }
                  onChange={ e => handleChange('description', e.target.value) }
                  className="textarea"
                />
              </>
            ) }

            { section.type === 'education' && (() => {
              const edu = localSection as EducationSection;
              return (
                <>
                  <input
                    placeholder="School Name"
                    value={ edu.schoolName }
                    onChange={ e => handleChange('schoolName', e.target.value) }
                    className="input"
                  />
                  <input
                    placeholder="Degree"
                    value={ edu.degree }
                    onChange={ e => handleChange('degree', e.target.value) }
                    className="input"
                  />
                  <input
                    placeholder="Field of Study"
                    value={ edu.fieldOfStudy }
                    onChange={ e => handleChange('fieldOfStudy', e.target.value) }
                    className="input"
                  />
                  <input
                    placeholder="Country"
                    value={ edu.country }
                    onChange={ e => handleChange('country', e.target.value) }
                    className="input"
                  />
                  <input
                    placeholder="City"
                    value={ edu.city }
                    onChange={ e => handleChange('city', e.target.value) }
                    className="input"
                  />
                  <input
                    type="date"
                    value={ edu.startYear }
                    onChange={ e => handleChange('startYear', e.target.value) }
                    className="input"
                  />
                  <input
                    type="date"
                    value={ edu.endYear }
                    onChange={ e => handleChange('endYear', e.target.value) }
                    className="input"
                  />
                </>
              );
            })() }

            { section.type === 'certificates' && (() => {
              const cert = localSection as CertificatesSection
              return (
                <textarea
                  placeholder="Enter certificates separated by commas"
                  value={ cert.text.join(', ') }
                  onChange={ e => handleChange('text', e.target.value.split(',').map(t => t.trim())) }
                  className="textarea"
                />
              );
            })() }

            { section.type === 'skills' && (() => {
              const skl = localSection as SkillsSection
              return (
                <textarea
                  placeholder="Enter certificates separated by commas"
                  value={ skl.skills.join(', ') }
                  onChange={ e => handleChange('skills', e.target.value.split(',').map(t => t.trim())) }
                  className="textarea"
                />
              );
            })() }
          </div>


          <button
            onClick={ onDelete }
            className="mt-4 w-full flex justify-end text-gray-500 cursor-pointer select-none transition-transform duration-200 ease-in-out hover:scale-110"
            aria-label="Delete section"
            style={ { transformOrigin: 'center right' } }
          >
            <FiX className="text-xl" />
          </button>

        </div>
      </>
    );
  }
