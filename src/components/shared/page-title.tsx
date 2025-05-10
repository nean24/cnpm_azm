import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  className?: string;
}

export function PageTitle({ title, subtitle, className }: PageTitleProps) {
  return (
    <div className={cn("my-8 text-center md:my-12", className)}>
      <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
