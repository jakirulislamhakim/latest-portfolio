import type { LucideIcon } from 'lucide-react';

export type TSkill = {
  id: string;
  name: string;
};

export type TSkillCategory = {
  id: string;
  name: string;
  icon: LucideIcon;
  skills: readonly TSkill[];
};
