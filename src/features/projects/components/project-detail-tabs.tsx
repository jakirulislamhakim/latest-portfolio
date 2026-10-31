'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PROJECTS_CONTENT } from '../constants';

type TProjectDetailTabsProps = {
  overview: string;
  challenges: string;
  solutions: string;
  results: string;
};

const TAB_TRIGGER_CLASS =
  'h-auto min-h-11 w-full rounded-md border border-border px-2 py-2 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none data-active:border-primary data-active:bg-primary data-active:text-primary-foreground data-active:shadow-xs dark:data-active:border-primary dark:data-active:bg-primary dark:data-active:text-primary-foreground md:px-3 [@media(hover:hover)_and_(pointer:fine)]:cursor-pointer';

const TAB_PANEL_CLASS = 'mt-4 text-base leading-relaxed text-muted-foreground';

export function ProjectDetailTabs({
  overview,
  challenges,
  solutions,
  results,
}: TProjectDetailTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full gap-0">
      <TabsList
        aria-label="Case study sections"
        className="grid w-full grid-cols-2 gap-1 rounded-lg bg-transparent p-1 group-data-horizontal/tabs:h-auto md:grid-cols-4"
      >
        <TabsTrigger value="overview" className={TAB_TRIGGER_CLASS}>
          {PROJECTS_CONTENT.overviewTab}
        </TabsTrigger>
        <TabsTrigger value="challenges" className={TAB_TRIGGER_CLASS}>
          {PROJECTS_CONTENT.challengesTab}
        </TabsTrigger>
        <TabsTrigger value="solutions" className={TAB_TRIGGER_CLASS}>
          {PROJECTS_CONTENT.solutionsTab}
        </TabsTrigger>
        <TabsTrigger value="results" className={TAB_TRIGGER_CLASS}>
          {PROJECTS_CONTENT.resultsTab}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className={TAB_PANEL_CLASS}>
        {overview}
      </TabsContent>
      <TabsContent value="challenges" className={TAB_PANEL_CLASS}>
        {challenges}
      </TabsContent>
      <TabsContent value="solutions" className={TAB_PANEL_CLASS}>
        {solutions}
      </TabsContent>
      <TabsContent value="results" className={TAB_PANEL_CLASS}>
        {results}
      </TabsContent>
    </Tabs>
  );
}
