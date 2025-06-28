import { useEffect, useRef } from 'react';

export function useDebounce<T>(value: T, delay: number, callback: (value: T) => void) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => callback(value), delay);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [value]);
}
