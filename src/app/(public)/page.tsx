import { Suspense } from 'react';
import { SectionLayout } from '@/components/layout/section-layout';
import { AboutSection } from '@/features/about';
import { HeroSection } from '@/features/hero';
import { SkillsSection } from '@/features/skills';
import { GithubActivitySection, GithubActivitySkeleton } from '@/features/github';
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

      <SectionLayout id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Featured Projects</h2>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
          A showcase of recent web applications, design systems, and developer tools created with
          React and Next.js.
        </p>
      </SectionLayout>

      <SectionLayout id="experience" aria-labelledby="experience-heading">
        <h2 id="experience-heading">Work Experience</h2>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
          Detailed career history, key projects delivered, and technical contributions across
          engineering teams.
        </p>
      </SectionLayout>

      <SectionLayout id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Get In Touch</h2>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
          Have an exciting project in mind or looking for a dedicated developer? Feel free to send a
          message or connect through social links.
        </p>
      </SectionLayout>
    </>
  );
}
