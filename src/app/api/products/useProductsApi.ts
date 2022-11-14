/* eslint-disable @typescript-eslint/no-empty-function */
import { Auth } from '../../auth';
import { Product, ProductFormData, ProductPurchaseResponse } from '../../utils/models';
import { AuthClient } from '../Client';

export interface UseProductsApiReturnProps {
  getProducts: () => Promise<Product[]>;
  createProduct: (data: ProductFormData) => Promise<Product>;
  buyProduct: (product: Product, quantity: number) => Promise<ProductPurchaseResponse>;
}

export const useProductsApi = () => {
  const getProducts = (): Promise<Product[]> => {
    const auth = JSON.parse(localStorage.getItem('auth') as string) as Auth;
    const client = new AuthClient(auth.accessToken as string);

    return client.request({
      url: '/products',
      method: 'GET',
    }).then((response: any) => {
      return Promise.resolve(response);
    }).catch((error) => {
      return Promise.reject(error.response.data);
    }) as Promise<Product[]>;
  };

  const createProduct = (data: ProductFormData): Promise<Product> => {
    // We can easily cast because we're pretty confident that should a user get to this point, they must be logged in
    const auth = JSON.parse(localStorage.getItem('auth') as string) as Auth;
    const client = new AuthClient(auth.accessToken as string);

    return client.request({
      url: '/products',
      method: 'POST',
      data: {...data}
    }).then((response: any) => {
      return Promise.resolve(response);
    }).catch((error) => {
      return Promise.reject(error.response.data);
    }) as Promise<Product>;
  };

  const buyProduct = (product: Product, quantity: number): Promise<ProductPurchaseResponse> => {
    const auth = JSON.parse(localStorage.getItem('auth') as string) as Auth;
    const client = new AuthClient(auth.accessToken as string);

    return client.request({
      url: '/buy',
      method: 'POST',
      data: {
        product: product.id,
        quantity,
      }
    }) as Promise<ProductPurchaseResponse>;
  };

  return { getProducts, createProduct, buyProduct };
}