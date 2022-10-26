/* eslint-disable @typescript-eslint/no-empty-function */
import { Product, ProductFormData } from '../../utils/models';
import { AuthClient } from '../Client';

export interface UseProductsApiReturnProps {
  getProducts: () => Promise<Product[]>;
  createProduct: (data: ProductFormData) => Promise<Product>;
  buyProduct: (product: Product, quantity: number) => Promise<unknown>;
}

export const useProductsApi = () => {
  const getProducts = (): Promise<Product[]> => {
    const auth = JSON.parse(localStorage.getItem('auth') as string);
    const client = new AuthClient(auth.accessToken);

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
    const auth = JSON.parse(localStorage.getItem('auth') as string);
    const client = new AuthClient(auth.accessToken);

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

  const buyProduct = (product: Product, quantity: number): Promise<unknown> => {
    const auth = JSON.parse(localStorage.getItem('auth') as string);
    const client = new AuthClient(auth.accessToken);

    return client.request({
      url: '/buy',
      method: 'POST',
      data: {
        product: product.id,
        quantity,
      }
    });
  };

  return { getProducts, createProduct, buyProduct };
}