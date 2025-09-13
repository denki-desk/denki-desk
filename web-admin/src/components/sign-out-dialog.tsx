import { ConfirmDialog } from './confirm-dialog';
import { useAuth } from '../libs/auth';
import { useNavigate, useLocation, useRouter } from '@tanstack/react-router';

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.logout.mutateAsync();
    await router.invalidate();

    // Preserve current location for redirect after sign-in
    const currentPath = location.href;
    await navigate({
      to: '/sign-in',
      search: { redirect: currentPath },
      replace: true,
    });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Sign out"
      desc="Are you sure you want to sign out? You will need to sign in again to access your account."
      confirmText="Sign out"
      handleConfirm={handleSignOut}
      className="sm:max-w-sm"
      isLoading={auth.logout.isPending}
    />
  );
}
