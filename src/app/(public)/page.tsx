import { Suspense } from 'react';
import { AboutSection } from '@/features/about';
import { HeroSection } from '@/features/hero';
import { SkillsSection } from '@/features/skills';
import { GithubActivitySection, GithubActivitySkeleton } from '@/features/github';
import { ContactSection } from '@/features/contact';
import { ExperienceSection } from '@/features/experience';
import { ProjectsSection } from '@/features/projects';
import { ServicesSection } from '@/features/services';
import { TerminalSection } from '@/features/terminal';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <Suspense fallback={<GithubActivitySkeleton />}>
        <GithubActivitySection />
      </Suspense>
      <ExperienceSection />
      <ServicesSection />
      <TerminalSection />
      <ContactSection />
    </>
  );
}
