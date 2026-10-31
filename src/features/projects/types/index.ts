export type TProjectStatus = 'shipped' | 'in-progress' | 'demo';

export type TProjectTag = 'full-stack' | 'frontend' | 'backend';

export type TProjectOwnership = 'solo' | 'team';

export type TProjectStackItem = {
  id: string;
  label: string;
};

export type TProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type TProject = {
  id: string;
  slug: string;
  title: string;
  pitch: string;
  problem: string;
  outcome: string;
  overview: string;
  challenges: string;
  solutions: string;
  results: string;
  /** Longer role line for the detail sidebar (e.g. what you owned). */
  role: string;
  /** Solo vs team — shown on the card as Solo | Team, not a pill. */
  ownership: TProjectOwnership;
  /** Filterable work type — pill overlaid on the card image. */
  tag: TProjectTag;
  projectType: string;
  clientLabel: string;
  durationLabel: string;
  status: TProjectStatus;
  featured?: boolean;
  image: TProjectImage;
  stack: readonly TProjectStackItem[];
  liveUrl: string;
  githubUrl: string;
};
