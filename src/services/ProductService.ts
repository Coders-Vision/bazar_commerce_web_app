import { Product } from "@/types";
import { instance } from "./Client";

interface ProductQuery {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

export const getProducts = async (params: ProductQuery): Promise<Product[]> => {
  const response = await instance.get(`/products`, { params: params });
  return response.data;
};
export const getProduct = async (productId: string): Promise<Product> => {
  const response = await instance.get(`/products/${productId}`);
  return response.data;
};
