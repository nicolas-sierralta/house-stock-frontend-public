import { InventoryItem } from '../../../types/types';

export interface ScanTicketModalProps {
  visible: boolean;
  onClose: () => void;
  onScan: (result: InventoryItem[]) => void;
}
