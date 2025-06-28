import { TextareaHTMLAttributes, useEffect, useRef } from 'react';

type AutoTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const AutoTextarea = ({ value, ...props }: AutoTextareaProps) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <textarea
      ref={ ref }
      value={ value }
      { ...props }
      className={ `overflow-hidden resize-none ${ props.className ?? '' }` }
    />
  );
};
