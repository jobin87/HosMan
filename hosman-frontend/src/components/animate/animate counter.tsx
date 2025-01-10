import { useEffect, useState, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

type AnimatedCounterProps = {
  value: number;
  duration?: number; // Animation duration in seconds
};

export default function AnimatedCounter({ value, duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false }); // Animate only once when in view
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      animate(0, value, {
        duration,
        onUpdate(latest) {
          setDisplayValue(Math.floor(latest)); // Smooth animation
        },
      });
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}
