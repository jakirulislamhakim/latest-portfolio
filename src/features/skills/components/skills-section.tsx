import { SKILL_CATEGORIES, SKILLS_CONTENT } from '../constants';
import { SkillCategoryCard } from './skill-category-card';

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24">
      <div>
        <h2 id="skills-heading" className="mt-2 text-center">
          {SKILLS_CONTENT.heading}
        </h2>
        <p className="mt-3 text-center text-base leading-relaxed text-muted-foreground">
          {SKILLS_CONTENT.intro}
        </p>
      </div>

      <ul className="mt-8 grid gap-4 lg:grid-cols-2">
        {SKILL_CATEGORIES.map((category) => (
          <SkillCategoryCard key={category.id} category={category} />
        ))}
      </ul>
    </section>
  );
}
