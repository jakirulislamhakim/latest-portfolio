'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/config/site';
import { cn } from '@/lib/utils';

const TIME_PLACEHOLDER = '––:––';

const bdTimeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: SITE.timezone,
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

function formatBdTime(date: Date) {
  return bdTimeFormatter.format(date);
}

type TFooterLocalTimeProps = {
  className?: string;
};

export function FooterLocalTime({ className }: TFooterLocalTimeProps) {
  const [time, setTime] = useState(TIME_PLACEHOLDER);

  useEffect(() => {
    const updateTime = () => {
      setTime(formatBdTime(new Date()));
    };

    updateTime();
    // Every 30 seconds (30,000 ms), update the time shown in the footer
    const intervalId = window.setInterval(updateTime, 30_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <span className={cn('tabular-nums', className)}>
      Currently <span className="text-foreground/80">{time}</span> in BD
    </span>
  );
}
