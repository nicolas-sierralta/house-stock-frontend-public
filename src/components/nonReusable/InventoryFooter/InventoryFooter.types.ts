import { InventoryItem } from '../../../types/types';

export type FooterProps = {
  toggleView: () => void;
  detailedView: boolean;
  onAddProduct: (newItem: InventoryItem) => void;
  onFilter: (filters: any) => void;
  onSort: (option: string) => void;
  toggleSortOrder: () => void;
  sortDescending: boolean;
  existingLocations: string[];
  existingShops: string[];
  inventoryData: InventoryItem[];
  originalData: InventoryItem[];
  onScanTicket: (scannedData: InventoryItem[]) => void;
};
