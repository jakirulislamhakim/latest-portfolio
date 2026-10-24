import Image from 'next/image';
import { SectionLayout } from '@/components/layout/section-layout';
import { PillList } from '@/components/shared/pill-list';
import { SERVICE_TAGS, SERVICES_CONTENT, SERVICES_IMAGE } from '../constants';

export function ServicesSection() {
  return (
    <SectionLayout id="services" aria-labelledby="services-heading">
      <div className="text-center">
        <h2 id="services-heading">{SERVICES_CONTENT.heading}</h2>
      </div>

      <div className="mt-8 rounded-md border border-border bg-card px-2 py-8 shadow-xs md:px-4 md:py-16">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-8">
          <figure className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-muted/30 lg:max-w-none">
            <Image
              src={SERVICES_IMAGE.src}
              alt={SERVICES_IMAGE.alt}
              width={SERVICES_IMAGE.width}
              height={SERVICES_IMAGE.height}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="h-auto w-full object-contain"
            />
          </figure>

          <div className="flex min-w-0 flex-col gap-4 md:gap-5">
            <h4 className="text-center">{SERVICES_CONTENT.subHeading}</h4>
            <p className="text-justify text-base leading-relaxed text-muted-foreground">
              {SERVICES_CONTENT.pitch}
            </p>

            <PillList className="justify-center" items={SERVICE_TAGS} label="Service categories" />

            <p className="rounded-lg border border-border/40 bg-muted/40 p-4 text-justify text-base leading-relaxed text-foreground md:p-5">
              {SERVICES_CONTENT.description}
            </p>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
