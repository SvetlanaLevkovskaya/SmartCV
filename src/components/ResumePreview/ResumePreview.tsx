import { ResumeSection } from '../../types';
import { useResume } from '../../store/ResumeContext.tsx';
import { HiOutlineDocumentDownload } from 'react-icons/hi';

export const ResumePreview = () => {
  const { sections } = useResume();

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview');

    if (!element) return;

    const personalInfo = sections.find(s => s.type === 'personalInfo' && 'fullName' in s);
    const fullName = personalInfo && typeof personalInfo.fullName === 'string'
      ? personalInfo.fullName.trim().replace(/\s+/g, '_')
      : '';

    const html2pdf = (await import('html2pdf.js')).default;

    html2pdf()
      .set({
        margin: [5, 0, 5, 0],
        filename: `resume-${ fullName }.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };


  const renderSection = (section: ResumeSection) => {
    switch (section.type) {
      case 'personalInfo': {
        const hasFullName = !!section.fullName;
        const hasPosition = !!section.position;
        const hasEmailOrPhone = !!section.email || !!section.phoneNumber;
        const hasLocation = !!section.location;

        return (
          <div className="mb-6">
            { hasFullName && <h1 className="text-3xl font-bold">{ section.fullName }</h1> }
            { hasPosition && <p className="text-lg text-gray-700 font-bold">{ section.position }</p> }
            { hasEmailOrPhone && (
              <p className="text-sm text-gray-600">
                { section.email && <span>{ section.email }</span> }
                { section.email && section.phoneNumber && (
                  <span className="px-2 text-gray-600">|</span>
                ) }
                { section.phoneNumber && <span>{ section.phoneNumber }</span> }
              </p>
            ) }
            { hasLocation && <p className="text-sm text-gray-600">{ section.location }</p> }
          </div>
        );
      }
      case 'summary':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-3 mb-1">Summary</h2>
            <p className="text-sm">{ section.text }</p>
          </div>
        );
      case 'experience': {
        const hasCompany = !!section.company;
        const hasDates = !!section.startDate || !!section.endDate;
        const dateRange = section.startDate
          ? `${ section.startDate } – ${ section.isCurrentlyWork ? 'Present' : section.endDate || '' }`
          : section.isCurrentlyWork
            ? 'Present'
            : section.endDate || '';

        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-3 mb-1">Experience</h2>
            <div>
              { section.position && <h3 className="font-bold mt-2">{ section.position }</h3> }
              { (hasCompany || hasDates) && (
                <p className="text-sm text-gray-700  mt-2">
                  { hasCompany && section.company }
                  { hasCompany && hasDates && ' • ' }
                  { dateRange }
                </p>
              ) }
              { section.description && <p className="text-sm whitespace-pre-line mt-2">{ section.description }</p> }
            </div>
          </div>
        );
      }
      case 'education': {
        const hasDegreeOrField = !!section.degree || !!section.fieldOfStudy;
        const hasLocation = !!section.city || !!section.country;
        const hasYears = !!section.startYear || !!section.endYear;

        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-3 mb-1">Education</h2>
            <div>
              { section.schoolName && <h3 className="font-bold  mt-2">{ section.schoolName }</h3> }

              { hasDegreeOrField && (
                <p className="text-sm text-gray-700  mt-2">
                  { [section.degree, section.fieldOfStudy].filter(Boolean).join(', ') }
                </p>
              ) }

              { hasLocation && (
                <p className="text-sm text-gray-700">
                  { [section.city, section.country].filter(Boolean).join(', ') }
                </p>
              ) }

              { hasYears && (
                <p className="text-sm">
                  { [section.startYear, section.endYear].filter(Boolean).join(' – ') }
                </p>
              ) }
            </div>
          </div>
        );
      }
      case 'skills':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-3 mb-1">Skills</h2>
            <ul className="text-sm list-disc pl-4 columns-2 gap-x-8">
              { section.skills.map((skill, index) => (
                <li key={ index } className="break-inside-avoid">{ skill }</li>
              )) }
            </ul>
          </div>
        );
      case 'certificates':
        return (
          <div className="mb-4">
            <h2 className="text-xl font-semibold border-b pb-3 mb-1">Certificates</h2>
            <ul className="list-disc list-inside text-sm">
              { section.text.map((cert, index) => (
                <li key={ index }>{ cert }</li>
              )) }
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full p-6 pr-6 xl:pr-20 2xl:pr-40 min-h-screen">

      <div className="flex gap-2 justify-between mb-4">
        <h2 className="text-xl font-bold mb-4">Preview</h2>

        <button
          onClick={ handleDownloadPDF }
          type="button"
          className="bg-yellow-300 shadow-[4px_4px_rgba(30,30,30)] px-3 py-1 text-gray-800 rounded transition hover:bg-yellow-400 focus:outline-none"
          aria-label="Download PDF"
        >
          <HiOutlineDocumentDownload size="24" />
        </button>

      </div>


      { sections.length > 0 && (
        <div
          id="resume-preview"
          className="border max-w-3xl mx-auto bg-white"
        >
          { sections.find(s => s.type === 'personalInfo') && (
            <div className="w-full px-6 py-6  border-b">
              { renderSection(sections.find(s => s.type === 'personalInfo')!) }
            </div>
          ) }
          { sections.filter(s => s.type !== 'personalInfo').length > 0 && (
          <div className="p-6">
            { sections
              .filter(s => s.type !== 'personalInfo')
              .map(section => (
                <div key={ section.id }>
                  { renderSection(section) }
                </div>
              )) }
          </div>
          )}
        </div>
      ) }
    </section>
  );
};
