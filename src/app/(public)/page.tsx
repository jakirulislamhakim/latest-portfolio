import { Suspense } from 'react';
import { SectionLayout } from '@/components/layout/section-layout';
import { AboutSection } from '@/features/about';
import { HeroSection } from '@/features/hero';
import { SkillsSection } from '@/features/skills';
import { GithubActivitySection, GithubActivitySkeleton } from '@/features/github';
import { ContactSection } from '@/features/contact';
import { ExperienceSection } from '@/features/experience';
import { ServicesSection } from '@/features/services';
import { TerminalSection } from '@/features/terminal';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <Suspense fallback={<GithubActivitySkeleton />}>
        <GithubActivitySection />
      </Suspense>
      <TerminalSection />
      <ServicesSection />

      <SectionLayout id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Featured Projects</h2>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
          A showcase of recent web applications, design systems, and developer tools created with
          React and Next.js.
        </p>
      </SectionLayout>

      <ExperienceSection />

      <ContactSection />
    </>
  );
}
