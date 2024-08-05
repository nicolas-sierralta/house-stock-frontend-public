import { InventoryItem } from '../../../types/types';

export type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  originalData: InventoryItem[];
  maxQuantity: number;
};
