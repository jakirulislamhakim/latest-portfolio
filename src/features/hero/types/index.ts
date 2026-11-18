export type THeroSocialLink = {
  id: string;
  name: string;
  href: string;
  ariaLabel: string;
};

export type THeroTechBadge = {
  id: string;
  name: string;
  src: string;
  positionClassName: string;
};

export type THeroCodeProperty = {
  key: string;
  value: string;
};

export type THeroCodeSnippet = {
  variableName: string;
  properties: readonly THeroCodeProperty[];
};

export type THeroTypewriterProps = {
  readonly roles: readonly string[];
  readonly typingSpeedMs?: number;
  readonly deletingSpeedMs?: number;
  readonly pauseDurationMs?: number;
};
