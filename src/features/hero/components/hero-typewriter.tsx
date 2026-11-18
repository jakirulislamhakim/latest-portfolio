'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { THeroTypewriterProps } from '../types';

export function HeroTypewriter({
  roles,
  typingSpeedMs = 80,
  deletingSpeedMs = 40,
  pauseDurationMs = 1500,
}: THeroTypewriterProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor toggle (independent of CSS reduced-motion overrides)
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  // Main typing, pausing, and deleting loop
  useEffect(() => {
    if (roles.length === 0) {
      return;
    }

    const currentFullText = roles[roleIndex] ?? '';
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        // Typing characters one by one
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, typingSpeedMs);
      } else {
        // Full word is visible; pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDurationMs);
      }
    } else {
      if (displayText.length > 0) {
        // Deleting characters one by one
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, deletingSpeedMs);
      } else {
        // Fully deleted; brief pause before typing next role
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }, 200);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [displayText, isDeleting, roleIndex, roles, typingSpeedMs, deletingSpeedMs, pauseDurationMs]);

  const activeRole = roles[roleIndex] ?? roles[0] ?? '';

  return (
    <span className="inline-flex min-h-[1.5em] items-center text-foreground">
      {/* Accessible full text for screen readers and SEO */}
      <span className="sr-only">{activeRole}</span>

      {/* Visual dynamic typing animation */}
      <span aria-hidden="true" className="text- font-bold">
        {displayText || '\u00A0'}
      </span>

      {/* Clean blinking cursor */}
      <span
        aria-hidden="true"
        className={cn(
          'ml-1 inline-block h-[1.15em] w-[2px] bg-primary align-middle transition-opacity duration-100 select-none',
          showCursor ? 'opacity-100' : 'opacity-0'
        )}
      />
    </span>
  );
}
