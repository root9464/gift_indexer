import { useClientOnce } from '@/shared/hooks/useClientOnce';
import { init } from '@/shared/lib/tma';
import type { ReactNode } from 'react';

import '@shared/mocks/tg-mock';

export const TmaProvider = ({ children }: { children: ReactNode }) => {
  useClientOnce(async () => init({ debug: true, eruda: true, mockForMacOS: true }));

  return <>{children}</>;
};
