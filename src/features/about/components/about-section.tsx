import { SectionLayout } from '@/components/layout/section-layout';
import { ABOUT_CONTENT, ABOUT_PARAGRAPHS, ABOUT_STATS } from '../constants';
import { AboutParagraphBlock } from './about-paragraph-block';
import { AboutStatCard } from './about-stat-card';

export function AboutSection() {
  return (
    <SectionLayout id="about" aria-labelledby="about-heading">
      <div className="mx-auto max-w-4xl rounded-lg lg:pb-16">
        <div className="text-center">
          <h2 id="about-heading">{ABOUT_CONTENT.heading}</h2>
          <h4 className="mx-auto mt-3 leading-relaxed text-muted-foreground">
            {ABOUT_CONTENT.subheadline}
          </h4>
        </div>

        <div className="mt-6 space-y-3">
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <AboutParagraphBlock key={paragraph.id} paragraph={paragraph} />
          ))}
        </div>
      </div>

      <ul
        aria-label="Highlights"
        className="relative z-10 mt-4 grid grid-cols-2 gap-3 lg:-mt-12 lg:grid-cols-4 lg:gap-4"
      >
        {ABOUT_STATS.map((stat) => (
          <AboutStatCard key={stat.id} stat={stat} />
        ))}
      </ul>
    </SectionLayout>
  );
}
