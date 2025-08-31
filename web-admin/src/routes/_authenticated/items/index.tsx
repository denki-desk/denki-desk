import { createFileRoute } from '@tanstack/react-router';
import { Items } from '../../../features/items';

export const Route = createFileRoute('/_authenticated/items/')({
  component: Items,
});
