import { useEffect, useState } from 'react';

import { AutoTextArea } from '@/components/SectionForm/_ui';

import { isCertificatesSection } from '@/types/resume.ts';

import { Props } from '../SectionFields.types.ts';

export const CertificatesFields = ({ setValue, onUpdate, section, watchedSection }: Props) => {
  const [rawItems, setRawItems] = useState('');

  useEffect(() => {
    if (isCertificatesSection(watchedSection)) {
      setRawItems(watchedSection.items?.join(', ') || '');
    }
  }, [watchedSection]);

  return (
    <AutoTextArea
      placeholder="Enter certificates separated by commas"
      value={rawItems}
      onChange={(e) => setRawItems(e.target.value)}
      onBlur={(e) => {
        const itemsArray = e.target.value
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);

        setValue('items', itemsArray, { shouldDirty: true });

        if (isCertificatesSection(section)) {
          onUpdate({
            ...section,
            items: itemsArray,
          });
        }
      }}
    />
  );
};
