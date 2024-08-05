import { InventoryItem } from '../../../types/types';

export interface DetailModalProps {
  visible: boolean;
  item: InventoryItem;
  onClose: () => void;
}
