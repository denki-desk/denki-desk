import { z } from 'zod';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignIn } from '../../features/auth/sign-in';

const fallback = '/';

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/(auth)/sign-in')({
  component: SignIn,
  validateSearch: searchSchema,
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
});
