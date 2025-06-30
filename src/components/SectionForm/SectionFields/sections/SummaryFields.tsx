import { AutoTextArea } from '@/components/SectionForm/_ui';

import { Props } from '../SectionFields.types.ts';

export const SummaryFields = ({ register, onBlur }: Props) => {
  return <AutoTextArea placeholder="Summary" {...register('text')} onBlur={onBlur} className="textarea" />;
};
