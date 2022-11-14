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

export interface ProductPurchaseResponse {
  purchases: ProductPurchaseResponseProduct[],
  totalPurchaseAmount: number,
  remainingDeposit: number,
  change: Record<string, number>
}

export interface ProductPurchaseResponseProduct {
  purchaseCost: number;
  purchaseQuantity: number;
  product: Product;
}