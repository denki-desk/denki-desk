import { Main } from '../../components/layout/main';
import { Label } from '../../components/ui/Label';
import { ItemsTable } from './components/items-table';

export function Items() {
  return (
    <Main>
      <Label className="mb-2">Items</Label>
      <ItemsTable />
    </Main>
  );
}
