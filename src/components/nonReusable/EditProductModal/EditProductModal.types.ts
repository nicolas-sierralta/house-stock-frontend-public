import { InventoryItem } from '../../../types/types';

export type EditProductModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (item: InventoryItem) => void;
  existingLocations: string[];
  existingShops: string[];
  item: InventoryItem;
};
