import { InventoryItem } from '../../../types/types';

export type DetailedListProps = {
  data: InventoryItem[];
  onEditItem: (item: InventoryItem) => void;
  onDeleteItem: (item: InventoryItem) => void;
};
