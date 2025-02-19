'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface LanguagesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const pathVariants: Variants = {
  normal: { opacity: 1, pathLength: 1, pathOffset: 0 },
  animate: (custom: number) => ({
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      opacity: { duration: 0.01, delay: custom * 0.1 },
      pathLength: {
        type: 'spring',
        duration: 0.5,
        bounce: 0,
        delay: custom * 0.1,
      },
    },
  }),
};

const svgVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const LanguagesIcon = forwardRef<
  LanguagesIconHandle,
  HTMLAttributes<HTMLDivElement>
>(({ onMouseEnter, onMouseLeave, ...props }, ref) => {
  const svgControls = useAnimation();
  const pathControls = useAnimation();

  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => {
        svgControls.start('animate');
        pathControls.start('animate');
      },
      stopAnimation: () => {
        svgControls.start('normal');
        pathControls.start('normal');
      },
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        svgControls.start('animate');
        pathControls.start('animate');
      } else {
        onMouseEnter?.(e);
      }
    },
    [onMouseEnter, pathControls, svgControls]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        svgControls.start('normal');
        pathControls.start('normal');
      } else {
        onMouseLeave?.(e);
      }
    },
    [svgControls, pathControls, onMouseLeave]
  );

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={svgVariants}
        animate={svgControls}
      >
        <motion.path
          d="m5 8 6 6"
          variants={pathVariants}
          custom={3}
          animate={pathControls}
        />
        <motion.path
          d="m4 14 6-6 3-3"
          variants={pathVariants}
          custom={2}
          animate={pathControls}
        />
        <motion.path
          d="M2 5h12"
          variants={pathVariants}
          custom={1}
          animate={pathControls}
        />
        <motion.path
          d="M7 2h1"
          variants={pathVariants}
          custom={0}
          animate={pathControls}
        />
        <motion.path
          d="m22 22-5-10-5 10"
          variants={pathVariants}
          custom={3}
          animate={pathControls}
        />
        <motion.path
          d="M14 18h6"
          variants={pathVariants}
          custom={3}
          animate={pathControls}
        />
      </motion.svg>
    </div>
  );
});

LanguagesIcon.displayName = 'LanguagesIcon';

export { LanguagesIcon };
