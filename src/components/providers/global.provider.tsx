import { RouterProvider } from './router';
import { TanstackProvider } from './tanstack';
import { TmaProvider } from './tma';
import { TonProvider } from './ton';

export const GlobalProvider = () => {
  return (
    <TanstackProvider>
      <TmaProvider>
        <TonProvider>
          <RouterProvider />
        </TonProvider>
      </TmaProvider>
    </TanstackProvider>
  );
};
