export type TExperienceKind = 'job' | 'freelance';

export type TExperienceHighlight = {
  id: string;
  text: string;
};

export type TExperienceStackItem = {
  id: string;
  label: string;
};

export type TExperienceEntry = {
  id: string;
  kind: TExperienceKind;
  title: string;
  subtitle: string;
  href?: string;
  startLabel: string;
  endLabel: string;
  isCurrent?: boolean;
  summary: string;
  highlights: readonly TExperienceHighlight[];
  stack: readonly TExperienceStackItem[];
};
