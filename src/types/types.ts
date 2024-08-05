export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  purchaseDate: string;
  store: string;
  location: string;
  userId:string;
}

export interface User {
  fullName: string;
  email: string;
  dateOfBirth: string;
}