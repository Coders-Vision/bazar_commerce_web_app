"use server";

import { Product } from "@/types/types";
import { instance } from "../services/Client";
import { serverInstance } from "@/lib/axios";

interface ProductQuery {
  categoryId?: string[];
  colorId?: string[];
  sizeId?: string[];
}

export const getProducts = async (params: ProductQuery): Promise<Product[]> => {
  const response = await serverInstance.get(`/catalogue/client/products`, {
    params: params,
    paramsSerializer: { indexes: false },
  });
  return response.data.data;
};
export const getProduct = async (productId: string): Promise<Product> => {
  const response = await serverInstance.get(`/catalogue/client/products/${productId}`);
  return response.data.data;
};
export const getProductBySKU = async (productSKU: string): Promise<Product> => {
  const response = await serverInstance.get(`/catalogue/client/products/sku/${productSKU}`);
  return response.data.data;
};
