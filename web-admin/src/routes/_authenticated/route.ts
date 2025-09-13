import { createFileRoute, redirect } from '@tanstack/react-router';
import { AuthenticatedLayout } from '../../components/layout/authenticated-layout';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
