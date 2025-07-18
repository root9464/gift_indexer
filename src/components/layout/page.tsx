import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

type PageLayoutProps = {
  children: Readonly<ReactNode>;
  className?: string;
};

export const PageLayout = ({ children, className }: PageLayoutProps) => {
  return <div className={cn('relative flex h-full w-full flex-col gap-4 px-4 pt-4 pb-20', className)}>{children}</div>;
};
