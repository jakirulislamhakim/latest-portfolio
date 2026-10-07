import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HERO_CONTENT } from '../constants';
import { HeroSocialLinks } from './hero-social-links';
import { HeroVisual } from './hero-visual';

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="py-6 md:py-10 lg:py-20">
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Text and Actions */}
        <div className="order-2 flex flex-col items-start gap-6 lg:order-1 lg:col-span-7">
          {/* Headings */}
          <div className="space-y-1">
            <p className="font-heading text-lg font-medium text-muted-foreground md:text-xl">
              {HERO_CONTENT.greeting}{' '}
              <span className="inline-block select-none" role="img" aria-label="waving hand">
                👋
              </span>
            </p>

            <h1 id="hero-heading">
              <span className="bg-linear-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                {HERO_CONTENT.name}
              </span>
            </h1>

            <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
              {HERO_CONTENT.designations}
            </h2>
          </div>

          {/* Bio text */}
          <p className="max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            {HERO_CONTENT.bio}
          </p>

          {/* Availability badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-xs backdrop-blur-xs md:mt-6">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span>{HERO_CONTENT.badge}</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2 md:gap-4">
            <Link
              href={HERO_CONTENT.primaryCta.href}
              className={cn(
                buttonVariants(),
                'group rounded-xl bg-linear-to-r from-primary to-chart-2 px-5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 md:px-6 md:text-base'
              )}
            >
              <span>{HERO_CONTENT.primaryCta.label}</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <a
              href={HERO_CONTENT.secondaryCta.href}
              download
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'group rounded-xl border-border/80 bg-card/80 px-5 text-sm font-semibold text-foreground backdrop-blur-xs transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-muted md:px-6 md:text-base'
              )}
            >
              <span>{HERO_CONTENT.secondaryCta.label}</span>
              <Download className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>

          {/* Social Links */}
          <HeroSocialLinks />
        </div>

        {/* Right Column: Visual Composition */}
        <div className="order-1 flex items-center justify-center lg:order-2 lg:col-span-5">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
