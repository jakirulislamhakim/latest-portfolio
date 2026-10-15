import { getGithubActivity } from '../get-github-activity';
import { GithubActivityFallback } from './github-activity-fallback';
import { GithubActivityView } from './github-activity-view';

export async function GithubActivitySection() {
  const result = await getGithubActivity();

  if (result.status === 'error') {
    return <GithubActivityFallback />;
  }

  return <GithubActivityView activity={result.activity} />;
}
