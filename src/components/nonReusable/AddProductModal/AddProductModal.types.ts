import { InventoryItem } from '../../../types/types';

export interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (newItem: InventoryItem) => void;
  existingLocations: string[];
  existingShops: string[];
}
