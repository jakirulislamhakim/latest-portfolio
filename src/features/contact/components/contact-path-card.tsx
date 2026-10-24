import Link from 'next/link';
import { ArrowUpRight, Download, Phone } from 'lucide-react';
import { SocialIcon } from '@/components/shared/social-icon';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { TContactAction } from '../types';

type TContactActionListProps = {
  actions: readonly TContactAction[];
};

type TContactActionLinkProps = {
  action: TContactAction;
};

type TContactActionIconProps = {
  icon: TContactAction['icon'];
};

function ContactActionIcon({ icon }: TContactActionIconProps) {
  if (icon === 'download') {
    return <Download className="size-4" aria-hidden="true" />;
  }

  if (icon === 'phone') {
    return <Phone className="size-4" aria-hidden="true" />;
  }

  if (icon === 'services') {
    return <ArrowUpRight className="size-4" aria-hidden="true" />;
  }

  return (
    <span className="inline-flex" aria-hidden="true">
      <SocialIcon id={icon} className="size-4" />
    </span>
  );
}

function ContactActionLink({ action }: TContactActionLinkProps) {
  const className = cn(
    buttonVariants({ variant: action.tone === 'primary' ? 'default' : 'outline' }),
    'h-auto min-h-11 w-full px-4 py-2 text-center whitespace-normal'
  );
  const content = (
    <>
      <ContactActionIcon icon={action.icon} />
      <span>{action.label}</span>
    </>
  );

  if (action.kind === 'internal') {
    return (
      <Link href={action.href} className={className}>
        {content}
      </Link>
    );
  }

  const isExternal = action.kind === 'external';

  return (
    <a
      href={action.href}
      className={className}
      {...(action.kind === 'download' ? { download: true } : {})}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );
}

export function ContactActionList({ actions }: TContactActionListProps) {
  return (
    <ul className="flex w-full flex-col gap-2">
      {actions.map((action) => (
        <li key={action.id}>
          <ContactActionLink action={action} />
        </li>
      ))}
    </ul>
  );
}
