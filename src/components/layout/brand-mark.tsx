'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SITE } from '@/config/site';
import { cn } from '@/lib/utils';

type TBrandMarkProps = {
  priority?: boolean;
};

export function BrandMark({ priority = false }: TBrandMarkProps) {
  const [hasImageError, setHasImageError] = useState(false);

  function handleImageError() {
    setHasImageError(true);
  }

  return (
    <span
      className={cn(
        'shadow-x flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg transition-transform duration-200 group-hover:scale-105 md:size-11',
        hasImageError && 'bg-primary text-sm font-bold text-primary-foreground'
      )}
    >
      {hasImageError ? (
        SITE.shortName
      ) : (
        <Image
          src="/logo.png"
          alt=""
          width={60}
          height={60}
          priority={priority}
          className="size-9 object-contain"
          onError={handleImageError}
        />
      )}
    </span>
  );
}
