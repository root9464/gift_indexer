import { routeTree } from '@/routeTree.gen';
import { createRouter, RouterProvider as TanstackRouterProvider } from '@tanstack/react-router';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const RouterProvider = () => {
  return <TanstackRouterProvider router={router} />;
};
