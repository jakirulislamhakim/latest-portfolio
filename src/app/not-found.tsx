import Link from 'next/link';
import { FolderGit2, Home } from 'lucide-react';
import { SectionLayout } from '@/components/layout/section-layout';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <SectionLayout
      id="not-found"
      needTopPadding
      className="flex min-h-[80dvh] flex-1 flex-col justify-center"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          <span>404 Error</span>
        </div>

        {/* Big Gradient 404 */}
        <p className="mt-4 bg-linear-to-r from-primary via-chart-2 to-primary bg-clip-text font-heading text-7xl font-extrabold tracking-tighter text-transparent md:text-9xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Page or Project Not Found
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          The link you followed might be broken, or the project might have been updated. Don&apos;t
          worry, everything else is right here.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants(),
              'group rounded-xl bg-linear-to-r from-primary to-chart-2 px-5 font-semibold text-primary-foreground shadow-md shadow-primary/20'
            )}
          >
            <Home className="size-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/#projects"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'rounded-xl border-border/80 bg-card/80 px-5 font-semibold text-foreground hover:bg-muted'
            )}
          >
            <FolderGit2 className="size-4 text-primary" />
            <span>Explore Projects</span>
          </Link>
        </div>

        {/* Quick Fallback Links */}
        <div className="mt-12 w-full border-t border-border/60 pt-6">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Need something specific?
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/#skills"
              className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Skills & Tech
            </Link>
            <Link
              href="/#experience"
              className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Experience
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
