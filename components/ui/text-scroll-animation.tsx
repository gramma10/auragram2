"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "../../lib/utils";

type CharacterProps = {
  char: string | React.ReactNode;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  className?: string;
};


export const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  className,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  // More dramatic movement and blur reveal
  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 80, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 45, 0]);
  // Optimized blur for mobile (disabled on mobile for performance)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const filter = useTransform(scrollYProgress, [0, 0.3, 0.5], [isMobile ? "blur(0px)" : "blur(12px)", isMobile ? "blur(0px)" : "blur(4px)", "blur(0px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 0.4, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <motion.span
      className={cn("inline-block", isSpace && "w-[0.25em]", className)}
      style={{ x, rotateY, filter, opacity, scale }}
    >
      {char}
    </motion.span>
  );
};



export const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  className,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 60, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      className={cn("shrink-0 will-change-transform flex items-center justify-center", className)}
      style={{ x, scale, y, opacity, transformOrigin: "center" }}
    >
      {char}
    </motion.div>
  );
};


export const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  className,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 45, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distanceFromCenter) * 30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      className={cn("shrink-0 will-change-transform flex items-center justify-center", className)}
      style={{ x, rotate, y, scale, opacity, transformOrigin: "center" }}
    >
      {char}
    </motion.div>
  );
};

interface ScrollAnimatedTextProps {
  text: string;
  className?: string;
  charClassName?: string;
}

export const ScrollAnimatedText: React.FC<ScrollAnimatedTextProps> = ({ text, className, charClassName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Split into words first to prevent breaking words in half
  const words = text.split(" ");
  const allChars = text.split("");
  const centerIndex = Math.floor(allChars.length / 2);
  
  let charCount = 0;

  return (
    <div ref={containerRef} className={cn("inline-block relative", className)} style={{ perspective: "1000px" }}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split("");
        const result = (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const globalIndex = charCount++;
              return (
                <CharacterV1
                  key={globalIndex}
                  char={char}
                  index={globalIndex}
                  centerIndex={centerIndex}
                  scrollYProgress={scrollYProgress}
                  className={charClassName}
                />
              );
            })}
            {/* Add space after the word unless it's the last one */}
            {wordIndex < words.length - 1 && (
              <CharacterV1
                key={`space-${wordIndex}`}
                char=" "
                index={charCount++}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
                className={charClassName}
              />
            )}
          </span>
        );
        return result;
      })}
    </div>
  );
};


interface ScrollAnimatedIconsProps {
  icons: React.ReactNode[];
  className?: string;
  iconClassName?: string;
  variant?: 'v2' | 'v3';
}

export const ScrollAnimatedIcons: React.FC<ScrollAnimatedIconsProps> = ({ icons, className, iconClassName, variant = 'v2' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const centerIndex = Math.floor(icons.length / 2);
  const Character = variant === 'v2' ? CharacterV2 : CharacterV3;

  return (
    <div ref={containerRef} className={cn("flex flex-wrap items-center justify-center gap-8 relative", className)} style={{ perspective: "1000px" }}>
      {icons.map((icon, index) => (
        <Character
          key={index}
          char={icon}
          index={index}
          centerIndex={centerIndex}
          scrollYProgress={scrollYProgress}
          className={iconClassName}
        />
      ))}
    </div>
  );
};

export const Bracket = ({ className }: { className: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};

const Word = ({ word, progress, start, end }: { word: string; progress: any; start: number; end: number }) => {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
    </motion.span>
  );
};

export const WordReveal = ({ text, progress, className }: { text: string; progress: any; className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={cn("flex flex-wrap gap-x-[0.3em] gap-y-1", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word 
            key={`${word}-${i}`} 
            word={word} 
            progress={progress} 
            start={start} 
            end={end} 
          />
        );
      })}
    </div>
  );
};
