import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HERO_TECH_BADGES } from '../constants';
import { HeroCodeCard } from './hero-code-card';

export function HeroVisual() {
  return (
    <div className="relative flex w-full max-w-lg flex-col items-center justify-center">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -top-8 size-72 rounded-full bg-linear-to-r from-primary/25 via-chart-2/20 to-chart-3/25 blur-3xl md:size-96"
        aria-hidden="true"
      />

      {/* Profile & Floating Badges Area */}
      <div className="relative flex items-center justify-center">
        {/* Floating Tech Badges (decorative visual accent) */}
        {HERO_TECH_BADGES.map((badge) => (
          <div
            key={badge.id}
            aria-hidden="true"
            className={cn(
              'absolute z-20 size-10 rounded-md border border-border/80 bg-white p-1.5 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:shadow-md md:size-12 md:p-2',
              badge.positionClassName
            )}
          >
            <div className="relative size-full">
              <Image src={badge.src} alt="" fill sizes="56px" className="object-contain" />
            </div>
          </div>
        ))}

        {/* Profile Image Circle */}
        <div className="relative size-56 overflow-hidden rounded-full border-4 border-background bg-muted/40 shadow-2xl ring-4 ring-primary/20 md:size-72">
          <Image
            src="/images/profile.png"
            alt="Jakirul Islam Hakim - Full Stack Developer"
            fill
            sizes="(max-width: 768px) 224px, 288px"
            priority
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Overlapping Terminal Code Card */}
      <div className="relative z-30 -mt-10 w-full max-w-sm md:-mt-14 md:max-w-md">
        <HeroCodeCard />
      </div>
    </div>
  );
}
