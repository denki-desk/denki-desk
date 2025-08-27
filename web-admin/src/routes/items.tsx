import { createFileRoute } from '@tanstack/react-router';
import { Items } from '../features/items';

export const Route = createFileRoute('/items')({
  component: Items,
});
