import { GITHUB_ACTIVITY_CONTENT } from '../constants';

export function GithubActivityHeading() {
  return (
    <div className="text-center">
      <h2 id="activity-heading">{GITHUB_ACTIVITY_CONTENT.heading}</h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        {GITHUB_ACTIVITY_CONTENT.subheadline}
      </p>
    </div>
  );
}
