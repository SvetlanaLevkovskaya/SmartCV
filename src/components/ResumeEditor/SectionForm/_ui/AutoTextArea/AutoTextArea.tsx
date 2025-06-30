import { TextareaHTMLAttributes, forwardRef, useEffect, useRef } from 'react';

type AutoTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const AutoTextArea = forwardRef<HTMLTextAreaElement, AutoTextareaProps>(
  ({ value, className, ...props }, forwardedRef) => {
    const localRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
      const el = localRef.current;
      if (el) {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
      }
    }, [value]);

    return (
      <textarea
        {...props}
        value={value}
        ref={(el) => {
          localRef.current = el;
          if (typeof forwardedRef === 'function') {
            forwardedRef(el);
          } else if (forwardedRef) {
            (forwardedRef as React.RefObject<HTMLTextAreaElement | null>).current = el;
          }
        }}
        className={`overflow-hidden resize-none ${className ?? ''}`}
      />
    );
  }
);
