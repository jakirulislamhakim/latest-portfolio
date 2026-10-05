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
