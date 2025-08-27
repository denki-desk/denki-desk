import { createFileRoute } from '@tanstack/react-router';
import { CashFlow } from '../features/cashflow';

export const Route = createFileRoute('/cashflow')({
  component: CashFlow,
});
