import { useSearch } from '@tanstack/react-router';
import { AuthLayout } from '../auth-layout';
import { UserAuthForm } from './components/user-auth-form';

export function SignIn() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in' });

  return (
    <AuthLayout>
      <UserAuthForm redirectTo={redirect} />
    </AuthLayout>
  );
}
