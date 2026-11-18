'use client';

import { useEffect, useRef, useState } from 'react';

type TAnimatedCounterProps = {
  readonly value: number | string;
  readonly durationMs?: number;
  readonly delayMs?: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly className?: string;
};

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function parseStatValue(
  raw: number | string,
  explicitPrefix = '',
  explicitSuffix = ''
): { target: number; prefix: string; suffix: string } {
  if (typeof raw === 'number') {
    return {
      target: raw,
      prefix: explicitPrefix,
      suffix: explicitSuffix,
    };
  }

  // Extract leading non-digits, the number (with optional commas/decimals), and trailing non-digits
  const match = raw.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);
  if (!match) {
    return {
      target: 0,
      prefix: explicitPrefix,
      suffix: raw,
    };
  }

  const parsedPrefix = explicitPrefix || match[1] || '';
  const parsedTarget = Number.parseFloat(match[2]?.replace(/,/g, '') ?? '0') || 0;
  const parsedSuffix = explicitSuffix || match[3] || '';

  return {
    target: parsedTarget,
    prefix: parsedPrefix,
    suffix: parsedSuffix,
  };
}

export function AnimatedCounter({
  value,
  durationMs = 1500,
  delayMs = 300,
  prefix: propPrefix,
  suffix: propSuffix,
  className,
}: TAnimatedCounterProps) {
  const { target, prefix, suffix } = parseStatValue(value, propPrefix, propSuffix);
  const [displayCount, setDisplayCount] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || hasAnimatedRef.current) {
      return;
    }

    let animationFrameId: number;
    let delayTimeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          delayTimeoutId = setTimeout(() => {
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / durationMs, 1);
              const easedProgress = easeOutExpo(progress);

              setDisplayCount(Math.round(easedProgress * target));

              if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
              }
            };

            animationFrameId = requestAnimationFrame(animate);
          }, delayMs);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (delayTimeoutId) {
        clearTimeout(delayTimeoutId);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, durationMs, delayMs]);

  const formattedFinal =
    typeof value === 'number'
      ? `${prefix}${new Intl.NumberFormat('en-US').format(target)}${suffix}`
      : `${prefix}${value}${suffix}`;

  const formattedAnimated = `${prefix}${new Intl.NumberFormat('en-US').format(displayCount)}${suffix}`;

  return (
    <span ref={containerRef} className={className}>
      {/* Accessible static text for screen readers and SEO */}
      <span className="sr-only">{formattedFinal}</span>

      {/* Animated visual count */}
      <span aria-hidden="true">{formattedAnimated}</span>
    </span>
  );
}
