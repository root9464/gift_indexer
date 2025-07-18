import { RouterProvider } from './router';
import { TanstackProvider } from './tanstack';
import { TonProvider } from './ton';

export const GlobalProvider = () => {
  return (
    <TanstackProvider>
      <TonProvider>
        <RouterProvider />
      </TonProvider>
    </TanstackProvider>
  );
};
