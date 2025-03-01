import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';

// ----------------------------------------------------------------------

export type UseScrollOffSetTopReturn = {
  offsetTop: boolean;
};

export function useScrollOffSetTop(top = 0): UseScrollOffSetTopReturn {
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [offsetTop, setOffsetTop] = useState(false);

  const handleScrollChange = useCallback(
    (val: number) => {
      const scrollHeight = Math.round(val);

      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const elementTop = Math.round(rect.top);
        setOffsetTop(elementTop < top);
      } else {
        setOffsetTop(scrollHeight > top);
      }
    },
    [top] // Removed `elementRef`, as it's stable
  );

  useMotionValueEvent(scrollY, 'change', handleScrollChange); // Removed unnecessary useMemo

  return {  offsetTop }; // Removed useMemo
}
