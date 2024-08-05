import { InventoryItem } from '../../../types/types';

export type SimpleListProps = {
  data: InventoryItem[];
  onDeleteItem: (item: InventoryItem) => void;
  onEditItem: (item: InventoryItem) => void;
};
