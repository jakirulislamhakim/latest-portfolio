import { PillList } from '@/components/shared/pill-list';
import type { TSkillCategory } from '../types';

type TSkillCategoryCardProps = {
  category: TSkillCategory;
};

export function SkillCategoryCard({ category }: TSkillCategoryCardProps) {
  const Icon = category.icon;
  const skills = category.skills.map((skill) => ({
    id: skill.id,
    label: skill.name,
  }));

  return (
    <li className="rounded-sm border border-border/50 bg-card p-4 shadow-xs md:p-5">
      <div className="flex items-center gap-2">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3>{category.name}</h3>
      </div>
      <PillList className="mt-3 justify-start" items={skills} label={`${category.name} skills`} />
    </li>
  );
}
