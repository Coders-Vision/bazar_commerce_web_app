import { Category } from "@/types/types";
import { instance } from "./Client";

export const getCategories = async (): Promise<Category[]> => {
  const response = await instance.get(`/catalogue/client/categories`);
  return response.data.data;
};

export const getCategory = async (categoryId: string): Promise<Category> => {
  const response = await instance.get(`/catalogue/client/categories/${categoryId}`);
  return response.data.data;
};
