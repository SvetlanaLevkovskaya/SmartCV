import { useEffect, useState } from 'react';

import { CertificatesSection } from '../../../types';
import { AutoTextarea } from '../AutoTextArea/AutoTextarea.tsx';

import { Props } from './SectionFields.types.ts';

export const CertificatesFields = ({ setValue, onUpdate, section, watchedSection }: Props) => {
  const [rawItems, setRawItems] = useState('');

  useEffect(() => {
    setRawItems((watchedSection as CertificatesSection).items?.join(', ') || '');
  }, [watchedSection]);

  return (
    <AutoTextarea
      placeholder="Enter certificates separated by commas"
      value={rawItems}
      onChange={(e) => setRawItems(e.target.value)}
      onBlur={(e) => {
        const itemsArray = e.target.value
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);

        setValue('items', itemsArray, { shouldDirty: true });

        onUpdate({
          ...section,
          items: itemsArray,
        } as CertificatesSection);
      }}
    />
  );
};
