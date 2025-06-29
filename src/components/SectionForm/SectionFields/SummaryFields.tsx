import { AutoTextarea } from '../AutoTextArea/AutoTextarea.tsx';

import { Props } from './SectionFields.types.ts';

export const SummaryFields = ({ register, onBlur }: Props) => {
  return <AutoTextarea placeholder="Summary" {...register('text')} onBlur={onBlur} className="textarea" />;
};
