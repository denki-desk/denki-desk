import { Avatar, AvatarImage, AvatarFallback } from '@denki-desk/ui/avatar';
import { User } from '../../types';

type UserAvatarProps = {
  user: User | null;
  className?: string;
};

export function UserAvatar({ user, className }: UserAvatarProps) {
  const getInitials = () => {
    if (!user) return '?';

    if (user.name) {
      return user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
    }

    if (user.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
  };

  return (
    <Avatar className={className}>
      <AvatarImage src={user?.imageUrl} alt={user?.name ?? user?.email} />
      <AvatarFallback>{getInitials()}</AvatarFallback>
    </Avatar>
  );
}
