
import { ResumeSection } from '../../types';
import { useResume } from '../../store/ResumeContext.tsx';

export const ResumePreview = () => {
  const { sections } = useResume();


  console.log('sections', sections)

  const renderSection = (section: ResumeSection) => {
    switch (section.type) {
      case 'personalInfo':
        return (
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{section.fullName}</h1>
            <p className="text-lg text-gray-700">{section.position}</p>
            <p className="text-sm text-gray-600">{section.email} | {section.phoneNumber}</p>
            <p className="text-sm text-gray-600">{section.location}</p>
          </div>
        );
      case 'summary':
        return (
          <div className="mb-4">
            <h2 className="text-xl font-semibold border-b pb-1 mb-1">Summary</h2>
            <p className="text-sm">{section.text}</p>
          </div>
        );
      case 'experience':
        return (
          <div className="mb-4">
            <h2 className="text-xl font-semibold border-b pb-1 mb-1">Experience</h2>
            <div>
              <h3 className="font-bold">{section.position}</h3>
              <p className="text-sm text-gray-700">
                {section.company} • {section.startDate} – {section.isCurrentlyWork ? 'Present' : section.endDate}
              </p>
              <p className="text-sm">{section.description}</p>
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="mb-4">
            <h2 className="text-xl font-semibold border-b pb-1 mb-1">Education</h2>
            <div>
              <h3 className="font-bold">{section.schoolName}</h3>
              <p className="text-sm text-gray-700">{section.degree}, {section.fieldOfStudy}</p>
              <p className="text-sm text-gray-700">{section.city}, {section.country}</p>
              <p className="text-sm">{section.startYear} – {section.endYear}</p>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="mb-4">
            <h2 className="text-xl font-semibold border-b pb-1 mb-1">Skills</h2>
            <ul className="list-disc list-inside text-sm">
              {section.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        );
      case 'certificates':
        return (
          <div className="mb-4">
            <h2 className="text-xl font-semibold border-b pb-1 mb-1">Certificates</h2>
            <ul className="list-disc list-inside text-sm">
              {section.text.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-6 pr-40 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Preview</h2>

      <div
        id="resume-preview"
        className="border p-6 shadow-md bg-white max-w-3xl mx-auto"
      >
        {sections.map(section => (
          <div key={section.id}>
            {renderSection(section)}
          </div>
        ))}
      </div>
    </div>
  );
};
