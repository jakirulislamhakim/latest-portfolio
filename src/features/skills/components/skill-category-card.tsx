import type { TSkill, TSkillCategory } from '../types';

type TSkillListItemProps = {
  skill: TSkill;
};

function SkillListItem({ skill }: TSkillListItemProps) {
  return <li className="text-sm leading-relaxed text-foreground md:text-base">{skill.name}</li>;
}

type TSkillCategoryCardProps = {
  category: TSkillCategory;
};

export function SkillCategoryCard({ category }: TSkillCategoryCardProps) {
  const Icon = category.icon;

  return (
    <li className="rounded-sm border border-border/50 bg-card p-4 shadow-xs md:p-5">
      <div className="flex items-center gap-2">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3>{category.name}</h3>
      </div>
      <ul className="mt-3 list-disc space-y-1.5 pl-4 marker:text-primary">
        {category.skills.map((skill) => (
          <SkillListItem key={skill.id} skill={skill} />
        ))}
      </ul>
    </li>
  );
}
