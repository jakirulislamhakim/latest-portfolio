import { SectionLayout } from '@/components/layout/section-layout';
import { SITE } from '@/config/site';
import { EXPERIENCE_CONTENT, EXPERIENCE_ENTRIES } from '../constants';
import { ExperienceItem } from './experience-item';

export function ExperienceSection() {
  const lastIndex = EXPERIENCE_ENTRIES.length - 1;

  return (
    <SectionLayout id="experience" aria-labelledby="experience-heading">
      <div>
        <h2 id="experience-heading" className="text-center">
          {EXPERIENCE_CONTENT.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-prose text-center text-base leading-relaxed text-muted-foreground">
          {EXPERIENCE_CONTENT.intro}
        </p>
      </div>

      <ol className="mx-auto mt-8 flex max-w-3xl flex-col">
        {EXPERIENCE_ENTRIES.map((entry, index) => (
          <ExperienceItem
            key={entry.id}
            entry={entry}
            isFirst={index === 0}
            isLast={index === lastIndex}
          />
        ))}
      </ol>

      <div className="mx-auto mt-2 max-w-3xl pl-6">
        <a
          href={SITE.cvHref}
          download
          className="inline-flex min-h-11 items-center rounded-md text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {EXPERIENCE_CONTENT.cvLabel}
        </a>
      </div>
    </SectionLayout>
  );
}
