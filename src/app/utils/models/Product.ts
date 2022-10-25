export interface Product {
  id: number;
  productName: string;
  cost: number;
  amountAvailable: number;
}

export interface ProductFormData {
  product_name: string;
  cost: number;
  quantity_available: number;
}