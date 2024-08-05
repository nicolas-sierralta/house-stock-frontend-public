import { InventoryItem } from '../../../types/types';

export type ReviewOCRModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (newItem: InventoryItem) => void;
  onDiscard: () => void;
  onCancel: () => void;
  ocrData: InventoryItem[];
  existingLocations: string[];
  existingShops: string[];
};
