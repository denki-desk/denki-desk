import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AuthContextValue } from '../libs/auth';
import { env } from '../libs/env';
import { Toaster } from '@denki-desk/ui/sonner';

type RouterContext = {
  auth: AuthContextValue;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-center" />
      {env.DEV && <TanStackRouterDevtools position="bottom-left" />}
    </>
  ),
});
